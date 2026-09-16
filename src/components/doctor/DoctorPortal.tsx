import React, { useState } from 'react';
import { useHealthRecord } from '../../context/HealthRecordContext';
import { Stethoscope, CheckCircle2, XCircle, AlertOctagon, Bot, Pill, Activity, FileText, PlusCircle, ShieldAlert, Check, X, Sparkles, Edit3, ShieldCheck } from 'lucide-react';
import type { VerificationItem } from '../../types/health';

export const DoctorPortal: React.FC = () => {
  const { patient, verificationQueue, verifyItem, modifyAndVerifyItem, addDoctorNote, t } = useHealthRecord();
  const [activeDoctorTab, setActiveDoctorTab] = useState<'overview' | 'verification' | 'notes'>('overview');
  const [newNoteType, setNewNoteType] = useState<'medication' | 'allergy'>('medication');
  const [newNoteName, setNewNoteName] = useState('');
  const [newNoteDetail, setNewNoteDetail] = useState('');

  // Doctor Edit & Correct Modal State
  const [editingVqItem, setEditingVqItem] = useState<VerificationItem | null>(null);
  const [modTitle, setModTitle] = useState('');
  const [modDetails, setModDetails] = useState('');
  const [modSeverity, setModSeverity] = useState<'critical' | 'important' | 'normal'>('important');

  const pendingVerificationItems = verificationQueue.filter(v => v.status === 'pending');

  const handleAddDoctorNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteName) return;
    addDoctorNote(newNoteType, newNoteName, newNoteDetail);
    setNewNoteName('');
    setNewNoteDetail('');
  };

  const handleOpenEditModal = (item: VerificationItem) => {
    setEditingVqItem(item);
    const cleanTitle = item.title.replace('Patient Reported:', '').replace('AI OCR Scanned:', '').trim();
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
              <span className="text-[10px] text-[#A5D6A7] block font-semibold uppercase">{t('pendingVerification')}</span>
              <span className="text-xl font-extrabold text-[#FDE68A]">{pendingVerificationItems.length} Items</span>
            </div>
          </div>
        </div>

        {/* Doctor Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* OPD Queue Sidebar */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-4 border border-[#C8E6C9]">
              <h3 className="text-sm font-bold text-[#1B5E20] mb-3 uppercase tracking-wider flex items-center justify-between">
                <span>{t('todaysQueue')}</span>
                <span className="bg-[#E8F5E9] text-[#1B5E20] text-[10px] px-2 py-0.5 rounded-full font-bold">3 Tokens</span>
              </h3>

              <div className="space-y-2">
                {/* Active Patient Card */}
                <div className="p-3.5 rounded-xl bg-[#E8F5E9] border-2 border-[#1B5E20] shadow-sm">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-extrabold text-[#1B5E20] text-xs bg-[#66BB6A] text-[#1B5E20] px-2 py-0.5 rounded">
                      Token 101
                    </span>
                    <span className="text-[10px] text-[#B91C1C] font-bold">🔴 {t('criticalAllergy')}</span>
                  </div>
                  <h4 className="font-bold text-sm text-[#122415]">{patient.fullName}</h4>
                  <p className="text-[11px] text-[#38523C]">Male, 32 yrs • ABHA: {patient.abhaId}</p>
                </div>

                {/* Queue Item 2 */}
                <div className="p-3.5 rounded-xl bg-white border border-[#E0F2E1] opacity-75 hover:opacity-100">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-700">
                      Token 102
                    </span>
                    <span className="text-[10px] text-[#B45309] font-bold">🟡 2 {t('pendingVerification')}</span>
                  </div>
                  <h4 className="font-bold text-sm text-[#122415]">Sunita Verma</h4>
                  <p className="text-[11px] text-[#38523C]">Female, 45 yrs • PHC Referral</p>
                </div>

                {/* Queue Item 3 */}
                <div className="p-3.5 rounded-xl bg-white border border-[#E0F2E1] opacity-75 hover:opacity-100">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-700">
                      Token 103
                    </span>
                    <span className="text-[10px] text-gray-500 font-bold">{t('routineFollowup')}</span>
                  </div>
                  <h4 className="font-bold text-sm text-[#122415]">Rajesh Patel</h4>
                  <p className="text-[11px] text-[#38523C]">Male, 58 yrs • Diabetes OPD</p>
                </div>
              </div>
            </div>

            {/* AI Patient Summary Card */}
            <div className="bg-white rounded-2xl p-4 border border-[#C8E6C9]">
              <div className="flex items-center gap-2 text-[#1B5E20] font-bold text-xs mb-2">
                <Bot className="w-4 h-4 text-[#66BB6A]" /> {t('aiIntakePreSummary')}
              </div>
              <p className="text-xs text-[#38523C] bg-[#EFF6FF] p-3 rounded-xl border border-[#BFDBFE] leading-relaxed">
                Patient reports mild cough and sore throat for 2 days. Self-prescribed Amoxicillin 250mg yesterday. <strong>Verified Penicillin Allergy</strong> on record!
              </p>
            </div>
          </div>

          {/* Active Patient Clinical Workspace */}
          <div className="lg:col-span-3 space-y-6">
            {/* Patient Workspace Bar */}
            <div className="bg-white rounded-2xl p-6 border border-[#C8E6C9] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-2xl font-bold text-[#1B5E20] font-display">{patient.fullName}</h3>
                  <span className="bg-[#E8F5E9] text-[#1B5E20] text-xs font-bold px-2.5 py-0.5 rounded-full border border-[#A5D6A7]">
                    {t('bloodGroup')}: {patient.bloodGroup}
                  </span>
                </div>
                <p className="text-xs text-[#38523C]">
                  Permanent Health ID: <strong className="text-[#122415]">{patient.permanentId}</strong> • Height: {patient.height} • Weight: {patient.weight}
                </p>
              </div>

              {/* Critical Alert Warning */}
              <div className="bg-[#FEE2E2] border border-[#FCA5A5] px-4 py-2 rounded-xl flex items-center gap-2 text-[#B91C1C] text-xs font-bold">
                <AlertOctagon className="w-5 h-5 shrink-0" />
                <span>🔴 {t('penicillinAllergy')}</span>
              </div>
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
                {t('addClinicalNotesPrescription')}
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
                            {alg.status === 'verified' ? '🟢 Verified' : '🟡 Pending Doctor Review'}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#38523C] mt-1">{alg.reaction}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Active Medications */}
                <div className="card">
                  <h4 className="font-bold text-[#1B5E20] text-sm mb-3 uppercase tracking-wider">
                    {t('activeMedicationsTitle')}
                  </h4>
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
                </div>
              </div>
            )}

            {/* Tab 2: Verification Engine */}
            {activeDoctorTab === 'verification' && (
              <div className="bg-white rounded-2xl p-6 border border-[#C8E6C9] space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-[#1B5E20] font-display">
                    {t('doctorVerificationEngine')}
                  </h3>
                  <p className="text-xs text-[#38523C] mt-0.5">
                    {t('keySafeguard')}
                  </p>
                </div>

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
              </div>
            )}

            {/* Tab 3: Clinical Notes */}
            {activeDoctorTab === 'notes' && (
              <div className="bg-white rounded-2xl p-6 border border-[#C8E6C9]">
                <h3 className="text-xl font-bold text-[#1B5E20] font-display mb-4">
                  {t('addPrescriptionNote')}
                </h3>

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
                      placeholder="e.g. Paracetamol 650mg or Sulfa Allergy"
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
                      placeholder="Enter dosage, duration, or clinical findings..."
                      value={newNoteDetail}
                      onChange={(e) => setNewNoteDetail(e.target.value)}
                      className="w-full px-3 py-2 border border-[#C8E6C9] rounded-lg text-sm"
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary text-xs flex items-center gap-2">
                    <PlusCircle className="w-4 h-4 text-[#66BB6A]" /> {t('savePermanentRecord')}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Doctor Edit & Correct Verification Item Modal */}
      {editingVqItem && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border-2 border-[#1B5E20] animate-fade-in space-y-4">
            <div className="flex justify-between items-start border-b border-[#C8E6C9] pb-3">
              <div>
                <h3 className="text-lg font-bold text-[#1B5E20] font-display flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-[#66BB6A]" /> Edit & Correct Patient Claim
                </h3>
                <p className="text-xs text-[#38523C] mt-0.5">
                  Refine patient-reported entry into an official verified clinical record
                </p>
              </div>
              <button onClick={() => setEditingVqItem(null)} className="text-gray-400 hover:text-black font-bold text-xl">✕</button>
            </div>

            <form onSubmit={handleSaveCorrection} className="space-y-4">
              <div className="p-3 rounded-xl bg-[#FEF3C7] border border-[#FDE68A] text-xs text-[#78350F]">
                <strong className="block mb-0.5">Original Claim ({editingVqItem.source}):</strong>
                <span>{editingVqItem.title} • {editingVqItem.details}</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#122415] mb-1">
                  Corrected Title / Diagnosis
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lactose Intolerance (Dairy Allergy) or Amoxicillin 500mg"
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
