import React, { useState } from 'react';
import { useHealthRecord } from '../../context/HealthRecordContext';
import { CitizenDashboard } from './CitizenDashboard';
import { AllergiesView } from './AllergiesView';
import { MedicationsView } from './MedicationsView';
import { DocumentLocker } from './DocumentLocker';
import { ConsentAccessView } from './ConsentAccessView';
import { HealthTimelineView } from './HealthTimelineView';
import { ReportChangeModal } from './ReportChangeModal';
import { AIHistoryIntakeModal } from './AIHistoryIntakeModal';
import { LayoutDashboard, User, AlertOctagon, Pill, Activity, FileText, Calendar, Lock, PlusCircle, Bot } from 'lucide-react';

export const CitizenPortal: React.FC = () => {
  const { activeTab, setActiveTab, patient } = useHealthRecord();
  const [showReportModal, setShowReportModal] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);

  const tabs = [
    { id: 'dashboard', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'profile', label: 'Health Profile', icon: <User className="w-4 h-4" /> },
    { id: 'allergies', label: 'Allergies', icon: <AlertOctagon className="w-4 h-4" /> },
    { id: 'medications', label: 'Medications', icon: <Pill className="w-4 h-4" /> },
    { id: 'operations', label: 'Surgeries', icon: <Activity className="w-4 h-4" /> },
    { id: 'documents', label: 'Documents', icon: <FileText className="w-4 h-4" /> },
    { id: 'timeline', label: 'Timeline', icon: <Calendar className="w-4 h-4" /> },
    { id: 'consent', label: 'Consent & Access', icon: <Lock className="w-4 h-4" /> }
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
            onOpenAIIntake={() => setShowAIModal(true)}
          />
        )}

        {activeTab === 'profile' && (
          <div className="bg-white p-6 rounded-2xl border border-[#C8E6C9] space-y-6">
            <h2 className="text-2xl font-bold text-[#1B5E20] font-display">Personal Health Profile</h2>
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
              <div className="p-4 bg-[#E8F5E9] rounded-xl border border-[#C8E6C9]">
                <span className="text-xs text-[#38523C] block font-semibold">Height / Weight</span>
                <span className="text-sm font-bold text-[#122415]">{patient.height} / {patient.weight}</span>
              </div>
              <div className="p-4 bg-[#E8F5E9] rounded-xl border border-[#C8E6C9]">
                <span className="text-xs text-[#38523C] block font-semibold">Emergency Contact</span>
                <span className="text-sm font-bold text-[#122415]">{patient.emergencyContact.name} ({patient.emergencyContact.relation}): {patient.emergencyContact.mobile}</span>
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
        {showAIModal && <AIHistoryIntakeModal onClose={() => setShowAIModal(false)} />}
      </div>
    </div>
  );
};
