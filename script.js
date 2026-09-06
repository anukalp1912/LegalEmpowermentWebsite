// Sample legal guidance database
const legalGuidanceDatabase = {
    'Salary Withheld': [
        'Under the Payment of Wages Act, 1936, withholding salary is illegal.',
        'Your employer must pay you within specified periods (usually by the 7th of next month).',
        'You can file a complaint with the District Labor Officer (DLO).',
        'Collect evidence: salary slips, employment contract, bank statements.',
        'Send a formal written demand to your employer with dates and amounts.',
        'You may be entitled to compensation and penalties under the law.'
    ],
    'Fired Without Notice': [
        'Under the Industrial Employment (Standing Orders) Act, termination requires notice.',
        'Illegal termination can result in compensation: at least 15 days wages.',
        'Document everything: termination date, reasons given, any communications.',
        'File a complaint with the Conciliation Officer within 60 days.',
        'You can approach the Labor Court for reinstatement or compensation.',
        'Keep copies of all employment-related documents.'
    ],
    'Excessive Hours': [
        'The Factories Act limits work to 48 hours per week with mandatory rest.',
        'Overtime must be compensated at 1.5x or 2x the regular wage depending on state.',
        'You are entitled to at least one rest day per week.',
        'Document your working hours for evidence.',
        'File a complaint if working hours exceed legal limits.',
        'Seek compensation for unpaid overtime through labor authorities.'
    ],
    'No Contract': [
        'While written contracts are ideal, absence doesn\'t deny you worker rights.',
        'All labor laws apply regardless of a written agreement.',
        'You should request a written contract from your employer.',
        'In disputes, witness testimony can prove the employment relationship.',
        'You remain entitled to minimum wage, leave, and safety protections.',
        'Document your employment: salary receipts, communications, witnesses.'
    ],
    'Workplace Injury': [
        'Your employer is liable for workplace injuries under the Workmen\'s Compensation Act.',
        'Report the injury immediately to your employer.',
        'Seek medical treatment and get a medical certificate.',
        'You may claim disability compensation and medical expenses.',
        'Notify the appropriate labor authority about the incident.',
        'Keep all medical documents and injury evidence.'
    ],
    'Sexual Harassment': [
        'Sexual harassment is a serious crime under the IPC and POSH Act.',
        'Report immediately to your employer\'s Internal Complaints Committee.',
        'File a complaint with the police if the harassment is severe.',
        'Document all incidents with dates, times, and witnesses.',
        'You have legal protection against retaliation for reporting.',
        'Contact women\'s helplines for immediate support: 181 (Women Helpline).'
    ]
};

// DOM Elements
const submitBtn = document.getElementById('submitBtn');
const clearBtn = document.getElementById('clearBtn');
const userQuestionInput = document.getElementById('userQuestion');
const responseSection = document.getElementById('responseSection');
const responseContent = document.getElementById('responseContent');
const closeResponseBtn = document.getElementById('closeResponseBtn');
const issueTags = document.querySelectorAll('.issue-tag');
const faqQuestions = document.querySelectorAll('.faq-question');
const contactForm = document.getElementById('contactForm');
const formResponse = document.getElementById('formResponse');

// Event Listeners
if (submitBtn) submitBtn.addEventListener('click', handleSubmit);
if (clearBtn) clearBtn.addEventListener('click', handleClear);
if (closeResponseBtn) closeResponseBtn.addEventListener('click', closeResponse);
if (contactForm) contactForm.addEventListener('submit', handleContactForm);

// Issue tag click handlers
issueTags.forEach(tag => {
    tag.addEventListener('click', () => {
        const issue = tag.getAttribute('data-issue');
        if (userQuestionInput) {
            userQuestionInput.value = `I have a problem with: ${issue}`;
            userQuestionInput.focus();
        }
    });
});

// FAQ accordion
faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        faqItem.classList.toggle('active');
    });
});

// Handle form submission
function handleSubmit() {
    const userInput = userQuestionInput.value.trim();

    if (!userInput) {
        alert('Please describe your issue or ask a question.');
        return;
    }

    // Find matching issue category
    let matchingCategory = null;
    for (const category in legalGuidanceDatabase) {
        if (userInput.toLowerCase().includes(category.toLowerCase()) || 
            userInput.toLowerCase().includes(category.toLowerCase().split(' ')[0])) {
            matchingCategory = category;
            break;
        }
    }

    // Generate response
    const response = generateLegalGuidance(userInput, matchingCategory);
    displayResponse(response);
}

