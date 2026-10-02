# Animated MERN Portfolio

MongoDB + Express + React (Vite) + Node, animated with Framer Motion.

## Run it
```bash
# 1. API
cd server && npm install && cp .env.example .env && npm run dev
# 2. Frontend (new terminal)
cd client && npm install && npm run dev
```
Frontend: http://localhost:5173 · API: http://localhost:5000/api/projects

No MongoDB yet? The API serves sample projects automatically. Add `MONGO_URI` in `server/.env` to use a real database, then `npm run seed`.
