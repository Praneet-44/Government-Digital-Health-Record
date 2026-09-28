import React, { useEffect, useRef, useState } from 'react';
import { useHealthRecord } from '../../context/HealthRecordContext.tsx';
import {
  WEATHER_ADVISORIES,
  WEATHER_CONDITION_LIST,
  DELIVERY_CHANNEL_LABELS
} from '../../utils/weather.ts';
import type { WeatherCondition, DeliveryChannel } from '../../utils/weather.ts';
import { createMockDeliveryLogs, scheduleMockDelivery } from '../../services/alertDeliveryService.ts';
import type { MockDeliveryLog } from '../../services/alertDeliveryService.ts';
import { Sun, CloudRain, Snowflake, Mail, MessageSquareText, BellRing, Send, CheckCircle2, Thermometer, X, Users, Smartphone, Inbox, Clock3 } from 'lucide-react';

const CONDITION_META: Record<WeatherCondition, { icon: React.ReactNode; activeClass: string }> = {
  heatwave: { icon: <Sun className="w-5 h-5" />, activeClass: 'border-[#EA580C] bg-[#FFEDD5] text-[#9A3412]' },
  monsoon: { icon: <CloudRain className="w-5 h-5" />, activeClass: 'border-[#0284C7] bg-[#E0F2FE] text-[#075985]' },
  coldwave: { icon: <Snowflake className="w-5 h-5" />, activeClass: 'border-[#6366F1] bg-[#E0E7FF] text-[#3730A3]' }
};