// Generate legal guidance
function generateLegalGuidance(userInput, category) {
    let response = '<div class="guidance-response">';
    
    response += '<h4>Your Legal Guidance:</h4>';
    
    if (category && legalGuidanceDatabase[category]) {
        response += `<p><strong>Category: ${category}</strong></p>`;
        response += '<ul style="margin-left: 20px;">';
        legalGuidanceDatabase[category].forEach(point => {
            response += `<li style="margin-bottom: 10px;">${point}</li>`;
        });
        response += '</ul>';
    } else {
        response += '<p>Based on your situation, here are some general guidelines:</p>';
        response += '<ul style="margin-left: 20px;">';
        response += '<li style="margin-bottom: 10px;">Document everything: Keep records of all employment-related communications, payments, and incidents.</li>';
        response += '<li style="margin-bottom: 10px;">Know your rights: As a worker in India, you have legal protections under various labor laws.</li>';
        response += '<li style="margin-bottom: 10px;">Seek evidence: Collect witnesses, photographs, salary slips, or any supporting documents.</li>';
        response += '<li style="margin-bottom: 10px;">Report formally: Send written complaints to your employer with dates and specific details.</li>';
        response += '<li style="margin-bottom: 10px;">Contact authorities: Reach out to your District Labor Officer or labor department.</li>';
        response += '<li style="margin-bottom: 10px;">Get legal help: Consider consulting with a labor lawyer for complex cases.</li>';
        response += '</ul>';
    }

    response += '<h4 style="margin-top: 20px;">Next Steps:</h4>';
    response += '<ul style="margin-left: 20px;">';
    response += '<li style="margin-bottom: 10px;">Contact the District Labor Officer in your area for formal assistance.</li>';
    response += '<li style="margin-bottom: 10px;">Call the Worker Helpline: 1800-WORKER-1 (toll-free)</li>';
    response += '<li style="margin-bottom: 10px;">Consult with a legal aid organization for free legal advice.</li>';
    response += '<li style="margin-bottom: 10px;">Document your case thoroughly before filing any complaint.</li>';
    response += '</ul>';

    response += '<p style="margin-top: 20px; color: #34D399;"><strong>Remember:</strong> This is general guidance. For specific legal advice about your situation, please consult with a qualified labor lawyer or legal aid organization.</p>';
    response += '</div>';

    return response;
}

