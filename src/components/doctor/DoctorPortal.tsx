import React, { useState } from 'react';
import { useHealthRecord } from '../../context/HealthRecordContext.tsx';
import { Stethoscope, Search, UserCheck, AlertOctagon, PlusCircle, Check, X, Edit3, FileText, Sparkles, Phone, ShieldCheck } from 'lucide-react';
import type { CitizenProfile, VerificationItem } from '../../types/health.ts';

export const DoctorPortal: React.FC = () => {
  const { patient, allPatients, setPatient, verificationQueue, verifyItem, modifyAndVerifyItem, addDoctorNote, t } = useHealthRecord();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchError, setSearchError] = useState('');

  const [activeDoctorTab, setActiveDoctorTab] = useState<'overview' | 'documents' | 'verification' | 'notes'>('overview');
  const [newNoteType, setNewNoteType] = useState<'medication' | 'allergy'>('medication');
  const [newNoteName, setNewNoteName] = useState('');
  const [newNoteDetail, setNewNoteDetail] = useState('');

  // Doctor Edit & Correct Modal State
  const [editingVqItem, setEditingVqItem] = useState<VerificationItem | null>(null);
  const [modTitle, setModTitle] = useState('');
  const [modDetails, setModDetails] = useState('');
  const [modSeverity, setModSeverity] = useState<'critical' | 'important' | 'normal'>('important');

  const pendingVerificationItems = verificationQueue.filter(v => v.status === 'pending');

  const handleSearchCitizen = (e?: React.FormEvent, customId?: string) => {
    if (e) e.preventDefault();
    const query = (customId || searchQuery).trim().toLowerCase();
    if (!query) return;

    const cleanQuery = query.replace(/\D/g, '');

    const match = allPatients.find(p => {
      const cleanPerm = p.permanentId.toLowerCase().replace(/\D/g, '');
      const cleanAadhaar = (p.aadhaarNumber || '').replace(/\D/g, '');
      const cleanAbha = (p.abhaId || '').replace(/\D/g, '');
      const cleanMobile = (p.mobile || '').replace(/\D/g, '');
      return (
        p.permanentId.toLowerCase().includes(query) ||
        p.mobile.toLowerCase().includes(query) ||
        (cleanQuery && cleanQuery.length >= 3 && cleanPerm.includes(cleanQuery)) ||
        (cleanQuery && cleanQuery.length >= 3 && cleanAadhaar.includes(cleanQuery)) ||
        (cleanQuery && cleanQuery.length >= 3 && cleanAbha.includes(cleanQuery)) ||
        (cleanQuery && cleanQuery.length >= 3 && cleanMobile.includes(cleanQuery)) ||
        p.fullName.toLowerCase().includes(query)
      );
    });

    if (match) {
      setPatient(match);
      setSearchError('');
    } else {
      setSearchError(`No citizen record found matching "${query}". Search by 12-digit Health ID (e.g. GOV-IND-2026-88412), Phone (+91 98765 43210), or Aadhaar.`);
    }
  };

  const handleAddDoctorNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteName) return;
    addDoctorNote(newNoteType, newNoteName, newNoteDetail);
    setNewNoteName('');
    setNewNoteDetail('');
  };

  const handleOpenEditModal = (item: VerificationItem) => {
    setEditingVqItem(item);
    const cleanTitle = item.title.replace('Patient Reported:', '').replace('AI OCR Scanned:', '').replace('AI Image Vision Scanned:', '').trim();
    setModTitle(cleanTitle);
    setModDetails(item.details);
    setModSeverity(cleanTitle.toLowerCase().includes('penicillin') || cleanTitle.toLowerCase().includes('allergy') ? 'critical' : 'important');
  };

  const handleSaveCorrection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVqItem || !modTitle) return;
    modifyAndVerifyItem(editingVqItem.id, modTitle, modDetails, modSeverity);
    setEditingVqItem(null);
  };

  return (
    <div className="min-h-screen bg-[#E8F5E9] py-8">
      <div className="container mx-auto px-4 space-y-6">
        {/* Doctor Header Banner */}
        <div className="bg-gradient-to-r from-[#1B5E20] to-[#123814] text-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#A5D6A7] uppercase tracking-wider mb-1">
              <Stethoscope className="w-4 h-4 text-[#66BB6A]" /> {t('authPhysician')}
            </div>
            <h2 className="text-2xl font-bold font-display">{t('docName')}</h2>
            <p className="text-xs text-[#D0EBD2] mt-0.5">
              {t('docFacility')}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-[#123814] px-4 py-2 rounded-xl border border-[#27702C] text-center">
              <span className="text-[10px] text-[#A5D6A7] block font-semibold uppercase">Verification Review</span>
              <span className="text-xl font-extrabold text-[#FDE68A]">{pendingVerificationItems.length} Records</span>
            </div>
          </div>
        </div>

        {/* 12-Digit Permanent Health ID Direct Search Bar */}
        <div className="bg-white p-6 rounded-2xl border-2 border-[#1B5E20] shadow-lg space-y-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h3 className="text-lg font-extrabold text-[#1B5E20] font-display flex items-center gap-2">
                <Search className="w-5 h-5 text-[#2E7D32]" /> Search Patient by 12-Digit Health ID, Phone Number or Aadhaar
              </h3>
              <p className="text-xs text-[#38523C] mt-0.5">
                Enter Citizen 12-Digit Permanent ID (e.g. <strong className="text-[#1B5E20]">GOV-IND-2026-88412</strong>), Mobile (<strong className="text-[#1B5E20]">+91 98765 43210</strong>) or Aadhaar to fetch history.
              </p>
            </div>
            <span className="text-[10px] font-extrabold bg-[#E8F5E9] text-[#1B5E20] px-3 py-1 rounded-full border border-[#A5D6A7] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2E7D32]" /> Authorized Physician Access
            </span>
          </div>

          <form onSubmit={handleSearchCitizen} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search by 12-digit Health ID (GOV-IND-2026-88412), Phone (+91 98765 43210), or Name..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setSearchError(''); }}
                className="w-full pl-11 pr-4 py-3 border-2 border-[#C8E6C9] focus:border-[#1B5E20] rounded-xl text-sm font-bold outline-none shadow-inner"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary text-xs px-7 flex items-center gap-2 shadow-md text-sm font-bold"
            >
              <UserCheck className="w-4 h-4 text-[#66BB6A]" /> Search Citizen
            </button>
          </form>

          {searchError && (
            <div className="p-2.5 bg-[#FEE2E2] text-[#B91C1C] rounded-xl text-xs font-bold border border-[#FCA5A5]">
              ⚠️ {searchError}
            </div>
          )}

          {/* Quick Click Demo Citizen ID Chips */}
          <div className="pt-1 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-[11px] font-bold text-[#38523C]">Quick Test Lookup:</span>
            {allPatients.map((p) => (
              <button
                key={p.permanentId}
                type="button"
                onClick={() => handleSearchCitizen(undefined, p.permanentId)}
                className={`px-3 py-1 rounded-lg font-mono text-xs font-extrabold transition-all border ${
                  patient.permanentId === p.permanentId
                    ? 'bg-[#1B5E20] text-white border-[#1B5E20] shadow'
                    : 'bg-[#E8F5E9] text-[#1B5E20] border-[#A5D6A7] hover:bg-[#D4EDD6]'
                }`}
              >
                {p.fullName} ({p.permanentId})
              </button>
            ))}
          </div>
        </div>

        {/* Active Patient Clinical Workspace */}
        <div className="space-y-6">
          {/* Patient Workspace Bar */}
          <div className="bg-white rounded-2xl p-6 border border-[#C8E6C9] flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-2xl font-bold text-[#1B5E20] font-display">{patient.fullName}</h3>
                <span className="bg-[#E8F5E9] text-[#1B5E20] text-xs font-bold px-2.5 py-0.5 rounded-full border border-[#A5D6A7]">
                  {t('bloodGroup')}: {patient.bloodGroup}
                </span>
                <span className="bg-[#EFF6FF] text-[#1D4ED8] text-xs font-bold px-2.5 py-0.5 rounded-full border border-[#BFDBFE]">
                  {patient.gender}, {patient.dob}
                </span>
              </div>
              <p className="text-xs text-[#38523C] space-x-3">
                <span>12-Digit Permanent Health ID: <strong className="text-[#122415] font-mono text-sm">{patient.permanentId}</strong></span>
                <span>• ABHA: <strong className="text-[#122415] font-mono">{patient.abhaId}</strong></span>
                <span>• Aadhaar: <strong className="text-[#122415] font-mono">{patient.aadhaarNumber}</strong></span>
              </p>
              <div className="text-[11px] text-[#38523C] mt-1 flex items-center gap-4">
                <span>Height: {patient.height}</span>
                <span>Weight: {patient.weight}</span>
                <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-[#1B5E20]" /> Contact: {patient.mobile}</span>
                <span>Emergency: {patient.emergencyContact?.name} ({patient.emergencyContact?.mobile})</span>
              </div>
            </div>

            {/* Critical Alert Warning */}
            {patient.allergies.some(a => a.severity === 'critical') && (
              <div className="bg-[#FEE2E2] border border-[#FCA5A5] px-4 py-2.5 rounded-xl flex items-center gap-2 text-[#B91C1C] text-xs font-bold shadow-sm">
                <AlertOctagon className="w-5 h-5 shrink-0" />
                <span>🔴 CONFIRMED SEVERE ALLERGY FLAG ON RECORD</span>
              </div>
            )}
          </div>

          {/* Doctor View Tabs */}
          <div className="flex gap-2 border-b border-[#C8E6C9] pb-2">
            <button
              onClick={() => setActiveDoctorTab('overview')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeDoctorTab === 'overview'
                  ? 'bg-[#1B5E20] text-white shadow'
                  : 'bg-white text-[#38523C] hover:bg-[#E8F5E9]'
              }`}
            >
              {t('clinicalProfileHistory')}
            </button>
            <button
              onClick={() => setActiveDoctorTab('documents')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeDoctorTab === 'documents'
                  ? 'bg-[#1B5E20] text-white shadow'
                  : 'bg-white text-[#38523C] hover:bg-[#E8F5E9]'
              }`}
            >
              <FileText className="w-3.5 h-3.5" /> Citizen Documents & Prescription Scans ({patient.documents.length})
            </button>
            <button
              onClick={() => setActiveDoctorTab('verification')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeDoctorTab === 'verification'
                  ? 'bg-[#1B5E20] text-white shadow'
                  : 'bg-white text-[#38523C] hover:bg-[#E8F5E9]'
              }`}
            >
              {t('verificationQueueTab')}
              {pendingVerificationItems.length > 0 && (
                <span className="bg-[#FDE68A] text-[#78350F] text-[10px] px-1.5 py-0.5 rounded-full font-extrabold">
                  {pendingVerificationItems.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveDoctorTab('notes')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeDoctorTab === 'notes'
                  ? 'bg-[#1B5E20] text-white shadow'
                  : 'bg-white text-[#38523C] hover:bg-[#E8F5E9]'
              }`}
            >
              ✍️ Write Prescription to Health ID
            </button>
          </div>

          {/* Tab 1: Clinical Profile */}
          {activeDoctorTab === 'overview' && (
            <div className="space-y-6">
              {/* Verified Allergies */}
              <div className="card">
                <h4 className="font-bold text-[#1B5E20] text-sm mb-3 uppercase tracking-wider">
                  {t('verifiedAllergiesRules')}
                </h4>
                {patient.allergies.length === 0 ? (
                  <p className="text-xs text-gray-500 italic">No allergies recorded for this citizen.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {patient.allergies.map((alg) => (
                      <div
                        key={alg.id}
                        className={`p-3.5 rounded-xl border text-xs ${
                          alg.status === 'verified'
                            ? alg.severity === 'critical'
                              ? 'bg-[#FFF5F5] border-[#FCA5A5]'
                              : 'bg-[#E8F5E9] border-[#A5D6A7]'
                            : 'bg-[#FEF3C7] border-[#FDE68A]'
                        }`}
                      >
                        <div className="flex justify-between font-bold text-[#122415]">
                          <span>{alg.allergen}</span>
                          <span className={`text-[10px] uppercase font-extrabold ${alg.status === 'verified' ? 'text-[#1B5E20]' : 'text-[#B45309]'}`}>
                            {alg.status === 'verified' ? '🟢 Doctor Verified' : '🟡 Pending Verification'}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#38523C] mt-1">{alg.reaction}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Active Medications */}
              <div className="card">
                <h4 className="font-bold text-[#1B5E20] text-sm mb-3 uppercase tracking-wider">
                  {t('activeMedicationsTitle')}
                </h4>
                {patient.medications.length === 0 ? (
                  <p className="text-xs text-gray-500 italic">No active medications on record.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {patient.medications.map((med) => (
                      <div key={med.id} className="p-3.5 rounded-xl bg-white border border-[#C8E6C9] text-xs">
                        <div className="flex justify-between font-bold text-[#122415]">
                          <span>{med.name}</span>
                          <span className="text-[10px] text-[#1B5E20] bg-[#E8F5E9] px-2 py-0.5 rounded font-mono">
                            {med.dosage}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#38523C] mt-1">{med.frequency} • {med.prescribedBy}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Timeline */}
              <div className="card">
                <h4 className="font-bold text-[#1B5E20] text-sm mb-3 uppercase tracking-wider">
                  Permanent Health Timeline & History
                </h4>
                <div className="space-y-2">
                  {patient.timeline.map((ev) => (
                    <div key={ev.id} className="p-3 bg-[#E8F5E9] border border-[#C8E6C9] rounded-xl text-xs flex justify-between items-start">
                      <div>
                        <span className="font-bold text-[#122415] block">{ev.title}</span>
                        <span className="text-[11px] text-[#38523C]">{ev.facility} • {ev.summary}</span>
                      </div>
                      <span className="text-[10px] font-bold text-[#1B5E20] shrink-0 bg-white px-2 py-0.5 rounded">{ev.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Citizen Documents & Scans */}
          {activeDoctorTab === 'documents' && (
            <div className="bg-white rounded-2xl p-6 border border-[#C8E6C9] space-y-4">
              <div>
                <h3 className="text-xl font-bold text-[#1B5E20] font-display flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#66BB6A]" /> Digital Health Locker Documents ({patient.documents.length})
                </h3>
                <p className="text-xs text-[#38523C] mt-0.5">
                  Inspect citizen-uploaded prescription scans, lab reports, and AI Vision Neural extractions.
                </p>
              </div>

              {patient.documents.length === 0 ? (
                <div className="p-8 text-center bg-[#E8F5E9] rounded-2xl border border-[#C8E6C9]">
                  <p className="text-xs font-bold text-[#38523C]">No medical documents uploaded in locker for this citizen yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {patient.documents.map((doc) => (
                    <div key={doc.id} className="p-4 rounded-xl border border-[#C8E6C9] bg-white space-y-2 text-xs shadow-sm">
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-sm text-[#122415]">{doc.title}</span>
                        <span className="text-[10px] font-extrabold bg-[#E8F5E9] text-[#1B5E20] px-2 py-0.5 rounded border border-[#A5D6A7] uppercase">
                          {doc.category.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#38523C]">{doc.facility} • Uploaded: {doc.uploadDate}</p>

                      {doc.handwrittenNotesText && (
                        <div className="p-2.5 bg-[#FAF5FF] border border-[#F3E8FF] rounded-lg">
                          <span className="text-[10px] font-bold text-[#6B21A8] block">✍️ Recognized Doctor Cursive Note:</span>
                          <p className="text-[11px] text-[#7E22CE] italic mt-0.5">"{doc.handwrittenNotesText}"</p>
                        </div>
                      )}

                      {doc.extractedData && (
                        <div className="p-2.5 bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg space-y-1">
                          <span className="text-[10px] font-bold text-[#1D4ED8] block">🧠 Vision Neural Extraction:</span>
                          {doc.extractedData.medication && <p className="text-[11px] text-[#1E40AF]"><strong>Meds:</strong> {doc.extractedData.medication}</p>}
                          {doc.extractedData.diagnosis && <p className="text-[11px] text-[#1E40AF]"><strong>Diagnosis:</strong> {doc.extractedData.diagnosis}</p>}
                          {doc.extractedData.doctor && <p className="text-[11px] text-[#1E40AF]"><strong>Prescribed By:</strong> {doc.extractedData.doctor}</p>}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab 3: Verification Engine */}
          {activeDoctorTab === 'verification' && (
            <div className="bg-white rounded-2xl p-6 border border-[#C8E6C9] space-y-4">
              <div>
                <h3 className="text-xl font-bold text-[#1B5E20] font-display">
                  {t('doctorVerificationEngine')}
                </h3>
                <p className="text-xs text-[#38523C] mt-0.5">
                  Confirm or correct reported records before converting into permanent verified clinical history.
                </p>
              </div>

              {verificationQueue.length === 0 ? (
                <div className="p-8 text-center bg-[#E8F5E9] rounded-2xl border border-[#C8E6C9]">
                  <p className="text-xs font-bold text-[#1B5E20]">🟢 No pending records requiring verification.</p>
                </div>
              ) : (
                <div className="space-y-4 pt-2">
                  {verificationQueue.map((v) => (
                    <div
                      key={v.id}
                      className={`p-5 rounded-xl border-2 transition-all ${
                        v.status === 'pending'
                          ? 'bg-[#FEF3C7] border-[#FDE68A]'
                          : v.status === 'verified'
                          ? 'bg-[#E8F5E9] border-[#A5D6A7]'
                          : 'bg-[#FEE2E2] border-[#FCA5A5]'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-extrabold uppercase bg-white px-2 py-0.5 rounded border border-[#FDE68A] text-[#78350F]">
                              {v.source}
                            </span>
                            <h4 className="font-bold text-base text-[#122415]">{v.title}</h4>
                          </div>
                          <p className="text-xs text-[#78350F] mt-1">{v.details}</p>
                        </div>

                        {v.status === 'pending' ? (
                          <div className="flex flex-wrap items-center gap-2 shrink-0">
                            <button
                              onClick={() => verifyItem(v.id, false)}
                              className="px-3 py-1.5 rounded-lg bg-white border border-[#DC2626] text-[#DC2626] hover:bg-[#FEE2E2] text-xs font-bold flex items-center gap-1"
                            >
                              <X className="w-4 h-4" /> {t('reject')}
                            </button>
                            <button
                              onClick={() => handleOpenEditModal(v)}
                              className="px-3.5 py-1.5 rounded-lg bg-[#123814] text-white border border-[#27702C] hover:bg-[#1B5E20] text-xs font-bold flex items-center gap-1.5 shadow"
                            >
                              <Edit3 className="w-3.5 h-3.5 text-[#66BB6A]" /> Edit & Correct Record
                            </button>
                            <button
                              onClick={() => verifyItem(v.id, true)}
                              className="px-4 py-1.5 rounded-lg bg-[#1B5E20] text-white hover:bg-[#144517] text-xs font-bold flex items-center gap-1 shadow"
                            >
                              <Check className="w-4 h-4 text-[#66BB6A]" /> {t('confirmVerification')}
                            </button>
                          </div>
                        ) : (
                          <span className={`badge text-xs font-bold ${v.status === 'verified' ? 'badge-verified' : 'badge-critical'}`}>
                            {v.status === 'verified' ? `🟢 ${t('verifiedClinicalFact')}` : `🔴 ${t('rejectedByDoctor')}`}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab 4: Write Prescription to Health ID */}
          {activeDoctorTab === 'notes' && (
            <div className="bg-white rounded-2xl p-6 border border-[#C8E6C9] shadow-sm space-y-4">
              <div>
                <h3 className="text-xl font-bold text-[#1B5E20] font-display flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#66BB6A]" /> Write Verified Prescription to Citizen Permanent Health ID
                </h3>
                <p className="text-xs text-[#38523C] mt-0.5">
                  Directly appends doctor-verified prescription or critical allergy flag to Permanent ID: <strong className="font-mono text-[#1B5E20]">{patient.permanentId}</strong> ({patient.fullName}).
                </p>
              </div>

              <form onSubmit={handleAddDoctorNote} className="space-y-4 max-w-lg">
                <div>
                  <label className="block text-xs font-bold text-[#122415] mb-1">{t('entryType')}</label>
                  <select
                    value={newNoteType}
                    onChange={(e: any) => setNewNoteType(e.target.value)}
                    className="w-full px-3 py-2 border border-[#C8E6C9] rounded-lg text-sm"
                  >
                    <option value="medication">{t('newPrescriptionMed')}</option>
                    <option value="allergy">{t('confirmedAllergyFlag')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#122415] mb-1">{t('nameTitle')}</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Paracetamol 650mg or Penicillin Allergy"
                    value={newNoteName}
                    onChange={(e) => setNewNoteName(e.target.value)}
                    className="w-full px-3 py-2 border border-[#C8E6C9] rounded-lg text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#122415] mb-1">{t('clinicalDetailsInstructions')}</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Enter dosage (e.g. 1 Tab BD after meals x 5 days), duration, or clinical findings..."
                    value={newNoteDetail}
                    onChange={(e) => setNewNoteDetail(e.target.value)}
                    className="w-full px-3 py-2 border border-[#C8E6C9] rounded-lg text-sm"
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary text-xs flex items-center gap-2 px-6 py-2.5">
                  <PlusCircle className="w-4 h-4 text-[#66BB6A]" /> Save to Citizen Permanent Health ID ({patient.permanentId}) 🟢
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Doctor Edit & Correct Verification Item Modal */}
      {editingVqItem && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border-2 border-[#1B5E20] animate-fade-in space-y-4">
            <div className="flex justify-between items-start border-b border-[#C8E6C9] pb-3">
              <div>
                <h3 className="text-lg font-bold text-[#1B5E20] font-display flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-[#66BB6A]" /> Edit & Correct Patient Entry
                </h3>
                <p className="text-xs text-[#38523C] mt-0.5">
                  Refine entry into an official verified clinical record
                </p>
              </div>
              <button onClick={() => setEditingVqItem(null)} className="text-gray-400 hover:text-black font-bold text-xl">✕</button>
            </div>

            <form onSubmit={handleSaveCorrection} className="space-y-4">
              <div className="p-3 rounded-xl bg-[#FEF3C7] border border-[#FDE68A] text-xs text-[#78350F]">
                <strong className="block mb-0.5">Original Entry ({editingVqItem.source}):</strong>
                <span>{editingVqItem.title} • {editingVqItem.details}</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#122415] mb-1">
                  Corrected Title / Diagnosis
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lactose Intolerance or Amoxicillin 500mg"
                  value={modTitle}
                  onChange={(e) => setModTitle(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-[#1B5E20] rounded-lg text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#122415] mb-1">
                  Corrected Reaction / Dosage Details
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Enter detailed clinical findings or dosage..."
                  value={modDetails}
                  onChange={(e) => setModDetails(e.target.value)}
                  className="w-full px-3 py-2 border border-[#C8E6C9] rounded-lg text-sm font-semibold"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#122415] mb-1">
                  Clinical Safety Severity Flag
                </label>
                <select
                  value={modSeverity}
                  onChange={(e: any) => setModSeverity(e.target.value)}
                  className="w-full px-3 py-2 border border-[#C8E6C9] rounded-lg text-sm font-semibold"
                >
                  <option value="critical">🔴 Critical Flag (Triggers Red Alert Banner)</option>
                  <option value="important">🟡 Important (Highlighted in Profile)</option>
                  <option value="normal">🟢 Normal Clinical Fact</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[#C8E6C9]">
                <button
                  type="button"
                  onClick={() => setEditingVqItem(null)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary text-xs px-5">
                  Save & Verify Corrected Record 🟢
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
