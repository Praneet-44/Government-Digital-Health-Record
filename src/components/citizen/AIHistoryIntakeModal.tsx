import React, { useState } from 'react';
import { Bot, Mic, Send, ShieldCheck, CheckCircle2, Lock, FileText, Sparkles, HelpCircle } from 'lucide-react';
import { useHealthRecord } from '../../context/HealthRecordContext.tsx';

export type AIMode = 'awareness' | 'doctorIntake';

interface AIHistoryIntakeModalProps {
  onClose: () => void;
  initialMode?: AIMode;
}

export const AIHistoryIntakeModal: React.FC<AIHistoryIntakeModalProps> = ({ onClose, initialMode = 'awareness' }) => {
  const { t } = useHealthRecord();
  const [aiMode, setAiMode] = useState<AIMode>(initialMode);
  const [messages, setMessages] = useState<{ role: 'ai' | 'user'; text: string; isRedFlag?: boolean }[]>([
    initialMode === 'awareness'
      ? {
          role: 'ai',
          text: '💡 Hello! I am your Public AI Health Awareness Assistant. Ask me any health question, symptom queries, or wellness tips. Note: This conversation is strictly for your awareness and is NOT sent to any doctor or saved to your record.'
        }
      : {
          role: 'ai',
          text: '📋 Hello! I am MediKiosk OPD Intake Assistant. Please describe your symptoms today to prepare a clinical summary for your doctor.'
        }
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSwitchMode = (newMode: AIMode) => {
    if (newMode === aiMode) return;
    setAiMode(newMode);
    setIsCompleted(false);
    if (newMode === 'awareness') {
      setMessages([
        {
          role: 'ai',
          text: '💡 Switched to Public AI Health Awareness Mode. Ask anything to get aware about health conditions, remedies, or symptoms. (Private • NOT sent to doctor)'
        }
      ]);
    } else {
      setMessages([
        {
          role: 'ai',
          text: '📋 Switched to OPD Clinical Intake Mode. Enter symptoms to generate an official summary for doctor review.'
        }
      ]);
    }
  };

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    const newMsgs = [...messages, { role: 'user' as const, text: userMsg }];
    setMessages(newMsgs);
    setInput('');

    setTimeout(() => {
      if (aiMode === 'awareness') {
        // Public Health Awareness Responses (Informational Only - NOT sent to doctor)
        if (userMsg.toLowerCase().includes('fever') || userMsg.toLowerCase().includes('cough')) {
          setMessages([
            ...newMsgs,
            {
              role: 'ai',
              text: '🌡️ Health Awareness: Mild fever and cough can stem from viral infections. Stay hydrated, rest, and monitor temperature. If fever exceeds 102°F or persists > 3 days, consult a physician in person. [Informational Only — Not sent to doctor]'
            }
          ]);
        } else if (userMsg.toLowerCase().includes('headache') || userMsg.toLowerCase().includes('pain')) {
          setMessages([
            ...newMsgs,
            {
              role: 'ai',
              text: '💡 Health Awareness: Headaches are often linked to hydration, stress, or eye strain. Ensure adequate sleep and water intake. Seek urgent care if accompanied by sudden neck stiffness or vision loss. [Not sent to doctor]'
            }
          ]);
        } else {
          setMessages([
            ...newMsgs,
            {
              role: 'ai',
              text: `💡 Health Awareness Info: Thank you for asking. Maintaining balanced nutrition, regular exercise, and timely health checkups supports general wellness. Feel free to ask more health awareness questions!`
            }
          ]);
        }
      } else {
        // OPD Doctor Intake Responses (Sent to Doctor Queue)
        if (userMsg.toLowerCase().includes('chest pain') || userMsg.toLowerCase().includes('breath')) {
          setMessages([
            ...newMsgs,
            {
              role: 'ai',
              text: '⚠️ RED FLAG ALERT: You reported chest tightness or shortness of breath. This requires immediate priority triage! Sending triage notification to PHC staff.',
              isRedFlag: true
            }
          ]);
          setIsCompleted(true);
        } else if (messages.length === 1) {
          setMessages([
            ...newMsgs,
            {
              role: 'ai',
              text: 'I understand you are experiencing discomfort. When did this symptom start, and is it mild, moderate, or severe?'
            }
          ]);
        } else {
          setMessages([
            ...newMsgs,
            {
              role: 'ai',
              text: 'Thank you! Structured OPD clinical summary generated. Your doctor will review this during your consultation.'
            }
          ]);
          setIsCompleted(true);
        }
      }
    }, 900);
  };

  const toggleVoice = () => {
    setIsListening(true);
    setTimeout(() => {
      if (aiMode === 'awareness') {
        setInput('What are healthy ways to manage mild fever at home?');
      } else {
        setInput('I have had mild fever and cough for 2 days.');
      }
      setIsListening(false);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border-2 border-[#1B5E20] flex flex-col h-[620px] animate-fade-in">
        {/* Header */}
        <div className="flex justify-between items-start pb-3 border-b border-[#C8E6C9]">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-md ${aiMode === 'awareness' ? 'bg-[#1B5E20]' : 'bg-[#0F3812]'}`}>
              {aiMode === 'awareness' ? <Sparkles className="w-6 h-6 text-[#66BB6A]" /> : <Bot className="w-6 h-6 text-[#66BB6A]" />}
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#1B5E20] font-display flex items-center gap-2">
                {aiMode === 'awareness' ? t('publicAiAwarenessTitle') : t('opdDoctorIntakeTitle')}
              </h3>
              <p className="text-xs text-[#38523C]">
                {aiMode === 'awareness'
                  ? 'Private Health Awareness • Answers strictly for citizen knowledge'
                  : 'Official OPD Intake • Prepares summary for Doctor review'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-black font-bold text-xl px-2">✕</button>
        </div>

        {/* Mode Selector Toggle Bar */}
        <div className="my-3 bg-[#E8F5E9] p-1.5 rounded-xl border border-[#C8E6C9] flex gap-2">
          <button
            onClick={() => handleSwitchMode('awareness')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 ${
              aiMode === 'awareness'
                ? 'bg-[#1B5E20] text-white shadow'
                : 'text-[#38523C] hover:bg-[#D4EDD6]'
            }`}
          >
            <Lock className="w-3.5 h-3.5 text-[#66BB6A]" /> 🛡️ Public Awareness (Private)
          </button>
          <button
            onClick={() => handleSwitchMode('doctorIntake')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 ${
              aiMode === 'doctorIntake'
                ? 'bg-[#1B5E20] text-white shadow'
                : 'text-[#38523C] hover:bg-[#D4EDD6]'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-[#66BB6A]" /> 📋 OPD Doctor Intake
          </button>
        </div>

        {/* Dynamic Mode Notification Banner */}
        <div className={`p-2.5 rounded-xl text-xs font-bold mb-2 flex items-center gap-2 ${
          aiMode === 'awareness'
            ? 'bg-[#E8F5E9] text-[#1B5E20] border border-[#A5D6A7]'
            : 'bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE]'
        }`}>
          {aiMode === 'awareness' ? (
            <>
              <Lock className="w-4 h-4 text-[#1B5E20] shrink-0" />
              <span>{t('awarenessModeBadge')}</span>
            </>
          ) : (
            <>
              <ShieldCheck className="w-4 h-4 text-[#1D4ED8] shrink-0" />
              <span>{t('doctorIntakeModeBadge')}</span>
            </>
          )}
        </div>

        {/* Chat Body */}
        <div className="flex-1 overflow-y-auto py-3 space-y-3 pr-1">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-[#1B5E20] text-white rounded-tr-none'
                    : m.isRedFlag
                    ? 'bg-[#FEE2E2] text-[#B91C1C] border border-[#FCA5A5] font-bold rounded-tl-none'
                    : aiMode === 'awareness'
                    ? 'bg-[#E8F5E9] text-[#122415] border border-[#A5D6A7] rounded-tl-none'
                    : 'bg-[#EFF6FF] text-[#1E3A8A] border border-[#BFDBFE] rounded-tl-none'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Controls */}
        <div className="pt-2 border-t border-[#C8E6C9] mt-2">
          {aiMode === 'awareness' ? (
            <div className="space-y-2">
              <form onSubmit={handleSend} className="flex gap-2">
                <button
                  type="button"
                  onClick={toggleVoice}
                  className={`p-3 rounded-xl border transition-all ${
                    isListening ? 'bg-[#DC2626] text-white animate-pulse' : 'bg-[#E8F5E9] text-[#1B5E20] border-[#C8E6C9] hover:bg-[#A5D6A7]'
                  }`}
                  title="Voice Input (Tamil / Hindi / English)"
                >
                  <Mic className="w-5 h-5" />
                </button>
                <input
                  type="text"
                  placeholder={isListening ? 'Listening...' : 'Ask any health question to get aware...'}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 px-4 py-2.5 border border-[#C8E6C9] rounded-xl text-xs focus:outline-none focus:border-[#1B5E20]"
                />
                <button
                  type="submit"
                  className="btn btn-primary text-xs px-5"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

              <div className="bg-[#E8F5E9] p-2 rounded-xl text-[11px] text-[#1B5E20] flex items-center justify-between border border-[#A5D6A7]">
                <span className="font-semibold flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-[#1B5E20]" />
                  Self-Awareness Only • Nothing is sent to your doctor
                </span>
                <button onClick={onClose} className="text-[#1B5E20] font-bold underline hover:text-[#123814]">
                  Close Chat
                </button>
              </div>
            </div>
          ) : !isCompleted ? (
            <form onSubmit={handleSend} className="flex gap-2">
              <button
                type="button"
                onClick={toggleVoice}
                className={`p-3 rounded-xl border transition-all ${
                  isListening ? 'bg-[#DC2626] text-white animate-pulse' : 'bg-[#E8F5E9] text-[#1B5E20] border-[#C8E6C9] hover:bg-[#A5D6A7]'
                }`}
                title="Voice Input (Tamil / Hindi / English)"
              >
                <Mic className="w-5 h-5" />
              </button>
              <input
                type="text"
                placeholder={isListening ? 'Listening...' : 'Describe symptoms for doctor review...'}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 px-4 py-2.5 border border-[#C8E6C9] rounded-xl text-xs focus:outline-none focus:border-[#1B5E20]"
              />
              <button
                type="submit"
                className="btn btn-primary text-xs px-5"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="space-y-2">
              <button
                onClick={onClose}
                className="w-full btn btn-primary text-xs py-3 flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-[#66BB6A]" /> Submit History to OPD Token Queue
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
