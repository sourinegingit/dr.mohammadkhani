import { NextResponse } from 'next/server';
import { getSmsLogs } from '@/lib/store';

export async function GET() {
  try {
    const logs = getSmsLogs();
    const config = {
      kavenegarConfigured: Boolean(process.env.KAVENEGAR_API_KEY),
      farazSmsConfigured: Boolean(process.env.FARAZ_SMS_API_KEY),
      simulatorActive: !process.env.KAVENEGAR_API_KEY && !process.env.FARAZ_SMS_API_KEY,
    };
    return NextResponse.json({ success: true, logs, config });
  } catch (error) {
    console.error('Error fetching SMS logs:', error);
    return NextResponse.json({ success: false, error: 'خطا در بارگذاری لاگ پیامک‌ها' }, { status: 500 });
  }
}
