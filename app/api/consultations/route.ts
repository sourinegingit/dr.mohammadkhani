import { NextRequest, NextResponse } from 'next/server';
import { getConsultations, saveConsultation, generateTrackingCode } from '@/lib/store';
import { ConsultationRequest } from '@/types/medical';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search')?.toLowerCase().trim();

    let items = getConsultations();

    if (status && status !== 'all') {
      items = items.filter(c => c.status === status);
    }

    if (search) {
      items = items.filter(c =>
        c.fullName.toLowerCase().includes(search) ||
        c.phone.includes(search) ||
        c.trackingCode.toLowerCase().includes(search) ||
        c.nationalId.includes(search)
      );
    }

    const stats = {
      total: getConsultations().length,
      pending: getConsultations().filter(c => c.status === 'pending').length,
      approved: getConsultations().filter(c => c.status === 'approved').length,
      rejected: getConsultations().filter(c => c.status === 'rejected').length,
    };

    return NextResponse.json({ success: true, items, stats });
  } catch (error) {
    console.error('Error fetching consultations:', error);
    return NextResponse.json({ success: false, error: 'خطا در دریافت لیست مشاوره‌ها' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Basic validation
    if (!body.fullName || !body.phone || !body.nationalId) {
      return NextResponse.json(
        { success: false, error: 'لطفاً نام، کدملی و شماره موبایل را وارد نمایید.' },
        { status: 400 }
      );
    }

    if (!body.photos?.frontal || !body.photos?.profileRight || !body.photos?.profileLeft) {
      return NextResponse.json(
        { success: false, error: 'ارسال هر سه زاویه عکس (تمام‌رخ، نیم‌رخ راست و نیم‌رخ چپ) الزامی است.' },
        { status: 400 }
      );
    }

    const trackingCode = generateTrackingCode();
    const newConsultation: ConsultationRequest = {
      id: 'req-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      trackingCode,
      fullName: body.fullName.trim(),
      nationalId: body.nationalId.trim(),
      phone: body.phone.trim(),
      age: Number(body.age) || 25,
      gender: body.gender || 'female',
      hadPreviousSurgery: Boolean(body.hadPreviousSurgery),
      previousSurgeryYearsAgo: body.previousSurgeryYearsAgo ? Number(body.previousSurgeryYearsAgo) : undefined,
      desiredStyle: body.desiredStyle || 'natural',
      breathingIssues: Array.isArray(body.breathingIssues) ? body.breathingIssues : [],
      hasChronicDiseaseOrMed: Boolean(body.hasChronicDiseaseOrMed),
      chronicDiseaseDetails: body.chronicDiseaseDetails || '',
      expectations: body.expectations || '',
      photos: {
        frontal: body.photos.frontal,
        profileRight: body.photos.profileRight,
        profileLeft: body.photos.profileLeft,
      },
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    saveConsultation(newConsultation);

    return NextResponse.json({
      success: true,
      message: 'درخواست شما ثبت شد و در صف بررسی پزشک قرار گرفت. نتیجه و زمان نوبت از طریق پیامک ارسال خواهد شد.',
      trackingCode,
      consultation: newConsultation,
    });
  } catch (error) {
    console.error('Error creating consultation:', error);
    return NextResponse.json(
      { success: false, error: 'خطا در ثبت درخواست مشاوره' },
      { status: 500 }
    );
  }
}
