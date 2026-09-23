import React, { useState } from 'react';
import { useHealthRecord } from '../../context/HealthRecordContext.tsx';
import { FileText, Volume2, Globe, HeartPulse, Sparkles, Lock, CreditCard } from 'lucide-react';
import { AIHistoryIntakeModal } from '../citizen/AIHistoryIntakeModal.tsx';
import { SarvamVoiceAssistantModal } from '../citizen/SarvamVoiceAssistantModal.tsx';
import { synthesizeSpeechWithSarvam } from '../../services/sarvamAiService.ts';

export const KioskPortal: React.FC = () => {
  const { language, setLanguage, patient, t } = useHealthRecord();
  const [kioskStep, setKioskStep] = useState<'welcome' | 'upload' | 'idInfo'>('welcome');
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [showAwarenessModal, setShowAwarenessModal] = useState(false);
  const [showSarvamModal, setShowSarvamModal] = useState(false);

  const playVoicePrompt = () => {
    setAudioPlaying(true);
    const langCode = language === 'Tamil' ? 'ta-IN' : language === 'Hindi' ? 'hi-IN' : 'en-IN';
    const textMap: Record<string, string> = {
      'ta-IN': 'வணக்கம். உயிரே காவலன் கியோஸ்க்கிற்கு உங்களை வரவேற்கிறோம். தொடுதிரை அல்லது குரல் மூலம் உங்கள் விவரங்களை உள்ளிடவும்.',
      'hi-IN': 'नमस्कार। उयिरे कावलन कियोस्क में आपका स्वागत है। टच स्क्रीन या अपनी बोली जाने वाली भाषा में विवरण दर्ज करें।',
      'en-IN': 'Welcome to Uyire Kavalan Autonomous Health Kiosk. Select self service feature or speak in your native language.'
    };
    synthesizeSpeechWithSarvam(textMap[langCode] || textMap['en-IN'], langCode);
    setTimeout(() => {
      setAudioPlaying(false);
    }, 3200);
  };

  return (
    <div className="min-h-screen bg-[#E8F5E9] py-8">
      <div className="container mx-auto px-4 max-w-5xl space-y-6">
        {/* Kiosk Header */}
        <div className="bg-[#1B5E20] text-white rounded-3xl p-6 shadow-xl text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#27702C] text-[#A5D6A7] text-xs font-bold px-3 py-1 rounded-full border border-[#388E3C]">
            <HeartPulse className="w-4 h-4 text-[#66BB6A]" /> Autonomous Public Health Kiosk
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold font-display">Citizen Self-Service Digital Health Station</h2>
          <p className="text-sm text-[#D0EBD2]">{t('speakLanguage')}</p>

          {/* Audio Instructions & Language Bar */}
          <div className="flex flex-wrap justify-center items-center gap-3 pt-2">
            <button
              onClick={playVoicePrompt}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                audioPlaying ? 'bg-[#66BB6A] text-[#1B5E20] animate-bounce' : 'bg-[#27702C] text-white hover:bg-[#328738]'
              }`}
            >
              <Volume2 className="w-4 h-4" /> {audioPlaying ? 'Playing Audio Instruction...' : '🔊 Hear Instructions'}
            </button>

            <button
              onClick={() => setShowSarvamModal(true)}
              className="px-4 py-2 rounded-xl text-xs font-black bg-[#66BB6A] text-[#0A260C] hover:bg-[#52ab56] transition-all flex items-center gap-2 shadow-lg scale-[1.02]"
            >
              <Sparkles className="w-4 h-4 text-[#0A260C]" /> 🎙️ Sarvam AI Voice (22 Languages)
            </button>

            <div className="flex items-center gap-1 bg-[#123814] px-3 py-1.5 rounded-xl border border-[#27702C]">
              <Globe className="w-4 h-4 text-[#A5D6A7]" />
              <span className="text-xs font-bold text-white mr-1">{t('selectLanguageText')}</span>
              <button
                onClick={() => setLanguage('English')}
                className={`text-xs px-2 py-0.5 rounded font-bold ${language === 'English' ? 'bg-[#66BB6A] text-[#1B5E20]' : 'text-white'}`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('Hindi')}
                className={`text-xs px-2 py-0.5 rounded font-bold ${language === 'Hindi' ? 'bg-[#66BB6A] text-[#1B5E20]' : 'text-white'}`}
              >
                हिंदी
              </button>
              <button
                onClick={() => setLanguage('Tamil')}
                className={`text-xs px-2 py-0.5 rounded font-bold ${language === 'Tamil' ? 'bg-[#66BB6A] text-[#1B5E20]' : 'text-white'}`}
              >
                தமிழ்
              </button>
            </div>
          </div>
        </div>

        {/* Step 1: Kiosk Welcome Options */}
        {kioskStep === 'welcome' && (
          <div className="bg-white rounded-3xl p-8 border-2 border-[#C8E6C9] shadow-xl space-y-6 text-center">
            <h3 className="text-2xl font-bold text-[#1B5E20] font-display">Select Kiosk Self-Service Feature</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Option 1: Public AI Health & Vision Assistant */}
              <button
                onClick={() => setShowAwarenessModal(true)}
                className="p-6 rounded-2xl bg-[#E8F5E9] border-2 border-[#66BB6A] hover:border-[#1B5E20] hover:scale-[1.02] transition-all flex flex-col items-center text-center space-y-4 group min-h-[240px] justify-between shadow-md"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#1B5E20] text-white flex items-center justify-center shadow-lg group-hover:bg-[#66BB6A] group-hover:text-[#1B5E20]">
                  <Sparkles className="w-8 h-8 text-[#66BB6A] group-hover:text-[#1B5E20]" />
                </div>
                <div>
                  <h4 className="text-lg font-extrabold text-[#1B5E20]">💡 Public Health AI & Vision</h4>
                  <p className="text-xs text-[#2E7D32] mt-1 font-medium">Self-Awareness, Symptoms & Prescription Image OCR</p>
                </div>
                <span className="text-[11px] font-bold bg-[#1B5E20] text-white px-3 py-1 rounded-full border border-[#4CAF50] flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-[#66BB6A]" /> Private Self-Service
                </span>
              </button>

              {/* Option 2: Upload Document */}
              <button
                onClick={() => setKioskStep('upload')}
                className="p-6 rounded-2xl bg-[#E8F5E9] border-2 border-[#A5D6A7] hover:border-[#1B5E20] hover:scale-[1.02] transition-all flex flex-col items-center text-center space-y-4 group min-h-[240px] justify-between"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#1B5E20] text-white flex items-center justify-center shadow-lg group-hover:bg-[#66BB6A] group-hover:text-[#1B5E20]">
                  <FileText className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-lg font-extrabold text-[#1B5E20]">📄 Upload / Scan Prescription</h4>
                  <p className="text-xs text-[#38523C] mt-1">Vision OCR parses printed typography & handwriting</p>
                </div>
                <span className="text-[11px] font-bold bg-[#EFF6FF] text-[#1D4ED8] px-3 py-1 rounded-full border border-[#BFDBFE]">
                  Save to Permanent Locker
                </span>
              </button>

              {/* Option 3: Citizen Health ID */}
              <button
                onClick={() => setKioskStep('idInfo')}
                className="p-6 rounded-2xl bg-[#E8F5E9] border-2 border-[#A5D6A7] hover:border-[#1B5E20] hover:scale-[1.02] transition-all flex flex-col items-center text-center space-y-4 group min-h-[240px] justify-between"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#1B5E20] text-white flex items-center justify-center shadow-lg group-hover:bg-[#66BB6A] group-hover:text-[#1B5E20]">
                  <CreditCard className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-lg font-extrabold text-[#1B5E20]">🪪 Permanent Health ID Info</h4>
                  <p className="text-xs text-[#38523C] mt-1">View 12-digit ID & ABHA QR Code for doctor consultations</p>
                </div>
                <span className="text-[11px] font-bold bg-white text-[#38523C] px-3 py-1 rounded-full border border-[#C8E6C9]">
                  12-Digit Permanent ID
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Citizen Health ID Info View */}
        {kioskStep === 'idInfo' && (
          <div className="bg-white rounded-3xl p-8 border-2 border-[#1B5E20] shadow-xl text-center space-y-6 animate-fade-in max-w-xl mx-auto">
            <div className="w-20 h-20 rounded-2xl bg-[#1B5E20] text-[#66BB6A] flex items-center justify-center mx-auto shadow-md">
              <CreditCard className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#1B5E20] font-display">12-Digit Permanent Citizen Health ID</h3>
              <p className="text-xs text-[#38523C] mt-1">Present this 12-digit Health ID or QR code to your doctor to allow them to fetch your complete medical history instantly.</p>
            </div>

            <div className="bg-[#E8F5E9] p-5 rounded-2xl border-2 border-[#66BB6A] text-left space-y-2">
              <span className="text-[10px] font-extrabold text-[#1B5E20] uppercase block">Active Citizen Profile:</span>
              <h4 className="text-xl font-extrabold text-[#122415]">{patient.fullName}</h4>
              <p className="text-sm font-mono font-bold text-[#1B5E20]">Permanent Health ID: {patient.permanentId}</p>
              <p className="text-xs font-mono text-[#38523C]">ABHA Number: {patient.abhaId}</p>
              <p className="text-xs font-mono text-[#38523C]">Aadhaar Linked: {patient.aadhaarNumber}</p>
            </div>

            <button
              onClick={() => setKioskStep('welcome')}
              className="btn btn-primary text-sm px-8"
            >
              Return to Kiosk Main Screen
            </button>
          </div>
        )}

        {/* Step 3: Scan Report View */}
        {kioskStep === 'upload' && (
          <div className="bg-white rounded-3xl p-8 border-2 border-[#C8E6C9] shadow-xl text-center space-y-6 animate-fade-in max-w-xl mx-auto">
            <div className="w-20 h-20 rounded-2xl bg-[#E8F5E9] border-2 border-[#66BB6A] text-[#1B5E20] flex items-center justify-center mx-auto shadow-md">
              <FileText className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#1B5E20] font-display">{t('uploadDocOCR')}</h3>
              <p className="text-xs text-[#38523C] mt-1">Place prescription or lab report under optical scanner. Vision Neural Net parses printed text & doctor handwriting.</p>
            </div>

            <div className="bg-[#EFF6FF] p-4 rounded-xl border border-[#BFDBFE] text-left space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-extrabold text-[#1D4ED8] uppercase">📸 AI Vision Neural Engine Result:</span>
                <div className="flex gap-1">
                  <span className="text-[9px] font-bold bg-[#F5F3FF] text-[#7E22CE] px-1.5 py-0.5 rounded border border-[#DDD6FE]">
                    ✍️ Handwriting 95%
                  </span>
                  <span className="text-[9px] font-bold bg-[#F0FDF4] text-[#15803D] px-1.5 py-0.5 rounded border border-[#BBF7D0]">
                    🖨️ Printed 99%
                  </span>
                </div>
              </div>
              <p className="text-xs text-[#1E40AF] font-semibold">
                <strong>Extracted Printed Header:</strong> District Hospital OPD • Patient GOV-IND-2026-88412
              </p>
              <p className="text-xs text-[#7E22CE] italic">
                <strong>Recognized Cursive Handwriting:</strong> "Rx: Tab. Metformin 500mg BD after food x 14 days."
              </p>
              <p className="text-[11px] text-[#1E3A8A] font-medium pt-1 border-t border-[#BFDBFE]">
                Saved to your 🔵 <strong>Permanent Digital Document Locker</strong>.
              </p>
            </div>

            <button
              onClick={() => setKioskStep('welcome')}
              className="btn btn-primary text-sm px-8"
            >
              Finish & Return to Kiosk Home
            </button>
          </div>
        )}
      </div>

      {/* Public AI Health Awareness Modal */}
      {showAwarenessModal && (
        <AIHistoryIntakeModal
          onClose={() => setShowAwarenessModal(false)}
        />
      )}

      {/* Sarvam.ai Multilingual Voice Assistant Modal */}
      {showSarvamModal && (
        <SarvamVoiceAssistantModal
          onClose={() => setShowSarvamModal(false)}
        />
      )}
    </div>
  );
};
