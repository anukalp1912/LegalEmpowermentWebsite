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
    en: { guidance: 'Your Legal Guidance', issue: 'Issue detected', summary: 'Situation summary', rights: 'Rights and useful information', evidence: 'Evidence checklist', roadmap: 'Action roadmap', next: 'Next steps', disclaimer: 'This is general information, not legal advice. Speak with a qualified lawyer or legal-aid organisation for advice about your situation.', detected: 'Language detected', mixed: 'Mixed language input detected. Choose your response language.', submit: 'Get Legal Guidance', clear: 'Clear', noIssue: 'We could not identify a specific issue. These general steps may help.', general: ['Keep records of messages, payments, and incidents.', 'Learn about your protections under Indian labour law.', 'Collect witnesses, photographs, payslips, and other supporting documents.', 'Make complaints in writing with dates and specific details.', 'Contact your District Labour Officer or a legal-aid organisation.'], evidenceDefault: ['Employment messages or contract', 'Payment records and bank statements', 'Relevant photographs or medical records', 'Names of witnesses'], roadmapDefault: ['Write down the dates and facts.', 'Keep copies of every document and message.', 'Send a written request or complaint.', 'Contact a labour authority or legal-aid organisation.'] },
    hi: { guidance: 'आपकी कानूनी जानकारी', issue: 'पहचानी गई समस्या', summary: 'स्थिति का सारांश', rights: 'आपके अधिकार और उपयोगी जानकारी', evidence: 'सबूतों की सूची', roadmap: 'आगे की कार्ययोजना', next: 'अगले कदम', disclaimer: 'यह सामान्य जानकारी है, कानूनी सलाह नहीं। अपनी स्थिति के लिए योग्य वकील या कानूनी सहायता संस्था से सलाह लें।', detected: 'भाषा पहचानी गई', mixed: 'मिश्रित भाषा मिली। जवाब की भाषा चुनें।', submit: 'कानूनी जानकारी पाएं', clear: 'साफ करें', noIssue: 'किसी खास समस्या की पहचान नहीं हो सकी। ये सामान्य कदम मदद कर सकते हैं।', general: ['संदेशों, भुगतानों और घटनाओं का रिकॉर्ड रखें।', 'भारतीय श्रम कानून के तहत मिलने वाली सुरक्षा के बारे में जानें।', 'गवाह, फोटो, वेतन पर्ची और दूसरे दस्तावेज इकट्ठा करें।', 'तारीख और पूरी जानकारी के साथ लिखित शिकायत करें।', 'जिला श्रम अधिकारी या कानूनी सहायता संस्था से संपर्क करें।'], evidenceDefault: ['नौकरी से जुड़े संदेश या अनुबंध', 'भुगतान का रिकॉर्ड और बैंक विवरण', 'जरूरी फोटो या चिकित्सा रिकॉर्ड', 'गवाहों के नाम'], roadmapDefault: ['तारीख और घटनाएं लिख लें।', 'सभी दस्तावेजों और संदेशों की प्रतियां रखें।', 'लिखित अनुरोध या शिकायत भेजें।', 'श्रम अधिकारी या कानूनी सहायता संस्था से संपर्क करें।'] },
    ta: { guidance: 'உங்கள் சட்ட வழிகாட்டுதல்', issue: 'கண்டறியப்பட்ட பிரச்சினை', summary: 'நிலைமையின் சுருக்கம்', rights: 'உங்கள் உரிமைகள் மற்றும் பயனுள்ள தகவல்', evidence: 'ஆதாரப் பட்டியல்', roadmap: 'செயல் திட்டம்', next: 'அடுத்த படிகள்', disclaimer: 'இது பொதுவான தகவல் மட்டுமே; சட்ட ஆலோசனை அல்ல. உங்கள் நிலைக்கு தகுதியான வழக்கறிஞர் அல்லது சட்ட உதவி அமைப்பை அணுகவும்.', detected: 'கண்டறியப்பட்ட மொழி', mixed: 'கலப்பு மொழி உள்ளீடு கண்டறியப்பட்டது. பதில் மொழியைத் தேர்ந்தெடுக்கவும்.', submit: 'சட்ட வழிகாட்டுதலைப் பெறுங்கள்', clear: 'அழிக்கவும்', noIssue: 'குறிப்பிட்ட பிரச்சினையை அடையாளம் காண முடியவில்லை. இந்தப் பொதுவான படிகள் உதவும்.', general: ['செய்திகள், பணம் மற்றும் சம்பவங்களின் பதிவுகளை வைத்திருங்கள்.', 'இந்திய தொழிலாளர் சட்டத்தின் பாதுகாப்புகளைப் பற்றி அறிந்து கொள்ளுங்கள்.', 'சாட்சிகள், புகைப்படங்கள் மற்றும் சம்பளச் சீட்டுகளை சேகரியுங்கள்.', 'தேதிகள் மற்றும் விவரங்களுடன் எழுத்துப்பூர்வமாக புகார் அளியுங்கள்.', 'மாவட்ட தொழிலாளர் அலுவலர் அல்லது சட்ட உதவி அமைப்பை அணுகுங்கள்.'], evidenceDefault: ['வேலை தொடர்பான செய்திகள் அல்லது ஒப்பந்தம்', 'பணம் செலுத்திய பதிவுகள் மற்றும் வங்கி விவரங்கள்', 'புகைப்படங்கள் அல்லது மருத்துவப் பதிவுகள்', 'சாட்சிகளின் பெயர்கள்'], roadmapDefault: ['தேதிகள் மற்றும் நிகழ்வுகளை எழுதுங்கள்.', 'அனைத்து ஆவணங்கள் மற்றும் செய்திகளின் நகல்களை வைத்திருங்கள்.', 'எழுத்துப்பூர்வ கோரிக்கை அல்லது புகார் அனுப்புங்கள்.', 'தொழிலாளர் அலுவலர் அல்லது சட்ட உதவி அமைப்பை அணுகுங்கள்.'] },
    te: { guidance: 'మీ న్యాయ మార్గదర్శకం', issue: 'గుర్తించిన సమస్య', summary: 'పరిస్థితి సారాంశం', rights: 'మీ హక్కులు మరియు ఉపయోగకరమైన సమాచారం', evidence: 'ఆధారాల జాబితా', roadmap: 'చర్యల ప్రణాళిక', next: 'తదుపరి చర్యలు', disclaimer: 'ఇది సాధారణ సమాచారం మాత్రమే, న్యాయ సలహా కాదు. మీ పరిస్థితికి అర్హత కలిగిన న్యాయవాది లేదా న్యాయ సహాయ సంస్థను సంప్రదించండి.', detected: 'గుర్తించిన భాష', mixed: 'మిశ్రమ భాష గుర్తించబడింది. సమాధాన భాషను ఎంచుకోండి.', submit: 'న్యాయ మార్గదర్శకం పొందండి', clear: 'తొలగించండి', noIssue: 'ప్రత్యేక సమస్యను గుర్తించలేకపోయాము. ఈ సాధారణ చర్యలు సహాయపడవచ్చు.', general: ['సందేశాలు, చెల్లింపులు మరియు సంఘటనల రికార్డులు ఉంచండి.', 'భారత కార్మిక చట్టంలోని రక్షణల గురించి తెలుసుకోండి.', 'సాక్షులు, ఫోటోలు మరియు జీతం రసీదులు సేకరించండి.', 'తేదీలు, వివరాలతో వ్రాతపూర్వక ఫిర్యాదు చేయండి.', 'జిల్లా కార్మిక అధికారి లేదా న్యాయ సహాయ సంస్థను సంప్రదించండి.'], evidenceDefault: ['ఉద్యోగ సందేశాలు లేదా ఒప్పందం', 'చెల్లింపు రికార్డులు మరియు బ్యాంక్ వివరాలు', 'ఫోటోలు లేదా వైద్య రికార్డులు', 'సాక్షుల పేర్లు'], roadmapDefault: ['తేదీలు, సంఘటనలు రాయండి.', 'అన్ని పత్రాలు, సందేశాల కాపీలు ఉంచండి.', 'వ్రాతపూర్వక అభ్యర్థన లేదా ఫిర్యాదు పంపండి.', 'కార్మిక అధికారి లేదా న్యాయ సహాయ సంస్థను సంప్రదించండి.'] },
    bn: { guidance: 'আপনার আইনি নির্দেশনা', issue: 'চিহ্নিত সমস্যা', summary: 'পরিস্থিতির সারাংশ', rights: 'আপনার অধিকার ও প্রয়োজনীয় তথ্য', evidence: 'প্রমাণের তালিকা', roadmap: 'করণীয় পরিকল্পনা', next: 'পরবর্তী পদক্ষেপ', disclaimer: 'এটি সাধারণ তথ্য, আইনি পরামর্শ নয়। আপনার পরিস্থিতির জন্য যোগ্য আইনজীবী বা আইনি সহায়তা সংস্থার সঙ্গে কথা বলুন।', detected: 'চিহ্নিত ভাষা', mixed: 'মিশ্র ভাষা শনাক্ত হয়েছে। উত্তরের ভাষা বেছে নিন।', submit: 'আইনি নির্দেশনা নিন', clear: 'মুছে ফেলুন', noIssue: 'নির্দিষ্ট সমস্যা শনাক্ত করা যায়নি। এই সাধারণ পদক্ষেপগুলি সাহায্য করতে পারে।', general: ['বার্তা, টাকা দেওয়া এবং ঘটনার রেকর্ড রাখুন।', 'ভারতের শ্রম আইনে আপনার সুরক্ষাগুলি জানুন।', 'সাক্ষী, ছবি, বেতন স্লিপ ও প্রয়োজনীয় কাগজ সংগ্রহ করুন।', 'তারিখ ও বিস্তারিত দিয়ে লিখিত অভিযোগ করুন।', 'জেলা শ্রম আধিকারিক বা আইনি সহায়তা সংস্থার সঙ্গে যোগাযোগ করুন।'], evidenceDefault: ['চাকরির বার্তা বা চুক্তি', 'পেমেন্টের রেকর্ড ও ব্যাংক বিবরণ', 'ছবি বা চিকিৎসার নথি', 'সাক্ষীদের নাম'], roadmapDefault: ['তারিখ ও ঘটনা লিখে রাখুন।', 'সব নথি ও বার্তার কপি রাখুন।', 'লিখিত অনুরোধ বা অভিযোগ পাঠান।', 'শ্রম আধিকারিক বা আইনি সহায়তা সংস্থার সঙ্গে যোগাযোগ করুন।'] },
    mr: { guidance: 'तुमचे कायदेशीर मार्गदर्शन', issue: 'ओळखलेली समस्या', summary: 'परिस्थितीचा सारांश', rights: 'तुमचे हक्क आणि उपयुक्त माहिती', evidence: 'पुराव्यांची यादी', roadmap: 'कृती आराखडा', next: 'पुढील पावले', disclaimer: 'ही सामान्य माहिती आहे, कायदेशीर सल्ला नाही. तुमच्या परिस्थितीसाठी पात्र वकील किंवा कायदेशीर मदत संस्थेशी बोला.', detected: 'ओळखलेली भाषा', mixed: 'मिश्र भाषा आढळली. उत्तराची भाषा निवडा.', submit: 'कायदेशीर मार्गदर्शन मिळवा', clear: 'पुसा', noIssue: 'विशिष्ट समस्या ओळखता आली नाही. ही सामान्य पावले मदत करू शकतात.', general: ['संदेश, देयके आणि घटनांच्या नोंदी ठेवा.', 'भारतीय कामगार कायद्यातील संरक्षणांची माहिती घ्या.', 'साक्षीदार, फोटो, पगाराच्या पावत्या आणि कागदपत्रे जमा करा.', 'तारीख व तपशीलांसह लेखी तक्रार करा.', 'जिल्हा कामगार अधिकारी किंवा कायदेशीर मदत संस्थेशी संपर्क साधा.'], evidenceDefault: ['नोकरीचे संदेश किंवा करार', 'देयक नोंदी आणि बँक तपशील', 'फोटो किंवा वैद्यकीय नोंदी', 'साक्षीदारांची नावे'], roadmapDefault: ['तारीख आणि घटना लिहून ठेवा.', 'सर्व कागदपत्रे आणि संदेशांच्या प्रती ठेवा.', 'लेखी विनंती किंवा तक्रार पाठवा.', 'कामगार अधिकारी किंवा कायदेशीर मदत संस्थेशी संपर्क करा.'] }
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
    const base = legalGuidanceDatabase[issue] || [];
    return { guidance: language === 'en' ? base : t.general, evidence: t.evidenceDefault, roadmap: t.roadmapDefault };
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
    const text = [intro, getSpeechSectionText('understanding', caseData), `${t.rights}. ${speechList(caseData.content.guidance)}`, `${t.next}. ${speechList(t.roadmapDefault)}`, getSpeechSectionText('evidence', caseData), getSpeechSectionText('roadmap', caseData), t.disclaimer].join(' ');
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
        localizedIssueName: getLocalizedIssueName(category, language),
        guidance: content.guidance,
        evidenceChecklist: content.evidence,
        roadmap: content.roadmap,
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
    t.roadmapDefault.forEach(point => { response += `<li style="margin-bottom: 10px;">${point}</li>`; });
    response += '</ul>';

    response += `<p style="margin-top: 20px; color: #34D399;"><strong>${t.disclaimer}</strong></p>`;
    response += `<button class="btn btn-secondary" type="button" onclick="downloadCaseSummary()">${language === 'en' ? 'Download Case Summary' : language === 'hi' ? 'केस सारांश डाउनलोड करें' : language === 'ta' ? 'வழக்கு சுருக்கத்தைப் பதிவிறக்கவும்' : language === 'te' ? 'కేసు సారాంశాన్ని డౌన్‌లోడ్ చేయండి' : language === 'bn' ? 'কেসের সারাংশ ডাউনলোড করুন' : 'केस सारांश डाउनलोड करा'}</button>`;
    response += '</div>';

    window.latestCaseSummary = { userInput, category, language, content };

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
        const selectedLanguage = languageSelector?.value || 'auto';
        recognition.lang = supportedLanguages[selectedLanguage]?.speechCode || 'en-IN';
        if (selectedLanguage === 'auto' && languageStatus) languageStatus.textContent = 'Auto Detect uses English speech recognition by default. Choose a language for best results.';
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
            const voiceLanguage = getSelectedLanguage(transcript);
            if (languageStatus) languageStatus.textContent = `${translateUI('detected', voiceLanguage.language)}: ${supportedLanguages[voiceLanguage.language].name}`;
            // Save a draft case automatically (minimal)
            const c = {
                case_id: 'case_' + Date.now() + '_' + Math.random().toString(36).slice(2,6),
                user_id: getCurrentUser() && getCurrentUser().user_id,
                timestamp: new Date().toISOString(),
                issue_summary: transcript.slice(0,120),
                originalLanguage: voiceLanguage.language,
                responseLanguage: voiceLanguage.language,
                languageConfidence: voiceLanguage.confidence,
                userQuestion: transcript,
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
        const savedLanguage = supportedLanguages[c.responseLanguage]?.name || '';
        div.innerHTML = `<div class="case-card-header"><strong>${c.localizedIssueName || c.issue_summary}</strong><span class="case-ts">${new Date(c.timestamp).toLocaleString()}</span></div>
                         <div class="case-card-body"><p>${(c.full_conversation_log && c.full_conversation_log[0] && c.full_conversation_log[0].text) || ''}</p></div>
                 <div class="case-card-footer"><small>${savedLanguage ? savedLanguage + ' | ' : ''}${c.verdict || 'Pending'}</small></div>`;
        div.addEventListener('click', () => {
            cleanupSpeech();
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
    
    // Preload animations
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
