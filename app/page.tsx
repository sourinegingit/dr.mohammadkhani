'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { DoctorBio } from '@/components/DoctorBio';
import { Services } from '@/components/Services';
import { BeforeAfterGallery } from '@/components/BeforeAfterGallery';
import { Testimonials } from '@/components/Testimonials';
import { ConsultationForm } from '@/components/ConsultationForm';
import { AppointmentTracker } from '@/components/AppointmentTracker';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { Footer } from '@/components/Footer';
import { X, Calendar, Search, Sparkles } from 'lucide-react';

export default function Home() {
  // Modal / View states
  const [showConsultationModal, setShowConsultationModal] = useState<boolean>(false);
  const [showTrackerModal, setShowTrackerModal] = useState<boolean>(false);
  const [showAdminModal, setShowAdminModal] = useState<boolean>(false);
  const [prefilledTrackingCode, setPrefilledTrackingCode] = useState<string>('');
  const [selectedServiceForConsultation, setSelectedServiceForConsultation] = useState<string>('');

  const handleOpenConsultation = (serviceName?: string) => {
    if (serviceName) {
      setSelectedServiceForConsultation(serviceName);
    }
    setShowConsultationModal(true);
    setShowTrackerModal(false);
  };

  const handleOpenTracker = (trackingCode?: string) => {
    if (trackingCode) {
      setPrefilledTrackingCode(trackingCode);
    }
    setShowTrackerModal(true);
    setShowConsultationModal(false);
  };

  const handleScrollToGallery = () => {
    const el = document.getElementById('gallery');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleConsultationSuccess = (code: string) => {
    setPrefilledTrackingCode(code);
    setShowConsultationModal(false);
    setShowTrackerModal(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFCFF]">
      
      {/* Sticky Top Header */}
      <Navbar
        onOpenConsultation={() => handleOpenConsultation()}
        onOpenTracker={() => handleOpenTracker()}
        onOpenAdmin={() => setShowAdminModal(true)}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onOpenConsultation={() => handleOpenConsultation()}
          onOpenTracker={() => handleOpenTracker()}
          onScrollToGallery={handleScrollToGallery}
        />

        {/* Quick Access Floating Trigger for Fast Online Consultation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 mb-8 relative z-20">
          <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/90 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-right">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  سیستم مشاوره آنلاین و ارزیابی عکس‌های بینی (تمام‌رخ و نیم‌رخ)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  تکمیل فرم در ۴ مرحله ساده • دریافت فوری کد پیگیری یکتا • ارسال پیامک نوبت پس از تایید پزشک
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <button
                onClick={() => handleOpenTracker()}
                className="flex-1 md:flex-none flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-4 py-3 rounded-xl transition-colors"
              >
                <Search className="w-4 h-4 text-slate-600" />
                <span>پیگیری نوبت قبلی</span>
              </button>
              <button
                onClick={() => handleOpenConsultation()}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#0B2545] hover:bg-[#134074] text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-xl shadow-md transition-all whitespace-nowrap"
              >
                <Calendar className="w-4 h-4 text-amber-300" />
                <span>شروع مشاوره و بارگذاری عکس</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2. Doctor Bio & Credentials Section */}
        <DoctorBio />

        {/* 3. Surgical & Medical Services Section */}
        <Services onSelectService={(srv) => handleOpenConsultation(srv)} />

        {/* 4. Interactive Before & After Gallery Slider */}
        <BeforeAfterGallery onBookConsultation={() => handleOpenConsultation()} />

        {/* 5. Patient Testimonials Section */}
        <Testimonials />
      </main>

      {/* Footer Section */}
      <Footer
        onOpenConsultation={() => handleOpenConsultation()}
        onOpenTracker={() => handleOpenTracker()}
        onOpenAdmin={() => setShowAdminModal(true)}
      />

      {/* ========================================================
          MULTI-STEP ONLINE CONSULTATION & BOOKING MODAL
         ======================================================== */}
      {showConsultationModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="w-full max-w-4xl my-auto animate-in zoom-in-95 duration-200">
            <ConsultationForm
              defaultService={selectedServiceForConsultation}
              onClose={() => setShowConsultationModal(false)}
              onSuccessTracking={handleConsultationSuccess}
            />
          </div>
        </div>
      )}

      {/* ========================================================
          APPOINTMENT TRACKER MODAL
         ======================================================== */}
      {showTrackerModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-4xl my-auto p-4 sm:p-6 relative shadow-2xl animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowTrackerModal(false)}
              className="absolute top-5 left-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 z-10"
              title="بستن"
            >
              <X className="w-6 h-6" />
            </button>

            <AppointmentTracker
              initialCode={prefilledTrackingCode}
              onBackToHome={() => setShowTrackerModal(false)}
              onNewConsultation={() => {
                setShowTrackerModal(false);
                setShowConsultationModal(true);
              }}
            />
          </div>
        </div>
      )}

      {/* ========================================================
          DOCTOR / ADMIN DASHBOARD
         ======================================================== */}
      {showAdminModal && (
        <AdminDashboard onClose={() => setShowAdminModal(false)} />
      )}

    </div>
  );
}
