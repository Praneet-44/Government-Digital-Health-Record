import React, { useEffect, useRef, useState } from 'react';
import { useHealthRecord } from '../../context/HealthRecordContext.tsx';
import type { MentalRiskLevel } from '../../types/health.ts';
import {
  Brain,
  Timer,
  RotateCw,
  Wind,
  Phone,
  MapPin,
  Building2,
  HeartHandshake,
  ShieldCheck,
  CheckCircle2,
  X,
  CalendarCheck,
  AlertTriangle,
  Sparkles
} from 'lucide-react';

type Phase = 'intro' | 'memorize' | 'recall' | 'result';
type TierNumber = 1 | 2 | 3;

interface TierConfig {
  n: number;
  patternCount: number;
  timePassMs: number;
  timeFailMs: number;
  misclicksPass: number;
  misclicksFail: number;
  freezeMs: number;
}

const TIERS: Record<TierNumber, TierConfig> = {
  1: { n: 3, patternCount: 4, timePassMs: 10000, timeFailMs: 15000, misclicksPass: 1, misclicksFail: 3, freezeMs: 8000 },
  2: { n: 4, patternCount: 6, timePassMs: 18000, timeFailMs: 25000, misclicksPass: 2, misclicksFail: 4, freezeMs: 8000 },
  3: { n: 5, patternCount: 8, timePassMs: 25000, timeFailMs: 30000, misclicksPass: 3, misclicksFail: 6, freezeMs: 8000 }
};

const SHOW_PATTERN_MS = 2200;

interface TierOutcome {
  tier: TierNumber;
  timeMs: number;
  misclicks: number;
  frozen: boolean;
  passed: boolean;
}

function shuffleIndices(count: number, size: number): number[] {
  const arr = Array.from({ length: size }, (_, i) => i);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, count);
}

function rotateCellIndex(index: number, n: number): number {
  const r = Math.floor(index / n);
  const c = index % n;
  return c * n + (n - 1 - r);
}

const RISK_META: Record<MentalRiskLevel, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  low: { label: 'Low Risk • Healthy Baseline', color: '#1B5E20', bg: '#E8F5E9', icon: <CheckCircle2 className="w-7 h-7" /> },
  moderate: { label: 'Moderate Risk • Support Recommended', color: '#B45309', bg: '#FEF3C7', icon: <AlertTriangle className="w-7 h-7" /> },
  high: { label: 'High Risk • Immediate Support', color: '#0284c7', bg: '#1e293b', icon: <HeartHandshake className="w-7 h-7" /> }
};

const CARE_CENTERS = [
  { name: 'District Hospital OPD — Counselling Wing', place: 'Ward 4, Govt. Hospital Road', distance: '2.1 km', phone: '104' },
  { name: 'Primary Health Centre (PHC) — Urban', place: 'Sector 3, Main Road', distance: '3.4 km', phone: '011-2540-0000' },
  { name: 'District Wellness & Family Mental Clinic', place: 'Block B, Civil Lines', distance: '5.8 km', phone: '14416' }
];

