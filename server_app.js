// server_app.js - minimal Express server for RightsMitra demo
// Usage: set environment variables as described below, then `node server_app.js`

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const {
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_VERIFY_SID,
  OPENAI_API_KEY,
  PORT = 3000
} = process.env;

let supabase = null;
if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
  supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
}

let twilio = null;
if (TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN) {
  const Twilio = require('twilio');
  twilio = Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
}

// 1) /api/send-otp
app.post('/api/send-otp', async (req, res) => {
  const { phone } = req.body || {};
  if (!phone) return res.status(400).json({ ok: false, error: 'phone required' });
  try {
    if (!twilio) return res.json({ ok: true, demo: true });
    await twilio.verify.services(TWILIO_VERIFY_SID).verifications.create({ to: phone, channel: 'sms' });
    return res.json({ ok: true });
  } catch (err) {
    console.error('send-otp error', err);
    return res.status(500).json({ ok: false, error: String(err) });
  }
});

// 2) /api/verify-otp
app.post('/api/verify-otp', async (req, res) => {
  const { phone, code, preferred_language, guest_session_id } = req.body || {};
  if (!phone || !code) return res.status(400).json({ ok: false, error: 'phone and code required' });
  try {
    if (twilio) {
      const check = await twilio.verify.services(TWILIO_VERIFY_SID).verificationChecks.create({ to: phone, code });
      if (!check || check.status !== 'approved') return res.status(400).json({ ok: false, error: 'invalid code' });
    } else {
      // demo acceptance (be careful in production)
      console.warn('Twilio not configured; demo verify allows any code');
    }

    // Upsert user in Supabase
    const user_id = 'user_' + Date.now() + '_' + Math.random().toString(36).slice(2,8);
    const userRow = { id: user_id, phone_number: phone, preferred_language: preferred_language || 'en', created_at: new Date().toISOString(), guest_flag: false };

    if (supabase) {
      try {
        const { data, error } = await supabase.from('users').upsert(userRow, { returning: 'representation', onConflict: 'phone_number' });
        if (error) console.warn('supabase upsert user error', error);
        if (data && data.length) userRow.id = data[0].id || userRow.id;
      } catch (e) { console.warn(e); }
    }

    // Migrate guest cases if provided
    if (guest_session_id && supabase) {
      try {
        await supabase.from('cases').update({ user_id: userRow.id, guest_session_id: null }).eq('guest_session_id', guest_session_id);
      } catch (e) { console.warn('migrate guest failed', e); }
    }

    const out = { user: { user_id: userRow.id, phone_number: phone, preferred_language: userRow.preferred_language, created_at: userRow.created_at, guest_flag: false }, ok: true };
    return res.json(out);
  } catch (err) {
    console.error('verify-otp error', err);
    return res.status(500).json({ ok: false, error: String(err) });
  }
});

// 3) Cases endpoints
// POST /api/cases  - create case (body: case object)
app.post('/api/cases', async (req, res) => {
  const c = req.body || {};
  if (!c.case_id) c.case_id = 'case_' + Date.now() + '_' + Math.random().toString(36).slice(2,6);
  if (!c.timestamp) c.timestamp = new Date().toISOString();
  try {
    if (supabase) {
      const { error } = await supabase.from('cases').insert([{
        case_id: c.case_id,
        user_id: c.user_id || null,
        guest_session_id: c.guest_session_id || null,
        timestamp: c.timestamp,
        issue_summary: c.issue_summary || null,
        full_conversation_log: c.full_conversation_log || null,
        verdict: c.verdict || null,
        notice_generated: c.notice_generated || false,
        region: c.region || null
      }]);
      if (error) return res.status(500).json({ ok: false, error: String(error) });
    }
    return res.json({ ok: true, case: c });
  } catch (err) {
    console.error('create case error', err);
    return res.status(500).json({ ok: false, error: String(err) });
  }
});

// GET /api/cases?user_id=... or ?guest_session_id=...
app.get('/api/cases', async (req, res) => {
  const { user_id, guest_session_id } = req.query || {};
  try {
    if (!supabase) {
      return res.json({ ok: true, cases: [] });
    }
    let q = supabase.from('cases').select('*').order('timestamp', { ascending: false });
    if (user_id) q = q.eq('user_id', user_id);
    if (guest_session_id) q = q.eq('guest_session_id', guest_session_id);
    const { data, error } = await q;
    if (error) return res.status(500).json({ ok: false, error: String(error) });
    return res.json({ ok: true, cases: data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: String(err) });
  }
});

// GET /api/cases/:case_id
app.get('/api/cases/:case_id', async (req, res) => {
  const { case_id } = req.params;
  try {
    if (!supabase) return res.status(404).json({ ok: false, error: 'not available' });
    const { data, error } = await supabase.from('cases').select('*').eq('case_id', case_id).limit(1);
    if (error) return res.status(500).json({ ok: false, error: String(error) });
    return res.json({ ok: true, case: data && data[0] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: String(err) });
  }
});

