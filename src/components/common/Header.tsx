import React from 'react';
import { useHealthRecord } from '../../context/HealthRecordContext.tsx';
import type { UserRole } from '../../types/health.ts';
import { ShieldCheck, Stethoscope, User, Monitor, UserPlus, Building2, Globe, HeartPulse } from 'lucide-react';

export const Header: React.FC = () => {
  const { role, setRole, language, setLanguage, patient, t } = useHealthRecord();

  const roles: { key: UserRole; label: string; icon: React.ReactNode }[] = [
    { key: 'public', label: t('publicHome'), icon: <HeartPulse className="w-4 h-4" /> },
    { key: 'citizen', label: t('citizenPortal'), icon: <User className="w-4 h-4" /> },
    { key: 'doctor', label: t('doctorPortal'), icon: <Stethoscope className="w-4 h-4" /> },
    { key: 'kiosk', label: t('healthKiosk'), icon: <Monitor className="w-4 h-4" /> },
    { key: 'operator', label: t('registration'), icon: <UserPlus className="w-4 h-4" /> },
    { key: 'admin', label: t('govtAdmin'), icon: <Building2 className="w-4 h-4" /> }
  ];

  return (
    <header className="bg-[#0F3812] text-white shadow-xl sticky top-0 z-50 border-b border-[#27702C]">
      {/* Top Bar */}
      <div className="bg-[#0A260C] px-4 py-1.5 text-xs text-[#E8F5E9] flex justify-between items-center border-b border-[#1F5422]">
        <div className="flex items-center gap-2 font-medium">
          <ShieldCheck className="w-4 h-4 text-[#66BB6A]" />
          <span>{t('govNetwork')}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden md:inline text-[#D0EBD2]">{t('facility')}</span>
          <div className="flex items-center gap-1.5 bg-[#1B5E20] px-2.5 py-0.5 rounded-lg text-white font-bold border border-[#388E3C]">
            <Globe className="w-3.5 h-3.5 text-[#66BB6A]" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent text-xs text-white font-bold border-none focus:outline-none cursor-pointer"
            >
              <option value="English" className="text-gray-900">English</option>
              <option value="Hindi" className="text-gray-900">हिंदी (Hindi)</option>
              <option value="Tamil" className="text-gray-900">தமிழ் (Tamil)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Brand Title */}
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setRole('public')}>
          <div className="w-10 h-10 rounded-xl bg-[#66BB6A] text-[#0F3812] flex items-center justify-center font-black text-xl shadow-lg group-hover:scale-105 transition-all">
            ➕
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-white tracking-tight font-display">MediKiosk</h1>
              <span className="bg-[#66BB6A] text-[#0F3812] text-[10px] font-black px-2 py-0.5 rounded-md tracking-wider uppercase shadow-sm">
                {t('govtDigitalHealth')}
              </span>
            </div>
            <p className="text-xs text-[#D0EBD2] font-medium">{t('subHeaderTag')}</p>
          </div>
        </div>

        {/* Role Switcher Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <span className="text-xs font-bold text-[#66BB6A] mr-1 hidden lg:inline uppercase tracking-widest">
            {t('switchView')}
          </span>
          {roles.map((r) => {
            const isActive = role === r.key;
            return (
              <button
                key={r.key}
                onClick={() => setRole(r.key)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#66BB6A] text-[#0F3812] shadow-md scale-[1.03]'
                    : 'bg-[#1B5E20] text-white hover:bg-[#27702C] border border-[#27702C]'
                }`}
              >
                {r.icon}
                {r.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Patient Indicator Sub-Bar */}
      {role !== 'public' && role !== 'admin' && (
        <div className="bg-[#144517] px-4 py-2 border-t border-[#27702C] text-xs text-white flex flex-wrap justify-between items-center gap-2 font-medium">
          <div className="flex items-center gap-3">
            <span className="font-bold text-white text-sm">{t('activePatient')}: {patient.fullName}</span>
            <span className="bg-[#0F3812] px-2.5 py-0.5 rounded-md text-[#66BB6A] font-mono font-bold border border-[#27702C]">
              ABHA: {patient.abhaId}
            </span>
            <span className="bg-[#0F3812] px-2.5 py-0.5 rounded-md text-white font-mono font-bold border border-[#27702C]">
              ID: {patient.permanentId}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span>{t('bloodGroup')}: <strong className="text-[#66BB6A] font-bold">{patient.bloodGroup}</strong></span>
            <span className="bg-[#B91C1C] text-white text-[10px] font-black px-2 py-0.5 rounded uppercase">
              {t('criticalFlag')}
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
