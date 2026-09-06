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
// Language data stays centralized so new languages can be added without changing the analysis flow.
const supportedLanguages = {
    en: { name: 'English', speechCode: 'en-IN' },
    hi: { name: 'Hindi', speechCode: 'hi-IN' },
    ta: { name: 'Tamil', speechCode: 'ta-IN' },
    te: { name: 'Telugu', speechCode: 'te-IN' },
    bn: { name: 'Bengali', speechCode: 'bn-IN' },
    mr: { name: 'Marathi', speechCode: 'mr-IN' }
};

const translations = {
    en: { guidance: 'Your Legal Guidance', issue: 'Issue detected', summary: 'Situation summary', rights: 'Rights and useful information', evidence: 'Evidence checklist', roadmap: 'Action roadmap', next: 'Next steps', disclaimer: 'This platform provides general informational guidance and is not a substitute for professional legal advice. Rights and procedures may vary depending on individual circumstances, employment category, and jurisdiction.', detected: 'Language detected', mixed: 'Mixed language input detected. Choose your response language.', submit: 'Get Legal Guidance', clear: 'Clear', noIssue: 'We could not identify a specific issue. These general steps may help.', general: ['Keep records of messages, payments, and incidents.', 'Learn about your protections under Indian labour law.', 'Collect witnesses, photographs, payslips, and other supporting documents.', 'Make complaints in writing with dates and specific details.', 'Contact a local labour authority or legal-aid organisation.'], evidenceDefault: ['Employment messages or contract', 'Payment records and bank statements', 'Relevant photographs or medical records', 'Names of witnesses'], roadmapDefault: ['Write down the dates and facts.', 'Keep copies of every document and message.', 'Send a written request or complaint.', 'Contact a local labour authority or legal-aid organisation.'] },
    hi: { guidance: 'आपकी कानूनी जानकारी', issue: 'पहचानी गई समस्या', summary: 'स्थिति का सारांश', rights: 'आपके अधिकार और उपयोगी जानकारी', evidence: 'सबूतों की सूची', roadmap: 'आगे की कार्ययोजना', next: 'अगले कदम', disclaimer: 'यह प्लेटफॉर्म सामान्य जानकारी देता है और पेशेवर कानूनी सलाह का विकल्प नहीं है। अधिकार और प्रक्रियाएं आपकी परिस्थिति, काम की श्रेणी और क्षेत्र के अनुसार बदल सकती हैं।', detected: 'भाषा पहचानी गई', mixed: 'मिश्रित भाषा मिली। जवाब की भाषा चुनें।', submit: 'कानूनी जानकारी पाएं', clear: 'साफ करें', noIssue: 'किसी खास समस्या की पहचान नहीं हो सकी। ये सामान्य कदम मदद कर सकते हैं।', general: ['संदेशों, भुगतानों और घटनाओं का रिकॉर्ड रखें।', 'भारतीय श्रम कानून के तहत मिलने वाली सुरक्षा के बारे में जानें।', 'गवाह, फोटो, वेतन पर्ची और दूसरे दस्तावेज इकट्ठा करें।', 'तारीख और पूरी जानकारी के साथ लिखित शिकायत करें।', 'स्थानीय श्रम अधिकारी या कानूनी सहायता संस्था से संपर्क करें।'], evidenceDefault: ['नौकरी से जुड़े संदेश या अनुबंध', 'भुगतान का रिकॉर्ड और बैंक विवरण', 'जरूरी फोटो या चिकित्सा रिकॉर्ड', 'गवाहों के नाम'], roadmapDefault: ['तारीख और घटनाएं लिख लें।', 'सभी दस्तावेजों और संदेशों की प्रतियां रखें।', 'लिखित अनुरोध या शिकायत भेजें।', 'स्थानीय श्रम अधिकारी या कानूनी सहायता संस्था से संपर्क करें।'] },
    ta: { guidance: 'உங்கள் சட்ட வழிகாட்டுதல்', issue: 'கண்டறியப்பட்ட பிரச்சினை', summary: 'நிலைமையின் சுருக்கம்', rights: 'உங்கள் உரிமைகள் மற்றும் பயனுள்ள தகவல்', evidence: 'ஆதாரப் பட்டியல்', roadmap: 'செயல் திட்டம்', next: 'அடுத்த படிகள்', disclaimer: 'இந்த தளம் பொதுவான தகவல் வழிகாட்டுதலை வழங்குகிறது; இது தொழில்முறை சட்ட ஆலோசனைக்கு மாற்றாகாது. உரிமைகள் மற்றும் நடைமுறைகள் உங்கள் சூழ்நிலை, வேலை வகை மற்றும் அதிகார வரம்பைப் பொறுத்து மாறலாம்.', detected: 'கண்டறியப்பட்ட மொழி', mixed: 'கலப்பு மொழி உள்ளீடு கண்டறியப்பட்டது. பதில் மொழியைத் தேர்ந்தெடுக்கவும்.', submit: 'சட்ட வழிகாட்டுதலைப் பெறுங்கள்', clear: 'அழிக்கவும்', noIssue: 'குறிப்பிட்ட பிரச்சினையை அடையாளம் காண முடியவில்லை. இந்தப் பொதுவான படிகள் உதவும்.', general: ['செய்திகள், பணம் மற்றும் சம்பவங்களின் பதிவுகளை வைத்திருங்கள்.', 'இந்திய தொழிலாளர் சட்டத்தின் பாதுகாப்புகளைப் பற்றி அறிந்து கொள்ளுங்கள்.', 'சாட்சிகள், புகைப்படங்கள் மற்றும் சம்பளச் சீட்டுகளை சேகரியுங்கள்.', 'தேதிகள் மற்றும் விவரங்களுடன் எழுத்துப்பூர்வமாக புகார் அளியுங்கள்.', 'உள்ளூர் தொழிலாளர் அலுவலர் அல்லது சட்ட உதவி அமைப்பை அணுகுங்கள்.'], evidenceDefault: ['வேலை தொடர்பான செய்திகள் அல்லது ஒப்பந்தம்', 'பணம் செலுத்திய பதிவுகள் மற்றும் வங்கி விவரங்கள்', 'புகைப்படங்கள் அல்லது மருத்துவப் பதிவுகள்', 'சாட்சிகளின் பெயர்கள்'], roadmapDefault: ['தேதிகள் மற்றும் நிகழ்வுகளை எழுதுங்கள்.', 'அனைத்து ஆவணங்கள் மற்றும் செய்திகளின் நகல்களை வைத்திருங்கள்.', 'எழுத்துப்பூர்வ கோரிக்கை அல்லது புகார் அனுப்புங்கள்.', 'உள்ளூர் தொழிலாளர் அலுவலர் அல்லது சட்ட உதவி அமைப்பை அணுகுங்கள்.'] },
    te: { guidance: 'మీ న్యాయ మార్గదర్శకం', issue: 'గుర్తించిన సమస్య', summary: 'పరిస్థితి సారాంశం', rights: 'మీ హక్కులు మరియు ఉపయోగకరమైన సమాచారం', evidence: 'ఆధారాల జాబితా', roadmap: 'చర్యల ప్రణాళిక', next: 'తదుపరి చర్యలు', disclaimer: 'ఈ ప్లాట్‌ఫారం సాధారణ సమాచార మార్గదర్శకాన్ని అందిస్తుంది; ఇది వృత్తిపరమైన న్యాయ సలహాకు ప్రత్యామ్నాయం కాదు. హక్కులు మరియు ప్రక్రియలు మీ పరిస్థితి, ఉద్యోగ రకం మరియు పరిధిని బట్టి మారవచ్చు.', detected: 'గుర్తించిన భాష', mixed: 'మిశ్రమ భాష గుర్తించబడింది. సమాధాన భాషను ఎంచుకోండి.', submit: 'న్యాయ మార్గదర్శకం పొందండి', clear: 'తొలగించండి', noIssue: 'ప్రత్యేక సమస్యను గుర్తించలేకపోయాము. ఈ సాధారణ చర్యలు సహాయపడవచ్చు.', general: ['సందేశాలు, చెల్లింపులు మరియు సంఘటనల రికార్డులు ఉంచండి.', 'భారత కార్మిక చట్టంలోని రక్షణల గురించి తెలుసుకోండి.', 'సాక్షులు, ఫోటోలు మరియు జీతం రసీదులు సేకరించండి.', 'తేదీలు, వివరాలతో వ్రాతపూర్వక ఫిర్యాదు చేయండి.', 'స్థానిక కార్మిక అధికారి లేదా న్యాయ సహాయ సంస్థను సంప్రదించండి.'], evidenceDefault: ['ఉద్యోగ సందేశాలు లేదా ఒప్పందం', 'చెల్లింపు రికార్డులు మరియు బ్యాంక్ వివరాలు', 'ఫోటోలు లేదా వైద్య రికార్డులు', 'సాక్షుల పేర్లు'], roadmapDefault: ['తేదీలు, సంఘటనలు రాయండి.', 'అన్ని పత్రాలు, సందేశాల కాపీలు ఉంచండి.', 'వ్రాతపూర్వక అభ్యర్థన లేదా ఫిర్యాదు పంపండి.', 'స్థానిక కార్మిక అధికారి లేదా న్యాయ సహాయ సంస్థను సంప్రదించండి.'] },
    bn: { guidance: 'আপনার আইনি নির্দেশনা', issue: 'চিহ্নিত সমস্যা', summary: 'পরিস্থিতির সারাংশ', rights: 'আপনার অধিকার ও প্রয়োজনীয় তথ্য', evidence: 'প্রমাণের তালিকা', roadmap: 'করণীয় পরিকল্পনা', next: 'পরবর্তী পদক্ষেপ', disclaimer: 'এই প্ল্যাটফর্ম সাধারণ তথ্যভিত্তিক নির্দেশনা দেয়; এটি পেশাদার আইনি পরামর্শের বিকল্প নয়। অধিকার ও প্রক্রিয়া আপনার পরিস্থিতি, কাজের ধরন ও এলাকার উপর নির্ভর করে বদলাতে পারে।', detected: 'চিহ্নিত ভাষা', mixed: 'মিশ্র ভাষা শনাক্ত হয়েছে। উত্তরের ভাষা বেছে নিন।', submit: 'আইনি নির্দেশনা নিন', clear: 'মুছে ফেলুন', noIssue: 'নির্দিষ্ট সমস্যা শনাক্ত করা যায়নি। এই সাধারণ পদক্ষেপগুলি সাহায্য করতে পারে।', general: ['বার্তা, টাকা দেওয়া এবং ঘটনার রেকর্ড রাখুন।', 'ভারতের শ্রম আইনে আপনার সুরক্ষাগুলি জানুন।', 'সাক্ষী, ছবি, বেতন স্লিপ ও প্রয়োজনীয় কাগজ সংগ্রহ করুন।', 'তারিখ ও বিস্তারিত দিয়ে লিখিত অভিযোগ করুন।', 'স্থানীয় শ্রম আধিকারিক বা আইনি সহায়তা সংস্থার সঙ্গে যোগাযোগ করুন।'], evidenceDefault: ['চাকরির বার্তা বা চুক্তি', 'পেমেন্টের রেকর্ড ও ব্যাংক বিবরণ', 'ছবি বা চিকিৎসার নথি', 'সাক্ষীদের নাম'], roadmapDefault: ['তারিখ ও ঘটনা লিখে রাখুন।', 'সব নথি ও বার্তার কপি রাখুন।', 'লিখিত অনুরোধ বা অভিযোগ পাঠান।', 'স্থানীয় শ্রম আধিকারিক বা আইনি সহায়তা সংস্থার সঙ্গে যোগাযোগ করুন।'] },
    mr: { guidance: 'तुमचे कायदेशीर मार्गदर्शन', issue: 'ओळखलेली समस्या', summary: 'परिस्थितीचा सारांश', rights: 'तुमचे हक्क आणि उपयुक्त माहिती', evidence: 'पुराव्यांची यादी', roadmap: 'कृती आराखडा', next: 'पुढील पावले', disclaimer: 'हे व्यासपीठ सामान्य माहितीचे मार्गदर्शन देते; हा व्यावसायिक कायदेशीर सल्ल्याचा पर्याय नाही. हक्क आणि प्रक्रिया तुमची परिस्थिती, कामाचा प्रकार आणि अधिकारक्षेत्रानुसार बदलू शकतात.', detected: 'ओळखलेली भाषा', mixed: 'मिश्र भाषा आढळली. उत्तराची भाषा निवडा.', submit: 'कायदेशीर मार्गदर्शन मिळवा', clear: 'पुसा', noIssue: 'विशिष्ट समस्या ओळखता आली नाही. ही सामान्य पावले मदत करू शकतात.', general: ['संदेश, देयके आणि घटनांच्या नोंदी ठेवा.', 'भारतीय कामगार कायद्यातील संरक्षणांची माहिती घ्या.', 'साक्षीदार, फोटो, पगाराच्या पावत्या आणि कागदपत्रे जमा करा.', 'तारीख व तपशीलांसह लेखी तक्रार करा.', 'स्थानिक कामगार अधिकारी किंवा कायदेशीर मदत संस्थेशी संपर्क साधा.'], evidenceDefault: ['नोकरीचे संदेश किंवा करार', 'देयक नोंदी आणि बँक तपशील', 'फोटो किंवा वैद्यकीय नोंदी', 'साक्षीदारांची नावे'], roadmapDefault: ['तारीख आणि घटना लिहून ठेवा.', 'सर्व कागदपत्रे आणि संदेशांच्या प्रती ठेवा.', 'लेखी विनंती किंवा तक्रार पाठवा.', 'स्थानिक कामगार अधिकारी किंवा कायदेशीर मदत संस्थेशी संपर्क करा.'] }
};

const issueKeywords = {
    'Salary Withheld': { en: ['salary', 'wage', 'unpaid', 'payment delayed', 'not paid'], hi: ['वेतन', 'सैलरी', 'पैसे नहीं मिले', 'मजदूरी नहीं मिली'], ta: ['சம்பளம்', 'ஊதியம்'], te: ['జీతం', 'వేతనం'], bn: ['বেতন', 'মজুরি'], mr: ['पगार', 'वेतन'] },
    'Fired Without Notice': { en: ['fired', 'dismissed', 'terminated', 'job ended', 'notice'], hi: ['निकाल', 'बर्खास्त', 'नोटिस नहीं'], ta: ['வேலையிலிருந்து நீக்க', 'பணி நீக்க'], te: ['ఉద్యోగం నుంచి తొలగ', 'నోటీసు లేకుండా'], bn: ['চাকরি থেকে বরখাস্ত', 'নোটিশ ছাড়া'], mr: ['कामावरून काढ', 'नोटीस नाही'] },
    'Excessive Hours': { en: ['long hours', 'overtime', 'too many hours', 'working hours'], hi: ['बहुत घंटे', 'ओवरटाइम', 'ज्यादा काम'], ta: ['நீண்ட நேரம்', 'கூடுதல் நேரம்'], te: ['ఎక్కువ గంటలు', 'ఓవర్‌టైమ్'], bn: ['বেশি সময়', 'ওভারটাইম'], mr: ['जास्त तास', 'ओव्हरटाईम'] },
    'No Contract': { en: ['no contract', 'without contract', 'written agreement'], hi: ['अनुबंध नहीं', 'समझौता नहीं', 'लिखित करार नहीं'], ta: ['ஒப்பந்தம் இல்லை'], te: ['ఒప్పందం లేదు'], bn: ['চুক্তি নেই'], mr: ['करार नाही', 'लेखी करार नाही'] },
    'Workplace Injury': { en: ['injury', 'injured', 'accident at work'], hi: ['चोट', 'दुर्घटना'], ta: ['காயம்', 'விபத்து'], te: ['గాయం', 'ప్రమాదం'], bn: ['আঘাত', 'দুর্ঘটনা'], mr: ['दुखापत', 'अपघात'] },
    'Sexual Harassment': { en: ['sexual harassment', 'harassed', 'inappropriate touching'], hi: ['यौन उत्पीड़न', 'छेड़छाड़'], ta: ['பாலியல் தொல்லை'], te: ['లైంగిక వేధింపు'], bn: ['যৌন হয়রানি'], mr: ['लैंगिक छळ'] }
};

const issueNames = {
    'Salary Withheld': { en: 'Salary withheld or delayed', hi: 'वेतन रोका गया या भुगतान में देरी', ta: 'சம்பளம் நிறுத்தப்பட்டது அல்லது தாமதமானது', te: 'జీతం నిలిపివేయబడింది లేదా ఆలస్యమైంది', bn: 'বেতন আটকে রাখা বা দেরি', mr: 'पगार थांबवला किंवा देण्यास उशीर' },
    'Fired Without Notice': { en: 'Dismissed without notice', hi: 'बिना नोटिस नौकरी से निकालना', ta: 'அறிவிப்பின்றி பணிநீக்கம்', te: 'నోటీసు లేకుండా ఉద్యోగం నుంచి తొలగింపు', bn: 'নোটিশ ছাড়া চাকরি থেকে বরখাস্ত', mr: 'नोटीसशिवाय कामावरून काढणे' },
    'Excessive Hours': { en: 'Excessive working hours', hi: 'बहुत अधिक काम के घंटे', ta: 'அதிக வேலை நேரம்', te: 'అధిక పని గంటలు', bn: 'অতিরিক্ত কাজের সময়', mr: 'अतिरिक्त कामाचे तास' },
    'No Contract': { en: 'No written employment contract', hi: 'लिखित नौकरी का अनुबंध नहीं', ta: 'எழுத்துப்பூர்வ வேலை ஒப்பந்தம் இல்லை', te: 'వ్రాతపూర్వక ఉద్యోగ ఒప్పందం లేదు', bn: 'লিখিত চাকরির চুক্তি নেই', mr: 'लेखी नोकरीचा करार नाही' },
    'Workplace Injury': { en: 'Workplace injury', hi: 'काम की जगह पर चोट', ta: 'வேலை இடத்தில் ஏற்பட்ட காயம்', te: 'పనిచోటు గాయం', bn: 'কর্মক্ষেত্রে আঘাত', mr: 'कामाच्या ठिकाणी झालेली दुखापत' },
    'Sexual Harassment': { en: 'Sexual harassment', hi: 'यौन उत्पीड़न', ta: 'பாலியல் தொல்லை', te: 'లైంగిక వేధింపు', bn: 'যৌন হয়রানি', mr: 'लैंगिक छळ' }
};

function detectLanguage(text) {
    const value = String(text || '');
    const counts = { hi: (value.match(/[\u0900-\u097F]/g) || []).length, ta: (value.match(/[\u0B80-\u0BFF]/g) || []).length, te: (value.match(/[\u0C00-\u0C7F]/g) || []).length, bn: (value.match(/[\u0980-\u09FF]/g) || []).length, en: (value.match(/[A-Za-z]/g) || []).length };
    if (counts.ta) return { language: 'ta', confidence: Math.min(1, counts.ta / Math.max(1, value.length) * 3) };
    if (counts.te) return { language: 'te', confidence: Math.min(1, counts.te / Math.max(1, value.length) * 3) };
    if (counts.bn) return { language: 'bn', confidence: Math.min(1, counts.bn / Math.max(1, value.length) * 3) };
    if (counts.hi) {
        const marathiScriptWords = /(मला|पासून|पगार|मिळाला|आहे)/.test(value);
        return { language: marathiScriptWords ? 'mr' : 'hi', confidence: marathiScriptWords ? 0.78 : 0.7, ambiguous: !marathiScriptWords };
    }
    const latin = value.toLowerCase();
    const marathiWords = /\b(majha|mala|pagar|milala|ahe|nahi|pasun)\b/.test(latin);
    const hindiWords = /\b(meri|mujhe|nahi|mila|hai|se)\b/.test(latin);
    if (marathiWords && !hindiWords) return { language: 'mr', confidence: 0.62, mixed: true };
    if (hindiWords) return { language: 'hi', confidence: 0.58, mixed: true };
    return { language: 'en', confidence: counts.en ? 0.8 : 0.25, mixed: false };
}

function getSelectedLanguage(text) {
    const selected = document.getElementById('languageSelector')?.value || 'auto';
    if (selected !== 'auto') return { language: selected, confidence: 1, manual: true };
    return detectLanguage(text);
}

