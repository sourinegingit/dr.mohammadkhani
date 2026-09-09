'use client';

import React from 'react';
import { 
  CheckCircle2, 
  Calendar, 
  Sparkles, 
  Search, 
  ShieldCheck, 
  Clock, 
  Star,
  Award,
  ArrowDownLeft
} from 'lucide-react';

interface HeroProps {
  onOpenConsultation: () => void;
  onOpenTracker: () => void;
  onScrollToGallery: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenConsultation,
  onOpenTracker,
  onScrollToGallery,
}) => {
  return (
    <section id="hero" className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-linear-to-b from-white via-slate-50/50 to-[#FAFCFF]">
      {/* Decorative subtle medical background elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-amber-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Right Column (Text & Main CTA in RTL) */}
          <div className="lg:col-span-7 space-y-7">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 bg-slate-100/90 hover:bg-slate-200/80 transition-colors border border-slate-200/80 px-4 py-1.5 rounded-full text-xs font-semibold text-slate-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>پذیرش پرونده‌های مشاوره آنلاین رینوپلاستی</span>
              <span className="text-slate-400">|</span>
              <span className="text-[#0D5C75] flex items-center gap-1 font-bold">
                <Award className="w-3.5 h-3.5" />
                بورد تخصصی ENT
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-[1.3] lg:leading-[1.25] tracking-tight">
              تلفیق علم، تقارن و ظرافت در{' '}
              <span className="bg-linear-to-l from-[#0B2545] to-[#0D5C75] bg-clip-text text-transparent">
                جراحی زیبایی بینی
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
              دکتر علی محمدخانی؛ متخصص گوش، حلق و بینی و جراح زیبایی بینی با رویکرد مدرن Preservation Rhinoplasty. تمرکز بر فرم متناسب با هارمونی طبیعی صورت، بدون افتادگی در گذر زمان و همراه با تضمین سلامت تنفس (مطب تهران، خیابان شریعتی).
            </p>

            {/* Key feature pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>طراحی طبیعی و ماندگار</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>حفظ حداکثری عملکرد تنفس</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-xs col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>بررسی تخصصی ۳ زاویه آنلاین</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onOpenConsultation}
                className="flex items-center justify-center gap-2.5 bg-[#0B2545] hover:bg-[#134074] text-white font-bold text-base px-7 py-3.5 rounded-2xl shadow-lg shadow-[#0B2545]/20 hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Calendar className="w-5 h-5 text-amber-300" />
                <span>مشاوره آنلاین و دریافت نوبت</span>
                <ArrowDownLeft className="w-4 h-4 text-slate-300" />
              </button>

              <button
                onClick={onScrollToGallery}
                className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm px-6 py-3.5 rounded-2xl border border-slate-300 shadow-xs hover:border-slate-400 transition-all"
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>مشاهده گالری قبل و بعد</span>
              </button>

              <button
                onClick={onOpenTracker}
                className="flex items-center justify-center gap-1.5 text-xs text-[#0D5C75] hover:text-[#0B2545] font-semibold py-2 px-3 underline decoration-slate-300 underline-offset-4"
              >
                <Search className="w-4 h-4" />
                <span>پیگیری نوبت قبلی</span>
              </button>
            </div>

            {/* Stats row */}
            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 max-w-lg">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  +۱۵ <span className="text-sm font-bold text-amber-600">سال</span>
                </div>
                <div className="text-xs text-slate-500 mt-0.5">تجربه جراحی رینوپلاستی</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  +۵٬۲۰۰
                </div>
                <div className="text-xs text-slate-500 mt-0.5">عمل موفق و رضایت‌بخش</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-1">
                  ۹۸.۸٪
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400 inline" />
                </div>
                <div className="text-xs text-slate-500 mt-0.5">شاخص رضایت مراجعین</div>
              </div>
            </div>
          </div>

          {/* Left Column (Visual Card & Doctor Profile in RTL) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Card Container */}
              <div className="relative rounded-3xl overflow-hidden bg-linear-to-b from-white to-slate-100 p-2 sm:p-3 border border-slate-200 shadow-xl">
                {/* Doctor Portrait Image */}
                <div className="relative h-96 sm:h-[420px] rounded-2xl overflow-hidden bg-slate-200">
                  <img
                    src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=900&q=85"
                    alt="دکتر علی محمدخانی - جراح بینی"
                    className="w-full h-full object-cover object-top"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-[#0B2545]/90 via-[#0B2545]/20 to-transparent" />
                  
                  {/* Doctor badge on photo */}
                  <div className="absolute bottom-4 right-4 left-4 text-white p-4 rounded-xl bg-black/40 backdrop-blur-md border border-white/15">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-base font-bold flex items-center gap-1.5">
                          دکتر علی محمدخانی
                          <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        </div>
                        <div className="text-xs text-slate-300">
                          عضو آکادمی جراحان پلاستیک صورت اروپا (EAFPS)
                        </div>
                      </div>
                      <span className="text-[11px] bg-amber-400/20 text-amber-200 border border-amber-400/30 px-2.5 py-1 rounded-full font-medium">
                        جراح برتر
                      </span>
                    </div>
                  </div>
                </div>

                {/* Floating Consultation Teaser Card */}
                <div 
                  onClick={onOpenConsultation}
                  className="mt-3 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-[#0D5C75] cursor-pointer transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-[#0D5C75] transition-colors">
                          مشاوره غیرحضوری و ارزیابی عکس‌ها
                        </div>
                        <div className="text-[11px] text-slate-500">
                          بررسی اولیه توسط پزشک در کمتر از ۲۴ ساعت
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#0B2545] bg-slate-100 group-hover:bg-[#0B2545] group-hover:text-white transition-colors px-3 py-1.5 rounded-lg">
                      شروع فرم
                    </span>
                  </div>
                </div>

              </div>

              {/* Floating aesthetic credential badge */}
              <div className="absolute -top-4 -right-4 sm:-right-6 bg-white py-2 px-4 rounded-2xl shadow-lg border border-slate-100 hidden sm:flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
                  <Award className="w-4 h-4" />
                </div>
                <div className="text-right">
                  <div className="text-[11px] font-bold text-slate-900">تکنیک اختصاصی</div>
                  <div className="text-[10px] text-slate-500">حفظ ساختار طبیعی (Preservation)</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
