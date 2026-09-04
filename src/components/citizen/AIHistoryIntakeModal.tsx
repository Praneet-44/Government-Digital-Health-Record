import React, { useState } from 'react';
import { Bot, Mic, Send, AlertTriangle, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface AIHistoryIntakeModalProps {
  onClose: () => void;
}

export const AIHistoryIntakeModal: React.FC<AIHistoryIntakeModalProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<{ role: 'ai' | 'user'; text: string; isRedFlag?: boolean }[]>([
    {
      role: 'ai',
      text: 'Hello Praneet! I am MediKiosk AI Clinical Assistant. What symptoms or medical changes would you like to report today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    const newMsgs = [...messages, { role: 'user' as const, text: userMsg }];
    setMessages(newMsgs);
    setInput('');

    // AI logic response simulation
    setTimeout(() => {
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
      } else if (messages.length === 3) {
        setMessages([
          ...newMsgs,
          {
            role: 'ai',
            text: 'Have you taken any over-the-counter medicines or painkillers for this?'
          }
        ]);
      } else {
        setMessages([
          ...newMsgs,
          {
            role: 'ai',
            text: 'Thank you! Structured clinical summary generated. Your doctor will review this before your OPD consultation.'
          }
        ]);
        setIsCompleted(true);
      }
    }, 1000);
  };

  const toggleVoice = () => {
    setIsListening(true);
    setTimeout(() => {
      setInput('I have had mild fever and cough for 2 days.');
      setIsListening(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border-2 border-[#66BB6A] flex flex-col h-[600px] animate-fade-in">
        {/* Header */}
        <div className="flex justify-between items-start pb-4 border-b border-[#C8E6C9]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1B5E20] text-white flex items-center justify-center font-bold">
              <Bot className="w-6 h-6 text-[#66BB6A]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#1B5E20] font-display flex items-center gap-2">
                MediKiosk AI History Assistant
              </h3>
              <p className="text-xs text-[#38523C]">
                Interactive voice/touch intake • Prepares history for Doctor review
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-black font-bold">✕</button>
        </div>

        {/* Chat Body */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
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
                    : 'bg-[#E8F5E9] text-[#122415] border border-[#C8E6C9] rounded-tl-none'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Clinical Disclaimer */}
        <div className="bg-[#F4F9F5] p-2.5 rounded-xl border border-[#E0F2E1] text-[11px] text-[#38523C] mb-3 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#1B5E20] shrink-0" />
          <span>AI generates structured clinical summaries for doctors. It does NOT replace clinician diagnosis.</span>
        </div>

        {/* Input Bar */}
        {!isCompleted ? (
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
              placeholder={isListening ? 'Listening to voice...' : 'Type symptoms or tap mic to speak...'}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-4 py-2.5 border border-[#C8E6C9] rounded-xl text-xs focus:outline-none focus:border-[#1B5E20]"
            />
            <button
              type="submit"
              className="btn btn-primary text-xs px-4"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <button
            onClick={onClose}
            className="w-full btn btn-primary text-xs py-3 flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-[#66BB6A]" /> Submit History to OPD Token Queue
          </button>
        )}
      </div>
    </div>
  );
};
