import { NextRequest, NextResponse } from 'next/server';
import { findConsultationByTrackingOrPhone } from '@/lib/store';

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();

    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return NextResponse.json(
        { found: false, message: 'لطفاً کد رهگیری یا شماره موبایل را وارد نمایید.' },
        { status: 400 }
      );
    }

    const consultation = findConsultationByTrackingOrPhone(query.trim());

    if (!consultation) {
      return NextResponse.json({
        found: false,
        message: 'هیچ پرونده‌ای با این مشخصات یافت نشد. لطفاً از صحت کد رهگیری یا شماره موبایل اطمینان حاصل کنید.',
      });
    }

    return NextResponse.json({
      found: true,
      consultation: {
        id: consultation.id,
        trackingCode: consultation.trackingCode,
        fullName: consultation.fullName,
        phone: consultation.phone.replace(/(\d{4})\d{4}(\d{3})/, '$1****$2'),
        status: consultation.status,
        createdAt: consultation.createdAt,
        updatedAt: consultation.updatedAt,
        hadPreviousSurgery: consultation.hadPreviousSurgery,
        desiredStyle: consultation.desiredStyle,
        appointment: consultation.appointment,
        rejection: consultation.rejection,
      },
    });
  } catch (error) {
    console.error('Error tracking consultation:', error);
    return NextResponse.json(
      { found: false, message: 'خطای سرور در جستجوی پرونده' },
      { status: 500 }
    );
  }
}
