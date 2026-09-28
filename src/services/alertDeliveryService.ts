import type { DeliveryChannel, WeatherAdvisory } from '../utils/weather.ts';
import type { CitizenProfile } from '../types/health.ts';

export type DeliveryLogStatus = 'queued' | 'sending' | 'delivered' | 'failed';

export interface MockDeliveryLog {
  id: string;
  patientId: string;
  patientName: string;
  mobile: string;
  email: string;
  channel: 'email' | 'sms';
  status: DeliveryLogStatus;
  subject?: string;
  body?: string;
  updatedAt: string;
  gateway?: string;
}

const EmailGateways = ['NodeMailer Relay', 'SendGrid', 'AWS SES'];
const SmsGateways = ['Twilio', 'Govt SMS Gateway', 'MSG91'];

export function mockEmailForPatient(p: CitizenProfile): string {
  const local = p.fullName.toLowerCase().replace(/[^a-z]/g, '.').replace(/\.+/g, '.').replace(/^\.|\.$/g, '');
  return `${local}@govhealth.in`;
}

export function createMockDeliveryLogs(
  patients: CitizenProfile[],
  channels: DeliveryChannel[],
  advisory: WeatherAdvisory
): MockDeliveryLog[] {
  const logs: MockDeliveryLog[] = [];
  if (channels.includes('portal')) return logs;

  for (const p of patients) {
    if (channels.includes('email')) {
      logs.push({
        id: `log-${p.permanentId}-email-${Date.now()}`,
        patientId: p.permanentId,
        patientName: p.fullName,
        mobile: p.mobile,
        email: mockEmailForPatient(p),
        channel: 'email',
        status: 'queued',
        subject: advisory.subject,
        body: advisory.message,
        updatedAt: new Date().toISOString(),
        gateway: EmailGateways[Math.floor(Math.random() * EmailGateways.length)]
      });
    }
    if (channels.includes('sms')) {
      logs.push({
        id: `log-${p.permanentId}-sms-${Date.now()}`,
        patientId: p.permanentId,
        patientName: p.fullName,
        mobile: p.mobile,
        email: mockEmailForPatient(p),
        channel: 'sms',
        status: 'queued',
        subject: `${advisory.emoji} ${advisory.label} – Govt Health Advisory`,
        body: `${advisory.subject.slice(0, 60)}… ${advisory.message.slice(0, 90)}…`,
        updatedAt: new Date().toISOString(),
        gateway: SmsGateways[Math.floor(Math.random() * SmsGateways.length)]
      });
    }
  }
  return logs;
}

export function scheduleMockDelivery(
  logs: MockDeliveryLog[],
  onLogsChange: (updated: MockDeliveryLog[], status: DeliveryLogStatus, log: MockDeliveryLog) => void
): () => void {
  const timers: ReturnType<typeof setTimeout>[] = [];

  logs.forEach((log) => {
    timers.push(
      setTimeout(() => {
        const sending: MockDeliveryLog = { ...log, status: 'sending', updatedAt: new Date().toISOString() };
        onLogsChange([sending], 'sending', sending);
      }, 500 + Math.floor(Math.random() * 500))
    );
    timers.push(
      setTimeout(() => {
        const delivered: MockDeliveryLog = { ...log, status: 'delivered', updatedAt: new Date().toISOString() };
        onLogsChange([delivered], 'delivered', delivered);
      }, 1600 + Math.floor(Math.random() * 900))
    );
  });

  return () => timers.forEach(clearTimeout);
}