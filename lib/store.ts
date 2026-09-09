import { ConsultationRequest, SmsLogItem } from '@/types/medical';

// In-memory persistent store across API routes within the server lifecycle
declare global {
  var __clinicConsultations: ConsultationRequest[] | undefined;
  var __clinicSmsLogs: SmsLogItem[] | undefined;
}

// Initial sample data
const initialConsultations: ConsultationRequest[] = [
  {
    id: 'req-1',
    trackingCode: 'RH-9482',
    fullName: 'سارا رضایی',
    nationalId: '0012345678',
    phone: '09121112233',
    age: 26,
    gender: 'female',
    hadPreviousSurgery: false,
    desiredStyle: 'semi-fantasy',
    breathingIssues: ['گرفتگی سمت راست هنگام خواب'],
    hasChronicDiseaseOrMed: false,
    expectations: 'تمایل به باریک‌تر شدن نوک بینی و قوس ملایم طبیعی دارم، بدون افتادگی در گذر زمان.',
    photos: {
      frontal: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
      profileRight: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      profileLeft: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    },
    status: 'approved',
    createdAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    appointment: {
      date: '۱۴۰۳/۰۸/۲۵',
      time: '۱۷:۱۵',
      clinicAddress: 'تهران، خیابان شریعتی، بالاتر از میرداماد، روبروی بیمارستان ایرانمهر، ساختمان پزشکان، طبقه ۴، واحد ۱۶',
      notes: 'لطفاً سی‌تی اسکن سینوس و آزمایشات روتین قبل از عمل را همراه داشته باشید.',
      doctorNotes: 'کاندید مناسب رینوپلاستی استخوانی-غضروفی، پوست استاندارد با کشسانی مناسب.',
      appointmentType: 'consultation',
    },
    smsLog: {
      id: 'sms-init-1',
      trackingCode: 'RH-9482',
      patientName: 'سارا رضایی',
      phone: '09121112233',
      message: 'سلام سارا رضایی عزیز، نوبت ویزیت شما برای تاریخ ۱۴۰۳/۰۸/۲۵ ساعت ۱۷:۱۵ در مطب دکتر علی محمدخانی (شریعتی) ثبت شد. کد پیگیری: RH-9482',
      status: 'delivered',
      provider: 'سامانه پیامک کاوه‌نگار',
      timestamp: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    }
  },
  {
    id: 'req-2',
    trackingCode: 'RH-7319',
    fullName: 'امیرحسین مرادی',
    nationalId: '0076543219',
    phone: '09355554433',
    age: 31,
    gender: 'male',
    hadPreviousSurgery: true,
    previousSurgeryYearsAgo: 4,
    desiredStyle: 'natural',
    breathingIssues: ['انحراف شدید تیغه بینی', 'دشواری تنفس در فعالیت ورزشی'],
    hasChronicDiseaseOrMed: false,
    expectations: 'رینوپلاستی ترمیمی جهت اصلاح فرورفتگی غضروف سمت چپ و بهبود کامل تنفس.',
    photos: {
      frontal: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      profileRight: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
      profileLeft: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80',
    },
    status: 'pending',
    createdAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
  },
  {
    id: 'req-3',
    trackingCode: 'RH-5120',
    fullName: 'مهسا کاظمی',
    nationalId: '0081122334',
    phone: '09198887766',
    age: 23,
    gender: 'female',
    hadPreviousSurgery: false,
    desiredStyle: 'semi-fantasy',
    breathingIssues: [],
    hasChronicDiseaseOrMed: false,
    expectations: 'کوچک شدن نوک بینی گوشتی و جمع شدن پره‌ها متناسب با اجزای صورت.',
    photos: {
      frontal: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      profileRight: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
      profileLeft: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    },
    status: 'pending',
    createdAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
  }
];

export function getConsultations(): ConsultationRequest[] {
  if (!globalThis.__clinicConsultations) {
    globalThis.__clinicConsultations = [...initialConsultations];
  }
  return globalThis.__clinicConsultations;
}

export function getConsultationById(id: string): ConsultationRequest | undefined {
  const list = getConsultations();
  return list.find(c => c.id === id);
}

export function findConsultationByTrackingOrPhone(query: string): ConsultationRequest | undefined {
  const cleanQuery = query.trim().toUpperCase();
  const digitsOnly = query.replace(/\D/g, '');
  const list = getConsultations();

  return list.find(c => {
    if (c.trackingCode.toUpperCase() === cleanQuery) return true;
    if (digitsOnly.length >= 8 && c.phone.replace(/\D/g, '').includes(digitsOnly)) return true;
    if (digitsOnly.length === 10 && c.nationalId === digitsOnly) return true;
    return false;
  });
}

export function saveConsultation(item: ConsultationRequest): ConsultationRequest {
  const list = getConsultations();
  const index = list.findIndex(c => c.id === item.id);
  if (index >= 0) {
    list[index] = item;
  } else {
    list.unshift(item);
  }
  return item;
}

export function generateTrackingCode(): string {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `RH-${randomNum}`;
}

export function getSmsLogs(): SmsLogItem[] {
  if (!globalThis.__clinicSmsLogs) {
    globalThis.__clinicSmsLogs = [
      {
        id: 'sms-1',
        trackingCode: 'RH-9482',
        patientName: 'سارا رضایی',
        phone: '09121112233',
        message: 'سلام سارا رضایی عزیز، نوبت ویزیت شما برای تاریخ ۱۴۰۳/۰۸/۲۵ ساعت ۱۷:۱۵ در مطب دکتر علی محمدخانی (شریعتی) ثبت شد. کد پیگیری: RH-9482',
        status: 'delivered',
        provider: 'سامانه پیامک کاوه‌نگار',
        timestamp: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
      }
    ];
  }
  return globalThis.__clinicSmsLogs;
}

export function addSmsLog(log: SmsLogItem) {
  const logs = getSmsLogs();
  logs.unshift(log);
}
