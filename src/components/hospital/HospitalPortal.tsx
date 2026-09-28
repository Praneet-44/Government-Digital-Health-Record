import React, { useState } from 'react';
import { useHealthRecord } from '../../context/HealthRecordContext.tsx';
import { HOSPITALS } from '../../utils/hospitals.ts';
import { WeatherAlertSystem } from './WeatherAlertSystem.tsx';
import { Stethoscope, UserCheck, Users, Building2, Phone, Monitor } from 'lucide-react';

export const HospitalPortal: React.FC = () => {
  const { allPatients, doctorsList } = useHealthRecord();
  const [hospitalId, setHospitalId] = useState('dh-opd');

  const hospital = HOSPITALS.find(h => h.id === hospitalId) ?? HOSPITALS[0];

  const registeredPatients = allPatients.filter(p => p.registeredHospitalId === hospital.id);
  const hospitalDoctors = doctorsList.filter(d =>
    d.hospitalId ? d.hospitalId === hospital.id : d.facility === hospital.name
  );

  return (
    <div className="min-h-screen bg-[#E8F5E9] py-8">
      <div className="container mx-auto px-4 max-w-6xl space-y-6">
        {/* Hospital Header */}
        <div className="bg-gradient-to-r from-[#0F766E] to-[#0D9488] text-white rounded-2xl p-6 shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#5EEAD4] uppercase tracking-wider mb-1">
              <Building2 className="w-4 h-4 text-[#2DD4BF]" /> Hospital Portal • Ministry of Health & Family Welfare
            </div>
            <h2 className="text-2xl font-bold font-display">Hospital Portal</h2>
            <p className="text-xs text-[#CCFBF1] mt-0.5">Registered patients & doctor staff at your selected facility</p>
          </div>

          <div className="w-full sm:w-72">
            <label className="block text-[10px] font-extrabold uppercase tracking-widest text-[#5EEAD4] mb-1">
              Select Hospital / Facility
            </label>
            <select
              value={hospitalId}
              onChange={(e) => setHospitalId(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-[#0D9488] bg-white text-[#0F766E] text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#2DD4BF]"
            >
              {HOSPITALS.map(h => (
                <option key={h.id} value={h.id}>{h.name} ({h.code})</option>
              ))}
            </select>
          </div>
        </div>

        {/* Hospital identity */}
        <div className="bg-white rounded-2xl p-5 border border-[#99F6E4] shadow-sm flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex items-center gap-4 flex-1">
            <div className="w-12 h-12 rounded-xl bg-[#CCFBF1] text-[#0F766E] flex items-center justify-center shrink-0 border border-[#5EEAD4]">
              <Building2 className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <div className="font-extrabold text-[#0F766E] text-lg leading-tight">{hospital.name}</div>
              <div className="text-xs text-gray-500 mt-0.5 flex flex-wrap items-center gap-2">
                <span className="font-mono font-bold text-[#0F766E]">#{hospital.code}</span>
                <span className="bg-[#F0FDFA] text-[#0D9488] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#99F6E4]">{hospital.type}</span>
                <span>{hospital.district}</span>
              </div>
            </div>
          </div>
          <div className="text-xs text-[#0F766E] space-y-1">
            <p className="flex items-center gap-1.5 font-semibold">📍 {hospital.address}</p>
            <p className="flex items-center gap-1.5 font-semibold">
              <Phone className="w-3.5 h-3.5 text-[#14B8A6]" /> {hospital.phone}
              <span className="inline-flex items-center gap-1 ml-3">
                <Monitor className="w-3.5 h-3.5 text-[#14B8A6]" /> {hospital.kiosks} Kiosks
              </span>
            </p>
            <p className="font-mono font-extrabold text-[#0F766E]">🎟 OPD Token: {hospital.opdTokenCounter}</p>
          </div>
        </div>

        {/* Registered Patients */}
        <div className="bg-white rounded-2xl p-6 border border-[#99F6E4] shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-[#0F766E] font-display flex items-center gap-2">
                <Users className="w-5 h-5 text-[#2DD4BF]" /> Registered Patients at {hospital.name}
              </h3>
              <p className="text-xs text-[#38523C] mt-0.5">Citizens whose permanent health profile was issued at this facility</p>
            </div>
            <span className="text-[10px] font-extrabold bg-[#F0FDFA] text-[#0F766E] px-3 py-1 rounded-full border border-[#99F6E4] w-fit">
              {registeredPatients.length} Registered
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {registeredPatients.length === 0 && (
              <p className="text-xs text-gray-400 col-span-full">No citizens registered at this facility yet.</p>
            )}
            {registeredPatients.map((p) => (
              <div key={p.permanentId} className="p-4 rounded-xl bg-[#F0FDFA] border border-[#99F6E4] space-y-2">
                <div className="flex justify-between items-start gap-2">
                  <h4 className="font-extrabold text-sm text-[#122415]">{p.fullName}</h4>
                  <span className="text-[9px] font-extrabold bg-[#0F766E] text-white px-2 py-0.5 rounded uppercase whitespace-nowrap">{p.gender}</span>
                </div>
                <div className="text-xs space-y-1 text-[#38523C]">
                  <p className="font-mono font-bold text-[#0F766E]">ID: {p.permanentId}</p>
                  <p>ABHA: <span className="font-mono">{p.abhaId}</span></p>
                  <p>DOB: {p.dob} • Blood: <strong className="text-[#122415]">{p.bloodGroup}</strong></p>
                  <p>📱 {p.mobile}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Automated Weather & Preventive Health Alert System */}
        <WeatherAlertSystem hospitalId={hospital.id} hospitalName={hospital.name} />

        {/* Doctor Staff */}
        <div className="bg-white rounded-2xl p-6 border border-[#99F6E4] shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-[#0F766E] font-display flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-[#2DD4BF]" /> Doctor Staff at {hospital.name}
              </h3>
              <p className="text-xs text-[#38523C] mt-0.5">Authorized physicians assigned to this facility</p>
            </div>
            <span className="text-[10px] font-extrabold bg-[#F0FDFA] text-[#0F766E] px-3 py-1 rounded-full border border-[#99F6E4] w-fit">
              {hospitalDoctors.length} Doctors
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {hospitalDoctors.length === 0 && (
              <p className="text-xs text-gray-400 col-span-full">No doctors assigned to this facility yet. Onboard doctors from the Admin portal.</p>
            )}
            {hospitalDoctors.map((doc) => (
              <div key={doc.id} className="p-4 rounded-xl bg-[#F0FDFA] border border-[#99F6E4] space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-extrabold text-sm text-[#122415]">{doc.fullName}</h4>
                    <span className="text-[10px] font-mono font-extrabold bg-[#0F766E] text-white px-2 py-0.5 rounded">{doc.licenseNumber}</span>
                  </div>
                  <span className="text-[10px] font-bold bg-[#2DD4BF] text-[#0F342E] px-2 py-0.5 rounded-full flex items-center gap-1">
                    <UserCheck className="w-3 h-3" /> Active
                  </span>
                </div>
                <div className="text-xs space-y-1 text-[#38523C] pt-1">
                  <p><strong>Department:</strong> {doc.department}</p>
                  <p><strong>Facility:</strong> {doc.facility}</p>
                  <p className="font-mono text-[#0F766E] bg-white p-1.5 rounded border border-[#5EEAD4] font-semibold text-[11px]">
                    🔑 Username: {doc.username}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalPortal;