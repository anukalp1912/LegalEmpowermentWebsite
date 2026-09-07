const API_BASE_URL = 'http://localhost:4000';

// Language data stays centralized so new languages can be added without changing the analysis flow.
const supportedLanguages = {
    en: { name: 'English', speechCode: 'en-IN' },
    hi: { name: 'Hindi', speechCode: 'hi-IN' },
    ta: { name: 'Tamil', speechCode: 'ta-IN' },
    te: { name: 'Telugu', speechCode: 'te-IN' },
    bn: { name: 'Bengali', speechCode: 'bn-IN' },
    mr: { name: 'Marathi', speechCode: 'mr-IN' }
};

const interfaceTranslations = {
    en: {
        chooseLanguage: 'Choose your preferred language', continue: 'Continue', changeLanguage: 'Change language', home: 'Home', about: 'About', resources: 'Resources', contact: 'Contact', cases: 'My Cases', login: 'Login', language: 'Language', autoDetect: 'Auto Detect', tellUs: 'Tell us what happened', situation: 'Your situation', workerType: 'Worker type', state: 'State or region', optional: 'Optional', understand: 'Understand My Situation', clear: 'Clear', summary: 'Situation summary', draftLetter: 'Draft a letter to your employer', viewLetter: 'View letter', editDraft: 'Please review and edit the draft before use.', letterDisclaimer: 'This is a general draft based on the information you provided. Review it carefully before sending or submitting it.', workerName: 'Worker name', employerName: 'Employer / Company name', jobRole: 'Job role (optional)', workplace: 'Workplace location (optional)', date: 'Date', employeeId: 'Employee ID (optional)', department: 'Department / Manager (optional)', startDate: 'Employment start date (optional)', contactInfo: 'Contact information (optional)', generateLetter: 'Generate draft letter', generateEnglish: 'Generate English copy', downloadPdf: 'Download as PDF', printLetter: 'Print letter', close: 'Close', draftReady: 'Draft letter', noCase: 'No saved case selected.'
    },
    hi: {
        chooseLanguage: 'अपनी पसंदीदा भाषा चुनें', continue: 'जारी रखें', changeLanguage: 'भाषा बदलें', home: 'होम', about: 'हमारे बारे में', resources: 'संसाधन', contact: 'संपर्क', cases: 'मेरे केस', login: 'लॉग इन', language: 'भाषा', autoDetect: 'अपने आप पहचानें', tellUs: 'काम पर क्या हुआ, बताएं', situation: 'आपकी स्थिति', workerType: 'काम का प्रकार', state: 'राज्य या क्षेत्र', optional: 'वैकल्पिक', understand: 'अपनी स्थिति समझें', clear: 'साफ करें', summary: 'स्थिति का सारांश', draftLetter: 'नियोक्ता को पत्र का मसौदा बनाएं', viewLetter: 'पत्र देखें', editDraft: 'कृपया उपयोग से पहले मसौदे को ध्यान से पढ़कर संपादित करें।', letterDisclaimer: 'यह आपके द्वारा दी गई जानकारी पर आधारित सामान्य मसौदा है। भेजने या जमा करने से पहले इसे ध्यान से जांचें।', workerName: 'कामगार का नाम', employerName: 'नियोक्ता / कंपनी का नाम', jobRole: 'काम का प्रकार (वैकल्पिक)', workplace: 'काम की जगह (वैकल्पिक)', date: 'तारीख', employeeId: 'कर्मचारी आईडी (वैकल्पिक)', department: 'विभाग / प्रबंधक (वैकल्पिक)', startDate: 'नौकरी शुरू होने की तारीख (वैकल्पिक)', contactInfo: 'संपर्क जानकारी (वैकल्पिक)', generateLetter: 'पत्र का मसौदा बनाएं', generateEnglish: 'अंग्रेज़ी प्रति बनाएं', downloadPdf: 'PDF के रूप में डाउनलोड करें', printLetter: 'पत्र प्रिंट करें', close: 'बंद करें', draftReady: 'पत्र का मसौदा', noCase: 'कोई सेव किया हुआ केस नहीं चुना गया।'
    },
    ta: { chooseLanguage: 'உங்கள் விருப்ப மொழியைத் தேர்ந்தெடுக்கவும்', continue: 'தொடரவும்', changeLanguage: 'மொழியை மாற்றவும்', home: 'முகப்பு', about: 'எங்களைப் பற்றி', resources: 'வளங்கள்', contact: 'தொடர்பு', cases: 'என் வழக்குகள்', login: 'உள்நுழைவு', language: 'மொழி', autoDetect: 'தானாக கண்டறி', tellUs: 'வேலையில் என்ன நடந்தது என்று சொல்லுங்கள்', situation: 'உங்கள் நிலைமை', workerType: 'வேலை வகை', state: 'மாநிலம் அல்லது பகுதி', optional: 'விருப்பம்', understand: 'உங்கள் நிலைமையைப் புரிந்துகொள்ளுங்கள்', clear: 'அழிக்கவும்', summary: 'நிலைமையின் சுருக்கம்', draftLetter: 'உங்கள் முதலாளிக்கு கடித வரைவை உருவாக்கவும்', viewLetter: 'கடிதத்தைப் பார்க்கவும்', editDraft: 'பயன்படுத்துவதற்கு முன் வரைவைப் பார்த்து திருத்தவும்.', letterDisclaimer: 'இது நீங்கள் வழங்கிய தகவலின் அடிப்படையிலான பொதுவான வரைவு. அனுப்புவதற்கு முன் கவனமாகச் சரிபார்க்கவும்.', workerName: 'தொழிலாளரின் பெயர்', employerName: 'முதலாளி / நிறுவனத்தின் பெயர்', jobRole: 'வேலை வகை (விருப்பம்)', workplace: 'பணியிடம் (விருப்பம்)', date: 'தேதி', employeeId: 'பணியாளர் அடையாள எண் (விருப்பம்)', department: 'துறை / மேலாளர் (விருப்பம்)', startDate: 'வேலை தொடங்கிய தேதி (விருப்பம்)', contactInfo: 'தொடர்பு தகவல் (விருப்பம்)', generateLetter: 'கடித வரைவை உருவாக்கவும்', generateEnglish: 'ஆங்கில நகலை உருவாக்கவும்', downloadPdf: 'PDF ஆக பதிவிறக்கவும்', printLetter: 'கடிதத்தை அச்சிடவும்', close: 'மூடவும்', draftReady: 'கடித வரைவு', noCase: 'சேமிக்கப்பட்ட வழக்கு தேர்ந்தெடுக்கப்படவில்லை.' },
    te: { chooseLanguage: 'మీకు ఇష్టమైన భాషను ఎంచుకోండి', continue: 'కొనసాగించండి', changeLanguage: 'భాష మార్చండి', home: 'హోమ్', about: 'మా గురించి', resources: 'వనరులు', contact: 'సంప్రదించండి', cases: 'నా కేసులు', login: 'లాగిన్', language: 'భాష', autoDetect: 'ఆటో డిటెక్ట్', tellUs: 'పనిలో ఏమి జరిగిందో చెప్పండి', situation: 'మీ పరిస్థితి', workerType: 'పని రకం', state: 'రాష్ట్రం లేదా ప్రాంతం', optional: 'ఐచ్ఛికం', understand: 'మీ పరిస్థితిని అర్థం చేసుకోండి', clear: 'తొలగించండి', summary: 'పరిస్థితి సారాంశం', draftLetter: 'మీ యజమానికి లేఖ ముసాయిదా చేయండి', viewLetter: 'లేఖను చూడండి', editDraft: 'ఉపయోగించే ముందు ముసాయిదాను పరిశీలించి సవరించండి.', letterDisclaimer: 'ఇది మీరు అందించిన సమాచారంపై ఆధారపడిన సాధారణ ముసాయిదా. పంపే ముందు జాగ్రత్తగా పరిశీలించండి.', workerName: 'కార్మికుడి పేరు', employerName: 'యజమాని / కంపెనీ పేరు', jobRole: 'పని రకం (ఐచ్ఛికం)', workplace: 'పని ప్రదేశం (ఐచ్ఛికం)', date: 'తేదీ', employeeId: 'ఉద్యోగి ఐడీ (ఐచ్ఛికం)', department: 'విభాగం / మేనేజర్ (ఐచ్ఛికం)', startDate: 'ఉద్యోగం ప్రారంభమైన తేదీ (ఐచ్ఛికం)', contactInfo: 'సంప్రదింపు సమాచారం (ఐచ్ఛికం)', generateLetter: 'లేఖ ముసాయిదా రూపొందించండి', generateEnglish: 'ఇంగ్లీష్ కాపీ రూపొందించండి', downloadPdf: 'PDFగా డౌన్‌లోడ్ చేయండి', printLetter: 'లేఖను ప్రింట్ చేయండి', close: 'మూసివేయండి', draftReady: 'లేఖ ముసాయిదా', noCase: 'సేవ్ చేసిన కేసు ఎంచుకోలేదు.' },
    bn: { chooseLanguage: 'আপনার পছন্দের ভাষা বেছে নিন', continue: 'চালিয়ে যান', changeLanguage: 'ভাষা বদলান', home: 'হোম', about: 'আমাদের সম্পর্কে', resources: 'রিসোর্স', contact: 'যোগাযোগ', cases: 'আমার কেস', login: 'লগ ইন', language: 'ভাষা', autoDetect: 'অটো ডিটেক্ট', tellUs: 'কাজে কী ঘটেছে তা বলুন', situation: 'আপনার পরিস্থিতি', workerType: 'কাজের ধরন', state: 'রাজ্য বা অঞ্চল', optional: 'ঐচ্ছিক', understand: 'আপনার পরিস্থিতি বুঝুন', clear: 'মুছে ফেলুন', summary: 'পরিস্থিতির সারাংশ', draftLetter: 'নিয়োগকর্তার কাছে চিঠির খসড়া তৈরি করুন', viewLetter: 'চিঠি দেখুন', editDraft: 'ব্যবহারের আগে খসড়াটি দেখে সম্পাদনা করুন।', letterDisclaimer: 'এটি আপনার দেওয়া তথ্যের ভিত্তিতে তৈরি সাধারণ খসড়া। পাঠানোর আগে ভালোভাবে যাচাই করুন।', workerName: 'শ্রমিকের নাম', employerName: 'নিয়োগকর্তা / কোম্পানির নাম', jobRole: 'কাজের ধরন (ঐচ্ছিক)', workplace: 'কর্মস্থল (ঐচ্ছিক)', date: 'তারিখ', employeeId: 'কর্মী আইডি (ঐচ্ছিক)', department: 'বিভাগ / ম্যানেজার (ঐচ্ছিক)', startDate: 'চাকরি শুরুর তারিখ (ঐচ্ছিক)', contactInfo: 'যোগাযোগের তথ্য (ঐচ্ছিক)', generateLetter: 'চিঠির খসড়া তৈরি করুন', generateEnglish: 'ইংরেজি কপি তৈরি করুন', downloadPdf: 'PDF হিসেবে ডাউনলোড করুন', printLetter: 'চিঠি প্রিন্ট করুন', close: 'বন্ধ করুন', draftReady: 'চিঠির খসড়া', noCase: 'কোনও সংরক্ষিত কেস বেছে নেওয়া হয়নি।' },
    mr: { chooseLanguage: 'तुमची पसंतीची भाषा निवडा', continue: 'पुढे चला', changeLanguage: 'भाषा बदला', home: 'मुख्यपृष्ठ', about: 'आमच्याबद्दल', resources: 'संसाधने', contact: 'संपर्क', cases: 'माझे केस', login: 'लॉग इन', language: 'भाषा', autoDetect: 'आपोआप ओळखा', tellUs: 'कामावर काय झाले ते सांगा', situation: 'तुमची परिस्थिती', workerType: 'कामाचा प्रकार', state: 'राज्य किंवा प्रदेश', optional: 'ऐच्छिक', understand: 'तुमची परिस्थिती समजून घ्या', clear: 'पुसा', summary: 'परिस्थितीचा सारांश', draftLetter: 'नियोक्त्यासाठी पत्राचा मसुदा तयार करा', viewLetter: 'पत्र पहा', editDraft: 'वापरण्यापूर्वी मसुदा तपासा आणि संपादित करा.', letterDisclaimer: 'तुम्ही दिलेल्या माहितीवर आधारित हा सामान्य मसुदा आहे. पाठवण्यापूर्वी काळजीपूर्वक तपासा.', workerName: 'कामगाराचे नाव', employerName: 'नियोक्ता / कंपनीचे नाव', jobRole: 'कामाचा प्रकार (ऐच्छिक)', workplace: 'कामाचे ठिकाण (ऐच्छिक)', date: 'तारीख', employeeId: 'कर्मचारी आयडी (ऐच्छिक)', department: 'विभाग / व्यवस्थापक (ऐच्छिक)', startDate: 'नोकरी सुरू झाल्याची तारीख (ऐच्छिक)', contactInfo: 'संपर्क माहिती (ऐच्छिक)', generateLetter: 'पत्राचा मसुदा तयार करा', generateEnglish: 'इंग्रजी प्रत तयार करा', downloadPdf: 'PDF म्हणून डाउनलोड करा', printLetter: 'पत्र प्रिंट करा', close: 'बंद करा', draftReady: 'पत्राचा मसुदा', noCase: 'सेव्ह केलेला केस निवडलेला नाही.' }
};