// Display response
function displayResponse(response) {
    responseContent.innerHTML = response;
    responseSection.classList.remove('hidden');
    responseSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Close response
function closeResponse() {
    responseSection.classList.add('hidden');
}

// Clear form
function handleClear() {
    userQuestionInput.value = '';
    userQuestionInput.focus();
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#home') {
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Enhanced voice input with mic toggle and guest/session case storage
let micEnabled = true; // user can toggle to disable microphone
let ongoingRecognition = null; // keep reference to stop mid-listen

// Ensure a guest session exists (stored in localStorage)
function createGuestSessionIfNeeded() {
    if (!localStorage.getItem('guestSessionId')) {
        const id = 'guest_' + Date.now() + '_' + Math.random().toString(36).slice(2,9);
        localStorage.setItem('guestSessionId', id);
        localStorage.setItem('currentUser', JSON.stringify({ user_id: id, guest_flag: true, created_at: new Date().toISOString() }));
    }
}
createGuestSessionIfNeeded();

function getCurrentUser() {
    const raw = localStorage.getItem('currentUser');
    return raw ? JSON.parse(raw) : null;
}

function setCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
}

// Case storage helpers (localStorage as simple backend for demo)
function saveCase(caseObj) {
    // determine owner id (user_id or guestSessionId)
    const owner = caseObj.user_id || (getCurrentUser() && getCurrentUser().user_id) || localStorage.getItem('guestSessionId');
    const key = 'cases_' + owner;
    const arr = JSON.parse(localStorage.getItem(key) || '[]');
    arr.unshift(caseObj); // add newest first
    localStorage.setItem(key, JSON.stringify(arr));
    return caseObj.case_id;
}

function getCasesForOwner(ownerId) {
    const key = 'cases_' + ownerId;
    return JSON.parse(localStorage.getItem(key) || '[]');
}

function migrateGuestCasesToUser(guestId, newUserId) {
    const guestKey = 'cases_' + guestId;
    const userKey = 'cases_' + newUserId;
    const guestCases = JSON.parse(localStorage.getItem(guestKey) || '[]');
    const userCases = JSON.parse(localStorage.getItem(userKey) || '[]');
    // prepend guest cases to user's cases (preserve time order)
    const merged = guestCases.concat(userCases);
    localStorage.setItem(userKey, JSON.stringify(merged));
    // remove guest cases
    localStorage.removeItem(guestKey);
}

// Mic toggle handler
const micToggle = document.getElementById('micToggle');
const micToggleIcon = document.getElementById('micToggleIcon');
if (micToggle) {
    micToggle.addEventListener('click', () => {
        micEnabled = !micEnabled;
        micToggleIcon.textContent = micEnabled ? '🔊' : '🔇';
        micToggle.classList.toggle('off', !micEnabled);
        // If mic disabled while listening, stop recognition
        if (!micEnabled && ongoingRecognition) {
            try { ongoingRecognition.stop(); } catch(e) { console.warn(e); }
            ongoingRecognition = null;
        }
    });
}

// Voice button: start/stop recognition only if micEnabled
const voiceBtn = document.getElementById('voiceButton');
if (voiceBtn) {
    voiceBtn.addEventListener('click', async () => {
        if (!micEnabled) { alert('Microphone is turned off. Toggle the mic to enable voice input.'); return; }

        const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const voiceIcon = document.getElementById('voiceIcon');
        const audioBars = document.querySelectorAll('.audio-bar');

        if (!Recognition) {
            alert('Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
            return;
        }

        // If already listening, stop
        if (ongoingRecognition) {
            try { ongoingRecognition.stop(); } catch(e) { console.warn(e); }
            ongoingRecognition = null;
            return;
        }

        const recognition = new Recognition();
        recognition.lang = 'en-IN';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        ongoingRecognition = recognition;

        recognition.onstart = () => {
            if (voiceIcon) voiceIcon.classList.add('speaking');
            audioBars.forEach(bar => bar.classList.add('animating'));
        };

        recognition.onresult = (event) => {
            const transcript = Array.from(event.results).map(r => r[0].transcript).join('');
            if (userQuestionInput) {
                userQuestionInput.value = transcript;
                userQuestionInput.focus();
            }
            // Save a draft case automatically (minimal)
            const c = {
                case_id: 'case_' + Date.now() + '_' + Math.random().toString(36).slice(2,6),
                user_id: getCurrentUser() && getCurrentUser().user_id,
                timestamp: new Date().toISOString(),
                issue_summary: transcript.slice(0,120),
                full_conversation_log: [{type:'voice', text: transcript, ts: new Date().toISOString()}],
                verdict: null,
                notice_generated: false,
                region: null
            };
            saveCase(c);
        };

        recognition.onend = () => {
            if (voiceIcon) voiceIcon.classList.remove('speaking');
            audioBars.forEach(bar => bar.classList.remove('animating'));
            ongoingRecognition = null;
        };

        recognition.onerror = (e) => {
            console.error('Speech recognition error', e);
            if (voiceIcon) voiceIcon.classList.remove('speaking');
            audioBars.forEach(bar => bar.classList.remove('animating'));
            ongoingRecognition = null;
            alert('Speech recognition error: ' + (e.error || 'unknown'));
        };

        try { recognition.start(); } catch (e) { console.error(e); }
    });
}

// Auth functions wired to backend endpoints (Twilio + Supabase)
// Frontend expects two endpoints:
// POST /api/send-otp  { phone }
// POST /api/verify-otp { phone, code, preferred_language }
// Both return JSON: { ok: true, ... } or { ok: false, error: '...' }

// sendOTP supports phone or email: pass { phone } or { email }
async function sendOTP({ phone, email }) {
    try {
        if (email && !phone) {
            const res = await fetch('/api/send-email-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const j = await res.json();
            if (j && j.ok) return true;
            console.warn('sendOTP(email) failed', j);
            return false;
        }

        // default: phone
        const res = await fetch('/api/send-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone })
        });
        const j = await res.json();
        if (j && j.ok) return true;
        console.warn('sendOTP(phone) failed', j);
        return false;
    } catch (err) {
        console.warn('sendOTP network error, falling back to local simulation', err);
        // local fallback for demo/testing
        const contactKey = phone ? 'otp_for_' + phone : 'otp_for_' + email;
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        sessionStorage.setItem(contactKey, code);
        console.log('Simulated OTP for', (phone||email), '=>', code);
        return true;
    }
}

async function loginWithPhone(phoneOrEmail, code, preferred_language, guest_session_id) {
    // phoneOrEmail may be a phone number or an email (detect by presence of @)
    const isEmail = typeof phoneOrEmail === 'string' && phoneOrEmail.includes('@');
    try {
        const payload = isEmail ? { email: phoneOrEmail, code, preferred_language, guest_session_id } : { phone: phoneOrEmail, code, preferred_language, guest_session_id };
        const res = await fetch('/api/verify-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const j = await res.json();
        if (j && j.ok && j.user) {
            // migrate guest cases (server may do this too) - keep client-side as safety
            const guestId = localStorage.getItem('guestSessionId');
            if (guestId) try { migrateGuestCasesToUser(guestId, j.user.user_id); } catch(e){console.warn(e)}
            setCurrentUser(j.user);
            return j.user;
        }
        // fallback local verify for demo mode: check sessionStorage
        const contactKey = isEmail ? ('otp_for_' + phoneOrEmail) : ('otp_for_' + phoneOrEmail);
        const expected = sessionStorage.getItem(contactKey);
        if (expected && expected === code) {
            const userId = 'user_' + Date.now();
            const user = { user_id: userId, phone_number: isEmail ? null : phoneOrEmail, email: isEmail ? phoneOrEmail : null, preferred_language: preferred_language || 'en', created_at: new Date().toISOString(), guest_flag: false };
            const guestId = localStorage.getItem('guestSessionId');
            if (guestId) migrateGuestCasesToUser(guestId, userId);
            setCurrentUser(user);
            return user;
        }
        return null;
    } catch (err) {
        console.error('loginWithPhone error', err);
        // try local fallback
        const contactKey = isEmail ? ('otp_for_' + phoneOrEmail) : ('otp_for_' + phoneOrEmail);
        const expected = sessionStorage.getItem(contactKey);
        if (expected && expected === code) {
            const userId = 'user_' + Date.now();
            const user = { user_id: userId, phone_number: isEmail ? null : phoneOrEmail, email: isEmail ? phoneOrEmail : null, preferred_language: preferred_language || 'en', created_at: new Date().toISOString(), guest_flag: false };
            const guestId = localStorage.getItem('guestSessionId');
            if (guestId) migrateGuestCasesToUser(guestId, userId);
            setCurrentUser(user);
            return user;
        }
        return null;
    }
}

// Cases page rendering helper (if on cases.html)
function renderCasesOnPage() {
    const casesContainer = document.getElementById('casesList');
    if (!casesContainer) return;
    const user = getCurrentUser();
    const owner = (user && user.user_id) || localStorage.getItem('guestSessionId');
    const cases = getCasesForOwner(owner) || [];
    casesContainer.innerHTML = '';
    if (!cases.length) { casesContainer.innerHTML = '<p class="muted">No cases found. Your recent voice inputs will appear here.</p>'; return; }
    cases.forEach(c => {
        const div = document.createElement('div');
        div.className = 'case-card';
        div.innerHTML = `<div class="case-card-header"><strong>${c.issue_summary}</strong><span class="case-ts">${new Date(c.timestamp).toLocaleString()}</span></div>
                         <div class="case-card-body"><p>${(c.full_conversation_log && c.full_conversation_log[0] && c.full_conversation_log[0].text) || ''}</p></div>
                         <div class="case-card-footer"><small>Verdict: ${c.verdict || 'Pending'}</small></div>`;
        div.addEventListener('click', () => {
            // navigate to case detail view (not implemented fully)
            alert('Case details not yet implemented in demo.');
        });
        casesContainer.appendChild(div);
    });
}

// Run on pages where DOM loaded
document.addEventListener('DOMContentLoaded', () => {
    renderCasesOnPage();
});

// Contact form handler
function handleContactForm(e) {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        issue: document.getElementById('issue').value,
        message: document.getElementById('message').value
    };

    // Validate form
    if (!formData.name || !formData.email || !formData.issue || !formData.message) {
        alert('Please fill in all required fields.');
        return;
    }

    // Show success message
    if (formResponse) {
        formResponse.textContent = '✓ Thank you! Your message has been received. We will get back to you within 24 hours.';
        formResponse.classList.remove('hidden');
        formResponse.style.animation = 'slideIn 0.3s ease';
    }

    // Reset form
    contactForm.reset();

    // Hide message after 5 seconds
    setTimeout(() => {
        if (formResponse) {
            formResponse.classList.add('hidden');
        }
    }, 5000);

    console.log('Contact form submitted:', formData);
}

// Add enter key submit
userQuestionInput.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
        handleSubmit();
    }
});

