import { AppointmentDetails, RejectionDetails, SmsLogItem } from '@/types/medical';

interface SendAppointmentSmsParams {
  patientName: string;
  phone: string;
  trackingCode: string;
  appointment: AppointmentDetails;
}

interface SendRejectionSmsParams {
  patientName: string;
  phone: string;
  trackingCode: string;
  rejection: RejectionDetails;
}

export async function sendAppointmentSms({
  patientName,
  phone,
  trackingCode,
  appointment,
}: SendAppointmentSmsParams): Promise<SmsLogItem> {
  const kavenegarKey = process.env.KAVENEGAR_API_KEY;
  const farazKey = process.env.FARAZ_SMS_API_KEY;

  const smsText = `سلام ${patientName} عزیز،
درخواست مشاوره جراحی بینی شما توسط دکتر علی محمدخانی تایید شد.
زمان نوبت ویزیت: ${appointment.date} ساعت ${appointment.time}
محل مراجعه: ${appointment.clinicAddress}
کد پیگیری: ${trackingCode}
کلینیک فوق تخصصی رینوپلاستی دکتر علی محمدخانی (شریعتی)`;

  const logItem: SmsLogItem = {
    id: 'sms_' + Math.random().toString(36).substring(2, 9),
    trackingCode,
    patientName,
    phone,
    message: smsText,
    status: 'simulated',
    provider: 'شبیه‌ساز پیامک پزشکی (آماده اتصال)',
    timestamp: new Date().toISOString(),
  };

  // 1. Try Kavenegar if configured
  if (kavenegarKey) {
    try {
      const template = process.env.KAVENEGAR_VERIFY_TEMPLATE || 'rhinoplasty_appointment';
      const encodedToken = encodeURIComponent(appointment.date.replace(/\//g, '-'));
      const encodedToken2 = encodeURIComponent(appointment.time);
      const encodedToken3 = encodeURIComponent(trackingCode);
      
      const url = `https://api.kavenegar.com/v1/${kavenegarKey}/verify/lookup.json?receptor=${phone}&token=${encodedToken}&token2=${encodedToken2}&token3=${encodedToken3}&template=${template}`;
      
      const response = await fetch(url, { method: 'POST' });
      if (response.ok) {
        logItem.status = 'delivered';
        logItem.provider = 'سامانه پیامک کاوه‌نگار (Kavenegar)';
        return logItem;
      }
    } catch (err) {
      console.warn('Kavenegar dispatch failed, falling back to simulator:', err);
    }
  }

  // 2. Try Faraz SMS / IPPanel if configured
  if (farazKey) {
    try {
      const patternCode = process.env.FARAZ_SMS_PATTERN_CODE || 'rhino_accept';
      const originator = process.env.FARAZ_SMS_ORIGINATOR || '+983000505';
      const response = await fetch('https://ippanel.com/api/select', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `AccessKey ${farazKey}`
        },
        body: JSON.stringify({
          op: 'pattern',
          user: 'clinic_admin',
          pass: farazKey,
          fromNum: originator,
          toNum: phone,
          patternCode: patternCode,
          inputData: [
            { name: patientName },
            { date: appointment.date },
            { time: appointment.time },
            { code: trackingCode }
          ]
        })
      });
      if (response.ok) {
        logItem.status = 'delivered';
        logItem.provider = 'سامانه پیامک فراز اس‌ام‌اس (FarazSMS/IPPanel)';
        return logItem;
      }
    } catch (err) {
      console.warn('Faraz SMS dispatch failed, falling back to simulator:', err);
    }
  }

  // Default simulated response for testing and smooth review
  logItem.status = 'simulated';
  logItem.provider = 'شبیه‌ساز هوشمند پیامک بالینی (Sandbox)';
  return logItem;
}

export async function sendRejectionSms({
  patientName,
  phone,
  trackingCode,
  rejection,
}: SendRejectionSmsParams): Promise<SmsLogItem> {
  const smsText = `مراجعه‌کننده گرامی ${patientName}،
پرونده مشاوره بینی شما (کد: ${trackingCode}) بررسی شد.
نتیجه بررسی: ${rejection.reason}
${rejection.explanation ? `توضیح پزشک: ${rejection.explanation}\n` : ''}جهت راهنمایی بیشتر با شماره مطب ۰۲۱۸۸۸۸۹۹۹۹ تماس حاصل فرمایید.
مطب دکتر علی محمدخانی (خیابان شریعتی)`;

  const logItem: SmsLogItem = {
    id: 'sms_' + Math.random().toString(36).substring(2, 9),
    trackingCode,
    patientName,
    phone,
    message: smsText,
    status: 'simulated',
    provider: 'شبیه‌ساز پیامک پزشکی (Sandbox)',
    timestamp: new Date().toISOString(),
  };

  return logItem;
}