function translateUI(key, language) { return translations[language]?.[key] || translations.en[key] || key; }
function getLocalizedIssueName(issue, language) { return issueNames[issue]?.[language] || issueNames[issue]?.en || issue; }
function getLocalizedIssueContent(issue, language) {
    const t = translations[language] || translations.en;
    const focus = localizedIssueFocus[language]?.[issue];
    if (!focus) return { guidance: t.general, evidence: t.evidenceDefault, roadmap: t.roadmapDefault };
    return {
        guidance: [focus, ...t.general.slice(0, 2)],
        evidence: [focus, ...t.evidenceDefault],
        roadmap: [focus, ...t.roadmapDefault]
    };
}
function getLocalizedGuidance(issue, language) { return getLocalizedIssueContent(issue, language).guidance; }
function getLocalizedEvidence(issue, language) { return getLocalizedIssueContent(issue, language).evidence; }
function getLocalizedRoadmap(issue, language) { return getLocalizedIssueContent(issue, language).roadmap; }
function getLocalizedFollowUpQuestions(issue, language) {
    const questions = {
        en: ['When did this start?', 'What written records or messages do you have?', 'Have you already asked your employer to resolve it?'],
        hi: ['यह कब से हो रहा है?', 'आपके पास कौन से लिखित रिकॉर्ड या संदेश हैं?', 'क्या आपने नियोक्ता से इसे ठीक करने के लिए बात की है?'],
        ta: ['இது எப்போது தொடங்கியது?', 'உங்களிடம் என்ன எழுத்துப்பூர்வ பதிவுகள் அல்லது செய்திகள் உள்ளன?', 'இதைத் தீர்க்க உங்கள் முதலாளியிடம் கேட்டீர்களா?'],
        te: ['ఇది ఎప్పుడు ప్రారంభమైంది?', 'మీ వద్ద ఏ వ్రాతపూర్వక రికార్డులు లేదా సందేశాలు ఉన్నాయి?', 'దీనిని పరిష్కరించమని మీరు మీ యజమానిని అడిగారా?'],
        bn: ['এটি কবে থেকে শুরু হয়েছে?', 'আপনার কাছে কী লিখিত রেকর্ড বা বার্তা আছে?', 'সমাধানের জন্য আপনি কি নিয়োগকর্তাকে বলেছেন?'],
        mr: ['हे कधीपासून सुरू आहे?', 'तुमच्याकडे कोणते लेखी रेकॉर्ड किंवा संदेश आहेत?', 'हे सोडवण्यासाठी तुम्ही नियोक्त्याशी बोलला आहात का?']
    };
    return questions[language] || questions.en;
}
function getFollowUpHeading(language) {
    return ({ en: 'Follow-up questions', hi: 'आगे के सवाल', ta: 'தொடர் கேள்விகள்', te: 'తదుపరి ప్రశ్నలు', bn: 'পরবর্তী প্রশ্ন', mr: 'पुढील प्रश्न' })[language] || 'Follow-up questions';
}

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

