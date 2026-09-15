import React from 'react';
import { useHealthRecord } from '../../context/HealthRecordContext.tsx';
import { Building2, ShieldCheck, Clock, AlertTriangle, Users, FileText, CheckCircle2 } from 'lucide-react';

export const AdminPortal: React.FC = () => {
  const { allPatients, verificationQueue, triageRedFlagsCount, t } = useHealthRecord();

  const totalRecords = allPatients.length;
  const totalDigitizedDocs = allPatients.reduce((acc, p) => acc + p.documents.length, 0);
  const pendingVerifications = verificationQueue.filter(v => v.status === 'pending').length;

  return (
    <div className="min-h-screen bg-[#E8F5E9] py-8">
      <div className="container mx-auto px-4 max-w-6xl space-y-6">
        {/* Admin Header */}
        <div className="bg-[#1B5E20] text-white rounded-2xl p-6 shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#A5D6A7] uppercase tracking-wider mb-1">
              <Building2 className="w-4 h-4 text-[#66BB6A]" /> Ministry of Health Infrastructure & Analytics
            </div>
            <h2 className="text-2xl font-bold font-display">Government Health Network Admin Dashboard</h2>
            <p className="text-xs text-[#D0EBD2] mt-0.5">Real-time live facility monitoring across PHCs, CHCs, District Hospitals & Medical Colleges</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-[#66BB6A] text-[#1B5E20] font-extrabold text-xs px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow">
              <CheckCircle2 className="w-4 h-4 text-[#1B5E20]" /> Network Active 🟢
            </span>
          </div>
        </div>

        {/* Dynamic Analytics Live Stat Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Stat 1: Total Digital Records */}
          <div className="card border-l-4 border-l-[#1B5E20]">
            <span className="text-xs font-semibold text-[#38523C] uppercase block mb-1">Total Digital Records</span>
            <span className="text-3xl font-extrabold text-[#1B5E20] font-display">{totalRecords}</span>
            <span className="text-[11px] text-[#2E7D32] block mt-1 font-semibold">
              Live Registered Citizens
            </span>
          </div>

          {/* Stat 2: OCR Digitized Docs */}
          <div className="card border-l-4 border-l-[#66BB6A]">
            <span className="text-xs font-semibold text-[#38523C] uppercase block mb-1">OCR Digitized Docs</span>
            <span className="text-3xl font-extrabold text-[#1B5E20] font-display">{totalDigitizedDocs}</span>
            <span className="text-[11px] text-[#2E7D32] block mt-1 font-semibold">
              Real-Time Uploaded Files
            </span>
          </div>

          {/* Stat 3: Pending Verification Queue */}
          <div className="card border-l-4 border-l-[#2563EB]">
            <span className="text-xs font-semibold text-[#38523C] uppercase block mb-1">OPD Verification Queue</span>
            <span className="text-3xl font-extrabold text-[#2563EB] font-display">{pendingVerifications}</span>
            <span className="text-[11px] text-[#1D4ED8] block mt-1 font-semibold">
              Pending Doctor Review
            </span>
          </div>

          {/* Stat 4: Triage Red Flags */}
          <div className="card border-l-4 border-l-[#DC2626]">
            <span className="text-xs font-semibold text-[#38523C] uppercase block mb-1">Triage Red Flags</span>
            <span className="text-3xl font-extrabold text-[#DC2626] font-display">{triageRedFlagsCount}</span>
            <span className="text-[11px] text-[#B91C1C] block mt-1 font-semibold">
              Priority OPD Triggered
            </span>
          </div>
        </div>

        {/* Facilities Breakdown */}
        <div className="bg-white rounded-2xl p-6 border border-[#C8E6C9] shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-[#1B5E20] font-display flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#66BB6A]" /> Healthcare Facility Live Sync Status
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-[#E8F5E9] border border-[#C8E6C9]">
              <span className="text-xs font-bold text-[#1B5E20] block">Primary Health Centres (PHC)</span>
              <span className="text-xl font-bold text-[#122415]">Connected</span>
              <p className="text-[10px] text-[#38523C] mt-1">Touch & Voice Kiosk Live</p>
            </div>

            <div className="p-4 rounded-xl bg-[#E8F5E9] border border-[#C8E6C9]">
              <span className="text-xs font-bold text-[#1B5E20] block">Community Health Centres (CHC)</span>
              <span className="text-xl font-bold text-[#122415]">Connected</span>
              <p className="text-[10px] text-[#38523C] mt-1">Pathology Lab OCR Active</p>
            </div>

            <div className="p-4 rounded-xl bg-[#E8F5E9] border border-[#C8E6C9]">
              <span className="text-xs font-bold text-[#1B5E20] block">District Hospitals</span>
              <span className="text-xl font-bold text-[#122415]">Connected</span>
              <p className="text-[10px] text-[#38523C] mt-1">OPD Token Queue Connected</p>
            </div>

            <div className="p-4 rounded-xl bg-[#E8F5E9] border border-[#C8E6C9]">
              <span className="text-xs font-bold text-[#1B5E20] block">Government Medical Colleges</span>
              <span className="text-xl font-bold text-[#122415]">Connected</span>
              <p className="text-[10px] text-[#38523C] mt-1">Super-Specialty Record Sync</p>
            </div>
          </div>
        </div>

        {/* System Security Audit Logs */}
        <div className="bg-white rounded-2xl p-6 border border-[#C8E6C9] shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-[#1B5E20] font-display flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#66BB6A]" /> System Access Audit Log Trace
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-[#F4F9F5] border border-[#E0F2E1] flex justify-between items-center">
              <div>
                <strong className="text-[#122415]">Registration Counter</strong> added citizen profile <strong className="font-mono text-[#1B5E20]">GOV-IND-2026-88412</strong>
                <span className="text-[10px] text-gray-500 block">Status: Active Permanent Health ID</span>
              </div>
              <span className="text-[10px] font-bold text-[#1B5E20] bg-[#E8F5E9] px-2 py-0.5 rounded">
                Verified Record
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
