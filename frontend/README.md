# Movies Factor

A movie exploration and personal rating platform built with the TMDB API. Discover films, explore detailed cast and crew information, and manage your own list of favorite and rated movies.

This is an academic project developed as part of a full-stack bootcamp, following an agile methodology (Epic → User Story → GitHub branch → Technical card) tracked via Trello and organized with Gitflow.

## Tech stack

### Frontend

- **Vite** + **React** + **TypeScript**
- **React Router v7** (Declarative mode)
- **React Hook Form** + **Zod** — form handling and validation
- **Firebase Authentication** — email/password sign-in
- **CSS Modules** — component-scoped styling
- **ESLint** + **Prettier** — linting and code formatting

### Backend (planned)

- **Node.js** + **Express** + **TypeScript**
- **MongoDB** + **Mongoose**
- **Firebase Admin SDK** — token verification

### External API

- **TMDB API** (v4 Bearer Token) — real-time movie, cast and crew data

## Project structure (`/frontend/src`)

- `components/` — Reusable UI components (e.g. `MovieCard`, `LoadingSpinner`).
- `pages/` — Page-level components, one per application route (e.g. `Explore`, `MovieDetailPage`).
- `services/` — Functions that consume external APIs (TMDB) or the custom backend; contain side effects (network requests).
- `context/` — React contexts and their providers (e.g. `AuthContext`).
- `hooks/` — Custom hooks encapsulating state and lifecycle logic (e.g. `useMovieList`, `useAuth`).
- `routes/` — React Router route configuration (e.g. `AppRoutes.tsx`).
- `assets/` — Images, icons and other static assets.
- `styles/` — Global styles and design tokens (colors, typography, spacing).
- `utils/` — Pure, reusable functions with no side effects (e.g. `getPosterUrl`, `getDirector`).
- `types/` — Shared TypeScript type and interface definitions used across the application.
- `config/` — Static, project-controlled content (e.g. error messages, empty states, section titles) that doesn't depend on API responses.

## Getting started

### Prerequisites

- Node.js (LTS recommended)
- npm
- A TMDB account with an API Read Access Token (v4)
- A Firebase project with the Email/Password sign-in provider enabled

### Installation

Clone the repository and install the frontend dependencies:

```bash
git clone https://github.com/<your-username>/movies-tmdb.git
cd movies-tmdb/frontend
npm install
```

### Environment variables

Create a `.env` file inside `/frontend` based on `.env.example`:

```bash
cp .env.example .env
```

Fill in the following variables:

| Variable | Description |
|---|---|
| `VITE_TMDB_API_KEY` | TMDB API Read Access Token (v4 Bearer Token) |
| `VITE_FIREBASE_API_KEY` | Firebase Web SDK API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase Auth domain |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase Cloud Messaging sender ID |
| `VITE_FIREBASE_APP_ID` | Firebase app ID |

> These credentials can be obtained from the [TMDB API settings](https://www.themoviedb.org/settings/api) and the [Firebase console](https://console.firebase.google.com/), under your project's Web app configuration.

### Running the project

```bash
npm run dev
```

The app will be available at `http://localhost:5173` by default.

### Available scripts

| Script | Description |
|---|---|
| `npm run dev` | Starts the development server |
| `npm run build` | Type-checks and builds the app for production |
| `npm run preview` | Previews the production build locally |
| `npm run lint` | Runs ESLint over the project |
| `npm run format` | Formats the codebase with Prettier |
| `npm run format:check` | Checks formatting without writing changes |

## Project status

Currently in active development. The frontend infrastructure setup is complete; feature development is underway following the epics defined in the project's user stories.