// 4) Guidance endpoint (RAG skeleton)
// POST /api/get-guidance { userText, langCode, user_id?, guest_session_id?, region? }
// Returns structured JSON as specified by app front-end.
app.post('/api/get-guidance', async (req, res) => {
  const { userText, langCode = 'en-IN', user_id, guest_session_id, region } = req.body || {};
  if (!userText) return res.status(400).json({ ok: false, error: 'userText required' });

  try {
    // 1) Retrieve matching law clauses from Supabase (RAG) - simplified here
    let retrievedClauses = [];
    if (supabase && region) {
      // Example: full-text search in a laws table (implement your own schema)
      try {
        const { data } = await supabase.from('laws').select('id,title,text').ilike('text', `%${userText.split(' ').slice(0,6).join('%')}%`).limit(5);
        retrievedClauses = data || [];
      } catch(e) { console.warn(e); }
    }

    // 2) Build LLM prompt (system + user). Use OPENAI_API_KEY to call OpenAI completion
    const systemPrompt = `You are a legal assistant for Indian labor issues. Never provide medical diagnoses. Only provide general safety guidance when appropriate. Respond ONLY in ${langCodeToName(langCode)} using simple everyday language for workers. Output STRICT JSON with keys: verdict, confidence_score (0-100), case_summary, explanation, relevant_law_citation, action_plan (array of {step,action}), additional_advice (object with financial, medical, emotional_support, documentation_tips), who_to_contact (array of {name, how}), disclaimer.`;

    const userPrompt = `User described: "${userText}"\n\nRetrieved law clauses: ${retrievedClauses.map(r=> r.title + ': ' + r.text).join('\n---\n')}`;

    // Call OpenAI (example using fetch)
    let guidance = null;
    if (OPENAI_API_KEY) {
      const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${OPENAI_API_KEY}` },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [ { role: 'system', content: systemPrompt }, { role: 'user', content: userPrompt } ],
          max_tokens: 800,
          temperature: 0.2
        })
      });
      const openaiJson = await openaiRes.json();
      const text = openaiJson?.choices?.[0]?.message?.content;
      try { guidance = JSON.parse(text); } catch (e) {
        console.warn('LLM did not return valid JSON, returning sample guidance', e);
      }
    }

    // Fallback sample guidance if LLM not available or parse failed
    if (!guidance) {
      guidance = {
        verdict: 'grey_area',
        confidence_score: 60,
        case_summary: 'Employer has delayed paying wages for two months.',
        explanation: 'Delayed salary is often illegal; you should document and demand payment.',
        relevant_law_citation: 'Payment of Wages Act, 1936 (example)',
        action_plan: [ {step:1, action:'Collect payslips and messages'}, {step:2, action:'Send written demand'}, {step:3, action:'File complaint with DLO if unresolved in 15 days'} ],
        additional_advice: { financial:'Contact local relief schemes', medical:'If injured seek immediate care', emotional_support:'Call helpline 1800-XXX-XXX', documentation_tips:'Keep photos and messages' },
        who_to_contact: [ {name:'District Labor Officer', how:'Visit local labor office'}, {name:'Free Legal Aid', how:'1800-XXX-XXXX'} ],
        disclaimer: 'General guidance; not a substitute for professional legal or medical advice.'
      };
    }

    // 3) Persist case record if needed
    const caseRecord = {
      case_id: 'case_' + Date.now() + '_' + Math.random().toString(36).slice(2,6),
      user_id: user_id || null,
      guest_session_id: guest_session_id || null,
      timestamp: new Date().toISOString(),
      issue_summary: (guidance.case_summary || userText).slice(0,200),
      full_conversation_log: [{type:'user',text:userText,ts:new Date().toISOString()}],
      verdict: guidance.verdict || null,
      notice_generated: false,
      region: region || null
    };
    if (supabase) {
      try { await supabase.from('cases').insert([caseRecord]); } catch(e){ console.warn('persist case failed', e); }
    }

    return res.json({ ok: true, guidance, case: caseRecord });
  } catch (err) {
    console.error('get-guidance error', err);
    return res.status(500).json({ ok: false, error: String(err) });
  }
});

function langCodeToName(code) {
  const m = { 'hi-IN':'Hindi','hi':'Hindi','ta-IN':'Tamil','ta':'Tamil','bn-IN':'Bengali','bn':'Bengali','te-IN':'Telugu','te':'Telugu','mr-IN':'Marathi','mr':'Marathi','en-IN':'English','en':'English' };
  return m[code] || m[code.split('-')[0]] || 'English';
}

app.listen(PORT, () => console.log('Auth+Cases+Guidance API listening on', PORT));
