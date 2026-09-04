import React from 'react';
import { useHealthRecord } from '../../context/HealthRecordContext';
import { ShieldCheck, Eye, Lock, Building2 } from 'lucide-react';

export const ConsentAccessView: React.FC = () => {
  const { patient } = useHealthRecord();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-[#C8E6C9]">
        <div>
          <h2 className="text-2xl font-bold text-[#1B5E20] font-display flex items-center gap-2">
            <Lock className="w-6 h-6 text-[#1B5E20]" /> Consent & Access History Audit Logs
          </h2>
          <p className="text-xs text-[#38523C] mt-1">
            Complete transparency. Every government doctor and hospital facility accessing your records is logged.
          </p>
        </div>
        <span className="badge badge-verified text-xs px-3 py-1.5">
          🔒 ABHA Privacy Protected
        </span>
      </div>

      {/* Access Logs Table / Cards */}
      <div className="bg-white rounded-2xl p-6 border border-[#C8E6C9]">
        <h3 className="text-base font-bold text-[#1B5E20] mb-4 flex items-center gap-2">
          <Eye className="w-5 h-5 text-[#66BB6A]" /> Record Inspection History
        </h3>

        <div className="space-y-4">
          {patient.consentLogs.map((log) => (
            <div
              key={log.id}
              className="p-4 rounded-xl bg-[#E8F5E9] border border-[#C8E6C9] flex flex-col md:flex-row justify-between items-start md:items-center gap-3 hover:border-[#66BB6A] transition-all"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-[#122415]">{log.doctorName}</h4>
                  <span className="bg-[#1B5E20] text-white text-[9px] font-extrabold px-2 py-0.5 rounded">
                    {log.facilityType}
                  </span>
                </div>
                <p className="text-xs text-[#38523C] flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-[#1B5E20]" /> {log.facility}
                </p>
                <div className="flex flex-wrap gap-1 pt-1">
                  <span className="text-[10px] text-gray-500 font-semibold mr-1">Viewed Sections:</span>
                  {log.sectionsViewed.map((sec) => (
                    <span key={sec} className="bg-white text-[#1B5E20] text-[10px] px-2 py-0.5 rounded font-medium border border-[#A5D6A7]">
                      {sec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-xs font-bold text-[#1B5E20] block">{log.viewedDate}</span>
                <span className="text-[10px] text-[#2E7D32] font-semibold">Consent Verified</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
