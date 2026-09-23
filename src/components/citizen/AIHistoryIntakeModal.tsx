import React, { useState } from 'react';
import {
  Bot,
  Mic,
  Send,
  Lock,
  FileText,
  Sparkles,
  Camera,
  Image as ImageIcon,
  Scan,
  Wand2,
  Check,
  ArrowRight,
  ShieldCheck,
  Globe,
  ExternalLink
} from 'lucide-react';
import { useHealthRecord } from '../../context/HealthRecordContext.tsx';
import { evaluateClinicalWithMedGemma, type WebSearchSource, NMC_MANDATORY_DISCLAIMER } from '../../services/medGemmaService.ts';
import { SarvamVoiceAssistantModal } from './SarvamVoiceAssistantModal.tsx';

export interface ImageAnalysisResult {
  id: string;
  presetTitle: string;
  detectedType: 'handwritten_prescription' | 'printed_lab_report' | 'hybrid_clinical_note';
  imageUrl: string;
  printedConfidence: number;
  handwritingConfidence: number;
  printedText: string;
  handwrittenText: string;
  extractedMeds: string;
  extractedDosage: string;
  extractedDoctor: string;
  extractedDiagnosis: string;
}

interface ChatMessage {
  id: string;
  role: 'ai' | 'user';
  text: string;
  imageResult?: ImageAnalysisResult;
  processingStep?: 'preprocessing' | 'printed_ocr' | 'handwriting_ai' | 'synthesizing' | 'completed';
  isSavedToLocker?: boolean;
  webSources?: WebSearchSource[];
}

interface AIHistoryIntakeModalProps {
  onClose: () => void;
}

const PRESET_DOCUMENTS: ImageAnalysisResult[] = [
  {
    id: 'preset-1',
    presetTitle: '✍️ Doctor Handwritten Prescription',
    detectedType: 'handwritten_prescription',
    imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=500&auto=format&fit=crop&q=60',
    printedConfidence: 99,
    handwritingConfidence: 95,
    printedText: 'DISTRICT GOVERNMENT HOSPITAL • GOV-IND-2026-88412 • Date: 18/09/2026',
    handwrittenText: 'Rx: Tab. Metformin 500mg BD after food. Tab. Telmisartan 40mg OD morning. Avoid high sodium diet. Review in 14 days. - Dr. R. K. Sharma',
    extractedMeds: 'Metformin 500mg (BD), Telmisartan 40mg (OD)',
    extractedDosage: 'Metformin twice daily after meals; Telmisartan once daily morning',
    extractedDoctor: 'Dr. R. K. Sharma (MD)',
    extractedDiagnosis: 'Hypertension & Type-2 Diabetes Regular Consultation'
  },
  {
    id: 'preset-2',
    presetTitle: '🖨️ Printed Pathology Lab Report',
    detectedType: 'printed_lab_report',
    imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=500&auto=format&fit=crop&q=60',
    printedConfidence: 100,
    handwritingConfidence: 92,
    printedText: 'CITY CENTRAL DIAGNOSTIC LAB • HbA1c: 7.2% (Elevated) • Fasting Glucose: 138 mg/dL • Serum Creatinine: 0.9 mg/dL',
    handwrittenText: 'Lab Tech Cursive Note: Repeat HbA1c in 90 days. Sample re-verified on Automated Analyzer #4.',
    extractedMeds: 'Glycemic Control Adjustment Advised',
    extractedDosage: 'Consult Physician for Dosage Re-calibration',
    extractedDoctor: 'Pathology Chief Technician',
    extractedDiagnosis: 'Elevated Fasting Glucose (138 mg/dL) & HbA1c (7.2%)'
  },
  {
    id: 'preset-3',
    presetTitle: '📋 Hybrid Triage Note (Printed + Handwritten)',
    detectedType: 'hybrid_clinical_note',
    imageUrl: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=500&auto=format&fit=crop&q=60',
    printedConfidence: 98,
    handwritingConfidence: 96,
    printedText: 'PRIMARY HEALTH CENTRE (PHC) CLINICAL SLIP • Patient: Praneet Kumar (ABHA: 91-4829-1092-4410)',
    handwrittenText: 'Rx: Inj. Diclofenac 75mg IM stat. Tab. Pantoprazole 40mg 1x daily. Patient reports severe right flank pain starting yesterday.',
    extractedMeds: 'Diclofenac 75mg IM, Pantoprazole 40mg',
    extractedDosage: 'Diclofenac IM single dose immediately; Pantoprazole 40mg daily morning',
    extractedDoctor: 'Dr. Priya Nair (PHC)',
    extractedDiagnosis: 'Acute Right Flank Pain / Suspected Renal Colic'
  }
];

