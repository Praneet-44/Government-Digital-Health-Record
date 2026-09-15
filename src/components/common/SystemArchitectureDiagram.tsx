import React from 'react';
import { 
  Code, Cpu, ShieldCheck, Database, Lock, Server, 
  FileText, Scan, Clock, Bell, CheckCircle2, User, 
  Stethoscope, Monitor, Building2, ArrowRight
} from 'lucide-react';

export const SystemArchitectureDiagram: React.FC = () => {
  return (
    <div className="w-full bg-[#0F172A] text-white p-6 sm:p-8 rounded-3xl border border-slate-700 shadow-2xl space-y-6 font-sans">
      
      {/* Main Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800 pb-4 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#4ADE80] bg-[#4ADE80]/10 px-3 py-1 rounded-full border border-[#4ADE80]/20">
            Platform Architecture & Workflow
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
            Government Digital Health Record & AI Clinical Intake
          </h2>
        </div>
        <div className="text-xs text-slate-400 text-right">
          <div>Architecture Version: <span className="text-white font-mono font-bold">v2.4 (2026)</span></div>
          <div>Standards: <span className="text-[#60A5FA] font-bold">ABHA / ABDM & EHR Guidelines</span></div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT PANEL: TECH STACK (4 Cols) */}
        <div className="lg:col-span-4 bg-slate-900/90 rounded-2xl p-5 border border-slate-800 flex flex-col justify-between space-y-4">
          <div className="bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700 text-center font-bold text-sm tracking-wider uppercase text-blue-400 flex items-center justify-center gap-2">
            <Code className="w-4 h-4 text-blue-400" /> TECH STACK
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto text-xs">
            {/* Frontend */}
            <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700/60 hover:border-blue-500/50 transition-all">
              <div className="flex items-center gap-2 font-bold text-blue-400 mb-1">
                <Code className="w-4 h-4" /> FRONTEND
              </div>
              <ul className="list-disc list-inside text-slate-300 space-y-0.5 font-mono text-[11px]">
                <li>React 19 & TypeScript</li>
                <li>Tailwind CSS v4 & Lucide Icons</li>
                <li>Vite 8 Build Tooling</li>
                <li>Canvas Confetti & Responsive UI</li>
              </ul>
            </div>

            {/* AI Engine */}
            <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700/60 hover:border-emerald-500/50 transition-all">
              <div className="flex items-center gap-2 font-bold text-emerald-400 mb-1">
                <Cpu className="w-4 h-4" /> CLINICAL AI ENGINE
              </div>
              <ul className="list-disc list-inside text-slate-300 space-y-0.5 font-mono text-[11px]">
                <li>AI OCR Prescription Scanner</li>
                <li>NLP Dosage & Allergy Parser</li>
                <li>Lab Report Entity Extractor</li>
                <li>Confidence Score Validator</li>
              </ul>
            </div>

            {/* Auth & Identity */}
            <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700/60 hover:border-purple-500/50 transition-all">
              <div className="flex items-center gap-2 font-bold text-purple-400 mb-1">
                <ShieldCheck className="w-4 h-4" /> AUTH & IDENTITY
              </div>
              <ul className="list-disc list-inside text-slate-300 space-y-0.5 font-mono text-[11px]">
                <li>ABHA Health ID Integration</li>
                <li>UHID Permanent Registration</li>
                <li>OTP Mobile Authentication</li>
                <li>Multi-Role Access Tokens</li>
              </ul>
            </div>

            {/* Database & State */}
            <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700/60 hover:border-cyan-500/50 transition-all">
              <div className="flex items-center gap-2 font-bold text-cyan-400 mb-1">
                <Database className="w-4 h-4" /> DATA & STORAGE
              </div>
              <ul className="list-disc list-inside text-slate-300 space-y-0.5 font-mono text-[11px]">
                <li>React Context API State</li>
                <li>IndexedDB / LocalStorage Cache</li>
                <li>EHR Timeline Data Models</li>
                <li>Structured JSON Health Profile</li>
              </ul>
            </div>

            {/* Security & Audit */}
            <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700/60 hover:border-amber-500/50 transition-all">
              <div className="flex items-center gap-2 font-bold text-amber-400 mb-1">
                <Lock className="w-4 h-4" /> SECURITY & AUDIT
              </div>
              <ul className="list-disc list-inside text-slate-300 space-y-0.5 font-mono text-[11px]">
                <li>Doctor Verification Hierarchy</li>
                <li>Immutable Access Audit Logs</li>
                <li>Consent Authorization Engine</li>
                <li>Patient-Doctor Privacy Shield</li>
              </ul>
            </div>

            {/* Deployment */}
            <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700/60 hover:border-indigo-500/50 transition-all">
              <div className="flex items-center gap-2 font-bold text-indigo-400 mb-1">
                <Server className="w-4 h-4" /> DEPLOYMENT
              </div>
              <ul className="list-disc list-inside text-slate-300 space-y-0.5 font-mono text-[11px]">
                <li>Vite Production Bundle</li>
                <li>Oxlint Code Verification</li>
                <li>Cloud Hosting Ready</li>
              </ul>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: SYSTEM FLOW, ROLES & DATA FLOW (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
          
          {/* SYSTEM FLOW SECTION */}
          <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 space-y-4">
            <div className="bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700 text-center font-bold text-sm tracking-wider uppercase text-emerald-400 flex items-center justify-center gap-2">
              <Scan className="w-4 h-4 text-emerald-400" /> SYSTEM FLOW: PATIENT INTAKE TO DOCTOR CLINICAL VERIFICATION
            </div>

            {/* 6 Steps Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {/* Step 1 */}
              <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700 text-center relative flex flex-col items-center justify-between">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-400 flex items-center justify-center text-blue-400 mb-2">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="text-[11px] font-bold text-blue-400 uppercase tracking-wide">1. Document Upload</div>
                <p className="text-[10px] text-slate-300 mt-1">Patient or kiosk uploads prescription scan / lab report</p>
              </div>

              {/* Step 2 */}
              <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700 text-center relative flex flex-col items-center justify-between">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-400 flex items-center justify-center text-purple-400 mb-2">
                  <Cpu className="w-4 h-4" />
                </div>
                <div className="text-[11px] font-bold text-purple-400 uppercase tracking-wide">2. AI OCR Scan</div>
                <p className="text-[10px] text-slate-300 mt-1">AI parses meds, dosages, allergies & diagnoses</p>
              </div>

              {/* Step 3 */}
              <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700 text-center relative flex flex-col items-center justify-between">
                <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-400 mb-2">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wide">3. Pending Queue</div>
                <p className="text-[10px] text-slate-300 mt-1">Saved as 'Pending Verification' in queue</p>
              </div>

              {/* Step 4 */}
              <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700 text-center relative flex flex-col items-center justify-between">
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-400 mb-2">
                  <Bell className="w-4 h-4" />
                </div>
                <div className="text-[11px] font-bold text-cyan-400 uppercase tracking-wide">4. Doctor Alert</div>
                <p className="text-[10px] text-slate-300 mt-1">Doctor workspace loads patient intake items</p>
              </div>

              {/* Step 5 */}
              <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700 text-center relative flex flex-col items-center justify-between">
                <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-400 flex items-center justify-center text-indigo-400 mb-2">
                  <Stethoscope className="w-4 h-4" />
                </div>
                <div className="text-[11px] font-bold text-indigo-400 uppercase tracking-wide">5. Doctor Verification</div>
                <p className="text-[10px] text-slate-300 mt-1">Clinician verifies or edits extracted claims</p>
              </div>

              {/* Step 6 */}
              <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700 text-center relative flex flex-col items-center justify-between">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400 mb-2">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wide">6. EHR Updated</div>
                <p className="text-[10px] text-slate-300 mt-1">Record syncs as Verified across ABHA profile</p>
              </div>
            </div>
          </div>

          {/* KEY ROLES SECTION */}
          <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 space-y-4">
            <div className="bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700 text-center font-bold text-sm tracking-wider uppercase text-purple-400 flex items-center justify-center gap-2">
              <User className="w-4 h-4 text-purple-400" /> KEY STAKEHOLDER ROLES
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-500/20 border border-blue-400/30 text-blue-400">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-white">CITIZEN / PATIENT</div>
                  <p className="text-[11px] text-slate-300 mt-0.5">Upload records, view verified timeline, check allergies & grant doctor access.</p>
                </div>
              </div>

              <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/20 border border-emerald-400/30 text-emerald-400">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-white">DOCTOR / CLINICIAN</div>
                  <p className="text-[11px] text-slate-300 mt-0.5">Verify AI OCR extractions, inspect OPD history, add verified prescriptions.</p>
                </div>
              </div>

              <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-amber-500/20 border border-amber-400/30 text-amber-400">
                  <Monitor className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-white">KIOSK & REGISTRATION</div>
                  <p className="text-[11px] text-slate-300 mt-0.5">Touch & voice intake at rural PHC centers; fast patient onboarding & scanning.</p>
                </div>
              </div>

              <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-purple-500/20 border border-purple-400/30 text-purple-400">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-white">GOVERNMENT ADMIN</div>
                  <p className="text-[11px] text-slate-300 mt-0.5">Audit consent logs, track PHC digital adoption, manage roles & security.</p>
                </div>
              </div>
            </div>
          </div>

          {/* DATA FLOW OVERVIEW SECTION */}
          <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800">
            <div className="bg-slate-800/80 px-4 py-1.5 rounded-xl border border-slate-700 text-center font-bold text-xs tracking-wider uppercase text-cyan-400 flex items-center justify-center gap-2 mb-3">
              DATA FLOW OVERVIEW
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-bold">
              <div className="flex items-center gap-1.5 bg-blue-500/20 text-blue-300 px-3 py-1.5 rounded-lg border border-blue-500/30">
                <FileText className="w-3.5 h-3.5" /> Report Uploaded
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 hidden sm:block" />
              <div className="flex items-center gap-1.5 bg-purple-500/20 text-purple-300 px-3 py-1.5 rounded-lg border border-purple-500/30">
                <Cpu className="w-3.5 h-3.5" /> AI OCR Extract
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 hidden sm:block" />
              <div className="flex items-center gap-1.5 bg-amber-500/20 text-amber-300 px-3 py-1.5 rounded-lg border border-amber-500/30">
                <Clock className="w-3.5 h-3.5" /> Pending Queue
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 hidden sm:block" />
              <div className="flex items-center gap-1.5 bg-indigo-500/20 text-indigo-300 px-3 py-1.5 rounded-lg border border-indigo-500/30">
                <Stethoscope className="w-3.5 h-3.5" /> Clinical Review
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 hidden sm:block" />
              <div className="flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 px-3 py-1.5 rounded-lg border border-emerald-500/30">
                <CheckCircle2 className="w-3.5 h-3.5" /> ABHA Record Sync
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default SystemArchitectureDiagram;
