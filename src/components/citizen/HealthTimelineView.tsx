import React from 'react';
import { useHealthRecord } from '../../context/HealthRecordContext';
import { Calendar, Stethoscope, Activity, FileText, Building2 } from 'lucide-react';

export const HealthTimelineView: React.FC = () => {
  const { patient } = useHealthRecord();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-[#C8E6C9]">
        <div>
          <h2 className="text-2xl font-bold text-[#1B5E20] font-display flex items-center gap-2">
            <Calendar className="w-6 h-6 text-[#1B5E20]" /> Permanent Health Timeline
          </h2>
          <p className="text-xs text-[#38523C] mt-1">
            Unified chronological medical history across PHCs, District Hospitals, and Government Medical Colleges.
          </p>
        </div>
      </div>

      {/* Timeline List */}
      <div className="bg-white rounded-2xl p-6 border border-[#C8E6C9]">
        <div className="relative border-l-2 border-[#A5D6A7] ml-4 pl-6 space-y-6">
          {patient.timeline.map((item) => (
            <div key={item.id} className="relative group">
              {/* Timeline Marker Dot */}
              <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-[#1B5E20] border-2 border-white ring-4 ring-[#E8F5E9]" />

              <div className="p-4 rounded-xl bg-[#E8F5E9] border border-[#C8E6C9] hover:border-[#66BB6A] transition-all">
                <div className="flex flex-wrap justify-between items-start gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white bg-[#1B5E20] px-2.5 py-0.5 rounded-full">
                      {item.date}
                    </span>
                    <h4 className="font-bold text-sm text-[#122415]">{item.title}</h4>
                  </div>
                  {item.clinicalStatus === 'verified' && (
                    <span className="badge badge-verified text-[10px]">🟢 Verified</span>
                  )}
                </div>

                <p className="text-xs text-[#1B5E20] font-semibold flex items-center gap-1 mb-2">
                  <Building2 className="w-3.5 h-3.5" /> {item.facility} {item.doctorName ? `• ${item.doctorName}` : ''}
                </p>

                <p className="text-xs text-[#38523C] leading-relaxed bg-white p-3 rounded-lg border border-[#E0F2E1]">
                  {item.summary}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
