import { NextRequest, NextResponse } from 'next/server';
import { getConsultationById, saveConsultation, addSmsLog } from '@/lib/store';
import { sendAppointmentSms, sendRejectionSms } from '@/lib/sms';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const item = getConsultationById(id);
    if (!item) {
      return NextResponse.json({ success: false, error: 'پرونده یافت نشد' }, { status: 404 });
    }
    return NextResponse.json({ success: true, item });
  } catch (error) {
    console.error('Error fetching consultation detail:', error);
    return NextResponse.json({ success: false, error: 'خطای سرور' }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const item = getConsultationById(id);
    if (!item) {
      return NextResponse.json({ success: false, error: 'پرونده یافت نشد' }, { status: 404 });
    }

    const body = await req.json();
    const action = body.action; // 'approve' | 'reject'

    if (action === 'approve') {
      const { date, time, clinicAddress, notes, doctorNotes, appointmentType } = body;
      if (!date || !time) {
        return NextResponse.json(
          { success: false, error: 'لطفاً تاریخ و ساعت نوبت را مشخص نمایید.' },
          { status: 400 }
        );
      }

      item.status = 'approved';
      item.updatedAt = new Date().toISOString();
      item.appointment = {
        date,
        time,
        clinicAddress: clinicAddress || 'تهران، خیابان جردن (نلسون ماندلا)، بالاتر از جهان کودک، برج مروارید، طبقه ۴، واحد ۴۰۲',
        notes: notes || 'همراه داشتن مدارک پزشکی قبلی و کارت شناسایی الزامی است.',
        doctorNotes: doctorNotes || '',
        appointmentType: appointmentType || 'consultation',
      };

      // Trigger automated SMS to patient
      const smsLog = await sendAppointmentSms({
        patientName: item.fullName,
        phone: item.phone,
        trackingCode: item.trackingCode,
        appointment: item.appointment,
      });

      item.smsLog = smsLog;
      addSmsLog(smsLog);
      saveConsultation(item);

      return NextResponse.json({
        success: true,
        message: 'نوبت با موفقیت ثبت شد و پیامک اطلاع‌رسانی برای بیمار ارسال گردید.',
        item,
        smsLog,
      });
    }

    if (action === 'reject') {
      const { reason, explanation } = body;
      if (!reason) {
        return NextResponse.json(
          { success: false, error: 'لطفاً دلیل عدم امکان جراحی/رد را مشخص نمایید.' },
          { status: 400 }
        );
      }

      item.status = 'rejected';
      item.updatedAt = new Date().toISOString();
      item.rejection = {
        reason,
        explanation: explanation || '',
      };

      // Trigger rejection notification SMS
      const smsLog = await sendRejectionSms({
        patientName: item.fullName,
        phone: item.phone,
        trackingCode: item.trackingCode,
        rejection: item.rejection,
      });

      item.smsLog = smsLog;
      addSmsLog(smsLog);
      saveConsultation(item);

      return NextResponse.json({
        success: true,
        message: 'درخواست رد شد و پیامک اطلاع‌رسانی ارسال گردید.',
        item,
        smsLog,
      });
    }

    return NextResponse.json({ success: false, error: 'عملیات نامعتبر است' }, { status: 400 });
  } catch (error) {
    console.error('Error updating consultation:', error);
    return NextResponse.json({ success: false, error: 'خطا در ویرایش پرونده' }, { status: 500 });
  }
}
