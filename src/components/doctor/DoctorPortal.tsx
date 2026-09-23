import React, { useState } from 'react';
import { useHealthRecord } from '../../context/HealthRecordContext.tsx';
import { Stethoscope, Search, UserCheck, AlertOctagon, PlusCircle, Check, X, Edit3, FileText, ShieldCheck, Activity, User, Sparkles, Lock, FileCode } from 'lucide-react';
import type { VerificationItem } from '../../types/health.ts';
import { NMC_MANDATORY_DISCLAIMER } from '../../services/medGemmaService.ts';

export const DoctorPortal: React.FC = () => {
  const { patient, allPatients, setPatient, verificationQueue, verifyItem, modifyAndVerifyItem, addDoctorNote, fhirAuditLogs, t } = useHealthRecord();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchError, setSearchError] = useState('');

  const [activeDoctorTab, setActiveDoctorTab] = useState<'profile' | 'documents' | 'write' | 'verification' | 'medgemma_audit'>('profile');
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
      setSearchError(`No record found for "${query}". Try searching 12-digit Health ID (e.g. GOV-IND-2026-88412) or Phone.`);
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
    <div className="min-h-screen bg-[#F4F9F5] py-6">
      <div className="container mx-auto px-4 max-w-6xl space-y-5">
        {/* Sleek Integrated Header & Patient Search Bar */}
        <div className="bg-white rounded-2xl p-5 border border-[#C8E6C9] shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#1B5E20] text-white flex items-center justify-center shrink-0 shadow">
              <Stethoscope className="w-6 h-6 text-[#66BB6A]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#1B5E20] font-display leading-tight">{t('docName')}</h2>
              <p className="text-xs text-[#38523C] font-medium">{t('docFacility')}</p>
            </div>
          </div>

          {/* Search Box */}
          <div className="flex-1 max-w-xl">
            <form onSubmit={handleSearchCitizen} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4.5 h-4.5 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search Patient ID (e.g. GOV-IND-2026-88412), Phone (+91 98765 43210), or Name..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setSearchError(''); }}
                  className="w-full pl-10 pr-3 py-2 border border-[#A5D6A7] focus:border-[#1B5E20] rounded-xl text-xs font-semibold outline-none bg-[#F8FAF8]"
                />
              </div>
              <button
                type="submit"
                className="bg-[#1B5E20] text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-[#123814] transition-all shrink-0 flex items-center gap-1.5 shadow-sm"
              >
                <UserCheck className="w-4 h-4 text-[#66BB6A]" /> Search
              </button>
            </form>
            {searchError && <p className="text-[11px] text-[#DC2626] font-semibold mt-1">{searchError}</p>}
          </div>

          {/* Quick Click Demo Chips */}
          <div className="hidden lg:flex items-center gap-1.5 shrink-0 border-l border-[#C8E6C9] pl-4">
            <span className="text-[11px] text-[#38523C] font-bold">Quick:</span>
            {allPatients.map((p) => (
              <button
                key={p.permanentId}
                type="button"
                onClick={() => handleSearchCitizen(undefined, p.permanentId)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${patient.permanentId === p.permanentId
                    ? 'bg-[#1B5E20] text-white'
                    : 'bg-[#E8F5E9] text-[#1B5E20] hover:bg-[#D4EDD6]'
                  }`}
              >
                {p.fullName.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Clean Patient Summary Header */}
        <div className="bg-white rounded-2xl p-5 border border-[#C8E6C9] shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E8F5E9] border border-[#A5D6A7] flex items-center justify-center text-[#1B5E20] shrink-0 font-bold text-lg">
              <User className="w-6 h-6 text-[#1B5E20]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-[#122415] font-display">{patient.fullName}</h3>
                <span className="text-xs font-bold bg-[#E8F5E9] text-[#1B5E20] px-2.5 py-0.5 rounded-full border border-[#A5D6A7]">
                  {patient.gender} • {patient.dob}
                </span>
                <span className="text-xs font-bold bg-[#F0FDF4] text-[#15803D] px-2.5 py-0.5 rounded-full border border-[#BBF7D0]">
                  Blood: {patient.bloodGroup}
                </span>
              </div>
              <p className="text-xs text-[#38523C] font-mono mt-1 space-x-3">
                <span>12-Digit Health ID: <strong className="text-[#1B5E20]">{patient.permanentId}</strong></span>
                <span>• Phone: <strong className="text-[#122415]">{patient.mobile}</strong></span>
                <span>• ABHA: <strong>{patient.abhaId}</strong></span>
              </p>
            </div>
          </div>

          {/* Alert Badge if critical allergy */}
          {patient.allergies.some(a => a.severity === 'critical') && (
            <div className="bg-[#FEE2E2] border border-[#FCA5A5] px-3.5 py-2 rounded-xl flex items-center gap-2 text-[#B91C1C] text-xs font-bold shrink-0">
              <AlertOctagon className="w-4 h-4 shrink-0" />
              <span>🔴 CRITICAL ALLERGY FLAG RECORDED</span>
            </div>
          )}
        </div>

        {/* Streamlined Tab Navigation Bar */}
        <div className="bg-white p-1.5 rounded-2xl border border-[#C8E6C9] flex flex-wrap gap-2 shadow-sm">
          <button
            onClick={() => setActiveDoctorTab('profile')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${activeDoctorTab === 'profile'
                ? 'bg-[#1B5E20] text-white shadow'
                : 'text-[#38523C] hover:bg-[#E8F5E9]'
              }`}
          >
            <Activity className="w-4 h-4 text-[#66BB6A]" /> Patient Medical History
          </button>

          <button
            onClick={() => setActiveDoctorTab('documents')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${activeDoctorTab === 'documents'
                ? 'bg-[#1B5E20] text-white shadow'
                : 'text-[#38523C] hover:bg-[#E8F5E9]'
              }`}
          >
            <FileText className="w-4 h-4 text-[#66BB6A]" /> Prescriptions & Scans ({patient.documents.length})
          </button>

          <button
            onClick={() => setActiveDoctorTab('write')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${activeDoctorTab === 'write'
                ? 'bg-[#1B5E20] text-white shadow'
                : 'text-[#38523C] hover:bg-[#E8F5E9]'
              }`}
          >
            <PlusCircle className="w-4 h-4 text-[#66BB6A]" /> Write New Prescription
          </button>

          <button
            onClick={() => setActiveDoctorTab('verification')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${activeDoctorTab === 'verification'
                ? 'bg-[#1B5E20] text-white shadow'
                : 'text-[#38523C] hover:bg-[#E8F5E9]'
              }`}
          >
            <ShieldCheck className="w-4 h-4 text-[#66BB6A]" /> Verification Queue
            {pendingVerificationItems.length > 0 && (
              <span className="bg-[#FDE68A] text-[#78350F] text-[10px] px-1.5 py-0.5 rounded-full font-extrabold">
                {pendingVerificationItems.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveDoctorTab('medgemma_audit')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${activeDoctorTab === 'medgemma_audit'
                ? 'bg-[#1B5E20] text-white shadow'
                : 'text-[#38523C] hover:bg-[#E8F5E9]'
              }`}
          >
            <Sparkles className="w-4 h-4 text-[#66BB6A]" /> MedGemma & FHIR Audits ({fhirAuditLogs.length})
          </button>
        </div>

        {/* Tab 1: Patient Medical Profile */}
        {activeDoctorTab === 'profile' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Allergies */}
            <div className="bg-white rounded-2xl p-5 border border-[#C8E6C9] shadow-sm space-y-3">
              <h4 className="font-extrabold text-[#1B5E20] text-xs uppercase tracking-wider flex items-center justify-between">
                <span>🔴 Verified Allergies & Safety Rules</span>
                <span className="text-[10px] bg-[#E8F5E9] text-[#1B5E20] px-2 py-0.5 rounded font-bold">
                  {patient.allergies.length} Recorded
                </span>
              </h4>

              {patient.allergies.length === 0 ? (
                <p className="text-xs text-gray-500 italic py-2">No known allergies on record.</p>
              ) : (
                <div className="space-y-2">
                  {patient.allergies.map((alg) => (
                    <div
                      key={alg.id}
                      className={`p-3 rounded-xl border text-xs ${alg.severity === 'critical'
                          ? 'bg-[#FFF5F5] border-[#FCA5A5]'
                          : 'bg-[#E8F5E9] border-[#A5D6A7]'
                        }`}
                    >
                      <div className="flex justify-between font-bold text-[#122415]">
                        <span>{alg.allergen}</span>
                        <span className="text-[10px] font-bold text-[#1B5E20] uppercase">
                          {alg.status === 'verified' ? '🟢 Verified' : '🟡 Pending'}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#38523C] mt-0.5">{alg.reaction}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Active Medications */}
            <div className="bg-white rounded-2xl p-5 border border-[#C8E6C9] shadow-sm space-y-3">
              <h4 className="font-extrabold text-[#1B5E20] text-xs uppercase tracking-wider flex items-center justify-between">
                <span>💊 Active Prescribed Medications</span>
                <span className="text-[10px] bg-[#E8F5E9] text-[#1B5E20] px-2 py-0.5 rounded font-bold">
                  {patient.medications.length} Active
                </span>
              </h4>

              {patient.medications.length === 0 ? (
                <p className="text-xs text-gray-500 italic py-2">No active medications on record.</p>
              ) : (
                <div className="space-y-2">
                  {patient.medications.map((med) => (
                    <div key={med.id} className="p-3 rounded-xl bg-[#F8FAF8] border border-[#C8E6C9] text-xs">
                      <div className="flex justify-between font-bold text-[#122415]">
                        <span>{med.name}</span>
                        <span className="text-[10px] font-mono text-[#1B5E20] bg-[#E8F5E9] px-2 py-0.5 rounded">
                          {med.dosage}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#38523C] mt-0.5">{med.frequency} • {med.prescribedBy}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Timeline */}
            <div className="md:col-span-2 bg-white rounded-2xl p-5 border border-[#C8E6C9] shadow-sm space-y-3">
              <h4 className="font-extrabold text-[#1B5E20] text-xs uppercase tracking-wider">
                📅 Permanent Health History Timeline
              </h4>
              <div className="space-y-2">
                {patient.timeline.map((ev) => (
                  <div key={ev.id} className="p-3 bg-[#E8F5E9] border border-[#C8E6C9] rounded-xl text-xs flex justify-between items-center">
                    <div>
                      <span className="font-bold text-[#122415] block">{ev.title}</span>
                      <span className="text-[11px] text-[#38523C]">{ev.facility} • {ev.summary}</span>
                    </div>
                    <span className="text-[10px] font-bold text-[#1B5E20] bg-white px-2.5 py-1 rounded-full border border-[#A5D6A7] shrink-0">
                      {ev.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Prescriptions & Vision Scans */}
        {activeDoctorTab === 'documents' && (
          <div className="bg-white rounded-2xl p-6 border border-[#C8E6C9] shadow-sm space-y-4">
            <h3 className="text-base font-bold text-[#1B5E20] font-display flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#66BB6A]" /> Digital Health Locker Documents ({patient.documents.length})
            </h3>

            {patient.documents.length === 0 ? (
              <p className="text-xs text-gray-500 italic py-4 text-center">No prescription scans or lab reports uploaded yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {patient.documents.map((doc) => (
                  <div key={doc.id} className="p-4 rounded-xl border border-[#C8E6C9] bg-[#F8FAF8] space-y-2 text-xs">
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-sm text-[#122415]">{doc.title}</span>
                      <span className="text-[10px] font-extrabold bg-[#E8F5E9] text-[#1B5E20] px-2 py-0.5 rounded uppercase">
                        {doc.category.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#38523C]">{doc.facility} • Date: {doc.uploadDate}</p>

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
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Write New Prescription */}
        {activeDoctorTab === 'write' && (
          <div className="bg-white rounded-2xl p-6 border border-[#C8E6C9] shadow-sm max-w-2xl space-y-4">
            <h3 className="text-base font-bold text-[#1B5E20] font-display flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-[#66BB6A]" /> Issue Prescription to Health ID ({patient.permanentId})
            </h3>

            <form onSubmit={handleAddDoctorNote} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#122415] mb-1">Entry Type</label>
                <select
                  value={newNoteType}
                  onChange={(e: any) => setNewNoteType(e.target.value)}
                  className="w-full px-3 py-2 border border-[#C8E6C9] rounded-xl text-xs font-semibold outline-none focus:border-[#1B5E20]"
                >
                  <option value="medication">Medication Prescription</option>
                  <option value="allergy">Confirmed Allergy Flag</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#122415] mb-1">Name / Item Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Paracetamol 650mg or Penicillin Allergy"
                  value={newNoteName}
                  onChange={(e) => setNewNoteName(e.target.value)}
                  className="w-full px-3 py-2 border border-[#C8E6C9] rounded-xl text-xs font-semibold outline-none focus:border-[#1B5E20]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#122415] mb-1">Clinical Instructions & Dosage</label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. 1 Tablet three times daily after meals for 5 days..."
                  value={newNoteDetail}
                  onChange={(e) => setNewNoteDetail(e.target.value)}
                  className="w-full px-3 py-2 border border-[#C8E6C9] rounded-xl text-xs font-semibold outline-none focus:border-[#1B5E20]"
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary text-xs px-6 py-2.5 flex items-center gap-2">
                <PlusCircle className="w-4 h-4 text-[#66BB6A]" /> Save to Permanent Citizen Profile 🟢
              </button>
            </form>
          </div>
        )}

        {/* Tab 4: Verification Queue */}
        {activeDoctorTab === 'verification' && (
          <div className="bg-white rounded-2xl p-6 border border-[#C8E6C9] shadow-sm space-y-4">
            <h3 className="text-base font-bold text-[#1B5E20] font-display flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#66BB6A]" /> Verification Queue
            </h3>

            {verificationQueue.length === 0 ? (
              <p className="text-xs text-gray-500 italic py-4 text-center">🟢 No pending items requiring verification.</p>
            ) : (
              <div className="space-y-3">
                {verificationQueue.map((v) => (
                  <div
                    key={v.id}
                    className={`p-4 rounded-xl border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs ${v.status === 'pending'
                        ? 'bg-[#FEF3C7] border-[#FDE68A]'
                        : v.status === 'verified'
                          ? 'bg-[#E8F5E9] border-[#A5D6A7]'
                          : 'bg-[#FEE2E2] border-[#FCA5A5]'
                      }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-extrabold uppercase bg-white px-2 py-0.5 rounded border border-[#FDE68A] text-[#78350F]">
                          {v.source}
                        </span>
                        <h4 className="font-bold text-sm text-[#122415]">{v.title}</h4>
                      </div>
                      <p className="text-xs text-[#78350F] mt-1">{v.details}</p>
                    </div>

                    {v.status === 'pending' ? (
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => verifyItem(v.id, false)}
                          className="px-3 py-1.5 rounded-lg bg-white border border-[#DC2626] text-[#DC2626] hover:bg-[#FEE2E2] font-bold flex items-center gap-1"
                        >
                          <X className="w-3.5 h-3.5" /> Reject
                        </button>
                        <button
                          onClick={() => handleOpenEditModal(v)}
                          className="px-3 py-1.5 rounded-lg bg-[#123814] text-white hover:bg-[#1B5E20] font-bold flex items-center gap-1"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-[#66BB6A]" /> Edit
                        </button>
                        <button
                          onClick={() => verifyItem(v.id, true)}
                          className="px-3 py-1.5 rounded-lg bg-[#1B5E20] text-white hover:bg-[#144517] font-bold flex items-center gap-1"
                        >
                          <Check className="w-3.5 h-3.5 text-[#66BB6A]" /> Confirm
                        </button>
                      </div>
                    ) : (
                      <span className={`badge text-xs font-bold ${v.status === 'verified' ? 'badge-verified' : 'badge-critical'}`}>
                        {v.status === 'verified' ? '🟢 Verified' : '🔴 Rejected'}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 5: MedGemma & FHIR Audit Trail Inspector */}
        {activeDoctorTab === 'medgemma_audit' && (
          <div className="bg-white rounded-2xl p-6 border border-[#C8E6C9] shadow-sm space-y-5">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b border-[#C8E6C9] pb-4">
              <div>
                <h3 className="text-base font-bold text-[#1B5E20] font-display flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#66BB6A]" /> Google MedGemma AI Clinical Summaries & FHIR Audit Trail
                </h3>
                <p className="text-xs text-[#38523C] font-medium mt-0.5">
                  India DPDP Act 2023 Tokenized Health Information & NMC Compliant Audit Logs
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold bg-[#1B5E20] text-white px-2.5 py-1 rounded-lg border border-[#A5D6A7]">
                  Model: medgemma-7b-it
                </span>
                <span className="text-[10px] font-extrabold bg-[#E8F5E9] text-[#1B5E20] px-2.5 py-1 rounded-lg border border-[#A5D6A7]">
                  FHIR R4 AuditEvent Validated
                </span>
              </div>
            </div>

            {/* Mandatory NMC Disclaimer Banner */}
            <div className="p-3 bg-[#FFFBEB] border border-[#FDE68A] rounded-xl text-xs text-[#92400E] font-semibold flex items-start gap-2">
              <Lock className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[#78350F]">Mandatory National Medical Commission (NMC) Disclaimer:</strong>
                <p className="text-[11px] mt-0.5">{NMC_MANDATORY_DISCLAIMER}</p>
              </div>
            </div>

            {/* FHIR Audit Trail Events List */}
            <div className="space-y-3">
              <h4 className="font-extrabold text-[#1B5E20] text-xs uppercase tracking-wider flex items-center justify-between">
                <span>📋 Registered FHIR AuditEvent Log Entries ({fhirAuditLogs.length})</span>
                <span className="text-[10px] font-mono text-[#2E7D32]">Purpose of Use: TREAT</span>
              </h4>

              <div className="space-y-3">
                {fhirAuditLogs.map((log) => (
                  <div key={log.id} className="p-4 rounded-xl border border-[#C8E6C9] bg-[#F8FAF8] space-y-2 text-xs">
                    <div className="flex flex-wrap justify-between items-start gap-2">
                      <div className="flex items-center gap-2">
                        <FileCode className="w-4 h-4 text-[#1B5E20]" />
                        <span className="font-bold text-[#122415]">{log.type.display}</span>
                      </div>
                      <span className="text-[10px] font-mono font-bold bg-[#E8F5E9] text-[#1B5E20] px-2 py-0.5 rounded">
                        {log.id} • {new Date(log.recorded).toLocaleTimeString()}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px]">
                      <div className="bg-white p-2.5 rounded-lg border border-[#E0E0E0]">
                        <span className="font-bold text-[#1B5E20] block mb-1">🤖 Participating Agents:</span>
                        {log.agent.map((a, i) => (
                          <div key={i} className="text-[#38523C]">
                            • <strong>{a.name}</strong> ({a.role})
                          </div>
                        ))}
                      </div>

                      <div className="bg-white p-2.5 rounded-lg border border-[#E0E0E0]">
                        <span className="font-bold text-[#1B5E20] block mb-1">🔒 DPDP Anonymized Entity:</span>
                        <p className="text-[#38523C] font-mono text-[10.5px]">Reference: {log.entity[0]?.what.reference}</p>
                        <p className="text-[#38523C] font-mono text-[10.5px]">Hash: {log.entity[0]?.sha256Hash}</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-[10px] font-bold text-[#2E7D32] pt-1">
                      <span>Outcome Code: {log.outcome} (Success)</span>
                      <span>NMC Disclaimer Appended: Yes 🟢</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Doctor Edit Modal */}
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
