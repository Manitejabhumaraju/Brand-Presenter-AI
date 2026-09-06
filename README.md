<p align="center">
  <img src="public/brand-presenter-logo.png" alt="Brand Presenter AI" width="480" />
</p>

# Brand Presenter AI

**Where Brands Meet Real Creators.**

Brand Presenter AI is a multi-platform creator marketplace concept that connects brands with
verified content creators. It brings together reach intelligence, fair rate benchmarks, and
milestone-based collaboration workflows into a single workspace for **Discover → Analyze →
Collaborate → Grow**.

This repository contains the frontend application: a React + TypeScript single-page app built
with Vite and Tailwind CSS, currently driven by realistic mock data so the full product
experience — brand, creator, and admin flows — can be explored without a backend.

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
not require them to develop or preview the app.

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
├── types/             # Shared TypeScript types
└── utils/             # Formatting helpers
```

## License

This project does not currently declare a license. All rights reserved unless stated otherwise.
