import React, { createContext, useContext, useState } from 'react';
import type {
  UserRole,
  CitizenProfile,
  VerificationItem,
  Allergy,
  Medication,
  DocumentItem,
  DoctorStaff
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
  setPatient: (patient: CitizenProfile) => void;
  allPatients: CitizenProfile[];
  verificationQueue: VerificationItem[];
  triageRedFlagsCount: number;
  doctorsList: DoctorStaff[];
  reportChange: (type: 'allergy' | 'medication' | 'operation' | 'condition', title: string, details: string) => void;
  verifyItem: (id: string, approve: boolean, doctorNotes?: string) => void;
  modifyAndVerifyItem: (id: string, updatedTitle: string, updatedDetails: string, severity?: 'critical' | 'important' | 'normal') => void;
  uploadDocument: (
    title: string,
    category: any,
    extraData?: {
      imageUrl?: string;
      detectedDocumentType?: 'handwritten_prescription' | 'printed_lab_report' | 'hybrid_clinical_note';
      printedText?: string;
      handwrittenNotesText?: string;
      medication?: string;
      dosage?: string;
      doctor?: string;
      hospital?: string;
      diagnosis?: string;
      handwritingConfidence?: number;
      printedConfidence?: number;
    }
  ) => void;
  addDoctorNote: (type: 'medication' | 'allergy' | 'condition', name: string, detail: string) => void;
  updateVitalsAndContact: (height: string, weight: string, emergencyContact: { name: string; relation: string; mobile: string }) => void;
  registerNewCitizen: (name: string, mobile: string, dob: string, gender: 'Male' | 'Female' | 'Other', bloodGroup: string, aadhaarNumber: string) => { profile: CitizenProfile; isExisting: boolean };
  onboardNewDoctor: (name: string, licenseNumber: string, department: string, facility: string, username: string) => void;
  triggerTriageRedFlag: () => void;
  notification: string | null;
  setNotification: (msg: string | null) => void;
}

