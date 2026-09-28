export type WeatherCondition = 'heatwave' | 'monsoon' | 'coldwave';

export type DeliveryChannel = 'email' | 'sms' | 'portal';

export interface WeatherAlertBroadcast {
  condition: WeatherCondition;
  issuedAt: string;
  channels: DeliveryChannel[];
  hospitalId?: string;
  hospitalName?: string;
  recipientCount?: number;
}

export interface WeatherAdvisory {
  condition: WeatherCondition;
  label: string;
  emoji: string;
  temperature: string;
  severity: 'high' | 'medium';
  bannerBg: string;
  bannerBorder: string;
  bannerText: string;
  subject: string;
  message: string;
  risks: string[];
  actions: string[];
}

export const WEATHER_ADVISORIES: Record<WeatherCondition, WeatherAdvisory> = {
  heatwave: {
    condition: 'heatwave',
    label: 'Sunny / Extreme Heat Wave',
    emoji: '☀️',
    temperature: '> 38°C / > 100°F',
    severity: 'high',
    bannerBg: 'linear-gradient(90deg, #FFEDD5, #FED7AA)',
    bannerBorder: '#FB923C',
    bannerText: '#9A3412',
    subject: '☀️ Heat Warning & Hydration Alert – Action Required',
    message:
      'Hydration reminders — drink at least 3–4 liters of water/electrolytes daily, wear lightweight cotton clothing, and avoid direct sun exposure between 12 PM – 4 PM.',
    risks: ['Dehydration', 'Heat stroke', 'Hyperthermia', 'Sunburn / sun spots'],
    actions: [
      'Drink 3–4 litres of water / ORS electrolytes daily',
      'Wear lightweight cotton clothes & a cap',
      'Avoid direct sunlight between 12 PM – 4 PM',
      'Dress children & elderly with extra care; keep cool rooms ventilated'
    ]
  },
  monsoon: {
    condition: 'monsoon',
    label: 'Rainy / Monsoon / High Humidity',
    emoji: '🌧️',
    temperature: 'Humid • Rain Period',
    severity: 'high',
    bannerBg: 'linear-gradient(90deg, #E0F2FE, #BAE6FD)',
    bannerBorder: '#38BDF8',
    bannerText: '#075985',
    subject: '🌧️ Monsoon Health Alert – Disease Prevention Advisory',
    message:
      'Prevent stagnant water build-up around homes (mosquito breeding control), drink boiled/filtered water, and watch for early fever or dengue symptoms.',
    risks: ['Dengue', 'Malaria', 'Typhoid', 'Waterborne illnesses'],
    actions: [
      'Do not allow stagnant water build-up — mosquito breeding control',
      'Drink only boiled / filtered water',
      'Watch for early fever, body ache or dengue symptoms',
      'Use mosquito nets & repellents, especially at dawn and dusk'
    ]
  },
  coldwave: {
    condition: 'coldwave',
    label: 'Cold Wave / Low Temperature',
    emoji: '❄️',
    temperature: '< 12°C / < 53°F',
    severity: 'medium',
    bannerBg: 'linear-gradient(90deg, #E0F2FE, #C7DBFC)',
    bannerBorder: '#818CF8',
    bannerText: '#3730A3',
    subject: '❄️ Cold Wave Health Advisory – Respiratory & Warmth Guidelines',
    message:
      'Wear layered warm clothing, keep room ventilation safe, and follow special warmth & care guidelines for elderly and children.',
    risks: ['Hypothermia', 'Seasonal flu', 'Viral infection', 'Respiratory strain'],
    actions: [
      'Wear layered warm clothing & cover extremities',
      'Maintain safe room ventilation — avoid unventilated heaters',
      'Special warmth & nutrition guidelines for elderly and children',
      'Seek care early for fever, cough or breathing difficulty'
    ]
  }
};

export const WEATHER_CONDITION_LIST: WeatherCondition[] = ['heatwave', 'monsoon', 'coldwave'];

export function getWeatherAdvisory(condition: WeatherCondition): WeatherAdvisory {
  return WEATHER_ADVISORIES[condition];
}

export const DELIVERY_CHANNEL_LABELS: Record<DeliveryChannel, string> = {
  email: 'Email Service (NodeMailer / SendGrid / AWS SES)',
  sms: 'SMS / Push Alert (Twilio / Govt SMS Gateway)',
  portal: 'In-Portal Notification Banner'
};