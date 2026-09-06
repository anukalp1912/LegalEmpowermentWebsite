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

// Event Listeners
submitBtn.addEventListener('click', handleSubmit);
clearBtn.addEventListener('click', handleClear);
closeResponseBtn.addEventListener('click', closeResponse);

// Issue tag click handlers
issueTags.forEach(tag => {
    tag.addEventListener('click', () => {
        const issue = tag.getAttribute('data-issue');
        userQuestionInput.value = `I have a problem with: ${issue}`;
        userQuestionInput.focus();
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

// Add voice input functionality (basic)
document.querySelector('.voice-button').addEventListener('click', () => {
    const recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (recognition) {
        const speechRecognition = new recognition();
        speechRecognition.lang = 'en-IN';
        
        speechRecognition.onstart = () => {
            console.log('Listening...');
        };
        
        speechRecognition.onresult = (event) => {
            const transcript = Array.from(event.results)
                .map(result => result[0].transcript)
                .join('');
            
            userQuestionInput.value = transcript;
            userQuestionInput.focus();
        };
        
        speechRecognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            alert('Speech recognition not available or access denied.');
        };
        
        speechRecognition.start();
    } else {
        alert('Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
    }
});

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