// Initialize tooltips and accessibility features
document.addEventListener('DOMContentLoaded', () => {
    console.log('Legal Empowerment Website Loaded Successfully');
    
    // Preload animations
    const elements = document.querySelectorAll('.interactive-card, .feature-card, .faq-item');
    elements.forEach(el => {
        el.style.animation = 'none';
    });
});

// Prevent form submission on enter in textarea (allow Ctrl+Enter instead)
userQuestionInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.ctrlKey) {
        e.preventDefault();
    }
});


/***********************
 Multilingual Guidance + TTS Renderer
 Paste into script.js (after existing helpers)
***********************/

// Global tracked spoken language (e.g., 'hi-IN', 'ta-IN', 'en-IN')
let userSpokenLang = null;

// Map codes -> display name for LLM prompt (server side can reuse)
const LANG_CODE_TO_NAME = {
  'hi-IN':'Hindi','hi':'Hindi',
  'ta-IN':'Tamil','ta':'Tamil',
  'bn-IN':'Bengali','bn':'Bengali',
  'te-IN':'Telugu','te':'Telugu',
  'mr-IN':'Marathi','mr':'Marathi',
  'en-IN':'English','en':'English'
};

// Lightweight script-based detection for typed input fallback
function detectLanguageFromText(text){
  if (!text || !text.trim()) return 'en-IN';
  // Devanagari (Hindi/Marathi)
  if (/[\\u0900-\\u097F]/.test(text)) return 'hi-IN';
  // Tamil
  if (/[\\u0B80-\\u0BFF]/.test(text)) return 'ta-IN';
  // Bengali
  if (/[\\u0980-\\u09FF]/.test(text)) return 'bn-IN';
  // Telugu
  if (/[\\u0C00-\\u0C7F]/.test(text)) return 'te-IN';
  // Latin script fallback -> English
  return 'en-IN';
}

