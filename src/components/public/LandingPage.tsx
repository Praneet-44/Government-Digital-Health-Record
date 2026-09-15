import React from 'react';
import { useHealthRecord } from '../../context/HealthRecordContext.tsx';
import type { UserRole } from '../../types/health.ts';
import { ShieldCheck, Stethoscope, User, Monitor, UserPlus, Building2, ArrowRight } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setRole, t } = useHealthRecord();

  const portalCards: { role: UserRole; title: string; desc: string; icon: React.ReactNode; badge: string; btnText: string; color: string }[] = [
    {
      role: 'citizen',
      title: t('citizenCardTitle'),
      desc: t('citizenCardDesc'),
      icon: <User className="w-7 h-7 text-[#1B5E20]" />,
      badge: 'ABHA & OTP Login',
      btnText: t('enterCitizenPortal'),
      color: 'from-[#E8F5E9] to-[#D4EDD6]'
    },
    {
      role: 'doctor',
      title: t('doctorCardTitle'),
      desc: t('doctorCardDesc'),
      icon: <Stethoscope className="w-7 h-7 text-[#1B5E20]" />,
      badge: 'Authorized Medical Staff',
      btnText: t('openDoctorWorkspace'),
      color: 'from-[#E8F5E9] to-[#C8E6C9]'
    },
    {
      role: 'kiosk',
      title: t('kioskCardTitle'),
      desc: t('kioskCardDesc'),
      icon: <Monitor className="w-7 h-7 text-[#1B5E20]" />,
      badge: 'Touch & Voice Kiosk',
      btnText: t('launchKioskMode'),
      color: 'from-[#E8F5E9] to-[#D4EDD6]'
    },
    {
      role: 'operator',
      title: t('operatorCardTitle'),
      desc: t('operatorCardDesc'),
      icon: <UserPlus className="w-7 h-7 text-[#1B5E20]" />,
      badge: 'Hospital Counter',
      btnText: t('accessRegistration'),
      color: 'from-[#E8F5E9] to-[#C8E6C9]'
    },
    {
      role: 'admin',
      title: t('adminCardTitle'),
      desc: t('adminCardDesc'),
      icon: <Building2 className="w-7 h-7 text-[#1B5E20]" />,
      badge: 'Ministry Admin',
      btnText: t('viewAdminDashboard'),
      color: 'from-[#E8F5E9] to-[#D4EDD6]'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F4F9F5]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#0B2E0E] via-[#103D14] to-[#154D1B] text-white py-20 px-4 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#66BB6A]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto text-center max-w-4xl relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#1B5E20] text-white text-xs font-bold px-4 py-2 rounded-full mb-8 border border-[#4CAF50] shadow-md">
            <ShieldCheck className="w-4 h-4 text-white" />
            <span className="text-white">{t('govNetwork')}</span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-6 text-white leading-tight font-display drop-shadow-lg">
            {t('heroTitle')}
          </h1>

          {/* Tagline */}
          <p className="text-xl sm:text-2xl text-white font-semibold mb-6 tracking-wide drop-shadow-sm">
            {t('heroTagline')}
          </p>

          {/* Description */}
          <p className="text-sm sm:text-base text-white max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            {t('heroDesc')}
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setRole('citizen')}
              className="bg-[#66BB6A] text-[#0A260C] font-black text-base px-8 py-4 rounded-2xl shadow-xl hover:bg-[#52ab56] hover:scale-[1.03] transition-all flex items-center gap-2"
            >
              {t('accessCitizenRecord')} <ArrowRight className="w-5 h-5 stroke-[3]" />
            </button>

            <button
              onClick={() => setRole('doctor')}
              className="bg-[#0A260C] text-white font-bold text-base px-8 py-4 rounded-2xl border-2 border-white hover:bg-[#1B5E20] hover:scale-[1.03] transition-all flex items-center gap-2 shadow-lg"
            >
              {t('doctorClinicalLogin')} <Stethoscope className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </section>

      {/* Role Selection Portal Launcher */}
      <section className="py-16 px-4 container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-extrabold text-[#1B5E20] uppercase tracking-widest bg-[#E8F5E9] px-4 py-1.5 rounded-full border border-[#A5D6A7]">
            {t('multiStakeholder')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B5E20] mt-3 font-display">
            {t('selectRole')}
          </h2>
          <p className="text-sm text-[#38523C] mt-2">
            {t('roleSubText')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {portalCards.map((p) => (
            <div
              key={p.role}
              className="bg-white rounded-3xl p-6 border-2 border-[#C8E6C9] shadow-sm hover:shadow-2xl hover:border-[#1B5E20] transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3.5 rounded-2xl bg-[#E8F5E9] border border-[#C8E6C9] group-hover:bg-[#1B5E20] transition-colors">
                    {React.cloneElement(p.icon as React.ReactElement, { className: 'w-7 h-7 text-[#1B5E20] group-hover:text-white transition-colors' })}
                  </div>
                  <span className="text-[11px] font-extrabold bg-[#E8F5E9] text-[#1B5E20] px-3 py-1 rounded-full border border-[#A5D6A7]">
                    {p.badge}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-[#122415] mb-2 font-display">{p.title}</h3>
                <p className="text-xs text-[#38523C] leading-relaxed mb-6 font-normal">{p.desc}</p>
              </div>

              <button
                onClick={() => setRole(p.role)}
                className="w-full bg-[#1B5E20] text-white hover:bg-[#144517] font-bold py-3 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow"
              >
                {p.btnText} <ArrowRight className="w-4 h-4 text-[#66BB6A]" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Medical Safety Architecture Protocol */}
      <section className="bg-white py-16 px-4 border-t-2 border-b-2 border-[#C8E6C9]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#1B5E20] bg-[#E8F5E9] px-4 py-1.5 rounded-full border border-[#A5D6A7]">
              {t('safetySubtitle')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B5E20] mt-3 font-display">
              {t('safetyTitle')}
            </h2>
            <p className="text-sm text-[#38523C] max-w-2xl mx-auto mt-2">
              MediKiosk enforces a clear visual hierarchy to ensure unverified patient inputs never compromise clinical treatment safety.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-[#FEF3C7] border-2 border-[#FDE68A] shadow-sm">
              <div className="flex items-center gap-2 text-[#B45309] font-extrabold text-base mb-2">
                <span className="text-xl">🟡</span> {t('patientReportedTitle')}
              </div>
              <p className="text-xs text-[#78350F] leading-relaxed">
                {t('patientReportedDesc')}
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#EFF6FF] border-2 border-[#BFDBFE] shadow-sm">
              <div className="flex items-center gap-2 text-[#1D4ED8] font-extrabold text-base mb-2">
                <span className="text-xl">🔵</span> {t('ocrTitle')}
              </div>
              <p className="text-xs text-[#1E40AF] leading-relaxed">
                {t('ocrDesc')}
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#E8F5E9] border-2 border-[#A5D6A7] shadow-sm">
              <div className="flex items-center gap-2 text-[#1B5E20] font-extrabold text-base mb-2">
                <span className="text-xl">🟢</span> {t('verifiedTitle')}
              </div>
              <p className="text-xs text-[#144517] leading-relaxed">
                {t('verifiedDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-[#071F09] text-[#A5D6A7] py-10 text-xs text-center border-t-2 border-[#1E5723]">
        <div className="container mx-auto px-4 space-y-2">
          <p className="font-bold text-white text-sm">Government Digital Health Record & AI Clinical Intake Platform (MediKiosk)</p>
          <p className="text-white font-medium">© 2026 Ministry of Health & Family Welfare • Government Healthcare Digital Infrastructure</p>
        </div>
      </footer>
    </div>
  );
};