const localizedIssueFocus = {
    en: {
        'Salary Withheld': 'Focus on the dates, amount, and messages related to the unpaid or delayed wages.',
        'Fired Without Notice': 'Focus on the dismissal date, reason given, and any notice or written message you received.',
        'Excessive Hours': 'Focus on your daily hours, rest breaks, overtime requests, and records of the work performed.',
        'No Contract': 'Focus on how the job was agreed, the work you perform, the pay arrangement, and messages showing the relationship.',
        'Workplace Injury': 'Focus on when and where the injury happened, who was informed, treatment received, and related expenses.',
        'Sexual Harassment': 'Focus on recording each incident safely, preserving messages, and identifying a trusted reporting or support route.'
    },
    hi: {
        'Salary Withheld': 'न मिले या देर से मिले वेतन की तारीख, रकम और उससे जुड़े संदेशों पर ध्यान दें।',
        'Fired Without Notice': 'नौकरी खत्म होने की तारीख, बताए गए कारण और मिले नोटिस या लिखित संदेश पर ध्यान दें।',
        'Excessive Hours': 'रोज़ के काम के घंटे, आराम का समय, अतिरिक्त काम के अनुरोध और काम के रिकॉर्ड पर ध्यान दें।',
        'No Contract': 'नौकरी कैसे तय हुई, काम क्या है, भुगतान कैसे होता है और संबंध दिखाने वाले संदेशों पर ध्यान दें।',
        'Workplace Injury': 'चोट कब और कहां लगी, किसे बताया, इलाज क्या हुआ और खर्चों पर ध्यान दें।',
        'Sexual Harassment': 'हर घटना को सुरक्षित तरीके से लिखें, संदेश बचाकर रखें और भरोसेमंद शिकायत या सहायता का रास्ता खोजें।'
    },
    ta: {
        'Salary Withheld': 'வழங்கப்படாத அல்லது தாமதமான சம்பளத்தின் தேதி, தொகை மற்றும் தொடர்புடைய செய்திகளில் கவனம் செலுத்துங்கள்.',
        'Fired Without Notice': 'வேலை முடிந்த தேதி, கூறப்பட்ட காரணம் மற்றும் கிடைத்த அறிவிப்பு அல்லது எழுத்துப்பூர்வ செய்தியில் கவனம் செலுத்துங்கள்.',
        'Excessive Hours': 'தினசரி வேலை நேரம், ஓய்வு நேரம், கூடுதல் வேலை கோரிக்கைகள் மற்றும் வேலைப் பதிவுகளில் கவனம் செலுத்துங்கள்.',
        'No Contract': 'வேலை எப்படி ஒப்புக்கொள்ளப்பட்டது, செய்யும் வேலை, சம்பள ஏற்பாடு மற்றும் தொடர்பைக் காட்டும் செய்திகளில் கவனம் செலுத்துங்கள்.',
        'Workplace Injury': 'காயம் ஏற்பட்ட நேரம் மற்றும் இடம், தகவல் கொடுத்தவர், பெற்ற சிகிச்சை மற்றும் செலவுகளில் கவனம் செலுத்துங்கள்.',
        'Sexual Harassment': 'ஒவ்வொரு சம்பவத்தையும் பாதுகாப்பாக பதிவு செய்து, செய்திகளை வைத்துக் கொண்டு நம்பகமான புகார் அல்லது ஆதரவு வழியைத் தேடுங்கள்.'
    },
    te: {
        'Salary Withheld': 'చెల్లించని లేదా ఆలస్యమైన జీతానికి సంబంధించిన తేదీలు, మొత్తం మరియు సందేశాలపై దృష్టి పెట్టండి.',
        'Fired Without Notice': 'ఉద్యోగం ముగిసిన తేదీ, చెప్పిన కారణం మరియు వచ్చిన నోటీసు లేదా వ్రాతపూర్వక సందేశంపై దృష్టి పెట్టండి.',
        'Excessive Hours': 'రోజువారీ పని గంటలు, విశ్రాంతి సమయం, అదనపు పని అభ్యర్థనలు మరియు పని రికార్డులపై దృష్టి పెట్టండి.',
        'No Contract': 'ఉద్యోగం ఎలా అంగీకరించబడింది, పని, చెల్లింపు విధానం మరియు సంబంధాన్ని చూపే సందేశాలపై దృష్టి పెట్టండి.',
        'Workplace Injury': 'గాయం ఎప్పుడు, ఎక్కడ జరిగింది, ఎవరికి చెప్పారు, చికిత్స మరియు ఖర్చులపై దృష్టి పెట్టండి.',
        'Sexual Harassment': 'ప్రతి సంఘటనను సురక్షితంగా నమోదు చేసి, సందేశాలను భద్రపరచి, నమ్మకమైన ఫిర్యాదు లేదా సహాయ మార్గాన్ని వెతకండి.'
    },
    bn: {
        'Salary Withheld': 'না পাওয়া বা দেরি হওয়া মজুরির তারিখ, পরিমাণ এবং সম্পর্কিত বার্তাগুলিতে মন দিন।',
        'Fired Without Notice': 'চাকরি শেষ হওয়ার তারিখ, বলা কারণ এবং পাওয়া নোটিশ বা লিখিত বার্তায় মন দিন।',
        'Excessive Hours': 'প্রতিদিনের কাজের সময়, বিশ্রামের সময়, অতিরিক্ত কাজের অনুরোধ এবং কাজের রেকর্ডে মন দিন।',
        'No Contract': 'চাকরি কীভাবে ঠিক হয়েছিল, কাজের ধরন, পারিশ্রমিকের ব্যবস্থা এবং সম্পর্কের প্রমাণ দেওয়া বার্তায় মন দিন।',
        'Workplace Injury': 'আঘাত কখন ও কোথায় হয়েছে, কাকে জানানো হয়েছে, চিকিৎসা এবং খরচে মন দিন।',
        'Sexual Harassment': 'প্রতিটি ঘটনা নিরাপদে লিখে রাখুন, বার্তা সংরক্ষণ করুন এবং বিশ্বাসযোগ্য অভিযোগ বা সহায়তার পথ খুঁজুন।'
    },
    mr: {
        'Salary Withheld': 'न मिळालेल्या किंवा उशिरा मिळालेल्या पगाराची तारीख, रक्कम आणि संबंधित संदेशांवर लक्ष द्या.',
        'Fired Without Notice': 'नोकरी संपल्याची तारीख, सांगितलेले कारण आणि मिळालेली नोटीस किंवा लेखी संदेश यावर लक्ष द्या.',
        'Excessive Hours': 'दररोजचे कामाचे तास, विश्रांती, अतिरिक्त कामाच्या विनंत्या आणि कामाच्या नोंदी यावर लक्ष द्या.',
        'No Contract': 'नोकरी कशी ठरली, कामाचे स्वरूप, वेतनाची पद्धत आणि संबंध दाखवणाऱ्या संदेशांवर लक्ष द्या.',
        'Workplace Injury': 'दुखापत कधी व कुठे झाली, कोणाला सांगितले, उपचार आणि खर्च यावर लक्ष द्या.',
        'Sexual Harassment': 'प्रत्येक घटना सुरक्षितपणे लिहा, संदेश जतन करा आणि विश्वासार्ह तक्रार किंवा मदतीचा मार्ग शोधा.'
    }
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
const languageSelector = document.getElementById('languageSelector');
const languageStatus = document.getElementById('languageStatus');
const autoReadToggle = document.getElementById('autoReadToggle');
const voiceSupportStatus = document.getElementById('voiceSupportStatus');
const workerTypeSelector = document.getElementById('workerType');
const stateSelector = document.getElementById('stateSelector');

const speechLanguageCodes = { en: 'en-IN', hi: 'hi-IN', ta: 'ta-IN', te: 'te-IN', bn: 'bn-IN', mr: 'mr-IN' };
let speechState = { status: 'idle', utterance: null, language: 'en' };

function getLanguageCode(language) { return speechLanguageCodes[language] || speechLanguageCodes.en; }
function getAvailableVoices() { return typeof window !== 'undefined' && window.speechSynthesis ? window.speechSynthesis.getVoices() : []; }
function findMatchingVoice(language) {
    const prefix = getLanguageCode(language).split('-')[0].toLowerCase();
    return getAvailableVoices().find(voice => voice.lang.toLowerCase().startsWith(prefix));
}

function getSpeechLabels(language) {
    return ({
        en: { listen: '🔊 Listen to My Guidance', pause: '⏸ Pause', resume: '▶ Resume', stop: '⏹ Stop', ready: '🔊 Your guidance is ready to listen', unavailable: 'Voice support for this language depends on your browser and device. Try another browser or enable additional system voices.' },
        hi: { listen: '🔊 मेरी जानकारी सुनें', pause: '⏸ रोकें', resume: '▶ फिर सुनें', stop: '⏹ बंद करें', ready: '🔊 आपकी जानकारी सुनने के लिए तैयार है', unavailable: 'इस भाषा का आवाज़ समर्थन आपके ब्राउज़र और डिवाइस पर निर्भर करता है। दूसरा ब्राउज़र आज़माएं या अतिरिक्त सिस्टम आवाज़ें चालू करें।' },
        ta: { listen: '🔊 வழிகாட்டுதலைக் கேளுங்கள்', pause: '⏸ இடைநிறுத்து', resume: '▶ மீண்டும் தொடங்கு', stop: '⏹ நிறுத்து', ready: '🔊 உங்கள் வழிகாட்டுதல் கேட்கத் தயாராக உள்ளது', unavailable: 'இந்த மொழிக்கான குரல் ஆதரவு உங்கள் உலாவி மற்றும் சாதனத்தைப் பொறுத்தது. வேறு உலாவியை முயற்சிக்கவும் அல்லது கூடுதல் குரல்களை இயக்கவும்.' },
        te: { listen: '🔊 నా మార్గదర్శకం వినండి', pause: '⏸ ఆపండి', resume: '▶ మళ్లీ కొనసాగించండి', stop: '⏹ ఆపివేయండి', ready: '🔊 మీ మార్గదర్శకం వినడానికి సిద్ధంగా ఉంది', unavailable: 'ఈ భాషకు వాయిస్ మద్దతు మీ బ్రౌజర్ మరియు పరికరంపై ఆధారపడి ఉంటుంది. మరో బ్రౌజర్ ప్రయత్నించండి లేదా అదనపు సిస్టమ్ వాయిస్‌లను ప్రారంభించండి.' },
        bn: { listen: '🔊 আমার নির্দেশনা শুনুন', pause: '⏸ বিরতি', resume: '▶ আবার চালান', stop: '⏹ বন্ধ করুন', ready: '🔊 আপনার নির্দেশনা শোনার জন্য প্রস্তুত', unavailable: 'এই ভাষার ভয়েস সাপোর্ট আপনার ব্রাউজার ও ডিভাইসের উপর নির্ভর করে। অন্য ব্রাউজার চেষ্টা করুন বা অতিরিক্ত সিস্টেম ভয়েস চালু করুন।' },
        mr: { listen: '🔊 माझे मार्गदर्शन ऐका', pause: '⏸ थांबवा', resume: '▶ पुन्हा सुरू करा', stop: '⏹ थांबवा', ready: '🔊 तुमचे मार्गदर्शन ऐकण्यासाठी तयार आहे', unavailable: 'या भाषेचा आवाज तुमच्या ब्राउझर आणि डिव्हाइसवर अवलंबून आहे. दुसरा ब्राउझर वापरा किंवा अतिरिक्त सिस्टम आवाज सुरू करा.' }
    })[language] || ({ listen: '🔊 Listen to My Guidance', pause: '⏸ Pause', resume: '▶ Resume', stop: '⏹ Stop', ready: '🔊 Your guidance is ready to listen', unavailable: 'Voice support depends on your browser and device.' });
}

function updateSpeechControls() {
    const summary = window.latestCaseSummary;
    const language = summary?.language || speechState.language || 'en';
    const labels = getSpeechLabels(language);
    const playButton = document.getElementById('listenGuidanceBtn');
    const pauseButton = document.getElementById('pauseSpeechBtn');
    const stopButton = document.getElementById('stopSpeechBtn');
    const status = document.getElementById('speechStatus');
    if (playButton) playButton.textContent = speechState.status === 'paused' ? labels.resume : labels.listen;
    if (pauseButton) pauseButton.hidden = speechState.status !== 'playing';
    if (stopButton) stopButton.hidden = speechState.status === 'idle';
    if (status) status.textContent = speechState.status === 'playing' ? '🔊 Playing' : speechState.status === 'paused' ? '⏸ Paused' : labels.ready;
}

function speakText(text, language) {
    if (!text || typeof window === 'undefined' || !window.speechSynthesis || typeof SpeechSynthesisUtterance === 'undefined') {
        if (voiceSupportStatus) voiceSupportStatus.textContent = 'Voice guidance is not supported in this browser.';
        return false;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const code = getLanguageCode(language);
    const voice = findMatchingVoice(language);
    utterance.lang = code;
    if (voice) utterance.voice = voice;
    utterance.rate = 0.9;
    speechState = { status: 'playing', utterance, language };
    utterance.onend = () => { speechState.status = 'idle'; speechState.utterance = null; updateSpeechControls(); };
    utterance.onerror = () => { speechState.status = 'idle'; speechState.utterance = null; updateSpeechControls(); };
    if (!voice && voiceSupportStatus) voiceSupportStatus.textContent = getSpeechLabels(language).unavailable;
    window.speechSynthesis.speak(utterance);
    updateSpeechControls();
    return true;
}

function pauseSpeech() {
    if (speechState.status === 'playing' && window.speechSynthesis) { window.speechSynthesis.pause(); speechState.status = 'paused'; updateSpeechControls(); }
}
function resumeSpeech() {
    if (speechState.status === 'paused' && window.speechSynthesis) { window.speechSynthesis.resume(); speechState.status = 'playing'; updateSpeechControls(); }
}
function stopSpeech() {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    speechState = { status: 'idle', utterance: null, language: speechState.language };
    updateSpeechControls();
}
function cleanupSpeech() { stopSpeech(); }

function speechList(items) { return (items || []).map((item, index) => `${index + 1}. ${item}`).join(' '); }
function getSpeechSectionText(sectionName, caseData) {
    const t = translations[caseData.language] || translations.en;
    const issue = getLocalizedIssueName(caseData.category, caseData.language);
    const sections = {
        understanding: `${t.issue}: ${issue}. ${t.summary}: ${caseData.userInput}.`,
        rights: `${t.rights}. ${speechList(caseData.content.guidance)} `,
        evidence: `${t.evidence}. ${speechList(caseData.content.evidence)}`,
        roadmap: `${t.roadmap}. ${speechList(caseData.content.roadmap)} ${t.next}. ${speechList(t.roadmapDefault)}`
    };
    return sections[sectionName] || '';
}
function speakSection(sectionName, caseData) { return speakText(getSpeechSectionText(sectionName, caseData), caseData.language); }
function speakFullGuidance(caseData) {
    const t = translations[caseData.language] || translations.en;
    const intro = { en: 'Here is your case guidance.', hi: 'यह आपकी केस संबंधी जानकारी है।', ta: 'இதோ உங்கள் வழக்கு வழிகாட்டுதல்.', te: 'ఇదిగో మీ కేసు మార్గదర్శకం.', bn: 'এটি আপনার কেসের নির্দেশনা।', mr: 'हे तुमच्या प्रकरणाचे मार्गदर्शन आहे.' }[caseData.language] || 'Here is your case guidance.';
    const text = [intro, getSpeechSectionText('understanding', caseData), `${t.rights}. ${speechList(caseData.content.guidance)}`, `${t.next}. ${speechList(caseData.content.roadmap)}`, getSpeechSectionText('evidence', caseData), getSpeechSectionText('roadmap', caseData), t.disclaimer].join(' ');
    return speakText(text, caseData.language);
}

function wireSpeechControls() {
    document.getElementById('listenGuidanceBtn')?.addEventListener('click', () => {
        if (speechState.status === 'paused') resumeSpeech();
        else speakFullGuidance(window.latestCaseSummary);
    });
    document.getElementById('pauseSpeechBtn')?.addEventListener('click', pauseSpeech);
    document.getElementById('stopSpeechBtn')?.addEventListener('click', stopSpeech);
    document.querySelectorAll('[data-speech-section]').forEach(button => button.addEventListener('click', () => speakSection(button.dataset.speechSection, window.latestCaseSummary)));
    updateSpeechControls();
}

if (languageSelector) {
    languageSelector.addEventListener('change', () => {
        const language = languageSelector.value;
        if (language !== 'auto' && languageStatus) languageStatus.textContent = `${translateUI('detected', language)}: ${supportedLanguages[language].name}`;
        if (language === 'auto' && languageStatus) languageStatus.textContent = '';
        if (submitBtn && language !== 'auto') submitBtn.textContent = translateUI('submit', language);
        if (clearBtn && language !== 'auto') clearBtn.textContent = translateUI('clear', language);
    });
}
if (voiceSupportStatus && (!window.speechSynthesis || typeof SpeechSynthesisUtterance === 'undefined')) {
    voiceSupportStatus.textContent = 'Voice guidance is not supported in this browser.';
}

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
        const faqItem = question.closest('.faq-item');
        const expanded = faqItem.classList.toggle('active');
        question.setAttribute('aria-expanded', String(expanded));
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
    const languageResult = getSelectedLanguage(userInput);
    const language = languageResult.language;
    const languageStatus = document.getElementById('languageStatus');
    if (languageStatus) languageStatus.textContent = languageResult.mixed && !languageResult.manual ? translateUI('mixed', language) : `${translateUI('detected', language)}: ${supportedLanguages[language].name}`;
    const matchingCategory = detectIssue(userInput, language);

    // Generate response
    const response = generateLegalGuidance(userInput, matchingCategory, language);
    displayResponse(response);
    saveAnalysisCase(userInput, matchingCategory, language, languageResult);
}

function detectIssue(userInput, language) {
    const normalized = userInput.toLocaleLowerCase();
    for (const category of Object.keys(issueKeywords)) {
        const words = Object.values(issueKeywords[category]).flat();
        if (words.some(keyword => normalized.includes(keyword.toLocaleLowerCase()))) return category;
    }
    return null;
}

function saveAnalysisCase(userInput, category, language, languageResult) {
    const content = getLocalizedIssueContent(category, language);
    saveCase({
        case_id: 'case_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
        user_id: getCurrentUser() && getCurrentUser().user_id,
        timestamp: new Date().toISOString(),
        originalLanguage: languageResult.language,
        responseLanguage: language,
        languageConfidence: languageResult.confidence,
        userQuestion: userInput,
        issue: category,
        workerType: workerTypeSelector?.value || '',
        state: stateSelector?.value || '',
        localizedIssueName: getLocalizedIssueName(category, language),
        guidance: content.guidance,
        evidenceChecklist: content.evidence,
        roadmap: content.roadmap,
        evidenceProgress: content.evidence.map(() => false),
        roadmapProgress: content.roadmap.map(() => false),
        issue_summary: getLocalizedIssueName(category, language),
        full_conversation_log: [{ type: 'text', text: userInput, ts: new Date().toISOString() }],
        verdict: null
    });
}

// Generate legal guidance
function generateLegalGuidance(userInput, category, language) {
    const t = translations[language] || translations.en;
    const content = getLocalizedIssueContent(category, language);
    const speechLabels = getSpeechLabels(language);
    let response = '<div class="guidance-response">';
    response += `<div class="speech-controls" aria-label="Voice guidance controls"><button id="listenGuidanceBtn" type="button" aria-label="${speechLabels.listen}">${speechLabels.listen}</button><button id="pauseSpeechBtn" type="button" aria-label="${speechLabels.pause}" hidden>${speechLabels.pause}</button><button id="stopSpeechBtn" type="button" aria-label="${speechLabels.stop}" hidden>${speechLabels.stop}</button><span id="speechStatus" class="speech-status" aria-live="polite">${speechLabels.ready}</span></div>`;
    response += `<div class="guidance-section" data-speech-content="understanding"><div class="guidance-section-heading"><h4>${t.guidance}</h4><button class="section-speech-button" type="button" data-speech-section="understanding" aria-label="Listen to AI understanding">🔊</button></div>`;
    
    if (category && legalGuidanceDatabase[category]) {
        response += `<p><strong>${t.issue}: ${getLocalizedIssueName(category, language)}</strong></p>`;
        response += `<p><strong>${t.summary}:</strong> ${escapeHtml(userInput)}</p>`;
    } else {
        response += `<p>${t.noIssue}</p>`;
    }
    response += '</div>';

    if (result.disclaimer) {
        html += `<p style="margin-top: 20px; color: #34D399;"><strong>Remember:</strong> ${result.disclaimer}</p>`;
    }
    html += '</div>';
    return html;
    response += `<div class="guidance-section" data-speech-content="rights"><div class="guidance-section-heading"><h4>${t.rights}</h4><button class="section-speech-button" type="button" data-speech-section="rights" aria-label="Listen to possible rights">🔊</button></div><ul style="margin-left: 20px;">`;
    content.guidance.forEach(point => { response += `<li style="margin-bottom: 10px;">${point}</li>`; });
    response += '</ul></div>';

    response += `<h4 style="margin-top: 20px;">${getFollowUpHeading(language)}</h4><ul style="margin-left: 20px;">`;
    getLocalizedFollowUpQuestions(category, language).forEach(question => { response += `<li style="margin-bottom: 10px;">${question} <button class="section-speech-button question-speech-button" type="button" data-speech-text="${escapeHtml(question)}" aria-label="Listen to question">🔊</button></li>`; });
    response += '</ul>';
    response += `<div class="guidance-section" data-speech-content="evidence"><div class="guidance-section-heading"><h4 style="margin-top: 20px;">${t.evidence}</h4><button class="section-speech-button" type="button" data-speech-section="evidence" aria-label="Listen to evidence checklist">🔊</button></div><ul style="margin-left: 20px;">`;
    content.evidence.forEach(point => { response += `<li style="margin-bottom: 10px;">${point}</li>`; });
    response += `</ul></div><div class="guidance-section" data-speech-content="roadmap"><div class="guidance-section-heading"><h4 style="margin-top: 20px;">${t.roadmap}</h4><button class="section-speech-button" type="button" data-speech-section="roadmap" aria-label="Listen to action roadmap">🔊</button></div><ol style="margin-left: 20px;">`;
    content.roadmap.forEach(point => { response += `<li style="margin-bottom: 10px;">${point}</li>`; });
    response += `</ol></div><h4 style="margin-top: 20px;">${t.next}</h4>`;
    response += '<ul style="margin-left: 20px;">';
    content.roadmap.forEach(point => { response += `<li style="margin-bottom: 10px;">${point}</li>`; });
    response += '</ul>';

    response += `<p style="margin-top: 20px; color: #34D399;"><strong>${t.disclaimer}</strong></p>`;
    response += `<button class="btn btn-secondary" type="button" onclick="downloadCaseSummary()">${language === 'en' ? 'Download Case Summary' : language === 'hi' ? 'केस सारांश डाउनलोड करें' : language === 'ta' ? 'வழக்கு சுருக்கத்தைப் பதிவிறக்கவும்' : language === 'te' ? 'కేసు సారాంశాన్ని డౌన్‌లోడ్ చేయండి' : language === 'bn' ? 'কেসের সারাংশ ডাউনলোড করুন' : 'केस सारांश डाउनलोड करा'}</button>`;
    response += '</div>';

    window.latestCaseSummary = {
        userInput,
        category,
        language,
        content,
        workerType: workerTypeSelector?.value || '',
        state: stateSelector?.value || ''
    };

    return response;
}

function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
}

