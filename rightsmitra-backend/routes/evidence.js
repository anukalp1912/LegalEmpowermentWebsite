const fs = require('fs');
const path = require('path');
const store = require('../lib/store');

// Feature: Evidence Checklist
const uploadsRoot = path.join(__dirname, '..', 'data', 'uploads');
const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;
const allowedMimeTypes = new Set(['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf']);

function parseDataUrl(data) {
  const match = String(data || '').match(/^data:([^;]+);base64,([A-Za-z0-9+/=\s]+)$/);
  if (!match || !allowedMimeTypes.has(match[1])) return null;
  const buffer = Buffer.from(match[2].replace(/\s/g, ''), 'base64');
  if (!buffer.length || buffer.length > MAX_UPLOAD_BYTES) return null;
  return { mimeType: match[1], buffer };
}

function findCase(caseId) {
  return store.find('cases', (item) => item.case_id === caseId);
}

function listEvidence(req, res, body, query, params) {
  const caseData = findCase(params.case_id);
  if (!caseData) return res.status(404).json({ error: 'Case not found' });
  res.status(200).json({ evidence: caseData.evidence || [] });
}

function addEvidence(req, res, body, query, params) {
  const caseData = findCase(params.case_id);
  if (!caseData) return res.status(404).json({ error: 'Case not found' });
  const { type, filename, data, checklist_item, note } = body;
  const parsed = parseDataUrl(data);
  if (!parsed) return res.status(400).json({ error: 'data must be a supported image or PDF base64 data URL under 5MB' });

  const evidenceId = `evidence_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const safeName = path.basename(filename || `${evidenceId}.upload`).replace(/[^a-zA-Z0-9._-]/g, '_');
  const uploadDir = path.join(uploadsRoot, params.case_id);
  fs.mkdirSync(uploadDir, { recursive: true });
  fs.writeFileSync(path.join(uploadDir, `${evidenceId}_${safeName}`), parsed.buffer);
  const item = { evidence_id: evidenceId, case_id: params.case_id, type: type || 'other', filename: safeName, data: path.join('data', 'uploads', params.case_id, `${evidenceId}_${safeName}`), checklist_item: checklist_item || '', uploaded_at: new Date().toISOString(), note: note || '' };
  const evidence = caseData.evidence || [];
  evidence.push(item);
  store.update('cases', (entry) => entry.case_id === params.case_id, { evidence });
  res.status(201).json({ evidence: item });
}

module.exports = { listEvidence, addEvidence };
