import React, { useState } from 'react';
import { useHealthRecord } from '../../context/HealthRecordContext.tsx';
import { Mic, Touchpad, FileText, Volume2, Globe, AlertTriangle, ArrowRight, CheckCircle2, ShieldCheck, HeartPulse, Sparkles, Lock } from 'lucide-react';
import { AIHistoryIntakeModal } from '../citizen/AIHistoryIntakeModal.tsx';

export const KioskPortal: React.FC = () => {
  const { language, setLanguage, triggerTriageRedFlag, t } = useHealthRecord();
  const [kioskStep, setKioskStep] = useState<'welcome' | 'speak' | 'upload' | 'triageAlert'>('welcome');
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [redFlagSubmitted, setRedFlagSubmitted] = useState(false);
  const [showAwarenessModal, setShowAwarenessModal] = useState(false);

  const playVoicePrompt = () => {
    setAudioPlaying(true);
    setTimeout(() => {
      setAudioPlaying(false);
    }, 2500);
  };

  const handleRedFlagTrigger = () => {
    triggerTriageRedFlag();
    setRedFlagSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#E8F5E9] py-8">
      <div className="container mx-auto px-4 max-w-5xl space-y-6">
        {/* Kiosk Header */}
        <div className="bg-[#1B5E20] text-white rounded-3xl p-6 shadow-xl text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#27702C] text-[#A5D6A7] text-xs font-bold px-3 py-1 rounded-full border border-[#388E3C]">
            <HeartPulse className="w-4 h-4 text-[#66BB6A]" /> {t('kioskSubtitle')}
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold font-display">{t('kioskTitle')}</h2>
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
            <h3 className="text-2xl font-bold text-[#1B5E20] font-display">{t('kioskSubtitle')}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Option 1: Public AI Health Awareness Mode */}
              <button
                onClick={() => setShowAwarenessModal(true)}
                className="p-5 rounded-2xl bg-[#E8F5E9] border-2 border-[#66BB6A] hover:border-[#1B5E20] hover:scale-[1.02] transition-all flex flex-col items-center text-center space-y-3 group min-h-[220px] justify-between shadow-md"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#1B5E20] text-white flex items-center justify-center shadow-lg group-hover:bg-[#66BB6A] group-hover:text-[#1B5E20]">
                  <Sparkles className="w-7 h-7 text-[#66BB6A] group-hover:text-[#1B5E20]" />
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-[#1B5E20]">💡 Public Health AI</h4>
                  <p className="text-[11px] text-[#2E7D32] mt-1 font-medium">Self-Awareness & Symptom Advice</p>
                </div>
                <span className="text-[10px] font-bold bg-[#1B5E20] text-white px-2.5 py-1 rounded-full border border-[#4CAF50] flex items-center gap-1">
                  <Lock className="w-3 h-3 text-[#66BB6A]" /> Private (Not Sent to Doctor)
                </span>
              </button>

              {/* Option 2: OPD Clinical Intake */}
              <button
                onClick={() => setKioskStep('speak')}
                className="p-5 rounded-2xl bg-[#E8F5E9] border-2 border-[#A5D6A7] hover:border-[#1B5E20] hover:scale-[1.02] transition-all flex flex-col items-center text-center space-y-3 group min-h-[220px] justify-between"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#1B5E20] text-white flex items-center justify-center shadow-lg group-hover:bg-[#66BB6A] group-hover:text-[#1B5E20]">
                  <Mic className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-[#1B5E20]">🎤 OPD AI Intake</h4>
                  <p className="text-[11px] text-[#38523C] mt-1">{t('speakLanguage')}</p>
                </div>
                <span className="text-[10px] font-bold bg-[#EFF6FF] text-[#1D4ED8] px-2.5 py-1 rounded-full border border-[#BFDBFE]">
                  📋 Submits to Doctor Queue
                </span>
              </button>

              {/* Option 3: Tap Touch Screen */}
              <button
                onClick={() => setKioskStep('triageAlert')}
                className="p-5 rounded-2xl bg-[#E8F5E9] border-2 border-[#A5D6A7] hover:border-[#1B5E20] hover:scale-[1.02] transition-all flex flex-col items-center text-center space-y-3 group min-h-[220px] justify-between"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#1B5E20] text-white flex items-center justify-center shadow-lg group-hover:bg-[#66BB6A] group-hover:text-[#1B5E20]">
                  <Touchpad className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-[#1B5E20]">👆 Quick Symptoms</h4>
                  <p className="text-[11px] text-[#38523C] mt-1">Touch Screen Triage</p>
                </div>
                <span className="text-[10px] font-bold bg-white text-[#38523C] px-2.5 py-1 rounded-full border border-[#C8E6C9]">
                  OPD Triage Options
                </span>
              </button>

              {/* Option 4: Upload Report */}
              <button
                onClick={() => setKioskStep('upload')}
                className="p-5 rounded-2xl bg-[#E8F5E9] border-2 border-[#A5D6A7] hover:border-[#1B5E20] hover:scale-[1.02] transition-all flex flex-col items-center text-center space-y-3 group min-h-[220px] justify-between"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#1B5E20] text-white flex items-center justify-center shadow-lg group-hover:bg-[#66BB6A] group-hover:text-[#1B5E20]">
                  <FileText className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-[#1B5E20]">📄 Upload Document</h4>
                  <p className="text-[11px] text-[#38523C] mt-1">{t('scanDesc')}</p>
                </div>
                <span className="text-[10px] font-bold bg-[#EFF6FF] text-[#1D4ED8] px-2.5 py-1 rounded-full border border-[#BFDBFE]">
                  AI OCR Processing
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Speak Assistant */}
        {kioskStep === 'speak' && (
          <div className="bg-white rounded-3xl p-8 border-2 border-[#66BB6A] shadow-xl text-center space-y-6 animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-[#1B5E20] text-[#66BB6A] flex items-center justify-center mx-auto shadow-xl animate-pulse">
              <Mic className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#1B5E20] font-display">{t('listening')}</h3>
              <p className="text-sm text-[#38523C] mt-1">{t('speakLanguage')}</p>
            </div>

            <div className="bg-[#EFF6FF] p-4 rounded-xl border border-[#BFDBFE] max-w-md mx-auto text-left">
              <span className="text-[10px] font-extrabold text-[#1D4ED8] uppercase block">OPD Clinical Intake AI Recognized Text:</span>
              <p className="text-sm font-semibold text-[#1E3A8A] mt-1">"Severe right lower abdomen pain starting yesterday night."</p>
            </div>

            <div className="flex justify-center gap-4 pt-4">
              <button
                onClick={() => setKioskStep('welcome')}
                className="btn btn-secondary text-sm px-6"
              >
                Back
              </button>
              <button
                onClick={() => setKioskStep('triageAlert')}
                className="btn btn-primary text-sm px-8"
              >
                Confirm Voice History <ArrowRight className="w-4 h-4 text-[#66BB6A]" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Triage Red Flag Assessment */}
        {kioskStep === 'triageAlert' && (
          <div className="bg-white rounded-3xl p-8 border-2 border-[#C8E6C9] shadow-xl space-y-6">
            <div className="text-center max-w-md mx-auto">
              <h3 className="text-2xl font-bold text-[#1B5E20] font-display">{t('quickSymptoms')}</h3>
              <p className="text-xs text-[#38523C] mt-1">Select any severe symptoms for priority doctor assessment:</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
              <button
                onClick={handleRedFlagTrigger}
                className="p-4 rounded-xl border-2 border-[#FCA5A5] bg-[#FEE2E2] hover:bg-[#FCD3D3] transition-all text-left flex items-start gap-3"
              >
                <AlertTriangle className="w-6 h-6 text-[#DC2626] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-[#B91C1C]">{t('chestPainOption')}</h4>
                  <span className="text-[10px] text-[#991B1B] font-semibold">Triggers Immediate Priority Token</span>
                </div>
              </button>

              <button
                onClick={() => setKioskStep('welcome')}
                className="p-4 rounded-xl border-2 border-[#A5D6A7] bg-[#E8F5E9] hover:bg-[#D4EDD6] transition-all text-left flex items-start gap-3"
              >
                <CheckCircle2 className="w-6 h-6 text-[#1B5E20] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-[#1B5E20]">{t('feverOption')}</h4>
                  <span className="text-[10px] text-[#38523C]">Standard OPD Consultation Queue</span>
                </div>
              </button>
            </div>

            {redFlagSubmitted && (
              <div className="p-4 rounded-2xl bg-[#FEE2E2] border-2 border-[#DC2626] text-center max-w-md mx-auto space-y-2 animate-fade-in">
                <span className="bg-[#DC2626] text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                  ⚠️ Priority Triage Alert Dispatched
                </span>
                <p className="text-xs text-[#B91C1C] font-bold">
                  Patient assigned Priority Emergency Token #100. OPD Nurse & On-duty Doctor notified. Counter updated live in Admin Dashboard.
                </p>
                <button
                  onClick={() => { setRedFlagSubmitted(false); setKioskStep('welcome'); }}
                  className="btn btn-primary text-xs mt-2"
                >
                  Return to Main Kiosk Screen
                </button>
              </div>
            )}
          </div>
        )}

        {/* Step 4: Scan Report */}
        {kioskStep === 'upload' && (
          <div className="bg-white rounded-3xl p-8 border-2 border-[#C8E6C9] shadow-xl text-center space-y-6 animate-fade-in">
            <div className="w-20 h-20 rounded-2xl bg-[#E8F5E9] border-2 border-[#66BB6A] text-[#1B5E20] flex items-center justify-center mx-auto shadow-md">
              <FileText className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#1B5E20] font-display">{t('uploadDocOCR')}</h3>
              <p className="text-sm text-[#38523C] mt-1">{t('dropFile')}</p>
            </div>

            <div className="bg-[#EFF6FF] p-4 rounded-xl border border-[#BFDBFE] max-w-md mx-auto text-left">
              <span className="text-[10px] font-extrabold text-[#1D4ED8] uppercase block">AI OCR Result:</span>
              <p className="text-xs text-[#1E40AF] mt-1 font-semibold">
                Extracted: Metformin 500mg (2x Daily) • Saved as 🔵 Imported status.
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
          initialMode="awareness"
        />
      )}
    </div>
  );
};
