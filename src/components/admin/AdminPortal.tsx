import React, { useState } from 'react';
import { useHealthRecord } from '../../context/HealthRecordContext.tsx';
import { Building2, ShieldCheck, UserPlus, Stethoscope, KeyRound, UserCheck } from 'lucide-react';

export const AdminPortal: React.FC = () => {
  const { allPatients, verificationQueue, triageRedFlagsCount, doctorsList, onboardNewDoctor, fhirAuditLogs } = useHealthRecord();
  const [showAddDoctorModal, setShowAddDoctorModal] = useState(false);

  // New Doctor Onboarding Form State
  const [docName, setDocName] = useState('');
  const [docLicense, setDocLicense] = useState('');
  const [docDepartment, setDocDepartment] = useState('General Medicine');
  const [docFacility, setDocFacility] = useState('District Hospital OPD');
  const [docUsername, setDocUsername] = useState('');
  const [docPassword, setDocPassword] = useState('DocPass@2026');

  const totalRecords = allPatients.length;
  const pendingVerifications = verificationQueue.filter(v => v.status === 'pending').length;

  const handleOpenModal = () => {
    setDocName('');
    setDocLicense(`GOV-MED-${Math.floor(10000 + Math.random() * 90000)}`);
    setDocDepartment('General Medicine');
    setDocFacility('District Hospital OPD');
    setDocUsername('');
    setDocPassword('DocPass@2026');
    setShowAddDoctorModal(true);
  };

  const handleOnboardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docName || !docLicense || !docUsername) return;
    onboardNewDoctor(docName, docLicense, docDepartment, docFacility, docUsername);
    setShowAddDoctorModal(false);
  };

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
            <p className="text-xs text-[#D0EBD2] mt-0.5">Real-time live facility monitoring & medical staff access control</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleOpenModal}
              className="bg-[#66BB6A] text-[#1B5E20] hover:bg-[#54ab58] font-black text-xs px-4 py-2.5 rounded-xl shadow flex items-center gap-1.5"
            >
              <UserPlus className="w-4 h-4 text-[#1B5E20]" /> + Add New Authorized Doctor
            </button>
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

          {/* Stat 2: Onboarded Doctors */}
          <div className="card border-l-4 border-l-[#66BB6A]">
            <span className="text-xs font-semibold text-[#38523C] uppercase block mb-1">Authorized Doctors</span>
            <span className="text-3xl font-extrabold text-[#1B5E20] font-display">{doctorsList.length}</span>
            <span className="text-[11px] text-[#2E7D32] block mt-1 font-semibold">
              Active Medical Logins
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

        {/* Authorized Doctors Management Section */}
        <div className="bg-white rounded-2xl p-6 border border-[#C8E6C9] shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-lg font-bold text-[#1B5E20] font-display flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-[#66BB6A]" /> Doctor Staff Roster & Medical Access Control
              </h3>
              <p className="text-xs text-[#38523C] mt-0.5">
                Manage authorized physicians, issue medical licenses & create login accounts for hospital OPDs
              </p>
            </div>

            <button
              onClick={handleOpenModal}
              className="bg-[#1B5E20] text-white hover:bg-[#144517] font-bold text-xs px-4 py-2 rounded-xl shadow flex items-center gap-1.5"
            >
              <UserPlus className="w-4 h-4 text-[#66BB6A]" /> Onboard Doctor
            </button>
          </div>

          {/* Doctor Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {doctorsList.map((doc) => (
              <div key={doc.id} className="p-4 rounded-xl bg-[#E8F5E9] border border-[#C8E6C9] space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-extrabold text-sm text-[#122415]">{doc.fullName}</h4>
                    <span className="text-[10px] font-mono font-extrabold bg-[#1B5E20] text-white px-2 py-0.5 rounded">
                      {doc.licenseNumber}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold bg-[#66BB6A] text-[#1B5E20] px-2 py-0.5 rounded-full flex items-center gap-1">
                    <UserCheck className="w-3 h-3" /> Active
                  </span>
                </div>

                <div className="text-xs space-y-1 text-[#38523C] pt-1">
                  <p><strong>Department:</strong> {doc.department}</p>
                  <p><strong>Facility:</strong> {doc.facility}</p>
                  <p className="font-mono text-[#1B5E20] bg-white p-1.5 rounded border border-[#A5D6A7] font-semibold text-[11px] flex items-center justify-between">
                    <span>🔑 Username: {doc.username}</span>
                    <span className="text-[9px] text-[#2E7D32]">Access Granted</span>
                  </p>
                </div>
              </div>
            ))}
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

        {/* System Security & FHIR Audit Logs (India DPDP Act 2023 Compliant) */}
        <div className="bg-white rounded-2xl p-6 border border-[#C8E6C9] shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-[#1B5E20] font-display flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#66BB6A]" /> FHIR R4 Audit Event & DPDP Compliance Logs
            </h3>
            <span className="text-[10px] font-extrabold bg-[#1B5E20] text-white px-3 py-1 rounded-full uppercase">
              DPDP Act 2023 Tokenized
            </span>
          </div>

          <div className="space-y-3 text-xs max-h-72 overflow-y-auto pr-1">
            {fhirAuditLogs.map((log) => (
              <div key={log.id} className="p-3.5 rounded-xl bg-[#F4F9F5] border border-[#C8E6C9] space-y-1.5 font-mono">
                <div className="flex justify-between items-center">
                  <span className="font-extrabold text-[#1B5E20] text-[11px]">{log.type.display}</span>
                  <span className="text-[10px] text-gray-500">{log.recorded}</span>
                </div>
                <p className="text-[10.5px] text-[#38523C]">
                  <strong>Agent:</strong> {log.agent.map(a => `${a.name} (${a.role})`).join(' • ')}
                </p>
                <p className="text-[10.5px] text-[#1E40AF]">
                  <strong>Entity / Ref:</strong> {log.entity[0]?.what.display} | Hash: {log.entity[0]?.sha256Hash}
                </p>
                <div className="flex gap-2 text-[9.5px] pt-1">
                  <span className="bg-[#E8F5E9] text-[#1B5E20] px-2 py-0.5 rounded font-bold border border-[#A5D6A7]">
                    DPDP Tokenized: YES
                  </span>
                  <span className="bg-[#EFF6FF] text-[#1D4ED8] px-2 py-0.5 rounded font-bold border border-[#BFDBFE]">
                    NMC Disclaimer: Appended
                  </span>
                  <span className="bg-[#FFFBEB] text-[#D97706] px-2 py-0.5 rounded font-bold border border-[#FDE68A]">
                    Purpose: TREAT
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Onboard New Doctor Modal */}
      {showAddDoctorModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border-2 border-[#1B5E20] animate-fade-in space-y-4">
            <div className="flex justify-between items-start border-b border-[#C8E6C9] pb-3">
              <div>
                <h3 className="text-lg font-bold text-[#1B5E20] font-display flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-[#66BB6A]" /> Onboard New Authorized Doctor
                </h3>
                <p className="text-xs text-[#38523C] mt-0.5">
                  Issue medical license credentials & create login username for hospital system
                </p>
              </div>
              <button onClick={() => setShowAddDoctorModal(false)} className="text-gray-400 hover:text-black font-bold text-xl">✕</button>
            </div>

            <form onSubmit={handleOnboardSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#122415] mb-1">Doctor Full Name & Degree</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Ananya Roy (MD, Cardiology)"
                  value={docName}
                  onChange={(e) => setDocName(e.target.value)}
                  className="w-full px-3 py-2 border border-[#C8E6C9] rounded-lg text-sm font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#122415] mb-1">Medical License Number</label>
                  <input
                    type="text"
                    required
                    placeholder="GOV-MED-88410"
                    value={docLicense}
                    onChange={(e) => setDocLicense(e.target.value)}
                    className="w-full px-3 py-2 border border-[#C8E6C9] rounded-lg text-sm font-mono font-bold bg-[#F4F9F5]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#122415] mb-1">Department</label>
                  <select
                    value={docDepartment}
                    onChange={(e) => setDocDepartment(e.target.value)}
                    className="w-full px-3 py-2 border border-[#C8E6C9] rounded-lg text-sm font-semibold"
                  >
                    <option value="General Medicine">General Medicine</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Pediatrics & Triage">Pediatrics & Triage</option>
                    <option value="OPD Emergency">OPD Emergency</option>
                    <option value="Orthopedics">Orthopedics</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#122415] mb-1">Assigned Healthcare Facility</label>
                <select
                  value={docFacility}
                  onChange={(e) => setDocFacility(e.target.value)}
                  className="w-full px-3 py-2 border border-[#C8E6C9] rounded-lg text-sm font-semibold"
                >
                  <option value="District Hospital OPD">District Hospital OPD</option>
                  <option value="Primary Health Centre (PHC)">Primary Health Centre (PHC)</option>
                  <option value="Community Health Centre (CHC)">Community Health Centre (CHC)</option>
                  <option value="Government Medical College">Government Medical College</option>
                </select>
              </div>

              <div className="p-3 bg-[#E8F5E9] rounded-xl border border-[#A5D6A7] space-y-3">
                <h4 className="text-xs font-extrabold text-[#1B5E20] uppercase flex items-center gap-1">
                  <KeyRound className="w-3.5 h-3.5" /> Doctor Login Credentials Setup
                </h4>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#122415] mb-1">Login Username</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. dr.ananya.roy"
                      value={docUsername}
                      onChange={(e) => setDocUsername(e.target.value)}
                      className="w-full px-3 py-2 border border-[#C8E6C9] rounded-lg text-xs font-mono font-bold bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#122415] mb-1">Temporary Password</label>
                    <input
                      type="text"
                      required
                      value={docPassword}
                      onChange={(e) => setDocPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-[#C8E6C9] rounded-lg text-xs font-mono font-bold bg-white"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[#C8E6C9]">
                <button
                  type="button"
                  onClick={() => setShowAddDoctorModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary text-xs px-5 flex items-center gap-1.5">
                  <UserPlus className="w-4 h-4" /> Onboard Doctor & Create Login 🟢
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
