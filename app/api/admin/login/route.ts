import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    const cleanUser = username?.trim().toLowerCase();
    const cleanPass = password?.trim();

    // Standard demo credentials
    const isValid =
      ((cleanUser === 'dr.mohammadkhani' || cleanUser === 'dr.ariafar' || cleanUser === 'admin') && 
        (cleanPass === 'admin123' || cleanPass === 'dr123456'));

    if (!isValid) {
      return NextResponse.json(
        { success: false, message: 'نام کاربری یا رمز عبور اشتباه است.' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        username: 'dr.mohammadkhani',
        fullName: 'دکتر علی محمدخانی',
        role: 'جراح ارشد و موسس کلینیک (شریعتی)',
        avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
      },
      token: 'auth_token_' + Date.now(),
    });
  } catch (error) {
    console.error('Error during admin login:', error);
    return NextResponse.json(
      { success: false, message: 'خطای سرور در احراز هویت' },
      { status: 500 }
    );
  }
}
