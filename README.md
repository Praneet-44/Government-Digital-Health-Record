# Uyire Kavalan (Government Digital Health Record & AI Clinical Intake Platform)

**Uyire Kavalan** is a next-generation AI-powered government health record, multilingual intake, and OPD clinical reasoning platform integrated with **Google MedGemma**, **Sarvam AI**, India **DPDP Act 2023** compliance, **National Medical Commission (NMC)** clinical guidelines, and **HL7 FHIR R4** audit logging.

---

## 🌟 Key Features

1. **Google MedGemma Clinical Reasoning Engine (`medgemma-7b-it`)**:
   - Specialized medical AI symptom triage, vital assessment, differential diagnosis, and physician OPD action planning under non-prescriptive NMC guidelines.

2. **Sarvam.ai Multilingual Localization (22 Scheduled Indian Languages)**:
   - Speech-to-Text (Saaras STT) & Text-to-Speech (Bulbul TTS) supporting regional speech, code-mixed Hinglish/Tanglish, and 22 scheduled Indian languages.

3. **India DPDP Act 2023 PHI Anonymization Pipeline**:
   - Automatic sanitization of Patient Health Information (names, ABHA ID, Aadhaar, mobile, address) into encrypted tokens (`[PATIENT_TOKEN_8841]`) prior to AI inference.

4. **Mandatory NMC Compliance Disclaimer**:
   - Programmatic injection of the National Medical Commission (NMC) mandatory un-editable disclaimer across all AI outputs.

5. **Live Online Medical Web Search Grounding**:
   - Real-time online medical web search citations (NMC guidelines, ICMR treatment workflows, WHO guidelines, PubMed literature) integrated with Google Search Grounding.

6. **FHIR R4 Compliant Audit Event Trail**:
   - HL7 FHIR R4 `AuditEvent` JSON logging tracking purpose of use (`TREAT`), tokenized citizen references, agent chains, and SHA-256 entity hashes.

---

## 🍃 MongoDB & Database Connection Setup

### Detailed Guide for Step 2 in MongoDB Compass

If you are connecting **MongoDB Compass** and your application to **MongoDB Atlas Cloud Database** instead of local `localhost:27017`:

1. **Enable Editing**:
   - In MongoDB Compass, click the **`Edit Connection String`** toggle switch at the top right of the URI input box to turn it **ON**.

2. **Replace the URI Text**:
   - Clear out `mongodb://localhost:27017/govhealth`.
   - Paste your MongoDB Atlas URI connection string:
     ```text
     mongodb+srv://<username>:<password>@cluster0.mongodb.net/govhealth
     ```
     *(Replace `<username>` and `<password>` with your database user credentials)*.

3. **Save & Connect**:
   - Click the green **`Save & Connect`** button at the bottom right.

4. **Configure Environment Variables (`.env`)**:
   - Add your connection string to `.env`:
     ```env
     VITE_MEDGEMMA_API_KEY=your_google_ai_key
     VITE_GEMINI_API_KEY=your_google_ai_key
     VITE_SARVAM_API_KEY=your_sarvam_key

     MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/govhealth
     MONGODB_DB=govhealth
     ```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation
```bash
npm install
```

### Running Development Server
```bash
npm run dev
```

### Production Build
```bash
npm run build
```
