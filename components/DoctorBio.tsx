'use client';

import React from 'react';
import { 
  GraduationCap, 
  Award, 
  BookOpen, 
  HeartHandshake, 
  CheckCircle,
  FileCheck2
} from 'lucide-react';

export const DoctorBio: React.FC = () => {
  return (
    <section id="doctor-bio" className="py-20 bg-white border-y border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-[#0D5C75] bg-sky-50 border border-sky-200/80 px-3.5 py-1.5 rounded-full inline-block mb-3">
            سوابق آکادمیک و مدارک بالینی
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            درباره دکتر علی محمدخانی
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            بیش از ۱۵ سال تمرکز اختصاصی بر جراحی پلاستیک و ترمیمی بینی، با بهره‌گیری از آخرین دستاوردهای آکادمی جراحان بینی اروپا و آمریکا.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Certificates & Achievements Grid */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="bg-[#FAFCFF] p-6 rounded-2xl border border-slate-200/80 shadow-xs">
              <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[#0D5C75]" />
                مدارک و مراتب علمی
              </h3>
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    فارغ‌التحصیل دوره پزشکی عمومی و دوره تخصصی جراحی گوش، گلو و بینی از دانشگاه علوم پزشکی شهید بهشتی تهران با رتبه ممتاز بورد ناسیونال.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    گواهینامه فلوشیپ تخصصی رینوپلاستی و بازسازی غضروفی چهره از آکادمی جراحان پلاستیک صورت اروپا (EAFPS).
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    عضو رسمی انجمن جراحان گوش، حلق و بینی و سر و گردن ایران.
                  </span>
                </li>
              </ul>
            </div>

            {/* Philosophy Box */}
            <div className="bg-linear-to-br from-[#0B2545]/5 to-transparent p-6 rounded-2xl border border-[#0B2545]/15">
              <h3 className="text-lg font-bold text-[#0B2545] mb-2 flex items-center gap-2">
                <HeartHandshake className="w-5 h-5 text-[#0B2545]" />
                دیدگاه و فلسفه جراحی
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                «بینی تنها یک عضو زیبایی نیست، بلکه دروازه اصلی تنفس بدن است. باور من بر این است که یک عمل رینوپلاستی موفق، عملی است که در آن علاوه بر دستیابی به زیباترین زاویه و تقارن متناسب با گونه‌ها و لب‌های فرد، کوچک‌ترین اختلالی در تنفس طبیعی و خواب راحت بیمار ایجاد نشود. ما از روش‌های سنتی تخریبی پرهیز کرده و با رویکرد Preservation ساختار طبیعی بینی را تقویت و ماندگار می‌کنیم.»
              </p>
            </div>

            {/* Honors badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-center shadow-xs">
                <FileCheck2 className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                <div className="text-xs font-bold text-slate-900">+۲۵ مقاله علمی</div>
                <div className="text-[10px] text-slate-500">در ژورنال‌های PubMed</div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-center shadow-xs">
                <Award className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                <div className="text-xs font-bold text-slate-900">سخنران کنگره‌ها</div>
                <div className="text-[10px] text-slate-500">همایش‌های سالانه راینولوژی</div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-center shadow-xs col-span-2 sm:col-span-1">
                <BookOpen className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                <div className="text-xs font-bold text-slate-900">مدرس دوره‌های رینو</div>
                <div className="text-[10px] text-slate-500">کارگاه‌های تکنیک بسته و باز</div>
              </div>
            </div>

          </div>

          {/* Left Column (Academic Visual Card) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl bg-linear-to-b from-slate-900 to-[#0B2545] p-6 text-white shadow-2xl overflow-hidden">
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#0D5C75]/40 rounded-full blur-2xl" />
              
              <div className="relative space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/15">
                  <div>
                    <span className="text-xs text-amber-300 font-semibold tracking-wider">
                      CLINICAL EXCELLENCE
                    </span>
                    <h4 className="text-xl font-bold mt-0.5">استانداردهای جراحی مطب</h4>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Award className="w-5 h-5 text-amber-300" />
                  </div>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-slate-200">
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                    <div className="font-bold text-white mb-1">طراحی دیجیتال سه‌بعدی پیش از عمل</div>
                    <div className="text-slate-300 text-xs leading-relaxed">
                      شبیه‌سازی دقیق و سنجش زاویه نازولابیال و پل بینی برای دستیابی به تفاهم کامل بیمار و پزشک.
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                    <div className="font-bold text-white mb-1">جراحی در مراکز معتبر با استانداردهای بین‌المللی</div>
                    <div className="text-slate-300 text-xs leading-relaxed">
                      همکاری منحصربه‌فرد با برترین بیمارستان‌های فوق‌تخصصی تهران و تیم مجرب بیهوشی.
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                    <div className="font-bold text-white mb-1">پیگیری مستمر پس از عمل تا یک سال</div>
                    <div className="text-slate-300 text-xs leading-relaxed">
                      ویزیت‌های منظم، تعویض چسب تخصصی، بررسی روند ترمیم بافت‌ها و پشتیبانی مستقیم.
                    </div>
                  </div>
                </div>

                <div className="pt-2 text-center text-xs text-amber-200/80">
                  شماره نظام پزشکی معتبر: ۱۰۴۸۲۳ • تاییدیه وزارت بهداشت و درمان
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