function downloadCaseSummary() {
    const summary = window.latestCaseSummary;
    if (!summary) return;
    const t = translations[summary.language] || translations.en;
    const lines = [t.guidance, `${t.issue}: ${getLocalizedIssueName(summary.category, summary.language)}`, `${t.summary}: ${summary.userInput}`, '', t.evidence, ...summary.content.evidence.map((item, index) => `${index + 1}. ${item}`), '', t.roadmap, ...summary.content.roadmap.map((item, index) => `${index + 1}. ${item}`), '', t.disclaimer];
    const blob = new Blob([`\ufeff${lines.join('\n')}`], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'rightsmitra-case-summary.txt';
    link.click();
    URL.revokeObjectURL(link.href);
}

// Display response
function displayResponse(response) {
    cleanupSpeech();
    responseContent.innerHTML = response;
    responseSection.classList.remove('hidden');
    wireSpeechControls();
    document.querySelectorAll('[data-speech-text]').forEach(button => button.addEventListener('click', () => speakText(button.dataset.speechText, window.latestCaseSummary.language)));
    if (voiceSupportStatus && window.speechSynthesis) voiceSupportStatus.textContent = getSpeechLabels(window.latestCaseSummary.language).ready;
    if (autoReadToggle?.checked && window.latestCaseSummary) {
        const caseData = window.latestCaseSummary;
        const firstAction = caseData.content.roadmap[0] || '';
        setTimeout(() => speakText(`${getSpeechSectionText('understanding', caseData)} ${firstAction}`, caseData.language), 250);
    }
    responseSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Close response
function closeResponse() {
    cleanupSpeech();
    responseSection.classList.add('hidden');
}

// Clear form
function handleClear() {
    userQuestionInput.value = '';
    if (languageStatus) languageStatus.textContent = '';
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
        micToggle.setAttribute('aria-label', micEnabled ? 'Turn microphone off' : 'Turn microphone on');
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
        const selectedLanguage = languageSelector?.value || 'auto';
        recognition.lang = supportedLanguages[selectedLanguage]?.speechCode || 'en-IN';
        if (selectedLanguage === 'auto' && languageStatus) languageStatus.textContent = 'Auto Detect uses English speech recognition by default. Choose a language for best results.';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        ongoingRecognition = recognition;

        recognition.onstart = () => {
            if (voiceIcon) voiceIcon.classList.add('speaking');
            voiceBtn.setAttribute('aria-label', 'Stop voice input');
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
            const voiceLanguage = getSelectedLanguage(transcript);
            if (languageStatus) languageStatus.textContent = `${translateUI('detected', voiceLanguage.language)}: ${supportedLanguages[voiceLanguage.language].name}`;
        };

        recognition.onend = () => {
            if (voiceIcon) voiceIcon.classList.remove('speaking');
            voiceBtn.setAttribute('aria-label', 'Start voice input');
            audioBars.forEach(bar => bar.classList.remove('animating'));
            ongoingRecognition = null;
        };

        recognition.onerror = (e) => {
            console.error('Speech recognition error', e);
            if (voiceIcon) voiceIcon.classList.remove('speaking');
            voiceBtn.setAttribute('aria-label', 'Start voice input');
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
function renderCasesOnPage() {
    const casesContainer = document.getElementById('casesList');
    if (!casesContainer) return;
    const detailContainer = document.getElementById('caseDetail');
    const user = getCurrentUser();
    const owner = (user && user.user_id) || localStorage.getItem('guestSessionId');
    const cases = getCasesForOwner(owner) || [];
    casesContainer.innerHTML = '';
    if (!cases.length) { casesContainer.innerHTML = '<p class="muted">No cases found. Your recent voice inputs will appear here.</p>'; return; }
    cases.forEach(c => {
        const div = document.createElement('div');
        div.className = 'case-card';
        const savedLanguage = supportedLanguages[c.responseLanguage]?.name || '';
        const header = document.createElement('div');
        header.className = 'case-card-header';
        const title = document.createElement('strong');
        title.textContent = c.localizedIssueName || c.issue_summary || 'Saved case';
        const timestamp = document.createElement('span');
        timestamp.className = 'case-ts';
        timestamp.textContent = new Date(c.timestamp).toLocaleString();
        header.append(title, timestamp);
        const body = document.createElement('div');
        body.className = 'case-card-body';
        const description = document.createElement('p');
        description.textContent = c.userQuestion || (c.full_conversation_log?.[0]?.text || '');
        body.appendChild(description);
        const footer = document.createElement('div');
        footer.className = 'case-card-footer';
        const metadata = document.createElement('small');
        metadata.textContent = `${savedLanguage ? savedLanguage + ' | ' : ''}${c.verdict || 'Saved locally'}`;
        footer.appendChild(metadata);
        div.append(header, body, footer);
        div.addEventListener('click', () => {
            cleanupSpeech();
            showCaseDetail(c, detailContainer);
        });
        casesContainer.appendChild(div);
    });
}

function showCaseDetail(caseData, detailContainer) {
    if (!detailContainer) return;
    const language = caseData.responseLanguage || caseData.originalLanguage || 'en';
    const t = translations[language] || translations.en;
    const guidance = caseData.guidance || [];
    const evidence = caseData.evidenceChecklist || [];
    const roadmap = caseData.roadmap || [];
    const evidenceProgress = caseData.evidenceProgress || evidence.map(() => false);
    const roadmapProgress = caseData.roadmapProgress || roadmap.map(() => false);
    detailContainer.innerHTML = '';

    const heading = document.createElement('h3');
    heading.textContent = caseData.localizedIssueName || caseData.issue_summary || t.guidance;
    detailContainer.appendChild(heading);
    const context = document.createElement('p');
    context.textContent = `${t.summary}: ${caseData.userQuestion || ''}`;
    detailContainer.appendChild(context);
    if (caseData.workerType || caseData.state) {
        const workerContext = document.createElement('p');
        workerContext.textContent = [caseData.workerType, caseData.state].filter(Boolean).join(' | ');
        detailContainer.appendChild(workerContext);
    }

    appendCaseList(detailContainer, t.rights, guidance, 'ul');
    appendCaseList(detailContainer, t.evidence, evidence, 'ul', evidenceProgress, (index, checked) => {
        updateCaseProgress(caseData.case_id, 'evidenceProgress', index, checked);
    });
    appendCaseList(detailContainer, t.roadmap, roadmap, 'ol', roadmapProgress, (index, checked) => {
        updateCaseProgress(caseData.case_id, 'roadmapProgress', index, checked);
    });
    const disclaimer = document.createElement('p');
    disclaimer.className = 'case-disclaimer';
    disclaimer.textContent = t.disclaimer;
    detailContainer.appendChild(disclaimer);
    detailContainer.classList.add('visible');
    detailContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function appendCaseList(container, headingText, items, listType, progress, onChange) {
    const heading = document.createElement('h4');
    heading.textContent = headingText;
    container.appendChild(heading);
    const list = document.createElement(listType);
    (items || []).forEach((item, index) => {
        const listItem = document.createElement('li');
        if (progress) {
            const label = document.createElement('label');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = Boolean(progress[index]);
            checkbox.addEventListener('change', () => onChange(index, checkbox.checked));
            label.append(checkbox, document.createTextNode(item));
            listItem.appendChild(label);
        } else {
            listItem.textContent = item;
        }
        list.appendChild(listItem);
    });
    container.appendChild(list);
}

function updateCaseProgress(caseId, field, index, checked) {
    const user = getCurrentUser();
    const owner = (user && user.user_id) || localStorage.getItem('guestSessionId');
    const cases = getCasesForOwner(owner);
    const savedCase = cases.find(item => item.case_id === caseId);
    if (!savedCase) return;
    savedCase[field] = savedCase[field] || [];
    savedCase[field][index] = checked;
    localStorage.setItem('cases_' + owner, JSON.stringify(cases));
}

// Run on pages where DOM loaded
document.addEventListener('DOMContentLoaded', () => {
    renderCasesOnPage();
});

// Contact form handler - now submits to the backend
async function handleContactForm(e) {
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
if (userQuestionInput) {
    userQuestionInput.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'Enter') {
            handleSubmit();
        }
    });
}

// Initialize tooltips and accessibility features
document.addEventListener('DOMContentLoaded', () => {
    console.log('Legal Empowerment Website Loaded Successfully');
    const elements = document.querySelectorAll('.interactive-card, .feature-card, .faq-item');
    elements.forEach(el => {
        el.style.animation = 'none';
    });
});

// Prevent form submission on enter in textarea (allow Ctrl+Enter instead)
if (userQuestionInput) {
    userQuestionInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.ctrlKey) {
            e.preventDefault();
        }
    });
}
