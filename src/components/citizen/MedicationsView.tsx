import React from 'react';
import { useHealthRecord } from '../../context/HealthRecordContext';
import { Pill, CheckCircle2, PlusCircle, History } from 'lucide-react';

interface MedicationsViewProps {
  onOpenReportModal: () => void;
}

export const MedicationsView: React.FC<MedicationsViewProps> = ({ onOpenReportModal }) => {
  const { patient } = useHealthRecord();

  const activeMeds = patient.medications.filter(m => m.status === 'active');
  const stoppedMeds = patient.medications.filter(m => m.status === 'stopped');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-[#C8E6C9]">
        <div>
          <h2 className="text-2xl font-bold text-[#1B5E20] font-display flex items-center gap-2">
            <Pill className="w-6 h-6 text-[#1B5E20]" /> Active & Past Medications
          </h2>
          <p className="text-xs text-[#38523C] mt-1">
            Maintain accurate active medication lists across government facilities to prevent drug interactions.
          </p>
        </div>
        <button onClick={onOpenReportModal} className="btn btn-primary text-xs">
          <PlusCircle className="w-4 h-4 text-[#66BB6A]" /> Report Current Medication
        </button>
      </div>

      {/* Active Medications */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-[#1B5E20] uppercase tracking-wider flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#1B5E20]" /> Currently Active Prescriptions ({activeMeds.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeMeds.map((med) => (
            <div key={med.id} className="p-5 rounded-xl bg-white border border-[#C8E6C9] shadow-sm hover:border-[#66BB6A]">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-base text-[#122415]">{med.name}</h4>
                {med.clinicalStatus === 'verified' ? (
                  <span className="badge badge-verified text-[10px]">🟢 Doctor Verified</span>
                ) : (
                  <span className="badge badge-pending text-[10px]">🟡 Pending Verification</span>
                )}
              </div>

              <div className="flex items-center gap-3 text-xs font-semibold text-[#1B5E20] mb-2">
                <span className="bg-[#E8F5E9] px-2.5 py-1 rounded border border-[#A5D6A7]">Dose: {med.dosage}</span>
                <span className="bg-[#E8F5E9] px-2.5 py-1 rounded border border-[#A5D6A7]">{med.frequency}</span>
              </div>

              <div className="text-[11px] text-[#38523C] bg-[#F4F9F5] p-3 rounded-lg border border-[#E0F2E1] space-y-1">
                <p><strong>Prescribed By:</strong> {med.prescribedBy}</p>
                <p><strong>Start Date:</strong> {med.startDate}</p>
                {med.notes && <p><strong>Notes:</strong> {med.notes}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stopped / Resolved Medications */}
      {stoppedMeds.length > 0 && (
        <div className="space-y-3 pt-4 border-t border-[#C8E6C9]">
          <h3 className="text-sm font-bold text-[#475569] uppercase tracking-wider flex items-center gap-2">
            <History className="w-4 h-4 text-[#475569]" /> Previously Discontinued / Stopped ({stoppedMeds.length})
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stoppedMeds.map((med) => (
              <div key={med.id} className="p-5 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] opacity-80">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-base text-[#334155] line-through">{med.name}</h4>
                  <span className="badge badge-resolved text-[10px]">⚪ Resolved / Discontinued</span>
                </div>
                <p className="text-xs text-[#475569] mb-2">Dose: {med.dosage} • {med.frequency}</p>
                <div className="text-[11px] text-[#475569] bg-white p-2.5 rounded-lg border border-[#E2E8F0]">
                  <p><strong>Stopped Date:</strong> {med.endDate}</p>
                  <p><strong>Reason:</strong> {med.notes}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