function BoxBreathing({ onDone }: { onDone: () => void }) {
  const [elapsed, setElapsed] = useState(0);
  const startRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    startRef.current = performance.now();
    timerRef.current = setInterval(() => {
      const ms = performance.now() - startRef.current;
      if (ms >= 60000) {
        setElapsed(60000);
        if (timerRef.current) clearInterval(timerRef.current);
      } else {
        setElapsed(ms);
      }
    }, 100);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const phase = Math.floor(elapsed / 4000) % 4;
  const phaseProgress = (elapsed % 4000) / 4000;
  const phaseNames = ['Inhale', 'Hold', 'Exhale', 'Hold'];
  const remaining = Math.ceil((4000 - (elapsed % 4000)) / 1000);
  const overall = Math.ceil((60000 - elapsed) / 1000);

  let scale = 0.55;
  if (phase === 0) scale = 0.55 + 0.45 * phaseProgress;
  else if (phase === 1) scale = 1;
  else if (phase === 2) scale = 1 - 0.45 * phaseProgress;
  else scale = 0.55;

  const done = elapsed >= 60000;

  return (
    <div className="rounded-2xl border-2 border-[#0284c7] bg-[#082f49]/60 p-5 text-white space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-bold">
          <Wind className="w-4 h-4 text-[#38bdf8]" /> 1-Minute Box Breathing
        </div>
        <span className="text-xs font-mono text-[#7dd3fc]">{done ? '0:00' : `0:${String(overall).padStart(2, '0')}`}</span>
      </div>

      <div className="flex flex-col items-center py-4">
        <div className="w-48 h-48 rounded-full border-4 border-[#0284c7] flex items-center justify-center relative">
          <div
            className="rounded-full bg-gradient-to-br from-[#0284c7] to-[#0ea5e9] flex items-center justify-center transition-transform duration-100 ease-linear"
            style={{ width: '100%', height: '100%', transform: `scale(${scale})`, position: 'absolute', opacity: 0.35 }}
          />
          <div className="text-center z-10">
            <div className="text-xl font-bold text-[#bae6fd]">{done ? 'Complete ✓' : phaseNames[phase]}</div>
            <div className="text-4xl font-mono font-extrabold text-white">{done ? '' : remaining}</div>
            <div className="text-[10px] uppercase tracking-widest text-[#7dd3fc]">{done ? 'Namaste' : 'seconds'}</div>
          </div>
        </div>
        <p className="text-[11px] text-[#bae6fd] mt-3 text-center max-w-xs">
          {done ? 'Well done — a full minute of paced breathing. Your nervous system is settling.'
            : 'Breathe with the circle: 4 seconds in, 4 hold, 4 out, 4 hold.'}
        </p>
      </div>

      <button onClick={onDone} className="btn w-full border border-[#0284c7] text-[#bae6fd] hover:bg-[#0284c7]/30 text-xs">
        {done ? 'Close Breathing Guide' : 'Stop Breathing Exercise'}
      </button>
    </div>
  );
}