function getInterfaceLanguage() { return localStorage.getItem('rightsMitraLanguage') || ''; }
function getUiText(key, language = getInterfaceLanguage() || 'en') { return interfaceTranslations[language]?.[key] || interfaceTranslations.en[key] || key; }

const staticPageTranslations = {
    en: { aboutTitle: 'About RightsMitra', aboutDesc: 'Free informational guidance and rights awareness for workers across India.', resourcesTitle: 'Worker resources and guides', resourcesDesc: 'Practical information to help you understand your workplace situation and prepare your next step.', contactTitle: 'Contact RightsMitra', contactDesc: 'Share feedback about this hackathon MVP and its informational guidance experience.', casesTitle: 'My previous cases', casesDesc: 'Your saved cases stay in this browser for the demo.', faq: 'Frequently asked questions', getInTouch: 'Get in touch', sendMessage: 'Send us a message', aboutUs: 'About us', quickLinks: 'Quick links', contactUs: 'Contact us', languages: 'Languages', signIn: 'Sign in to RightsMitra', continueGuest: 'Continue as guest', sendOtp: 'Send OTP', verifySignIn: 'Verify and sign in' },
    hi: { aboutTitle: 'RightsMitra के बारे में', aboutDesc: 'भारत भर के कामगारों के लिए मुफ्त सामान्य जानकारी और अधिकार जागरूकता।', resourcesTitle: 'कामगार संसाधन और मार्गदर्शिकाएं', resourcesDesc: 'अपनी कार्यस्थल स्थिति समझने और अगले कदम की तैयारी में मदद करने वाली जानकारी।', contactTitle: 'RightsMitra से संपर्क करें', contactDesc: 'इस हैकाथॉन MVP और इसकी सामान्य जानकारी के अनुभव पर प्रतिक्रिया दें।', casesTitle: 'मेरे पिछले केस', casesDesc: 'डेमो के लिए आपके सेव किए गए केस इसी ब्राउज़र में रहते हैं।', faq: 'अक्सर पूछे जाने वाले सवाल', getInTouch: 'संपर्क करें', sendMessage: 'हमें संदेश भेजें', aboutUs: 'हमारे बारे में', quickLinks: 'त्वरित लिंक', contactUs: 'संपर्क', languages: 'भाषाएं', signIn: 'RightsMitra में लॉग इन करें', continueGuest: 'अतिथि के रूप में जारी रखें', sendOtp: 'OTP भेजें', verifySignIn: 'सत्यापित करके लॉग इन करें' },
    ta: { aboutTitle: 'RightsMitra பற்றி', aboutDesc: 'இந்தியா முழுவதும் உள்ள தொழிலாளர்களுக்கான இலவச பொதுத் தகவல் மற்றும் உரிமை விழிப்புணர்வு.', resourcesTitle: 'தொழிலாளர் வளங்கள் மற்றும் வழிகாட்டிகள்', resourcesDesc: 'உங்கள் வேலை நிலையைப் புரிந்து கொண்டு அடுத்த படிக்கு தயாராக உதவும் நடைமுறைத் தகவல்.', contactTitle: 'RightsMitra-ஐ தொடர்புகொள்ளுங்கள்', contactDesc: 'இந்த ஹேக்கத்தான் MVP பற்றிய கருத்துகளைப் பகிருங்கள்.', casesTitle: 'என் முந்தைய வழக்குகள்', casesDesc: 'டெமோவுக்காக சேமிக்கப்பட்ட வழக்குகள் இந்த உலாவியில் இருக்கும்.', faq: 'அடிக்கடி கேட்கப்படும் கேள்விகள்', getInTouch: 'தொடர்பு கொள்ளுங்கள்', sendMessage: 'எங்களுக்கு செய்தி அனுப்புங்கள்', aboutUs: 'எங்களைப் பற்றி', quickLinks: 'விரைவு இணைப்புகள்', contactUs: 'தொடர்பு', languages: 'மொழிகள்', signIn: 'RightsMitra-வில் உள்நுழைக', continueGuest: 'விருந்தினராக தொடரவும்', sendOtp: 'OTP அனுப்பவும்', verifySignIn: 'சரிபார்த்து உள்நுழைக' },
    te: { aboutTitle: 'RightsMitra గురించి', aboutDesc: 'భారతదేశంలోని కార్మికుల కోసం ఉచిత సాధారణ సమాచారం మరియు హక్కుల అవగాహన.', resourcesTitle: 'కార్మిక వనరులు మరియు మార్గదర్శకాలు', resourcesDesc: 'మీ పని పరిస్థితిని అర్థం చేసుకుని తదుపరి చర్యకు సిద్ధం కావడానికి ఉపయోగకరమైన సమాచారం.', contactTitle: 'RightsMitraను సంప్రదించండి', contactDesc: 'ఈ హ్యాకథాన్ MVP గురించి మీ అభిప్రాయాన్ని పంచుకోండి.', casesTitle: 'నా మునుపటి కేసులు', casesDesc: 'డెమో కోసం సేవ్ చేసిన కేసులు ఈ బ్రౌజర్‌లో ఉంటాయి.', faq: 'తరచుగా అడిగే ప్రశ్నలు', getInTouch: 'సంప్రదించండి', sendMessage: 'మాకు సందేశం పంపండి', aboutUs: 'మా గురించి', quickLinks: 'త్వరిత లింకులు', contactUs: 'సంప్రదించండి', languages: 'భాషలు', signIn: 'RightsMitraలో లాగిన్ చేయండి', continueGuest: 'అతిథిగా కొనసాగండి', sendOtp: 'OTP పంపండి', verifySignIn: 'ధృవీకరించి లాగిన్ చేయండి' },
    bn: { aboutTitle: 'RightsMitra সম্পর্কে', aboutDesc: 'ভারতের শ্রমিকদের জন্য বিনামূল্যে সাধারণ তথ্য ও অধিকার সচেতনতা।', resourcesTitle: 'শ্রমিকদের রিসোর্স ও গাইড', resourcesDesc: 'কর্মস্থলের পরিস্থিতি বুঝে পরবর্তী পদক্ষেপের জন্য প্রস্তুত হতে ব্যবহারিক তথ্য।', contactTitle: 'RightsMitra-র সঙ্গে যোগাযোগ করুন', contactDesc: 'এই হ্যাকাথন MVP সম্পর্কে আপনার মতামত জানান।', casesTitle: 'আমার আগের কেস', casesDesc: 'ডেমোর জন্য সংরক্ষিত কেস এই ব্রাউজারে থাকে।', faq: 'প্রায়শই জিজ্ঞাসিত প্রশ্ন', getInTouch: 'যোগাযোগ করুন', sendMessage: 'আমাদের বার্তা পাঠান', aboutUs: 'আমাদের সম্পর্কে', quickLinks: 'দ্রুত লিঙ্ক', contactUs: 'যোগাযোগ', languages: 'ভাষা', signIn: 'RightsMitra-তে লগ ইন করুন', continueGuest: 'অতিথি হিসেবে চালিয়ে যান', sendOtp: 'OTP পাঠান', verifySignIn: 'যাচাই করে লগ ইন করুন' },
    mr: { aboutTitle: 'RightsMitra विषयी', aboutDesc: 'भारतातील कामगारांसाठी मोफत सामान्य माहिती आणि हक्कांविषयी जागरूकता.', resourcesTitle: 'कामगार संसाधने आणि मार्गदर्शिका', resourcesDesc: 'तुमची कामाची परिस्थिती समजून पुढील पावलासाठी तयार होण्यास मदत करणारी माहिती.', contactTitle: 'RightsMitra शी संपर्क करा', contactDesc: 'या हॅकाथॉन MVP बद्दल तुमचा अभिप्राय द्या.', casesTitle: 'माझे मागील केस', casesDesc: 'डेमोसाठी सेव्ह केलेले केस या ब्राउझरमध्ये राहतात.', faq: 'वारंवार विचारले जाणारे प्रश्न', getInTouch: 'संपर्क साधा', sendMessage: 'आम्हाला संदेश पाठवा', aboutUs: 'आमच्याबद्दल', quickLinks: 'जलद दुवे', contactUs: 'संपर्क', languages: 'भाषा', signIn: 'RightsMitra मध्ये लॉग इन करा', continueGuest: 'अतिथी म्हणून पुढे जा', sendOtp: 'OTP पाठवा', verifySignIn: 'पडताळून लॉग इन करा' }
};