function langCodeToName(code){
  if (!code) return 'English';
  return LANG_CODE_TO_NAME[code] || LANG_CODE_TO_NAME[code.split('-')[0]] || 'English';
}

/* ========== LLM call wrapper (client) ==========
Assumes you have a server endpoint or client function named getLegalGuidance(userText, userSpokenLang)
that returns JSON matching the schema described in your prompt:
{
  verdict, confidence_score, case_summary, explanation,
  relevant_law_citation, action_plan (array), additional_advice (object),
  who_to_contact (array), disclaimer
}
If you need a sample server payload for the LLM, use:
{
  system: "Never give medical diagnoses... Respond ONLY in [LANGNAME] - use simple language.",
  user: "User issue: {userText} ... Output strict JSON with keys: verdict, confidence_score, ..."
}
************************************************** */

async function requestAndRenderGuidance(userText){
  // Determine language: prefer userSpokenLang (from voice), else current user pref, else detect from text
  let lang = userSpokenLang || (getCurrentUser && getCurrentUser().preferred_language ? getCurrentUser().preferred_language : null);
  if (!lang) lang = detectLanguageFromText(userText);
  userSpokenLang = lang;

  // Optional: show loading UI
  responseContent.innerHTML = `<div class="guidance-loading">Generating guidance…</div>`;
  responseSection.classList.remove('hidden');

  try {
    // Call backend function (developer: implement this to call your LLM and return the structured JSON)
    // Example usage: const guidance = await getLegalGuidance(userText, lang);
    // Here we call the provided function name (assumed present).
    const guidance = await getLegalGuidance(userText, lang);

    // Validate/parse guidance
    if (!guidance || typeof guidance !== 'object' || !('verdict' in guidance)) {
      responseContent.innerHTML = `<div class="error">Invalid response from server. Please try again.</div>`;
      return;
    }

    renderGuidance(guidance, lang);
  } catch (err) {
    console.error('Guidance error', err);
    responseContent.innerHTML = `<div class="error">Failed to get guidance. Please try again later.</div>`;
  }
}

