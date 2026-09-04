import React from 'react';
import { useHealthRecord } from '../../context/HealthRecordContext';
import { AlertOctagon, Pill, Activity, FileText, Calendar, ShieldCheck, ArrowRight, Upload, Bot, PlusCircle } from 'lucide-react';

interface CitizenDashboardProps {
  onNavigateTab: (tab: string) => void;
  onOpenReportModal: () => void;
  onOpenAIIntake: () => void;
}

export const CitizenDashboard: React.FC<CitizenDashboardProps> = ({
  onNavigateTab,
  onOpenReportModal,
  onOpenAIIntake
}) => {
  const { patient } = useHealthRecord();

  const criticalAllergies = patient.allergies.filter(a => a.severity === 'critical');
  const activeMeds = patient.medications.filter(m => m.status === 'active');
  const verifiedMeds = activeMeds.filter(m => m.clinicalStatus === 'verified');

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#1B5E20] to-[#2E7D32] text-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#A5D6A7] uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4 text-[#66BB6A]" /> Verified Permanent Digital Health Record
          </div>
          <h2 className="text-2xl font-bold text-white font-display">Welcome back, {patient.fullName}</h2>
          <p className="text-xs text-[#D0EBD2] mt-1">
            Permanent Health ID: <span className="font-mono text-white font-bold">{patient.permanentId}</span> • ABHA: <span className="font-mono text-white font-bold">{patient.abhaId}</span>
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={onOpenAIIntake}
            className="bg-[#66BB6A] text-[#1B5E20] font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-[#54a858] transition-all flex items-center gap-1.5 shadow"
          >
            <Bot className="w-4 h-4" /> Start AI Health Intake
          </button>
          <button
            onClick={onOpenReportModal}
            className="bg-[#123814] text-white border border-[#27702C] font-semibold text-xs px-4 py-2.5 rounded-xl hover:bg-[#1B5E20] transition-all flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4 text-[#66BB6A]" /> Report New Item
          </button>
        </div>
      </div>

      {/* Critical Alert Banner if critical allergy present */}
      {criticalAllergies.length > 0 && (
        <div className="bg-[#FEE2E2] border-2 border-[#FCA5A5] rounded-2xl p-4 flex items-start gap-3 text-[#B91C1C]">
          <AlertOctagon className="w-6 h-6 text-[#DC2626] shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="flex items-center gap-2 font-bold text-sm">
              <span>🔴 CRITICAL MEDICAL ALERT VISIBLE TO DOCTORS</span>
              <span className="bg-[#B91C1C] text-white text-[10px] uppercase px-2 py-0.5 rounded font-extrabold">Doctor Verified</span>
            </div>
            <p className="text-xs mt-1 text-[#7F1D1D]">
              <strong>{criticalAllergies[0].allergen}:</strong> {criticalAllergies[0].reaction} (Verified by {criticalAllergies[0].verifiedBy})
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('allergies')}
            className="text-xs font-bold underline hover:text-[#7F1D1D] shrink-0"
          >
            View Allergies
          </button>
        </div>
      )}

      {/* Overview Stat Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1 */}
        <div
          onClick={() => onNavigateTab('allergies')}
          className="card cursor-pointer hover:border-[#66BB6A] transition-all border-l-4 border-l-[#DC2626]"
        >
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-semibold text-[#38523C] uppercase">Critical Allergies</span>
            <AlertOctagon className="w-5 h-5 text-[#DC2626]" />
          </div>
          <div className="text-2xl font-bold text-[#1B5E20]">{patient.allergies.length}</div>
          <p className="text-[11px] text-[#2E7D32] mt-1 flex items-center gap-1 font-medium">
            {criticalAllergies.length} Critical Flagged <ArrowRight className="w-3 h-3" />
          </p>
        </div>

        {/* Stat 2 */}
        <div
          onClick={() => onNavigateTab('medications')}
          className="card cursor-pointer hover:border-[#66BB6A] transition-all border-l-4 border-l-[#1B5E20]"
        >
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-semibold text-[#38523C] uppercase">Active Medicines</span>
            <Pill className="w-5 h-5 text-[#1B5E20]" />
          </div>
          <div className="text-2xl font-bold text-[#1B5E20]">{activeMeds.length}</div>
          <p className="text-[11px] text-[#2E7D32] mt-1 flex items-center gap-1 font-medium">
            {verifiedMeds.length} Doctor Verified <ArrowRight className="w-3 h-3" />
          </p>
        </div>

        {/* Stat 3 */}
        <div
          onClick={() => onNavigateTab('operations')}
          className="card cursor-pointer hover:border-[#66BB6A] transition-all border-l-4 border-l-[#A5D6A7]"
        >
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-semibold text-[#38523C] uppercase">Previous Surgeries</span>
            <Activity className="w-5 h-5 text-[#1B5E20]" />
          </div>
          <div className="text-2xl font-bold text-[#1B5E20]">{patient.operations.length}</div>
          <p className="text-[11px] text-[#2E7D32] mt-1 flex items-center gap-1 font-medium">
            Verified Surgery Record <ArrowRight className="w-3 h-3" />
          </p>
        </div>

        {/* Stat 4 */}
        <div
          onClick={() => onNavigateTab('documents')}
          className="card cursor-pointer hover:border-[#66BB6A] transition-all border-l-4 border-l-[#2563EB]"
        >
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-semibold text-[#38523C] uppercase">Medical Documents</span>
            <FileText className="w-5 h-5 text-[#2563EB]" />
          </div>
          <div className="text-2xl font-bold text-[#1B5E20]">{patient.documents.length}</div>
          <p className="text-[11px] text-[#2563EB] mt-1 flex items-center gap-1 font-medium">
            AI OCR Processed <ArrowRight className="w-3 h-3" />
          </p>
        </div>
      </div>

      {/* Main Navigation Modules Grid */}
      <div className="bg-white rounded-2xl p-6 border border-[#C8E6C9] shadow-sm">
        <h3 className="text-lg font-bold text-[#1B5E20] mb-4 font-display">Health Profile Navigation</h3>
        <p className="text-xs text-[#38523C] mb-6">
          Access specific health domain records below. Patient inputs remain pending until verified by doctor.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <button
            onClick={() => onNavigateTab('profile')}
            className="p-4 rounded-xl border border-[#C8E6C9] bg-[#E8F5E9] hover:bg-[#D4EDD6] transition-all text-left flex flex-col justify-between"
          >
            <div className="text-[#1B5E20] font-bold text-sm mb-1">📋 Health Profile</div>
            <span className="text-[11px] text-[#38523C]">Vitals, Blood Group, Contacts</span>
          </button>

          <button
            onClick={() => onNavigateTab('allergies')}
            className="p-4 rounded-xl border border-[#C8E6C9] bg-[#E8F5E9] hover:bg-[#D4EDD6] transition-all text-left flex flex-col justify-between"
          >
            <div className="text-[#1B5E20] font-bold text-sm mb-1">🔴 Allergies</div>
            <span className="text-[11px] text-[#38523C]">Drug & Food Allergies</span>
          </button>

          <button
            onClick={() => onNavigateTab('medications')}
            className="p-4 rounded-xl border border-[#C8E6C9] bg-[#E8F5E9] hover:bg-[#D4EDD6] transition-all text-left flex flex-col justify-between"
          >
            <div className="text-[#1B5E20] font-bold text-sm mb-1">💊 Medications</div>
            <span className="text-[11px] text-[#38523C]">Current & Past Prescriptions</span>
          </button>

          <button
            onClick={() => onNavigateTab('operations')}
            className="p-4 rounded-xl border border-[#C8E6C9] bg-[#E8F5E9] hover:bg-[#D4EDD6] transition-all text-left flex flex-col justify-between"
          >
            <div className="text-[#1B5E20] font-bold text-sm mb-1">🏥 Surgeries</div>
            <span className="text-[11px] text-[#38523C]">Operation History</span>
          </button>

          <button
            onClick={() => onNavigateTab('documents')}
            className="p-4 rounded-xl border border-[#C8E6C9] bg-[#E8F5E9] hover:bg-[#D4EDD6] transition-all text-left flex flex-col justify-between"
          >
            <div className="text-[#1B5E20] font-bold text-sm mb-1">📄 Documents</div>
            <span className="text-[11px] text-[#38523C]">Lab & Scan Locker</span>
          </button>

          <button
            onClick={() => onNavigateTab('timeline')}
            className="p-4 rounded-xl border border-[#C8E6C9] bg-[#E8F5E9] hover:bg-[#D4EDD6] transition-all text-left flex flex-col justify-between"
          >
            <div className="text-[#1B5E20] font-bold text-sm mb-1">📅 Health Timeline</div>
            <span className="text-[11px] text-[#38523C]">Chronological Record</span>
          </button>

          <button
            onClick={() => onNavigateTab('consent')}
            className="p-4 rounded-xl border border-[#C8E6C9] bg-[#E8F5E9] hover:bg-[#D4EDD6] transition-all text-left flex flex-col justify-between"
          >
            <div className="text-[#1B5E20] font-bold text-sm mb-1">🔒 Consent & Access</div>
            <span className="text-[11px] text-[#38523C]">Doctor Access Logs</span>
          </button>

          <button
            onClick={onOpenAIIntake}
            className="p-4 rounded-xl border-2 border-[#66BB6A] bg-[#1B5E20] text-white hover:bg-[#144517] transition-all text-left flex flex-col justify-between"
          >
            <div className="font-bold text-sm mb-1 text-[#66BB6A]">🤖 AI Voice Intake</div>
            <span className="text-[11px] text-[#A5D6A7]">Smart Symptom Assistant</span>
          </button>
        </div>
      </div>

      {/* Recent Consultation Activity & Access History preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h4 className="font-bold text-[#1B5E20] mb-3 text-sm flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#66BB6A]" /> Recent Health Events
          </h4>
          <div className="space-y-3">
            {patient.timeline.slice(0, 3).map((item) => (
              <div key={item.id} className="p-3 rounded-lg bg-[#E8F5E9] text-xs border border-[#C8E6C9]">
                <div className="flex justify-between font-semibold text-[#1B5E20]">
                  <span>{item.title}</span>
                  <span className="text-[10px] text-[#38523C]">{item.date}</span>
                </div>
                <p className="text-[11px] text-[#2E7D32] mt-1">{item.facility} • {item.summary}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h4 className="font-bold text-[#1B5E20] mb-3 text-sm flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#66BB6A]" /> Recent Record Access Logs
          </h4>
          <div className="space-y-3">
            {patient.consentLogs.slice(0, 3).map((log) => (
              <div key={log.id} className="p-3 rounded-lg bg-[#F4F9F5] text-xs border border-[#E0F2E1]">
                <div className="flex justify-between font-semibold text-[#122415]">
                  <span>{log.doctorName}</span>
                  <span className="text-[10px] text-gray-500">{log.viewedDate}</span>
                </div>
                <p className="text-[11px] text-[#38523C] mt-0.5">{log.facility} ({log.facilityType})</p>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {log.sectionsViewed.map(sec => (
                    <span key={sec} className="bg-[#E8F5E9] text-[#1B5E20] text-[9px] px-1.5 py-0.5 rounded font-medium border border-[#A5D6A7]">
                      {sec}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