export const WeatherAlertSystem: React.FC<{ hospitalId: string; hospitalName: string }> = ({ hospitalId, hospitalName }) => {
  const { allPatients, weatherAlert, issueWeatherAlert, clearWeatherAlert } = useHealthRecord();

  const recipientCount = allPatients.filter(p => p.registeredHospitalId === hospitalId).length;

  const [condition, setCondition] = useState<WeatherCondition>('monsoon');
  const [channels, setChannels] = useState<{ email: boolean; sms: boolean; portal: boolean }>({
    email: true,
    sms: true,
    portal: true
  });
  const [history, setHistory] = useState<{ condition: WeatherCondition; issuedAt: string; channels: DeliveryChannel[]; hospitalName: string; recipientCount: number }[]>([]);
  const [deliveryLogs, setDeliveryLogs] = useState<MockDeliveryLog[]>([]);
  const deliveryCleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    return () => {
      deliveryCleanupRef.current?.();
    };
  }, []);

  const advisory = WEATHER_ADVISORIES[condition];

  const selectedChannels: DeliveryChannel[] = (
    ['email', 'sms', 'portal'] as DeliveryChannel[]
  ).filter(c => channels[c]);

  const applyDeliveryUpdate = (updated: MockDeliveryLog[], _status: unknown, _log: MockDeliveryLog) => {
    setDeliveryLogs(prev => {
      const ids = new Set(updated.map(u => u.id));
      return [...prev.filter(p => !ids.has(p.id)), ...updated];
    });
  };

  const handleSend = () => {
    issueWeatherAlert(condition, selectedChannels, hospitalId, hospitalName);
    setHistory(prev => [
      { condition, issuedAt: new Date().toISOString(), channels: selectedChannels, hospitalName, recipientCount },
      ...prev
    ].slice(0, 10));

    const patients = allPatients.filter(p => p.registeredHospitalId === hospitalId);
    if (selectedChannels.some(c => c === 'email' || c === 'sms')) {
      const fresh = createMockDeliveryLogs(patients, selectedChannels, advisory);
      setDeliveryLogs(prev => [...fresh, ...prev]);
      deliveryCleanupRef.current?.();
      deliveryCleanupRef.current = scheduleMockDelivery(fresh, applyDeliveryUpdate);
    }
  };

  const emailLogs = deliveryLogs.filter(l => l.channel === 'email');
  const smsLogs = deliveryLogs.filter(l => l.channel === 'sms');
  const deliverySummary = deliveryLogs.reduce(
    (acc, l) => {
      acc.total += 1;
      if (l.status === 'delivered') acc.delivered += 1;
      if (l.status === 'sending') acc.sending += 1;
      if (l.status === 'queued') acc.queued += 1;
      return acc;
    },
    { total: 0, delivered: 0, sending: 0, queued: 0 }
  );

  return (
    <div className="bg-white rounded-2xl border border-[#99F6E4] shadow-sm space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-[#0F766E] font-display flex items-center gap-2">
            <Thermometer className="w-5 h-5 text-[#2DD4BF]" /> Automated Weather & Preventive Health Alert System
          </h3>
          <p className="text-xs text-[#38523C] mt-0.5">
            Detect weather conditions and broadcast automated preventive health advisories to citizens
          </p>
        </div>
        {weatherAlert && (
          <button
            onClick={clearWeatherAlert}
            className="text-[10px] font-bold bg-[#FEE2E2] text-[#B91C1C] px-3 py-1.5 rounded-full border border-[#FCA5A5] flex items-center gap-1 w-fit"
          >
            <X className="w-3 h-3" /> Stop Active Broadcast
          </button>
        )}
      </div>

      {/* Step 1: Condition trigger */}
      <div>
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0F766E]">
          Step 1 — Observed Weather Condition
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
          {WEATHER_CONDITION_LIST.map((c) => {
            const a = WEATHER_ADVISORIES[c];
            const active = condition === c;
            return (
              <button
                key={c}
                onClick={() => setCondition(c)}
                className={`rounded-xl border-2 p-3.5 text-left transition-all ${
                  active ? CONDITION_META[c].activeClass : 'border-[#E2E8F0] bg-white hover:border-[#2DD4BF] text-[#38523C]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-extrabold text-sm">
                    <span className="text-lg">{a.emoji}</span> {a.label}
                  </div>
                  {CONDITION_META[c].icon}
                </div>
                <div className="text-[11px] font-mono mt-1 opacity-80">{a.temperature} • {a.severity === 'high' ? 'High Alert' : 'Advisory'}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: Advisory payload preview */}
      <div className="p-4 rounded-xl border-2 border-dashed" style={{ background: advisory.bannerBg, borderColor: advisory.bannerBorder }}>
        <span className="text-[10px] font-extrabold uppercase tracking-widest" style={{ color: advisory.bannerText }}>
          Automated Alert Payload Preview
        </span>
        <div className="text-sm font-extrabold mt-1.5" style={{ color: advisory.bannerText }}>
          Subject: {advisory.subject}
        </div>
        <p className="text-xs mt-1 font-medium" style={{ color: advisory.bannerText }}>
          {advisory.message}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
          <div className="bg-white/70 rounded-lg p-3 border border-white">
            <span className="text-[10px] font-extrabold uppercase text-[#B91C1C]">Health Risks</span>
            <ul className="text-[11px] mt-1 space-y-0.5 text-[#122415]">
              {advisory.risks.map(r => <li key={r}>• {r}</li>)}
            </ul>
          </div>
          <div className="bg-white/70 rounded-lg p-3 border border-white">
            <span className="text-[10px] font-extrabold uppercase text-[#1B5E20]">Prevention Advisories</span>
            <ul className="text-[11px] mt-1 space-y-0.5 text-[#122415]">
              {advisory.actions.map(a => <li key={a}>• {a}</li>)}
            </ul>
          </div>
        </div>
      </div>

      {/* Step 3: Delivery channels */}
      <div>
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0F766E]">
          Step 2 — Notification Delivery Channels
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
          {(
            [
              { key: 'email' as const, icon: <Mail className="w-4 h-4" /> },
              { key: 'sms' as const, icon: <MessageSquareText className="w-4 h-4" /> },
              { key: 'portal' as const, icon: <BellRing className="w-4 h-4" /> }
            ]
          ).map(({ key, icon }) => (
            <label
              key={key}
              className={`flex items-start gap-2.5 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                channels[key] ? 'border-[#0F766E] bg-[#F0FDFA]' : 'border-[#E2E8F0] bg-white'
              }`}
            >
              <input
                type="checkbox"
                checked={channels[key]}
                onChange={(e) => setChannels(prev => ({ ...prev, [key]: e.target.checked }))}
                className="mt-0.5 accent-[#0F766E]"
              />
              <div>
                <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#122415]">{icon} {key === 'email' ? 'Email Service' : key === 'sms' ? 'SMS / Push Alert' : 'In-Portal Banner'}</div>
                <div className="text-[10px] text-gray-500 mt-0.5">{DELIVERY_CHANNEL_LABELS[key]}</div>
              </div>
            </label>
          ))}
        </div>
        {!selectedChannels.length && (
          <p className="text-[10px] text-[#B91C1C] font-bold mt-1.5">Select at least one delivery channel.</p>
        )}
      </div>

      {/* Send to all patients registered at this hospital */}
      <div className="p-4 rounded-xl bg-[#F0FDFA] border-2 border-[#0F766E] space-y-2">
        <div className="flex items-center gap-2 text-xs font-extrabold text-[#0F766E]">
          <Users className="w-4 h-4" /> Recipients — all patients registered at {hospitalName}
        </div>
        <p className="text-[11px] text-[#38523C]">
          This alert will be delivered to{' '}
          <strong className="text-[#0F766E] text-sm">{recipientCount} registered patient{recipientCount === 1 ? '' : 's'}</strong>{' '}
          whose permanent health profile is issued at {hospitalName}. Delivery = {selectedChannels.length
            ? selectedChannels.map(c => DELIVERY_CHANNEL_LABELS[c]).join(' + ')
            : 'no channel selected'}.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center pt-1">
          <button
            onClick={handleSend}
            disabled={!selectedChannels.length || recipientCount === 0}
            className="btn bg-[#0F766E] text-white hover:bg-[#0D9488] text-xs px-6 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" /> Broadcast {advisory.emoji} Alert to {recipientCount} Patient{recipientCount === 1 ? '' : 's'}
          </button>
          {weatherAlert && (
            <button
              onClick={clearWeatherAlert}
              className="text-[11px] font-bold text-[#B91C1C] hover:underline"
            >
              Stop active broadcast
            </button>
          )}
        </div>
        {recipientCount === 0 && (
          <p className="text-[10px] text-[#B91C1C] font-bold">
            No patients registered at this facility yet — register citizens via the Operator portal first.
          </p>
        )}
        {weatherAlert && (
          <div className="flex items-center gap-1.5 text-[11px] text-[#0F766E] font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse inline-block" />
            Live: {WEATHER_ADVISORIES[weatherAlert.condition].label} sent to {weatherAlert.recipientCount ?? 0} patient
            {(weatherAlert.recipientCount ?? 0) === 1 ? '' : 's'} at {weatherAlert.hospitalName ?? '—'}
            {weatherAlert.channels.length ? ` via ${weatherAlert.channels.join(', ')}` : ''}
          </div>
        )}
      </div>

      {/* Broadcast history */}
      {(history.length > 0 || weatherAlert) && (
        <div className="border-t border-[#E2E8F0] pt-3 space-y-2">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0F766E]">Recently Broadcast Alerts</span>
          {(
            weatherAlert
              ? [
                {
                  condition: weatherAlert.condition,
                  issuedAt: weatherAlert.issuedAt,
                  channels: weatherAlert.channels,
                  hospitalName: weatherAlert.hospitalName ?? hospitalName,
                  recipientCount: weatherAlert.recipientCount ?? 0
                },
                ...history.filter(h => h.issuedAt !== weatherAlert.issuedAt)
              ]
              : history
          )
            .slice(0, 5)
            .map((log, i) => (
              <div key={`${log.issuedAt}-${i}`} className="flex items-center gap-3 p-3 rounded-xl bg-[#F0FDFA] border border-[#99F6E4]">
                <CheckCircle2 className="w-4 h-4 text-[#0F766E] shrink-0" />
                <div className="flex-1 min-w-0 text-xs">
                  <span className="font-extrabold text-[#122415]">{WEATHER_ADVISORIES[log.condition].emoji} {WEATHER_ADVISORIES[log.condition].label}</span>
                  <span className="text-gray-500"> • {log.hospitalName} • {log.recipientCount} patient{log.recipientCount === 1 ? '' : 's'} notified ({log.channels.join(', ')})</span>
                </div>
                <span className="text-[10px] font-mono text-gray-400 whitespace-nowrap">{new Date(log.issuedAt).toLocaleTimeString()}</span>
              </div>
            ))}
        </div>
      )}
    {/* Simulated Email / SMS Delivery Logs */}
      {deliveryLogs.length > 0 && (
        <div className="border-t border-[#E2E8F0] pt-3 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0F766E]">
              Mock Email / SMS Gateway Delivery Logs
            </span>
            <div className="flex items-center gap-2 text-[10px] font-bold">
              <span className="px-2 py-0.5 rounded-full bg-[#F0FDFA] border border-[#99F6E4] text-[#0F766E]">Total {deliverySummary.total}</span>
              <span className="px-2 py-0.5 rounded-full bg-[#ECFDF5] border border-[#6EE7B7] text-[#047857]">Delivered {deliverySummary.delivered}</span>
              {deliverySummary.sending > 0 && <span className="px-2 py-0.5 rounded-full bg-[#FFFBEB] border border-[#FCD34D] text-[#B45309]">Sending {deliverySummary.sending}</span>}
              {deliverySummary.queued > 0 && <span className="px-2 py-0.5 rounded-full bg-gray-100 border border-gray-300 text-gray-500">Queued {deliverySummary.queued}</span>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {emailLogs.length > 0 && (
              <div className="space-y-1.5">
                <div className="text-[10px] font-black uppercase tracking-wider text-[#B45309] flex items-center gap-1.5">
                  <Inbox className="w-3.5 h-3.5" /> Email Queue ({emailLogs.length})
                </div>
                {emailLogs.map(log => (
                  <div key={log.id} className="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#FFF7ED] border border-[#FDBA74]">
                    <Inbox className="w-4 h-4 text-[#EA580C] shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] font-extrabold text-[#122415] truncate">{log.patientName}</div>
                      <div className="text-[10px] text-gray-500 truncate">to {log.email} • {log.gateway}</div>
                    </div>
                    <DeliveryStatusChip status={log.status} />
                  </div>
                ))}
              </div>
            )}

            {smsLogs.length > 0 && (
              <div className="space-y-1.5">
                <div className="text-[10px] font-black uppercase tracking-wider text-[#075985] flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5" /> SMS Queue ({smsLogs.length})
                </div>
                {smsLogs.map(log => (
                  <div key={log.id} className="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#E0F2FE] border border-[#7DD3FC]">
                    <Smartphone className="w-4 h-4 text-[#0284C7] shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] font-extrabold text-[#122415] truncate">{log.patientName}</div>
                      <div className="text-[10px] text-gray-500 truncate">to {log.mobile} • {log.gateway}</div>
                    </div>
                    <DeliveryStatusChip status={log.status} />
                  </div>
                ))}
              </div>
            )}
          </div>

          <p className="text-[10px] text-gray-400 font-semibold flex items-center gap-1">
            <Clock3 className="w-3 h-3" /> Simulated gateway timeline from each patient's registered profile — demo delivery, not a live email/SMS provider.
          </p>
        </div>
      )}
    </div>
  );
};

const DeliveryStatusChip: React.FC<{ status: MockDeliveryLog['status'] }> = ({ status }) => {
  if (status === 'delivered') {
    return <span className="text-[10px] font-black bg-[#D1FAE5] text-[#047857] px-2 py-0.5 rounded-full border border-[#6EE7B7]">✓ Delivered</span>;
  }
  if (status === 'sending') {
    return <span className="text-[10px] font-black bg-[#FEF3C7] text-[#B45309] px-2 py-0.5 rounded-full border border-[#FCD34D]">… Sending</span>;
  }
  return <span className="text-[10px] font-black bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full border border-gray-300">⏱ Queued</span>;
};

export default WeatherAlertSystem;