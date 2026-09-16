import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { HowItWorks } from './components/HowItWorks';
import { ServicesSection } from './components/ServicesSection';
import { BookingCalculator } from './components/BookingCalculator';
import { LiveTrackingSimulator } from './components/LiveTrackingSimulator';
import { PartnerSection } from './components/PartnerSection';
import { Testimonials } from './components/Testimonials';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { PrdModal } from './components/PrdModal';
import { LAUNDRY_SERVICES, INITIAL_ORDERS } from './data/laundryData';
import { LaundryService, SimulatedOrder } from './types';
import { FileText, Sparkles } from 'lucide-react';

export default function App() {
  const [selectedService, setSelectedService] = useState<LaundryService>(LAUNDRY_SERVICES[0]);
  const [isPrdOpen, setIsPrdOpen] = useState(false);
  const [latestOrder, setLatestOrder] = useState<SimulatedOrder>(INITIAL_ORDERS[0]);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectService = (service: LaundryService) => {
    setSelectedService(service);
    handleScrollTo('calculator');
  };

  const handleOrderCreated = (order: SimulatedOrder) => {
    setLatestOrder(order);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#191D24] font-sans selection:bg-blue-600 selection:text-white relative">
      
      {/* Top Notification Bar for Course Identification */}
      <div className="bg-slate-900 text-stone-300 text-[11px] py-1.5 px-4 text-center border-b border-slate-800 flex items-center justify-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
        <span>
          <strong>Proyek Bisnis Digital:</strong> pickuplaundry oleh <strong>Rey (CEO)</strong> untuk Mata Kuliah <em>Web Programming for Business</em>
        </span>
        <button
          onClick={() => setIsPrdOpen(true)}
          className="ml-2 text-amber-300 font-semibold underline hover:text-amber-200 cursor-pointer text-[10px] uppercase tracking-wider"
        >
          Lihat Dokumen PRD →
        </button>
      </div>

      {/* Main Navigation */}
      <Navbar
        onOpenPRD={() => setIsPrdOpen(true)}
        onOpenTracking={() => handleScrollTo('tracking')}
        onScrollTo={handleScrollTo}
      />

      {/* Hero Section with 3D Laundry Hub & Controls */}
      <HeroSection
        onOpenBooking={() => handleScrollTo('calculator')}
        onOpenPRD={() => setIsPrdOpen(true)}
        onScrollTo={handleScrollTo}
      />

      {/* How it Works (4 3D Steps) */}
      <HowItWorks />

      {/* Services Showcase */}
      <ServicesSection onSelectService={handleSelectService} />

      {/* Interactive Booking & Cost Calculator */}
      <BookingCalculator
        selectedService={selectedService}
        onSelectService={setSelectedService}
        onOrderCreated={handleOrderCreated}
      />

      {/* Live Order Tracking Simulator */}
      <LiveTrackingSimulator currentOrder={latestOrder} />

      {/* Partner Laundry & Driver UMKM Ecosystem */}
      <PartnerSection />

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ */}
      <FaqSection />

      {/* Modern Classic Footer */}
      <Footer
        onOpenPRD={() => setIsPrdOpen(true)}
        onScrollTo={handleScrollTo}
      />

      {/* Floating Quick Action Button for Course PRD */}
      <aside aria-label="Aksi Cepat Dokumen PRD" className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsPrdOpen(true)}
          id="btn-floating-prd"
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-slate-900 text-white border border-slate-700 shadow-2xl hover:bg-blue-600 hover:border-blue-500 hover:scale-105 transition-all duration-200 cursor-pointer group"
          title="Buka Dokumen PRD untuk Tugas Kuliah Web Programming for Business"
        >
          <div className="w-6 h-6 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center border border-amber-400/40">
            <FileText className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-semibold tracking-wide">
            Dokumen PRD
          </span>
          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-400 text-slate-900 uppercase">
            Kuliah
          </span>
        </button>
      </aside>

      {/* Full-Featured Product Requirement Document (PRD) Modal */}
      <PrdModal
        isOpen={isPrdOpen}
        onClose={() => setIsPrdOpen(false)}
      />

    </div>
  );
}
