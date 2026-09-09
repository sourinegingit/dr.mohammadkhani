'use client';

import React from 'react';
import { 
  Sparkles, 
  Wind, 
  Repeat, 
  Activity, 
  Layers, 
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';

interface ServicesProps {
  onSelectService: (serviceName: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const services = [
    {
      id: 'bony-rhino',
      title: 'رینوپلاستی بینی استخوانی',
      subtitle: 'اصلاح قوز بینی و فرم‌دهی قوس طبیعی',
      description: 'مناسب برای افرادی با قوز استخوانی، انحراف ظاهری یا پوست نازک تا متوسط. نتایج حاصل از این جراحی با تقارن بالا و خطوط کانتورینگ بسیار شفاف و زیبا خواهد بود.',
      icon: Layers,
      features: [
        'برداشتن میلی‌متری قوز بدون تخریب خطوط طبیعی',
        'زاویه‌سازی دقیق نوک بینی متناسب با لب و چانه',
        'دوران نقاهت کوتاه‌تر و تورم کمتر',
        'حفظ استقامت اسکلت استخوانی بینی'
      ],
      tag: 'محبوب‌ترین',
    },
    {
      id: 'fleshy-rhino',
      title: 'رینوپلاستی بینی گوشتی',
      subtitle: 'تقویت غضروفی و اصلاح پوست ضخیم',
      description: 'رویکرد مدرن بینی‌های گوشتی بر مبنای تقویت اسکلت غضروفی نوک بینی و فرم‌دهی ماندگار بنا شده است تا مانع از بازگشت یا افتادگی نوک بینی در سال‌های بعد شود.',
      icon: Sparkles,
      features: [
        'تکنیک‌های تقویت غضروفی (Cartilage Grafting)',
        'نازک‌سازی ایمن و کنترل‌شده لایه چربی پوست',
        'جلوگیری از گردی و افتادگی نوک بینی در درازمدت',
        'طراحی متناسب برای آقایان و بانوان'
      ],
      tag: 'تکنیک پیشرفته',
    },
    {
      id: 'revision-rhino',
      title: 'رینوپلاستی ترمیمی (ثانویه)',
      subtitle: 'اصلاح نواقص جراحی‌های ناموفق قبلی',
      description: 'یکی از پیچیده‌ترین شاخه‌های جراحی بینی جهت اصلاح مشکلات ظاهری ناشی از عمل قبلی و بازسازی تیغه و غضروف‌های از دست رفته با پیوند غضروف گوش یا دنده.',
      icon: Repeat,
      features: [
        'بازسازی ساختار تخریب شده بینی در عمل اول',
        'استفاده از گرافت گوش یا دنده (بدون اسکار مشهود)',
        'رفع فرورفتگی‌ها و عدم قرینگی‌های آزاردهنده',
        'بهبود توامان فرم زیبایی و تنفس آسیب‌دیده'
      ],
      tag: 'فوق تخصصی',
    },
    {
      id: 'septoplasty',
      title: 'سپتوپلاستی و پولیپ بینی',
      subtitle: 'اصلاح انحراف تیغه بینی و بهبود کامل تنفس',
      description: 'انحراف سپتوم داخلی و پولیپ‌ها عامل اصلی گرفتگی تنفس، سردردهای مزمن، خروپف و خواب ناآرام هستند. این عمل به صورت همزمان با جراحی زیبایی یا جداگانه انجام می‌شود.',
      icon: Wind,
      features: [
        'صاف کردن تیغه منحرف داخلی بدون تغییر منفی در ظاهر',
        'خارج‌سازی پولیپ‌های سینوسی با آندوسکوپ پیشرفته',
        'رفع خشکی دهان، خروپف شبانه و آپنه خواب',
        'امکان جراحی همزمان سپتورینوپلاستی در یک بیهوشی'
      ],
      tag: 'درمانی و فانکشنال',
    },
    {
      id: 'functional-ent',
      title: 'جراحی آندوسکوپی سینوس (FESS)',
      subtitle: 'درمان سینوزیت‌های مزمن و مقاوم به دارو',
      description: 'با بزرگ‌نمایی میکروسکوپی و تصویربرداری آندوسکوپیک، دهانه سینوس‌های گرفته باز شده و تنفس سبک و عاری از ترشحات و آلرژی برای بیمار فراهم می‌گردد.',
      icon: Activity,
      features: [
        'بدون هیچ‌گونه برش خارجی روی صورت',
        'تخلیه عفونت‌های قدیمی و بافت‌های التهابی',
        'بهبود حس بویایی و سردردهای پیشانی و سینوسی',
        'امکان ترخیص در همان روز'
      ],
      tag: 'میکروسکوپیک',
    },
  ];

  return (
    <section id="services" className="py-20 bg-[#FAFCFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-[#0D5C75] bg-sky-50 border border-sky-200/80 px-3.5 py-1.5 rounded-full inline-block mb-3">
            خدمات تخصصی کلینیک
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            روش‌های جراحی زیبایی و درمانی بینی
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            تمامی جراحی‌ها با ارزیابی دقیق ساختار آناتومیک و شبیه‌سازی دیجیتال قبل از اقدام برنامه‌ریزی می‌شوند.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((srv) => {
            const IconComponent = srv.icon;
            return (
              <div 
                key={srv.id}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 hover:border-[#0D5C75] shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200/80 text-[#0B2545] flex items-center justify-center group-hover:bg-[#0B2545] group-hover:text-white transition-colors">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full group-hover:bg-amber-100 group-hover:text-amber-900 transition-colors">
                      {srv.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-[#0B2545] transition-colors">
                    {srv.title}
                  </h3>
                  <div className="text-xs font-medium text-[#0D5C75] mb-3">
                    {srv.subtitle}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-5">
                    {srv.description}
                  </p>

                  <div className="space-y-2 border-t border-slate-100 pt-4 mb-6">
                    {srv.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onSelectService(srv.title)}
                  className="w-full flex items-center justify-center gap-2 text-xs font-bold text-[#0B2545] bg-slate-50 hover:bg-[#0B2545] hover:text-white py-2.5 rounded-xl border border-slate-200 transition-all"
                >
                  <span>ثبت درخواست نوبت برای این خدمت</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
