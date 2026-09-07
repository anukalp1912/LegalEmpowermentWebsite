# RightsMitra Flask Backend

Beginner-friendly Flask backend for the RightsMitra worker legal-empowerment
site. It matches the original Node.js API while keeping data in plain JSON
files instead of requiring a database.

## Run it

```bash
cd rightsmitra-backend
python -m venv .venv
source .venv/bin/activate       # Windows: .venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

The server starts at `http://localhost:4000`. Check it with
`GET /api/health`.

## Environment variables

| Variable | Default | Purpose |
|---|---|---|
| `PORT` | `4000` | Flask server port |
| `JWT_SECRET` | development secret | HMAC key used to sign login tokens |
| `RIGHTSMITRA_DATA_DIR` | `data/` | Optional directory for JSON tables |

## Data storage

`storage.py` provides small `load`, `insert`, `update`, `find`, and `filter`
helpers. The four JSON tables are `users.json`, `otps.json`, `cases.json`, and
`contact_messages.json`. This is intentionally simple for learning; a real
production service should use a database and stronger operational controls.

## Endpoints

- `GET /api/health`
- `POST /api/auth/send-otp` `{ phone }` (also supports the frontend's legacy
  `/api/send-otp`)
- `POST /api/auth/verify-otp` `{ phone, otp, preferred_language?, guest_id? }`
  (also supports `/api/verify-otp` and the frontend's `code` field)
- `POST /api/auth/guest`
- `POST /api/guidance` `{ query, language?, owner_id? }`
- `GET /api/cases?owner_id=...`
- `GET /api/cases/:case_id`
- `POST /api/cases`
- `POST /api/contact`

OTP delivery is simulated by printing the six-digit code to the server
console. Guidance is an offline fallback for the six worker issue categories
and every guidance request is saved as a case. CORS is enabled for `/api/*`
so a static frontend on another port can call the server.
