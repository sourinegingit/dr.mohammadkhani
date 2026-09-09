export type SurgeryStyle = 'natural' | 'semi-fantasy' | 'fantasy' | 'undecided';

export type ConsultationStatus = 'pending' | 'approved' | 'rejected';

export interface PatientPhotos {
  frontal: string; // Base64 or URL
  profileRight: string; // Base64 or URL
  profileLeft: string; // Base64 or URL
}

export interface AppointmentDetails {
  date: string; // e.g. "۱۴۰۳/۰۸/۲۲" or "1403/08/22"
  time: string; // e.g. "17:30"
  clinicAddress: string;
  notes?: string;
  doctorNotes?: string;
  appointmentType: 'consultation' | 'surgery_visit';
}

export interface RejectionDetails {
  reason: string;
  explanation?: string;
}

export interface SmsLogItem {
  id: string;
  trackingCode: string;
  patientName: string;
  phone: string;
  message: string;
  status: 'delivered' | 'pending' | 'simulated';
  provider: string;
  timestamp: string;
}

export interface ConsultationRequest {
  id: string;
  trackingCode: string; // e.g. RH-9482
  fullName: string;
  nationalId: string;
  phone: string;
  age: number;
  gender?: 'female' | 'male';
  hadPreviousSurgery: boolean;
  previousSurgeryYearsAgo?: number;
  desiredStyle: SurgeryStyle;
  breathingIssues: string[]; // e.g. ["انحراف بینی", "گرفتگی یک‌طرفه"]
  hasChronicDiseaseOrMed: boolean;
  chronicDiseaseDetails?: string;
  expectations: string;
  photos: PatientPhotos;
  status: ConsultationStatus;
  createdAt: string;
  updatedAt: string;
  appointment?: AppointmentDetails;
  rejection?: RejectionDetails;
  smsLog?: SmsLogItem;
}

export interface TrackingQueryResult {
  found: boolean;
  consultation?: ConsultationRequest;
  message?: string;
}
