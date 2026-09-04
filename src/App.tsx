import React from 'react';
import { HealthRecordProvider, useHealthRecord } from './context/HealthRecordContext.tsx';
import { Header } from './components/common/Header.tsx';
import { NotificationBanner } from './components/common/NotificationBanner.tsx';
import { LandingPage } from './components/public/LandingPage.tsx';
import { CitizenPortal } from './components/citizen/CitizenPortal.tsx';
import { DoctorPortal } from './components/doctor/DoctorPortal.tsx';
import { KioskPortal } from './components/kiosk/KioskPortal.tsx';
import { OperatorPortal } from './components/operator/OperatorPortal.tsx';
import { AdminPortal } from './components/admin/AdminPortal.tsx';

const MainRouter: React.FC = () => {
  const { role } = useHealthRecord();

  return (
    <div className="min-h-screen flex flex-col bg-[#E8F5E9]">
      <Header />
      <main className="flex-1">
        {role === 'public' && <LandingPage />}
        {role === 'citizen' && <CitizenPortal />}
        {role === 'doctor' && <DoctorPortal />}
        {role === 'kiosk' && <KioskPortal />}
        {role === 'operator' && <OperatorPortal />}
        {role === 'admin' && <AdminPortal />}
      </main>
      <NotificationBanner />
    </div>
  );
};

export function App() {
  return (
    <HealthRecordProvider>
      <MainRouter />
    </HealthRecordProvider>
  );
}

export default App;
