import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  Globe,
  Sparkles,
  CheckCircle,
  FileText,
  Activity,
  ArrowRight,
  Play,
  Pause,
  Layers,
  Wand2,
  Lock,
  RotateCcw,
  Zap
} from 'lucide-react';
import {
  SCHEDULED_INDIAN_LANGUAGES,
  transcribeSpeechWithSaaras,
  translateToEnglishClinicalPrompt,
  synthesizeSpeechWithSarvam,
  type SaarasTranscriptionResult,
  type StructuredClinicalPrompt,
  type IndianLanguageOption
} from '../../services/sarvamAiService.ts';
import { evaluateClinicalWithMedGemma, NMC_MANDATORY_DISCLAIMER } from '../../services/medGemmaService.ts';
import { useHealthRecord } from '../../context/HealthRecordContext.tsx';

interface SarvamVoiceAssistantModalProps {
  onClose: () => void;
  onConfirmClinicalPrompt?: (prompt: StructuredClinicalPrompt) => void;
}

export const SarvamVoiceAssistantModal: React.FC<SarvamVoiceAssistantModalProps> = ({
  onClose,
  onConfirmClinicalPrompt
}) => {
  const { patient, addFhirAuditLog } = useHealthRecord();
  const [selectedLang, setSelectedLang] = useState<IndianLanguageOption>(SCHEDULED_INDIAN_LANGUAGES[0]); // Tamil default
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [processingStage, setProcessingStage] = useState<'idle' | 'stt_saaras' | 'translating' | 'medgemma_reasoning' | 'tts_synthesis' | 'completed'>('idle');

  const [sttResult, setSttResult] = useState<SaarasTranscriptionResult | null>(null);
  const [clinicalResult, setClinicalResult] = useState<StructuredClinicalPrompt | null>(null);
  const [medGemmaOutputText, setMedGemmaOutputText] = useState<string>('');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [customInputText, setCustomInputText] = useState('');

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

  const startRecording = async () => {
    try {
      audioChunksRef.current = [];
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        processAudio(audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingSeconds(0);

      timerIntervalRef.current = window.setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } catch (e) {
      console.warn('Microphone access unavailable or denied, falling back to simulated speech capture:', e);
      simulateVoiceCapture();
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((t) => t.stop());
      setIsRecording(false);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }
  };

  const simulateVoiceCapture = () => {
    setIsRecording(true);
    setRecordingSeconds(0);
    timerIntervalRef.current = window.setInterval(() => {
      setRecordingSeconds((prev) => prev + 1);
    }, 1000);

    setTimeout(() => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      setIsRecording(false);
      processAudio(selectedLang.sampleCodeMixed);
    }, 3000);
  };

  const processAudio = async (audioOrText: Blob | string) => {
    setProcessingStage('stt_saaras');

    // Step 1: Sarvam Saaras Speech-To-Text
    const stt = await transcribeSpeechWithSaaras(
      audioOrText,
      selectedLang.code,
      typeof audioOrText === 'string' ? audioOrText : undefined
    );
    setSttResult(stt);

    // Step 2: Sarvam Code-Mixed Regional to English Translation
    setProcessingStage('translating');
    const translated = await translateToEnglishClinicalPrompt(stt.transcript, stt.detectedLanguage);
    setClinicalResult(translated);

    // Step 3: Google MedGemma (medgemma-7b-it) Clinical Reasoning & DPDP PHI Anonymization
    setProcessingStage('medgemma_reasoning');
    const medGemmaRes = await evaluateClinicalWithMedGemma(translated.englishTranslation, patient);
    setMedGemmaOutputText(medGemmaRes.formattedResponseText);
    addFhirAuditLog(medGemmaRes.fhirAuditLog);

    // Step 4: Sarvam TTS Audio Synthesis
    setProcessingStage('tts_synthesis');
    await synthesizeSpeechWithSarvam(
      `நன்றி. உங்கள் சுகாதார தகவல் MedGemma மூலம் ஆய்வு செய்யப்பட்டது. (${translated.structuredPrompt.primaryComplaints})`,
      selectedLang.code
    );

    setProcessingStage('completed');
  };

  const handleSelectPresetPrompt = (promptText: string, lang: IndianLanguageOption) => {
    setSelectedLang(lang);
    setCustomInputText(promptText);
    processAudio(promptText);
  };

  const playSynthesizedAudio = () => {
    setIsPlayingAudio(true);
    if (clinicalResult) {
      synthesizeSpeechWithSarvam(
        clinicalResult.structuredPrompt.primaryComplaints,
        selectedLang.code
      );
    }
    setTimeout(() => setIsPlayingAudio(false), 3500);
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-3 md:p-6 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-4xl w-full p-6 shadow-2xl border-2 border-[#1B5E20] flex flex-col max-h-[90vh] overflow-y-auto relative animate-fade-in space-y-5">
        
        {/* Modal Header */}
        <div className="flex justify-between items-start border-b border-[#C8E6C9] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1B5E20] to-[#27702C] text-white flex items-center justify-center font-bold shadow-lg">
              <Sparkles className="w-7 h-7 text-[#66BB6A]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-extrabold text-[#1B5E20] font-display">
                  Sarvam.ai Multilingual Voice Interface
                </h3>
                <span className="bg-[#1B5E20] text-[#A5D6A7] text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-[#4CAF50]">
                  Saaras STT • 22 Indian Languages
                </span>
              </div>
              <p className="text-xs text-[#38523C] font-medium mt-0.5">
                Multi-accent & Code-Mixed (Hinglish/Tanglish) Regional Speech-to-Text & TTS Synthesis
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-black font-extrabold text-2xl px-2.5 py-1 rounded-xl hover:bg-gray-100 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Language Selection Grid Bar */}
        <div className="bg-[#F4F9F5] p-3.5 rounded-2xl border border-[#C8E6C9] space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-extrabold text-[#1B5E20] flex items-center gap-1.5 uppercase tracking-wider">
              <Globe className="w-4 h-4 text-[#2E7D32]" /> Select Native Indian Language (22 Scheduled Languages):
            </span>
            <span className="text-[11px] font-mono font-bold text-[#2E7D32] bg-[#E8F5E9] px-2.5 py-0.5 rounded-md border border-[#A5D6A7]">
              Active: {selectedLang.name} ({selectedLang.nativeName})
            </span>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {SCHEDULED_INDIAN_LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setSelectedLang(lang)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap border shrink-0 flex items-center gap-1.5 ${
                  selectedLang.code === lang.code
                    ? 'bg-[#1B5E20] text-white border-[#1B5E20] shadow-md scale-[1.03]'
                    : 'bg-white text-[#122415] border-[#C8E6C9] hover:bg-[#E8F5E9]'
                }`}
              >
                <span>{lang.nativeName}</span>
                <span className="text-[9px] opacity-75 font-mono">({lang.name})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Live Mic Recording & Input Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Audio Mic Capture Card */}
          <div className="bg-gradient-to-br from-[#0A260C] to-[#154D1B] text-white p-6 rounded-2xl shadow-xl flex flex-col items-center justify-between border-2 border-[#27702C] text-center relative overflow-hidden">
            <div className="space-y-1 relative z-10">
              <span className="text-[10px] font-extrabold bg-[#1B5E20] text-[#66BB6A] px-3 py-1 rounded-full border border-[#4CAF50] uppercase tracking-widest">
                🎙️ Saaras STT Neural Model
              </span>
              <h4 className="text-lg font-extrabold text-white font-display mt-2">
                Speak in Native Speech or Code-Mixed Language
              </h4>
              <p className="text-xs text-[#D0EBD2]">
                Supports multi-accent, noisy, Hinglish, Tanglish & native regional speech across {selectedLang.name}.
              </p>
            </div>

            {/* Mic Record Button */}
            <div className="my-6 relative z-10">
              <button
                onClick={isRecording ? stopRecording : startRecording}
                className={`w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-2xl ${
                  isRecording
                    ? 'bg-red-600 text-white animate-pulse ring-8 ring-red-400/50 scale-110'
                    : 'bg-[#66BB6A] text-[#0A260C] hover:scale-105 hover:bg-[#52ab56]'
                }`}
              >
                {isRecording ? <MicOff className="w-10 h-10" /> : <Mic className="w-10 h-10" />}
              </button>

              <span className="text-xs font-mono font-bold mt-3 block text-[#A5D6A7]">
                {isRecording ? `Recording... (${recordingSeconds}s) • Click to Stop` : 'Click Microphone to Speak'}
              </span>
            </div>

            {/* Preset Samples */}
            <div className="w-full text-left bg-black/30 p-3 rounded-xl border border-white/10 relative z-10 space-y-1.5">
              <span className="text-[10px] font-bold text-[#A5D6A7] uppercase block">
                💡 Sample {selectedLang.name} Voice Prompt:
              </span>
              <p className="text-xs text-white italic font-mono leading-relaxed">
                "{selectedLang.sampleCodeMixed}"
              </p>
              <button
                onClick={() => handleSelectPresetPrompt(selectedLang.sampleCodeMixed, selectedLang)}
                className="w-full mt-1 bg-[#1B5E20] hover:bg-[#27702C] text-[#66BB6A] text-[11px] font-bold py-1.5 px-3 rounded-lg border border-[#4CAF50] transition-colors flex items-center justify-center gap-1.5"
              >
                <Zap className="w-3.5 h-3.5" /> Simulate This {selectedLang.name} Speech
              </button>
            </div>
          </div>

          {/* Code-Mixed Quick Preset Launcher */}
          <div className="bg-white p-5 rounded-2xl border-2 border-[#C8E6C9] shadow-md flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Wand2 className="w-5 h-5 text-[#1B5E20]" />
                <h4 className="text-sm font-extrabold text-[#1B5E20] font-display">
                  Code-Mixed Regional Presets
                </h4>
              </div>
              <p className="text-xs text-[#38523C] mb-3">
                Select pre-configured multi-lingual speech samples to test Sarvam Saaras STT & translation pipeline:
              </p>

              <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                {SCHEDULED_INDIAN_LANGUAGES.slice(0, 6).map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleSelectPresetPrompt(lang.sampleCodeMixed, lang)}
                    className="w-full p-2.5 rounded-xl bg-[#F4F9F5] border border-[#C8E6C9] hover:border-[#1B5E20] hover:bg-[#E8F5E9] transition-all text-left group flex items-start gap-2"
                  >
                    <span className="text-[10px] font-extrabold bg-[#1B5E20] text-white px-2 py-0.5 rounded shrink-0 mt-0.5">
                      {lang.name}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-[#122415] truncate group-hover:text-[#1B5E20]">
                        {lang.sampleCodeMixed}
                      </p>
                      <p className="text-[10px] text-[#38523C] truncate">
                        Native: {lang.samplePhrase}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-[#C8E6C9] flex gap-2">
              <input
                type="text"
                placeholder={`Type or paste ${selectedLang.name} regional / code-mixed text...`}
                value={customInputText}
                onChange={(e) => setCustomInputText(e.target.value)}
                className="flex-1 px-3 py-2 border border-[#C8E6C9] rounded-xl text-xs focus:outline-none focus:border-[#1B5E20]"
              />
              <button
                onClick={() => processAudio(customInputText || selectedLang.sampleCodeMixed)}
                className="bg-[#1B5E20] text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-[#123814] transition-colors"
              >
                Process
              </button>
            </div>
          </div>
        </div>

        {/* Sarvam AI Real-Time Processing Pipeline Stage Card */}
        {processingStage !== 'idle' && (
          <div className="bg-[#E8F5E9] p-5 rounded-2xl border-2 border-[#66BB6A] space-y-4 shadow-lg animate-fade-in">
            
            {/* Pipeline Header Status Bar */}
            <div className="flex justify-between items-center border-b border-[#A5D6A7] pb-2.5">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#1B5E20] animate-pulse" />
                <span className="font-extrabold text-sm text-[#1B5E20]">
                  Sarvam AI Pipeline Execution Stage:
                </span>
                <span className="bg-[#1B5E20] text-white text-xs font-mono font-bold px-3 py-0.5 rounded-full uppercase">
                  {processingStage.replace('_', ' ')}
                </span>
              </div>

              {sttResult && (
                <span className="text-xs font-bold text-[#2E7D32]">
                  Confidence: <strong className="text-[#1B5E20] font-mono">{sttResult.confidence}%</strong> ({sttResult.modelUsed})
                </span>
              )}
            </div>

            {/* Visual Step Timeline */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
              <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${
                processingStage === 'stt_saaras' ? 'bg-[#1B5E20] text-white border-[#1B5E20] font-bold animate-pulse' : sttResult ? 'bg-white text-[#1B5E20] border-[#A5D6A7]' : 'bg-[#F4F9F5] text-gray-400'
              }`}>
                <span>1. 🎙️ Saaras STT</span>
              </div>

              <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${
                processingStage === 'translating' ? 'bg-[#1B5E20] text-white border-[#1B5E20] font-bold animate-pulse' : clinicalResult ? 'bg-white text-[#1B5E20] border-[#A5D6A7]' : 'bg-[#F4F9F5] text-gray-400'
              }`}>
                <span>2. 🌐 Sarvam Translate</span>
              </div>

              <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${
                processingStage === 'medgemma_reasoning' ? 'bg-[#1B5E20] text-white border-[#1B5E20] font-bold animate-pulse' : clinicalResult ? 'bg-white text-[#1B5E20] border-[#A5D6A7]' : 'bg-[#F4F9F5] text-gray-400'
              }`}>
                <span>3. 🧠 MedGemma AI</span>
              </div>

              <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${
                processingStage === 'tts_synthesis' || processingStage === 'completed' ? 'bg-[#1B5E20] text-white border-[#1B5E20] font-bold' : 'bg-[#F4F9F5] text-gray-400'
              }`}>
                <span>4. 🔊 Sarvam TTS Voice</span>
              </div>
            </div>

            {/* Results Grid Display */}
            {sttResult && clinicalResult && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                
                {/* STT Regional Transcription */}
                <div className="bg-white p-4 rounded-xl border border-[#A5D6A7] space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-extrabold text-[#1B5E20] uppercase block">
                      🎙️ Transcribed Code-Mixed / Regional Input:
                    </span>
                    <span className="text-[9px] font-bold bg-[#E8F5E9] text-[#1B5E20] px-2 py-0.5 rounded border border-[#A5D6A7]">
                      {sttResult.languageName} ({sttResult.detectedLanguage})
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-[#122415] bg-[#F4F9F5] p-2.5 rounded-lg border border-[#C8E6C9] font-mono">
                    "{sttResult.transcript}"
                  </p>
                  <p className="text-[10px] text-[#38523C] italic">
                    Recognized multi-accent speech with {sttResult.confidence}% confidence via Sarvam Saaras Engine.
                  </p>
                </div>

                {/* English Clinical Translation Prompt */}
                <div className="bg-white p-4 rounded-xl border border-[#A5D6A7] space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-extrabold text-[#1D4ED8] uppercase block">
                      🌐 Structured English Clinical Prompt:
                    </span>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded text-white ${
                      clinicalResult.structuredPrompt.severity === 'critical' ? 'bg-red-600' : 'bg-[#1B5E20]'
                    }`}>
                      {clinicalResult.structuredPrompt.severity.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-[#1E40AF] bg-[#EFF6FF] p-2.5 rounded-lg border border-[#BFDBFE]">
                    "{clinicalResult.englishTranslation}"
                  </p>
                  <div className="flex flex-wrap gap-2 text-[10px]">
                    <span className="bg-[#E8F5E9] text-[#1B5E20] px-2 py-0.5 rounded font-bold border border-[#A5D6A7]">
                      Specialty: {clinicalResult.structuredPrompt.suggestedSpecialty}
                    </span>
                    <span className="bg-[#FFFBEB] text-[#D97706] px-2 py-0.5 rounded font-bold border border-[#FDE68A]">
                      Duration: {clinicalResult.structuredPrompt.duration}
                    </span>
                  </div>
                </div>

                {/* MedGemma Clinical Reasoning Engine Box */}
                {medGemmaOutputText && (
                  <div className="md:col-span-2 bg-[#FAF5FF] p-4 rounded-xl border-2 border-[#7C3AED] space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] font-extrabold text-[#6B21A8] uppercase flex items-center gap-1.5">
                        🧠 Google MedGemma (medgemma-7b-it) Clinical Assessment:
                      </span>
                      <span className="text-[9px] font-bold bg-[#7C3AED] text-white px-2 py-0.5 rounded uppercase">
                        DPDP Act 2023 PHI Anonymized
                      </span>
                    </div>
                    <pre className="text-xs text-[#581C87] font-mono whitespace-pre-wrap leading-relaxed bg-white p-3 rounded-lg border border-[#E9D5FF]">
                      {medGemmaOutputText}
                    </pre>
                  </div>
                )}

              </div>
            )}

            {/* Audio Synthesis Playback Bar */}
            {processingStage === 'completed' && (
              <div className="bg-white p-3.5 rounded-xl border border-[#A5D6A7] flex flex-wrap justify-between items-center gap-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={playSynthesizedAudio}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                      isPlayingAudio ? 'bg-[#66BB6A] text-[#1B5E20] animate-bounce' : 'bg-[#1B5E20] text-white hover:bg-[#123814]'
                    }`}
                  >
                    {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    <span>{isPlayingAudio ? 'Playing Native Audio...' : `🔊 Listen to ${selectedLang.name} Sarvam Voice Output`}</span>
                  </button>

                  <span className="text-xs text-[#38523C] font-mono hidden sm:inline">
                    Bulbul:v1 TTS Synthesized • Native Audio Response Ready
                  </span>
                </div>

                {onConfirmClinicalPrompt && clinicalResult && (
                  <button
                    onClick={() => {
                      onConfirmClinicalPrompt(clinicalResult);
                      onClose();
                    }}
                    className="bg-[#66BB6A] text-[#0A260C] font-black text-xs px-5 py-2 rounded-xl hover:bg-[#52ab56] transition-all flex items-center gap-1.5 shadow"
                  >
                    <CheckCircle className="w-4 h-4" /> Send Structured Intake to Doctor Queue
                  </button>
                )}
              </div>
            )}

          </div>
        )}

        {/* Footer info */}
        <div className="pt-2 border-t border-[#C8E6C9] text-xs text-[#38523C] flex flex-wrap justify-between items-center gap-2">
          <span className="flex items-center gap-1 font-semibold">
            <Lock className="w-3.5 h-3.5 text-[#1B5E20]" />
            Sarvam.ai Secure Gateway • 22 Scheduled Languages • Privacy Protected
          </span>
          <button onClick={onClose} className="btn btn-secondary text-xs px-4 py-1.5">
            Close Voice Assistant
          </button>
        </div>

      </div>
    </div>
  );
};
