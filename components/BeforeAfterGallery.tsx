'use client';

import React, { useState, useRef, useCallback } from 'react';
import { 
  Sparkles, 
  ArrowLeftRight, 
  Calendar, 
  Check, 
  User, 
  Filter
} from 'lucide-react';

interface BeforeAfterItem {
  id: string;
  category: 'bony' | 'fleshy' | 'revision' | 'deviation';
  categoryLabel: string;
  title: string;
  patientInfo: string;
  postOpDuration: string;
  surgeryStyle: string;
  beforeImg: string;
  afterImg: string;
  description: string;
}

const galleryData: BeforeAfterItem[] = [
  {
    id: 'case-1',
    category: 'bony',
    categoryLabel: 'بینی استخوانی',
    title: 'رینوپلاستی طبیعی بینی استخوانی با قوز شدید',
    patientInfo: 'خانم ۲۶ ساله',
    postOpDuration: '۸ ماه پس از عمل',
    surgeryStyle: 'فرم طبیعی با قوس بسیار ملایم',
    beforeImg: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    afterImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    description: 'برداشتن قوز استخوانی، جمع شدن زاویه نوک بینی متناسب با چهره و رفع انحراف داخلی با بهبود ۱۰۰٪ تنفس.',
  },
  {
    id: 'case-2',
    category: 'fleshy',
    categoryLabel: 'بینی گوشتی',
    title: 'رینوپلاستی تقویتی بینی گوشتی با پوست ضخیم',
    patientInfo: 'خانم ۲۹ ساله',
    postOpDuration: '۱ سال پس از عمل',
    surgeryStyle: 'نیمه‌فانتزی استاندارد',
    beforeImg: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    afterImg: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    description: 'تقویت پایه غضروفی برای جلوگیری از افتادگی نوک بینی گوشتی، نازک‌سازی لایه چربی و قرینه‌سازی سوراخ‌های بینی.',
  },
  {
    id: 'case-3',
    category: 'revision',
    categoryLabel: 'رینوپلاستی ترمیمی',
    title: 'ترمیم بینی پس از عمل ناموفق ۵ سال پیش',
    patientInfo: 'آقا ۳۴ ساله',
    postOpDuration: '۱۴ ماه پس از عمل ثانویه',
    surgeryStyle: 'بازسازی طبیعی و مردانه',
    beforeImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    afterImg: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    description: 'پیوند غضروف گوش جهت ترمیم فرورفتگی سمت چپ، رفع کجی محور بینی و بازگرداندن تنفس عمیق ورزشی.',
  },
  {
    id: 'case-4',
    category: 'deviation',
    categoryLabel: 'انحراف شدید و پولیپ',
    title: 'سپتورینوپلاستی انحراف شدید خارجی و داخلی',
    patientInfo: 'آقا ۲۸ ساله',
    postOpDuration: '۶ ماه پس از عمل',
    surgeryStyle: 'طبیعی بدون قوس زنانه',
    beforeImg: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80',
    afterImg: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
    description: 'اصلاح ترومای قدیمی بینی ناشی از ضربه، صاف کردن تیغه سپتوم و تقارن کامل سوراخ‌ها در نمای زیرین.',
  },
];

