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

// Simple Auth stubs for login.html functionality (OTP simulation)
function sendOTP(phone) {
    // Simulate OTP sending and return a code stored in sessionStorage for demo
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    sessionStorage.setItem('otp_for_' + phone, code);
    console.log('Simulated OTP for', phone, '=>', code);
    return true;
}

function verifyOTP(phone, code) {
    const expected = sessionStorage.getItem('otp_for_' + phone);
    return expected === code;
}

function loginWithPhone(phone, code, preferred_language) {
    if (!verifyOTP(phone, code)) return null;
    // Create user object
    const userId = 'user_' + Date.now();
    const user = { user_id: userId, phone_number: phone, preferred_language: preferred_language || 'en', created_at: new Date().toISOString(), guest_flag: false };
    // Migrate guest cases
    const guestId = localStorage.getItem('guestSessionId');
    if (guestId) migrateGuestCasesToUser(guestId, userId);
    // Save current user
    setCurrentUser(user);
    return user;
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
