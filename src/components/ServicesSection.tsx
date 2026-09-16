import React, { useState } from 'react';
import { LAUNDRY_SERVICES } from '../data/laundryData';
import { LaundryService } from '../types';
import { Sparkles, Clock, Check, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { Interactive3DCard } from './Interactive3DCard';

interface ServicesSectionProps {
  onSelectService: (service: LaundryService) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'kiloan' | 'satuan' | 'express' | 'shoes_bags'>('all');

  const filteredServices = activeCategory === 'all' 
    ? LAUNDRY_SERVICES 
    : LAUNDRY_SERVICES.filter(s => s.category === activeCategory);

  return (
    <section id="services" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-blue-800 tracking-wider uppercase">
              Katalog Layanan Unggulan
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-slate-900 tracking-tight">
              Pilihan Perawatan <span className="italic font-medium text-blue-800">Cucian Terbaik</span>
            </h2>
            <p className="text-sm sm:text-base text-stone-600 font-normal leading-relaxed">
              Mulai dari pakaian harian mahasiswa, seragam kerja, pakaian pesta, hingga sepatu sneakers favorit. Dikerjakan dengan teknologi modern dan detergen ramah lingkungan.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'Semua' },
              { id: 'kiloan', label: 'Kiloan Hemat' },
              { id: 'express', label: 'Express 6 Jam' },
              { id: 'satuan', label: 'Dry Clean & Satuan' },
              { id: 'shoes_bags', label: 'Sepatu & Tas' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services 3D Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <Interactive3DCard
              key={service.id}
              id={`service-card-${service.id}`}
              className="h-full"
              maxTilt={8}
            >
              <div className={`h-full rounded-2xl p-7 flex flex-col justify-between border transition-all duration-300 relative ${
                service.popular 
                  ? 'bg-gradient-to-b from-blue-50/40 via-white to-white border-blue-500/50 shadow-lg ring-1 ring-blue-500/20' 
                  : 'bg-white border-stone-200/90 shadow-2xs hover:shadow-md'
              }`}>
                
                {/* Popular or Category Badge */}
                {service.badge && (
                  <div className="absolute -top-3 right-6 bg-slate-900 text-amber-300 text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full shadow-sm flex items-center gap-1 border border-slate-700">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span>{service.badge}</span>
                  </div>
                )}

                <div>
                  {/* Category and Turnaround */}
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-3">
                    <span className="uppercase tracking-wider font-semibold text-blue-700">
                      {service.category.toUpperCase()}
                    </span>
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      Estimasi {service.turnaroundHours} Jam
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-serif text-2xl font-bold text-slate-900 mb-2">
                    {service.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6 font-normal">
                    {service.description}
                  </p>

                  {/* Price Block */}
                  <div className="py-4 border-y border-stone-100 flex items-baseline gap-1.5 mb-6">
                    <span className="text-xs font-semibold text-stone-500">Rp</span>
                    <span className="font-serif text-3xl font-bold text-slate-900">
                      {service.pricePerUnit.toLocaleString('id-ID')}
                    </span>
                    <span className="text-xs text-stone-500 font-medium">
                      / {service.unitLabel}
                    </span>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-2.5 mb-8">
                    {service.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-stone-700">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Booking Trigger Button */}
                <button
                  onClick={() => onSelectService(service)}
                  id={`btn-select-service-${service.id}`}
                  className={`w-full py-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    service.popular
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                      : 'bg-stone-100 hover:bg-slate-900 hover:text-white text-stone-800'
                  }`}
                >
                  <span>Pilih & Hitung di Kalkulator</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

              </div>
            </Interactive3DCard>
          ))}
        </div>

        {/* Quality Guarantee Footnote */}
        <div className="mt-12 p-6 rounded-2xl bg-stone-50 border border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-900">Jaminan Kualitas 100% Bebas Khawatir</h4>
              <p className="text-xs text-stone-600">Garansi cuci ulang gratis jika kurang wangi, dan penggantian rugi jika pakaian rusak atau hilang.</p>
            </div>
          </div>
          <span className="text-xs font-semibold text-blue-700 underline cursor-pointer shrink-0">
            Baca Kebijakan Garansi Kami →
          </span>
        </div>

      </div>
    </section>
  );
};