function getStaticText(key, language) { return staticPageTranslations[language]?.[key] || staticPageTranslations.en[key] || key; }

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

function getCaseLanguageStatusText(language, detected = false) {
    const label = supportedLanguages[language]?.name || language;
    return detected ? `Detected case language: ${label}` : `Case language: ${label}`;
}

function getCaseLanguagePreference() {
    const saved = localStorage.getItem('rightsMitraCaseLanguage');
    return saved && supportedLanguages[saved] ? saved : 'auto';
}

function setCaseLanguagePreference(language) {
    if (!language || language === 'auto') {
        localStorage.removeItem('rightsMitraCaseLanguage');
        return;
    }
    if (supportedLanguages[language]) {
        localStorage.setItem('rightsMitraCaseLanguage', language);
    }
}

function getSelectedLanguage(text) {
    const selected = document.getElementById('languageSelector')?.value || getCaseLanguagePreference();
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
const themeSelector = document.getElementById('themeSelector');

// Keep the user's theme choice between visits; "system" follows the device setting.
function applyTheme(theme) {
    if (theme === 'system') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', theme);
    if (themeSelector) themeSelector.value = theme;
}

if (themeSelector) {
    const savedTheme = localStorage.getItem('rightsMitraTheme') || 'system';
    applyTheme(savedTheme);
    themeSelector.addEventListener('change', () => {
        localStorage.setItem('rightsMitraTheme', themeSelector.value);
        applyTheme(themeSelector.value);
    });
}

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
        setCaseLanguagePreference(language);

        if (language === 'auto') {
            if (userQuestionInput?.value.trim()) {
                const detected = detectLanguage(userQuestionInput.value.trim());
                if (languageStatus) languageStatus.textContent = getCaseLanguageStatusText(detected.language, true);
                languageSelector.value = detected.language;
                setCaseLanguagePreference(detected.language);
            } else if (languageStatus) {
                languageStatus.textContent = 'Detected case language: Auto';
            }
            return;
        }

        if (languageStatus) languageStatus.textContent = getCaseLanguageStatusText(language, false);
        if (submitBtn) submitBtn.textContent = getUiText('understand', getInterfaceLanguage() || 'en');
        if (clearBtn) clearBtn.textContent = getUiText('clear', getInterfaceLanguage() || 'en');
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

// Handle form submission
function handleSubmit() {
    const userInput = userQuestionInput.value.trim();

    if (!userInput) {
        userQuestionInput.classList.remove('validation-shake');
        void userQuestionInput.offsetWidth;
        userQuestionInput.classList.add('validation-shake');
        userQuestionInput.focus();
        setTimeout(() => userQuestionInput.classList.remove('validation-shake'), 400);
        alert('Please describe your issue or ask a question.');
        return;
    }

    submitBtn.classList.add('is-loading');
    submitBtn.disabled = true;
    setTimeout(() => {
        const languageResult = getSelectedLanguage(userInput);
        const language = languageResult.language;
        const languageStatus = document.getElementById('languageStatus');
        const selectedCaseLanguage = languageSelector?.value || 'auto';
        if (languageStatus) {
            languageStatus.textContent = selectedCaseLanguage === 'auto'
                ? getCaseLanguageStatusText(language, true)
                : getCaseLanguageStatusText(language, false);
        }
        const matchingCategory = detectIssue(userInput, language);

        // Generate response
        const response = generateLegalGuidance(userInput, matchingCategory, language);
        displayResponse(response);
        const caseId = saveAnalysisCase(userInput, matchingCategory, language, languageResult);
        if (window.latestCaseSummary) window.latestCaseSummary.caseId = caseId;
        submitBtn.classList.remove('is-loading');
        submitBtn.disabled = false;
    }, 140);
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
    return saveCase({
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
    const existingCaseId = window.latestCaseSummary?.caseId;
    let response = '<div class="guidance-response">';
    response += `<div class="speech-controls" aria-label="Voice guidance controls"><button id="listenGuidanceBtn" type="button" aria-label="${speechLabels.listen}">${speechLabels.listen}</button><button id="pauseSpeechBtn" type="button" aria-label="${speechLabels.pause}" hidden>${speechLabels.pause}</button><button id="stopSpeechBtn" type="button" aria-label="${speechLabels.stop}" hidden>${speechLabels.stop}</button><span id="speechStatus" class="speech-status" aria-live="polite">${speechLabels.ready}</span></div>`;
    response += `<div class="guidance-section" data-speech-content="understanding"><div class="guidance-section-heading"><h4>${t.summary}</h4><button class="section-speech-button" type="button" data-speech-section="understanding" aria-label="Listen to case summary">🔊</button></div>`;
    
    if (category && legalGuidanceDatabase[category]) {
        response += `<p><strong>${t.issue}: ${getLocalizedIssueName(category, language)}</strong></p>`;
        response += `<p><strong>${t.summary}:</strong> ${escapeHtml(userInput)}</p>`;
    } else {
        response += `<p>${t.noIssue}</p>`;
    }
    response += '</div>';

    response += `<div class="guidance-section" data-speech-content="rights"><div class="guidance-section-heading"><h4>${t.rights}</h4><button class="section-speech-button" type="button" data-speech-section="rights" aria-label="Listen to what this may involve">🔊</button></div><ul style="margin-left: 20px;">`;
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
    response += `<div class="guidance-actions"><button class="btn btn-secondary" type="button" onclick="downloadCaseSummary()">${language === 'en' ? 'Download Case Summary' : language === 'hi' ? 'केस सारांश डाउनलोड करें' : language === 'ta' ? 'வழக்கு சுருக்கத்தைப் பதிவிறக்கவும்' : language === 'te' ? 'కేసు సారాంశాన్ని డౌన్‌లోడ్ చేయండి' : language === 'bn' ? 'কেসের সারাংশ ডাউনলোড করুন' : 'केस सारांश डाउनलोड करा'}</button><button class="btn btn-primary" type="button" onclick="openLetterForm()">${getUiText('draftLetter', language)}</button></div><div id="letterWorkspace" class="letter-workspace" hidden></div>`;
    response += '</div>';

    window.latestCaseSummary = {
        userInput,
        category,
        language,
        content,
        caseId: existingCaseId,
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

const letterCopy = {
    en: { to: 'To,', dear: 'Dear Sir/Madam,', intro: 'I am writing regarding', facts: 'According to my understanding of the situation:', request: 'I respectfully request that this matter be reviewed and that appropriate clarification or action be provided.', response: 'I would appreciate a written response regarding this matter.', thanks: 'Thank you for your attention.', sincerely: 'Sincerely,', subjects: { 'Salary Withheld': 'Request to review unpaid or delayed wages', 'Fired Without Notice': 'Request for clarification regarding employment decision', 'Excessive Hours': 'Request to review working hours', 'No Contract': 'Request to clarify employment terms', 'Workplace Injury': 'Request to review a workplace safety or injury concern', 'Sexual Harassment': 'Request to review a workplace conduct concern' }, requests: { 'Salary Withheld': 'I respectfully request clarification and review of the outstanding wages.', 'Fired Without Notice': 'I respectfully request written clarification regarding the employment decision.', 'Excessive Hours': 'I respectfully request a review of the reported working hours and rest arrangements.', 'No Contract': 'I respectfully request written clarification of the agreed employment terms.', 'Workplace Injury': 'I respectfully request a review of the reported safety or injury concern.', 'Sexual Harassment': 'I respectfully request that this concern be acknowledged and appropriately reviewed.' } },
    hi: { to: 'सेवा में,', dear: 'आदरणीय महोदय/महोदया,', intro: 'मैं इस विषय में लिख रहा/रही हूं:', facts: 'मेरी समझ के अनुसार स्थिति यह है:', request: 'मैं विनम्रतापूर्वक अनुरोध करता/करती हूं कि इस मामले की समीक्षा की जाए और उचित स्पष्टीकरण या कार्रवाई दी जाए।', response: 'कृपया इस विषय में लिखित उत्तर देने का कष्ट करें।', thanks: 'आपके ध्यान के लिए धन्यवाद।', sincerely: 'सादर,', subjects: { 'Salary Withheld': 'बकाया या विलंबित वेतन की समीक्षा का अनुरोध', 'Fired Without Notice': 'नौकरी संबंधी निर्णय पर स्पष्टीकरण का अनुरोध', 'Excessive Hours': 'काम के घंटों की समीक्षा का अनुरोध', 'No Contract': 'नौकरी की शर्तों को स्पष्ट करने का अनुरोध', 'Workplace Injury': 'कार्यस्थल की सुरक्षा या चोट संबंधी चिंता की समीक्षा का अनुरोध', 'Sexual Harassment': 'कार्यस्थल व्यवहार संबंधी चिंता की समीक्षा का अनुरोध' }, requests: { 'Salary Withheld': 'मैं बकाया वेतन के संबंध में स्पष्टीकरण और समीक्षा का विनम्र अनुरोध करता/करती हूं।', 'Fired Without Notice': 'मैं नौकरी संबंधी निर्णय पर लिखित स्पष्टीकरण का विनम्र अनुरोध करता/करती हूं।', 'Excessive Hours': 'मैं बताए गए काम के घंटों और आराम की व्यवस्था की समीक्षा का विनम्र अनुरोध करता/करती हूं।', 'No Contract': 'मैं तय की गई नौकरी की शर्तों का लिखित स्पष्टीकरण चाहता/चाहती हूं।', 'Workplace Injury': 'मैं बताई गई सुरक्षा या चोट संबंधी चिंता की समीक्षा का अनुरोध करता/करती हूं।', 'Sexual Harassment': 'मैं अनुरोध करता/करती हूं कि इस चिंता को स्वीकार कर उचित रूप से इसकी समीक्षा की जाए।' } },
    ta: { to: 'பெறுநர்,', dear: 'மதிப்பிற்குரிய ஐயா/அம்மா,', intro: 'பின்வரும் விஷயம் குறித்து எழுதுகிறேன்:', facts: 'என் புரிதலின்படி நிலைமை:', request: 'இந்த விஷயத்தை மதிப்பாய்வு செய்து உரிய விளக்கம் அல்லது நடவடிக்கை வழங்குமாறு பணிவுடன் கேட்டுக்கொள்கிறேன்.', response: 'இது குறித்து எழுத்துப்பூர்வமான பதிலை வழங்குமாறு கேட்டுக்கொள்கிறேன்.', thanks: 'உங்கள் கவனத்திற்கு நன்றி.', sincerely: 'மரியாதையுடன்,', subjects: { 'Salary Withheld': 'வழங்கப்படாத அல்லது தாமதமான சம்பளத்தை மதிப்பாய்வு செய்ய கோரிக்கை', 'Fired Without Notice': 'வேலை தொடர்பான முடிவுக்கு விளக்கம் கோரிக்கை', 'Excessive Hours': 'வேலை நேரத்தை மதிப்பாய்வு செய்ய கோரிக்கை', 'No Contract': 'வேலை விதிமுறைகளை தெளிவுபடுத்த கோரிக்கை', 'Workplace Injury': 'வேலை இட பாதுகாப்பு அல்லது காயம் தொடர்பான கவலை மதிப்பாய்வு கோரிக்கை', 'Sexual Harassment': 'வேலை இட நடத்தை தொடர்பான கவலை மதிப்பாய்வு கோரிக்கை' }, requests: { 'Salary Withheld': 'நிலுவை சம்பளம் குறித்து விளக்கமும் மதிப்பாய்வும் வழங்குமாறு கேட்டுக்கொள்கிறேன்.', 'Fired Without Notice': 'வேலை முடிவு குறித்து எழுத்துப்பூர்வ விளக்கம் வழங்குமாறு கேட்டுக்கொள்கிறேன்.', 'Excessive Hours': 'தெரிவிக்கப்பட்ட வேலை நேரம் மற்றும் ஓய்வு ஏற்பாடுகளை மதிப்பாய்வு செய்யுமாறு கேட்டுக்கொள்கிறேன்.', 'No Contract': 'ஒப்புக்கொண்ட வேலை விதிமுறைகளை எழுத்துப்பூர்வமாக விளக்குமாறு கேட்டுக்கொள்கிறேன்.', 'Workplace Injury': 'தெரிவிக்கப்பட்ட பாதுகாப்பு அல்லது காயம் தொடர்பான கவலையை மதிப்பாய்வு செய்யுமாறு கேட்டுக்கொள்கிறேன்.', 'Sexual Harassment': 'இந்தக் கவலையை ஏற்று உரிய முறையில் மதிப்பாய்வு செய்யுமாறு கேட்டுக்கொள்கிறேன்.' } },
    te: { to: 'కు,', dear: 'గౌరవనీయులైన సర్/మేడమ్,', intro: 'ఈ విషయానికి సంబంధించి నేను రాస్తున్నాను:', facts: 'నా అవగాహన ప్రకారం పరిస్థితి:', request: 'ఈ విషయాన్ని సమీక్షించి తగిన వివరణ లేదా చర్య అందించాలని వినయంగా కోరుతున్నాను.', response: 'ఈ విషయంపై వ్రాతపూర్వక సమాధానం ఇవ్వగలరు.', thanks: 'మీ శ్రద్ధకు ధన్యవాదాలు.', sincerely: 'వినయపూర్వకంగా,', subjects: { 'Salary Withheld': 'చెల్లించని లేదా ఆలస్యమైన జీతం సమీక్షకు అభ్యర్థన', 'Fired Without Notice': 'ఉద్యోగ నిర్ణయంపై వివరణకు అభ్యర్థన', 'Excessive Hours': 'పని గంటల సమీక్షకు అభ్యర్థన', 'No Contract': 'ఉద్యోగ నిబంధనల స్పష్టీకరణకు అభ్యర్థన', 'Workplace Injury': 'పని ప్రదేశ భద్రత లేదా గాయం సమస్య సమీక్షకు అభ్యర్థన', 'Sexual Harassment': 'పని ప్రదేశ ప్రవర్తన సమస్య సమీక్షకు అభ్యర్థన' }, requests: { 'Salary Withheld': 'బకాయి జీతంపై వివరణ మరియు సమీక్ష ఇవ్వాలని కోరుతున్నాను.', 'Fired Without Notice': 'ఉద్యోగ నిర్ణయంపై వ్రాతపూర్వక వివరణ ఇవ్వాలని కోరుతున్నాను.', 'Excessive Hours': 'తెలిపిన పని గంటలు మరియు విశ్రాంతి ఏర్పాట్లను సమీక్షించాలని కోరుతున్నాను.', 'No Contract': 'అంగీకరించిన ఉద్యోగ నిబంధనలను వ్రాతపూర్వకంగా వివరించాలని కోరుతున్నాను.', 'Workplace Injury': 'తెలిపిన భద్రత లేదా గాయం సమస్యను సమీక్షించాలని కోరుతున్నాను.', 'Sexual Harassment': 'ఈ సమస్యను స్వీకరించి తగిన విధంగా సమీక్షించాలని కోరుతున్నాను.' } },
    bn: { to: 'প্রাপক,', dear: 'মাননীয় মহাশয়/মহাশয়া,', intro: 'আমি নিম্নলিখিত বিষয়ে লিখছি:', facts: 'আমার বোঝাপড়া অনুযায়ী পরিস্থিতি:', request: 'এই বিষয়টি পর্যালোচনা করে উপযুক্ত ব্যাখ্যা বা ব্যবস্থা দেওয়ার জন্য বিনীত অনুরোধ করছি।', response: 'এই বিষয়ে লিখিত উত্তর দেওয়ার অনুরোধ করছি।', thanks: 'আপনার মনোযোগের জন্য ধন্যবাদ।', sincerely: 'বিনীত,', subjects: { 'Salary Withheld': 'বকেয়া বা দেরি হওয়া মজুরি পর্যালোচনার অনুরোধ', 'Fired Without Notice': 'চাকরির সিদ্ধান্ত সম্পর্কে ব্যাখ্যার অনুরোধ', 'Excessive Hours': 'কাজের সময় পর্যালোচনার অনুরোধ', 'No Contract': 'চাকরির শর্ত স্পষ্ট করার অনুরোধ', 'Workplace Injury': 'কর্মস্থলের নিরাপত্তা বা আঘাতের বিষয় পর্যালোচনার অনুরোধ', 'Sexual Harassment': 'কর্মস্থলের আচরণ সংক্রান্ত উদ্বেগ পর্যালোচনার অনুরোধ' }, requests: { 'Salary Withheld': 'বকেয়া মজুরি সম্পর্কে ব্যাখ্যা ও পর্যালোচনার অনুরোধ করছি।', 'Fired Without Notice': 'চাকরির সিদ্ধান্ত সম্পর্কে লিখিত ব্যাখ্যার অনুরোধ করছি।', 'Excessive Hours': 'জানানো কাজের সময় ও বিশ্রামের ব্যবস্থা পর্যালোচনার অনুরোধ করছি।', 'No Contract': 'সম্মত চাকরির শর্তগুলি লিখিতভাবে ব্যাখ্যা করার অনুরোধ করছি।', 'Workplace Injury': 'জানানো নিরাপত্তা বা আঘাতের বিষয়টি পর্যালোচনার অনুরোধ করছি।', 'Sexual Harassment': 'এই উদ্বেগটি গ্রহণ করে যথাযথভাবে পর্যালোচনা করার অনুরোধ করছি।' } },
    mr: { to: 'प्रति,', dear: 'आदरणीय महोदय/महोदया,', intro: 'मी खालील विषयाबाबत लिहित आहे:', facts: 'माझ्या माहितीनुसार परिस्थिती:', request: 'या प्रकरणाची समीक्षा करून योग्य स्पष्टीकरण किंवा कारवाई द्यावी, अशी नम्र विनंती आहे.', response: 'या विषयावर लेखी उत्तर द्यावे, अशी विनंती आहे.', thanks: 'आपल्या लक्षाबद्दल धन्यवाद.', sincerely: 'आपला/आपली विश्वासू,', subjects: { 'Salary Withheld': 'थकीत किंवा विलंबित पगाराच्या समीक्षेची विनंती', 'Fired Without Notice': 'नोकरीच्या निर्णयाबाबत स्पष्टीकरणाची विनंती', 'Excessive Hours': 'कामाच्या तासांच्या समीक्षेची विनंती', 'No Contract': 'नोकरीच्या अटी स्पष्ट करण्याची विनंती', 'Workplace Injury': 'कामाच्या ठिकाणी सुरक्षा किंवा दुखापतीच्या चिंतेच्या समीक्षेची विनंती', 'Sexual Harassment': 'कामाच्या ठिकाणी वर्तनासंबंधी चिंतेच्या समीक्षेची विनंती' }, requests: { 'Salary Withheld': 'थकीत पगाराबाबत स्पष्टीकरण आणि समीक्षा द्यावी, अशी विनंती आहे.', 'Fired Without Notice': 'नोकरीच्या निर्णयाबाबत लेखी स्पष्टीकरण द्यावे, अशी विनंती आहे.', 'Excessive Hours': 'सांगितलेल्या कामाच्या तासांची आणि विश्रांतीच्या व्यवस्थेची समीक्षा करावी, अशी विनंती आहे.', 'No Contract': 'ठरलेल्या नोकरीच्या अटी लेखी स्पष्ट कराव्यात, अशी विनंती आहे.', 'Workplace Injury': 'सांगितलेल्या सुरक्षा किंवा दुखापतीच्या चिंतेची समीक्षा करावी, अशी विनंती आहे.', 'Sexual Harassment': 'ही चिंता नोंदवून योग्य प्रकारे तिची समीक्षा करावी, अशी विनंती आहे.' } }
};

function getLetterCopy(language) { return letterCopy[language] || letterCopy.en; }
function getToday() { return new Date().toISOString().slice(0, 10); }
function getCaseById(caseId) {
    const user = getCurrentUser();
    const owner = (user && user.user_id) || localStorage.getItem('guestSessionId');
    return getCasesForOwner(owner).find(item => item.case_id === caseId) || null;
}
function updateSavedCase(caseId, changes) {
    const user = getCurrentUser();
    const owner = (user && user.user_id) || localStorage.getItem('guestSessionId');
    const cases = getCasesForOwner(owner);
    const index = cases.findIndex(item => item.case_id === caseId);
    if (index < 0) return null;
    cases[index] = { ...cases[index], ...changes };
    localStorage.setItem('cases_' + owner, JSON.stringify(cases));
    return cases[index];
}

function openLetterForm() {
    const workspace = document.getElementById('letterWorkspace');
    if (workspace && window.latestCaseSummary) renderLetterForm(workspace, window.latestCaseSummary);
}

function openLetterFormForCase(caseId, container) {
    const caseData = getCaseById(caseId);
    if (!caseData || !container) return;
    const workspace = document.createElement('div');
    workspace.className = 'letter-workspace';
    container.appendChild(workspace);
    renderLetterForm(workspace, { ...caseData, caseId });
    workspace.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderLetterForm(container, caseData) {
    const language = caseData.language || caseData.responseLanguage || getInterfaceLanguage() || 'en';
    const t = interfaceTranslations[language] || interfaceTranslations.en;
    const saved = caseData.letter?.fields || {};
    container.hidden = false;
    container.innerHTML = `<div class="letter-form-header"><h4>${t.draftLetter}</h4><button type="button" class="close-btn letter-close" aria-label="${t.close}">×</button></div><p class="letter-disclaimer">${t.letterDisclaimer}</p><form class="letter-form"><div class="letter-fields"><label>${t.workerName}<input name="workerName" required value="${escapeHtml(saved.workerName || '')}"></label><label>${t.employerName}<input name="employerName" required value="${escapeHtml(saved.employerName || '')}"></label><label>${t.jobRole}<input name="jobRole" value="${escapeHtml(saved.jobRole || caseData.workerType || '')}"></label><label>${t.workplace}<input name="workplace" value="${escapeHtml(saved.workplace || caseData.state || '')}"></label><label>${t.date}<input name="date" type="date" required value="${escapeHtml(saved.date || getToday())}"></label><label>${t.employeeId}<input name="employeeId" value="${escapeHtml(saved.employeeId || '')}"></label><label>${t.department}<input name="department" value="${escapeHtml(saved.department || '')}"></label><label>${t.startDate}<input name="startDate" type="date" value="${escapeHtml(saved.startDate || '')}"></label><label>${t.contactInfo}<input name="contactInfo" value="${escapeHtml(saved.contactInfo || '')}"></label></div><button class="btn btn-primary" type="submit">${t.generateLetter}</button></form>`;
    container.querySelector('.letter-close').addEventListener('click', () => { container.hidden = true; });
    container.querySelector('.letter-form').addEventListener('submit', event => {
        event.preventDefault();
        const fields = Object.fromEntries(new FormData(event.currentTarget).entries());
        renderLetterPreview(container, caseData, fields, language);
    });
}

function buildLetterText(caseData, fields, language) {
    const copy = getLetterCopy(language);
    const issue = caseData.category || caseData.issue || 'No Contract';
    const facts = caseData.userInput || caseData.userQuestion || '';
    const lines = [fields.workerName, fields.contactInfo, fields.date, '', copy.to, fields.employerName, fields.department, fields.workplace, '', `Subject: ${copy.subjects[issue] || copy.subjects['No Contract']}`, '', copy.dear, '', `${copy.intro} ${copy.subjects[issue] || copy.subjects['No Contract']}.`, '', copy.facts, facts, '', copy.requests[issue] || copy.requests['No Contract'], '', copy.response, '', copy.thanks, '', copy.sincerely, fields.workerName];
    return lines.filter((line, index) => line || (index > 0 && lines[index - 1])).join('\n');
}

function renderLetterPreview(container, caseData, fields, language) {
    const t = interfaceTranslations[language] || interfaceTranslations.en;
    const letterText = buildLetterText(caseData, fields, language);
    const letter = { language, fields, text: letterText, updatedAt: new Date().toISOString() };
    const saved = updateSavedCase(caseData.caseId || caseData.case_id, { letter });
    if (saved && window.latestCaseSummary) window.latestCaseSummary.letter = letter;
    container.innerHTML = `<div class="letter-form-header"><h4>${t.draftReady}</h4><button type="button" class="close-btn letter-close" aria-label="${t.close}">×</button></div><p class="letter-disclaimer">${t.editDraft} ${t.letterDisclaimer}</p><div class="letter-preview-meta"><span>${supportedLanguages[language]?.name || language}</span><span>${escapeHtml(fields.employerName)}</span></div><textarea class="letter-editor" aria-label="${t.draftReady}">${escapeHtml(letterText)}</textarea><div class="letter-actions"><button type="button" class="btn btn-secondary letter-english">${t.generateEnglish}</button><button type="button" class="btn btn-secondary letter-pdf">${t.downloadPdf}</button><button type="button" class="btn btn-primary letter-print">${t.printLetter}</button></div>`;
    container.querySelector('.letter-close').addEventListener('click', () => { container.hidden = true; });
    container.querySelector('.letter-english').addEventListener('click', () => renderLetterPreview(container, caseData, fields, 'en'));
    container.querySelector('.letter-pdf').addEventListener('click', () => printLetter(container, fields, language));
    container.querySelector('.letter-print').addEventListener('click', () => printLetter(container, fields, language));
    container.querySelector('.letter-editor').addEventListener('input', event => {
        const updated = updateSavedCase(caseData.caseId || caseData.case_id, { letter: { ...letter, text: event.target.value } });
        if (updated && window.latestCaseSummary) window.latestCaseSummary.letter = updated.letter;
    });
}

function printLetter(container, fields, language) {
    const editor = container.querySelector('.letter-editor');
    if (!editor) return;
    const printWindow = window.open('', '_blank', 'width=800,height=900');
    if (!printWindow) return;
    const disclaimer = interfaceTranslations[language]?.letterDisclaimer || interfaceTranslations.en.letterDisclaimer;
    printWindow.document.write(`<html lang="${language}"><head><meta charset="utf-8"><title>RightsMitra draft letter</title><style>body{font-family:Arial,sans-serif;max-width:760px;margin:48px auto;line-height:1.65;color:#111}pre{font:inherit;white-space:pre-wrap}footer{margin-top:40px;border-top:1px solid #ccc;padding-top:12px;font-size:11px;color:#555}</style></head><body><pre>${escapeHtml(editor.value)}</pre><footer>Draft generated using RightsMitra based on information provided by the user. ${escapeHtml(disclaimer)}</footer><script>window.onload=function(){window.print();}</script></body></html>`);
    printWindow.document.close();
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

    // Reveal lower sections only as they enter the viewport, avoiding a wall of content.
    const revealTargets = document.querySelectorAll('.features, .faq, .feature-card');
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        revealTargets.forEach((element, index) => {
            element.classList.add('reveal-on-scroll');
            element.style.transitionDelay = `${Math.min(index * 50, 200)}ms`;
            revealObserver.observe(element);
        });
    } else {
        revealTargets.forEach(element => element.classList.add('is-visible'));
    }
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
    const merged = [...guestCases, ...userCases];
    const deduped = merged.filter((caseItem, index, array) => array.findIndex(item => item.case_id === caseItem.case_id) === index);
    localStorage.setItem(userKey, JSON.stringify(deduped));
    localStorage.removeItem(guestKey);
    if (localStorage.getItem('guestSessionId') === guestId) {
        localStorage.removeItem('guestSessionId');
    }
}

// Mic toggle handler
const micToggle = document.getElementById('micToggle');
const micToggleIcon = document.getElementById('micToggleIcon');
if (micToggle) {
    micToggle.addEventListener('click', () => {
        micEnabled = !micEnabled;
        micToggleIcon.textContent = micEnabled ? '🔊' : '🔇';
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
            const voiceLanguage = getSelectedLanguage(transcript);
            if (languageSelector && languageSelector.value === 'auto') {
                languageSelector.value = voiceLanguage.language;
                setCaseLanguagePreference(voiceLanguage.language);
            }
            if (languageStatus) languageStatus.textContent = getCaseLanguageStatusText(voiceLanguage.language, true);
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

// Auth functions wired to backend endpoints (Twilio + Supabase)
// Frontend expects two endpoints:
// POST /api/send-otp  { phone }
// POST /api/verify-otp { phone, otp, preferred_language }
// Both return JSON: { ok: true, ... } or { ok: false, error: '...' }

// sendOTP supports phone or email: pass { phone } or { email }
async function sendOTP({ phone, email }) {
    try {
        if (email && !phone) {
            const res = await fetch(`${API_BASE_URL}/api/send-email-otp`, {
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
        const res = await fetch(`${API_BASE_URL}/api/send-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone })
        });
        const j = await res.json();
        if (j && j.success) return true;
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
        const payload = isEmail ? { email: phoneOrEmail, otp: code, preferred_language, guest_session_id } : { phone: phoneOrEmail, otp: code, preferred_language, guest_session_id };
        const res = await fetch(`${API_BASE_URL}/api/verify-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const j = await res.json();
        if (j && j.success && j.user) {
            const guestId = localStorage.getItem('guestSessionId');
            if (guestId) try { migrateGuestCasesToUser(guestId, j.user.user_id); } catch(e){console.warn(e)}
            setCurrentUser(j.user);
            localStorage.removeItem('guestSessionId');
            return j.user;
        }
        if (j && j.ok && j.user) {
            const guestId = localStorage.getItem('guestSessionId');
            if (guestId) try { migrateGuestCasesToUser(guestId, j.user.user_id); } catch(e){console.warn(e)}
            setCurrentUser(j.user);
            localStorage.removeItem('guestSessionId');
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
            localStorage.removeItem('guestSessionId');
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
            localStorage.removeItem('guestSessionId');
            return user;
        }
        return null;
    }
}

// Cases page rendering helper (if on cases.html)
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

function readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result || ''));
        reader.onerror = () => reject(new Error('Could not read file'));
        reader.readAsDataURL(file);
    });
}

async function loadHelpContactsForState(state) {
    const container = document.getElementById('resourceHelpContacts');
    if (!container) return;
    const selectedState = String(state || '').trim();
    if (!selectedState) {
        container.innerHTML = '<p class="helpline-time">Select a state to see local labour and legal aid contacts.</p>';
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/help-contacts?state=${encodeURIComponent(selectedState)}`);
        const payload = await response.json();
        const contact = payload.contact || {};
        const labourName = contact.district_labor_office_name || 'Labour department contact';
        const labourPhone = contact.district_labor_office_phone || 'Check the local labour department';
        const legalName = contact.legal_aid_authority_name || 'Legal aid authority';
        const legalPhone = contact.legal_aid_authority_phone || '15100';
        const womenLine = contact.women_helpline || '181';
        const notes = contact.notes || '';

        container.innerHTML = `
            <div><strong>${contact.state || selectedState}</strong></div>
            <div><strong>Labour dept:</strong> ${labourName}</div>
            <div><strong>Phone:</strong> ${labourPhone}</div>
            <div><strong>Legal aid:</strong> ${legalName}</div>
            <div><strong>Phone:</strong> ${legalPhone}</div>
            <div><strong>Women workers helpline:</strong> ${womenLine}</div>
            ${notes ? `<div class="helpline-note">${notes}</div>` : ''}
        `;
    } catch (error) {
        console.warn('Could not load help contacts', error);
        container.innerHTML = '<p class="helpline-time">Unable to fetch state helpline details right now. Please try again.</p>';
    }
}

function saveUploadedEvidence(caseId, evidenceItem) {
    const caseObj = getCaseById(caseId);
    if (!caseObj) return;
    const nextEvidence = Array.isArray(caseObj.evidence) ? [...caseObj.evidence, evidenceItem] : [evidenceItem];
    const updated = updateSavedCase(caseId, { evidence: nextEvidence });
    return updated || caseObj;
}

function showCaseDetail(caseData, detailContainer) {
    if (!detailContainer) return;
    const language = caseData.responseLanguage || caseData.originalLanguage || 'en';
    const t = translations[language] || translations.en;
    const guidance = caseData.guidance || [];
    const evidence = caseData.evidenceChecklist || [];
    const uploadedEvidence = Array.isArray(caseData.evidence) ? caseData.evidence : [];
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
    if (uploadedEvidence.length) {
        const uploadedLabels = uploadedEvidence.map((item) => item.filename || item.checklist_item || item.note || 'Uploaded evidence');
        appendCaseList(detailContainer, 'Uploaded evidence', uploadedLabels, 'ul');
    }
    appendCaseList(detailContainer, t.roadmap, roadmap, 'ol', roadmapProgress, (index, checked) => {
        updateCaseProgress(caseData.case_id, 'roadmapProgress', index, checked);
    });

    const uploadBlock = document.createElement('div');
    uploadBlock.className = 'case-upload-block';
    uploadBlock.innerHTML = `
        <h4>Upload supporting evidence</h4>
        <input type="file" accept="image/*,.pdf" aria-label="Upload supporting evidence" />
        <button type="button" class="btn btn-secondary evidence-upload-btn">Add photo or PDF</button>
        <small>Images or PDFs up to 5MB are supported.</small>
    `;
    const uploadInput = uploadBlock.querySelector('input');
    uploadBlock.querySelector('button').addEventListener('click', async () => {
        const file = uploadInput.files && uploadInput.files[0];
        if (!file) {
            alert('Choose a photo or PDF to upload.');
            return;
        }
        try {
            const data = await readFileAsDataUrl(file);
            const caseId = caseData.case_id || caseData.caseId;
            const response = await fetch(`${API_BASE_URL}/api/cases/${encodeURIComponent(caseId)}/evidence`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: file.type.includes('pdf') ? 'pdf' : 'image',
                    filename: file.name,
                    data,
                    checklist_item: file.name,
                    note: `Uploaded from RightsMitra on ${new Date().toISOString()}`
                })
            });
            const payload = await response.json();
            if (!response.ok) {
                throw new Error(payload.error || 'Upload failed');
            }
            saveUploadedEvidence(caseId, payload.evidence || { filename: file.name, uploaded_at: new Date().toISOString() });
            const refreshed = getCaseById(caseId);
            if (refreshed) showCaseDetail(refreshed, detailContainer);
        } catch (error) {
            console.error('Evidence upload failed', error);
            alert(error.message || 'Evidence upload failed.');
        }
    });
    detailContainer.appendChild(uploadBlock);

    const disclaimer = document.createElement('p');
    disclaimer.className = 'case-disclaimer';
    disclaimer.textContent = t.disclaimer;
    detailContainer.appendChild(disclaimer);
    const letterAction = document.createElement('button');
    letterAction.type = 'button';
    letterAction.className = 'btn btn-primary case-letter-action';
    letterAction.textContent = caseData.letter ? getUiText('viewLetter', language) : getUiText('draftLetter', language);
    letterAction.addEventListener('click', () => {
        if (caseData.letter) {
            const workspace = document.createElement('div');
            workspace.className = 'letter-workspace';
            detailContainer.appendChild(workspace);
            renderLetterPreview(workspace, { ...caseData, caseId: caseData.case_id }, caseData.letter.fields, caseData.letter.language || language);
            const editor = workspace.querySelector('.letter-editor');
            if (editor) editor.value = caseData.letter.text || editor.value;
        } else {
            openLetterFormForCase(caseData.case_id, detailContainer);
        }
    });
    detailContainer.appendChild(letterAction);
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
    const helpStateSelector = document.getElementById('helpStateSelector');
    if (helpStateSelector) {
        helpStateSelector.addEventListener('change', (event) => loadHelpContactsForState(event.target.value));
        loadHelpContactsForState(helpStateSelector.value);
    }
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

function createLanguageExperience() {
    const language = getInterfaceLanguage();
    const nativeNames = { en: 'English', hi: 'हिंदी', ta: 'தமிழ்', te: 'తెలుగు', bn: 'বাংলা', mr: 'मराठी' };
    const modal = document.createElement('div');
    modal.id = 'languageGate';
    modal.className = 'language-gate';
    modal.hidden = Boolean(language);
    modal.innerHTML = `<div class="language-gate-panel" role="dialog" aria-modal="true" aria-labelledby="languageGateTitle"><p class="language-gate-kicker">RightsMitra</p><h1 id="languageGateTitle">${getUiText('chooseLanguage', language || 'en')}</h1><p class="language-gate-subtitle">Choose your preferred language</p><div class="language-options" role="radiogroup" aria-label="Available languages">${Object.keys(supportedLanguages).map(code => `<button type="button" class="language-option${code === (language || 'en') ? ' selected' : ''}" data-language="${code}" role="radio" aria-checked="${code === (language || 'en')}"><span>${nativeNames[code]}</span><small>${supportedLanguages[code].name}</small></button>`).join('')}</div><div class="language-gate-actions"><button type="button" class="language-speak" aria-label="Read language choice aloud">🔊</button><button type="button" class="btn btn-primary language-continue">${getUiText('continue', language || 'en')}</button></div></div>`;
    document.body.appendChild(modal);
    let selected = language || 'en';
    const options = modal.querySelectorAll('.language-option');
    const continueButton = modal.querySelector('.language-continue');
    const title = modal.querySelector('#languageGateTitle');
    options.forEach(option => option.addEventListener('click', () => {
        selected = option.dataset.language;
        options.forEach(item => { const active = item === option; item.classList.toggle('selected', active); item.setAttribute('aria-checked', String(active)); });
        title.textContent = getUiText('chooseLanguage', selected);
        continueButton.textContent = getUiText('continue', selected);
    }));
    modal.querySelector('.language-speak').addEventListener('click', () => {
        if (window.speechSynthesis && typeof SpeechSynthesisUtterance !== 'undefined') {
            const utterance = new SpeechSynthesisUtterance(getUiText('chooseLanguage', selected));
            utterance.lang = getLanguageCode(selected);
            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(utterance);
        }
    });
    continueButton.addEventListener('click', () => { setAppLanguage(selected); modal.hidden = true; });
    modal.addEventListener('keydown', event => { if (event.key === 'Escape' && getInterfaceLanguage()) modal.hidden = true; });
    if (!language) modal.querySelector('.language-option').focus();
}

function addLanguageSwitcher() {
    const navbarContent = document.querySelector('.navbar-content');
    if (!navbarContent || navbarContent.querySelector('.app-language-switcher')) return;
    const wrapper = document.createElement('label');
    wrapper.className = 'app-language-switcher';
    wrapper.innerHTML = `<span class="sr-only">${getUiText('changeLanguage')}</span><select aria-label="${getUiText('changeLanguage')}">${Object.keys(supportedLanguages).map(code => `<option value="${code}">${supportedLanguages[code].name}</option>`).join('')}</select>`;
    const select = wrapper.querySelector('select');
    select.value = getInterfaceLanguage() || 'en';
    select.addEventListener('change', event => setAppLanguage(event.target.value));
    navbarContent.appendChild(wrapper);
}

function applyInterfaceLanguage(language) {
    document.documentElement.lang = language;
    const page = location.pathname.split('/').pop() || 'index.html';
    const pageTitle = document.querySelector('.hero-title');
    const pageDescription = document.querySelector('.hero-description');
    const pageMap = { 'about.html': ['aboutTitle', 'aboutDesc'], 'resources.html': ['resourcesTitle', 'resourcesDesc'], 'contact.html': ['contactTitle', 'contactDesc'] };
    if (pageMap[page] && pageTitle && pageDescription) {
        pageTitle.textContent = getStaticText(pageMap[page][0], language);
        pageDescription.textContent = getStaticText(pageMap[page][1], language);
    }
    const casesTitle = document.querySelector('header h2');
    if (page === 'cases.html' && casesTitle) {
        casesTitle.textContent = getStaticText('casesTitle', language);
        const casesDescription = casesTitle.parentElement.querySelector('p');
        if (casesDescription) casesDescription.textContent = getStaticText('casesDesc', language);
    }
    document.querySelectorAll('.faq h2').forEach(element => { element.textContent = getStaticText('faq', language); });
    const footerKeys = ['aboutUs', 'quickLinks', 'contactUs', 'languages'];
    document.querySelectorAll('.footer-section h4').forEach((element, index) => { if (footerKeys[index]) element.textContent = getStaticText(footerKeys[index], language); });
    if (page === 'contact.html') {
        const getInTouch = document.querySelector('.contact-methods h2');
        const sendMessage = document.querySelector('.contact-form-section h2');
        if (getInTouch) getInTouch.textContent = getStaticText('getInTouch', language);
        if (sendMessage) sendMessage.textContent = getStaticText('sendMessage', language);
    }
    if (page === 'login.html') {
        const authTitle = document.querySelector('.auth-box h2');
        if (authTitle) authTitle.textContent = getStaticText('signIn', language);
        const sendOtp = document.getElementById('sendOtpBtn');
        const login = document.getElementById('loginBtn');
        const guest = document.getElementById('guestBtn');
        if (sendOtp) sendOtp.textContent = getStaticText('sendOtp', language);
        if (login) login.textContent = getStaticText('verifySignIn', language);
        if (guest) guest.textContent = getStaticText('continueGuest', language);
    }
    const navKeys = ['home', 'about', 'resources', 'contact', 'cases', 'login'];
    document.querySelectorAll('.nav-link').forEach((link, index) => { if (navKeys[index]) link.textContent = getUiText(navKeys[index], language); });
    const switcher = document.querySelector('.app-language-switcher select');
    if (switcher) { switcher.value = language; switcher.setAttribute('aria-label', getUiText('changeLanguage', language)); }
    if (languageSelector) {
        const autoOption = languageSelector.querySelector('option[value="auto"]');
        if (autoOption) autoOption.textContent = getUiText('autoDetect', language);
        languageSelector.value = getCaseLanguagePreference();
        if (!supportedLanguages[languageSelector.value] && languageSelector.value !== 'auto') {
            languageSelector.value = 'auto';
        }
    }
    const placeholders = { en: 'Describe your work-related problem...', hi: 'अपनी काम से जुड़ी समस्या बताएं...', ta: 'உங்கள் வேலை தொடர்பான பிரச்சினையை விவரிக்கவும்...', te: 'మీ పని సంబంధిత సమస్యను వివరించండి...', bn: 'আপনার কাজের সমস্যাটি বর্ণনা করুন...', mr: 'तुमची कामाशी संबंधित समस्या सांगा...' };
    if (userQuestionInput) userQuestionInput.placeholder = placeholders[language] || placeholders.en;
    if (submitBtn) submitBtn.textContent = getUiText('understand', language);
    if (clearBtn) clearBtn.textContent = getUiText('clear', language);
    const languageLabel = document.querySelector('label[for="languageSelector"] .workflow-label');
    if (languageLabel) languageLabel.textContent = getUiText('language', language);
    const questionLabel = document.querySelector('.question-label');
    if (questionLabel) questionLabel.textContent = getUiText('situation', language);
    const workerLabel = document.querySelector('label[for="workerType"]');
    if (workerLabel) workerLabel.textContent = getUiText('workerType', language);
    const stateLabel = document.querySelector('label[for="stateSelector"]');
    if (stateLabel) stateLabel.textContent = getUiText('state', language);
    const heroKicker = document.querySelector('.hero-kicker');
    if (heroKicker) heroKicker.textContent = getUiText('tellUs', language);
    const englishIssueLabels = { 'Salary Withheld': 'Salary not paid', 'Fired Without Notice': 'Lost my job', 'Excessive Hours': 'Too many hours', 'No Contract': 'No written agreement', 'Workplace Injury': 'Unsafe work or injury', 'Sexual Harassment': 'Harassment' };
    document.querySelectorAll('.issue-tag').forEach(tag => {
        const issue = tag.dataset.issue;
        const label = tag.querySelector('.tag-text');
        if (label && issue) {
            const description = label.querySelector('small')?.textContent || '';
            label.textContent = language === 'en' ? englishIssueLabels[issue] : getLocalizedIssueName(issue, language);
            if (description) { const small = document.createElement('small'); small.textContent = description; label.appendChild(small); }
        }
    });
    document.querySelectorAll('.letter-workspace').forEach(workspace => { if (!workspace.hidden) workspace.setAttribute('lang', language); });
}

function setAppLanguage(language) {
    if (!supportedLanguages[language]) return;
    localStorage.setItem('rightsMitraLanguage', language);
    applyInterfaceLanguage(language);
}

createLanguageExperience();
addLanguageSwitcher();
if (getInterfaceLanguage()) applyInterfaceLanguage(getInterfaceLanguage());

// Prevent form submission on enter in textarea (allow Ctrl+Enter instead)
if (userQuestionInput) {
    userQuestionInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.ctrlKey) {
            e.preventDefault();
        }
    });
}
