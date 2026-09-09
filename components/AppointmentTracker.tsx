'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Clock, 
  Calendar, 
  MapPin, 
  AlertTriangle, 
  ShieldCheck, 
  FileText, 
  Phone, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { toPersianDigits } from '@/lib/validators';
import { ConsultationRequest } from '@/types/medical';

interface AppointmentTrackerProps {
  initialCode?: string;
  onBackToHome?: () => void;
  onNewConsultation?: () => void;
}

export const AppointmentTracker: React.FC<AppointmentTrackerProps> = ({
  initialCode = '',
  onBackToHome,
  onNewConsultation,
}) => {
  const [query, setQuery] = useState<string>(initialCode);
  const [loading, setLoading] = useState<boolean>(false);
  const [searched, setSearched] = useState<boolean>(false);
  const [result, setResult] = useState<ConsultationRequest | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSearch = async (searchTerm?: string) => {
    const q = (searchTerm !== undefined ? searchTerm : query).trim();
    if (!q) {
      setErrorMessage('لطفاً شماره موبایل یا کد رهگیری را وارد نمایید.');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    setSearched(true);

    try {
      const res = await fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q }),
      });

      const data = await res.json();
      if (data.found && data.consultation) {
        setResult(data.consultation);
      } else {
        setResult(null);
        setErrorMessage(data.message || 'هیچ پرونده‌ای با این مشخصات یافت نشد.');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('خطا در برقراری ارتباط با سرور. لطفاً مجدداً تلاش فرمایید.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      
      {/* Top Banner */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-[#0B2545] text-xs font-bold px-3.5 py-1.5 rounded-full mb-2">
          <Search className="w-3.5 h-3.5" />
          سامانه هوشمند استعلام پرونده و نوبت
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          پیگیری وضعیت درخواست و زمان نوبت
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-2">
          شماره موبایلی که با آن فرم را پر کرده‌اید یا کد رهگیری اختصاصی (مانند RH-9482) را وارد نمایید.
        </p>
      </div>

      {/* Search Bar Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-lg mb-8">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
          className="flex flex-col sm:flex-row items-stretch gap-3"
        >
          <div className="relative flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="مثال: RH-9482 یا ۰۹۱۲۱۱۱۲۲۳۳"
              className="w-full bg-slate-50 border border-slate-300 focus:border-[#0B2545] focus:bg-white rounded-2xl px-5 py-3.5 text-sm outline-none transition-all pr-12 text-slate-900 placeholder:text-slate-400"
            />
            <Search className="w-5 h-5 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2" />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-[#0B2545] hover:bg-[#134074] text-white font-bold text-sm px-8 py-3.5 rounded-2xl shadow-md transition-all shrink-0"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>استعلام پرونده</span>
              </>
            )}
          </button>
        </form>

        {/* Quick demo chips */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center flex-wrap gap-2 text-xs text-slate-500">
          <span className="font-semibold text-slate-700 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            کدهای نمونه جهت تست سریع:
          </span>
          <button
            type="button"
            onClick={() => { setQuery('RH-9482'); handleSearch('RH-9482'); }}
            className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-lg font-mono font-bold"
          >
            RH-9482 (نوبت تایید شده)
          </button>
          <button
            type="button"
            onClick={() => { setQuery('RH-7319'); handleSearch('RH-7319'); }}
            className="bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-lg font-mono font-bold"
          >
            RH-7319 (در انتظار بررسی)
          </button>
        </div>
      </div>

      {/* Error / Not Found Display */}
      {errorMessage && (
        <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-sm flex items-start gap-3 mb-8 animate-in fade-in">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold">نتیجه‌ای یافت نشد</div>
            <div className="text-xs text-amber-800 mt-1">{errorMessage}</div>
          </div>
        </div>
      )}

      {/* Result Card */}
      {result && (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 mb-8">
          
          {/* Card Header with Status */}
          <div className={`p-6 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
            result.status === 'approved' 
              ? 'bg-linear-to-r from-[#0F4C5C] to-[#0A3641]' 
              : result.status === 'rejected' 
                ? 'bg-linear-to-r from-rose-900 to-rose-950' 
                : 'bg-linear-to-r from-[#0B2545] to-[#134074]'
          }`}>
            <div>
              <span className="text-xs text-amber-300 font-bold block mb-1">
                پرونده شماره: {result.trackingCode}
              </span>
              <h3 className="text-xl font-black">
                بیمار: {result.fullName}
              </h3>
            </div>

            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-xs px-4 py-2 rounded-2xl border border-white/20">
              <span className="text-xs font-bold text-white">وضعیت فعلی:</span>
              <span className="text-xs font-black bg-white text-slate-900 px-2.5 py-0.5 rounded-full">
                {result.status === 'approved' && 'تایید و نوبت‌دهی شده'}
                {result.status === 'pending' && 'در انتظار بررسی پزشک'}
                {result.status === 'rejected' && 'رد شده / نیازمند اقدام دیگر'}
              </span>
            </div>
          </div>

          {/* Stepper visualization */}
          <div className="p-6 bg-slate-50 border-b border-slate-200">
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                <span>۱. ثبت پرونده و عکس‌ها</span>
              </div>
              <div className={`p-2 rounded-xl font-bold flex items-center justify-center gap-1.5 ${
                result.status !== 'pending' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
              }`}>
                <span className={`w-2 h-2 rounded-full ${result.status !== 'pending' ? 'bg-emerald-600' : 'bg-amber-500 animate-pulse'}`} />
                <span>۲. بررسی توسط دکتر علی محمدخانی</span>
              </div>
              <div className={`p-2 rounded-xl font-bold flex items-center justify-center gap-1.5 ${
                result.status === 'approved' ? 'bg-emerald-600 text-white shadow-xs' : result.status === 'rejected' ? 'bg-rose-600 text-white' : 'bg-slate-200 text-slate-500'
              }`}>
                <span className="w-2 h-2 rounded-full bg-white" />
                <span>۳. تعیین نوبت نهایی</span>
              </div>
            </div>
          </div>

          {/* Detailed Content */}
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Status 1: APPROVED with APPOINTMENT */}
            {result.status === 'approved' && result.appointment && (
              <div className="space-y-6">
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm mb-3">
                    <Calendar className="w-5 h-5 text-emerald-700" />
                    اطلاعات نوبت ویزیت حضوری شما:
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                    <div className="bg-white p-3.5 rounded-xl border border-emerald-100 shadow-2xs">
                      <span className="text-slate-500 block mb-1">تاریخ نوبت:</span>
                      <span className="text-slate-900 font-extrabold text-base">
                        {toPersianDigits(result.appointment.date)}
                      </span>
                    </div>

                    <div className="bg-white p-3.5 rounded-xl border border-emerald-100 shadow-2xs">
                      <span className="text-slate-500 block mb-1">ساعت حضور در مطب:</span>
                      <span className="text-slate-900 font-extrabold text-base">
                        {toPersianDigits(result.appointment.time)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-emerald-200/60 flex items-start gap-2 text-xs text-slate-700">
                    <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900">آدرس مطب:</strong>{' '}
                      {result.appointment.clinicAddress}
                    </div>
                  </div>
                </div>

                {/* Pre-visit Essential Recommendations */}
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
                  <h4 className="text-xs font-bold text-slate-900 mb-2.5 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#0D5C75]" />
                    توصیه‌های ضروری قبل از مراجعه به مطب:
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-700 list-disc list-inside">
                    <li>حداقل ۱۵ دقیقه قبل از زمان مقرر در مطب حضور به هم رسانید.</li>
                    <li>در صورتی که سی‌تی اسکن سینوس‌ها یا آزمایش خون از قبل دارید، حتماً همراه داشته باشید.</li>
                    <li>از مصرف داروهای ضدالتهابی رقیق‌کننده خون (مانند آسپرین، بروفن یا ژلوفن) از دو هفته قبل خودداری فرمایید.</li>
                    <li>به منظور معاینه دقیق پوست، از زدن کرم‌پودر و آرایش سنگین روی بینی در روز ویزیت پرهیز کنید.</li>
                  </ul>

                  {result.appointment.notes && (
                    <div className="mt-3 pt-3 border-t border-slate-200 text-xs text-amber-900 bg-amber-50 p-3 rounded-xl">
                      <strong>پیام مستقیم پزشک:</strong> {result.appointment.notes}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Status 2: PENDING */}
            {result.status === 'pending' && (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
                  <Clock className="w-8 h-8 animate-pulse" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">
                  پرونده شما در صف بررسی مستقیم پزشک قرار دارد
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                  تصاویر و اطلاعات شما ثبت شده و دکتر علی محمدخانی در حال ارزیابی ساختار غضروفی و امکان جراحی هستند. معمولاً بررسی پرونده‌ها ظرف ۲۴ ساعت کاری تکمیل و پیامک تایید نوبت برای شما ارسال می‌گردد.
                </p>
                <div className="text-xs text-slate-400">
                  شماره موبایل ثبت‌شده: <span className="font-mono text-slate-700">{result.phone}</span>
                </div>
              </div>
            )}

            {/* Status 3: REJECTED */}
            {result.status === 'rejected' && (
              <div className="space-y-4">
                <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 text-rose-900">
                  <div className="font-bold text-sm flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    نتیجه بررسی پرونده: عدم امکان انجام جراحی آنلاین یا نیاز به اقدام تکمیلی
                  </div>
                  <div className="text-xs space-y-2">
                    <div>
                      <strong>دلیل ثبت شده:</strong> {result.rejection?.reason || 'عدم انطباق با معیارهای کاندیداتوری جراحی'}
                    </div>
                    {result.rejection?.explanation && (
                      <div>
                        <strong>توضیحات پزشک:</strong> {result.rejection.explanation}
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-xs text-slate-600 bg-slate-50 p-4 rounded-xl">
                  جهت دریافت مشاوره تکمیلی یا رزرو نوبت ویزیت حضوری تشخیصی، می‌توانید مستقیماً با شماره مطب تماس بگیرید:
                  <div className="mt-2 font-bold text-slate-900 flex items-center gap-1.5" dir="ltr">
                    <Phone className="w-4 h-4 text-emerald-600" />
                    ۰۲۱-۸۸۸۸۹۹۹۹
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Footer Actions */}
          <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              کلینیک فوق‌تخصصی رینوپلاستی دکتر علی محمدخانی (تهران، شریعتی)
            </div>
            
            <div className="flex items-center gap-3">
              {onBackToHome && (
                <button
                  onClick={onBackToHome}
                  className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 px-4 py-2 rounded-xl border border-slate-300 bg-white"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>بازگشت به صفحه اصلی</span>
                </button>
              )}
              {onNewConsultation && (
                <button
                  onClick={onNewConsultation}
                  className="flex items-center gap-1.5 text-xs font-bold text-white bg-[#0B2545] px-4 py-2 rounded-xl"
                >
                  <FileText className="w-3.5 h-3.5 text-amber-300" />
                  <span>ثبت پرونده جدید</span>
                </button>
              )}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
