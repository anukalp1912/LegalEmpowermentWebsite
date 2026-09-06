const store = require('../lib/store');

const LANG_NAMES = { en: 'English', hi: 'Hindi', ta: 'Tamil', bn: 'Bengali', te: 'Telugu', mr: 'Marathi' };

// Mirrors the issue-tag buttons already in index.html, and doubles as the
// offline fallback when no ANTHROPIC_API_KEY is configured.
const FALLBACK_GUIDANCE = {
  'Salary Withheld': [
    'Under the Payment of Wages Act, 1936, withholding salary is illegal.',
    'Your employer must pay you within specified periods (usually by the 7th of next month).',
    'You can file a complaint with the District Labor Officer (DLO).',
    'Collect evidence: salary slips, employment contract, bank statements.',
    'Send a formal written demand to your employer with dates and amounts.',
  ],
  'Fired Without Notice': [
    'Under the Industrial Employment (Standing Orders) Act, termination requires notice.',
    'Illegal termination can result in compensation: at least 15 days wages.',
    'Document everything: termination date, reasons given, any communications.',
    'File a complaint with the Conciliation Officer within 60 days.',
  ],
  'Excessive Hours': [
    'The Factories Act limits work to 48 hours per week with mandatory rest.',
    'Overtime must be compensated at 1.5x or 2x the regular wage depending on state.',
    'You are entitled to at least one rest day per week.',
    'Document your working hours for evidence.',
  ],
  'No Contract': [
    "While written contracts are ideal, absence doesn't deny you worker rights.",
    'All labor laws apply regardless of a written agreement.',
    'You remain entitled to minimum wage, leave, and safety protections.',
    'Document your employment: salary receipts, communications, witnesses.',
  ],
  'Workplace Injury': [
    "Your employer is liable for workplace injuries under the Workmen's Compensation Act.",
    'Report the injury immediately to your employer and seek a medical certificate.',
    'You may claim disability compensation and medical expenses.',
    'Notify the appropriate labor authority about the incident.',
  ],
  'Sexual Harassment': [
    'Sexual harassment is a serious crime under the IPC and POSH Act.',
    "Report immediately to your employer's Internal Complaints Committee.",
    'File a complaint with the police if the harassment is severe.',
    'Contact the Women Helpline: 181 for immediate support.',
  ],
};

function matchCategory(text) {
  const lower = text.toLowerCase();
  for (const category of Object.keys(FALLBACK_GUIDANCE)) {
    if (lower.includes(category.toLowerCase()) || lower.includes(category.toLowerCase().split(' ')[0])) {
      return category;
    }
  }
  return null;
}

function fallbackResponse(category) {
  const points = FALLBACK_GUIDANCE[category] || [
    'Document everything: keep records of all employment-related communications, payments, and incidents.',
    'Know your rights: as a worker in India, you have legal protections under various labor laws.',
    'Contact your District Labor Officer or the Worker Helpline: 1800-WORKER-1.',
  ];
  return {
    category: category || 'General',
    guidance_points: points,
    next_steps: [
      'Contact the District Labor Officer in your area for formal assistance.',
      'Call the Worker Helpline: 1800-WORKER-1 (toll-free)',
      'Consult with a legal aid organization for free legal advice.',
    ],
    disclaimer: 'This is general guidance. For specific legal advice about your situation, please consult a qualified labor lawyer or legal aid organization.',
    source: 'offline-fallback',
  };
}

async function getAIGuidance(query, category, language) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return null;

  const langName = LANG_NAMES[language] || 'English';
  const systemPrompt = `You are a legal-guidance assistant for RightsMitra, helping Indian workers (domestic workers, drivers, delivery partners, daily-wage laborers) understand their workplace rights under Indian labor law. Respond in ${langName}. Be clear, simple, non-technical, and encouraging. Reference relevant Indian labor laws (Payment of Wages Act, Industrial Employment Standing Orders Act, Factories Act, Workmen's Compensation Act, POSH Act, etc.) where applicable. Always end by reminding them this is general guidance, not a substitute for a qualified labor lawyer. Respond ONLY with valid JSON, no markdown fences, matching exactly this shape: {"category": string, "guidance_points": string[], "next_steps": string[], "disclaimer": string}`;
  const userContent = category ? `Worker's issue category: ${category}. Their message: "${query}"` : `Worker's message: "${query}"`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1000,
        system: systemPrompt,
        messages: [{ role: 'user', content: userContent }],
      }),
    });
    if (!response.ok) {
      console.error('Anthropic API error:', response.status, await response.text());
      return null;
    }
    const data = await response.json();
    const text = data.content.map((b) => b.text || '').join('').trim();
    const cleaned = text.replace(/^```json\s*|```$/g, '').trim();
    const parsed = JSON.parse(cleaned);
    parsed.source = 'ai';
    return parsed;
  } catch (err) {
    console.error('AI guidance call failed:', err.message);
    return null;
  }
}

// POST /api/guidance { query, language, owner_id }
async function postGuidance(req, res, body) {
  const { query, language, owner_id } = body;
  if (!query || !query.trim()) return res.status(400).json({ error: 'query is required' });

  const lang = language || 'en';
  const category = matchCategory(query);
  let result = await getAIGuidance(query, category, lang);
  if (!result) result = fallbackResponse(category);

  const owner = owner_id || req.user?.user_id || 'anonymous';
  const case_id = `case_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

  store.insert('cases', {
    case_id,
    owner_id: owner,
    issue_summary: query.slice(0, 120),
    category: result.category || category || 'General',
    language: lang,
    full_conversation_log: [{ type: 'text', text: query, ts: new Date().toISOString() }],
    guidance_response: result,
    verdict: null,
    notice_generated: false,
    region: null,
    created_at: new Date().toISOString(),
  });

  res.status(200).json({ case_id, ...result });
}

module.exports = { postGuidance };