/* ========== Render UI ========= */
function renderGuidance(g, langCode){
  // Ensure we keep keys English but values are in user's language per backend contract
  const langName = langCodeToName(langCode);
  // Verdict badge color
  const verdictColor = (g.verdict === 'illegal') ? 'verdict-illegal' : (g.verdict === 'grey_area' ? 'verdict-grey' : 'verdict-legal');

  // Build action plan list (checkable)
  const actionItemsHtml = (g.action_plan && g.action_plan.length) ? g.action_plan.map(item =>
    `<li class="action-item"><label><input type="checkbox" class="action-check" data-step="${item.step}"> <span class="action-text">${escapeHtml(item.action)}</span></label></li>`
  ).join('') : '<li class="muted">No action steps provided.</li>';

  // Additional advice collapsibles
  const advice = g.additional_advice || {};
  const adviceSections = [
    {key:'financial', title: translateLabel('Financial', langCode), content: advice.financial},
    {key:'medical', title: translateLabel('Medical / Safety', langCode), content: advice.medical},
    {key:'emotional_support', title: translateLabel('Emotional Support', langCode), content: advice.emotional_support},
    {key:'documentation_tips', title: translateLabel('Documentation Tips', langCode), content: advice.documentation_tips}
  ].map(s => {
    if (!s.content) return '';
    return `<div class="advice-section">
              <button class="collapsible">${escapeHtml(s.title)} <span class="coll-arrow">▾</span></button>
              <div class="collapsible-body">${escapeHtml(s.content)}</div>
            </div>`;
  }).join('');

  // Who to contact list (tel: links if available)
  const contactsHtml = (g.who_to_contact && g.who_to_contact.length) ? g.who_to_contact.map(c => {
    const call = c.how && /\\+?\\d/.test(c.how) ? `<a href="tel:${c.how.replace(/[^+\\d]/g,'')}" class="contact-link">${escapeHtml(c.how)}</a>` : `<span>${escapeHtml(c.how || '')}</span>`;
    return `<li><strong>${escapeHtml(c.name)}</strong> — ${call}</li>`;
  }).join('') : '<li class="muted">No direct contacts available.</li>';

  // Render HTML into responseContent
  responseContent.innerHTML = `
    <div class="guidance-root" lang="${escapeHtml(langCode)}">
      <div class="guidance-card">
        <div class="guidance-header">
          <h3 class="case-summary-title">${escapeHtml(g.case_summary || translateLabel('Case Summary', langCode))}</h3>
          <div class="guidance-controls">
            <button class="tts-button tts-play-section" data-section="summary">🔊</button>
            <button class="tts-button tts-play-section" data-section="verdict">🔊</button>
            <button id="ttsPlayFull" class="tts-button">▶ Play Full Guidance</button>
            <button id="ttsStop" class="tts-button">⏹ Stop</button>
          </div>
        </div>

        <div class="verdict-row">
          <div class="verdict-badge ${verdictColor}">${escapeHtml(g.verdict || '')} • ${escapeHtml(String(g.confidence_score || ''))}%</div>
          <div class="relevant-law">${escapeHtml(g.relevant_law_citation || '')}</div>
        </div>

        <section class="explanation">
          <h4>${translateLabel('Explanation', langCode)} <button class="tts-button tts-play-section" data-section="explanation">🔊</button></h4>
          <p>${escapeHtml(g.explanation || '')}</p>
        </section>

        <section class="action-plan">
          <h4>${translateLabel('Action Plan', langCode)}</h4>
          <ol>${actionItemsHtml}</ol>
        </section>

        <section class="additional-advice">
          <h4>${translateLabel('Additional Advice', langCode)}</h4>
          ${adviceSections || '<p class="muted">No additional advice.</p>'}
        </section>

        <section class="who-to-contact">
          <h4>${translateLabel('Who to Contact', langCode)}</h4>
          <ul>${contactsHtml}</ul>
        </section>

        <footer class="guidance-disclaimer">
          <small>${escapeHtml(g.disclaimer || translateLabel('This is general guidance and not a substitute for professional legal or medical advice.', langCode))}</small>
        </footer>
      </div>
    </div>
  `;

  // Wire collapsibles
  Array.from(responseContent.querySelectorAll('.collapsible')).forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('open');
      const body = btn.nextElementSibling;
      if (body) body.style.display = btn.classList.contains('open') ? 'block' : 'none';
      const arrow = btn.querySelector('.coll-arrow'); if (arrow) arrow.textContent = btn.classList.contains('open') ? '▴' : '▾';
    });
    // Start collapsed
    const b = btn.nextElementSibling; if (b) b.style.display = 'none';
  });

  // Wire per-section TTS
  Array.from(responseContent.querySelectorAll('.tts-play-section')).forEach(b => {
    b.addEventListener('click', () => {
      const section = b.getAttribute('data-section');
      let textToSpeak = '';
      if (section === 'summary') textToSpeak = g.case_summary || '';
      if (section === 'verdict') textToSpeak = `${translateLabel('Verdict', langCode)}: ${g.verdict || ''}. ${translateLabel('Confidence', langCode)}: ${g.confidence_score || ''}%`;
      if (section === 'explanation') textToSpeak = g.explanation || '';
      if (textToSpeak) speakText(textToSpeak, langCode);
    });
  });

  // Wire full playback and stop
  document.getElementById('ttsPlayFull').onclick = () => speakGuidanceSequentially(g, langCode);
  document.getElementById('ttsStop').onclick = () => stopSpeaking();

  // Make action items checkable (persist little state in-memory or localStorage if desired)
  Array.from(responseContent.querySelectorAll('.action-check')).forEach(chk => {
    chk.addEventListener('change', (e) => {
      // Optional: persist state per-case (not implemented here)
      chk.parentElement.classList.toggle('completed', chk.checked);
    });
  });

  // Scroll into view
  responseSection.classList.remove('hidden');
  responseSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/* ========== TTS Helpers ========= */
