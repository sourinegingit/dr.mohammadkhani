'use client';

import React, { useState, useRef } from 'react';
import { 
  User, 
  Camera, 
  FileText, 
  CheckCircle2, 
  UploadCloud, 
  X, 
  Eye, 
  AlertCircle, 
  Copy, 
  Check, 
  ArrowLeft, 
  ArrowRight, 
  ShieldCheck, 
  HelpCircle,
  Sparkles,
  PhoneCall,
  Printer,
  CalendarCheck
} from 'lucide-react';
import { isValidIranianNationalId, isValidIranianPhone, formatIranianPhone, toPersianDigits } from '@/lib/validators';
import { SurgeryStyle } from '@/types/medical';

interface ConsultationFormProps {
  onSuccessTracking?: (trackingCode: string) => void;
  onClose?: () => void;
  defaultService?: string;
}

export const ConsultationForm: React.FC<ConsultationFormProps> = ({
  onSuccessTracking,
  onClose,
  defaultService,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Form State
  const [fullName, setFullName] = useState<string>('');
  const [nationalId, setNationalId] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [age, setAge] = useState<string>('26');
  const [gender, setGender] = useState<'female' | 'male'>('female');
  const [hadPreviousSurgery, setHadPreviousSurgery] = useState<boolean>(false);
  const [previousSurgeryYearsAgo, setPreviousSurgeryYearsAgo] = useState<string>('3');

  // Step 2: Photos
  const [frontalPhoto, setFrontalPhoto] = useState<string>('');
  const [profileRightPhoto, setProfileRightPhoto] = useState<string>('');
  const [profileLeftPhoto, setProfileLeftPhoto] = useState<string>('');
  const [previewModalImg, setPreviewModalImg] = useState<{ url: string; title: string } | null>(null);

  // Step 3: Medical details & expectations
  const [desiredStyle, setDesiredStyle] = useState<SurgeryStyle>('natural');
  const [breathingIssues, setBreathingIssues] = useState<string[]>([]);
  const [hasChronicDisease, setHasChronicDisease] = useState<boolean>(false);
  const [chronicDiseaseDetails, setChronicDiseaseDetails] = useState<string>('');
  const [expectations, setExpectations] = useState<string>(
    defaultService ? `درخواست بررسی جهت: ${defaultService}` : ''
  );

  // Step 4: Submission result
  const [generatedTrackingCode, setGeneratedTrackingCode] = useState<string>('');
  const [submissionDate, setSubmissionDate] = useState<string>('');

  // File input refs
  const frontalInputRef = useRef<HTMLInputElement>(null);
  const rightInputRef = useRef<HTMLInputElement>(null);
  const leftInputRef = useRef<HTMLInputElement>(null);

  // Image Upload Handler with validation
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (val: string) => void
  ) => {
    setErrorMessage('');
    const file = e.target.files?.[0];
    if (!file) return;

    // Format validation
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setErrorMessage('فرمت فایل نامعتبر است. لطفاً فقط تصویر با فرمت JPG یا PNG انتخاب کنید.');
      return;
    }

    // Size validation (< 8MB)
    if (file.size > 8 * 1024 * 1024) {
      setErrorMessage('حجم تصویر بیش از حد مجاز است (حداکثر ۸ مگابایت).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setter(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  // Quick Demo Photos Loader (for seamless testing)
  const handleLoadDemoPhotos = () => {
    setFrontalPhoto('https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80');
    setProfileRightPhoto('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80');
    setProfileLeftPhoto('https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80');
    setErrorMessage('');
  };

  // Step 1 Validation
  const validateStep1 = () => {
    setErrorMessage('');
    if (!fullName.trim() || fullName.trim().length < 3) {
      setErrorMessage('لطفاً نام و نام خانوادگی را کامل وارد نمایید.');
      return false;
    }
    if (!isValidIranianNationalId(nationalId)) {
      setErrorMessage('کد ملی ۱۰ رقمی وارد شده نامعتبر است. لطفاً دقت فرمایید.');
      return false;
    }
    if (!isValidIranianPhone(phone)) {
      setErrorMessage('شماره موبایل وارد شده نامعتبر است (مثال: ۰۹۱۲۳۴۵۶۷۸۹).');
      return false;
    }
    const ageNum = parseInt(age, 10);
    if (isNaN(ageNum) || ageNum < 16 || ageNum > 75) {
      setErrorMessage('سن مراجعه‌کننده باید بین ۱۶ تا ۷۵ سال باشد.');
      return false;
    }
    return true;
  };

  // Step 2 Validation
  const validateStep2 = () => {
    setErrorMessage('');
    if (!frontalPhoto) {
      setErrorMessage('لطفاً تصویر تمام‌رخ از روبه‌رو را بارگذاری نمایید.');
      return false;
    }
    if (!profileRightPhoto) {
      setErrorMessage('لطفاً تصویر نیم‌رخ راست را بارگذاری نمایید.');
      return false;
    }
    if (!profileLeftPhoto) {
      setErrorMessage('لطفاً تصویر نیم‌رخ چپ را بارگذاری نمایید.');
      return false;
    }
    return true;
  };

  // Step Transitions
  const handleNextStep = () => {
    if (currentStep === 1) {
      if (validateStep1()) setCurrentStep(2);
    } else if (currentStep === 2) {
      if (validateStep2()) setCurrentStep(3);
    }
  };

  const handlePrevStep = () => {
    setErrorMessage('');
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Breathing checkbox toggle
  const toggleBreathingIssue = (issue: string) => {
    if (breathingIssues.includes(issue)) {
      setBreathingIssues(breathingIssues.filter(i => i !== issue));
    } else {
      setBreathingIssues([...breathingIssues, issue]);
    }
  };

  // Final Form Submit to API
  const handleSubmit = async () => {
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const payload = {
        fullName,
        nationalId,
        phone: formatIranianPhone(phone),
        age: parseInt(age, 10),
        gender,
        hadPreviousSurgery,
        previousSurgeryYearsAgo: hadPreviousSurgery ? parseInt(previousSurgeryYearsAgo, 10) : undefined,
        desiredStyle,
        breathingIssues,
        hasChronicDiseaseOrMed: hasChronicDisease,
        chronicDiseaseDetails,
        expectations,
        photos: {
          frontal: frontalPhoto,
          profileRight: profileRightPhoto,
          profileLeft: profileLeftPhoto,
        }
      };

      const res = await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setGeneratedTrackingCode(data.trackingCode);
        setSubmissionDate(new Date().toLocaleDateString('fa-IR'));
        setCurrentStep(4);
      } else {
        setErrorMessage(data.error || 'خطایی در ثبت درخواست رخ داد.');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('ارتباط با سرور برقرار نشد. لطفاً مجدداً تلاش فرمایید.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedTrackingCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 3000);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl overflow-hidden max-w-4xl mx-auto">
      
      {/* Header Bar */}
      <div className="bg-linear-to-r from-[#0B2545] to-[#0D5C75] text-white p-6 sm:p-8 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-300 mb-1">
            <ShieldCheck className="w-4 h-4" />
            سامانه رسمی مشاوره و ارزیابی آنلاین
          </div>
          <h2 className="text-xl sm:text-2xl font-bold">
            درخواست ویزیت و مشاوره جراحی زیبایی بینی
          </h2>
          <p className="text-xs text-slate-200 mt-1">
            دکتر علیرضا آریافر - جراح و متخصص گوش، حلق و بینی
          </p>
        </div>
        {onClose && (
          <button 
            onClick={onClose}
            className="text-slate-300 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Stepper Progress Indicator */}
      <div className="bg-slate-50 border-b border-slate-200 px-4 sm:px-8 py-4">
        <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
          
          {/* Step 1 */}
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-2 py-1.5 px-2 rounded-xl transition-all ${
            currentStep === 1 
              ? 'bg-[#0B2545] text-white font-bold shadow-xs' 
              : currentStep > 1 
                ? 'text-emerald-700 font-semibold' 
                : 'text-slate-400 font-medium'
          }`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 ${
              currentStep === 1 ? 'bg-amber-400 text-slate-950 font-black' : currentStep > 1 ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
            }`}>
              {currentStep > 1 ? <Check className="w-3.5 h-3.5" /> : '۱'}
            </span>
            <span className="text-xs sm:text-sm">مشخصات فردی</span>
          </div>

          {/* Step 2 */}
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-2 py-1.5 px-2 rounded-xl transition-all ${
            currentStep === 2 
              ? 'bg-[#0B2545] text-white font-bold shadow-xs' 
              : currentStep > 2 
                ? 'text-emerald-700 font-semibold' 
                : 'text-slate-400 font-medium'
          }`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 ${
              currentStep === 2 ? 'bg-amber-400 text-slate-950 font-black' : currentStep > 2 ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
            }`}>
              {currentStep > 2 ? <Check className="w-3.5 h-3.5" /> : '۲'}
            </span>
            <span className="text-xs sm:text-sm">آپلود ۳ زاویه عکس</span>
          </div>

          {/* Step 3 */}
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-2 py-1.5 px-2 rounded-xl transition-all ${
            currentStep === 3 
              ? 'bg-[#0B2545] text-white font-bold shadow-xs' 
              : currentStep > 3 
                ? 'text-emerald-700 font-semibold' 
                : 'text-slate-400 font-medium'
          }`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 ${
              currentStep === 3 ? 'bg-amber-400 text-slate-950 font-black' : currentStep > 3 ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
            }`}>
              {currentStep > 3 ? <Check className="w-3.5 h-3.5" /> : '۳'}
            </span>
            <span className="text-xs sm:text-sm">انتظارات و تنفس</span>
          </div>

          {/* Step 4 */}
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-2 py-1.5 px-2 rounded-xl transition-all ${
            currentStep === 4 
              ? 'bg-emerald-700 text-white font-bold shadow-xs' 
              : 'text-slate-400 font-medium'
          }`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 ${
              currentStep === 4 ? 'bg-amber-300 text-slate-950 font-black' : 'bg-slate-200 text-slate-600'
            }`}>
              ۴
            </span>
            <span className="text-xs sm:text-sm">کد رهگیری نهایی</span>
          </div>

        </div>
      </div>

      {/* Error Alert Box */}
      {errorMessage && (
        <div className="mx-6 sm:mx-8 mt-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Step Content Container */}
      <div className="p-6 sm:p-8">
        
        {/* ========================================================
            STEP 1: مشخصات فردی
           ======================================================== */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <User className="w-5 h-5 text-[#0D5C75]" />
                مرحله اول: مشخصات هویتی و سوابق جراحی
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                اطلاعات شما کاملاً محرمانه بوده و تنها برای تشکیل پرونده پزشکی دکتر آریافر استفاده می‌شود.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  نام و نام خانوادگی <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="مثال: سارا رضایی"
                  className="w-full bg-slate-50 border border-slate-300 focus:border-[#0B2545] focus:bg-white rounded-xl px-4 py-2.5 text-sm outline-none transition-all"
                />
              </div>

              {/* National ID */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  کد ملی (۱۰ رقم) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  maxLength={10}
                  value={nationalId}
                  onChange={(e) => setNationalId(e.target.value.replace(/\D/g, ''))}
                  placeholder="مثال: ۰۰۱۲۳۴۵۶۷۸"
                  dir="ltr"
                  className="w-full bg-slate-50 border border-slate-300 focus:border-[#0B2545] focus:bg-white rounded-xl px-4 py-2.5 text-sm outline-none transition-all text-right font-mono"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">جهت ثبت رسمی پرونده نظام پزشکی</span>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  شماره موبایل فعال <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  maxLength={11}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                  dir="ltr"
                  className="w-full bg-slate-50 border border-slate-300 focus:border-[#0B2545] focus:bg-white rounded-xl px-4 py-2.5 text-sm outline-none transition-all text-right font-mono"
                />
                <span className="text-[11px] text-emerald-600 mt-1 block">نتیجه نوبت‌دهی به این شماره پیامک خواهد شد.</span>
              </div>

              {/* Age & Gender */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    سن <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    min={16}
                    max={80}
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 focus:border-[#0B2545] focus:bg-white rounded-xl px-4 py-2.5 text-sm outline-none transition-all text-center"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">جنسیت</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as 'female' | 'male')}
                    className="w-full bg-slate-50 border border-slate-300 focus:border-[#0B2545] focus:bg-white rounded-xl px-3 py-2.5 text-sm outline-none transition-all"
                  >
                    <option value="female">خانم</option>
                    <option value="male">آقا</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Previous Surgery Question */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <label className="block text-xs font-bold text-slate-900 mb-2">
                آیا سابقه جراحی قبلی بینی (رینوپلاستی) داشته‌اید؟
              </label>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer text-sm">
                  <input
                    type="radio"
                    name="hadPreviousSurgery"
                    checked={!hadPreviousSurgery}
                    onChange={() => setHadPreviousSurgery(false)}
                    className="w-4 h-4 text-[#0B2545]"
                  />
                  <span>خیر (عمل اول - Primary)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-sm">
                  <input
                    type="radio"
                    name="hadPreviousSurgery"
                    checked={hadPreviousSurgery}
                    onChange={() => setHadPreviousSurgery(true)}
                    className="w-4 h-4 text-[#0B2545]"
                  />
                  <span>بله (جراحی ترمیمی - Revision)</span>
                </label>
              </div>

              {hadPreviousSurgery && (
                <div className="mt-4 pt-3 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in duration-150">
                  <div>
                    <label className="block text-xs text-slate-700 mb-1 font-semibold">
                      چند سال از جراحی قبلی شما می‌گذرد؟
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={30}
                      value={previousSurgeryYearsAgo}
                      onChange={(e) => setPreviousSurgeryYearsAgo(e.target.value)}
                      placeholder="مثال: ۳ سال"
                      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2 text-sm outline-none"
                    />
                  </div>
                  <div className="text-xs text-amber-800 bg-amber-50 p-3 rounded-xl border border-amber-200 flex items-center">
                    برای جراحی ترمیمی، حداقل باید ۱ سال کامل از عمل اول سپری شده باشد تا بافت اسکار نرم شود.
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={handleNextStep}
                className="flex items-center gap-2 bg-[#0B2545] hover:bg-[#134074] text-white font-bold text-sm px-7 py-3 rounded-xl shadow-md transition-all"
              >
                <span>مرحله بعد: آپلود عکس‌ها</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            STEP 2: آپلود تصاویر سه‌گانه با راهنمای گرافیکی
           ======================================================== */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Camera className="w-5 h-5 text-[#0D5C75]" />
                  مرحله دوم: بارگذاری تصاویر استاندارد ۳ زاویه بینی
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  پزشک بر اساس این سه زاویه ساختار غضروفی و قرینگی را بررسی خواهد کرد.
                </p>
              </div>

              {/* Demo auto-fill helper button */}
              <button
                type="button"
                onClick={handleLoadDemoPhotos}
                className="shrink-0 flex items-center gap-1.5 text-xs font-semibold text-[#0B2545] bg-amber-100 hover:bg-amber-200 px-3.5 py-2 rounded-xl transition-colors"
                title="بارگذاری خودکار تصاویر نمونه جهت تست سریع سیستم"
              >
                <Sparkles className="w-4 h-4 text-amber-700" />
                <span>بارگذاری تصاویر تستی (دمو)</span>
              </button>
            </div>

            {/* Graphic Guidelines Box */}
            <div className="p-4 rounded-2xl bg-sky-50/80 border border-sky-200 text-xs text-slate-700 space-y-2">
              <div className="font-bold text-[#0B2545] flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4" />
                راهنمای گرافیکی گرفتن عکس صحیح:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-600">
                <div className="flex items-center gap-1.5 bg-white p-2 rounded-lg border border-sky-100">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>نور کافی، طبیعی و بدون سایه شدید</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white p-2 rounded-lg border border-sky-100">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>بدون عینک، ماسک و بدون فیلتر اینستاگرام</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white p-2 rounded-lg border border-sky-100">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>موها به پشت بسته و زاویه دوربین مستقیم</span>
                </div>
              </div>
            </div>

            {/* 3 Upload Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* 1. تمام‌رخ (Frontal) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <span>۱. عکس تمام‌رخ (روبه‌رو)</span>
                  <span className="text-rose-500">* الزامی</span>
                </div>

                <div className="relative h-64 rounded-2xl border-2 border-dashed border-slate-300 hover:border-[#0D5C75] bg-slate-50 overflow-hidden flex flex-col items-center justify-center p-3 transition-colors">
                  {frontalPhoto ? (
                    <div className="relative w-full h-full">
                      <img
                        src={frontalPhoto}
                        alt="تمام‌رخ"
                        className="w-full h-full object-cover rounded-xl"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => setPreviewModalImg({ url: frontalPhoto, title: 'عکس تمام‌رخ' })}
                          className="p-2 bg-white text-slate-800 rounded-lg shadow-sm hover:bg-slate-100"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setFrontalPhoto('')}
                          className="p-2 bg-rose-600 text-white rounded-lg shadow-sm hover:bg-rose-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div 
                      onClick={() => frontalInputRef.current?.click()}
                      className="text-center cursor-pointer p-4 w-full h-full flex flex-col items-center justify-center"
                    >
                      <div className="w-12 h-12 rounded-full bg-blue-100 text-[#0B2545] flex items-center justify-center mb-3">
                        <UploadCloud className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold text-slate-800 block">
                        انتخاب عکس تمام‌رخ
                      </span>
                      <span className="text-[10px] text-slate-400 mt-1 block">
                        فرمت JPG، PNG تا ۸ مگابایت
                      </span>
                    </div>
                  )}
                  <input
                    ref={frontalInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, setFrontalPhoto)}
                  />
                </div>
                <div className="text-[11px] text-slate-500 text-center">
                  نگاه مستقیم به لنز دوربین با حالت صورت خنثی
                </div>
              </div>

              {/* 2. نیم‌رخ راست (Profile Right) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <span>۲. عکس نیم‌رخ راست (۹۰°)</span>
                  <span className="text-rose-500">* الزامی</span>
                </div>

                <div className="relative h-64 rounded-2xl border-2 border-dashed border-slate-300 hover:border-[#0D5C75] bg-slate-50 overflow-hidden flex flex-col items-center justify-center p-3 transition-colors">
                  {profileRightPhoto ? (
                    <div className="relative w-full h-full">
                      <img
                        src={profileRightPhoto}
                        alt="نیم‌رخ راست"
                        className="w-full h-full object-cover rounded-xl"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => setPreviewModalImg({ url: profileRightPhoto, title: 'عکس نیم‌رخ راست' })}
                          className="p-2 bg-white text-slate-800 rounded-lg shadow-sm hover:bg-slate-100"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setProfileRightPhoto('')}
                          className="p-2 bg-rose-600 text-white rounded-lg shadow-sm hover:bg-rose-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div 
                      onClick={() => rightInputRef.current?.click()}
                      className="text-center cursor-pointer p-4 w-full h-full flex flex-col items-center justify-center"
                    >
                      <div className="w-12 h-12 rounded-full bg-blue-100 text-[#0B2545] flex items-center justify-center mb-3">
                        <UploadCloud className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold text-slate-800 block">
                        انتخاب عکس نیم‌رخ راست
                      </span>
                      <span className="text-[10px] text-slate-400 mt-1 block">
                        فرمت JPG، PNG تا ۸ مگابایت
                      </span>
                    </div>
                  )}
                  <input
                    ref={rightInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, setProfileRightPhoto)}
                  />
                </div>
                <div className="text-[11px] text-slate-500 text-center">
                  چرخش سر دقیقاً به سمت چپ تا نیم‌رخ راست نمایان شود
                </div>
              </div>

              {/* 3. نیم‌رخ چپ (Profile Left) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <span>۳. عکس نیم‌رخ چپ (۹۰°)</span>
                  <span className="text-rose-500">* الزامی</span>
                </div>

                <div className="relative h-64 rounded-2xl border-2 border-dashed border-slate-300 hover:border-[#0D5C75] bg-slate-50 overflow-hidden flex flex-col items-center justify-center p-3 transition-colors">
                  {profileLeftPhoto ? (
                    <div className="relative w-full h-full">
                      <img
                        src={profileLeftPhoto}
                        alt="نیم‌رخ چپ"
                        className="w-full h-full object-cover rounded-xl"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => setPreviewModalImg({ url: profileLeftPhoto, title: 'عکس نیم‌رخ چپ' })}
                          className="p-2 bg-white text-slate-800 rounded-lg shadow-sm hover:bg-slate-100"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setProfileLeftPhoto('')}
                          className="p-2 bg-rose-600 text-white rounded-lg shadow-sm hover:bg-rose-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div 
                      onClick={() => leftInputRef.current?.click()}
                      className="text-center cursor-pointer p-4 w-full h-full flex flex-col items-center justify-center"
                    >
                      <div className="w-12 h-12 rounded-full bg-blue-100 text-[#0B2545] flex items-center justify-center mb-3">
                        <UploadCloud className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold text-slate-800 block">
                        انتخاب عکس نیم‌رخ چپ
                      </span>
                      <span className="text-[10px] text-slate-400 mt-1 block">
                        فرمت JPG، PNG تا ۸ مگابایت
                      </span>
                    </div>
                  )}
                  <input
                    ref={leftInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, setProfileLeftPhoto)}
                  />
                </div>
                <div className="text-[11px] text-slate-500 text-center">
                  چرخش سر دقیقاً به سمت راست تا نیم‌رخ چپ ثبت شود
                </div>
              </div>

            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-100">
              <button
                type="button"
                onClick={handlePrevStep}
                className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm px-5 py-2.5 rounded-xl transition-all"
              >
                <ArrowRight className="w-4 h-4" />
                <span>مرحله قبل</span>
              </button>

              <button
                type="button"
                onClick={handleNextStep}
                className="flex items-center gap-2 bg-[#0B2545] hover:bg-[#134074] text-white font-bold text-sm px-7 py-3 rounded-xl shadow-md transition-all"
              >
                <span>مرحله بعد: انتظارات و تنفس</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            STEP 3: توضیحات تکمیلی و وضعیت تنفسی
           ======================================================== */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#0D5C75]" />
                مرحله سوم: سبک انتخابی، مشکلات تنفسی و انتظارات شما
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                دیدگاه‌های شما در طراحی اولیه جراحی و بررسی سلامت مجاری تنفسی لحاظ خواهد شد.
              </p>
            </div>

            {/* Desired Style Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-900 mb-2">
                سبک فرم بینی مورد علاقه شما:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'natural', title: 'طبیعی (Natural)', desc: 'قوس بسیار ملایم، زاویه طبیعی با لب' },
                  { id: 'semi-fantasy', title: 'نیمه‌فانتزی', desc: 'قوس ملایم شیک، نوک بینی جمع و ظریف' },
                  { id: 'fantasy', title: 'فانتزی (عروسکی)', desc: 'قوس بیشتر، نوک بینی سربالا و باریک' },
                  { id: 'undecided', title: 'نظر تخصصی جراح', desc: 'بر اساس تناسبات علمی چهره من' },
                ].map((st) => (
                  <div
                    key={st.id}
                    onClick={() => setDesiredStyle(st.id as SurgeryStyle)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      desiredStyle === st.id
                        ? 'bg-blue-50/70 border-[#0B2545] ring-2 ring-[#0B2545]/20 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-900">{st.title}</div>
                    <div className="text-[11px] text-slate-500 mt-1 leading-snug">{st.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Breathing issues checkboxes */}
            <div>
              <label className="block text-xs font-bold text-slate-900 mb-2">
                آیا در حال حاضر مشکل تنفسی یا حساسیت دارید؟ (امکان انتخاب چند گزینه)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  'انحراف تیغه بینی (کجی محسوس داخلی)',
                  'گرفتگی تنفس یک‌طرفه در طول شب',
                  'پولیپ یا سینوزیت مزمن',
                  'خروپف شبانه یا خشکی دهان صبحگاهی',
                  'آلرژی فصلی شدید یا عطسه‌های مداوم',
                  'تنفس کاملاً سالم و بدون مشکل',
                ].map((issue, idx) => (
                  <label
                    key={idx}
                    className={`flex items-center gap-2 p-3 rounded-xl border text-xs cursor-pointer transition-colors ${
                      breathingIssues.includes(issue)
                        ? 'bg-emerald-50/70 border-emerald-500 text-emerald-950 font-semibold'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100/70'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={breathingIssues.includes(issue)}
                      onChange={() => toggleBreathingIssue(issue)}
                      className="rounded text-emerald-600"
                    />
                    <span>{issue}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Expectations & Notes */}
            <div>
              <label className="block text-xs font-bold text-slate-900 mb-1.5">
                انتظارات دقیق یا دغدغه‌های شما از عمل جراحی:
              </label>
              <textarea
                rows={3}
                value={expectations}
                onChange={(e) => setExpectations(e.target.value)}
                placeholder="مثلاً: مایل هستم قوز بینی برداشته شود ولی سوراخ‌ها از روبه‌رو خیلی پیدا نباشند..."
                className="w-full bg-slate-50 border border-slate-300 focus:border-[#0B2545] focus:bg-white rounded-xl p-3.5 text-sm outline-none transition-all leading-relaxed"
              />
            </div>

            {/* Chronic diseases or medicines */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-900 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasChronicDisease}
                  onChange={(e) => setHasChronicDisease(e.target.checked)}
                  className="rounded text-[#0B2545]"
                />
                <span>سابقه بیماری خاص (تیروئید، فشار خون، دیابت و ...) یا مصرف داروی خاص (آسپرین، راکوتان) دارم</span>
              </label>

              {hasChronicDisease && (
                <div className="mt-3">
                  <input
                    type="text"
                    value={chronicDiseaseDetails}
                    onChange={(e) => setChronicDiseaseDetails(e.target.value)}
                    placeholder="نام بیماری یا داروهای مصرفی را ذکر فرمایید..."
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs outline-none"
                  />
                </div>
              )}
            </div>

            {/* Navigation & Submit */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-100">
              <button
                type="button"
                onClick={handlePrevStep}
                disabled={isSubmitting}
                className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm px-5 py-2.5 rounded-xl transition-all"
              >
                <ArrowRight className="w-4 h-4" />
                <span>مرحله قبل</span>
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-lg shadow-emerald-700/20 hover:shadow-xl transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    در حال ثبت اطلاعات و ارسال پرونده...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-300" />
                    ثبت نهایی و دریافت کد رهگیری یکتا
                  </span>
                )}
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            STEP 4: ثبت نهایی و صدور کد رهگیری یکتا
           ======================================================== */}
        {currentStep === 4 && (
          <div className="space-y-6 text-center animate-in zoom-in-95 duration-300 py-4">
            
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
              <CalendarCheck className="w-10 h-10" />
            </div>

            <div className="max-w-xl mx-auto">
              <h3 className="text-2xl font-black text-slate-900 mb-2">
                درخواست شما با موفقیت ثبت شد
              </h3>
              
              {/* Exact requested notification text */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-semibold text-sm leading-relaxed mb-6">
                «درخواست شما ثبت شد و در صف بررسی پزشک قرار گرفت. نتیجه و زمان نوبت از طریق پیامک ارسال خواهد شد.»
              </div>

              {/* Unique Tracking Code Card */}
              <div className="bg-[#0B2545] text-white p-6 rounded-3xl shadow-xl space-y-4">
                <span className="text-xs font-semibold text-amber-300 tracking-wider">
                  کد رهگیری یکتای پرونده پزشکی شما
                </span>
                
                <div className="flex items-center justify-center gap-3">
                  <div className="text-3xl sm:text-4xl font-black tracking-widest font-mono text-white bg-white/10 px-6 py-2.5 rounded-2xl border border-white/20">
                    {generatedTrackingCode}
                  </div>
                  
                  <button
                    onClick={handleCopyCode}
                    className="p-3 bg-white/15 hover:bg-white/25 text-white rounded-2xl transition-colors border border-white/10"
                    title="کپی کد رهگیری"
                  >
                    {copiedCode ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>

                {copiedCode && (
                  <div className="text-xs text-emerald-300 font-medium animate-in fade-in">
                    کد رهگیری در کلیپ‌بورد کپی شد
                  </div>
                )}

                <div className="pt-2 text-xs text-slate-300 border-t border-white/10 flex items-center justify-around">
                  <div>نام بیمار: <span className="text-white font-bold">{fullName}</span></div>
                  <div>تاریخ ثبت: <span className="text-white font-bold">{toPersianDigits(submissionDate)}</span></div>
                </div>
              </div>

              {/* Next Steps Guidance */}
              <div className="mt-6 text-right space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-200 text-xs text-slate-700">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <PhoneCall className="w-4 h-4 text-[#0D5C75]" />
                  مراحل پس از ثبت پرونده:
                </div>
                <ul className="space-y-1.5 text-slate-600 list-disc list-inside">
                  <li>تصاویر شما توسط دکتر علی محمدخانی بررسی خواهد شد (حداکثر تا ۲۴ ساعت کاری).</li>
                  <li>پس از تایید، تاریخ و ساعت نوبت ویزیت حضوری همراه با آدرس مطب برای شماره <strong>{phone}</strong> پیامک می‌گردد.</li>
                  <li>در هر زمان می‌توانید با استفاده از این کد رهگیری یا شماره موبایل، وضعیت پرونده خود را پیگیری نمایید.</li>
                </ul>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-6">
                {onSuccessTracking && (
                  <button
                    onClick={() => onSuccessTracking(generatedTrackingCode)}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#0B2545] hover:bg-[#134074] text-white font-bold text-sm px-6 py-3 rounded-xl transition-all"
                  >
                    <span>مشاهده وضعیت در صفحه پیگیری نوبت</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                )}

                <button
                  onClick={() => window.print()}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm px-5 py-3 rounded-xl transition-all"
                >
                  <Printer className="w-4 h-4" />
                  <span>چاپ یا ذخیره رسید پرونده</span>
                </button>
              </div>

            </div>

          </div>
        )}

      </div>

      {/* Lightbox / Preview modal for uploaded photos */}
      {previewModalImg && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl overflow-hidden max-w-lg w-full p-4 relative animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="font-bold text-sm text-slate-900">{previewModalImg.title}</span>
              <button
                onClick={() => setPreviewModalImg(null)}
                className="p-1 rounded-lg text-slate-500 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-3 rounded-xl overflow-hidden max-h-[70vh] flex items-center justify-center bg-slate-950">
              <img
                src={previewModalImg.url}
                alt={previewModalImg.title}
                className="max-h-[65vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
