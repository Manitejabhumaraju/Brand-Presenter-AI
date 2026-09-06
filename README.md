<p align="center">
  <img src="public/brand-presenter-logo.png" alt="Brand Presenter AI" width="480" />
</p>

# Brand Presenter AI

**Where Brands Meet Real Creators.**

Brand Presenter AI is a multi-platform creator marketplace concept that connects brands with
verified content creators. It brings together reach intelligence, fair rate benchmarks, and
milestone-based collaboration workflows into a single workspace for **Discover → Analyze →
Collaborate → Grow**.

This repository contains both halves of the app:

- **Frontend** (`/src`) — a React + TypeScript single-page app built with Vite and Tailwind CSS,
  driven by realistic mock data by default so the full product experience — brand, creator, and
  admin flows — can be explored without a backend.
- **Backend** (`/backend`) — a FastAPI + SQLModel + SQLite API implementing auth, creator/brand
  profiles, social analytics, pricing, campaigns, messaging, and AI-assisted search/matching/chat.
  See `backend/README.md` for the full backend documentation.

The frontend does not require the backend to run — see [Running both together](#running-both-together)
for how (and how much) they're currently wired up.

## Features

- **Discovery** — search and filter creators across platforms with saved searches and shortlists.
- **Analyze** — market rate benchmarks and "explain this match" insights for evaluating fit.
- **Brand workspace** — dashboards, campaign/proposal workspace, messaging, and brand verification.
- **Creator workspace** — creator dashboard, onboarding wizard, opportunities, and public profile.
- **Admin center** — moderation and platform oversight tools.
- **Command palette** — quick navigation and actions via `⌘K` / `Ctrl+K`.

## Tech stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite 6](https://vitejs.dev/) for dev server and build tooling
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Recharts](https://recharts.org/) for data visualization
- [Lucide](https://lucide.dev/) icons and [Motion](https://motion.dev/) for animation

## Getting started

**Prerequisites:** Node.js 18+ (Bun is also supported via the included `bun.lock`).

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the environment template and fill in any values you need:

   ```bash
   cp .env.example .env
   ```

3. Start the dev server:

   ```bash
   npm run dev
   ```

   The app runs at `http://localhost:3000` by default.

### Other scripts

| Command           | Description                          |
| ------------------ | ------------------------------------ |
| `npm run dev`      | Start the Vite dev server            |
| `npm run build`    | Type-check and build for production  |
| `npm run preview`  | Preview the production build locally |
| `npm run lint`     | Run TypeScript type checking         |
| `npm run clean`    | Remove build output                  |

## Environment variables

See `.env.example`. `GEMINI_API_KEY` and `APP_URL` are placeholders for future AI-assisted
features and deployment integration — the current UI runs entirely on local mock data and does
not require them to develop or preview the app. `VITE_API_URL` and `VITE_USE_MOCK_API` control
the backend integration described below.

## Running both together

The frontend runs standalone on mock data (`VITE_USE_MOCK_API` defaults to `true`, and no
component currently calls the backend yet — see [Backend integration status](#backend-integration-status)).
To run the real backend alongside it:

```bash
# Terminal 1 — frontend
npm install
npm run dev                       # http://localhost:3000

# Terminal 2 — backend
cd backend
python3.12 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
alembic upgrade head
python -m scripts.seed            # optional demo data
uvicorn app.main:app --reload --port 8000   # http://localhost:8000/docs
```

### Backend integration status

A small, typed API client lives at `src/services/api/` (`client.ts`, `auth.ts`, `creators.ts`,
`brands.ts`, `campaigns.ts`, `messages.ts`, `analytics.ts`, `ai.ts`, including SSE handling for
streaming AI chat). It talks to `VITE_API_URL` (default `http://localhost:8000/api/v1`) and is
ready to use, but no screen has been switched over from mock data yet — that's intentionally left
as an incremental migration (auth → creator list → creator profile → analytics → campaigns →
messages → AI), each swap gated behind `VITE_USE_MOCK_API=false` so the app keeps working at
every step. See `backend/README.md` for what the API actually supports today.

## Project structure

```
src/
├── components/
│   ├── admin/       # Admin center views
│   ├── brand/        # Brand-side dashboard, discovery, campaigns, benchmarks
│   ├── creator/       # Creator dashboard, onboarding, opportunities, profile
│   ├── common/        # Shared UI (brand logo, messaging, platform badges)
│   ├── layout/        # Navbar, sidebar, mobile navigation
│   ├── modals/        # Command palette, compare, inquiry, connect-platform modals
│   └── public/        # Public marketing/landing page
├── context/           # Global app state (AppContext)
├── data/              # Mock data for brands, creators, and admin
├── services/api/       # Backend API client (see "Backend integration status" above)
├── types/             # Shared TypeScript types
└── utils/             # Formatting helpers

backend/                # FastAPI backend - see backend/README.md
├── app/                # application code (core, models, schemas, api, services, integrations)
├── alembic/            # database migrations
├── scripts/seed.py     # demo data generator
└── tests/              # pytest suite
```

## License

This project does not currently declare a license. All rights reserved unless stated otherwise.
