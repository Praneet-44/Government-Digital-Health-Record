const fs = require('fs');
const path = require('path');

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1060" width="1600" height="1060" style="background-color: #070D19; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <defs>
    <!-- Gradients -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0B132B" />
      <stop offset="50%" stop-color="#070D19" />
      <stop offset="100%" stop-color="#050A14" />
    </linearGradient>

    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1E293B" stop-opacity="0.9" />
      <stop offset="100%" stop-color="#0F172A" stop-opacity="0.9" />
    </linearGradient>

    <linearGradient id="blueGlow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#3B82F6" />
      <stop offset="100%" stop-color="#60A5FA" />
    </linearGradient>

    <linearGradient id="greenGlow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#10B981" />
      <stop offset="100%" stop-color="#34D399" />
    </linearGradient>

    <linearGradient id="purpleGlow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#8B5CF6" />
      <stop offset="100%" stop-color="#A78BFA" />
    </linearGradient>

    <linearGradient id="amberGlow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#F59E0B" />
      <stop offset="100%" stop-color="#FBBF24" />
    </linearGradient>

    <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.5" />
    </filter>

    <!-- Arrow Marker -->
    <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#64748B" />
    </marker>
    <marker id="arrowGreen" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#10B981" />
    </marker>
  </defs>

  <!-- Background Layer -->
  <rect width="1600" height="1060" fill="url(#bgGrad)" />

  <!-- HEADER TITLE -->
  <g transform="translate(40, 35)">
    <text x="0" y="0" fill="#10B981" font-size="12" font-weight="800" letter-spacing="2" text-anchor="start">GOVERNMENT DIGITAL HEALTH RECORD &amp; AI CLINICAL INTAKE PLATFORM</text>
    <text x="0" y="26" fill="#FFFFFF" font-size="24" font-weight="900" letter-spacing="0.5">PLATFORM ARCHITECTURE &amp; SYSTEM FLOW OVERVIEW</text>
  </g>

  <!-- ==================== LEFT PANEL: TECH STACK ==================== -->
  <g transform="translate(40, 80)" filter="url(#shadow)">
    <rect width="420" height="940" rx="20" fill="url(#cardGrad)" stroke="#334155" stroke-width="1.5" />
    
    <!-- Title Header -->
    <rect x="20" y="20" width="380" height="42" rx="10" fill="#0F172A" stroke="#1E293B" />
    <text x="210" y="47" fill="#60A5FA" font-size="15" font-weight="800" letter-spacing="2" text-anchor="middle">⚙️ TECH STACK</text>

    <!-- Stack Item 1: Frontend -->
    <g transform="translate(20, 78)">
      <rect width="380" height="125" rx="12" fill="#1E293B" fill-opacity="0.6" stroke="#334155" />
      <circle cx="35" cy="35" r="16" fill="#3B82F6" fill-opacity="0.2" />
      <text x="35" y="40" fill="#60A5FA" font-size="16" text-anchor="middle">⚛️</text>
      <text x="62" y="38" fill="#60A5FA" font-size="14" font-weight="800">FRONTEND ARCHITECTURE</text>
      <text x="30" y="68" fill="#94A3B8" font-size="12 font-weight="500">• React 19 &amp; TypeScript (Strict Typing)</text>
      <text x="30" y="88" fill="#94A3B8" font-size="12" font-weight="500">• Tailwind CSS v4 &amp; Lucide UI System</text>
      <text x="30" y="108" fill="#94A3B8" font-size="12" font-weight="500">• Vite 8 Bundler &amp; Fast Refresh</text>
    </g>

    <!-- Stack Item 2: AI Engine -->
    <g transform="translate(20, 218)">
      <rect width="380" height="125" rx="12" fill="#1E293B" fill-opacity="0.6" stroke="#334155" />
      <circle cx="35" cy="35" r="16" fill="#10B981" fill-opacity="0.2" />
      <text x="35" y="40" fill="#34D399" font-size="16" text-anchor="middle">🤖</text>
      <text x="62" y="38" fill="#34D399" font-size="14" font-weight="800">CLINICAL AI ENGINE</text>
      <text x="30" y="68" fill="#94A3B8" font-size="12" font-weight="500">• AI OCR Prescription Reader &amp; Scanner</text>
      <text x="30" y="88" fill="#94A3B8" font-size="12" font-weight="500">• NLP Medication &amp; Dosage Entity Parser</text>
      <text x="30" y="108" fill="#94A3B8" font-size="12" font-weight="500">• Lab Report Extraction &amp; Confidence Metrics</text>
    </g>

    <!-- Stack Item 3: Auth & Identity -->
    <g transform="translate(20, 358)">
      <rect width="380" height="125" rx="12" fill="#1E293B" fill-opacity="0.6" stroke="#334155" />
      <circle cx="35" cy="35" r="16" fill="#8B5CF6" fill-opacity="0.2" />
      <text x="35" y="40" fill="#A78BFA" font-size="16" text-anchor="middle">🔑</text>
      <text x="62" y="38" fill="#A78BFA" font-size="14" font-weight="800">AUTHENTICATION &amp; IDENTITY</text>
      <text x="30" y="68" fill="#94A3B8" font-size="12" font-weight="500">• ABHA (Ayushman Bharat Digital Health ID)</text>
      <text x="30" y="88" fill="#94A3B8" font-size="12" font-weight="500">• Permanent UHID Identifier Integration</text>
      <text x="30" y="108" fill="#94A3B8" font-size="12" font-weight="500">• OTP Mobile Verification &amp; Role Gateways</text>
    </g>

    <!-- Stack Item 4: Database & State -->
    <g transform="translate(20, 498)">
      <rect width="380" height="125" rx="12" fill="#1E293B" fill-opacity="0.6" stroke="#334155" />
      <circle cx="35" cy="35" r="16" fill="#06B6D4" fill-opacity="0.2" />
      <text x="35" y="40" fill="#22D3EE" font-size="16" text-anchor="middle">💾</text>
      <text x="62" y="38" fill="#22D3EE" font-size="14" font-weight="800">DATA &amp; STATE MANAGEMENT</text>
      <text x="30" y="68" fill="#94A3B8" font-size="12" font-weight="500">• React Context API Reactive Store</text>
      <text x="30" y="88" fill="#94A3B8" font-size="12" font-weight="500">• IndexedDB / Local Storage Offline Cache</text>
      <text x="30" y="108" fill="#94A3B8" font-size="12" font-weight="500">• Structured Clinical EHR Profile Schema</text>
    </g>

    <!-- Stack Item 5: Security & Audit -->
    <g transform="translate(20, 638)">
      <rect width="380" height="125" rx="12" fill="#1E293B" fill-opacity="0.6" stroke="#334155" />
      <circle cx="35" cy="35" r="16" fill="#F59E0B" fill-opacity="0.2" />
      <text x="35" y="40" fill="#FBBF24" font-size="16" text-anchor="middle">🛡️</text>
      <text x="62" y="38" fill="#FBBF24" font-size="14" font-weight="800">SECURITY &amp; AUDIT</text>
      <text x="30" y="68" fill="#94A3B8" font-size="12" font-weight="500">• Doctor Verification Queue Hierarchy</text>
      <text x="30" y="88" fill="#94A3B8" font-size="12" font-weight="500">• Immutable Access Audit Consent Logs</text>
      <text x="30" y="108" fill="#94A3B8" font-size="12" font-weight="500">• Role-Based Access Control (RBAC)</text>
    </g>

    <!-- Stack Item 6: Deployment -->
    <g transform="translate(20, 778)">
      <rect width="380" height="135" rx="12" fill="#1E293B" fill-opacity="0.6" stroke="#334155" />
      <circle cx="35" cy="35" r="16" fill="#6366F1" fill-opacity="0.2" />
      <text x="35" y="40" fill="#818CF8" font-size="16" text-anchor="middle">☁️</text>
      <text x="62" y="38" fill="#818CF8" font-size="14" font-weight="800">DEPLOYMENT &amp; TOOLS</text>
      <text x="30" y="68" fill="#94A3B8" font-size="12" font-weight="500">• Production Optimized Vite Bundle</text>
      <text x="30" y="88" fill="#94A3B8" font-size="12" font-weight="500">• Oxlint Linter &amp; Code Assurance</text>
      <text x="30" y="108" fill="#94A3B8" font-size="12" font-weight="500">• Vercel / Cloud Infrastructure</text>
    </g>
  </g>

  <!-- ==================== TOP RIGHT PANEL: SYSTEM FLOW ==================== -->
  <g transform="translate(485, 80)" filter="url(#shadow)">
    <rect width="1075" height="450" rx="20" fill="url(#cardGrad)" stroke="#334155" stroke-width="1.5" />
    
    <!-- Section Title -->
    <rect x="25" y="20" width="1025" height="42" rx="10" fill="#0F172A" stroke="#1E293B" />
    <text x="537" y="47" fill="#34D399" font-size="15" font-weight="800" letter-spacing="2" text-anchor="middle">🔄 SYSTEM FLOW: PATIENT INTAKE TO DOCTOR CLINICAL VERIFICATION</text>

    <!-- 6 Flow Cards Row 1 (Steps 1, 2, 3) -->
    <!-- Step 1 -->
    <g transform="translate(45, 85)">
      <rect width="295" height="150" rx="16" fill="#0F172A" stroke="#3B82F6" stroke-width="1.5" />
      <circle cx="147" cy="40" r="24" fill="#3B82F6" fill-opacity="0.2" stroke="#3B82F6" stroke-width="1.5" />
      <text x="147" y="46" fill="#60A5FA" font-size="20" text-anchor="middle">📄</text>
      <text x="147" y="88" fill="#60A5FA" font-size="13" font-weight="800" text-anchor="middle">1. CITIZEN UPLOAD</text>
      <text x="147" y="110" fill="#94A3B8" font-size="11" text-anchor="middle">Patient uploads prescription</text>
      <text x="147" y="126" fill="#94A3B8" font-size="11" text-anchor="middle">or lab scan via portal/kiosk</text>
    </g>

    <line x1="340" y1="160" x2="385" y2="160" stroke="#3B82F6" stroke-width="2.5" marker-end="url(#arrow)" />

    <!-- Step 2 -->
    <g transform="translate(390, 85)">
      <rect width="295" height="150" rx="16" fill="#0F172A" stroke="#8B5CF6" stroke-width="1.5" />
      <circle cx="147" cy="40" r="24" fill="#8B5CF6" fill-opacity="0.2" stroke="#8B5CF6" stroke-width="1.5" />
      <text x="147" y="46" fill="#A78BFA" font-size="20" text-anchor="middle">🤖</text>
      <text x="147" y="88" fill="#A78BFA" font-size="13" font-weight="800" text-anchor="middle">2. AI OCR PARSING</text>
      <text x="147" y="110" fill="#94A3B8" font-size="11" text-anchor="middle">AI extracts medication, dosage,</text>
      <text x="147" y="126" fill="#94A3B8" font-size="11" text-anchor="middle">allergies &amp; medical diagnosis</text>
    </g>

    <line x1="685" y1="160" x2="730" y2="160" stroke="#8B5CF6" stroke-width="2.5" marker-end="url(#arrow)" />

    <!-- Step 3 -->
    <g transform="translate(735, 85)">
      <rect width="295" height="150" rx="16" fill="#0F172A" stroke="#F59E0B" stroke-width="1.5" />
      <circle cx="147" cy="40" r="24" fill="#F59E0B" fill-opacity="0.2" stroke="#F59E0B" stroke-width="1.5" />
      <text x="147" y="46" fill="#FBBF24" font-size="20" text-anchor="middle">⏳</text>
      <text x="147" y="88" fill="#FBBF24" font-size="13" font-weight="800" text-anchor="middle">3. PENDING QUEUE</text>
      <text x="147" y="110" fill="#94A3B8" font-size="11" text-anchor="middle">Stored with 🟡 Pending</text>
      <text x="147" y="126" fill="#94A3B8" font-size="11" text-anchor="middle">verification flag for doctor</text>
    </g>

    <!-- Connecting Path from Step 3 to Step 4 -->
    <path d="M 882 235 L 882 255 L 192 255 L 192 270" fill="none" stroke="#F59E0B" stroke-width="2.5" stroke-dasharray="6,4" marker-end="url(#arrow)" />

    <!-- 6 Flow Cards Row 2 (Steps 4, 5, 6) -->
    <!-- Step 4 -->
    <g transform="translate(45, 275)">
      <rect width="295" height="150" rx="16" fill="#0F172A" stroke="#06B6D4" stroke-width="1.5" />
      <circle cx="147" cy="40" r="24" fill="#06B6D4" fill-opacity="0.2" stroke="#06B6D4" stroke-width="1.5" />
      <text x="147" y="46" fill="#22D3EE" font-size="20" text-anchor="middle">🔔</text>
      <text x="147" y="88" fill="#22D3EE" font-size="13" font-weight="800" text-anchor="middle">4. DOCTOR ALERT</text>
      <text x="147" y="110" fill="#94A3B8" font-size="11" text-anchor="middle">Clinician receives OPD queue</text>
      <text x="147" y="126" fill="#94A3B8" font-size="11" text-anchor="middle">notification with patient data</text>
    </g>

    <line x1="340" y1="350" x2="385" y2="350" stroke="#06B6D4" stroke-width="2.5" marker-end="url(#arrow)" />

    <!-- Step 5 -->
    <g transform="translate(390, 275)">
      <rect width="295" height="150" rx="16" fill="#0F172A" stroke="#6366F1" stroke-width="1.5" />
      <circle cx="147" cy="40" r="24" fill="#6366F1" fill-opacity="0.2" stroke="#6366F1" stroke-width="1.5" />
      <text x="147" y="46" fill="#818CF8" font-size="20" text-anchor="middle">🩺</text>
      <text x="147" y="88" fill="#818CF8" font-size="13" font-weight="800" text-anchor="middle">5. CLINICAL VERIFY</text>
      <text x="147" y="110" fill="#94A3B8" font-size="11" text-anchor="middle">Physician inspects, verifies</text>
      <text x="147" y="126" fill="#94A3B8" font-size="11" text-anchor="middle">or updates extracted items</text>
    </g>

    <line x1="685" y1="350" x2="730" y2="350" stroke="#10B981" stroke-width="2.5" marker-end="url(#arrowGreen)" />

    <!-- Step 6 -->
    <g transform="translate(735, 275)">
      <rect width="295" height="150" rx="16" fill="#0F172A" stroke="#10B981" stroke-width="2" />
      <circle cx="147" cy="40" r="24" fill="#10B981" fill-opacity="0.2" stroke="#10B981" stroke-width="1.5" />
      <text x="147" y="46" fill="#34D399" font-size="20" text-anchor="middle">🟢</text>
      <text x="147" y="88" fill="#34D399" font-size="13" font-weight="800" text-anchor="middle">6. EHR RECORD UPDATED</text>
      <text x="147" y="110" fill="#94A3B8" font-size="11" text-anchor="middle">Status changes to Verified</text>
      <text x="147" y="126" fill="#94A3B8" font-size="11" text-anchor="middle">across national ABHA profile</text>
    </g>
  </g>

  <!-- ==================== MIDDLE RIGHT PANEL: KEY ROLES ==================== -->
  <g transform="translate(485, 550)" filter="url(#shadow)">
    <rect width="1075" height="270" rx="20" fill="url(#cardGrad)" stroke="#334155" stroke-width="1.5" />
    
    <!-- Section Title -->
    <rect x="25" y="18" width="1025" height="40" rx="10" fill="#0F172A" stroke="#1E293B" />
    <text x="537" y="43" fill="#A78BFA" font-size="15" font-weight="800" letter-spacing="2" text-anchor="middle">👥 KEY STAKEHOLDER ROLES &amp; RESPONSIBILITIES</text>

    <g transform="translate(25, 75)">
      <!-- Role 1: Citizen -->
      <g transform="translate(0, 0)">
        <rect width="240" height="170" rx="14" fill="#0F172A" stroke="#3B82F6" stroke-width="1" />
        <circle cx="120" cy="38" r="20" fill="#3B82F6" fill-opacity="0.2" />
        <text x="120" y="44" fill="#60A5FA" font-size="18" text-anchor="middle">👤</text>
        <text x="120" y="76" fill="#60A5FA" font-size="13" font-weight="800" text-anchor="middle">CITIZEN / PATIENT</text>
        <text x="18" y="102" fill="#94A3B8" font-size="11">• Upload health records</text>
        <text x="18" y="122" fill="#94A3B8" font-size="11">• View verified timeline</text>
        <text x="18" y="142" fill="#94A3B8" font-size="11">• Manage consent logs</text>
      </g>

      <!-- Role 2: Doctor -->
      <g transform="translate(260, 0)">
        <rect width="240" height="170" rx="14" fill="#0F172A" stroke="#10B981" stroke-width="1" />
        <circle cx="120" cy="38" r="20" fill="#10B981" fill-opacity="0.2" />
        <text x="120" y="44" fill="#34D399" font-size="18" text-anchor="middle">🩺</text>
        <text x="120" y="76" fill="#34D399" font-size="13" font-weight="800" text-anchor="middle">DOCTOR / CLINICIAN</text>
        <text x="18" y="102" fill="#94A3B8" font-size="11">• Review AI OCR outputs</text>
        <text x="18" y="122" fill="#94A3B8" font-size="11">• Confirm patient claims</text>
        <text x="18" y="142" fill="#94A3B8" font-size="11">• Issue digital prescriptions</text>
      </g>

      <!-- Role 3: Kiosk -->
      <g transform="translate(520, 0)">
        <rect width="240" height="170" rx="14" fill="#0F172A" stroke="#F59E0B" stroke-width="1" />
        <circle cx="120" cy="38" r="20" fill="#F59E0B" fill-opacity="0.2" />
        <text x="120" y="44" fill="#FBBF24" font-size="18" text-anchor="middle">🖥️</text>
        <text x="120" y="76" fill="#FBBF24" font-size="13" font-weight="800" text-anchor="middle">KIOSK &amp; OPERATOR</text>
        <text x="18" y="102" fill="#94A3B8" font-size="11">• Touch &amp; voice PHC intake</text>
        <text x="18" y="122" fill="#94A3B8" font-size="11">• Fast citizen registration</text>
        <text x="18" y="142" fill="#94A3B8" font-size="11">• On-site document scanning</text>
      </g>

      <!-- Role 4: Admin -->
      <g transform="translate(780, 0)">
        <rect width="245" height="170" rx="14" fill="#0F172A" stroke="#8B5CF6" stroke-width="1" />
        <circle cx="122" cy="38" r="20" fill="#8B5CF6" fill-opacity="0.2" />
        <text x="122" y="44" fill="#A78BFA" font-size="18" text-anchor="middle">🏛️</text>
        <text x="122" y="76" fill="#A78BFA" font-size="13" font-weight="800" text-anchor="middle">GOVERNMENT ADMIN</text>
        <text x="18" y="102" fill="#94A3B8" font-size="11">• Monitor system usage</text>
        <text x="18" y="122" fill="#94A3B8" font-size="11">• Inspect security consent</text>
        <text x="18" y="142" fill="#94A3B8" font-size="11">• Manage RBAC &amp; analytics</text>
      </g>
    </g>
  </g>

  <!-- ==================== BOTTOM RIGHT PANEL: DATA FLOW OVERVIEW ==================== -->
  <g transform="translate(485, 840)" filter="url(#shadow)">
    <rect width="1075" height="180" rx="20" fill="url(#cardGrad)" stroke="#334155" stroke-width="1.5" />
    
    <!-- Section Title -->
    <rect x="25" y="16" width="1025" height="38" rx="10" fill="#0F172A" stroke="#1E293B" />
    <text x="537" y="40" fill="#22D3EE" font-size="14" font-weight="800" letter-spacing="2" text-anchor="middle">⚡ DATA FLOW OVERVIEW PIPELINE</text>

    <!-- Pipeline Steps -->
    <g transform="translate(35, 75)">
      <!-- Stage 1 -->
      <rect x="0" y="0" width="160" height="65" rx="12" fill="#0F172A" stroke="#3B82F6" stroke-width="1" />
      <text x="80" y="28" fill="#60A5FA" font-size="12" font-weight="800" text-anchor="middle">📄 Report Created</text>
      <text x="80" y="48" fill="#94A3B8" font-size="10" text-anchor="middle">(Document Uploaded)</text>

      <line x1="168" y1="32" x2="202" y2="32" stroke="#64748B" stroke-width="2" marker-end="url(#arrow)" />

      <!-- Stage 2 -->
      <rect x="210" y="0" width="160" height="65" rx="12" fill="#0F172A" stroke="#8B5CF6" stroke-width="1" />
      <text x="290" y="28" fill="#A78BFA" font-size="12" font-weight="800" text-anchor="middle">🔍 AI OCR Parsing</text>
      <text x="290" y="48" fill="#94A3B8" font-size="10" text-anchor="middle">(Entities Extracted)</text>

      <line x1="378" y1="32" x2="412" y2="32" stroke="#64748B" stroke-width="2" marker-end="url(#arrow)" />

      <!-- Stage 3 -->
      <rect x="420" y="0" width="160" height="65" rx="12" fill="#0F172A" stroke="#F59E0B" stroke-width="1" />
      <text x="500" y="28" fill="#FBBF24" font-size="12" font-weight="800" text-anchor="middle">⏳ Pending Queue</text>
      <text x="500" y="48" fill="#94A3B8" font-size="10" text-anchor="middle">(Flagged Unverified)</text>

      <line x1="588" y1="32" x2="622" y2="32" stroke="#64748B" stroke-width="2" marker-end="url(#arrow)" />

      <!-- Stage 4 -->
      <rect x="630" y="0" width="160" height="65" rx="12" fill="#0F172A" stroke="#6366F1" stroke-width="1" />
      <text x="710" y="28" fill="#818CF8" font-size="12" font-weight="800" text-anchor="middle">👨‍⚕️ Clinical Review</text>
      <text x="710" y="48" fill="#94A3B8" font-size="10" text-anchor="middle">(Doctor Verification)</text>

      <line x1="798" y1="32" x2="832" y2="32" stroke="#10B981" stroke-width="2" marker-end="url(#arrowGreen)" />

      <!-- Stage 5 -->
      <rect x="840" y="0" width="165" height="65" rx="12" fill="#0F172A" stroke="#10B981" stroke-width="1.5" />
      <text x="922" y="28" fill="#34D399" font-size="12" font-weight="800" text-anchor="middle">🟢 Verified ABHA Sync</text>
      <text x="922" y="48" fill="#94A3B8" font-size="10" text-anchor="middle">(EHR Fact &amp; Audit Log)</text>
    </g>
  </g>
</svg>`;

// Write SVG file to workspace root and artifacts folder
const targetPath1 = 'e:\\PROJECTS\\Government Digital Health Record & AI Clinical Intake Platform\\system_flow_techstack.svg';
const targetPath2 = 'C:\\Users\\Lenovo\\.gemini\\antigravity-ide\\brain\\a1dc7d21-261a-4881-9301-a109e7ee5dbf\\system_flow_techstack.svg';

fs.writeFileSync(targetPath1, svgContent, 'utf8');
fs.writeFileSync(targetPath2, svgContent, 'utf8');
console.log('SVG generated successfully at:', targetPath1, targetPath2);
