# RightsMitra Backend

Zero-dependency Node.js backend for the RightsMitra worker legal-empowerment site. No `npm install` needed — it only uses Node's built-in modules, so it runs the instant you clone it (great for hackathon judging/demo machines).

## Run it

```bash
cd rightsmitra-backend
cp .env.example .env      # edit if you want (see below)
node server.js
```

Server starts on `http://localhost:4000`. Health check: `GET /api/health`.

## Environment variables (`.env`)

| Var | Required? | Purpose |
|---|---|---|
| `PORT` | no (default 4000) | server port |
| `JWT_SECRET` | recommended | secret used to sign login tokens |
| `ANTHROPIC_API_KEY` | no | if set, `/api/guidance` gets real AI-generated legal guidance. If unset, it automatically falls back to built-in rule-based guidance for the 6 issue categories already on the site (Salary Withheld, Fired Without Notice, etc.) — so the demo works either way. |

## Data storage

Plain JSON files under `data/` (`users.json`, `otps.json`, `cases.json`, `contact_messages.json`). No DB server to install or configure. Good enough for a hackathon; swap for Postgres/Mongo later if you keep building this.

## Endpoints

### Auth
- `POST /api/auth/send-otp` `{ phone }` → generates a 6-digit OTP, valid 5 min. **Simulated delivery**: it's logged to the server console (`[OTP] +91... => 123456`), same as the frontend's own "this demo simulates OTP locally" note. Swap in Twilio/MSG91/Firebase in `routes/auth.js` to actually text it.
- `POST /api/auth/verify-otp` `{ phone, otp, preferred_language?, guest_id? }` → verifies, creates/finds the user, migrates any cases from `guest_id` to the new user, returns `{ token, user }`.
- `POST /api/auth/guest` → issues a server-side guest id (optional; the frontend already generates its own).

### Legal guidance (the core feature)
- `POST /api/guidance` `{ query, language?, owner_id? }` → returns `{ case_id, category, guidance_points, next_steps, disclaimer, source }`. `source` is `"ai"` or `"offline-fallback"` depending on whether `ANTHROPIC_API_KEY` is set. Every call is saved as a case automatically.

### Cases
- `GET /api/cases?owner_id=...` → list cases for a guest id or logged-in user id.
- `GET /api/cases/:case_id` → single case detail.
- `POST /api/cases` `{ owner_id, issue_summary, full_conversation_log, ... }` → save a case directly (used for voice-input drafts).

### Contact
- `POST /api/contact` `{ name, email, phone?, issue, message }` → stores the message (logged to console; wire up real email if you want).

Auth note: every route also accepts an `Authorization: Bearer <token>` header from a logged-in user — `req.user` gets populated automatically and is used as a fallback `owner_id` if you don't pass one explicitly.

## Frontend integration

`script.js` in the frontend has already been updated to call this backend (see the `frontend-integrated/` folder) instead of localStorage/hardcoded data. It points at `http://localhost:4000` by default — change `API_BASE_URL` at the top of `script.js` (or set `window.RIGHTSMITRA_API_URL` before it loads) once you deploy the backend somewhere real.

## Deploying

This is a plain Node HTTP server, so it deploys anywhere Node runs: Render, Railway, Fly.io, a VM, etc. Just set the env vars and run `node server.js` (or `npm start`). Since your frontend is on Vercel as static HTML, keep the backend as a separate deployment and point `API_BASE_URL` at its public URL — don't forget it needs to be HTTPS if the frontend is served over HTTPS (mixed-content will get blocked otherwise).
