// ============================================================
// Backend config - change this when you deploy the backend
// (e.g. to your Render/Railway URL) instead of running locally.
// ============================================================
const API_BASE_URL = window.RIGHTSMITRA_API_URL || 'http://localhost:4000';

function getAuthToken() {
    return localStorage.getItem('authToken');
}

async function apiFetch(path, options = {}) {
    const token = getAuthToken();
    const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    // Added mode: 'cors' here
    const res = await fetch(`${API_BASE_URL}${path}`, { ...options, headers, mode: 'cors' });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
    return data;
}

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

// Handle form submission - now calls the real backend (AI-powered, with
// an offline fallback baked in server-side if no AI key is configured)
async function handleSubmit() {
    const userInput = userQuestionInput.value.trim();

    if (!userInput) {
        alert('Please describe your issue or ask a question.');
        return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Getting guidance...';

    try {
        const owner = (getCurrentUser() && getCurrentUser().user_id) || localStorage.getItem('guestSessionId');
        const language = (getCurrentUser() && getCurrentUser().preferred_language) || 'en';

        const result = await apiFetch('/api/guidance', {
            method: 'POST',
            body: JSON.stringify({ query: userInput, language, owner_id: owner }),
        });

        displayResponse(renderGuidanceHtml(result));
    } catch (err) {
        console.error('Guidance request failed:', err);
        displayResponse(`<div class="guidance-response"><p style="color:#f87171;">Sorry, something went wrong reaching the guidance service: ${err.message}. Please try again.</p></div>`);
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Get Legal Guidance';
    }
}

// Render the structured { category, guidance_points, next_steps, disclaimer }
// response from the backend into the same HTML shape the UI already expects.
function renderGuidanceHtml(result) {
    let html = '<div class="guidance-response">';
    html += '<h4>Your Legal Guidance:</h4>';
    if (result.category) html += `<p><strong>Category: ${result.category}</strong></p>`;

    html += '<ul style="margin-left: 20px;">';
    (result.guidance_points || []).forEach(point => {
        html += `<li style="margin-bottom: 10px;">${point}</li>`;
    });
    html += '</ul>';

    if (result.next_steps && result.next_steps.length) {
        html += '<h4 style="margin-top: 20px;">Next Steps:</h4>';
        html += '<ul style="margin-left: 20px;">';
        result.next_steps.forEach(step => {
            html += `<li style="margin-bottom: 10px;">${step}</li>`;
        });
        html += '</ul>';
    }

    if (result.disclaimer) {
        html += `<p style="margin-top: 20px; color: #34D399;"><strong>Remember:</strong> ${result.disclaimer}</p>`;
    }
    html += '</div>';
    return html;
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

// Ensure a guest session exists (stored in localStorage). The backend just
// treats this as an opaque owner_id string, so no server call is needed here.
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

// Case storage now goes through the backend instead of localStorage.
async function saveCase(caseObj) {
    const owner = caseObj.user_id || (getCurrentUser() && getCurrentUser().user_id) || localStorage.getItem('guestSessionId');
    try {
        const result = await apiFetch('/api/cases', {
            method: 'POST',
            body: JSON.stringify({
                owner_id: owner,
                issue_summary: caseObj.issue_summary,
                full_conversation_log: caseObj.full_conversation_log,
                category: caseObj.category,
                language: caseObj.language,
                region: caseObj.region,
            }),
        });
        return result.case_id;
    } catch (err) {
        console.error('Failed to save case to backend:', err);
        return null;
    }
}

async function getCasesForOwner(ownerId) {
    try {
        const result = await apiFetch(`/api/cases?owner_id=${encodeURIComponent(ownerId)}`);
        return result.cases || [];
    } catch (err) {
        console.error('Failed to fetch cases from backend:', err);
        return [];
    }
}

// Mic toggle handler
const micToggle = document.getElementById('micToggle');
const micToggleIcon = document.getElementById('micToggleIcon');
if (micToggle) {
    micToggle.addEventListener('click', () => {
        micEnabled = !micEnabled;
        micToggleIcon.textContent = micEnabled ? '🔊' : '🔇';
        micToggle.classList.toggle('off', !micEnabled);
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
            // Save a draft case to the backend (fire-and-forget)
            saveCase({
                user_id: getCurrentUser() && getCurrentUser().user_id,
                issue_summary: transcript.slice(0,120),
                full_conversation_log: [{type:'voice', text: transcript, ts: new Date().toISOString()}],
            });
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

// Auth: now calls the real backend OTP endpoints instead of simulating locally.
async function sendOTP(phone) {
    try {
        await apiFetch('/api/auth/send-otp', { method: 'POST', body: JSON.stringify({ phone }) });
        return true;
    } catch (err) {
        console.error('sendOTP failed:', err);
        alert(err.message);
        return false;
    }
}

async function loginWithPhone(phone, code, preferred_language) {
    const guestId = localStorage.getItem('guestSessionId');
    try {
        const result = await apiFetch('/api/auth/verify-otp', {
            method: 'POST',
            body: JSON.stringify({ phone, otp: code, preferred_language, guest_id: guestId }),
        });
        localStorage.setItem('authToken', result.token);
        setCurrentUser(result.user);
        return result.user;
    } catch (err) {
        console.error('loginWithPhone failed:', err);
        return null;
    }
}

// Cases page rendering helper (if on cases.html)
async function renderCasesOnPage() {
    const casesContainer = document.getElementById('casesList');
    if (!casesContainer) return;
    const user = getCurrentUser();
    const owner = (user && user.user_id) || localStorage.getItem('guestSessionId');
    casesContainer.innerHTML = '<p class="muted">Loading your cases...</p>';
    const cases = await getCasesForOwner(owner);
    casesContainer.innerHTML = '';
    if (!cases.length) { casesContainer.innerHTML = '<p class="muted">No cases found. Your recent voice inputs and guidance requests will appear here.</p>'; return; }
    cases.forEach(c => {
        const div = document.createElement('div');
        div.className = 'case-card';
        const firstLogText = (c.full_conversation_log && c.full_conversation_log[0] && c.full_conversation_log[0].text) || '';
        div.innerHTML = `<div class="case-card-header"><strong>${c.issue_summary}</strong><span class="case-ts">${new Date(c.timestamp).toLocaleString()}</span></div>
                         <div class="case-card-body"><p>${firstLogText}</p></div>
                         <div class="case-card-footer"><small>Verdict: ${c.verdict || 'Pending'}</small></div>`;
        div.addEventListener('click', () => {
            alert('Case details not yet implemented in demo.');
        });
        casesContainer.appendChild(div);
    });
}

// Run on pages where DOM loaded
document.addEventListener('DOMContentLoaded', () => {
    renderCasesOnPage();
});

// Contact form handler - now submits to the backend
async function handleContactForm(e) {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        issue: document.getElementById('issue').value,
        message: document.getElementById('message').value
    };

    if (!formData.name || !formData.email || !formData.issue || !formData.message) {
        alert('Please fill in all required fields.');
        return;
    }

    try {
        const result = await apiFetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) });
        if (formResponse) {
            formResponse.textContent = '✓ ' + result.message;
            formResponse.classList.remove('hidden');
            formResponse.style.animation = 'slideIn 0.3s ease';
        }
        contactForm.reset();
        setTimeout(() => { if (formResponse) formResponse.classList.add('hidden'); }, 5000);
    } catch (err) {
        console.error('Contact form submission failed:', err);
        if (formResponse) {
            formResponse.textContent = 'Something went wrong sending your message. Please try again.';
            formResponse.classList.remove('hidden');
        }
    }
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
