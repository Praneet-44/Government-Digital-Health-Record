import React from 'react';
import { useHealthRecord } from '../../context/HealthRecordContext.tsx';
import { CheckCircle2 } from 'lucide-react';

export const NotificationBanner: React.FC = () => {
  const { notification, setNotification } = useHealthRecord();

  if (!notification) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in max-w-md">
      <div className="bg-[#122415] text-white p-4 rounded-xl shadow-2xl border-2 border-[#66BB6A] flex items-start gap-3">
        <CheckCircle2 className="w-5 h-5 text-[#66BB6A] shrink-0 mt-0.5" />
        <div className="flex-1 text-sm font-medium leading-snug">
          {notification}
        </div>
        <button
          onClick={() => setNotification(null)}
          className="text-gray-400 hover:text-white text-xs font-bold px-1"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
