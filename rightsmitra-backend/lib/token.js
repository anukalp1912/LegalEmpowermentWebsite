// A minimal signed-token implementation (HMAC-SHA256), functionally
// equivalent to a JWT for our purposes, without pulling in a dependency.
const crypto = require('crypto');

const SECRET = process.env.JWT_SECRET || 'dev-secret-change-in-production';
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

function base64url(input) {
  return Buffer.from(input).toString('base64url');
}

function sign(payload, ttlMs = THIRTY_DAYS_MS) {
  const body = base64url(JSON.stringify({ ...payload, exp: Date.now() + ttlMs }));
  const sig = crypto.createHmac('sha256', SECRET).update(body).digest('base64url');
  return `${body}.${sig}`;
}

function verify(token) {
  if (!token || !token.includes('.')) return null;
  const [body, sig] = token.split('.');
  const expected = crypto.createHmac('sha256', SECRET).update(body).digest('base64url');
  if (sig !== expected) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
    if (payload.exp && Date.now() > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

module.exports = { sign, verify };