function getVoiceForLang(langCode) {
  // Populate voices (some browsers populate asynchronously)
  const voices = window.speechSynthesis.getVoices();
  if (!voices || !voices.length) return null;
  // Try exact match then prefix
  let v = voices.find(x => x.lang && x.lang.toLowerCase() === langCode.toLowerCase());
  if (!v) v = voices.find(x => x.lang && x.lang.toLowerCase().startsWith(langCode.split('-')[0]));
  return v || null;
}

let ttsPlayingQueue = null;
let ttsIsPlaying = false;

function speakText(text, langCode, onend) {
  stopSpeaking(); // stop any existing speech
  if (!text || !('speechSynthesis' in window)) {
    alert(translateLabel('Audio playback not available on this device.', langCode));
    return;
  }

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = langCode || 'en-IN';
  const voice = getVoiceForLang(langCode);
  if (voice) utter.voice = voice;
  utter.rate = 0.95;
  utter.onend = () => {
    ttsIsPlaying = false;
    if (typeof onend === 'function') onend();
  };
  speechSynthesis.speak(utter);
  ttsIsPlaying = true;
}

function speakGuidanceSequentially(g, langCode) {
  // Stop existing
  stopSpeaking();
  // Build queue section-by-section (plain text)
  const queue = [];
  if (g.case_summary) queue.push({label: translateLabel('Case Summary', langCode), text: g.case_summary});
  queue.push({label: translateLabel('Verdict', langCode), text: `${translateLabel('Verdict', langCode)}: ${g.verdict || ''}. ${translateLabel('Confidence', langCode)}: ${g.confidence_score || ''}%`});
  if (g.explanation) queue.push({label: translateLabel('Explanation', langCode), text: g.explanation});
  if (g.action_plan && g.action_plan.length) {
    const steps = g.action_plan.map(s=> `${translateLabel('Step', langCode)} ${s.step}: ${s.action}`).join('. ');
    queue.push({label: translateLabel('Action Plan', langCode), text: steps});
  }
  if (g.additional_advice) {
    const adv = Object.entries(g.additional_advice).map(([k,v]) => v ? `${translateLabel(k.replace('_',' '), langCode)}: ${v}` : '').filter(Boolean).join('. ');
    if (adv) queue.push({label: translateLabel('Additional Advice', langCode), text: adv});
  }
  // Play sequentially
  ttsPlayingQueue = queue;
  playNextInQueue(langCode);
}

function playNextInQueue(langCode){
  if (!ttsPlayingQueue || !ttsPlayingQueue.length) {
    ttsPlayingQueue = null; ttsIsPlaying = false; return;
  }
  const item = ttsPlayingQueue.shift();
  const text = item.text;
  speakText(text, langCode, () => {
    setTimeout(()=> playNextInQueue(langCode), 250); // small gap
  });
}

function stopSpeaking(){
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  ttsPlayingQueue = null;
  ttsIsPlaying = false;
}

/* ========== Utility helpers ========= */
function escapeHtml(s){
  if (s === null || s === undefined) return '';
  return (''+s)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&#039;');
}