// Interactive slider card component
const ComparisonSlider: React.FC<{ item: BeforeAfterItem; onBook: () => void }> = ({ item, onBook }) => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) {
      handleMove(e.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-md hover:shadow-xl transition-all flex flex-col justify-between">
      {/* Visual Comparison Area */}
      <div 
        ref={containerRef}
        className="relative h-80 sm:h-96 w-full select-none overflow-hidden bg-slate-900 cursor-ew-resize group"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* AFTER Image (Full background) */}
        <img
          src={item.afterImg}
          alt={`بعد از عمل ${item.title}`}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        <div className="absolute top-3 left-3 bg-[#0B2545]/85 text-white text-[11px] font-bold px-3 py-1 rounded-full backdrop-blur-xs shadow-xs pointer-events-none z-10">
          نتیجه بعد از عمل
        </div>

        {/* BEFORE Image (Clipped using CSS clipPath) */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
        >
          <img
            src={item.beforeImg}
            alt={`قبل از عمل ${item.title}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 right-3 bg-slate-900/85 text-white text-[11px] font-bold px-3 py-1 rounded-full backdrop-blur-xs shadow-xs pointer-events-none">
            قبل از عمل
          </div>
        </div>

        {/* Draggable Divider Handle Line */}
        <div 
          className="absolute inset-y-0 w-1 bg-white shadow-xl z-20 flex items-center justify-center pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="w-8 h-8 rounded-full bg-white text-[#0B2545] shadow-lg flex items-center justify-center border-2 border-[#0B2545]">
            <ArrowLeftRight className="w-4 h-4" />
          </div>
        </div>

        {/* Floating Hint Helper */}
        <div className="absolute bottom-3 inset-x-0 mx-auto w-fit bg-black/60 backdrop-blur-xs text-white text-[11px] px-3 py-1 rounded-full pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
          دسته وسط را به چپ یا راست بکشید
        </div>
      </div>

      {/* Case Details */}
      <div className="p-6 space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#0D5C75] bg-sky-50 px-2.5 py-1 rounded-lg">
              {item.categoryLabel}
            </span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              {item.postOpDuration}
            </span>
          </div>

          <h3 className="text-base font-bold text-slate-900 leading-snug">
            {item.title}
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl">
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-slate-400" />
            <span>{item.patientInfo}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{item.surgeryStyle}</span>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          {item.description}
        </p>

        <button
          onClick={onBook}
          className="w-full flex items-center justify-center gap-2 text-xs font-bold text-[#0B2545] hover:text-white bg-slate-100 hover:bg-[#0B2545] py-2.5 rounded-xl transition-colors"
        >
          <Calendar className="w-3.5 h-3.5 text-amber-500" />
          <span>مشاوره برای مدل مشابه این پرونده</span>
        </button>
      </div>
    </div>
  );
};

export const BeforeAfterGallery: React.FC<{ onBookConsultation: () => void }> = ({ onBookConsultation }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'همه نمونه‌ها' },
    { id: 'bony', label: 'بینی استخوانی' },
    { id: 'fleshy', label: 'بینی گوشتی' },
    { id: 'revision', label: 'رینوپلاستی ترمیمی' },
    { id: 'deviation', label: 'انحراف شدید' },
  ];

  const filteredItems = selectedCategory === 'all' 
    ? galleryData 
    : galleryData.filter(item => item.category === selectedCategory);

  return (
    <section id="gallery" className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold text-[#0D5C75] bg-sky-50 border border-sky-200/80 px-3.5 py-1.5 rounded-full inline-block mb-3">
            گالری نتایج جراحی
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            مقایسه هوشمند قبل و بعد رینوپلاستی
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            تمامی عکس‌ها با اجازه رسمی بیماران و بدون روتوش فتوشاپ یا فیلترهای گمراه‌کننده منتشر شده‌اند.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#0B2545] text-white shadow-md shadow-[#0B2545]/20'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200/70'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredItems.map((item) => (
            <ComparisonSlider key={item.id} item={item} onBook={onBookConsultation} />
          ))}
        </div>

        {/* Bottom Callout */}
        <div className="mt-14 bg-linear-to-r from-[#0B2545] to-[#0D5C75] rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center md:text-right">
            <h4 className="text-xl font-bold text-white">آیا از فرم و تنفس بینی خود رضایت ندارید؟</h4>
            <p className="text-xs sm:text-sm text-slate-200 max-w-xl">
              همین حالا تصاویر ۳ زاویه بینی خود را بارگذاری کنید تا دکتر علی محمدخانی به صورت رایگان کاندیداتوری شما را ارزیابی کنند.
            </p>
          </div>
          <button
            onClick={onBookConsultation}
            className="shrink-0 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-sm px-6 py-3 rounded-xl shadow-lg transition-all"
          >
            بارگذاری عکس و ارزیابی آنلاین
          </button>
        </div>

      </div>
    </section>
  );
};
