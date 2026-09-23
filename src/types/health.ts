export type UserRole = 'public' | 'citizen' | 'doctor' | 'kiosk' | 'operator' | 'admin';

export type ClinicalStatus = 'verified' | 'pending' | 'imported' | 'critical' | 'resolved';

export type SeverityLevel = 'critical' | 'important' | 'normal';

export interface Allergy {
  id: string;
  allergen: string;
  reaction: string;
  severity: SeverityLevel;
  status: ClinicalStatus;
  reportedBy: 'patient' | 'doctor' | 'ocr';
  verifiedBy?: string;
  verifiedDate?: string;
  notes?: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  status: 'active' | 'stopped';
  clinicalStatus: ClinicalStatus;
  prescribedBy: string;
  startDate: string;
  endDate?: string;
  notes?: string;
}

export interface Operation {
  id: string;
  procedureName: string;
  year: string;
  hospital: string;
  surgeon?: string;
  status: ClinicalStatus;
  notes?: string;
}

export interface MedicalCondition {
  id: string;
  conditionName: string;
  diagnosedDate: string;
  status: ClinicalStatus;
  severity: SeverityLevel;
  notes?: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  category: 'prescription' | 'lab_report' | 'scan' | 'discharge' | 'other';
  uploadDate: string;
  facility: string;
  fileSize: string;
  clinicalStatus: ClinicalStatus;
  imageUrl?: string;
  detectedDocumentType?: 'handwritten_prescription' | 'printed_lab_report' | 'hybrid_clinical_note';
  ocrEngine?: 'Vision Neural OCR (Printed + Handwriting)';
  handwritingConfidence?: number;
  printedConfidence?: number;
  handwrittenNotesText?: string;
  printedText?: string;
  extractedData?: {
    medication?: string;
    dosage?: string;
    doctor?: string;
    hospital?: string;
    date?: string;
    diagnosis?: string;
    handwrittenInstructions?: string;
  };
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  category: 'surgery' | 'lab' | 'consultation' | 'prescription' | 'diagnosis';
  facility: string;
  doctorName?: string;
  clinicalStatus: ClinicalStatus;
  summary: string;
}

export interface ConsentLog {
  id: string;
  doctorName: string;
  facility: string;
  facilityType: 'PHC' | 'CHC' | 'District Hospital' | 'Medical College';
  viewedDate: string;
  sectionsViewed: string[];
}

export interface VerificationItem {
  id: string;
  patientId: string;
  patientName: string;
  type: 'allergy' | 'medication' | 'operation' | 'condition';
  title: string;
  details: string;
  source: 'Patient Reported' | 'AI OCR Scan' | 'AI Image Vision Processor';
  reportedDate: string;
  status: 'pending' | 'verified' | 'rejected';
  handwrittenExtractionNote?: string;
}

export interface CitizenProfile {
  abhaId: string;
  permanentId: string;
  aadhaarNumber: string;
  fullName: string;
  dob: string;
  gender: 'Male' | 'Female' | 'Other';
  bloodGroup: string;
  height: string;
  weight: string;
  mobile: string;
  address: string;
  emergencyContact: {
    name: string;
    relation: string;
    mobile: string;
  };
  allergies: Allergy[];
  medications: Medication[];
  operations: Operation[];
  conditions: MedicalCondition[];
  documents: DocumentItem[];
  timeline: TimelineEvent[];
  consentLogs: ConsentLog[];
}

export interface DoctorStaff {
  id: string;
  fullName: string;
  licenseNumber: string;
  department: string;
  facility: string;
  username: string;
  joinedDate: string;
  status: 'active' | 'inactive';
}

export interface FhirAuditEvent {
  resourceType: 'AuditEvent';
  id: string;
  type: {
    system: 'http://terminology.hl7.org/CodeSystem/audit-event-type';
    code: 'rest' | 'clinical-reasoning' | 'ai-triage';
    display: string;
  };
  action: 'E' | 'C' | 'R'; // Execute, Create, Read
  recorded: string;
  outcome: '0' | '4' | '8'; // 0 = Success
  purposeOfUse: {
    system: 'http://terminology.hl7.org/CodeSystem/v3-ActReason';
    code: 'TREAT';
    display: 'Clinical Triage & Patient Care';
  };
  agent: {
    name: string;
    role: string;
    requestor: boolean;
  }[];
  source: {
    observer: {
      display: string;
    };
    site: string;
  };
  entity: {
    what: {
      reference: string;
      display: string;
    };
    type: string;
    dpdpAnonymized: boolean;
    sha256Hash: string;
  }[];
  nmcDisclaimerAppended: boolean;
}


