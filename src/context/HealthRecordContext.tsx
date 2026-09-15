import React, { createContext, useContext, useState } from 'react';
import type {
  UserRole,
  CitizenProfile,
  VerificationItem,
  Allergy,
  Medication,
  Operation,
  DocumentItem,
  TimelineEvent,
  ConsentLog
} from '../types/health.ts';

import { t as translateHelper } from '../utils/translations.ts';

interface HealthRecordContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  patient: CitizenProfile;
  allPatients: CitizenProfile[];
  verificationQueue: VerificationItem[];
  triageRedFlagsCount: number;
  reportChange: (type: 'allergy' | 'medication' | 'operation' | 'condition', title: string, details: string) => void;
  verifyItem: (id: string, approve: boolean, doctorNotes?: string) => void;
  uploadDocument: (title: string, category: any) => void;
  addDoctorNote: (type: 'medication' | 'allergy' | 'condition', name: string, detail: string) => void;
  registerNewCitizen: (name: string, mobile: string, dob: string, gender: 'Male' | 'Female' | 'Other', bloodGroup: string) => CitizenProfile;
  triggerTriageRedFlag: () => void;
  notification: string | null;
  setNotification: (msg: string | null) => void;
}

// Clean Initial Citizen Profile (Starting fresh with 1 primary profile)
const initialPatient: CitizenProfile = {
  abhaId: '91-4829-1092-4410',
  permanentId: 'GOV-IND-2026-88412',
  fullName: 'Praneet Kumar',
  dob: '15 Aug 1994',
  gender: 'Male',
  bloodGroup: 'O+',
  height: '175 cm',
  weight: '72 kg',
  mobile: '+91 98765 43210',
  address: 'H.No 42, Sector 4, Government Hospital Ward',
  emergencyContact: {
    name: 'Sunita Kumar',
    relation: 'Spouse',
    mobile: '+91 98765 43211'
  },
  allergies: [],
  medications: [],
  operations: [],
  conditions: [],
  documents: [],
  timeline: [
    {
      id: 'tl-1',
      date: 'Today',
      title: 'Permanent Health Profile Created',
      category: 'consultation',
      facility: 'Government Hospital Registration Desk',
      clinicalStatus: 'verified',
      summary: 'Citizen profile registered. Awaiting initial OPD clinical intake.'
    }
  ],
  consentLogs: [
    {
      id: 'cs-1',
      doctorName: 'Dr. R. K. Sharma (MD)',
      facility: 'District Hospital OPD',
      facilityType: 'District Hospital',
      viewedDate: 'Today',
      sectionsViewed: ['Health Profile']
    }
  ]
};

const HealthRecordContext = createContext<HealthRecordContextType | undefined>(undefined);

