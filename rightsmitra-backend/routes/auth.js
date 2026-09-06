const store = require('../lib/store');
const token = require('../lib/token');

const OTP_TTL_MS = 5 * 60 * 1000;
const MAX_ATTEMPTS = 5;

function genId(prefix) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

// POST /api/auth/send-otp { phone }
// Simulates OTP delivery (logs to server console), same as the frontend's
// own demo note. Swap the console.log for Twilio/MSG91/Firebase to go live.
function sendOtp(req, res, body) {
  const { phone } = body;
  if (!phone || !/^\+?[0-9]{10,15}$/.test(phone)) {
    return res.status(400).json({ error: 'Valid phone number required' });
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  store.upsert(
    'otps',
    (o) => o.phone_number === phone,
    { phone_number: phone, code, expires_at: Date.now() + OTP_TTL_MS, attempts: 0 }
  );

  console.log(`[OTP] ${phone} => ${code} (expires in 5 min)`);
  res.status(200).json({ success: true, message: 'OTP sent', expires_in_seconds: OTP_TTL_MS / 1000 });
}

// POST /api/auth/verify-otp { phone, otp, preferred_language, guest_id }
function verifyOtp(req, res, body) {
  const { phone, otp, preferred_language, guest_id } = body;
  if (!phone || !otp) return res.status(400).json({ error: 'phone and otp are required' });

  const row = store.find('otps', (o) => o.phone_number === phone);
  if (!row) return res.status(400).json({ error: 'No OTP requested for this number' });
  if (row.attempts >= MAX_ATTEMPTS) return res.status(429).json({ error: 'Too many attempts, request a new OTP' });
  if (Date.now() > row.expires_at) return res.status(400).json({ error: 'OTP expired' });

  if (row.code !== otp) {
    store.update('otps', (o) => o.phone_number === phone, { attempts: row.attempts + 1 });
    return res.status(400).json({ error: 'Incorrect OTP' });
  }

  store.remove('otps', (o) => o.phone_number === phone);

  let user = store.find('users', (u) => u.phone_number === phone);
  if (!user) {
    user = {
      user_id: genId('user'),
      phone_number: phone,
      preferred_language: preferred_language || 'en',
      created_at: new Date().toISOString(),
    };
    store.insert('users', user);
  }

  if (guest_id) {
    store.update('cases', (c) => c.owner_id === guest_id, { owner_id: user.user_id });
  }

  const jwt = token.sign({ user_id: user.user_id, phone_number: user.phone_number });
  res.status(200).json({ success: true, token: jwt, user });
}

// POST /api/auth/guest
function createGuest(req, res) {
  res.status(200).json({
    guest_id: genId('guest'),
    guest_flag: true,
    created_at: new Date().toISOString(),
  });
}

module.exports = { sendOtp, verifyOtp, createGuest };
