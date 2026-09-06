# Brand Presenter AI — Backend

FastAPI backend for the Brand Presenter AI creator/brand marketplace. Lives alongside the
existing Vite/React frontend in this repository (`../src`) without replacing it — see the
[frontend integration](#frontend-integration) section for how the two connect.

## Architecture

```
backend/
├── app/
│   ├── main.py              FastAPI app, middleware, exception handlers
│   ├── core/                config, security (JWT/Argon2), logging, rate limiting, exceptions
│   ├── db/                  engine/session, SQLModel metadata aggregation
│   ├── models/               SQLModel tables (one file per domain area)
│   ├── schemas/              Pydantic request/response models
│   ├── api/routes/           one FastAPI router per resource, thin - no business logic
│   ├── services/             business logic, called by routes
│   ├── repositories/          query helpers for the entities with the most complex queries
│   ├── integrations/
│   │   ├── social/           SocialPlatformAdapter interface + mock adapters (one per platform)
│   │   └── ai/                AIProvider interface + mock/Gemini/OpenAI implementations
│   └── workers/               placeholder for background jobs (see Known limitations)
├── alembic/                  migrations (the schema's source of truth - not create_all())
├── scripts/seed.py           demo data generator
├── tests/{unit,api}          pytest suite
└── data/brand_presenter.db   SQLite dev database (gitignored)
```

**Request flow**: route → service (business rules, permissions, orchestration) → repository or
direct SQLModel query → response schema. Routes never touch the database directly beyond a
couple of trivial admin list endpoints; services never format HTTP responses.

**Why SQLite + FastAPI + SQLModel**: this is intentionally the smallest stack that can express
the full data model. `DATABASE_URL` is the only thing that needs to change to move to Postgres
(`postgresql+psycopg://...`) - no application code assumes SQLite, and `app/db/engine.py`'s only
SQLite-specific line is `connect_args={"check_same_thread": False}`.

## Setup

Requires **Python 3.12+**.

```bash
cd backend
python3.12 -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env               # defaults work out of the box for local dev
alembic upgrade head               # create the schema
python -m scripts.seed             # optional: load demo data
uvicorn app.main:app --reload --port 8000
```

API docs are then at `http://localhost:8000/docs` (Swagger) and `/redoc`.

## Common commands

| Task | Command |
| --- | --- |
| Run the dev server | `uvicorn app.main:app --reload --port 8000` |
| Run tests | `pytest` |
| Lint | `ruff check .` |
| Format | `ruff format .` |
| Type check | `mypy app` |
| Create a migration after changing models | `alembic revision --autogenerate -m "describe change"` |
| Apply migrations | `alembic upgrade head` |
| Roll back one migration | `alembic downgrade -1` |
| Reset the dev database | `rm data/brand_presenter.db && alembic upgrade head && python -m scripts.seed` |

## Environment variables

See `.env.example` for the full list with descriptions. The important ones:

- `DATABASE_URL` — defaults to `sqlite:///./data/brand_presenter.db`.
- `JWT_SECRET_KEY` — **change this** for anything beyond local dev (`openssl rand -hex 32`).
- `CORS_ORIGINS` — comma-separated list of allowed frontend origins.
- `AI_PROVIDER` — `mock` (default, no API key needed), `gemini`, or `openai`.
- `TOKEN_ENCRYPTION_KEY` — Fernet key used to encrypt social OAuth tokens at rest; falls back to
  a dev-only obfuscation if left blank (see `app/core/security.py`).

Never commit a real `.env`. No secrets are committed to this repository.

## Authentication

JWT access tokens (30 min default) + rotating refresh tokens (14 days default, revoked on use or
logout — see `refresh_tokens` table). Passwords are hashed with Argon2. Roles: `CREATOR`,
`INFLUENCER`, `FREELANCER`, `CREATOR_MANAGER`, `AGENCY`, `BRAND`, `BRAND_MEMBER`, `ADMIN` — only
the first four (+ `BRAND`) are self-registerable; `ADMIN` accounts are provisioned manually (see
seed data below).

## Demo / seed data

`python -m scripts.seed` creates 20 fictional Indian creators (with connected mock social
accounts, computed Brand Presenter Scores, pricing, and one portfolio item each), 5 brands, 5
campaigns with invitations and a deliverable each, shortlists, saved searches, and a starter
conversation. It's safe to re-run — existing accounts are skipped by email.

Demo accounts (all use password `DevPassword123!`, **development only, never use these in
production**):

| Email | Role |
| --- | --- |
| `admin@example.com` | ADMIN |
| `creator@example.com` | CREATOR |
| `brand@example.com` | BRAND |

Plus one account per seeded creator/brand (e.g. `aaravtech@example.com`), all with the same
password.

## AI provider configuration

`app/integrations/ai/base.py` defines the `AIProvider` interface (`generate`, `stream`); nothing
outside the three implementations or `app/services/ai_service.py`'s `get_ai_provider()` factory
knows which vendor is active.

- **`mock`** (default): no network calls, no API key. Returns clearly-labeled canned text so the
  whole AI pipeline (search → match → chat → streaming) is exercisable offline. This is what CI
  and the test suite run against.
- **`gemini`**: calls the Google Generative Language REST API directly via `httpx` (no `google-*`
  SDK dependency). Set `AI_PROVIDER=gemini` and `GEMINI_API_KEY`.
- **`openai`**: calls the OpenAI-compatible chat completions endpoint via `httpx`. Set
  `AI_PROVIDER=openai` and `OPENAI_API_KEY`.

If a real provider is selected but its API key is missing, requests fail over to the mock
provider rather than 500ing (see `get_ai_provider`).

**Natural-language search** (`POST /api/v1/ai/search`) does not require a live LLM call: it uses
a deterministic keyword/regex extractor (`interpret_query` in `ai_service.py`) to turn a query
like *"Indian fitness creators under ₹50,000"* into a validated `CreatorSearchFilters` object,
runs the real discovery query against the database, and only then asks the configured AI
provider for a one-sentence summary of the (already-known) result count. The model is never
allowed to invent creators, numbers, or filters - see the "AI safety" note below.

**AI matching** (`POST /api/v1/ai/match-creators`) is fully deterministic
(`matching_service.py`): scores and reasons come from real database fields (category match,
country match, follower count, Brand Presenter Score, pricing vs. budget). No LLM call is
required to produce a match score - the AI provider is only used to phrase chat responses.

**Chat memory**: `ChatSession`/`ChatMessage` persist full conversation history. Streaming chat
(`POST /api/v1/ai/chat/stream`, Server-Sent Events) stores the user message immediately, streams
the assistant's reply token-by-token, and only persists the assistant message once the stream
completes successfully - a provider failure mid-stream is surfaced as an `error` SSE event and
never saved as a fake "completed" reply.

## Social integration status

**No real OAuth is implemented anywhere in this codebase.** `app/integrations/social/` defines
the `SocialPlatformAdapter` interface (`connect`, `get_metrics`, `get_content`, `get_audience`,
...) and a shared deterministic mock implementation (seeded by username, so numbers are stable
across repeated syncs) for Instagram, YouTube, TikTok, Facebook, LinkedIn, X, Pinterest, and
Twitch. Every mock record carries `source="mock"`. Snapchat and Threads are in the `Platform`
enum but have no adapter yet - connecting one returns a clear "not yet supported" error rather
than fabricating data.

Swapping in a real platform later means writing one new adapter class against the same
interface; `social_service.py` and the routes don't change.

## Security notes

- Passwords: Argon2, never stored or logged in plaintext.
- Social OAuth tokens: encrypted at rest (`encrypt_secret`/`decrypt_secret`), never included in
  any API response schema (see `SocialAccountRead`).
- Pricing and contact-info visibility are enforced server-side (`pricing_service.py`,
  `creator_service.get_contact_info`) - never assume the frontend hiding a field is sufficient.
  Every contact-info and pricing access is written to `audit_logs`.
- Rate limiting: a simple in-memory limiter (`app/core/rate_limit.py`) protects login, register,
  AI endpoints, profile views, and messaging. It is per-process, not distributed - fine for one
  API instance; put a shared (e.g. Redis-backed) limiter behind the same interface before running
  multiple instances.
- CORS origins are explicit and configurable (`CORS_ORIGINS`), never `*`.

## Testing

```bash
pytest              # full suite (unit + API), each test gets a fresh temp SQLite file
pytest tests/unit    # pure logic: security, freshness, pricing permissions, matching, scoring
pytest tests/api     # end-to-end through FastAPI's TestClient: auth, creators, campaigns,
                      # messaging, AI, and a dedicated security suite (IDOR, role escalation,
                      # contact/pricing visibility, token leakage)
```

Tests never touch `data/brand_presenter.db` - `tests/conftest.py` creates an isolated SQLite file
per test in a pytest `tmp_path` and overrides the `get_session` dependency.

## Frontend integration

The existing Vite/React frontend is untouched and still runs entirely on the mock data in
`src/data/*.ts` by default. A small API client layer lives at `src/services/api/` (`client.ts`,
`auth.ts`, `creators.ts`, `brands.ts`, `campaigns.ts`, `messages.ts`, `analytics.ts`, `ai.ts`) -
see the root `README.md` for how to run both together and the `VITE_API_URL` /
`VITE_USE_MOCK_API` environment variables that control it. No frontend component currently calls
this layer; migrating a given screen from mock data to the real API is expected to happen
feature-by-feature (auth → creator list → creator profile → analytics → campaigns → messages →
AI), each behind that flag, per the plan in section 63 of the original spec.

## Known limitations

- **Scale**: creator search post-filters follower count and price in Python after a bounded SQL
  fetch (`search_service.py`), rather than in the query itself, since those depend on the latest
  metric snapshot / pricing rows rather than a plain indexed column. Fine at seed-data scale
  (tens of creators); a materialized search index (or a Postgres view) is the natural next step
  at real scale.
- **Rate limiting** is in-memory and per-process (see above).
- **File uploads**: no upload endpoint is wired up yet, though the storage abstraction pattern
  (`StorageProvider`-style local implementation) described in the spec is straightforward to add
  under `app/services/` alongside a `data/uploads/` directory when needed.
- **Background jobs**: sync is currently synchronous (`POST /social-accounts/{id}/sync` runs and
  returns inline). `app/workers/` is scaffolded but empty - move to FastAPI `BackgroundTasks`
  first, Celery/RQ only if actually needed.
- **Real social OAuth and real AI providers** are unimplemented by design for this MVP (see
  above) - the interfaces are ready, the implementations are mocked.
- **Python version**: the repo's `.venv` here was created with Python 3.12 specifically because
  the sandbox's default `python3` resolved to 3.11; `pyproject.toml` targets 3.12+.

## Recommended next steps

1. Wire the frontend's `src/services/api/` client into one real screen (creator discovery is the
   natural first candidate) behind `VITE_USE_MOCK_API=false`, to validate the integration
   end-to-end from the UI.
2. Add a distributed rate limiter (Redis) before running more than one API process.
3. Implement real OAuth for at least one platform (Instagram or YouTube) against the existing
   `SocialPlatformAdapter` interface.
4. Add a file storage backend (local → S3-compatible) for avatars/portfolio/deliverable uploads.
5. Move social sync and notification fan-out to background tasks.
6. Add CI (GitHub Actions) running `ruff check`, `mypy`, and `pytest` on every push.
