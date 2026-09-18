import React, { useState } from 'react';
import { useHealthRecord } from '../../context/HealthRecordContext.tsx';
import { CitizenDashboard } from './CitizenDashboard.tsx';
import { AllergiesView } from './AllergiesView.tsx';
import { MedicationsView } from './MedicationsView.tsx';
import { DocumentLocker } from './DocumentLocker.tsx';
import { ConsentAccessView } from './ConsentAccessView.tsx';
import { HealthTimelineView } from './HealthTimelineView.tsx';
import { ReportChangeModal } from './ReportChangeModal.tsx';
import { AIHistoryIntakeModal } from './AIHistoryIntakeModal.tsx';
import type { AIMode } from './AIHistoryIntakeModal.tsx';
import { LayoutDashboard, User, AlertOctagon, Pill, Activity, FileText, Calendar, Lock, Edit3, PhoneCall, Scale } from 'lucide-react';

export const CitizenPortal: React.FC = () => {
  const { activeTab, setActiveTab, patient, updateVitalsAndContact, t } = useHealthRecord();
  const [showReportModal, setShowReportModal] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiModalMode, setAiModalMode] = useState<AIMode>('awareness');

  // Edit Vitals & Emergency Contact Modal State
  const [showEditVitalsModal, setShowEditVitalsModal] = useState(false);
  const [editHeight, setEditHeight] = useState(patient.height || '175 cm');
  const [editWeight, setEditWeight] = useState(patient.weight || '72 kg');
  const [editContactName, setEditContactName] = useState(patient.emergencyContact?.name || '');
  const [editContactRelation, setEditContactRelation] = useState(patient.emergencyContact?.relation || 'Spouse');
  const [editContactMobile, setEditContactMobile] = useState(patient.emergencyContact?.mobile || '');

  const handleOpenAiModal = (mode: AIMode) => {
    setAiModalMode(mode);
    setShowAIModal(true);
  };

  const handleOpenEditVitalsModal = () => {
    setEditHeight(patient.height || '175 cm');
    setEditWeight(patient.weight || '72 kg');
    setEditContactName(patient.emergencyContact?.name || 'Family Contact');
    setEditContactRelation(patient.emergencyContact?.relation || 'Relative');
    setEditContactMobile(patient.emergencyContact?.mobile || '+91 98765 43211');
    setShowEditVitalsModal(true);
  };

  const handleSaveVitalsAndContact = (e: React.FormEvent) => {
    e.preventDefault();
    updateVitalsAndContact(
      editHeight,
      editWeight,
      {
        name: editContactName,
        relation: editContactRelation,
        mobile: editContactMobile
      }
    );
    setShowEditVitalsModal(false);
  };

  const tabs = [
    { id: 'dashboard', label: t('overviewTab'), icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'profile', label: t('citizenRecordOverview'), icon: <User className="w-4 h-4" /> },
    { id: 'allergies', label: t('allergiesTab'), icon: <AlertOctagon className="w-4 h-4" /> },
    { id: 'medications', label: t('medicationsTab'), icon: <Pill className="w-4 h-4" /> },
    { id: 'operations', label: 'Surgeries', icon: <Activity className="w-4 h-4" /> },
    { id: 'documents', label: t('documentsTab'), icon: <FileText className="w-4 h-4" /> },
    { id: 'timeline', label: t('timelineTab'), icon: <Calendar className="w-4 h-4" /> },
    { id: 'consent', label: t('consentTab'), icon: <Lock className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-[#E8F5E9] py-8">
      <div className="container mx-auto px-4">
        {/* Navigation Tabs Bar */}
        <div className="bg-white rounded-2xl p-2 border border-[#C8E6C9] shadow-sm mb-6 flex overflow-x-auto gap-1 scrollbar-none">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id || (activeTab === 'dashboard' && tab.id === 'dashboard');
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#1B5E20] text-white shadow-sm font-bold'
                    : 'text-[#38523C] hover:bg-[#E8F5E9] hover:text-[#1B5E20]'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* View Switcher */}
        {activeTab === 'dashboard' && (
          <CitizenDashboard
            onNavigateTab={setActiveTab}
            onOpenReportModal={() => setShowReportModal(true)}
            onOpenAIIntake={(mode?: AIMode) => handleOpenAiModal(mode || 'doctorIntake')}
            onOpenAIAwareness={() => handleOpenAiModal('awareness')}
          />
        )}

        {activeTab === 'profile' && (
          <div className="bg-white p-6 rounded-2xl border border-[#C8E6C9] space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#C8E6C9] pb-4">
              <div>
                <h2 className="text-2xl font-bold text-[#1B5E20] font-display">Personal Health Profile</h2>
                <p className="text-xs text-[#38523C] mt-0.5">Permanent citizen record & emergency health details</p>
              </div>

              <button
                onClick={handleOpenEditVitalsModal}
                className="bg-[#1B5E20] text-white hover:bg-[#144517] font-bold text-xs px-4 py-2.5 rounded-xl shadow flex items-center gap-2"
              >
                <Edit3 className="w-4 h-4 text-[#66BB6A]" /> Edit Height, Weight & Emergency Contact
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-[#E8F5E9] rounded-xl border border-[#C8E6C9]">
                <span className="text-xs text-[#38523C] block font-semibold">Full Name</span>
                <span className="text-lg font-bold text-[#122415]">{patient.fullName}</span>
              </div>
              <div className="p-4 bg-[#E8F5E9] rounded-xl border border-[#C8E6C9]">
                <span className="text-xs text-[#38523C] block font-semibold">Blood Group</span>
                <span className="text-lg font-bold text-[#1B5E20]">{patient.bloodGroup}</span>
              </div>
              <div className="p-4 bg-[#E8F5E9] rounded-xl border border-[#C8E6C9]">
                <span className="text-xs text-[#38523C] block font-semibold">ABHA Identification Number</span>
                <span className="text-sm font-mono font-bold text-[#122415]">{patient.abhaId}</span>
              </div>
              <div className="p-4 bg-[#E8F5E9] rounded-xl border border-[#C8E6C9]">
                <span className="text-xs text-[#38523C] block font-semibold">Permanent Health ID</span>
                <span className="text-sm font-mono font-bold text-[#122415]">{patient.permanentId}</span>
              </div>

              {/* Editable Height / Weight Card */}
              <div className="p-4 bg-[#E8F5E9] rounded-xl border-2 border-[#A5D6A7] flex justify-between items-center">
                <div>
                  <span className="text-xs text-[#38523C] block font-semibold flex items-center gap-1">
                    <Scale className="w-3.5 h-3.5 text-[#1B5E20]" /> Height / Weight
                  </span>
                  <span className="text-base font-bold text-[#122415]">{patient.height} / {patient.weight}</span>
                </div>
                <button
                  onClick={handleOpenEditVitalsModal}
                  className="p-2 rounded-lg bg-white border border-[#A5D6A7] hover:bg-[#1B5E20] hover:text-white transition-all text-xs font-bold flex items-center gap-1 text-[#1B5E20]"
                  title="Change Height & Weight"
                >
                  <Edit3 className="w-3.5 h-3.5" /> Edit
                </button>
              </div>

              {/* Editable Emergency Contact Card */}
              <div className="p-4 bg-[#E8F5E9] rounded-xl border-2 border-[#A5D6A7] flex justify-between items-center">
                <div>
                  <span className="text-xs text-[#38523C] block font-semibold flex items-center gap-1">
                    <PhoneCall className="w-3.5 h-3.5 text-[#1B5E20]" /> Emergency Contact
                  </span>
                  <span className="text-xs font-bold text-[#122415] block mt-0.5">
                    {patient.emergencyContact.name} ({patient.emergencyContact.relation}): {patient.emergencyContact.mobile}
                  </span>
                </div>
                <button
                  onClick={handleOpenEditVitalsModal}
                  className="p-2 rounded-lg bg-white border border-[#A5D6A7] hover:bg-[#1B5E20] hover:text-white transition-all text-xs font-bold flex items-center gap-1 text-[#1B5E20] shrink-0 ml-2"
                  title="Change Emergency Contact"
                >
                  <Edit3 className="w-3.5 h-3.5" /> Edit
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'allergies' && <AllergiesView onOpenReportModal={() => setShowReportModal(true)} />}

        {activeTab === 'medications' && <MedicationsView onOpenReportModal={() => setShowReportModal(true)} />}

        {activeTab === 'operations' && (
          <div className="bg-white p-6 rounded-2xl border border-[#C8E6C9] space-y-4">
            <h2 className="text-2xl font-bold text-[#1B5E20] font-display">Surgical & Operation History</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {patient.operations.map(op => (
                <div key={op.id} className="p-4 bg-[#E8F5E9] rounded-xl border border-[#C8E6C9]">
                  <div className="flex justify-between font-bold text-[#122415] text-base mb-1">
                    <span>{op.procedureName}</span>
                    <span className="text-xs bg-[#1B5E20] text-white px-2 py-0.5 rounded">{op.year}</span>
                  </div>
                  <p className="text-xs text-[#1B5E20] font-semibold mb-2">{op.hospital} • Surgeon: {op.surgeon}</p>
                  <p className="text-xs text-[#38523C] bg-white p-2.5 rounded-lg border border-[#E0F2E1]">{op.notes}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'documents' && <DocumentLocker />}

        {activeTab === 'timeline' && <HealthTimelineView />}

        {activeTab === 'consent' && <ConsentAccessView />}

        {/* Modals */}
        {showReportModal && <ReportChangeModal onClose={() => setShowReportModal(false)} />}
        {showAIModal && (
          <AIHistoryIntakeModal
            onClose={() => setShowAIModal(false)}
            initialMode={aiModalMode}
          />
        )}

        {/* Edit Height, Weight & Emergency Contact Modal */}
        {showEditVitalsModal && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border-2 border-[#1B5E20] animate-fade-in space-y-4">
              <div className="flex justify-between items-start border-b border-[#C8E6C9] pb-3">
                <div>
                  <h3 className="text-lg font-bold text-[#1B5E20] font-display flex items-center gap-2">
                    <Edit3 className="w-5 h-5 text-[#66BB6A]" /> Change Height, Weight & Emergency Contact
                  </h3>
                  <p className="text-xs text-[#38523C] mt-0.5">Update physical vitals and emergency contact info</p>
                </div>
                <button onClick={() => setShowEditVitalsModal(false)} className="text-gray-400 hover:text-black font-bold text-xl">✕</button>
              </div>

              <form onSubmit={handleSaveVitalsAndContact} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#122415] mb-1">Height</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 175 cm"
                      value={editHeight}
                      onChange={(e) => setEditHeight(e.target.value)}
                      className="w-full px-3 py-2 border border-[#C8E6C9] rounded-lg text-sm font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#122415] mb-1">Weight</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 72 kg"
                      value={editWeight}
                      onChange={(e) => setEditWeight(e.target.value)}
                      className="w-full px-3 py-2 border border-[#C8E6C9] rounded-lg text-sm font-semibold"
                    />
                  </div>
                </div>

                <div className="border-t border-[#C8E6C9] pt-3 space-y-3">
                  <h4 className="text-xs font-extrabold text-[#1B5E20] uppercase tracking-wider">Emergency Contact Person</h4>
                  <div>
                    <label className="block text-xs font-bold text-[#122415] mb-1">Contact Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sunita Kumar"
                      value={editContactName}
                      onChange={(e) => setEditContactName(e.target.value)}
                      className="w-full px-3 py-2 border border-[#C8E6C9] rounded-lg text-sm font-semibold"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#122415] mb-1">Relation</label>
                      <select
                        value={editContactRelation}
                        onChange={(e) => setEditContactRelation(e.target.value)}
                        className="w-full px-3 py-2 border border-[#C8E6C9] rounded-lg text-sm font-semibold"
                      >
                        <option value="Spouse">Spouse</option>
                        <option value="Parent">Parent</option>
                        <option value="Father">Father</option>
                        <option value="Mother">Mother</option>
                        <option value="Sibling">Sibling</option>
                        <option value="Relative">Relative</option>
                        <option value="Friend">Friend</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#122415] mb-1">Mobile Number</label>
                      <input
                        type="text"
                        required
                        placeholder="+91 98765..."
                        value={editContactMobile}
                        onChange={(e) => setEditContactMobile(e.target.value)}
                        className="w-full px-3 py-2 border border-[#C8E6C9] rounded-lg text-sm font-semibold"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-[#C8E6C9]">
                  <button
                    type="button"
                    onClick={() => setShowEditVitalsModal(false)}
                    className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary text-xs px-5">
                    Save Changes 🟢
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
