# PathFinder — Career Path Guide

## Overview
A career guidance quiz web app that takes users through a 6-question assessment and matches them to career paths using a scoring algorithm. Built with React, Express, and PostgreSQL.

## Architecture

### Frontend (React + Vite)
- `client/src/App.tsx` — Root component, page routing (home/quiz/results/explore/profile), saves quiz results for logged-in users
- `client/src/lib/careers.ts` — 35+ career definitions + scoring algorithm
- `client/src/lib/theme.tsx` — Dark/light theme provider (persisted in localStorage)
- `client/src/hooks/use-auth.ts` — Auth state hook (Replit Auth via OIDC)
- `client/src/pages/home.tsx` — Landing page with stats and features
- `client/src/pages/quiz.tsx` — 6-step interactive quiz
- `client/src/pages/results.tsx` — Expandable top-3 career matches
- `client/src/pages/explore.tsx` — Browse/filter/search all careers
- `client/src/pages/profile.tsx` — User profile, quiz history, past results
- `client/src/components/navbar.tsx` — Sticky navbar with auth, theme toggle, profile menu
- `client/src/components/theme-toggle.tsx` — Light/dark mode button

### Backend (Express + TypeScript)
- `server/index.ts` — Express app entry point
- `server/routes.ts` — API routes: quiz results CRUD
- `server/storage.ts` — `DatabaseStorage` class (PostgreSQL via Drizzle)
- `server/db.ts` — Drizzle + pg pool setup
- `server/replit_integrations/auth/` — Replit OIDC auth (passport, openid-client)

### Database (PostgreSQL + Drizzle ORM)
- `shared/schema.ts` — All tables: `users`, `sessions`, `quiz_results`

## Key Features
- 35+ career paths across 7 categories (Technology, Arts & Design, Business & Finance, Healthcare, Education, Engineering, Science & Research, Social Work)
- Scoring engine matches quiz answers across 5 dimensions
- Dark / Light mode toggle
- Replit Auth (Google, GitHub, Apple, email/password)
- Profile page with quiz history
- Quiz results saved to PostgreSQL for logged-in users
- Explore page with search + category filter

## Running
- `npm run dev` — starts Express + Vite dev server on port 5000
- `npm run db:push` — push schema changes to PostgreSQL

## Tech Stack
- React 18, TypeScript, Tailwind CSS, Shadcn UI
- Express 5, Drizzle ORM, PostgreSQL
- Replit Auth (OIDC via openid-client + passport)
- TanStack Query, Wouter routing
