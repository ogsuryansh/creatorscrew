# Creator's Crew

> Small creators. Serious impact.

A full-stack React + Node.js website for Creator's Crew — a creator marketing platform.

## Project Structure

```
creatorsCrew/
├── frontend/   # React + Vite (JS)
└── backend/    # Node.js + Express API
```

## Getting Started

### Backend
```bash
cd backend
npm install
npm run dev
# Runs on http://localhost:3001
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

The frontend dev server proxies `/api` requests to the backend.

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | /api/contact | Submit brand or creator form |
| GET | /api/submissions | View all submissions (dev only) |
| GET | /api/health | Health check |
