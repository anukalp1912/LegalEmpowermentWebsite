const store = require('../lib/store');

// GET /api/cases?owner_id=guest_xxx or user_xxx
function listCases(req, res, body, query) {
  const owner_id = query.owner_id || req.user?.user_id;
  if (!owner_id) return res.status(400).json({ error: 'owner_id query param required (guest_id or user_id)' });

  const cases = store
    .filter('cases', (c) => c.owner_id === owner_id)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  res.status(200).json({ cases });
}

// GET /api/cases/:case_id
function getCase(req, res, body, query, params) {
  const c = store.find('cases', (c) => c.case_id === params.case_id);
  if (!c) return res.status(404).json({ error: 'Case not found' });
  res.status(200).json(c);
}

// POST /api/cases - direct save (e.g. voice-input drafts), mirrors saveCase() in script.js
function createCase(req, res, body) {
  const { owner_id, issue_summary, full_conversation_log, category, language, region } = body;
  const owner = owner_id || req.user?.user_id;
  if (!owner) return res.status(400).json({ error: 'owner_id is required' });
  if (!issue_summary) return res.status(400).json({ error: 'issue_summary is required' });

  const case_id = `case_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const created_at = new Date().toISOString();

  store.insert('cases', {
    case_id,
    owner_id: owner,
    issue_summary: issue_summary.slice(0, 120),
    category: category || null,
    language: language || 'en',
    full_conversation_log: full_conversation_log || [],
    guidance_response: null,
    verdict: null,
    notice_generated: false,
    region: region || null,
    created_at,
  });

  res.status(201).json({ case_id, owner_id: owner, timestamp: created_at });
}

module.exports = { listCases, getCase, createCase };
