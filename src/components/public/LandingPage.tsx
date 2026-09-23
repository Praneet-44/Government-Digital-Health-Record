import React, { useState } from 'react';
import { useHealthRecord } from '../../context/HealthRecordContext.tsx';
import type { UserRole } from '../../types/health.ts';
import { ShieldCheck, Stethoscope, User, Monitor, UserPlus, Building2, ArrowRight, Sparkles, Lock, Bot } from 'lucide-react';
import { AIHistoryIntakeModal } from '../citizen/AIHistoryIntakeModal.tsx';

export const LandingPage: React.FC = () => {
  const { setRole, t } = useHealthRecord();
  const [showPublicAiModal, setShowPublicAiModal] = useState(false);

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
          <p className="text-sm sm:text-base text-white max-w-2xl mx-auto mb-8 leading-relaxed font-medium">
            {t('heroDesc')}
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <button
              onClick={() => setRole('citizen')}
              className="bg-[#66BB6A] text-[#0A260C] font-black text-base px-8 py-4 rounded-2xl shadow-xl hover:bg-[#52ab56] hover:scale-[1.03] transition-all flex items-center gap-2"
            >
              {t('accessCitizenRecord')} <ArrowRight className="w-5 h-5 stroke-[3]" />
            </button>

            <button
              onClick={() => setShowPublicAiModal(true)}
              className="bg-[#1B5E20] text-white font-black text-base px-8 py-4 rounded-2xl border-2 border-[#66BB6A] hover:bg-[#27702C] hover:scale-[1.03] transition-all flex items-center gap-2 shadow-xl"
            >
              <Sparkles className="w-5 h-5 text-[#66BB6A]" /> {t('publicAiHeroBtn')}
            </button>

            <button
              onClick={() => setRole('doctor')}
              className="bg-[#0A260C] text-white font-bold text-base px-8 py-4 rounded-2xl border-2 border-white/40 hover:bg-[#1B5E20] hover:scale-[1.03] transition-all flex items-center gap-2 shadow-lg"
            >
              {t('doctorClinicalLogin')} <Stethoscope className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Public Awareness Security Callout Banner */}
          <div className="inline-flex items-center gap-2 bg-[#061808]/80 text-[#A5D6A7] text-xs font-semibold px-5 py-2.5 rounded-full border border-[#27702C] shadow-inner">
            <Lock className="w-4 h-4 text-[#66BB6A]" />
            <span>Public AI Mode is strictly for self-awareness & informational guidance. Responses are <strong>NEVER sent to doctors</strong> or stored in medical records.</span>
          </div>
        </div>
      </section>

      {/* Public AI Health Awareness Showcase Banner */}
      <section className="bg-gradient-to-r from-[#E8F5E9] to-[#C8E6C9] py-10 px-4 border-b border-[#A5D6A7]">
        <div className="container mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-extrabold uppercase tracking-wider bg-[#1B5E20] text-white px-3 py-1 rounded-full inline-block">
              🛡️ Separate AI Public Mode
            </span>
            <h3 className="text-2xl font-extrabold text-[#1B5E20] font-display">
              {t('publicAiAwarenessTitle')}
            </h3>
            <p className="text-xs text-[#2E7D32] max-w-xl">
              {t('publicAiAwarenessDesc')} Patients can freely explore symptoms, ask health questions, and gain awareness without affecting doctor consultation queues.
            </p>
          </div>

          <button
            onClick={() => setShowPublicAiModal(true)}
            className="bg-[#1B5E20] text-white font-extrabold text-xs px-6 py-3.5 rounded-2xl hover:bg-[#144517] transition-all shadow-lg flex items-center gap-2 shrink-0"
          >
            <Bot className="w-5 h-5 text-[#66BB6A]" /> Open Public Health AI Assistant
          </button>
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
                    {React.cloneElement(p.icon as React.ReactElement<{ className?: string }>, { className: 'w-7 h-7 text-[#1B5E20] group-hover:text-white transition-colors' })}
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



      {/* Footer */}
      <footer className="bg-[#071F09] text-[#A5D6A7] py-10 text-xs text-center border-t-2 border-[#1E5723]">
        <div className="container mx-auto px-4 space-y-2">
          <p className="font-bold text-white text-sm">Government Digital Health Record & AI Clinical Intake Platform (Uyire Kavalan)</p>
          <p className="text-white font-medium">© 2026 Ministry of Health & Family Welfare • Government Healthcare Digital Infrastructure</p>
        </div>
      </footer>

      {/* Interactive Public AI Health Awareness Modal */}
      {showPublicAiModal && (
        <AIHistoryIntakeModal
          onClose={() => setShowPublicAiModal(false)}
        />
      )}
    </div>
  );
};
