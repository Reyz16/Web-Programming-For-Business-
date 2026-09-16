import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles, Clock, CheckCircle, Truck, FileText } from 'lucide-react';
import { ThreeDLaundryMachine } from './ThreeDLaundryMachine';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onOpenPRD: () => void;
  onScrollTo: (id: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking, onOpenPRD, onScrollTo }) => {
  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-[#FDFBF7] via-[#FAF9F5] to-[#F4F2EB]">
      {/* Subtle Classic Architectural Grid Lines in background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial & Value Proposition */}
          <div className="lg:col-span-7 space-y-7">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-stone-200 shadow-2xs text-xs font-semibold text-stone-800">
              <span className="flex h-2 w-2 rounded-full bg-blue-600"></span>
              <span className="font-serif italic text-blue-950">Next-Gen Laundry Logistics</span>
              <span className="text-stone-300">|</span>
              <span className="text-stone-600 font-sans">CEO Reyhan • Web Programming for Business</span>
            </div>

            {/* Headline */}
            <div className="space-y-3">
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-slate-900 tracking-tight font-normal leading-[1.12]">
                Urusan Cucian Jadi Otomatis. <br />
                <span className="italic font-medium text-blue-800">Dijemput Bersih,</span> Diantar Wangi.
              </h1>
              <p className="text-base sm:text-lg text-stone-600 font-normal leading-relaxed max-w-2xl">
                Layanan on-demand yang menghubungkan Anda dengan mitra laundry lokal berstandar hotel. 
                Timbang digital transparan di depan pintu, pemisahan kain presisi, detergen antibakteri, dan pelacakan 3D real-time.
              </p>
            </div>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                onClick={onOpenBooking}
                id="hero-cta-booking"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-slate-900 hover:bg-blue-600 hover:shadow-lg transition-all duration-300 cursor-pointer group shadow-sm"
              >
                <Truck className="w-4 h-4 text-blue-300 group-hover:scale-110 transition-transform" />
                <span>Jadwalkan Penjemputan</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onScrollTo('how-it-works')}
                id="hero-cta-how"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold text-stone-700 bg-white hover:bg-stone-50 border border-stone-300 hover:border-stone-400 transition-all cursor-pointer shadow-2xs"
              >
                <span>Lihat Cara Kerja</span>
              </button>

              <button
                onClick={onOpenPRD}
                id="hero-cta-prd"
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-sm font-semibold text-amber-900 bg-amber-50 hover:bg-amber-100/80 border border-amber-300/80 transition-all cursor-pointer"
                title="Lihat dokumen perancangan sistem dan bisnis oleh Rey"
              >
                <FileText className="w-4 h-4 text-amber-700" />
                <span>Buka Dokumen PRD</span>
              </button>
            </div>

            {/* Key Value Points (Modern Classic Row) */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-stone-200/90 text-xs font-medium text-stone-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Timbang Digital di Lokasi</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Mitra Terverifikasi & Higienis</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Garansi Anti Baju Hilang</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Interactive Laundry Machine & Ecosystem */}
          <div className="lg:col-span-5 flex justify-center">
            <ThreeDLaundryMachine />
          </div>

        </div>
      </div>
    </section>
  );
};
