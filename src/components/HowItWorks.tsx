import React, { useState } from 'react';
import { Smartphone, Scale, Sparkles, Home, ChevronRight, Check } from 'lucide-react';
import { Interactive3DCard } from './Interactive3DCard';

export const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: '01',
      title: 'Pesan Jemputan dari HP',
      subtitle: 'Tanpa Perlu Antri',
      description: 'Cukup masukkan alamat kos/rumah, tentukan waktu penjemputan, dan pilih varian parfum mewah favorit Anda.',
      icon: Smartphone,
      accent: 'from-blue-500/20 to-indigo-500/10',
      badge: '1 Menit Reservasi',
      detail: 'Sistem algoritma Smart-Dispatch kami langsung mencocokkan pesanan Anda ke kurir dan mitra laundry terbaik dalam radius 2 km.'
    },
    {
      number: '02',
      title: 'Kurir Timbang di Depan Pintu',
      subtitle: 'Transparan & Bersegel Barcode',
      description: 'Driver tiba membawa timbangan digital bersertifikasi. Berat pakaian langsung dikonfirmasi di tempat sebelum dibawa.',
      icon: Scale,
      accent: 'from-amber-500/20 to-orange-500/10',
      badge: 'Anti Curang & Transparan',
      detail: 'Setiap kantong cucian diberikan segel barcode digital unik sehingga pakaian Anda mustahil tertukar dengan pelanggan lain.'
    },
    {
      number: '03',
      title: 'Dicuci Mitra Ahli Terkurasi',
      subtitle: '1 Mesin 1 Pelanggan',
      description: 'Pencucian higienis dengan pemisahan warna, air tersaring, detergen antibakteri ramah serat, dan setrika uap presisi.',
      icon: Sparkles,
      accent: 'from-emerald-500/20 to-teal-500/10',
      badge: 'Higienis & Rapi',
      detail: 'Kami memberlakukan SOP ketat standar hotel untuk mitra laundry. Tidak dicampur dengan cucian orang lain.'
    },
    {
      number: '04',
      title: 'Diantar Bersih Sampai Depan Pintu',
      subtitle: 'Tepat Waktu & Wangi Tahan 14 Hari',
      description: 'Pakaian terlipat rapi dalam kemasan tahan debu dan air. Siap dipakai atau langsung ditata di lemari pakaian.',
      icon: Home,
      accent: 'from-purple-500/20 to-pink-500/10',
      badge: 'Garansi Kepuasan',
      detail: 'Lacak posisi kurir pengantar secara real-time melalui web tracking tanpa perlu download aplikasi tambahan.'
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-[#FAF9F6] border-y border-stone-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-xs font-semibold text-stone-700 tracking-wider uppercase">
            Alur Otomatisasi
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-slate-900 tracking-tight">
            Bagaimana <span className="italic font-medium text-blue-800">pickuplaundry</span> Bekerja
          </h2>
          <p className="text-base text-stone-600 leading-relaxed font-normal">
            Solusi praktis bagi mahasiswa dan pekerja urban yang menghargai waktu. 
            Dari pakaian kotor menjadi tumpukan rapi dan harum dalam 4 langkah terstandarisasi.
          </p>
        </div>

        {/* 3D Interactive Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isCurrent = activeStep === idx;

            return (
              <Interactive3DCard
                key={step.number}
                id={`step-card-${idx}`}
                className="h-full"
                maxTilt={10}
              >
                <div 
                  onClick={() => setActiveStep(idx)}
                  className={`cursor-pointer h-full p-6 rounded-2xl bg-white border transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${
                    isCurrent 
                      ? 'border-blue-600 shadow-xl ring-2 ring-blue-500/20' 
                      : 'border-stone-200/90 shadow-sm hover:border-stone-300 hover:shadow-md'
                  }`}
                >
                  {/* Subtle Top Number & Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-3xl font-bold text-stone-300">
                      {step.number}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-stone-100 text-stone-700">
                      {step.badge}
                    </span>
                  </div>

                  {/* 3D Isometric-feel Icon Capsule */}
                  <div className="my-2">
                    <div 
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${step.accent} border border-stone-200/80 mb-5 shadow-inner transition-transform group-hover:scale-105`}
                    >
                      <Icon className="w-7 h-7 text-slate-900" />
                    </div>

                    <h3 className="font-serif text-xl font-semibold text-slate-900 mb-1">
                      {step.title}
                    </h3>
                    <div className="text-xs font-medium text-blue-700 mb-3">
                      {step.subtitle}
                    </div>
                    <p className="text-xs leading-relaxed text-stone-600">
                      {step.description}
                    </p>
                  </div>

                  {/* Expandable Detail Hint */}
                  <div className="mt-6 pt-4 border-t border-stone-100 text-[11px] text-stone-500 flex items-center justify-between">
                    <span>Klik untuk detail SOP</span>
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isCurrent ? 'rotate-90 text-blue-600' : ''}`} />
                  </div>
                </div>
              </Interactive3DCard>
            );
          })}
        </div>

        {/* Selected Step SOP Detail Spotlight Banner */}
        <div className="mt-12 bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/90 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="text-xs uppercase font-bold tracking-wider text-blue-700">
              SOP Standar Layanan — Langkah {steps[activeStep].number}
            </div>
            <h4 className="font-serif text-lg sm:text-xl font-semibold text-slate-900">
              {steps[activeStep].title} ({steps[activeStep].subtitle})
            </h4>
            <p className="text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
              {steps[activeStep].detail}
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200">
              <Check className="w-4 h-4" />
              <span>SOP Terverifikasi</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
