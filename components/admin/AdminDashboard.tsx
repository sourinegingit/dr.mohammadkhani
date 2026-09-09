'use client';

import React, { useState, useEffect } from 'react';
import { 
  UserCheck, 
  LogOut, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Search, 
  Phone, 
  ZoomIn, 
  Send, 
  MessageSquare, 
  FileText, 
  X, 
  Check, 
  Maximize2,
  RefreshCw,
  Sparkles,
  MapPin,
  Stethoscope
} from 'lucide-react';
import { toPersianDigits } from '@/lib/validators';
import { ConsultationRequest, SmsLogItem, ConsultationStatus } from '@/types/medical';

export const AdminDashboard: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('dr.mohammadkhani');
  const [password, setPassword] = useState<string>('admin123');
  const [loginError, setLoginError] = useState<string>('');
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  // Active view tab
  const [activeTab, setActiveTab] = useState<'cases' | 'sms'>('cases');

  // Data state
  const [consultations, setConsultations] = useState<ConsultationRequest[]>([]);
  const [smsLogs, setSmsLogs] = useState<SmsLogItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });

  // Filter state
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Selected case for detailed modal
  const [selectedCase, setSelectedCase] = useState<ConsultationRequest | null>(null);
  const [inspectZoomImg, setInspectZoomImg] = useState<{ url: string; title: string } | null>(null);

  // Approve modal state
  const [showApproveModal, setShowApproveModal] = useState<boolean>(false);
  const [appointmentDate, setAppointmentDate] = useState<string>('۱۴۰۳/۰۸/۲۸');
  const [appointmentTime, setAppointmentTime] = useState<string>('۱۷:۳۰');
  const [clinicAddress, setClinicAddress] = useState<string>(
    'تهران، خیابان شریعتی، بالاتر از میرداماد، روبروی بیمارستان ایرانمهر، ساختمان پزشکان، طبقه ۴، واحد ۱۶'
  );
  const [doctorNotes, setDoctorNotes] = useState<string>('کاندید مناسب رینوپلاستی؛ لطفاً آزمایشات و سی‌تی اسکن همراه داشته باشند.');
  const [isProcessingApprove, setIsProcessingApprove] = useState<boolean>(false);

  // Reject modal state
  const [showRejectModal, setShowRejectModal] = useState<boolean>(false);
  const [rejectReason, setRejectReason] = useState<string>('نیاز به معاینه حضوری فوری به دلیل ضخامت پوست یا پیچیدگی اسکلت');
  const [rejectExplanation, setRejectExplanation] = useState<string>('');
  const [isProcessingReject, setIsProcessingReject] = useState<boolean>(false);

  // Success alert feedback
  const [alertFeedback, setAlertFeedback] = useState<{ message: string; sms?: SmsLogItem } | null>(null);

  // Fetch Consultations for manual trigger
  const fetchConsultations = React.useCallback(async () => {
    setLoading(true);
    try {
      const url = `/api/consultations?status=${statusFilter}&search=${encodeURIComponent(searchQuery)}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setConsultations(data.items);
        if (data.stats) setStats(data.stats);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, searchQuery]);

  // Fetch SMS Logs for manual trigger
  const fetchSmsLogs = React.useCallback(async () => {
    try {
      const res = await fetch('/api/sms');
      const data = await res.json();
      if (data.success) {
        setSmsLogs(data.logs);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    let isCancelled = false;

    fetch(`/api/consultations?status=${statusFilter}&search=${encodeURIComponent(searchQuery)}`)
      .then((res) => res.json())
      .then((data) => {
        if (!isCancelled && data.success) {
          setConsultations(data.items);
          if (data.stats) setStats(data.stats);
        }
      })
      .catch(console.error);

    fetch('/api/sms')
      .then((res) => res.json())
      .then((data) => {
        if (!isCancelled && data.success) {
          setSmsLogs(data.logs);
        }
      })
      .catch(console.error);

    return () => {
      isCancelled = true;
    };
  }, [isAuthenticated, statusFilter, searchQuery]);

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setIsAuthenticated(true);
      } else {
        setLoginError(data.message || 'نام کاربری یا رمز عبور اشتباه است.');
      }
    } catch {
      setLoginError('خطا در اتصال به سرور');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Quick Demo Fast Access Login
  const handleDemoFastLogin = () => {
    setUsername('dr.mohammadkhani');
    setPassword('admin123');
    setIsAuthenticated(true);
  };

  // Handle Approve Action
  const handleConfirmApprove = async () => {
    if (!selectedCase) return;
    setIsProcessingApprove(true);

    try {
      const res = await fetch(`/api/consultations/${selectedCase.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'approve',
          date: appointmentDate,
          time: appointmentTime,
          clinicAddress,
          notes: doctorNotes,
          appointmentType: 'consultation',
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setShowApproveModal(false);
        setSelectedCase(data.item);
        setAlertFeedback({
          message: 'نوبت بیمار با موفقیت تایید شد و پیامک خودکار ارسال گردید.',
          sms: data.smsLog,
        });
        fetchConsultations();
        fetchSmsLogs();
      } else {
        alert(data.error || 'خطا در تایید پرونده');
      }
    } catch (err) {
      console.error(err);
      alert('خطا در ارتباط با سرور');
    } finally {
      setIsProcessingApprove(false);
    }
  };

  // Handle Reject Action
  const handleConfirmReject = async () => {
    if (!selectedCase) return;
    setIsProcessingReject(true);

    try {
      const res = await fetch(`/api/consultations/${selectedCase.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'reject',
          reason: rejectReason,
          explanation: rejectExplanation,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setShowRejectModal(false);
        setSelectedCase(data.item);
        setAlertFeedback({
          message: 'پرونده رد شد و پیامک اطلاع‌رسانی برای بیمار ارسال گردید.',
          sms: data.smsLog,
        });
        fetchConsultations();
        fetchSmsLogs();
      } else {
        alert(data.error || 'خطا در ثبت رد پرونده');
      }
    } catch (err) {
      console.error(err);
      alert('خطا در ارتباط با سرور');
    } finally {
      setIsProcessingReject(false);
    }
  };

  // -------------------------------------------------------------
  // Render Login Gate if Not Authenticated
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full border border-slate-200 shadow-2xl relative animate-in zoom-in-95">
          <button
            onClick={onClose}
            className="absolute top-5 left-5 text-slate-400 hover:text-slate-700 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-[#0B2545] to-[#0D5C75] text-white flex items-center justify-center mx-auto mb-3 shadow-md">
              <Stethoscope className="w-8 h-8 text-amber-300" />
            </div>
            <h2 className="text-xl font-black text-slate-900">
              ورود به پنل مدیریت پزشک و کلینیک
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              کلینیک تخصصی رینوپلاستی دکتر علی محمدخانی (شریعتی)
            </p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                نام کاربری پزشک یا منشی:
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="dr.mohammadkhani"
                dir="ltr"
                className="w-full bg-slate-50 border border-slate-300 focus:border-[#0B2545] rounded-xl px-4 py-2.5 text-sm outline-none text-right font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                رمز عبور امن:
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                dir="ltr"
                className="w-full bg-slate-50 border border-slate-300 focus:border-[#0B2545] rounded-xl px-4 py-2.5 text-sm outline-none text-right"
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-[#0B2545] hover:bg-[#134074] text-white font-bold py-3 rounded-xl shadow-md transition-colors text-sm"
            >
              {isLoggingIn ? 'در حال ورود...' : 'ورود امن به داشبورد'}
            </button>
          </form>

          {/* Quick Demo Access Button */}
          <div className="mt-5 pt-4 border-t border-slate-100 text-center">
            <button
              type="button"
              onClick={handleDemoFastLogin}
              className="w-full flex items-center justify-center gap-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold py-2.5 rounded-xl transition-colors"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>ورود فوری دمو (جهت ارزیابی سریع سیستم)</span>
            </button>
            <div className="text-[11px] text-slate-400 mt-2">
              نام کاربری پیش‌فرض: <code className="text-slate-600">dr.mohammadkhani</code> | رمز: <code className="text-slate-600">admin123</code>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // Render Full Admin Dashboard
  // -------------------------------------------------------------
  return (
    <div className="fixed inset-0 z-50 bg-slate-100/95 backdrop-blur-xs flex flex-col overflow-hidden">
      
      {/* Top Navbar */}
      <header className="bg-[#0B2545] text-white px-6 py-4 flex items-center justify-between border-b border-[#134074] shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0D5C75] text-white flex items-center justify-center shadow-xs">
            <Stethoscope className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-extrabold text-white">
                پنل مدیریت جراح | دکتر علی محمدخانی
              </span>
              <span className="text-[11px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                آنلاین
              </span>
            </div>
            <div className="text-xs text-slate-300">
              مدیریت هوشمند درخواست‌های رینوپلاستی و سامانه ارسال آنی پیامک
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab(activeTab === 'cases' ? 'sms' : 'cases')}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl transition-colors ${
              activeTab === 'sms' 
                ? 'bg-amber-400 text-slate-950' 
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>لاگ ارسال پیامک‌ها ({smsLogs.length})</span>
          </button>

          <button
            onClick={() => setIsAuthenticated(false)}
            className="flex items-center gap-1.5 text-xs font-semibold bg-white/10 hover:bg-rose-900/40 text-slate-200 hover:text-white px-3 py-2 rounded-xl transition-colors"
            title="خروج از حساب"
          >
            <LogOut className="w-4 h-4" />
            <span>خروج</span>
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white"
            title="بستن پنل و بازگشت به سایت"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 max-w-7xl w-full mx-auto space-y-6">
        
        {/* Alert Feedback Banner */}
        {alertFeedback && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-start justify-between gap-3 animate-in fade-in">
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>{alertFeedback.message}</span>
              </div>
              {alertFeedback.sms && (
                <div className="text-xs text-slate-700 bg-white p-3 rounded-xl border border-emerald-100 mt-2 font-mono">
                  <div className="font-bold text-slate-900 mb-1">
                    متن پیامک ارسال شده به {alertFeedback.sms.phone} ({alertFeedback.sms.provider}):
                  </div>
                  <div className="whitespace-pre-line text-slate-700 leading-relaxed">
                    {alertFeedback.sms.message}
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={() => setAlertFeedback(null)}
              className="text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ========================================================
            TAB 1: پرونده‌های بیماران (CASES)
           ======================================================== */}
        {activeTab === 'cases' && (
          <div className="space-y-6">
            {/* Stats Metrics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="text-xs text-slate-500 font-semibold mb-1">کل پرونده‌ها</div>
                <div className="text-2xl font-black text-slate-900">{toPersianDigits(stats.total)}</div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-xs bg-amber-50/30">
                <div className="text-xs text-amber-700 font-bold mb-1 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  در انتظار بررسی
                </div>
                <div className="text-2xl font-black text-amber-800">{toPersianDigits(stats.pending)}</div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-xs bg-emerald-50/30">
                <div className="text-xs text-emerald-700 font-bold mb-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  تایید و نوبت‌دهی شده
                </div>
                <div className="text-2xl font-black text-emerald-800">{toPersianDigits(stats.approved)}</div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-rose-200 shadow-xs bg-rose-50/30">
                <div className="text-xs text-rose-700 font-bold mb-1 flex items-center gap-1">
                  <XCircle className="w-3.5 h-3.5" />
                  رد شده
                </div>
                <div className="text-2xl font-black text-rose-800">{toPersianDigits(stats.rejected)}</div>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Status Filter Buttons */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                {[
                  { id: 'all', label: 'همه پرونده‌ها' },
                  { id: 'pending', label: 'در انتظار بررسی' },
                  { id: 'approved', label: 'تایید شده' },
                  { id: 'rejected', label: 'رد شده' },
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setStatusFilter(st.id)}
                    className={`text-xs font-bold px-3.5 py-2 rounded-xl transition-colors whitespace-nowrap ${
                      statusFilter === st.id
                        ? 'bg-[#0B2545] text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>

              {/* Search input & Refresh */}
              <div className="flex items-center gap-2 w-full sm:w-80">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="جستجو با نام، موبایل یا کد..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs outline-none focus:border-[#0B2545] pr-8"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2" />
                </div>
                <button
                  onClick={fetchConsultations}
                  className="p-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700"
                  title="تازه‌سازی"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            {/* Cases Table / Cards Grid */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs text-slate-700">
                  <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-900">
                    <tr>
                      <th className="py-3.5 px-4">کد پرونده</th>
                      <th className="py-3.5 px-4">نام بیمار</th>
                      <th className="py-3.5 px-4">شماره موبایل</th>
                      <th className="py-3.5 px-4">سن / جنسیت</th>
                      <th className="py-3.5 px-4">سابقه عمل</th>
                      <th className="py-3.5 px-4">وضعیت</th>
                      <th className="py-3.5 px-4">تاریخ ثبت</th>
                      <th className="py-3.5 px-4 text-center">عملیات بالینی</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {consultations.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="text-center py-10 text-slate-400">
                          هیچ پرونده‌ای با این مشخصات یافت نشد.
                        </td>
                      </tr>
                    ) : (
                      consultations.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-4 font-mono font-bold text-[#0B2545]">
                            {item.trackingCode}
                          </td>
                          <td className="py-3 px-4 font-bold text-slate-900">
                            {item.fullName}
                          </td>
                          <td className="py-3 px-4 font-mono text-slate-600" dir="ltr">
                            {item.phone}
                          </td>
                          <td className="py-3 px-4">
                            {item.age} سال ({item.gender === 'female' ? 'خانم' : 'آقا'})
                          </td>
                          <td className="py-3 px-4">
                            {item.hadPreviousSurgery ? (
                              <span className="text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md font-semibold text-[11px]">
                                عمل ترمیمی ({item.previousSurgeryYearsAgo} سال پیش)
                              </span>
                            ) : (
                              <span className="text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md text-[11px]">
                                بار اول
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2.5 py-1 rounded-full font-bold text-[11px] ${
                              item.status === 'approved'
                                ? 'bg-emerald-100 text-emerald-800'
                                : item.status === 'rejected'
                                  ? 'bg-rose-100 text-rose-800'
                                  : 'bg-amber-100 text-amber-800 animate-pulse'
                            }`}>
                              {item.status === 'approved' && 'تایید و نوبت‌دهی شده'}
                              {item.status === 'pending' && 'در انتظار بررسی'}
                              {item.status === 'rejected' && 'رد شده'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-slate-500">
                            {new Date(item.createdAt).toLocaleDateString('fa-IR')}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <button
                              onClick={() => setSelectedCase(item)}
                              className="bg-[#0B2545] hover:bg-[#134074] text-white font-bold text-xs px-3.5 py-1.5 rounded-xl shadow-2xs transition-colors"
                            >
                              بررسی تخصصی
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 2: لاگ ارسال پیامک‌ها (SMS LOGS)
           ======================================================== */}
        {activeTab === 'sms' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#0D5C75]" />
                گزارش سیستم ارسال آنی پیامک نوبت‌دهی
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                سیستم با پشتیبانی کامل از وب‌سرویس پترن کاوه‌نگار (Kavenegar Verify) و فراز اس‌ام‌اس (IPPanel Pattern) پیکربندی شده است.
              </p>

              <div className="space-y-4">
                {smsLogs.map((log) => (
                  <div 
                    key={log.id} 
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 max-w-2xl">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{log.patientName}</span>
                        <span className="text-xs font-mono text-slate-600 bg-white px-2 py-0.5 rounded-md border border-slate-200" dir="ltr">
                          {log.phone}
                        </span>
                        <span className="text-xs font-mono font-bold text-[#0B2545]">
                          {log.trackingCode}
                        </span>
                      </div>
                      <div className="text-xs text-slate-700 bg-white p-3 rounded-lg border border-slate-200 whitespace-pre-line leading-relaxed">
                        {log.message}
                      </div>
                    </div>

                    <div className="text-left sm:text-right shrink-0 space-y-1">
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full inline-block">
                        ارسال موفق
                      </span>
                      <div className="text-[11px] text-slate-500 font-mono">
                        {log.provider}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {new Date(log.timestamp).toLocaleTimeString('fa-IR')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ========================================================
          CASE DETAIL & 3-PHOTO SIMULTANEOUS INSPECTOR MODAL
         ======================================================== */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200 animate-in zoom-in-95">
            
            {/* Modal Header */}
            <div className="bg-[#0B2545] text-white p-5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <Stethoscope className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h3 className="text-base font-bold">
                    پرونده تخصصی: {selectedCase.fullName}
                  </h3>
                  <div className="text-xs text-slate-300 flex items-center gap-2 mt-0.5">
                    <span>کد رهگیری: <strong className="font-mono text-white">{selectedCase.trackingCode}</strong></span>
                    <span>•</span>
                    <span>کد ملی: <strong className="font-mono text-white">{selectedCase.nationalId}</strong></span>
                    <span>•</span>
                    <span>تلفن: <strong className="font-mono text-white">{selectedCase.phone}</strong></span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedCase(null)}
                className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* 1. 3-PHOTO SIMULTANEOUS COMPARISON INSPECTOR */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <ZoomIn className="w-4 h-4 text-[#0D5C75]" />
                    مشاهده همزمان و ارزیابی میکروسکوپی ۳ زاویه بینی (برای بزرگ‌نمایی کلیک کنید):
                  </h4>
                  <span className="text-[11px] text-slate-500">
                    تمام‌رخ • نیم‌رخ راست ۹۰° • نیم‌رخ چپ ۹۰°
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Frontal */}
                  <div className="space-y-1">
                    <div className="text-[11px] font-bold text-slate-700 bg-slate-100 py-1 px-2.5 rounded-lg flex items-center justify-between">
                      <span>نمای تمام‌رخ (Frontal)</span>
                      <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                    <div 
                      onClick={() => setInspectZoomImg({ url: selectedCase.photos.frontal, title: 'تمام‌رخ - ' + selectedCase.fullName })}
                      className="relative h-64 bg-slate-900 rounded-2xl overflow-hidden cursor-zoom-in group shadow-xs"
                    >
                      <img
                        src={selectedCase.photos.frontal}
                        alt="تمام‌رخ"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
                        بزرگ‌نمایی و زوم
                      </div>
                    </div>
                  </div>

                  {/* Profile Right */}
                  <div className="space-y-1">
                    <div className="text-[11px] font-bold text-slate-700 bg-slate-100 py-1 px-2.5 rounded-lg flex items-center justify-between">
                      <span>نیم‌رخ راست ۹۰°</span>
                      <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                    <div 
                      onClick={() => setInspectZoomImg({ url: selectedCase.photos.profileRight, title: 'نیم‌رخ راست - ' + selectedCase.fullName })}
                      className="relative h-64 bg-slate-900 rounded-2xl overflow-hidden cursor-zoom-in group shadow-xs"
                    >
                      <img
                        src={selectedCase.photos.profileRight}
                        alt="نیم‌رخ راست"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
                        بزرگ‌نمایی و زوم
                      </div>
                    </div>
                  </div>

                  {/* Profile Left */}
                  <div className="space-y-1">
                    <div className="text-[11px] font-bold text-slate-700 bg-slate-100 py-1 px-2.5 rounded-lg flex items-center justify-between">
                      <span>نیم‌رخ چپ ۹۰°</span>
                      <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                    <div 
                      onClick={() => setInspectZoomImg({ url: selectedCase.photos.profileLeft, title: 'نیم‌رخ چپ - ' + selectedCase.fullName })}
                      className="relative h-64 bg-slate-900 rounded-2xl overflow-hidden cursor-zoom-in group shadow-xs"
                    >
                      <img
                        src={selectedCase.photos.profileLeft}
                        alt="نیم‌رخ چپ"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
                        بزرگ‌نمایی و زوم
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. CLINICAL ANAMNESIS & EXPECTATIONS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-5 rounded-2xl border border-slate-200 text-xs">
                <div className="space-y-3">
                  <h5 className="font-bold text-slate-900 text-sm border-b border-slate-200 pb-2">
                    مشخصات بالینی و فیزیولوژیک:
                  </h5>
                  <div>
                    <span className="text-slate-500">سبک بینی درخواستی: </span>
                    <strong className="text-slate-900 font-bold">
                      {selectedCase.desiredStyle === 'natural' && 'طبیعی (Natural)'}
                      {selectedCase.desiredStyle === 'semi-fantasy' && 'نیمه‌فانتزی'}
                      {selectedCase.desiredStyle === 'fantasy' && 'فانتزی'}
                      {selectedCase.desiredStyle === 'undecided' && 'نظر تخصصی جراح'}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500">سابقه جراحی قبلی: </span>
                    <strong>
                      {selectedCase.hadPreviousSurgery ? `بله (جراحی ترمیمی - ${selectedCase.previousSurgeryYearsAgo} سال پیش)` : 'خیر (عمل اول)'}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500">مشکلات تنفسی اعلام شده: </span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedCase.breathingIssues.length > 0 ? (
                        selectedCase.breathingIssues.map((b, i) => (
                          <span key={i} className="bg-rose-100 text-rose-800 px-2 py-0.5 rounded-md font-semibold">
                            {b}
                          </span>
                        ))
                      ) : (
                        <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold">
                          بدون مشکل تنفسی
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h5 className="font-bold text-slate-900 text-sm border-b border-slate-200 pb-2">
                    انتظارات بیمار و سوابق دارویی:
                  </h5>
                  <div>
                    <span className="text-slate-500">انتظارات بیمار: </span>
                    <p className="mt-1 text-slate-800 bg-white p-2.5 rounded-xl border border-slate-200 leading-relaxed">
                      {selectedCase.expectations || 'توضیحی ثبت نشده است.'}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-500">سابقه بیماری یا داروی مصرفی: </span>
                    <strong className="text-slate-800">
                      {selectedCase.hasChronicDiseaseOrMed ? selectedCase.chronicDiseaseDetails : 'هیچ‌گونه بیماری زمینه‌ای گزارش نشده است.'}
                    </strong>
                  </div>
                </div>
              </div>

              {/* CURRENT STATUS NOTICE */}
              {selectedCase.status === 'approved' && selectedCase.appointment && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center justify-between">
                  <div>
                    <strong className="text-sm block">نوبت این پرونده تعیین شده است:</strong>
                    <span>تاریخ: {selectedCase.appointment.date} ساعت {selectedCase.appointment.time}</span>
                  </div>
                  <span className="bg-emerald-600 text-white font-bold px-3 py-1 rounded-lg">
                    پیامک ارسال شد
                  </span>
                </div>
              )}

              {selectedCase.status === 'rejected' && selectedCase.rejection && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs">
                  <strong className="text-sm block">این پرونده رد شده است:</strong>
                  <div>دلیل: {selectedCase.rejection.reason}</div>
                </div>
              )}

            </div>

            {/* Modal Actions Footer */}
            <div className="p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
              <button
                onClick={() => setSelectedCase(null)}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-4 py-2"
              >
                بستن
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowRejectModal(true)}
                  className="flex items-center gap-1.5 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 font-bold text-xs px-4 py-2.5 rounded-xl transition-colors"
                >
                  <XCircle className="w-4 h-4 text-rose-600" />
                  <span>رد درخواست / عدم امکان جراحی</span>
                </button>

                <button
                  onClick={() => setShowApproveModal(true)}
                  className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4 text-amber-300" />
                  <span>تایید و تعیین نوبت ویزیت (ارسال خودکار پیامک)</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================
          APPROVE & SCHEDULE APPOINTMENT POPUP
         ======================================================== */}
      {showApproveModal && selectedCase && (
        <div className="fixed inset-0 z-60 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-slate-200 animate-in zoom-in-95 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Calendar className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-sm text-slate-900">
                  تایید نوبت برای: {selectedCase.fullName}
                </h4>
              </div>
              <button onClick={() => setShowApproveModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">تاریخ نوبت (شمسی):</label>
                  <input
                    type="text"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    placeholder="۱۴۰۳/۰۸/۲۸"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-800 mb-1">ساعت حضور در مطب:</label>
                  <input
                    type="text"
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                    placeholder="۱۷:۳۰"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">آدرس مطب جهت درج در پیامک:</label>
                <input
                  type="text"
                  value={clinicAddress}
                  onChange={(e) => setClinicAddress(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">توضیحات و توصیه‌های پزشک برای بیمار:</label>
                <textarea
                  rows={3}
                  value={doctorNotes}
                  onChange={(e) => setDoctorNotes(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs outline-none leading-relaxed"
                />
              </div>

              {/* Instant SMS Dispatch Notice */}
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs flex items-center gap-2">
                <Send className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  با تایید نهایی، پیامک حاوی تاریخ، ساعت، آدرس و کد رهگیری به صورت آنی به شماره <strong>{selectedCase.phone}</strong> ارسال خواهد شد.
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowApproveModal(false)}
                className="text-xs font-semibold text-slate-600 px-4 py-2"
              >
                انصراف
              </button>
              <button
                type="button"
                disabled={isProcessingApprove}
                onClick={handleConfirmApprove}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-md transition-colors"
              >
                {isProcessingApprove ? 'در حال ثبت و ارسال پیامک...' : 'ثبت نهایی و ارسال پیامک به بیمار'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          REJECT CONSULTATION POPUP
         ======================================================== */}
      {showRejectModal && selectedCase && (
        <div className="fixed inset-0 z-60 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-slate-200 animate-in zoom-in-95 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center">
                  <XCircle className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-sm text-slate-900">
                  رد پرونده: {selectedCase.fullName}
                </h4>
              </div>
              <button onClick={() => setShowRejectModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-800 mb-1">دلیل اصلی عدم امکان جراحی / رد پرونده:</label>
                <select
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs outline-none"
                >
                  <option value="نیاز به معاینه حضوری فوری به دلیل ضخامت پوست یا پیچیدگی اسکلت">
                    نیاز به معاینه حضوری فوری به دلیل ضخامت پوست یا پیچیدگی اسکلت
                  </option>
                  <option value="عدم تطابق با معیارهای ایمنی جراحی و لزوم حفظ کامل تنفس">
                    عدم تطابق با معیارهای ایمنی جراحی و لزوم حفظ کامل تنفس
                  </option>
                  <option value="گذشت زمان ناکافی از جراحی قبلی (حداقل یک سال الزامی است)">
                    گذشت زمان ناکافی از جراحی قبلی (حداقل یک سال الزامی است)
                  </option>
                  <option value="نیاز به آزمایشات تکمیلی پیشرفته و سی‌تی اسکن سینوس">
                    نیاز به آزمایشات تکمیلی پیشرفته و سی‌تی اسکن سینوس
                  </option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">توضیح تکمیلی پزشک برای درج در پیامک:</label>
                <textarea
                  rows={3}
                  value={rejectExplanation}
                  onChange={(e) => setRejectExplanation(e.target.value)}
                  placeholder="جهت مشاوره تکمیلی می‌توانید با مطب تماس بگیرید..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs outline-none leading-relaxed"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowRejectModal(false)}
                className="text-xs font-semibold text-slate-600 px-4 py-2"
              >
                انصراف
              </button>
              <button
                type="button"
                disabled={isProcessingReject}
                onClick={handleConfirmReject}
                className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-md transition-colors"
              >
                {isProcessingReject ? 'در حال ثبت...' : 'ثبت رد و ارسال پیامک'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          IMAGE LIGHTBOX / ZOOM INSPECT MODAL
         ======================================================== */}
      {inspectZoomImg && (
        <div className="fixed inset-0 z-70 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center animate-in zoom-in-95">
            <div className="w-full flex items-center justify-between text-white pb-3 border-b border-white/20">
              <span className="text-sm font-bold">{inspectZoomImg.title}</span>
              <button
                onClick={() => setInspectZoomImg(null)}
                className="p-1.5 bg-white/20 hover:bg-white/30 rounded-xl text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="mt-4 rounded-2xl overflow-hidden max-h-[80vh] bg-black flex items-center justify-center">
              <img
                src={inspectZoomImg.url}
                alt={inspectZoomImg.title}
                className="max-h-[80vh] w-auto object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