export const AIHistoryIntakeModal: React.FC<AIHistoryIntakeModalProps> = ({ onClose }) => {
  const { t, uploadDocument, patient, addFhirAuditLog } = useHealthRecord();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      role: 'ai',
      text: `💡 Hello! I am your Public AI Health Awareness Assistant. Powered by Google MedGemma (medgemma-7b-it) clinical reasoning, Sarvam.ai (Saaras STT & 22 Indian languages) and Vision OCR. Speak or type in native languages (Tamil, Hindi, Hinglish, Tanglish, Bengali, Telugu) or attach paper prescriptions for instant analysis!\n\n⚠️ ${NMC_MANDATORY_DISCLAIMER}`
    }
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [showSarvamModal, setShowSarvamModal] = useState(false);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    const userMsgObj: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      text: userMsg
    };
    const newMsgs = [...messages, userMsgObj];
    setMessages(newMsgs);
    setInput('');

    // Call Google MedGemma Clinical Engine with DPDP PHI Anonymization & Online Web Search Grounding
    const res = await evaluateClinicalWithMedGemma(userMsg, patient);
    addFhirAuditLog(res.fhirAuditLog);

    setMessages([
      ...newMsgs,
      {
        id: `msg-${Date.now() + 1}`,
        role: 'ai',
        text: res.formattedResponseText,
        webSources: res.webSearchSources
      }
    ]);
  };

  const handleSelectImagePreset = (preset: ImageAnalysisResult) => {
    setShowImagePicker(false);
    const userMsgId = `msg-usr-${Date.now()}`;
    const aiMsgId = `msg-ai-${Date.now()}`;

    const userMsg: ChatMessage = {
      id: userMsgId,
      role: 'user',
      text: `📷 Uploaded Medical Image: ${preset.presetTitle}`
    };

    const initialAiMsg: ChatMessage = {
      id: aiMsgId,
      role: 'ai',
      text: '📸 Initiating Vision Image Processing Engine...',
      imageResult: preset,
      processingStep: 'preprocessing'
    };

    const updatedList = [...messages, userMsg, initialAiMsg];
    setMessages(updatedList);

    // Step 1 -> Step 2
    setTimeout(() => {
      setMessages(prev =>
        prev.map(m => (m.id === aiMsgId ? { ...m, processingStep: 'printed_ocr' } : m))
      );
    }, 700);

    // Step 2 -> Step 3
    setTimeout(() => {
      setMessages(prev =>
        prev.map(m => (m.id === aiMsgId ? { ...m, processingStep: 'handwriting_ai' } : m))
      );
    }, 1400);

    // Step 3 -> Completed
    setTimeout(() => {
      setMessages(prev =>
        prev.map(m =>
          m.id === aiMsgId
            ? {
                ...m,
                processingStep: 'completed',
                text: `✅ Image Analysis Completed! Recognized both **Printed Typography** (${preset.printedConfidence}%) and **Doctor Handwriting** (${preset.handwritingConfidence}%).`
              }
            : m
        )
      );
    }, 2200);
  };

  const handleSaveExtractedToLocker = (msgId: string, result: ImageAnalysisResult) => {
    uploadDocument(result.presetTitle, result.detectedType === 'printed_lab_report' ? 'lab_report' : 'prescription', {
      imageUrl: result.imageUrl,
      detectedDocumentType: result.detectedType,
      printedText: result.printedText,
      handwrittenNotesText: result.handwrittenText,
      medication: result.extractedMeds,
      dosage: result.extractedDosage,
      doctor: result.extractedDoctor,
      diagnosis: result.extractedDiagnosis,
      handwritingConfidence: result.handwritingConfidence,
      printedConfidence: result.printedConfidence
    });
    setMessages(prev =>
      prev.map(m => (m.id === msgId ? { ...m, isSavedToLocker: true } : m))
    );
  };

  const toggleVoice = () => {
    setIsListening(true);
    setTimeout(() => {
      setInput('What are healthy ways to manage mild fever at home?');
      setIsListening(false);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border-2 border-[#1B5E20] flex flex-col h-[650px] animate-fade-in relative">
        {/* Header */}
        <div className="flex justify-between items-start pb-3 border-b border-[#C8E6C9]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1B5E20] flex items-center justify-center font-bold text-white shadow-md">
              <Sparkles className="w-6 h-6 text-[#66BB6A]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#1B5E20] font-display flex items-center gap-2">
                Google MedGemma Clinical Engine & Vision Assistant
              </h3>
              <p className="text-xs text-[#38523C] flex items-center gap-1.5 font-medium">
                <Wand2 className="w-3.5 h-3.5 text-[#2E7D32]" />
                Powered by medgemma-7b-it • DPDP Act 2023 PHI Anonymizer • Sarvam STT
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-black font-bold text-xl px-2">✕</button>
        </div>

        {/* Dynamic Mode Notification Banner */}
        <div className="my-3 p-2.5 rounded-xl text-xs font-bold bg-[#E8F5E9] text-[#1B5E20] border border-[#A5D6A7] flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#1B5E20] shrink-0" />
            <span>🛡️ India DPDP Act 2023 PHI Anonymized (`[PATIENT_TOKEN_8841]`)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-extrabold bg-[#1B5E20] text-white px-2 py-0.5 rounded border border-[#A5D6A7]">
              Google MedGemma 7B
            </span>
            <span className="text-[10px] font-extrabold bg-white text-[#1B5E20] px-2 py-0.5 rounded border border-[#C8E6C9]">
              NMC Compliant
            </span>
          </div>
        </div>

        {/* Chat Body */}
        <div className="flex-1 overflow-y-auto py-2 space-y-3 pr-1">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[88%] p-3.5 rounded-2xl text-xs leading-relaxed shadow-sm ${
                  m.role === 'user'
                    ? 'bg-[#1B5E20] text-white rounded-tr-none'
                    : 'bg-[#E8F5E9] text-[#122415] border border-[#A5D6A7] rounded-tl-none'
                }`}
              >
                <p>{m.text}</p>

                {/* Online Medical Web Search Grounding Citations */}
                {m.webSources && m.webSources.length > 0 && (
                  <div className="mt-3 p-3 bg-white rounded-xl border border-[#A5D6A7] space-y-2 text-[#122415]">
                    <div className="flex justify-between items-center border-b border-[#E0E0E0] pb-1.5">
                      <span className="font-extrabold text-[11px] text-[#1B5E20] flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5 text-[#2E7D32]" /> Live Online Medical Web Search Sources
                      </span>
                      <span className="text-[9px] font-bold bg-[#E8F5E9] text-[#1B5E20] px-2 py-0.5 rounded">
                        Google Search Grounded
                      </span>
                    </div>

                    <div className="space-y-1.5 text-[10.5px]">
                      {m.webSources.map((src, i) => (
                        <div key={i} className="p-2 bg-[#F8FAF8] rounded-lg border border-[#E8F5E9] space-y-0.5">
                          <a
                            href={src.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold text-[#1D4ED8] hover:underline flex items-center gap-1"
                          >
                            <span>{src.title}</span>
                            <ExternalLink className="w-3 h-3 text-[#1D4ED8] shrink-0" />
                          </a>
                          <p className="text-[#38523C] text-[10px]">{src.snippet}</p>
                          <span className="text-[9px] font-mono text-gray-500 block">Source: {src.source}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Processing Steps Animation */}
                {m.processingStep && m.processingStep !== 'completed' && (
                  <div className="mt-3 p-3 bg-white/90 rounded-xl border border-[#A5D6A7] space-y-2 text-[#122415]">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#1B5E20]">
                      <Scan className="w-4 h-4 text-[#2E7D32] animate-spin" />
                      <span>AI Image Vision Engine Processing...</span>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                      <div className={`p-1.5 rounded flex items-center gap-1 ${
                        m.processingStep === 'preprocessing' ? 'bg-[#DC2626] text-white animate-pulse' : 'bg-[#E8F5E9] text-[#1B5E20]'
                      }`}>
                        <span>1. Image Preprocessing</span>
                      </div>
                      <div className={`p-1.5 rounded flex items-center gap-1 ${
                        m.processingStep === 'printed_ocr' ? 'bg-[#1D4ED8] text-white animate-pulse' : 'bg-[#E8F5E9] text-[#1B5E20]'
                      }`}>
                        <span>2. Printed Text OCR</span>
                      </div>
                      <div className={`p-1.5 rounded flex items-center gap-1 ${
                        m.processingStep === 'handwriting_ai' ? 'bg-[#7C3AED] text-white animate-pulse' : 'bg-[#E8F5E9] text-[#1B5E20]'
                      }`}>
                        <span>3. Handwriting Neural Net</span>
                      </div>
                      <div className={`p-1.5 rounded flex items-center gap-1 ${
                        m.processingStep === 'synthesizing' ? 'bg-[#059669] text-white animate-pulse' : 'bg-[#E8F5E9] text-[#1B5E20]'
                      }`}>
                        <span>4. Entity Synthesis</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Completed Image Result Card */}
                {m.imageResult && m.processingStep === 'completed' && (
                  <div className="mt-3 p-3.5 bg-white rounded-xl border-2 border-[#66BB6A] text-slate-800 space-y-3 shadow-md">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <div className="flex items-center gap-2">
                        <Camera className="w-4 h-4 text-[#1B5E20]" />
                        <span className="font-extrabold text-xs text-[#1B5E20]">{m.imageResult.presetTitle}</span>
                      </div>
                      <span className="text-[10px] font-bold bg-[#E8F5E9] text-[#1B5E20] px-2 py-0.5 rounded border border-[#A5D6A7]">
                        Dual OCR Engine
                      </span>
                    </div>

                    {/* Confidence Scores */}
                    <div className="flex gap-2">
                      <div className="flex-1 bg-[#F0FDF4] p-2 rounded-lg border border-[#BBF7D0]">
                        <span className="text-[9px] font-bold text-[#166534] uppercase block">🖨️ Printed Text OCR</span>
                        <span className="text-xs font-extrabold text-[#15803D]">{m.imageResult.printedConfidence}% Confidence</span>
                      </div>
                      <div className="flex-1 bg-[#F5F3FF] p-2 rounded-lg border border-[#DDD6FE]">
                        <span className="text-[9px] font-bold text-[#6B21A8] uppercase block">✍️ Handwriting AI Net</span>
                        <span className="text-xs font-extrabold text-[#7E22CE]">{m.imageResult.handwritingConfidence}% Confidence</span>
                      </div>
                    </div>

                    {/* Breakdown Sections */}
                    <div className="space-y-2 text-[11px]">
                      <div className="bg-[#F8FAFC] p-2 rounded-lg border border-[#E2E8F0]">
                        <span className="font-bold text-[#334155] block">🖨️ Extracted Printed Hospital Text:</span>
                        <p className="text-[#475569] font-mono text-[10.5px] mt-0.5">{m.imageResult.printedText}</p>
                      </div>

                      <div className="bg-[#FAF5FF] p-2 rounded-lg border border-[#F3E8FF]">
                        <span className="font-bold text-[#6B21A8] block">✍️ Recognized Doctor Handwriting & Notes:</span>
                        <p className="text-[#7E22CE] italic text-[11px] mt-0.5">"{m.imageResult.handwrittenText}"</p>
                      </div>

                      <div className="bg-[#EFF6FF] p-2.5 rounded-lg border border-[#BFDBFE] space-y-1">
                        <span className="font-bold text-[#1D4ED8] block">🧠 Clinical Findings Extracted:</span>
                        <p className="text-[#1E40AF]"><strong>Meds:</strong> {m.imageResult.extractedMeds}</p>
                        <p className="text-[#1E40AF]"><strong>Dosage:</strong> {m.imageResult.extractedDosage}</p>
                        <p className="text-[#1E40AF]"><strong>Physician:</strong> {m.imageResult.extractedDoctor}</p>
                        <p className="text-[#1E40AF]"><strong>Diagnosis:</strong> {m.imageResult.extractedDiagnosis}</p>
                      </div>
                    </div>

                    {/* Interactive Action Buttons */}
                    <div className="pt-2 border-t border-gray-100 flex justify-end">
                      <button
                        onClick={() => handleSaveExtractedToLocker(m.id, m.imageResult!)}
                        disabled={m.isSavedToLocker}
                        className={`w-full py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                          m.isSavedToLocker
                            ? 'bg-[#EFF6FF] text-[#1D4ED8] cursor-default'
                            : 'bg-[#1B5E20] text-white hover:bg-[#123814]'
                        }`}
                      >
                        {m.isSavedToLocker ? (
                          <><Check className="w-4 h-4 text-[#66BB6A]" /> Saved to Permanent Document Locker</>
                        ) : (
                          <><FileText className="w-4 h-4 text-[#66BB6A]" /> Save Extracted Document to Locker</>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Image Presets Dropdown */}
        {showImagePicker && (
          <div className="absolute bottom-20 left-6 right-6 bg-white p-4 rounded-2xl shadow-2xl border-2 border-[#1B5E20] z-20 animate-fade-in space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="font-extrabold text-xs text-[#1B5E20] flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#2E7D32]" /> Select Medical Image to Test Handwriting & Text OCR
              </h4>
              <button onClick={() => setShowImagePicker(false)} className="text-xs text-gray-500 hover:text-black font-bold">✕</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
              {PRESET_DOCUMENTS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handleSelectImagePreset(preset)}
                  className="p-3 bg-[#E8F5E9] border border-[#A5D6A7] hover:border-[#1B5E20] rounded-xl text-left hover:scale-[1.02] transition-all flex flex-col justify-between group shadow-sm"
                >
                  <div>
                    <span className="text-[10px] font-extrabold bg-[#1B5E20] text-white px-2 py-0.5 rounded block w-max mb-1.5">
                      {preset.detectedType.replace('_', ' ').toUpperCase()}
                    </span>
                    <h5 className="font-bold text-xs text-[#122415] group-hover:text-[#1B5E20]">{preset.presetTitle}</h5>
                    <p className="text-[10px] text-[#38523C] mt-1 line-clamp-2">"{preset.handwrittenText}"</p>
                  </div>
                  <div className="mt-2 text-[10px] font-extrabold text-[#2E7D32] flex items-center gap-1 pt-1 border-t border-[#C8E6C9]">
                    Process Image <ArrowRight className="w-3 h-3" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Footer Controls */}
        <div className="pt-2 border-t border-[#C8E6C9] mt-2 space-y-2">
          <form onSubmit={handleSend} className="flex gap-2">
            <button
              type="button"
              onClick={() => setShowImagePicker(!showImagePicker)}
              className={`p-2.5 rounded-xl border flex items-center gap-1.5 text-xs font-bold transition-all ${
                showImagePicker ? 'bg-[#1B5E20] text-white border-[#1B5E20]' : 'bg-[#E8F5E9] text-[#1B5E20] border-[#C8E6C9] hover:bg-[#A5D6A7]'
              }`}
              title="Upload / Select Medical Image for OCR & Handwriting Analysis"
            >
              <Camera className="w-4 h-4 text-[#66BB6A]" />
              <span className="hidden sm:inline">Upload Image</span>
            </button>

            <button
              type="button"
              onClick={() => setShowSarvamModal(true)}
              className="p-2.5 rounded-xl border bg-[#1B5E20] text-white border-[#1B5E20] hover:bg-[#27702C] transition-all flex items-center gap-1 text-xs font-bold shadow"
              title="Sarvam.ai Speech-to-Text & Voice Assistant (22 Indian Languages)"
            >
              <Mic className="w-4 h-4 text-[#66BB6A]" />
              <span className="hidden md:inline text-[11px]">Sarvam Voice</span>
            </button>

            <input
              type="text"
              placeholder="Ask health question, type in regional script/Tanglish, or upload image..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-3 py-2 border border-[#C8E6C9] rounded-xl text-xs focus:outline-none focus:border-[#1B5E20]"
            />

            <button
              type="submit"
              className="btn btn-primary text-xs px-4"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          <div className="bg-[#E8F5E9] p-2 rounded-xl text-[11px] text-[#1B5E20] flex items-center justify-between border border-[#A5D6A7]">
            <span className="font-semibold flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-[#1B5E20]" />
              Sarvam AI (22 Indian Languages) & Vision OCR Active • Private to Citizen
            </span>
            <button onClick={onClose} className="text-[#1B5E20] font-bold underline hover:text-[#123814]">
              Close Chat
            </button>
          </div>
        </div>
      </div>

      {showSarvamModal && (
        <SarvamVoiceAssistantModal
          onClose={() => setShowSarvamModal(false)}
          onConfirmClinicalPrompt={(prompt) => {
            const userMsg = `🎙️ [Sarvam Voice Input]: "${prompt.originalRegionalText}"`;
            const aiMsg = `🌐 **Sarvam Translation & Clinical Intake Result**:\n\n- **English Prompt**: ${prompt.englishTranslation}\n- **Specialty**: ${prompt.structuredPrompt.suggestedSpecialty}\n- **Triage Level**: ${prompt.structuredPrompt.severity.toUpperCase()}\n- **Risk Flags**: ${prompt.structuredPrompt.riskFlags.join(', ') || 'None'}`;
            setMessages(prev => [
              ...prev,
              { id: `msg-${Date.now()}`, role: 'user', text: userMsg },
              { id: `msg-${Date.now() + 1}`, role: 'ai', text: aiMsg }
            ]);
          }}
        />
      )}
    </div>
  );
};
