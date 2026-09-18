import React from 'react';
import { useHealthRecord } from '../../context/HealthRecordContext';
import { AlertOctagon, CheckCircle2, Clock, PlusCircle } from 'lucide-react';

interface AllergiesViewProps {
  onOpenReportModal: () => void;
}

export const AllergiesView: React.FC<AllergiesViewProps> = ({ onOpenReportModal }) => {
  const { patient } = useHealthRecord();

  const verifiedAllergies = patient.allergies.filter(a => a.status === 'verified');
  const pendingAllergies = patient.allergies.filter(a => a.status === 'pending');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-[#C8E6C9]">
        <div>
          <h2 className="text-2xl font-bold text-[#1B5E20] font-display flex items-center gap-2">
            <AlertOctagon className="w-6 h-6 text-[#DC2626]" /> Allergy Records & Critical Indicators
          </h2>
          <p className="text-xs text-[#38523C] mt-1">
            Confirmed allergies are highlighted to consulting physicians before any medication is prescribed.
          </p>
        </div>
        <button
          onClick={onOpenReportModal}
          className="btn btn-primary text-xs"
        >
          <PlusCircle className="w-4 h-4 text-[#66BB6A]" /> Report New Allergy
        </button>
      </div>

      {/* Confirmed Allergies Section */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-[#1B5E20] uppercase tracking-wider flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#1B5E20]" /> Confirmed Clinical Allergies ({verifiedAllergies.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {verifiedAllergies.map((alg) => (
            <div
              key={alg.id}
              className={`p-5 rounded-xl bg-white border-2 shadow-sm ${
                alg.severity === 'critical'
                  ? 'border-[#FCA5A5] bg-[#FFF5F5]'
                  : 'border-[#A5D6A7]'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-base text-[#122415]">{alg.allergen}</h4>
                  {alg.severity === 'critical' && (
                    <span className="badge badge-critical text-[10px]">🔴 CRITICAL</span>
                  )}
                </div>
                <span className="badge badge-verified text-[10px]">
                  🟢 Verified Doctor Record
                </span>
              </div>

              <p className="text-xs text-[#B91C1C] font-semibold mb-2">
                Reaction: {alg.reaction}
              </p>

              <div className="text-[11px] text-[#38523C] bg-white p-2.5 rounded-lg border border-[#E0F2E1]">
                <p><strong>Verified by:</strong> {alg.verifiedBy}</p>
                <p><strong>Verification Date:</strong> {alg.verifiedDate}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Patient Reported / Pending Verification Section */}
      {pendingAllergies.length > 0 && (
        <div className="space-y-3 pt-4 border-t border-[#C8E6C9]">
          <h3 className="text-sm font-bold text-[#B45309] uppercase tracking-wider flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#B45309]" /> Patient-Reported (Pending Doctor Verification) ({pendingAllergies.length})
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingAllergies.map((alg) => (
              <div
                key={alg.id}
                className="p-5 rounded-xl bg-[#FEF3C7] border-2 border-[#FDE68A] shadow-sm"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-base text-[#78350F]">{alg.allergen}</h4>
                  <span className="badge badge-pending text-[10px]">
                    🟡 Pending Verification
                  </span>
                </div>

                <p className="text-xs text-[#92400E] mb-3">
                  <strong>Reported Symptoms:</strong> {alg.reaction}
                </p>

                <div className="text-[11px] text-[#78350F] bg-white/80 p-2.5 rounded-lg border border-[#FDE68A]">
                  <p><strong>Status Note:</strong> Visible to doctor during OPD consultation for confirmation.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
