# Warhammer III Campaign Guide

A full‑stack web project that centralizes **Total War: Warhammer III** campaign guides. Players can browse factions, read summaries and tips, pick a random faction, log in to save favorites, and submit feedback.

> **Tech stack:** React (Vite) + Material UI • React Router • Context API • Node.js + Express • MongoDB (Mongoose) • Swagger • Jest + React Testing Library

---

## Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Architecture](#architecture)
- [Folder Structure](#folder-structure)
- [Getting Started](#getting-started)
  - [1) Prerequisites](#1-prerequisites)
  - [2) Backend setup](#2-backend-setup)
  - [3) Frontend setup](#3-frontend-setup)
- [Environment Variables](#environment-variables)
- [API](#api)
  - [Factions](#factions)
  - [Auth & Saved Factions](#auth--saved-factions)
  - [Feedback](#feedback)
  - [Swagger Docs](#swagger-docs)
- [Data Seeding](#data-seeding)
- [Testing](#testing)
- [Deployment](#deployment)
  - [Backend (Render)](#backend-render)
  - [Frontend (Vercel)](#frontend-vercel)
- [Roadmap](#roadmap)
- [Notes / Limitations](#notes--limitations)
- [License](#license)

---

## Features

- **Browse factions** in a responsive card layout with search + filters
- **Faction detail pages** with summary, difficulty, DLC, tips, and icon
- **Random faction selector** for quick campaign ideas
- **Login/signup** (username + birth year) with local storage convenience
- **Save / unsave factions** (persisted per user)
- **Feedback form** (stored in MongoDB)
- **Swagger API docs** for the backend
- **Basic tests** (unit/integration for backend, component tests for frontend)

---

## Screenshots

> Replace these with real screenshots once deployed.

- **Home Page** – landing, quick actions
- **Factions List** – search, filters, randomizer
- **Faction Detail** – deep dive per faction

---

## Architecture

**Client-rendered MVC style**

- **Model (M):** Mongoose models (`Faction`, `User`, `Feedback`)
- **Controller (C):** Express controllers (factions, auth, feedback)
- **View (V):** React SPA (pages/components) consuming the JSON API
- **Service:** `fetchExternalData.js` seeds the DB from an external JSON source when empty

Request flow:

```
React (Axios/Fetch)
   │
   ├── GET /api/factions
   ├── GET /api/factions/:slug
   ├── POST /api/auth/{signup|login|save-faction|unsave-faction}
   └── POST /api/feedback
        │
  Express Controllers → Mongoose Models → MongoDB Atlas
```

---

## Folder Structure

```
warhammer-3-guides/
├─ frontend/
│  ├─ src/
│  │  ├─ components/
│  │  │  ├─ FactionCard.jsx
│  │  │  └─ RandomFactionSlot.jsx
│  │  ├─ contexts/
│  │  │  └─ UserContext.jsx
│  │  ├─ pages/
│  │  │  ├─ HomePage.jsx
│  │  │  ├─ FactionsListPage.jsx
│  │  │  ├─ FactionDetailPage.jsx
│  │  │  ├─ LoginModal.jsx
│  │  │  ├─ SignupPage.jsx
│  │  │  └─ FeedbackPage.jsx
│  │  ├─ App.jsx
│  │  └─ Main.jsx
│  └─ tests/
│     ├─ FactionCard.test.jsx
│     └─ RandomFactionSlot.test.jsx
└─ backend/
   ├─ config/
   │  └─ db.js
   ├─ controllers/
   │  ├─ factionsController.js
   │  └─ authController.js
   ├─ models/
   │  ├─ Faction.js
   │  ├─ User.js
   │  └─ Feedback.js
   ├─ routes/
   │  ├─ factionsRoutes.js
   │  ├─ authRoutes.js
   │  └─ feedbackRoutes.js
   ├─ services/
   │  └─ fetchExternalData.js
   ├─ tests/
   │  ├─ unit.test.js
   │  └─ integration.test.js
   └─ index.js
```

---

## Getting Started

### 1) Prerequisites

- **Node.js 20+** and **npm**
- **MongoDB Atlas** (recommended) or a reachable MongoDB instance

### 2) Backend setup

```bash
cd warhammer-3-guides/backend
npm install
# Create .env with MONGO_URI (see below)
npm start
# Server: http://localhost:3001
# Swagger: http://localhost:3001/api-docs
```

> On first start, the backend will connect to MongoDB. If the `factions` collection is empty, it auto-seeds from the public JSON source in `services/fetchExternalData.js`.

### 3) Frontend setup

```bash
cd warhammer-3-guides/frontend
npm install
# Create .env (Vite) with VITE_API_BASE_URL (see below)
npm run dev
# App: http://localhost:5173 (default for Vite)
```

Update any API calls to use the base URL, e.g.:

```js
// src/api.js (suggested helper)
export const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";
```

Then in components:

```js
import { API_BASE } from "./api";
axios.get(`${API_BASE}/api/factions`);
```

---

## Environment Variables

### Backend (`/backend/.env`)

```
MONGO_URI=mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority
PORT=3001
```

### Frontend (`/frontend/.env` for Vite)

```
VITE_API_BASE_URL=http://localhost:3001
```

---

## API

### Factions

- `GET /api/factions` → list all factions
- `GET /api/factions/:slug` → get one faction by slug
- `POST /api/factions` → create faction (body = faction object)
- `PUT /api/factions/:slug` → update faction
- `DELETE /api/factions/:slug` → delete faction

### Auth & Saved Factions

Simple, demo‑grade auth (username + birth year).

- `POST /api/auth/signup` → body: `{ username, birthYear }`
- `POST /api/auth/login` → body: `{ username, birthYear }`
  - returns user with `savedFactions: string[]`
- `POST /api/auth/save-faction` → body: `{ username, factionSlug }`
- `POST /api/auth/unsave-faction` → body: `{ username, factionSlug }`
- `GET /api/auth/user/:username` → returns user (including `savedFactions`)

### Feedback

- `POST /api/feedback` → body: `{ name?, email, feedback }`

### Swagger Docs

- `GET /api-docs` → interactive API documentation

---

## Data Seeding

On server start, if the `factions` collection is empty, `services/fetchExternalData.js` pulls faction data from a public JSON file and upserts into MongoDB. This makes local setup and demos easy.

---

## Testing

**Backend** (Jest + Supertest):

```bash
cd backend
npm test
```

- `tests/unit.test.js` → simple unit example (`sum`)
- `tests/integration.test.js` → sample route test

**Frontend** (React Testing Library + Jest):

```bash
cd frontend
npm test
```

- `tests/FactionCard.test.jsx`
- `tests/RandomFactionSlot.test.jsx`

> If tests aren’t wired in `package.json`, add scripts:
>
> ```json
> { "scripts": { "test": "jest" } }
> ```

---

## Deployment

### Backend (Render)

1. Create a new **Web Service** on Render, connect your GitHub repo.
2. **Root Directory:** `warhammer-3-guides/backend`
3. **Build Command:** `npm ci` (or `npm install`)
4. **Start Command:** `npm start`
5. **Environment:** set `MONGO_URI` (and optionally `PORT`)
6. After deploy, verify:
   - `GET https://<service>.onrender.com/api/factions`
   - `GET https://<service>.onrender.com/api-docs`

### Frontend (Vercel)

1. Set Vercel **Environment Variable**:  
   `VITE_API_BASE_URL = https://<service>.onrender.com`
2. Deploy the `frontend/` project (Vite will inject the env var).
3. Confirm networking (CORS). For production, consider restricting CORS:
   ```js
   // backend/index.js
   app.use(cors({ origin: ["https://<your-vercel-app>.vercel.app"] }));
   ```

---

## Roadmap

- Add **all playable factions** with richer strategy content
- Expand **tips** into structured sections (economy, diplomacy, army comps)
- User **profiles** & **favorites page**
- **Search by tags** (e.g., horde, undead, ranged-heavy)
- **Role-based content** (community editors/mods)
- **Better auth** (sessions/JWT, password auth, OAuth)
- CI pipeline and more robust test coverage

---

## Notes / Limitations

- Auth is intentionally **simple for demo** (username + birth year); not production‑grade.
- CORS is open during development. Lock down origins for production.
- Seeding uses a public JSON source; replace with your canonical dataset when ready.

---

## License

