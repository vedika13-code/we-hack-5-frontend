# WE HACK 5.0 — Frontend

React + Vite + TypeScript + Tailwind + React Router + React Query.

## Setup

```bash
cp .env.example .env       # VITE_API_URL=http://localhost:4000 (or your deployed backend URL)
npm install
npm run dev                 # http://localhost:5173
```

## What works now

- Full routing tree for every page in the PRD (`src/App.tsx`)
- `/signup` → `/verify-email` → `/login` → `/dashboard` is wired end-to-end to the backend API
- `ProtectedRoute` component gates participant and admin routes by checking `GET /auth/me`

## What's stubbed — build in this order

1. `src/pages/Registration.tsx`, `Team.tsx` — once the backend's `teams`/`registration` module exists
2. `src/pages/Submission.tsx`
3. `src/pages/admin/*.tsx`
4. Public pages (`Home.tsx`, `About.tsx`, `Judges.tsx`, `Mentors.tsx`, etc.) — no backend
   dependency, safe to build any time with mock data first, then swap in real API calls later

## Deploy

Vercel or Netlify. Point at this repo, build command `npm run build`, set `VITE_API_URL` to
your deployed backend URL.
