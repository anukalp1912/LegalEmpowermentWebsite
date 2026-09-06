const http = require('http');
const { URL } = require('url');
const fs = require('fs');
const path = require('path');

const token = require('./lib/token');
const auth = require('./routes/auth');
const guidance = require('./routes/guidance');
const cases = require('./routes/cases');
const contact = require('./routes/contact');

// Load .env manually (no dotenv dependency)
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const match = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (match && !process.env[match[1]]) process.env[match[1]] = match[2];
  }
}

const PORT = process.env.PORT || 4000;

// --- tiny router ---------------------------------------------------------
const routes = [
  { method: 'GET', pattern: /^\/api\/health$/, handler: (req, res) => res.status(200).json({ status: 'ok', service: 'rightsmitra-backend' }) },
  { method: 'POST', pattern: /^\/api\/auth\/send-otp$/, handler: (req, res, body) => auth.sendOtp(req, res, body) },
  { method: 'POST', pattern: /^\/api\/auth\/verify-otp$/, handler: (req, res, body) => auth.verifyOtp(req, res, body) },
  { method: 'POST', pattern: /^\/api\/auth\/guest$/, handler: (req, res) => auth.createGuest(req, res) },
  { method: 'POST', pattern: /^\/api\/guidance$/, handler: (req, res, body) => guidance.postGuidance(req, res, body) },
  { method: 'GET', pattern: /^\/api\/cases$/, handler: (req, res, body, query) => cases.listCases(req, res, body, query) },
  { method: 'POST', pattern: /^\/api\/cases$/, handler: (req, res, body) => cases.createCase(req, res, body) },
  { method: 'GET', pattern: /^\/api\/cases\/([^/]+)$/, handler: (req, res, body, query, m) => cases.getCase(req, res, body, query, { case_id: m[1] }) },
  { method: 'POST', pattern: /^\/api\/contact$/, handler: (req, res, body) => contact.submitContact(req, res, body) },
];

function withResHelpers(res) {
  res.status = function (code) {
    res.statusCode = code;
    return res;
  };
  res.json = function (obj) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(obj));
  };
  return res;
}

function readBody(req) {
  return new Promise((resolve) => {
    let data = '';
    req.on('data', (chunk) => (data += chunk));
    req.on('end', () => {
      if (!data) return resolve({});
      try {
        resolve(JSON.parse(data));
      } catch {
        resolve({});
      }
    });
  });
}

function attachUser(req) {
  const header = req.headers['authorization'];
  req.user = null;
  if (header && header.startsWith('Bearer ')) {
    req.user = token.verify(header.slice(7));
  }
}

const server = http.createServer(async (req, res) => {
  // CORS - wide open for hackathon speed; restrict origin in production
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }

  withResHelpers(res);
  attachUser(req);

  const url = new URL(req.url, `http://${req.headers.host}`);
  const query = Object.fromEntries(url.searchParams);

  const body = req.method === 'POST' || req.method === 'PUT' ? await readBody(req) : {};

  for (const route of routes) {
    if (route.method !== req.method) continue;
    const m = url.pathname.match(route.pattern);
    if (m) {
      try {
        await route.handler(req, res, body, query, m);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      }
      return;
    }
  }

  res.status(404).json({ error: 'Not found' });
});

server.listen(PORT, () => {
  console.log(`RightsMitra backend running on http://localhost:${PORT}`);
  if (!process.env.ANTHROPIC_API_KEY) {
    console.log('ANTHROPIC_API_KEY not set - /api/guidance will use offline fallback guidance.');
  }
});