// Small translator hook for UI labels — here we keep labels in English (server should translate values)
// but we provide a few common UI label translations by language for the static UI.
function translateLabel(key, langCode){
  // key may be English or short key; return same key if no translation available
  const map = {
    'Explanation': {'hi-IN':'विवरण','ta-IN':'விளக்கம்','bn-IN':'ব্যাখ্যা','te-IN':'వివరణ','mr-IN':'स्पष्टीकरण','en-IN':'Explanation'},
    'Action Plan': {'hi-IN':'कार्रवाई की योजना','ta-IN':'செயல் திட்டம்','bn-IN':'কর্মপরিকল্পনা','te-IN':'చర్యా ప్రణాళిక','mr-IN':'कृती योजना','en-IN':'Action Plan'},
    'Additional Advice': {'hi-IN':'अतिरिक्त सलाह','ta-IN':'கூடுதல் ஆலோசனை','bn-IN':'অতিরিক্ত পরামর্শ','te-IN':'అదనపు సలహా','mr-IN':'अतिरिक्त सल्ला','en-IN':'Additional Advice'},
    'Who to Contact': {'hi-IN':'संपर्क करें','ta-IN':'யாரை தொடர்பு கொள்ள வேண்டும்','bn-IN':'কারো সাথে যোগাযোগ করুন','te-IN':'ఏవారి సంప్రదించాలి','mr-IN':'कोणाशी संपर्क साधायचा','en-IN':'Who to Contact'},
    'Case Summary': {'hi-IN':'मामले का सारांश','ta-IN':'கேஸின் சுருக்கம்','bn-IN':'কেস সারসংক্ষেপ','te-IN':'కేస్ సారాంశం','mr-IN':'केस सारांश','en-IN':'Case Summary'},
    'Verdict': {'hi-IN':'निष्कर्ष','ta-IN':'தீர்ப்பு','bn-IN':'ফলাফল','te-IN':'తిరుగుబాటు','mr-IN':'निर्णय','en-IN':'Verdict'},
    'Confidence': {'hi-IN':'विश्वास','ta-IN':'நம்பிக்கை','bn-IN':'নিশ্চয়তা','te-IN':'నమ్మకం','mr-IN':'विश्वास','en-IN':'Confidence'},
    'Financial': {'hi-IN':'आर्थिक','ta-IN':'நிதி','bn-IN':'আর্থিক','te-IN':'ఆర్థిక','mr-IN':'आर्थिक','en-IN':'Financial'},
    'Medical / Safety': {'hi-IN':'चिकित्सा / सुरक्षा','ta-IN':'மருத்துவம் / பாதுகாப்பு','bn-IN':'চিকিৎসা / নিরাপত্তা','te-IN':'వైద్య / భద్రత','mr-IN':'वैद्यकीय / सुरक्षा','en-IN':'Medical / Safety'},
    'Emotional Support': {'hi-IN':'भावनात्मक समर्थन','ta-IN':'உணர்ச்சி ஆதரவு','bn-IN':'অনুভূতিগত সমর্থন','te-IN':'భావోద్వేగ మద్దతు','mr-IN':'भावनिक मदत','en-IN':'Emotional Support'},
    'Documentation Tips': {'hi-IN':'दस्तावेज़ीकरण युक्तियाँ','ta-IN':'ஆவணக்கරණ குறிப்புகள்','bn-IN':'নথি পরামর্শ','te-IN':'డాక్యుమెంటేషన్ సూచనలు','mr-IN':'दस्तऐवजीकरण टिपा','en-IN':'Documentation Tips'},
    'Step': {'hi-IN':'कदम','ta-IN':'படி','bn-IN':'ধাপ','te-IN':'దశ','mr-IN':'पाऊल','en-IN':'Step'}
  };
  const lc = (langCode || 'en-IN');
  if (map[key] && map[key][lc]) return map[key][lc];
  if (map[key] && map[key][lc.split('-')[0]]) return map[key][lc.split('-')[0]];
  return key;
}

/* ========== Hook into existing submit flow ========= */
/*
Where you previously called generateLegalGuidance(userInput, ...),
replace that invocation with:
  await requestAndRenderGuidance(userInput);
This will call the backend function getLegalGuidance(userText, userSpokenLang)
and render the full UI including TTS controls.
*/

// Example integration (if your current handleSubmit does synchronous work):
// modify handleSubmit() to call requestAndRenderGuidance
// e.g. replace generateLegalGuidance(...) with: await requestAndRenderGuidance(userInput);

/* End of guidance renderer */