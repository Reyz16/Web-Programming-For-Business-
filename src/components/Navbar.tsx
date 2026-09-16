import React, { useState, useEffect } from 'react';
import { Sparkles, FileText, Shirt, Truck, Search, Menu, X, CheckCircle2 } from 'lucide-react';

interface NavbarProps {
  onOpenPRD: () => void;
  onOpenTracking: () => void;
  onScrollTo: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPRD, onOpenTracking, onScrollTo }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FAF9F6]/90 backdrop-blur-md border-b border-stone-200/80 shadow-xs py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => onScrollTo('hero')}
          className="cursor-pointer flex items-center space-x-3 group"
          id="brand-logo"
        >
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200 border border-slate-700">
            <span className="font-serif font-bold text-lg text-amber-300">P</span>
            <span className="font-serif font-light text-sm -ml-0.5">L</span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold tracking-tight text-xl text-slate-900 flex items-center gap-1.5">
              pickuplaundry
              <span className="inline-block w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            </span>
            <span className="text-[10px] font-medium tracking-widest uppercase text-stone-500">
              Automated On-Demand Care
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-stone-700" id="desktop-nav">
          <button
            onClick={() => onScrollTo('how-it-works')}
            className="hover:text-blue-600 transition-colors cursor-pointer"
            id="nav-link-how-it-works"
          >
            Cara Kerja
          </button>
          <button
            onClick={() => onScrollTo('services')}
            className="hover:text-blue-600 transition-colors cursor-pointer"
            id="nav-link-services"
          >
            Layanan
          </button>
          <button
            onClick={() => onScrollTo('calculator')}
            className="hover:text-blue-600 transition-colors cursor-pointer"
            id="nav-link-calculator"
          >
            Cek Tarif & Estimasi
          </button>
          <button
            onClick={() => onScrollTo('partners')}
            className="hover:text-blue-600 transition-colors cursor-pointer"
            id="nav-link-partners"
          >
            Mitra Laundry
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center space-x-3" id="nav-actions">
          {/* Track Order Button */}
          <button
            onClick={onOpenTracking}
            id="btn-nav-track"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold text-stone-700 bg-white border border-stone-200 hover:border-blue-400 hover:text-blue-600 shadow-2xs transition-all cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 text-blue-600" />
            Lacak Pesanan
          </button>

          {/* Special PRD Button for Rey's Course Project */}
          <button
            onClick={onOpenPRD}
            id="btn-nav-prd"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold text-amber-900 bg-amber-50/90 border border-amber-300 hover:bg-amber-100 hover:border-amber-400 transition-all cursor-pointer shadow-2xs group"
            title="Dokumen Product Requirement Document (PRD) untuk Mata Kuliah Web Programming for Business"
          >
            <FileText className="w-3.5 h-3.5 text-amber-700 group-hover:scale-110 transition-transform" />
            <span>Dokumen PRD</span>
            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-amber-200/90 text-amber-900">
              Tugas Kuliah
            </span>
          </button>

          {/* Primary CTA: Jadwalkan Jemput */}
          <button
            onClick={() => onScrollTo('calculator')}
            id="btn-nav-booking"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-xs hover:shadow-md transition-all cursor-pointer"
          >
            <Truck className="w-3.5 h-3.5" />
            Jemput Sekarang
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="md:hidden flex items-center space-x-2">
          <button
            onClick={onOpenPRD}
            className="p-2 text-xs font-semibold text-amber-900 bg-amber-50 border border-amber-300 rounded-md"
            title="Buka PRD"
          >
            PRD
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md text-stone-700 hover:bg-stone-100"
            id="btn-mobile-menu-toggle"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-b border-stone-200 px-4 pt-3 pb-6 space-y-3 mt-3 shadow-lg">
          <button
            onClick={() => { onScrollTo('how-it-works'); setMobileMenuOpen(false); }}
            className="block w-full text-left py-2 text-sm font-medium text-stone-800"
          >
            Cara Kerja
          </button>
          <button
            onClick={() => { onScrollTo('services'); setMobileMenuOpen(false); }}
            className="block w-full text-left py-2 text-sm font-medium text-stone-800"
          >
            Layanan & Harga
          </button>
          <button
            onClick={() => { onScrollTo('calculator'); setMobileMenuOpen(false); }}
            className="block w-full text-left py-2 text-sm font-medium text-stone-800"
          >
            Kalkulator & Booking
          </button>
          <button
            onClick={() => { onScrollTo('partners'); setMobileMenuOpen(false); }}
            className="block w-full text-left py-2 text-sm font-medium text-stone-800"
          >
            Mitra Laundry UMKM
          </button>
          <div className="pt-2 border-t border-stone-100 flex flex-col gap-2">
            <button
              onClick={() => { onOpenTracking(); setMobileMenuOpen(false); }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold bg-stone-100 text-stone-800"
            >
              <Search className="w-4 h-4 text-blue-600" />
              Lacak Pesanan (Tracking)
            </button>
            <button
              onClick={() => { onOpenPRD(); setMobileMenuOpen(false); }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-200"
            >
              <FileText className="w-4 h-4 text-amber-700" />
              Buka Dokumen PRD (Web Programming for Business)
            </button>
            <button
              onClick={() => { onScrollTo('calculator'); setMobileMenuOpen(false); }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold bg-blue-600 text-white shadow-xs"
            >
              <Truck className="w-4 h-4" />
              Pesan Jemputan Sekarang
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
