'use client';

import React, { useState } from 'react';
import { 
  Phone, 
  Calendar, 
  Search, 
  UserCheck, 
  Menu, 
  X, 
  Sparkles,
  ShieldCheck,
  Stethoscope
} from 'lucide-react';

interface NavbarProps {
  onOpenConsultation: () => void;
  onOpenTracker: () => void;
  onOpenAdmin: () => void;
  activeTab?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenConsultation,
  onOpenTracker,
  onOpenAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top emergency / quick contact bar */}
      <div className="bg-[#0B2545] text-slate-100 text-xs py-2 px-4 border-b border-[#134074]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-amber-300 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              بورد تخصصی گوش، حلق و بینی | نظام پزشکی: ۱۰۴۸۲۳
            </span>
            <span className="hidden md:inline text-slate-300">|</span>
            <span className="hidden md:inline text-slate-300">
              ساعات پاسخگویی مطب: شنبه تا چهارشنبه ۱۵ الی ۲۰
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="tel:02188889999" 
              className="flex items-center gap-1.5 hover:text-amber-300 transition-colors"
              dir="ltr"
            >
              <span>۰۲۱-۸۸۸۸۹۹۹۹</span>
              <Phone className="w-3.5 h-3.5 text-amber-300" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Doctor Title */}
          <div 
            onClick={() => scrollToSection('hero')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-[#0B2545] to-[#0D5C75] text-white flex items-center justify-center shadow-md shadow-[#0B2545]/20 group-hover:scale-105 transition-transform">
              <Stethoscope className="w-6 h-6 text-amber-300" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-slate-900 tracking-tight">
                  دکتر علی محمدخانی
                </span>
                <span className="text-[11px] font-semibold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full border border-amber-200">
                  فلوشیپ رینوپلاستی
                </span>
              </div>
              <span className="text-xs text-slate-500 font-normal">
                جراح و متخصص گوش، حلق و بینی | زیبایی و ترمیم بینی
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-700">
            <button 
              onClick={() => scrollToSection('hero')} 
              className="hover:text-[#0B2545] transition-colors py-2"
            >
              صفحه اصلی
            </button>
            <button 
              onClick={() => scrollToSection('doctor-bio')} 
              className="hover:text-[#0B2545] transition-colors py-2"
            >
              معرفی پزشک
            </button>
            <button 
              onClick={() => scrollToSection('services')} 
              className="hover:text-[#0B2545] transition-colors py-2"
            >
              خدمات تخصصی
            </button>
            <button 
              onClick={() => scrollToSection('gallery')} 
              className="hover:text-[#0B2545] transition-colors py-2"
            >
              گالری قبل و بعد
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')} 
              className="hover:text-[#0B2545] transition-colors py-2"
            >
              رضایت مراجعین
            </button>
            <button 
              onClick={onOpenTracker} 
              className="flex items-center gap-1.5 text-slate-700 hover:text-[#0D5C75] transition-colors py-2 px-3 rounded-lg hover:bg-slate-100"
            >
              <Search className="w-4 h-4 text-[#0D5C75]" />
              <span>پیگیری نوبت</span>
            </button>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 px-3 py-2 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all"
              title="پنل پزشک و منشی مطب"
            >
              <UserCheck className="w-3.5 h-3.5 text-slate-500" />
              <span>ورود همکاران</span>
            </button>

            <button
              onClick={onOpenConsultation}
              className="relative group overflow-hidden flex items-center gap-2 bg-linear-to-r from-[#0B2545] via-[#0D5C75] to-[#0B2545] bg-size-200 hover:bg-right text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-md shadow-[#0B2545]/25 hover:shadow-lg transition-all active:scale-98"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-300"></span>
              </span>
              <Calendar className="w-4 h-4" />
              <span>مشاوره و نوبت آنلاین</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenConsultation}
              className="flex items-center gap-1 bg-[#0B2545] text-white text-xs font-semibold px-3 py-2 rounded-lg"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>نوبت‌دهی</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100"
              aria-label="منو"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-1 gap-1 text-sm font-medium text-slate-800">
            <button 
              onClick={() => scrollToSection('hero')} 
              className="w-full text-right py-2.5 px-3 rounded-lg hover:bg-slate-50"
            >
              صفحه اصلی
            </button>
            <button 
              onClick={() => scrollToSection('doctor-bio')} 
              className="w-full text-right py-2.5 px-3 rounded-lg hover:bg-slate-50"
            >
              معرفی دکتر علی محمدخانی
            </button>
            <button 
              onClick={() => scrollToSection('services')} 
              className="w-full text-right py-2.5 px-3 rounded-lg hover:bg-slate-50"
            >
              خدمات رینوپلاستی و جراحی
            </button>
            <button 
              onClick={() => scrollToSection('gallery')} 
              className="w-full text-right py-2.5 px-3 rounded-lg hover:bg-slate-50"
            >
              گالری مقایسه قبل و بعد
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')} 
              className="w-full text-right py-2.5 px-3 rounded-lg hover:bg-slate-50"
            >
              نظرات بیماران
            </button>
            <button 
              onClick={() => { setMobileMenuOpen(false); onOpenTracker(); }} 
              className="w-full text-right flex items-center justify-between py-2.5 px-3 rounded-lg bg-slate-50 text-[#0D5C75]"
            >
              <span className="flex items-center gap-2">
                <Search className="w-4 h-4" />
                پیگیری وضعیت نوبت و پرونده
              </span>
              <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                کد رهگیری
              </span>
            </button>
            <button 
              onClick={() => { setMobileMenuOpen(false); onOpenAdmin(); }} 
              className="w-full text-right flex items-center gap-2 py-2.5 px-3 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              <UserCheck className="w-4 h-4" />
              ورود به پنل پزشک و منشی
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenConsultation(); }}
              className="w-full flex items-center justify-center gap-2 bg-[#0B2545] text-white py-3 rounded-xl font-bold shadow-md"
            >
              <Calendar className="w-4 h-4 text-amber-300" />
              درخواست مشاوره آنلاین و بارگذاری عکس
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