export const MentalWellnessAssessment: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { patient, recordMentalWellness } = useHealthRecord();

  const [phase, setPhase] = useState<Phase>('intro');
  const [tier, setTier] = useState<TierNumber>(1);
  const [pattern, setPattern] = useState<number[]>([]);
  const [target, setTarget] = useState<number[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [misclicks, setMisclicks] = useState(0);
  const [wrongFlash, setWrongFlash] = useState<number | null>(null);
  const [transitionMsg, setTransitionMsg] = useState<string | null>(null);
  const [outcomes, setOutcomes] = useState<TierOutcome[]>([]);
  const [finalRisk, setFinalRisk] = useState<MentalRiskLevel | null>(null);
  const [finalOutcome, setFinalOutcome] = useState<TierOutcome | null>(null);
  const [showBreathing, setShowBreathing] = useState(false);
  const [bookingState, setBookingState] = useState<'idle' | 'form' | 'done'>('idle');
  const [bookingRef, setBookingRef] = useState('');
  const [bookingSlot, setBookingSlot] = useState('Today, 4:30 PM');
  const [showCenters, setShowCenters] = useState(false);

  const hideTsRef = useRef<number>(0);
  const firstClickRef = useRef<number | null>(null);
  const elapsedTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const cfg = TIERS[tier];

  useEffect(() => () => {
    timeoutsRef.current.forEach(clearTimeout);
    if (elapsedTimerRef.current) clearInterval(elapsedTimerRef.current);
  }, []);

  const later = (fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    timeoutsRef.current.push(id);
  };

  const clearElapsed = () => {
    if (elapsedTimerRef.current) {
      clearInterval(elapsedTimerRef.current);
      elapsedTimerRef.current = null;
    }
  };

  const startTier = (t: TierNumber) => {
    const c = TIERS[t];
    const pat = shuffleIndices(c.patternCount, c.n * c.n);
    setTier(t);
    setPattern(pat);
    setTarget(t === 3 ? pat.map(i => rotateCellIndex(i, c.n)) : [...pat]);
    setSelected([]);
    setMisclicks(0);
    setWrongFlash(null);
    firstClickRef.current = null;
    setElapsedMs(0);
    setPhase('memorize');
    later(() => {
      hideTsRef.current = performance.now();
      firstClickRef.current = null;
      setElapsedMs(0);
      setPhase('recall');
      clearElapsed();
      elapsedTimerRef.current = setInterval(() => {
        setElapsedMs(performance.now() - hideTsRef.current);
      }, 100);
    }, SHOW_PATTERN_MS);
  };

  const recordResult = (risk: MentalRiskLevel, outcome: TierOutcome, completed: TierOutcome[], abandoned: boolean) => {
    setFinalRisk(risk);
    setFinalOutcome(outcome);
    recordMentalWellness({
      assessedAt: new Date().toISOString(),
      finalTier: outcome.tier,
      risk,
      tiersCompleted: completed.map(o => o.tier),
      timeMs: outcome.timeMs,
      misclicks: outcome.misclicks,
      freezingDetected: outcome.frozen,
      abandoned,
      note: abandoned
        ? 'Screening discontinued by citizen during active recall (cognitive stress indicator).'
        : undefined
    });
  };

  const evaluateTier = (t: TierNumber, timeMs: number, mistakes: number, frozen: boolean, passed: boolean) => {
    const outcome: TierOutcome = { tier: t, timeMs, misclicks: mistakes, frozen, passed };
    const nextOutcomes = [...outcomes, outcome];
    setOutcomes(nextOutcomes);

    if (t === 3) {
      recordResult(passed ? 'low' : 'high', outcome, nextOutcomes, false);
      setPhase('result');
      return;
    }

    if (t === 2 && !passed) {
      recordResult('moderate', outcome, nextOutcomes, false);
      setPhase('result');
      return;
    }

    const next = (t + 1) as TierNumber;
    setTransitionMsg(
      passed
        ? `✓ Tier ${t} cleared in ${(timeMs / 1000).toFixed(1)}s — opening deeper check…`
        : `Tier ${t} ${timeMs > TIERS[t].timeFailMs ? 'over target time' : 'borderline'} — opening deeper check…`
    );
    later(() => {
      setTransitionMsg(null);
      startTier(next);
    }, 1300);
  };

  const handleCell = (index: number) => {
    if (phase !== 'recall') return;

    if (selected.includes(index)) {
      setSelected(selected.filter(s => s !== index));
      return;
    }

    if (target.includes(index)) {
      if (firstClickRef.current === null) {
        firstClickRef.current = Math.round(performance.now() - hideTsRef.current);
      }
      const next = [...selected, index];
      setSelected(next);
      if (next.length === cfg.patternCount) {
        clearElapsed();
        const timeMs = Math.round(performance.now() - hideTsRef.current);
        const frozen = firstClickRef.current !== null && firstClickRef.current > cfg.freezeMs;
        const passed = timeMs <= cfg.timePassMs && misclicks <= cfg.misclicksPass && !frozen;
        evaluateTier(tier, timeMs, misclicks, frozen, passed);
      }
    } else {
      setMisclicks(m => m + 1);
      setWrongFlash(index);
      later(() => setWrongFlash(null), 350);
    }
  };

  const handleClose = () => {
    if (phase === 'recall' && (tier === 2 || tier === 3)) {
      clearElapsed();
      const frozen = firstClickRef.current !== null && firstClickRef.current > cfg.freezeMs;
      const risk: MentalRiskLevel = tier === 3 ? 'high' : 'moderate';
      const outcome: TierOutcome = {
        tier,
        timeMs: Math.round(performance.now() - hideTsRef.current),
        misclicks,
        frozen,
        passed: false
      };
      recordResult(risk, outcome, [...outcomes, outcome], true);
    }
    onClose();
  };

  const restart = () => {
    clearElapsed();
    setPhase('intro');
    setTier(1);
    setOutcomes([]);
    setFinalRisk(null);
    setFinalOutcome(null);
    setTransitionMsg(null);
    setShowBreathing(false);
    setBookingState('idle');
    setShowCenters(false);
  };

  const riskMeta = finalRisk ? RISK_META[finalRisk] : null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-[#C8E6C9] animate-fade-in my-6 overflow-hidden">
        {/* Header */}
        <div className={`px-6 py-4 flex justify-between items-start ${finalRisk === 'high' && phase === 'result' ? 'bg-[#1e293b]' : 'bg-gradient-to-r from-[#0284c7] to-[#0369a1]'} text-white`}>
          <div>
            <h3 className="text-lg font-bold font-display flex items-center gap-2">
              <Brain className="w-5 h-5" /> Mental Wellness & Trauma Care Assessment
            </h3>
            <p className="text-[11px] text-white/80 mt-0.5">
              Pattern memory & response metrics • DPDP-compliant self-screening • Not a clinical diagnosis
            </p>
          </div>
          <button onClick={handleClose} className="text-white/70 hover:text-white font-bold text-xl leading-none p-1" aria-label="Close assessment">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tier progress rail */}
        {(phase === 'memorize' || phase === 'recall') && (
          <div className="px-6 py-3 bg-[#f0f9ff] border-b border-[#e0f2fe] flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {( [1, 2, 3] as TierNumber[]).map(t => (
                <span
                  key={t}
                  className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border ${
                    t < tier ? 'bg-[#1B5E20] text-white border-[#1B5E20]'
                      : t === tier ? 'bg-white text-[#0284c7] border-[#0284c7]'
                        : 'bg-white text-gray-400 border-gray-200'
                  }`}
                >
                  Tier {t} • {TIERS[t].n}×{TIERS[t].n}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-4 text-[11px] font-mono font-bold text-[#0369a1]">
              <span className="flex items-center gap-1"><Timer className="w-3.5 h-3.5" />{elapsedMs}ms / {cfg.timePassMs}ms</span>
              <span className="flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5" />{misclicks} misclick{misclicks === 1 ? '' : 's'}</span>
            </div>
          </div>
        )}

        <div className="p-6 space-y-5">
          {/* Transition banner */}
          {transitionMsg && (
            <div className="bg-[#ecfdf5] border border-[#6ee7b7] text-[#065f46] rounded-xl px-4 py-3 text-sm font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#10b981]" /> {transitionMsg}
            </div>
          )}

          {/* INTRO */}
          {phase === 'intro' && (
            <div className="space-y-5">
              <div className="bg-[#f0f9ff] border border-[#bae6fd] rounded-xl p-4 text-xs text-[#075985] leading-relaxed">
                This check uses a simple <strong>grid pattern memory puzzle</strong> to measure your focus, response speed
                and reaction under load. It runs in three escalating tiers — the harder the tier, the deeper the check.
                Your metrics stay on your own health record under DPDP rules.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { t: 1, n: 3, target: '< 10s, ≤ 1 misclick', name: 'Healthy Baseline' },
                  { t: 2, n: 4, target: '< 18s, ≤ 2 misclicks', name: 'Moderate Check' },
                  { t: 3, n: 5, target: '< 25s + rotation', name: 'High Stress Check' }
                ].map(item => (
                  <div key={item.t} className="border border-[#e0f2fe] rounded-xl p-4 bg-white text-center">
                    <div className="text-xs font-extrabold text-[#0284c7] uppercase">Tier {item.t}</div>
                    <div className="text-2xl font-bold text-[#0c4a6e] my-1">{item.n}×{item.n}</div>
                    <div className="text-[10px] text-[#0369a1] font-semibold">{item.name}</div>
                    <div className="text-[10px] text-gray-500 mt-1 font-mono">{item.target}</div>
                  </div>
                ))}
              </div>

              <ul className="space-y-2 text-xs text-[#38523C]">
                <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-[#1B5E20] shrink-0" /> You will see a pattern of highlighted cells, then repeat it from memory.</li>
                <li className="flex gap-2"><RotateCw className="w-4 h-4 text-[#0284c7] shrink-0" /> Tier 3 rotates the board 90° — recall where the cells moved.</li>
                <li className="flex gap-2"><ShieldCheck className="w-4 h-4 text-[#1B5E20] shrink-0" /> If stress indicators appear, you will be offered free official support — no judgement, no cost.</li>
              </ul>

              <button onClick={() => startTier(1)} className="btn btn-primary w-full py-3 text-sm bg-[#0284c7] hover:bg-[#0369a1]">
                <Brain className="w-4 h-4" /> Begin Assessment
              </button>
            </div>
          )}

          {/* MEMORIZE / RECALL */}
          {(phase === 'memorize' || phase === 'recall') && (
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-sm font-bold text-[#0c4a6e]">
                  {phase === 'memorize'
                    ? `Memorize the ${cfg.patternCount} highlighted cells`
                    : tier === 3
                      ? 'Recall the pattern in its ROTATED position (90°)'
                      : `Tap the ${cfg.patternCount} cells you remembered`}
                </p>
                <p className="text-[11px] text-gray-500 mt-1">
                  {phase === 'memorize'
                    ? 'The pattern will hide in a moment…'
                    : tier === 3
                      ? 'The board has rotated — think where each cell moved.'
                      : 'Time-to-solve is being measured with performance.now()'}
                </p>
              </div>

              <div className="mx-auto w-full max-w-[340px] aspect-square p-2 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0]">
                <div
                  className={`grid w-full h-full gap-2 ${tier === 3 && phase === 'recall' ? 'rotate-90' : ''} transition-transform duration-300`}
                  style={{ gridTemplateColumns: `repeat(${cfg.n}, minmax(0,1fr))` }}
                >
                  {Array.from({ length: cfg.n * cfg.n }, (_, i) => {
                    const isPattern = phase === 'memorize' && pattern.includes(i);
                    const isSelected = phase === 'recall' && selected.includes(i);
                    const isWrong = wrongFlash === i;
                    return (
                      <button
                        key={i}
                        onClick={() => handleCell(i)}
                        disabled={phase !== 'recall'}
                        aria-label={`Grid cell ${i + 1}`}
                        className={`aspect-square rounded-lg border-2 transition-all duration-150 ${
                          isWrong
                            ? 'bg-[#FEE2E2] border-[#DC2626] scale-95'
                            : isPattern
                              ? 'bg-[#0284c7] border-[#0369a1] shadow-md'
                              : isSelected
                                ? 'bg-[#1B5E20] border-[#144517] shadow-md'
                                : 'bg-white border-[#e2e8f0] hover:border-[#0284c7] cursor-pointer'
                        }`}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-center gap-3 text-[11px]">
                <span className="flex items-center gap-1.5 text-[#0369a1] font-semibold"><span className="w-3 h-3 rounded bg-[#0284c7] inline-block" /> Pattern</span>
                <span className="flex items-center gap-1.5 text-[#1B5E20] font-semibold"><span className="w-3 h-3 rounded bg-[#1B5E20] inline-block" /> Your selection</span>
                <span className="flex items-center gap-1.5 text-[#DC2626] font-semibold"><span className="w-3 h-3 rounded bg-[#DC2626] inline-block" /> Misclick</span>
              </div>
            </div>
          )}

          {/* RESULT */}
          {phase === 'result' && finalRisk && riskMeta && (
            <div className="space-y-5">
              <div
                className={`rounded-2xl p-5 flex items-start gap-4 ${finalRisk === 'high' ? 'bg-[#1e293b] text-white' : 'text-white'}`}
                style={finalRisk !== 'high' ? { background: riskMeta.color } : undefined}
              >
                <div className="shrink-0 mt-0.5">{riskMeta.icon}</div>
                <div className="flex-1">
                  <div className="font-bold text-lg font-display">{riskMeta.label}</div>
                  {finalRisk === 'high' ? (
                    <p className="text-sm text-[#bae6fd] mt-1 font-medium">
                      Your focus and response metrics indicate high stress and mental fatigue.
                    </p>
                  ) : finalRisk === 'moderate' ? (
                    <p className="text-sm text-[#fef3c7] mt-1 font-medium">
                      Your response patterns suggest elevated mental fatigue. This is common and support is available.
                    </p>
                  ) : (
                    <p className="text-sm text-[#d0ebd2] mt-1 font-medium">
                      Steady focus and healthy response times — you are tracking well. Keep protecting your wellbeing.
                    </p>
                  )}
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-3 text-center">
                  <div className="text-[10px] uppercase text-gray-500 font-bold">Final Tier</div>
                  <div className="text-xl font-bold text-[#0c4a6e]">{finalOutcome?.tier ?? '—'}</div>
                </div>
                <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-3 text-center">
                  <div className="text-[10px] uppercase text-gray-500 font-bold">Time</div>
                  <div className="text-xl font-bold text-[#0c4a6e]">{((finalOutcome?.timeMs ?? 0) / 1000).toFixed(1)}s</div>
                </div>
                <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-3 text-center">
                  <div className="text-[10px] uppercase text-gray-500 font-bold">Misclicks</div>
                  <div className="text-xl font-bold text-[#0c4a6e]">{finalOutcome?.misclicks ?? 0}</div>
                </div>
                <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-3 text-center">
                  <div className="text-[10px] uppercase text-gray-500 font-bold">Freezing</div>
                  <div className={`text-xl font-bold ${finalOutcome?.frozen ? 'text-[#DC2626]' : 'text-[#1B5E20]'}`}>
                    {finalOutcome?.frozen ? 'Detected' : 'None'}
                  </div>
                </div>
              </div>

              {/* LOW RISK */}
              {finalRisk === 'low' && (
                <div className="space-y-4">
                  <div className="bg-[#E8F5E9] border border-[#C8E6C9] rounded-xl p-4">
                    <div className="text-sm font-bold text-[#1B5E20] mb-2 flex items-center gap-2"><Sparkles className="w-4 h-4" /> General Wellbeing Tips</div>
                    <ul className="text-xs text-[#38523C] space-y-1.5">
                      <li>• Aim for 7–8 hours of restful sleep on a regular schedule.</li>
                      <li>• Stay active — a 30-minute walk, yoga or sports most days.</li>
                      <li>• Keep regular contact with family, friends or community groups.</li>
                      <li>• Take short breathing breaks during work or study (try the 1-minute guide below).</li>
                      <li>• Re-screen in 3–6 months, or sooner if you notice changes.</li>
                    </ul>
                  </div>
                  <BoxBreathing onDone={() => setShowBreathing(false)} />
                </div>
              )}

              {/* MODERATE RISK */}
              {finalRisk === 'moderate' && (
                <div className="space-y-4">
                  <div className="bg-[#FEF3C7] border border-[#FDE68A] rounded-xl p-4">
                    <div className="text-sm font-bold text-[#B45309] mb-2 flex items-center gap-2"><HeartHandshake className="w-4 h-4" /> Recommended Next Steps</div>
                    <ul className="text-xs text-[#78350F] space-y-1.5">
                      <li>• Speak with a counsellor at your nearest PHC or district wellness clinic.</li>
                      <li>• Use the 1-minute Box Breathing guide below to steady your nervous system.</li>
                      <li>• Reduce isolated, overstimulating screen time and schedule rest breaks.</li>
                      <li>• Reassess in 2 weeks, or sooner if symptoms persist or worsen.</li>
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button onClick={() => setShowBreathing(s => !s)} className="btn border border-[#0284c7] text-[#0369a1] hover:bg-[#f0f9ff] text-xs">
                      <Wind className="w-4 h-4" /> {showBreathing ? 'Hide' : 'Start'} Box Breathing
                    </button>
                    <button onClick={() => setBookingState('form')} className="btn bg-[#0284c7] text-white hover:bg-[#0369a1] text-xs">
                      <CalendarCheck className="w-4 h-4" /> Book Free District Psychologist Consultation
                    </button>
                    <a href="tel:14416" className="btn border border-[#1B5E20] text-[#1B5E20] hover:bg-[#E8F5E9] text-xs">
                      <Phone className="w-4 h-4" /> Tele-MANAS 14416
                    </a>
                    <button onClick={() => setShowCenters(s => !s)} className="btn border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs">
                      <MapPin className="w-4 h-4" /> Find Nearby Public Care Centers
                    </button>
                  </div>

                  {showBreathing && <BoxBreathing onDone={() => setShowBreathing(false)} />}
                </div>
              )}

              {/* HIGH RISK — Official Intervention */}
              {finalRisk === 'high' && (
                <div className="space-y-4">
                  <div className="bg-[#1e293b] border-2 border-[#0284c7] rounded-2xl p-5 space-y-4">
                    <div className="flex items-center gap-3 text-white">
                      <HeartHandshake className="w-6 h-6 text-[#0284c7]" />
                      <div>
                        <div className="font-bold text-base">Official Support Referral</div>
                        <div className="text-[11px] text-[#7dd3fc]">Ministry of Health & Family Welfare • Free of cost</div>
                      </div>
                    </div>
                    <div className="bg-[#0284c7]/15 border border-[#0284c7]/50 rounded-xl px-4 py-3 text-sm text-[#e0f2fe] font-medium">
                      “Your focus and response metrics indicate high stress and mental fatigue.”
                    </div>

                    <div className="space-y-2.5">
                      <button
                        onClick={() => setBookingState(bookingState === 'form' ? 'idle' : 'form')}
                        className="w-full btn bg-[#0284c7] text-white hover:bg-[#0369a1] text-xs justify-start"
                      >
                        <CalendarCheck className="w-4 h-4" /> Book Free District Psychologist Consultation
                      </button>
                      <a href="tel:14416" className="w-full btn bg-[#0ea5e9] text-white hover:bg-[#0284c7] text-xs justify-start">
                        <Phone className="w-4 h-4" /> Connect to Tele-MANAS / National Helpline (14416)
                      </a>
                      <button
                        onClick={() => setShowCenters(s => !s)}
                        className="w-full btn border border-[#334155] text-[#bae6fd] hover:bg-[#0f172a] text-xs justify-start"
                      >
                        <MapPin className="w-4 h-4" /> Find Nearby Public Care Centers
                      </button>
                    </div>
                  </div>

                  {showCenters && (
                    <div className="space-y-2">
                      {CARE_CENTERS.map(c => (
                        <div key={c.name} className="border border-[#e2e8f0] rounded-xl p-3 flex items-center gap-3 bg-[#f8fafc]">
                          <Building2 className="w-5 h-5 text-[#0284c7] shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-bold text-[#0c4a6e] truncate">{c.name}</div>
                            <div className="text-[11px] text-gray-500">{c.place} • {c.distance}</div>
                          </div>
                          <a href={`tel:${c.phone}`} className="text-[11px] font-bold text-[#0284c7] hover:underline shrink-0">📞 {c.phone}</a>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-3">
                    <button onClick={() => setShowBreathing(s => !s)} className="btn border border-[#334155] text-[#1e293b] hover:bg-gray-100 text-xs">
                      <Wind className="w-4 h-4" /> {showBreathing ? 'Hide' : 'Start'} Box Breathing
                    </button>
                    <span className="text-[10px] text-gray-500 text-right">
                      This is a supportive screening, not a diagnosis. In an emergency call 112.
                    </span>
                  </div>

                  {showBreathing && <BoxBreathing onDone={() => setShowBreathing(false)} />}
                </div>
              )}

              {/* Booking form */}
              {bookingState === 'form' && (
                <div className="border-2 border-[#0284c7] rounded-2xl p-4 bg-[#f0f9ff] space-y-3">
                  <div className="font-bold text-sm text-[#0c4a6e] flex items-center gap-2">
                    <CalendarCheck className="w-4 h-4" /> Book Free District Psychologist Consultation
                  </div>
                  <div className="text-[11px] text-[#0369a1]">
                    Citizen: <strong>{patient.fullName}</strong> • ID: <span className="font-mono">{patient.permanentId}</span>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#0c4a6e] mb-1">Preferred Slot (Free • Government facility)</label>
                    <select
                      value={bookingSlot}
                      onChange={e => setBookingSlot(e.target.value)}
                      className="w-full px-3 py-2 border border-[#bae6fd] rounded-lg text-sm font-semibold bg-white"
                    >
                      <option>Today, 4:30 PM</option>
                      <option>Tomorrow, 10:00 AM</option>
                      <option>Tomorrow, 3:00 PM</option>
                      <option>Day after, 11:30 AM</option>
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setBookingState('idle')} className="btn border border-gray-300 text-gray-600 hover:bg-white text-xs flex-1">
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        setBookingRef(`PSY-${Date.now().toString().slice(-6)}`);
                        setBookingState('done');
                      }}
                      className="btn bg-[#0284c7] text-white hover:bg-[#0369a1] text-xs flex-1"
                    >
                      Confirm Booking
                    </button>
                  </div>
                </div>
              )}

              {bookingState === 'done' && (
                <div className="border border-[#6ee7b7] bg-[#ecfdf5] rounded-2xl p-4 text-[#065f46] space-y-1">
                  <div className="font-bold text-sm flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Consultation Confirmed</div>
                  <p className="text-xs">
                    Slot: <strong>{bookingSlot}</strong> • Reference: <span className="font-mono font-bold">{bookingRef}</span>
                    <br />District Hospital OPD, Counselling Wing. Carry your Permanent Health ID. Reminder will be sent to your registered mobile.
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap gap-3 justify-end border-t border-[#e2e8f0] pt-4">
                <button onClick={restart} className="btn border border-[#C8E6C9] text-[#1B5E20] hover:bg-[#E8F5E9] text-xs">
                  Repeat Screening
                </button>
                <button onClick={onClose} className="btn btn-primary text-xs bg-[#0284c7] hover:bg-[#0369a1]">
                  Finish & Return to Portal
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MentalWellnessAssessment;
