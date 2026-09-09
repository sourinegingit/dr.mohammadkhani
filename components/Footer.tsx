'use client';

import React from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  ShieldCheck, 
  Calendar, 
  Search, 
  UserCheck, 
  Stethoscope, 
  ArrowUp
} from 'lucide-react';

interface FooterProps {
  onOpenConsultation: () => void;
  onOpenTracker: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenConsultation,
  onOpenTracker,
  onOpenAdmin,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B2545] text-slate-300 pt-16 pb-12 border-t border-[#134074]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Doctor Identity (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#0D5C75] text-white flex items-center justify-center shadow-md">
                <Stethoscope className="w-6 h-6 text-amber-300" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  دکتر علی محمدخانی
                </h3>
                <span className="text-xs text-slate-300">
                  متخصص گوش، حلق و بینی | جراح زیبایی و پلاستیک بینی
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              مرکز تخصصی رینوپلاستی و جراحی‌های زیبایی و درمانی بینی دکتر علی محمدخانی در خیابان شریعتی تهران. رویکرد ما در جراحی بینی، برقراری هارمونی چشم‌نواز با چهره متناسب با استانداردهای مدرن علمی و حفظ کامل تنفس است.
            </p>

            <div className="flex items-center gap-3 pt-2">
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-amber-400 hover:text-slate-950 text-white flex items-center justify-center transition-colors text-xs font-bold"
                title="اینستاگرام"
              >
                IG
              </a>
              {/* WhatsApp */}
              <a
                href="https://wa.me/989123456789"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-emerald-500 hover:text-white text-white flex items-center justify-center transition-colors text-xs font-bold"
                title="واتس‌اپ"
              >
                WA
              </a>
              {/* Telegram */}
              <a
                href="https://telegram.org"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-sky-500 hover:text-white text-white flex items-center justify-center transition-colors text-xs font-bold"
                title="تلگرام"
              >
                TG
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white border-b border-white/15 pb-2">
              دسترسی سریع
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={onOpenConsultation} className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  مشاوره و نوبت آنلاین
                </button>
              </li>
              <li>
                <button onClick={onOpenTracker} className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <Search className="w-3.5 h-3.5 text-amber-400" />
                  پیگیری وضعیت نوبت
                </button>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-300 transition-colors">
                  خدمات رینوپلاستی
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-amber-300 transition-colors">
                  گالری قبل و بعد
                </a>
              </li>
              <li>
                <a href="#doctor-bio" className="hover:text-amber-300 transition-colors">
                  سوابق و مدارک پزشک
                </a>
              </li>
              <li>
                <button onClick={onOpenAdmin} className="hover:text-amber-300 transition-colors flex items-center gap-1.5 text-slate-400">
                  <UserCheck className="w-3.5 h-3.5" />
                  ورود پزشک / منشی
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Clinic Contact & Hours (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white border-b border-white/15 pb-2">
              اطلاعات مطب و تماس
            </h4>
            
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  تهران، خیابان شریعتی، بالاتر از میرداماد، روبروی بیمارستان ایرانمهر، ساختمان پزشکان، طبقه ۴، واحد ۱۶
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>شنبه تا چهارشنبه: ۱۵:۰۰ الی ۲۰:۰۰</span>
              </div>

              <div className="flex items-center gap-2" dir="ltr">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="tel:02188889999" className="hover:text-white transition-colors">
                  ۰۲۱-۸۸۸۸۹۹۹۹
                </a>
                <span>/</span>
                <a href="tel:09123456789" className="hover:text-white transition-colors">
                  ۰۹۱۲۳۴۵۶۷۸۹
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: Interactive Map Card (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white border-b border-white/15 pb-2">
              موقعیت مکانی کلینیک
            </h4>
            
            {/* Stylized Clinic Map Card */}
            <div className="relative h-32 rounded-2xl overflow-hidden bg-slate-800 border border-white/15 group">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-70 group-hover:scale-105 transition-transform"
                style={{
                  backgroundImage: 'radial-gradient(#1e3a5f 1px, transparent 1px), radial-gradient(#1e3a5f 1px, #0f172a 1px)',
                  backgroundSize: '20px 20px',
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center bg-black/40 backdrop-blur-2xs">
                <div className="w-7 h-7 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg mb-1 animate-bounce">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-white">خیابان شریعتی - روبروی بیمارستان ایرانمهر</span>
                <span className="text-[10px] text-slate-300">مسیریابی در بلد، نشان و گوگل‌مپ</span>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 flex items-center justify-between">
              <span>پارکینگ اختصاصی مراجعین</span>
              <span className="text-emerald-400">دارای آسانسور پزشکی</span>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>
              شماره پروانه مطب و نظام پزشکی: ۱۰۴۸۲۳ • تمامی حقوق محفوظ و متعلق به مطب دکتر علی محمدخانی (شریعتی) است.
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-colors"
          >
            <span>بازگشت به بالا</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