// Clean Initial Citizen Profile (Starting fresh with 1 primary profile)
const initialPatient: CitizenProfile = {
  abhaId: '91-4829-1092-4410',
  permanentId: 'GOV-IND-2026-88412',
  aadhaarNumber: '5894 1029 4410',
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

  const [doctorsList, setDoctorsList] = useState<DoctorStaff[]>([
    {
      id: 'doc-1',
      fullName: 'Dr. R. K. Sharma (MD)',
      licenseNumber: 'GOV-MED-44109',
      department: 'General Medicine',
      facility: 'District Hospital OPD',
      username: 'dr.rk.sharma',
      joinedDate: '10 Jan 2026',
      status: 'active'
    },
    {
      id: 'doc-2',
      fullName: 'Dr. Priya Nair (MD)',
      licenseNumber: 'GOV-MED-55912',
      department: 'Pediatrics & Triage',
      facility: 'Primary Health Centre (PHC)',
      username: 'dr.priya.nair',
      joinedDate: '01 Feb 2026',
      status: 'active'
    }
  ]);

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

  const modifyAndVerifyItem = (
    id: string,
    updatedTitle: string,
    updatedDetails: string,
    severity: 'critical' | 'important' | 'normal' = 'important'
  ) => {
    setVerificationQueue(prev =>
      prev.map(item =>
        item.id === id
          ? {
            ...item,
            status: 'verified',
            title: `Doctor Corrected: ${updatedTitle}`,
            details: `Doctor Note: ${updatedDetails}`
          }
          : item
      )
    );

    const targetVq = verificationQueue.find(v => v.id === id);
    if (targetVq) {
      setPatient(prev => {
        let updatedAllergies = [...prev.allergies];
        let updatedMeds = [...prev.medications];

        if (targetVq.type === 'allergy') {
          const rawSearch = targetVq.title.replace('Patient Reported:', '').replace('Doctor Corrected:', '').trim().toLowerCase();
          const existingAlgIndex = updatedAllergies.findIndex(a =>
            a.allergen.toLowerCase().includes(rawSearch) || rawSearch.includes(a.allergen.toLowerCase())
          );
          if (existingAlgIndex >= 0) {
            updatedAllergies[existingAlgIndex] = {
              ...updatedAllergies[existingAlgIndex],
              allergen: updatedTitle,
              reaction: updatedDetails,
              severity,
              status: 'verified',
              verifiedBy: 'Dr. R. K. Sharma',
              verifiedDate: 'Today'
            };
          } else {
            updatedAllergies.unshift({
              id: `alg-doc-${Date.now()}`,
              allergen: updatedTitle,
              reaction: updatedDetails,
              severity,
              status: 'verified',
              reportedBy: 'doctor',
              verifiedBy: 'Dr. R. K. Sharma',
              verifiedDate: 'Today'
            });
          }
        } else if (targetVq.type === 'medication') {
          const rawSearch = targetVq.title.replace('Patient Reported:', '').replace('AI OCR Scanned:', '').trim().toLowerCase();
          const existingMedIndex = updatedMeds.findIndex(m =>
            m.name.toLowerCase().includes(rawSearch) || rawSearch.includes(m.name.toLowerCase())
          );
          if (existingMedIndex >= 0) {
            updatedMeds[existingMedIndex] = {
              ...updatedMeds[existingMedIndex],
              name: updatedTitle,
              dosage: 'Doctor Prescribed',
              frequency: updatedDetails,
              clinicalStatus: 'verified',
              prescribedBy: 'Verified & Corrected by Dr. R. K. Sharma'
            };
          } else {
            updatedMeds.unshift({
              id: `med-doc-${Date.now()}`,
              name: updatedTitle,
              dosage: 'Doctor Prescribed',
              frequency: updatedDetails,
              status: 'active',
              clinicalStatus: 'verified',
              prescribedBy: 'Verified & Corrected by Dr. R. K. Sharma',
              startDate: 'Today'
            });
          }
        }

        return {
          ...prev,
          allergies: updatedAllergies,
          medications: updatedMeds
        };
      });
      triggerNotify(`🟢 Doctor MODIFIED & VERIFIED record: ${updatedTitle}`);
    }
  };

  const onboardNewDoctor = (
    name: string,
    licenseNumber: string,
    department: string,
    facility: string,
    username: string
  ) => {
    const newDoctor: DoctorStaff = {
      id: `doc-${Date.now()}`,
      fullName: name,
      licenseNumber,
      department,
      facility,
      username,
      joinedDate: 'Today',
      status: 'active'
    };
    setDoctorsList(prev => [newDoctor, ...prev]);
    triggerNotify(`🎉 Authorized Doctor (${name}) onboarded! Login username: ${username}`);
  };

  const registerNewCitizen = (
    name: string,
    mobile: string,
    dob: string,
    gender: 'Male' | 'Female' | 'Other',
    bloodGroup: string,
    aadhaarNumber: string
  ): { profile: CitizenProfile; isExisting: boolean } => {
    const cleanAadhaar = aadhaarNumber.replace(/\D/g, '');
    const cleanMobile = mobile.replace(/\D/g, '');

    // Check if citizen with same Aadhaar or Mobile already exists
    const existing = allPatients.find(p => {
      const pAadhaar = (p.aadhaarNumber || '').replace(/\D/g, '');
      const pMobile = (p.mobile || '').replace(/\D/g, '');
      return (cleanAadhaar && pAadhaar === cleanAadhaar) || (cleanMobile && pMobile === cleanMobile);
    });

    if (existing) {
      setPatient(existing);
      triggerNotify(`ℹ️ Existing Permanent Health ID (${existing.permanentId}) loaded!`);
      return { profile: existing, isExisting: true };
    }

    const newId = `GOV-IND-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const newAbha = `91-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newProfile: CitizenProfile = {
      abhaId: newAbha,
      permanentId: newId,
      aadhaarNumber,
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
    triggerNotify(`🎉 Permanent Health ID Issued! Total Profiles: ${allPatients.length + 1}`);
    return { profile: newProfile, isExisting: false };
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

  const uploadDocument = (
    title: string,
    category: any,
    extraData?: {
      imageUrl?: string;
      detectedDocumentType?: 'handwritten_prescription' | 'printed_lab_report' | 'hybrid_clinical_note';
      printedText?: string;
      handwrittenNotesText?: string;
      medication?: string;
      dosage?: string;
      doctor?: string;
      hospital?: string;
      diagnosis?: string;
      handwritingConfidence?: number;
      printedConfidence?: number;
    }
  ) => {
    const newDoc: DocumentItem = {
      id: `doc-${Date.now()}`,
      title,
      category,
      uploadDate: 'Today',
      facility: extraData?.hospital || 'OPD AI Image Vision Scanner',
      fileSize: '2.4 MB',
      clinicalStatus: 'imported',
      imageUrl: extraData?.imageUrl,
      detectedDocumentType: extraData?.detectedDocumentType || 'hybrid_clinical_note',
      ocrEngine: 'Vision Neural OCR (Printed + Handwriting)',
      handwritingConfidence: extraData?.handwritingConfidence || 94,
      printedConfidence: extraData?.printedConfidence || 99,
      handwrittenNotesText: extraData?.handwrittenNotesText || 'Rx: Amoxicillin 500mg TDS x 5 days (Handwritten)',
      printedText: extraData?.printedText || 'District Govt Hospital OPD • Patient ID: GOV-IND-2026-88412',
      extractedData: {
        medication: extraData?.medication || 'Amoxicillin 500mg (TDS)',
        dosage: extraData?.dosage || '1 Tablet Three Times Daily after meals',
        doctor: extraData?.doctor || 'Dr. R. K. Sharma (MD)',
        hospital: extraData?.hospital || 'District Hospital OPD',
        date: 'Today',
        diagnosis: extraData?.diagnosis || 'Acute Upper Respiratory Symptoms',
        handwrittenInstructions: extraData?.handwrittenNotesText || 'Take with plenty of warm water. Review in 5 days.'
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
          facility: extraData?.hospital || 'AI Image Processing Scanner',
          clinicalStatus: 'imported',
          summary: `Document processed by Vision AI Engine. Extracted Printed Text & Handwritten Doctor Notes (${newDoc.handwritingConfidence}% Confidence).`
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
      title: `AI Image Vision Scanned: ${title}`,
      details: `Extracted: ${newDoc.extractedData?.medication} (Printed & Handwritten OCR) • Notes: ${newDoc.handwrittenNotesText}`,
      source: 'AI Image Vision Processor',
      reportedDate: 'Today',
      status: 'pending',
      handwrittenExtractionNote: newDoc.handwrittenNotesText
    };

    setVerificationQueue(prev => [newVqItem, ...prev]);

    // Also update allPatients list so global doc counters update dynamically
    setAllPatients(prev => prev.map(p => p.permanentId === patient.permanentId ? { ...p, documents: [newDoc, ...p.documents] } : p));

    triggerNotify(`📸 Image Processed! Printed text & handwritten notes extracted to Doctor Queue.`);
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

  const updateVitalsAndContact = (
    height: string,
    weight: string,
    emergencyContact: { name: string; relation: string; mobile: string }
  ) => {
    setPatient(prev => {
      const updated = {
        ...prev,
        height,
        weight,
        emergencyContact,
        timeline: [
          {
            id: `tl-${Date.now()}`,
            date: 'Today',
            title: 'Height, Weight & Emergency Contact Updated',
            category: 'consultation' as const,
            facility: 'Citizen Self-Service Portal',
            clinicalStatus: 'verified' as const,
            summary: `Updated: Height (${height}), Weight (${weight}), Contact (${emergencyContact.name} - ${emergencyContact.mobile}).`
          },
          ...prev.timeline
        ]
      };

      setAllPatients(all => all.map(p => p.permanentId === prev.permanentId ? updated : p));
      return updated;
    });

    triggerNotify(`✅ Profile updated! Height: ${height}, Weight: ${weight}, Contact: ${emergencyContact.name}`);
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
        setPatient,
        allPatients,
        verificationQueue,
        triageRedFlagsCount,
        doctorsList,
        reportChange,
        verifyItem,
        modifyAndVerifyItem,
        uploadDocument,
        addDoctorNote,
        updateVitalsAndContact,
        registerNewCitizen,
        onboardNewDoctor,
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
