# Overview

This is a **retro/cyberpunk-themed developer portfolio** web application. It presents projects, activities, a profile bio, and a contact form — all styled with an 8-bit, neon-lit, terminal-inspired aesthetic. The app uses a React frontend with a Node/Express backend, backed by PostgreSQL via Drizzle ORM.

The portfolio has three main pages:
- **Home** — Profile info, skill stats bars, activity feed, and social links
- **Projects** ("Quests") — Grid of project cards with tags, links, and featured badges
- **Contact** ("Comm-Link") — Contact form with a simulated terminal output

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight alternative to React Router)
- **State/Data Fetching**: TanStack React Query with a custom `queryClient` that uses `fetch` with credentials
- **UI Components**: shadcn/ui (new-york style) built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming. The theme is a dark cyberpunk palette (neon green, pink, cyan, yellow on dark purple/black). Fonts are `Press Start 2P` (headers), `Space Mono` (body), and `VT323` (code/terminal).
- **Animations**: Framer Motion for page transitions, stat bars, card reveals. Custom CSS for scanline and glitch effects.
- **Forms**: React Hook Form with Zod validation via `@hookform/resolvers`
- **Build Tool**: Vite with React plugin. Output goes to `dist/public`.

### Path Aliases
- `@/*` → `./client/src/*`
- `@shared/*` → `./shared/*`
- `@assets` → `./attached_assets/`

## Backend
- **Framework**: Express 5 on Node.js, wrapped in a standard HTTP server
- **Language**: TypeScript, executed via `tsx`
- **API Pattern**: RESTful JSON API under `/api/` prefix. Routes defined in `server/routes.ts`.
- **Storage Layer**: `IStorage` interface implemented by `DatabaseStorage` class in `server/storage.ts`. This abstracts all database operations.
- **Dev Server**: Vite dev server is integrated as middleware (via `server/vite.ts`) during development. In production, static files are served from `dist/public`.
- **Seed Data**: The server seeds initial profile, activities, and projects on startup if the database is empty.

## Shared Code (`shared/`)
- **Schema** (`shared/schema.ts`): Drizzle ORM table definitions for `projects`, `activities`, `profile`, and `messages`. Also exports Zod insert schemas and TypeScript types via `drizzle-zod`.
- **Routes** (`shared/routes.ts`): Typed API route definitions with Zod response schemas, shared between client and server for type safety.

## Database
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Driver**: `pg` (node-postgres) Pool
- **Connection**: Via `DATABASE_URL` environment variable (required)
- **Schema Push**: `npm run db:push` uses `drizzle-kit push` to sync schema to database
- **Tables**:
  - `projects` — id, title, description, imageUrl, projectUrl, repoUrl, tags (text array), isFeatured (boolean)
  - `activities` — id, title, description, date, icon
  - `profile` — id, name, bio, social URLs (instagram, github, linkedin, twitter)
  - `messages` — id, name, email, message, createdAt (timestamp)

## Build Process
- **Dev**: `npm run dev` → runs `tsx server/index.ts` with Vite middleware for HMR
- **Build**: `npm run build` → runs `script/build.ts` which builds the Vite client and bundles the server with esbuild into `dist/index.cjs`
- **Production**: `npm start` → runs `node dist/index.cjs`

# External Dependencies

## Database
- **PostgreSQL** — Primary data store, connected via `DATABASE_URL` environment variable. Required for the app to start.

## Key NPM Packages
- **drizzle-orm** + **drizzle-kit** — ORM and migration tooling for PostgreSQL
- **express** (v5) — HTTP server framework
- **@tanstack/react-query** — Server state management on the client
- **framer-motion** — Animation library for React
- **shadcn/ui** components (Radix UI + Tailwind) — Full suite of accessible UI primitives
- **wouter** — Lightweight client-side routing
- **zod** + **drizzle-zod** — Schema validation and type generation
- **react-hook-form** — Form state management
- **connect-pg-simple** — PostgreSQL session store (available but not actively used for auth currently)

## Fonts (External CDN)
- Google Fonts: `Press Start 2P`, `Space Mono`, `VT323`, `DM Sans`, `Fira Code`, `Geist Mono`, `Architects Daughter`

## Replit-specific
- `@replit/vite-plugin-runtime-error-modal` — Error overlay in development
- `@replit/vite-plugin-cartographer` — Dev tooling (dev only)
- `@replit/vite-plugin-dev-banner` — Dev banner (dev only)