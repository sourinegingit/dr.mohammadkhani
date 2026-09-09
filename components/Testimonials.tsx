'use client';

import React from 'react';
import { Star, ShieldCheck, Quote, CheckCircle2 } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      id: 1,
      name: 'مهناز شریفی',
      surgeryType: 'رینوپلاستی استخوانی طبیعی',
      date: '۳ ماه پس از عمل',
      comment: 'بزرگترین نگرانی من تنفس بعد از عمل و فرم بیش از حد سربالا بود. الان ۳ ماه گذشته، فرم بینی کاملاً طبیعی و متناسب با صورتمه و تنفسم حتی از قبل عمل هم بهتر و سبک‌تر شده. دکتر محمدخانی فوق‌العاده باحوصله و خوش‌اخلاق هستند.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    },
    {
      id: 2,
      name: 'امیررضا کاظمیان',
      surgeryType: 'سپتورینوپلاستی انحراف شدید و پولیپ',
      date: '۶ ماه پس از عمل',
      comment: 'سال‌ها به خاطر انحراف شدید تیغه و گرفتگی یک‌طرفه با دهان باز می‌خوابیدم و سردرد داشتم. آقای دکتر هم انحراف کج ظاهری رو کاملاً صاف کردند و هم مسیر تنفس من باز شد. سپاسگزار هنر و تعهد ایشان و کادر کلینیک هستم.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    },
    {
      id: 3,
      name: 'نیلوفر برومند',
      surgeryType: 'رینوپلاستی ترمیمی (عمل ثانویه)',
      date: '۱ سال پس از ترمیم',
      comment: 'بعد از عمل اولم با یک پزشک دیگر، غضروف سمت چپم فرورفته بود و واقعاً افسرده شده بودم. دکتر محمدخانی با پیوند غضروف فرم بینی‌ام رو نجات دادند. روند پیگیری بعد از عمل در مطب ایشان فوق‌العاده منظم و اطمینان‌بخش بود.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-[#FAFCFF] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-[#0D5C75] bg-sky-50 border border-sky-200/80 px-3.5 py-1.5 rounded-full inline-block mb-3">
            تجربه مراجعین محترم
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            نظرات و میزان رضایت بیماران
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            بزرگ‌ترین سرمایه مطب دکتر علی محمدخانی (خیابان شریعتی)، لبخند رضایت و اعتماد بیماران پس از جراحی است.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-7 h-7 text-slate-200" />
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-6 font-normal">
                  «{rev.comment}»
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-11 h-11 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
                    {rev.name}
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <div className="text-[11px] text-[#0D5C75] font-medium">
                    {rev.surgeryType}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {rev.date}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust highlights row */}
        <div className="mt-12 bg-white rounded-2xl p-5 border border-slate-200 shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>ویزیت‌های منظم رایگان تا یک سال پس از عمل</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>آموزش تخصصی نحوه صحیح چسب زدن بینی</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>پشتیبانی شبانه‌روزی پرستاری در هفته اول</span>
          </div>
        </div>

      </div>
    </section>
  );
};