export const HealthRecordProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('public');
  const [language, setLanguage] = useState<string>('English');
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [patient, setPatient] = useState<CitizenProfile>(initialPatient);
  const [allPatients, setAllPatients] = useState<CitizenProfile[]>([initialPatient]);
  const [verificationQueue, setVerificationQueue] = useState<VerificationItem[]>([]);
  const [triageRedFlagsCount, setTriageRedFlagsCount] = useState<number>(0);
  const [notification, setNotification] = useState<string | null>(null);

  const triggerNotify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const triggerTriageRedFlag = () => {
    setTriageRedFlagsCount(prev => prev + 1);
    triggerNotify(`⚠️ Priority Triage Alert recorded! Total red flags: ${triageRedFlagsCount + 1}`);
  };

  const registerNewCitizen = (name: string, mobile: string, dob: string, gender: 'Male' | 'Female' | 'Other', bloodGroup: string): CitizenProfile => {
    const newId = `GOV-IND-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const newAbha = `91-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newProfile: CitizenProfile = {
      abhaId: newAbha,
      permanentId: newId,
      fullName: name,
      dob,
      gender,
      bloodGroup,
      height: '170 cm',
      weight: '68 kg',
      mobile,
      address: 'Government OPD Registrant',
      emergencyContact: {
        name: 'Family Contact',
        relation: 'Relative',
        mobile
      },
      allergies: [],
      medications: [],
      operations: [],
      conditions: [],
      documents: [],
      timeline: [
        {
          id: `tl-${Date.now()}`,
          date: 'Today',
          title: 'Permanent Health Profile Created',
          category: 'consultation',
          facility: 'Registration Desk',
          clinicalStatus: 'verified',
          summary: 'Citizen registered in national digital health database.'
        }
      ],
      consentLogs: []
    };

    setAllPatients(prev => [...prev, newProfile]);
    setPatient(newProfile);
    triggerNotify(`🎉 New Citizen Registered! Total Registered Profiles: ${allPatients.length + 1}`);
    return newProfile;
  };

  const reportChange = (type: 'allergy' | 'medication' | 'operation' | 'condition', title: string, details: string) => {
    const newItemId = `usr-${Date.now()}`;
    const newVerificationId = `vq-${Date.now()}`;

    if (type === 'allergy') {
      const newAlg: Allergy = {
        id: newItemId,
        allergen: title,
        reaction: details,
        severity: 'important',
        status: 'pending',
        reportedBy: 'patient',
        notes: 'Pending Doctor Verification'
      };
      setPatient(prev => ({ ...prev, allergies: [newAlg, ...prev.allergies] }));
    } else if (type === 'medication') {
      const newMed: Medication = {
        id: newItemId,
        name: title,
        dosage: 'As reported',
        frequency: details,
        status: 'active',
        clinicalStatus: 'pending',
        prescribedBy: 'Patient Reported',
        startDate: 'Today'
      };
      setPatient(prev => ({ ...prev, medications: [newMed, ...prev.medications] }));
    }

    const newVqItem: VerificationItem = {
      id: newVerificationId,
      patientId: patient.permanentId,
      patientName: patient.fullName,
      type,
      title: `Patient Reported: ${title}`,
      details,
      source: 'Patient Reported',
      reportedDate: 'Today',
      status: 'pending'
    };

    setVerificationQueue(prev => [newVqItem, ...prev]);
    triggerNotify(`Submitted! Item added to Doctor Verification Queue. Pending Items: ${verificationQueue.length + 1}`);
  };

  const verifyItem = (id: string, approve: boolean) => {
    setVerificationQueue(prev =>
      prev.map(item => (item.id === id ? { ...item, status: approve ? 'verified' : 'rejected' } : item))
    );

    const targetVq = verificationQueue.find(v => v.id === id);
    if (targetVq) {
      if (approve) {
        setPatient(prev => ({
          ...prev,
          allergies: prev.allergies.map(alg =>
            alg.allergen.toLowerCase().includes(targetVq.title.replace('Patient Reported:', '').trim().toLowerCase())
              ? { ...alg, status: 'verified', verifiedBy: 'Dr. R. K. Sharma', verifiedDate: 'Today' }
              : alg
          ),
          medications: prev.medications.map(med =>
            med.name.toLowerCase().includes(targetVq.title.replace('Patient Reported:', '').trim().toLowerCase())
              ? { ...med, clinicalStatus: 'verified', prescribedBy: 'Verified by Doctor' }
              : med
          )
        }));
        triggerNotify(`🟢 Doctor VERIFIED record for ${targetVq.patientName}!`);
      } else {
        triggerNotify(`🔴 Item rejected by Doctor.`);
      }
    }
  };

  const uploadDocument = (title: string, category: any) => {
    const newDoc: DocumentItem = {
      id: `doc-${Date.now()}`,
      title,
      category,
      uploadDate: 'Today',
      facility: 'Kiosk OCR Upload',
      fileSize: '1.8 MB',
      clinicalStatus: 'imported',
      extractedData: {
        medication: 'Paracetamol 650mg',
        doctor: 'AI OCR Extracted',
        hospital: 'OPD Scanner',
        date: 'Today'
      }
    };

    setPatient(prev => ({
      ...prev,
      documents: [newDoc, ...prev.documents],
      timeline: [
        {
          id: `tl-${Date.now()}`,
          date: 'Today',
          title: `Document Uploaded: ${title}`,
          category: 'prescription',
          facility: 'Kiosk Scanner',
          clinicalStatus: 'imported',
          summary: 'Document uploaded and processed by AI OCR extractor.'
        },
        ...prev.timeline
      ]
    }));

    // Add to verification queue for Doctor review
    const newVqItem: VerificationItem = {
      id: `vq-ocr-${Date.now()}`,
      patientId: patient.permanentId,
      patientName: patient.fullName,
      type: 'medication',
      title: `AI OCR Scanned: ${title}`,
      details: 'Extracted Paracetamol 650mg from uploaded document',
      source: 'AI OCR Scan',
      reportedDate: 'Today',
      status: 'pending'
    };

    setVerificationQueue(prev => [newVqItem, ...prev]);

    // Also update allPatients list so global doc counters update dynamically
    setAllPatients(prev => prev.map(p => p.permanentId === patient.permanentId ? { ...p, documents: [newDoc, ...p.documents] } : p));

    triggerNotify(`🔵 Document uploaded! Total System OCR Docs updated.`);
  };

  const addDoctorNote = (type: 'medication' | 'allergy' | 'condition', name: string, detail: string) => {
    if (type === 'medication') {
      const newMed: Medication = {
        id: `med-doc-${Date.now()}`,
        name,
        dosage: detail,
        frequency: 'As directed by physician',
        status: 'active',
        clinicalStatus: 'verified',
        prescribedBy: 'Dr. R. K. Sharma (District Hospital)',
        startDate: 'Today'
      };
      setPatient(prev => ({ ...prev, medications: [newMed, ...prev.medications] }));
    } else if (type === 'allergy') {
      const newAlg: Allergy = {
        id: `alg-doc-${Date.now()}`,
        allergen: name,
        reaction: detail,
        severity: 'critical',
        status: 'verified',
        reportedBy: 'doctor',
        verifiedBy: 'Dr. R. K. Sharma',
        verifiedDate: 'Today'
      };
      setPatient(prev => ({ ...prev, allergies: [newAlg, ...prev.allergies] }));
    }
    triggerNotify(`🟢 Prescription record updated directly by Doctor!`);
  };

  return (
    <HealthRecordContext.Provider
      value={{
        role,
        setRole,
        language,
        setLanguage,
        t: (key: string) => translateHelper(key, language),
        activeTab,
        setActiveTab,
        patient,
        allPatients,
        verificationQueue,
        triageRedFlagsCount,
        reportChange,
        verifyItem,
        uploadDocument,
        addDoctorNote,
        registerNewCitizen,
        triggerTriageRedFlag,
        notification,
        setNotification
      }}
    >
      {children}
    </HealthRecordContext.Provider>
  );
};

export const useHealthRecord = () => {
  const context = useContext(HealthRecordContext);
  if (!context) {
    throw new Error('useHealthRecord must be used within a HealthRecordProvider');
  }
  return context;
};
