export type SupportedLanguage = 'English' | 'Hindi' | 'Tamil';

export const translations: Record<string, Record<SupportedLanguage, string>> = {
  // Top Header & Navigation Bar
  govNetwork: {
    English: 'Government Healthcare Digital Network • Ministry of Health & Family Welfare',
    Hindi: 'सरकारी स्वास्थ्य डिजिटल नेटवर्क • स्वास्थ्य एवं परिवार कल्याण मंत्रालय',
    Tamil: 'அரசு சுகாதார டிஜிட்டல் நெட்வொர்க் • சுகாதாரம் மற்றும் குடும்ப நல அமைச்சகம்'
  },
  facility: {
    English: 'Facility: District Hospital Network',
    Hindi: 'सुविधा: जिला अस्पताल नेटवर्क',
    Tamil: 'வசதி: மாவட்ட மருத்துவமனை நெட்வொர்க்'
  },
  publicHome: {
    English: 'Public Home',
    Hindi: 'मुख्य पृष्ठ',
    Tamil: 'பொது முகப்பு'
  },
  citizenPortal: {
    English: 'Citizen Portal',
    Hindi: 'नागरिक पोर्टल',
    Tamil: 'குடிமக்கள் போர்ட்டல்'
  },
  doctorPortal: {
    English: 'Doctor Portal',
    Hindi: 'डॉक्टर पोर्टल',
    Tamil: 'மருத்துவர் போர்ட்டல்'
  },
  healthKiosk: {
    English: 'Health Kiosk',
    Hindi: 'स्वास्थ्य कियोस्क',
    Tamil: 'சுகாதார கியோஸ்க்'
  },
  registration: {
    English: 'Registration',
    Hindi: 'पंजीकरण',
    Tamil: 'பதிவு'
  },
  govtAdmin: {
    English: 'Govt Admin',
    Hindi: 'सरकारी व्यवस्थापक',
    Tamil: 'அரசு நிர்வாகம்'
  },
  switchView: {
    English: 'Switch View:',
    Hindi: 'दृश्य बदलें:',
    Tamil: 'பார்வையை மாற்றவும்:'
  },
  activePatient: {
    English: 'Active Patient',
    Hindi: 'सक्रिय मरीज',
    Tamil: 'செயலில் உள்ள நோயாளி'
  },
  criticalFlag: {
    English: 'Critical Flag: 1 Allergy',
    Hindi: 'गंभीर चेतावनी: 1 एलर्जी',
    Tamil: 'முக்கிய எச்சரிக்கை: 1 ஒவ்வாமை'
  },
  bloodGroup: {
    English: 'Blood Group',
    Hindi: 'रक्त समूह',
    Tamil: 'இரத்த வகை'
  },
  subHeaderTag: {
    English: 'Permanent Citizen Health Profile & AI Intake Platform',
    Hindi: 'स्थायी नागरिक स्वास्थ्य प्रोफ़ाइल और एआई इनटेक प्लेटफॉर्म',
    Tamil: 'நிரந்தர குடிமகன் சுகாதார சுயவிவரம் & AI சேர்க்கை தளம்'
  },
  govtDigitalHealth: {
    English: 'GOVT DIGITAL HEALTH',
    Hindi: 'सरकारी डिजिटल स्वास्थ्य',
    Tamil: 'அரசு டிஜிட்டல் சுகாதாரம்'
  },

  // Public Landing Page
  heroTitle: {
    English: 'MediKiosk Platform',
    Hindi: 'मेडीकियोस्क प्लेटफॉर्म',
    Tamil: 'மெடிகியோஸ்க் தளம்'
  },
  heroTagline: {
    English: 'One Citizen → One Permanent Health Profile → Universal Care',
    Hindi: 'एक नागरिक → एक स्थायी स्वास्थ्य प्रोफ़ाइल → सार्वभौमिक देखभाल',
    Tamil: 'ஒரு குடிமகன் → ஒரு நிரந்தர சுகாதார சுயவிவரம் → அகில உலக பராமரிப்பு'
  },
  heroDesc: {
    English: 'Eliminate repeated OPD history taking, lost paper prescriptions, and fragmented medical records. AI-assisted clinical intake with physician verification across PHCs, District Hospitals, and Medical Colleges.',
    Hindi: 'बार-बार ओपीडी इतिहास लेने, खोए हुए कागजी नुस्खे और बिखरे हुए चिकित्सा रिकॉर्ड को समाप्त करें। प्राथमिक स्वास्थ्य केंद्रों, जिला अस्पतालों और मेडिकल कॉलेजों में चिकित्सक सत्यापन के साथ एआई-सहायता प्राप्त नैदानिक ​​इनटेक।',
    Tamil: 'மீண்டும் மீண்டும் OPD வரலாறு எடுப்பது, இழந்த காகித மருந்துக் குறிப்புகள் மற்றும் துண்டாக்கப்பட்ட மருத்துவப் பதிவுகளை ஒழிக்கவும்.'
  },
  accessCitizenRecord: {
    English: 'Access My Citizen Record',
    Hindi: 'मेरा नागरिक रिकॉर्ड देखें',
    Tamil: 'எனது குடிமகன் பதிவை அணுகவும்'
  },
  doctorClinicalLogin: {
    English: 'Doctor Clinical Login',
    Hindi: 'डॉक्टर क्लीनिकल लॉगिन',
    Tamil: 'மருத்துவர் மருத்துவ உள்நுழைவு'
  },
  selectRole: {
    English: 'Select Portal Access Role',
    Hindi: 'पोर्टल एक्सेस भूमिका चुनें',
    Tamil: 'போர்ட்டல் அணுகல் பங்கைத் தேர்ந்தெடுக்கவும்'
  },
  multiStakeholder: {
    English: 'Multi-Stakeholder Access',
    Hindi: 'बहु-हितधारक पहुंच',
    Tamil: 'பல பங்குதாரர் அணுகல்'
  },
  roleSubText: {
    English: 'Experience the tailored interface for each healthcare role in government OPD operations:',
    Hindi: 'सरकारी ओपीडी संचालन में प्रत्येक स्वास्थ्य देखभाल भूमिका के लिए अनुकूलित इंटरफ़ेस का अनुभव करें:',
    Tamil: 'அரசு OPD செயல்பாடுகளில் ஒவ்வொரு சுகாதார பராமரிப்பு பங்குக்கான பிரத்யேக இடைமுகத்தை அனுபவிக்க:'
  },
  citizenCardTitle: {
    English: 'Citizen Health Portal',
    Hindi: 'नागरिक स्वास्थ्य पोर्टल',
    Tamil: 'குடிமகன் சுகாதார போர்ட்டல்'
  },
  citizenCardDesc: {
    English: 'Access your permanent digital health profile, view verified clinical timeline, active medications, and report health changes.',
    Hindi: 'अपनी स्थायी डिजिटल स्वास्थ्य प्रोफ़ाइल एक्सेस करें, सत्यापित नैदानिक ​​समयरेखा, सक्रिय दवाएं देखें और स्वास्थ्य परिवर्तनों की रिपोर्ट करें।',
    Tamil: 'உங்கள் நிரந்தர டிஜிட்டல் சுகாதார சுயவிவரத்தை அணுகவும், சரிபார்க்கப்பட்ட மருத்துவ காலவரிசையைக் காணவும்.'
  },
  doctorCardTitle: {
    English: 'Doctor Clinical Workspace',
    Hindi: 'डॉक्टर क्लीनिकल वर्कस्पेस',
    Tamil: 'மருத்துவர் மருத்துவ பணியிடம்'
  },
  doctorCardDesc: {
    English: 'Review OPD patient queue, verify patient-reported claims, inspect AI summaries, and issue verified prescriptions.',
    Hindi: 'ओपीडी मरीज कतार की समीक्षा करें, मरीज द्वारा रिपोर्ट किए गए दावों की पुष्टि करें, एआई सारांश का निरीक्षण करें और सत्यापित नुस्खे जारी करें।',
    Tamil: 'OPD நோயாளி வரிசையை மதிப்பாய்வு செய்யவும், நோயாளி புகார்களை சரிபார்க்கவும், மருந்துகளை வழங்கவும்.'
  },
  kioskCardTitle: {
    English: 'Health Worker & Kiosk',
    Hindi: 'स्वास्थ्य कार्यकर्ता एवं कियोस्क',
    Tamil: 'சுகாதார ஊழியர் & கியோஸ்க்'
  },
  kioskCardDesc: {
    English: 'Touch-optimized intake kiosk with multilingual voice assistant (English, Hindi, Tamil) for PHCs and OPD waiting halls.',
    Hindi: 'प्राथमिक स्वास्थ्य केंद्रों और ओपीडी प्रतीक्षा हॉलों के लिए बहुभाषी वॉयस असिस्टेंट (अंग्रेजी, हिंदी, तमिल) के साथ टच-अनुकूलित इनटेक कियोस्क।',
    Tamil: 'PHCகள் மற்றும் OPD காத்திருப்பு அறைகளுக்கான பன்மொழி குரல் உதவியாளருடன் தொடு-உகப்பாக்கப்பட்ட சேர்க்கை கியோஸ்க்.'
  },
  operatorCardTitle: {
    English: 'Registration Desk',
    Hindi: 'पंजीकरण डेस्क',
    Tamil: 'பதிவு மேசை'
  },
  operatorCardDesc: {
    English: 'Search existing citizens, onboard new patients, issue permanent Health IDs (GOV-IND-2026), and assign OPD tokens.',
    Hindi: 'मौजूदा नागरिकों की खोज करें, नए मरीजों को जोड़ें, स्थायी स्वास्थ्य आईडी (GOV-IND-2026) जारी करें और ओपीडी टोकन असाइन करें।',
    Tamil: 'தற்போதுள்ள குடிமக்களைத் தேடவும், புதிய நோயாளிகளைச் சேர்க்கவும், நிரந்தர சுகாதார ஐடிகளை வழங்கவும்.'
  },
  adminCardTitle: {
    English: 'Government Admin',
    Hindi: 'सरकारी व्यवस्थापक',
    Tamil: 'அரசு நிர்வாகம்'
  },
  adminCardDesc: {
    English: 'Monitor health infrastructure usage across PHCs, CHCs, District Hospitals, digitized records, and security audit logs.',
    Hindi: 'प्राथमिक स्वास्थ्य केंद्रों, सीएचसी, जिला अस्पतालों, डिजिटलीकृत रिकॉर्ड और सुरक्षा ऑडिट लॉग में स्वास्थ्य बुनियादी ढांचे के उपयोग की निगरानी करें।',
    Tamil: 'PHCகள், CHCகள், மாவட்ட மருத்துவமனைகள் மற்றும் டிஜிட்டல் மயமாக்கப்பட்ட பதிவுகளில் சுகாதார உள்கட்டமைப்பு பயன்பாட்டைக் கண்காணிக்கவும்.'
  },
  enterCitizenPortal: {
    English: 'Enter Patient Portal',
    Hindi: 'रोगी पोर्टल में प्रवेश करें',
    Tamil: 'நோயாளி போர்ட்டலில் நுழையவும்'
  },
  openDoctorWorkspace: {
    English: 'Open Doctor Workspace',
    Hindi: 'डॉक्टर कार्यक्षेत्र खोलें',
    Tamil: 'மருத்துவர் பணியிடத்தை திறக்கவும்'
  },
  launchKioskMode: {
    English: 'Launch Kiosk Mode',
    Hindi: 'कियोस्क मोड शुरू करें',
    Tamil: 'கியோஸ்க் பயன்முறையைத் தொடங்கவும்'
  },
  accessRegistration: {
    English: 'Access Registration',
    Hindi: 'पंजीकरण खोलें',
    Tamil: 'பதிவை அணுகவும்'
  },
  viewAdminDashboard: {
    English: 'View Admin Dashboard',
    Hindi: 'व्यवस्थापक डैशबोर्ड देखें',
    Tamil: 'நிர்வாக டாஷ்போர்டைப் பார்க்கவும்'
  },

  // Medical Safety Architecture Section
  safetyTitle: {
    English: 'Patient Reported vs Doctor Verified Data',
    Hindi: 'रोगी द्वारा रिपोर्ट किया गया बनाम डॉक्टर द्वारा सत्यापित डेटा',
    Tamil: 'நோயாளி அறிக்கையிட்ட தரவு VS மருத்துவர் சரிபார்த்த தரவு'
  },
  safetySubtitle: {
    English: 'Central Safety Safeguard',
    Hindi: 'केंद्रीय सुरक्षा सुरक्षा कवच',
    Tamil: 'மத்திய பாதுகாப்பு கவசம்'
  },
  patientReportedTitle: {
    English: '1. Patient Reported Data',
    Hindi: '1. रोगी द्वारा रिपोर्ट किया गया डेटा',
    Tamil: '1. நோயாளி அறிக்கையிட்ட தரவு'
  },
  patientReportedDesc: {
    English: 'Citizen reports symptoms, past allergies, or current medicines. Items are saved as Pending Verification and flagged for doctor review.',
    Hindi: 'नागरिक लक्षणों, पुरानी एलर्जी या वर्तमान दवाओं की रिपोर्ट करता है। आइटम सत्यापन लंबित के रूप में सहेजे जाते हैं और डॉक्टर समीक्षा के लिए फ़्लैग किए जाते हैं।',
    Tamil: 'குடிமகன் அறிகுறிகள், ஒவ்வாமைகள் அல்லது மருந்துகளைப் புகாரளிக்கிறார்.'
  },
  ocrTitle: {
    English: '2. AI OCR Extracted',
    Hindi: '2. एआई ओसीआर द्वारा निकाला गया',
    Tamil: '2. AI OCR பிரித்தெடுக்கப்பட்டது'
  },
  ocrDesc: {
    English: 'Uploaded prescription scans or lab reports are parsed by AI entity extractors and marked Imported for doctor validation.',
    Hindi: 'अपलोड किए गए नुस्खे स्कैन या लैब रिपोर्ट को एआई द्वारा निकाला जाता है और डॉक्टर सत्यापन के लिए आयातित के रूप में चिह्नित किया जाता है।',
    Tamil: 'பதிவேற்றப்பட்ட மருந்துச் சீட்டு ஸ்கேன்கள் AI மூலம் பாகுபடுத்தப்பட்டு மருத்துவர் சரிபார்ப்பிற்கு குறிக்கப்படுகின்றன.'
  },
  verifiedTitle: {
    English: '3. Doctor Verified Record',
    Hindi: '3. डॉक्टर द्वारा सत्यापित रिकॉर्ड',
    Tamil: '3. மருத்துவர் சரிபார்த்த பதிவு'
  },
  verifiedDesc: {
    English: 'An authorized physician confirms patient or OCR claims during OPD consultation. Item converts to Verified Clinical Fact permanently.',
    Hindi: 'एक अधिकृत चिकित्सक ओपीडी परामर्श के दौरान रोगी या ओसीआर दावों की पुष्टि करता है। आइटम स्थायी रूप से सत्यापित नैदानिक ​​तथ्य में परिवर्तित होता है।',
    Tamil: 'அனுமதிக்கப்பட்ட மருத்துவர் OPD ஆலோசனையின் போது நோயாளியின் உரிமைகோரல்களை உறுதிப்படுத்துகிறார்.'
  },

  // Kiosk Portal
  kioskTitle: {
    English: 'Autonomous OPD Intake & Triage Kiosk',
    Hindi: 'स्वायत्त ओपीडी इनटेक और ट्राइएज कियोस्क',
    Tamil: 'சுயாதீன OPD சேர்க்கை & கியோஸ்க்'
  },
  kioskSubtitle: {
    English: 'Touch Screen or Speak to Start Self Intake',
    Hindi: 'स्व-सेवन शुरू करने के लिए स्क्रीन स्पर्श करें या बोलें',
    Tamil: 'சுய சேர்க்கையைத் தொடங்க தொடுதிரை அல்லது பேசுங்கள்'
  },
  speakLanguage: {
    English: 'Talk to AI assistant in your spoken language',
    Hindi: 'अपनी बोली जाने वाली भाषा में एआई सहायक से बात करें',
    Tamil: 'உங்கள் பேசும் மொழியில் AI உதவியாளரிடம் பேசுங்கள்'
  },
  selectLanguageText: {
    English: 'Language:',
    Hindi: 'भाषा:',
    Tamil: 'மொழி:'
  },
  scanABHA: {
    English: 'Scan ABHA Card / QR Code',
    Hindi: 'आभा कार्ड / क्यूआर कोड स्कैन करें',
    Tamil: 'ABHA கார்டு / QR குறியீட்டை ஸ்கேன் செய்யவும்'
  },
  scanDesc: {
    English: 'Place card under optical scanner below for instant lookup',
    Hindi: 'तत्काल खोज के लिए नीचे ऑप्टिकल स्कैनर के नीचे कार्ड रखें',
    Tamil: 'உடனடி தேடலுக்கு கீழே உள்ள ஆப்டிகல் ஸ்கேனரின் கீழ் கார்டை வைக்கவும்'
  },
  aiVoiceAssistant: {
    English: 'Multilingual AI Voice Assistant',
    Hindi: 'बहुभाषी एआई वॉयस असिस्टेंट',
    Tamil: 'பன்மொழி AI குரல் உதவியாளர்'
  },
  listening: {
    English: 'Listening... Speak your symptoms clearly',
    Hindi: 'सुन रहा है... अपने लक्षणों को स्पष्ट रूप से बोलें',
    Tamil: 'கேட்கிறது... உங்கள் அறிகுறிகளை தெளிவாக பேசுங்கள்'
  },
  clickToSpeak: {
    English: 'Click to Speak with AI Assistant',
    Hindi: 'एआई सहायक से बात करने के लिए क्लिक करें',
    Tamil: 'AI உதவியாளரிடம் பேச கிளிக் செய்ய வேண்டும்'
  },
  quickSymptoms: {
    English: 'Quick Symptom Selection (Touch Screen)',
    Hindi: 'त्वरित लक्षण चयन (टच स्क्रीन)',
    Tamil: 'விரைவான அறிகுறி தேர்வு (தொடுதிரை)'
  },
  feverOption: {
    English: 'Fever & Chills',
    Hindi: 'बुखार और सर्दी',
    Tamil: 'காய்ச்சல் & குளிர்'
  },
  coughOption: {
    English: 'Cough & Chest Congestion',
    Hindi: 'खांसी और छाती में जकड़न',
    Tamil: 'இருமல் & மார்பு நெரிசல்'
  },
  stomachOption: {
    English: 'Severe Abdominal Pain',
    Hindi: 'पेट में तेज दर्द',
    Tamil: 'கடுமையான வயிற்று வலி'
  },
  dizzinessOption: {
    English: 'Dizziness & Headaches',
    Hindi: 'चक्कर आना और सिरदर्द',
    Tamil: 'தலைச்சுற்றல் & தலைவலி'
  },
  chestPainOption: {
    English: 'Chest Pain & Shortness of Breath (RED FLAG)',
    Hindi: 'छाती में दर्द और सांस लेने में तकलीफ (लाल झंडा)',
    Tamil: 'மார்பु வலி & மூச்சுத் திணறல் (சிவப்பு கொடி)'
  },
  emergencyAlertBtn: {
    English: 'Trigger Emergency Red Flag Triage Alert',
    Hindi: 'आपात्कालीन रेड फ़्लैग ट्राइएज अलर्ट ट्रिगर करें',
    Tamil: 'அவசர சிவப்பு கொடி எச்சரிக்கையை தூண்டவும்'
  },
  uploadDocOCR: {
    English: 'Upload Paper Prescription / Lab Scan (AI OCR)',
    Hindi: 'कागजी नुस्खा / लैब स्कैन अपलोड करें (एआई ओसीआर)',
    Tamil: 'காகித மருந்துச் சீட்டு / ஆய்வக ஸ்கேனைப் பதிவேற்றவும் (AI OCR)'
  },
  dropFile: {
    English: 'Drop scan file here or click to simulate scanner',
    Hindi: 'स्कैन फ़ाइल यहाँ छोड़ें या स्कैनर सिमुलेट करने के लिए क्लिक करें',
    Tamil: 'ஸ்கேன் கோப்பை இங்கே விடவும் அல்லது கிளிக் செய்யவும்'
  },

  // Citizen Portal
  citizenRecordOverview: {
    English: 'Permanent Citizen Health Profile',
    Hindi: 'स्थायी नागरिक स्वास्थ्य प्रोफ़ाइल',
    Tamil: 'நிரந்தர குடிமகன் சுகாதார சுயவிவரம்'
  },
  reportChangeBtn: {
    English: 'Report Health Change',
    Hindi: 'स्वास्थ्य परिवर्तन रिपोर्ट करें',
    Tamil: 'சுகாதார மாற்றத்தைப் புகாரளிக்கவும்'
  },
  aiIntakeBtn: {
    English: 'Start AI Clinical Intake',
    Hindi: 'एआई नैदानिक ​​इनटेक शुरू करें',
    Tamil: 'AI மருத்துவ சேர்க்கையைத் தொடங்கவும்'
  },
  overviewTab: {
    English: 'Dashboard Overview',
    Hindi: 'डैशबोर्ड अवलोकन',
    Tamil: 'டாஷ்போர்டு மேலோட்டம்'
  },
  medicationsTab: {
    English: 'Active Medications',
    Hindi: 'सक्रिय दवाएं',
    Tamil: 'செயலில் உள்ள மருந்துகள்'
  },
  allergiesTab: {
    English: 'Known Allergies',
    Hindi: 'ज्ञात एलर्जी',
    Tamil: 'அறியப்பட்ட ஒவ்வாமைகள்'
  },
  documentsTab: {
    English: 'Document Locker (OCR)',
    Hindi: 'दस्तावेज़ लॉकर (ओसीआर)',
    Tamil: 'ஆவண லாக்கர் (OCR)'
  },
  timelineTab: {
    English: 'Health Timeline',
    Hindi: 'स्वास्थ्य समयरेखा',
    Tamil: 'சுகாதார காலவரிசை'
  },
  consentTab: {
    English: 'Consent & Access Logs',
    Hindi: 'सहमति और पहुंच लॉग',
    Tamil: 'சம்மதம் & அணுகல் பதிவுகள்'
  },
  welcomeBack: {
    English: 'Welcome back,',
    Hindi: 'वापसी पर स्वागत है,',
    Tamil: 'மீண்டும் வருக,'
  },
  startAIIntake: {
    English: 'Start AI Health Intake',
    Hindi: 'एआई स्वास्थ्य इनटेक शुरू करें',
    Tamil: 'AI சுகாதார சேர்க்கையைத் தொடங்கவும்'
  },
  reportNewItem: {
    English: 'Report New Item',
    Hindi: 'नई वस्तु की रिपोर्ट करें',
    Tamil: 'புதிய உருப்படியைப் புகாரளிக்கவும்'
  },
  criticalMedicalAlert: {
    English: 'CRITICAL MEDICAL ALERT VISIBLE TO DOCTORS',
    Hindi: 'डॉक्टरों को दृश्यमान गंभीर चिकित्सा चेतावनी',
    Tamil: 'மருத்துவர்களுக்குத் தெரியும் முக்கிய மருத்துவ எச்சரிக்கை'
  },
  criticalAllergiesStat: {
    English: 'Critical Allergies',
    Hindi: 'गंभीर एलर्जी',
    Tamil: 'முக்கிய ஒவ்வாமைகள்'
  },
  activeMedsStat: {
    English: 'Active Medicines',
    Hindi: 'सक्रिय दवाएं',
    Tamil: 'செயலில் உள்ள மருந்துகள்'
  },
  surgeriesStat: {
    English: 'Previous Surgeries',
    Hindi: 'पिछली सर्जरी',
    Tamil: 'முந்தைய அறுவை சிகிச்சைகள்'
  },
  medDocsStat: {
    English: 'Medical Documents',
    Hindi: 'चिकित्सा दस्तावेज',
    Tamil: 'மருத்துவ ஆவணங்கள்'
  },
  doctorVerified: {
    English: 'Doctor Verified',
    Hindi: 'डॉक्टर द्वारा सत्यापित',
    Tamil: 'மருத்துவர் சரிபார்த்தார்'
  },
  healthProfileNav: {
    English: 'Health Profile Navigation',
    Hindi: 'स्वास्थ्य प्रोफ़ाइल नेविगेशन',
    Tamil: 'சுகாதார சுயவிவர வழிசெலுத்தல்'
  },
  recentEvents: {
    English: 'Recent Health Events',
    Hindi: 'हालिया स्वास्थ्य घटनाएं',
    Tamil: 'சமீபத்திய சுகாதார நிகழ்வுகள்'
  },
  recentAccessLogs: {
    English: 'Recent Record Access Logs',
    Hindi: 'हालिया रिकॉर्ड एक्सेस लॉग',
    Tamil: 'சமீபத்திய பதிவு அணுகல் பதிவுகள்'
  },

  // Doctor Workspace
  authPhysician: {
    English: 'AUTHORIZED GOVERNMENT PHYSICIAN WORKSPACE',
    Hindi: 'अधिकृत सरकारी चिकित्सक कार्यक्षेत्र',
    Tamil: 'அனுமதிக்கப்பட்ட அரசு மருத்துவர் பணியிடம்'
  },
  docName: {
    English: 'Dr. R. K. Sharma (MD, Senior Physician)',
    Hindi: 'डॉ. आर. के. शर्मा (एमडी, वरिष्ठ चिकित्सक)',
    Tamil: 'டாக்டர் ஆர். கே. சர்மா (MD, மூத்த மருத்துவர்)'
  },
  docFacility: {
    English: 'District Hospital OPD • General Medicine Department • License #GOV-MED-44109',
    Hindi: 'जिला अस्पताल ओपीडी • सामान्य चिकित्सा विभाग • लाइसेंस #GOV-MED-44109',
    Tamil: 'மாவட்ட மருத்துவமனை OPD • பொது மருத்துவத் துறை • உரிமம் #GOV-MED-44109'
  },
  pendingVerification: {
    English: 'Pending Verification',
    Hindi: 'सत्यापन लंबित',
    Tamil: 'சரிபார்ப்பு நிலுவையில் உள்ளது'
  },
  todaysQueue: {
    English: "Today's OPD Queue",
    Hindi: 'आज की ओपीडी कतार',
    Tamil: 'இன்றைய OPD வரிசை'
  },
  criticalAllergy: {
    English: 'Critical Allergy',
    Hindi: 'गंभीर एलर्जी',
    Tamil: 'முக்கிய ஒவ்வாமை'
  },
  routineFollowup: {
    English: 'Routine Follow-up',
    Hindi: 'नियमित फॉलो-अप',
    Tamil: 'வழக்கமான பின்தொடர்தல்'
  },
  aiIntakePreSummary: {
    English: 'AI Clinical Intake Pre-Summary',
    Hindi: 'एआई क्लिनिकल इनटेक पूर्व-सारांश',
    Tamil: 'AI மருத்துவ சேர்க்கை முன் சுருக்கம்'
  },
  penicillinAllergy: {
    English: 'CONFIRMED PENICILLIN ALLERGY',
    Hindi: 'पुष्टि की गई पेनिसिलिन एलर्जी',
    Tamil: 'உறுதிப்படுத்தப்பட்ட பென்சிலின் ஒவ்வாமை'
  },
  clinicalProfileHistory: {
    English: 'Clinical Profile & History',
    Hindi: 'क्लिनिकल प्रोफ़ाइल और इतिहास',
    Tamil: 'மருத்துவ சுயவிவரம் & வரலாறு'
  },
  verificationQueueTab: {
    English: 'Verification Queue',
    Hindi: 'सत्यापन कतार',
    Tamil: 'சரிபார்ப்பு வரிசை'
  },
  addClinicalNotesPrescription: {
    English: 'Add Clinical Notes & Prescription',
    Hindi: 'नैदानिक ​​​​नोट्स और नुस्खा जोड़ें',
    Tamil: 'மருத்துவக் குறிப்புகள் & மருந்துக் குறிப்பைச் சேர்க்கவும்'
  },
  verifiedAllergiesRules: {
    English: 'VERIFIED ALLERGIES & MEDICAL SAFETY RULES',
    Hindi: 'सत्यापित एलर्जी और चिकित्सा सुरक्षा नियम',
    Tamil: 'சரிபார்க்கப்பட்ட ஒவ்வாமைகள் & மருத்துவ பாதுகாப்பு விதிகள்'
  },
  activeMedicationsTitle: {
    English: 'ACTIVE MEDICATIONS',
    Hindi: 'सक्रिय दवाएं',
    Tamil: 'செயலில் உள்ள மருந்துகள்'
  },
  doctorVerificationEngine: {
    English: 'Doctor Clinical Verification Engine',
    Hindi: 'डॉक्टर क्लिनिकल सत्यापन इंजन',
    Tamil: 'மருத்துவர் மருத்துவ சரிபார்ப்பு இயந்திரம்'
  },
  keySafeguard: {
    English: 'Key Safeguard: Confirm patient-reported items or OCR scans before they become verified clinical history.',
    Hindi: 'मुख्य सुरक्षा कवच: रोगी द्वारा रिपोर्ट की गई वस्तुओं या ओसीआर स्कैन की पुष्टि करें।',
    Tamil: 'முக்கிய பாதுகாப்பு: நோயாளி அறிக்கையிட்ட உருப்படிகள் அல்லது OCR ஸ்கேன்களை சரிபார்க்கவும்.'
  },
  confirmVerification: {
    English: 'Confirm Verification 🟢',
    Hindi: 'सत्यापन की पुष्टि करें 🟢',
    Tamil: 'சரிபார்ப்பை உறுதிப்படுத்தவும் 🟢'
  },
  reject: {
    English: 'Reject',
    Hindi: 'अस्वीकार करें',
    Tamil: 'நிராகரி'
  },
  verifiedClinicalFact: {
    English: 'Verified Clinical Fact',
    Hindi: 'सत्यापित नैदानिक ​​तथ्य',
    Tamil: 'சரிபார்க்கப்பட்ட மருத்துவ உண்மை'
  },
  rejectedByDoctor: {
    English: 'Rejected by Doctor',
    Hindi: 'डॉक्टर द्वारा अस्वीकृत',
    Tamil: 'மருத்துவராலும் நிராகரிக்கப்பட்டது'
  },
  addPrescriptionNote: {
    English: 'Add Clinical Prescription & Doctor Note',
    Hindi: 'नैदानिक ​​​​नुस्खा और डॉक्टर नोट जोड़ें',
    Tamil: 'மருத்துவ மருந்துச் சீட்டு & மருத்துவர் குறிப்பைச் சேர்க்கவும்'
  },
  entryType: {
    English: 'Entry Type',
    Hindi: 'प्रविष्टि प्रकार',
    Tamil: 'உள்ளீட்டு வகை'
  },
  newPrescriptionMed: {
    English: 'New Prescription Medication',
    Hindi: 'नया नुस्खा दवा',
    Tamil: 'புதிய மருந்து சீட்டு'
  },
  confirmedAllergyFlag: {
    English: 'Confirmed Severe Allergy Flag',
    Hindi: 'पुष्टि की गई गंभीर एलर्जी ध्वज',
    Tamil: 'உறுதிப்படுத்தப்பட்ட ஒவ்வாமை எச்சரிக்கை'
  },
  nameTitle: {
    English: 'Name / Title',
    Hindi: 'नाम / शीर्षक',
    Tamil: 'பெயர் / தலைப்பு'
  },
  clinicalDetailsInstructions: {
    English: 'Clinical Details / Instructions',
    Hindi: 'नैदानिक ​​विवरण / निर्देश',
    Tamil: 'மருத்துவ விவரங்கள் / அறிவுறுத்தல்கள்'
  },
  savePermanentRecord: {
    English: 'Save to Permanent Citizen Record 🟢',
    Hindi: 'स्थायी नागरिक रिकॉर्ड में सहेजें 🟢',
    Tamil: 'நிரந்தர குடிமகன் பதிவில் சேமிக்கவும் 🟢'
  },

  // Operator / Registration
  opRegistrationTitle: {
    English: 'Government Hospital OPD Registration Desk',
    Hindi: 'सरकारी अस्पताल ओपीडी पंजीकरण डेस्क',
    Tamil: 'அரசு மருத்துவமனை OPD பதிவு மேசை'
  },
  registerCitizenBtn: {
    English: 'Register New Citizen',
    Hindi: 'नए नागरिक का पंजीकरण करें',
    Tamil: 'புதிய குடிமகனை பதிவு செய்யவும்'
  },
  fullNameLabel: {
    English: 'Full Name',
    Hindi: 'पूरा नाम',
    Tamil: 'முழு பெயர்'
  },
  mobileLabel: {
    English: 'Mobile Number',
    Hindi: 'मोबाइल नंबर',
    Tamil: 'கைபேசி எண்'
  },
  dobLabel: {
    English: 'Date of Birth',
    Hindi: 'जन्म तिथि',
    Tamil: 'பிறந்த தேதி'
  },
  genderLabel: {
    English: 'Gender',
    Hindi: 'लिंग',
    Tamil: 'பாலினம்'
  },
  bloodGroupLabel: {
    English: 'Blood Group',
    Hindi: 'रक्त समूह',
    Tamil: 'இரத்த வகை'
  },

  // Admin
  adminDashboardTitle: {
    English: 'Government Health Infrastructure Analytics',
    Hindi: 'सरकारी स्वास्थ्य अवसंरचना विश्लेषण',
    Tamil: 'அரசு சுகாதார உள்கட்டமைப்பு பகுப்பாய்வு'
  },
  totalProfilesDigitized: {
    English: 'Total Profiles Digitized',
    Hindi: 'कुल डिजिटलीकृत प्रोफाइल',
    Tamil: 'மொத்த டிஜிட்டல் சுயவிவரங்கள்'
  },
  activeQueues: {
    English: 'Active OPD Queues',
    Hindi: 'सक्रिय ओपीडी कतारें',
    Tamil: 'செயலில் உள்ள OPD வரிசைகள்'
  },
  ocrDocumentsProcessed: {
    English: 'OCR Documents Processed',
    Hindi: 'ओसीआर दस्तावेज़ संसाधित',
    Tamil: 'செயலாக்கப்பட்ட OCR ஆவணங்கள்'
  },

  // AI Separate Modes
  publicAiAwarenessTitle: {
    English: 'Public AI Health Awareness Assistant',
    Hindi: 'सार्वजनिक एआई स्वास्थ्य जागरूकता सहायक',
    Tamil: 'பொது AI சுகாதார விழிப்புணர்வு உதவியாளர்'
  },
  publicAiAwarenessDesc: {
    English: 'Ask questions & understand symptoms for self-awareness. Private & NOT sent to doctor.',
    Hindi: 'स्वयं की जागरूकता के लिए प्रश्न पूछें और लक्षणों को समझें। व्यक्तिगत और डॉक्टर को नहीं भेजा जाता।',
    Tamil: 'சுய விழிப்புணர்வுக்கு கேள்விகளைக் கேட்டு அறிகுறிகளைப் புரிந்துகொள்ளுங்கள். தனிப்பட்டது, மருத்துவருக்கு அனுப்பப்படாது.'
  },
  opdDoctorIntakeTitle: {
    English: 'OPD Clinical Doctor Intake',
    Hindi: 'ओपीडी क्लिनिकल डॉक्टर इनटेक',
    Tamil: 'OPD மருத்துவ சேர்க்கை'
  },
  opdDoctorIntakeDesc: {
    English: 'Prepares structured history for OPD consultation and sends alerts to Doctor Queue.',
    Hindi: 'ओपीडी परामर्श के लिए संरचित इतिहास तैयार करता है और डॉक्टर कतार में अलर्ट भेजता है।',
    Tamil: 'OPD ஆலோசனைக்கான தகவல்களைத் தயாரித்து மருத்துவருக்கு அனுப்புகிறது.'
  },
  awarenessModeBadge: {
    English: '🛡️ Public Health Awareness Mode (Private • Not Sent to Doctor)',
    Hindi: '🛡️ सार्वजनिक स्वास्थ्य जागरूकता मोड (व्यक्तिगत • डॉक्टर को नहीं भेजा गया)',
    Tamil: '🛡️ பொது சுகாதார விழிப்புணர்வு பயன்முறை (தனிப்பட்டது • மருத்துவருக்கு அனுப்பப்படாது)'
  },
  doctorIntakeModeBadge: {
    English: '📋 OPD Clinical Intake Mode (Submits History to Doctor Queue)',
    Hindi: '📋 ओपीडी क्लिनिकल इनटेक मोड (डॉक्टर कतार में इतिहास प्रस्तुत करता है)',
    Tamil: '📋 OPD மருத்துவ சேர்க்கை பயன்முறை (மருத்துவருக்கு தகவல்களை அனுப்புகிறது)'
  },
  awarenessCompletedNotice: {
    English: 'Interaction Complete. This response was strictly for your health awareness. NOTHING was sent to the doctor or saved to records.',
    Hindi: 'बातचीत पूरी हुई। यह उत्तर केवल आपकी स्वास्थ्य जागरूकता के लिए था। डॉक्टर को कुछ भी नहीं भेजा गया है।',
    Tamil: 'செயல்பாடு நிறைவடைந்தது. இந்த பதில் உங்கள் விழிப்புணர்விற்கு மட்டுமே. மருத்துவருக்கு எதுவும் அனுப்பப்படவில்லை.'
  },
  publicAiHeroBtn: {
    English: 'Try Public AI Health Awareness',
    Hindi: 'सार्वजनिक एआई स्वास्थ्य जागरूकता का प्रयास करें',
    Tamil: 'பொது AI சுகாதார விழிப்புணர்வை முயற்சிக்கவும்'
  }
};

export function t(key: string, language: string = 'English'): string {
  const langKey = (['English', 'Hindi', 'Tamil'].includes(language) ? language : 'English') as SupportedLanguage;
  if (translations[key] && translations[key][langKey]) {
    return translations[key][langKey];
  }
  if (translations[key] && translations[key]['English']) {
    return translations[key]['English'];
  }
  return key;
}
