import type { Metadata } from 'next';
import { Vazirmatn } from 'next/font/google';
import './globals.css';

const vazirmatn = Vazirmatn({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-vazirmatn',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'دکتر علی محمدخانی | متخصص و جراح زیبایی بینی',
  description: 'سامانه نوبت‌دهی و مشاوره آنلاین جراحی زیبایی بینی دکتر علی محمدخانی (تهران، خیابان شریعتی) - گالری قبل و بعد و پیگیری نوبت',
  openGraph: {
    title: 'دکتر علی محمدخانی | متخصص و جراح زیبایی بینی',
    description: 'سامانه نوبت‌دهی و مشاوره آنلاین جراحی زیبایی بینی دکتر علی محمدخانی (تهران، خیابان شریعتی) - گالری قبل و بعد و پیگیری نوبت',
    type: 'website',
    locale: 'fa_IR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'دکتر علی محمدخانی | متخصص و جراح زیبایی بینی',
    description: 'سامانه نوبت‌دهی و مشاوره آنلاین جراحی زیبایی بینی دکتر علی محمدخانی (تهران، خیابان شریعتی)',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css" />
      </head>
      <body className="min-h-screen bg-[#FAFCFF] text-slate-900 antialiased selection:bg-amber-100 selection:text-amber-900">
        {children}
      </body>
    </html>
  );
}

