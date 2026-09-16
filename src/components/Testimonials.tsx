import React from 'react';
import { TESTIMONIALS } from '../data/laundryData';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { Interactive3DCard } from './Interactive3DCard';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-xs font-semibold text-stone-700 tracking-wider uppercase">
            Bukti Nyata Kepuasan
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-slate-900 tracking-tight">
            Cerita dari <span className="italic font-medium text-blue-800">Pelanggan & Mitra</span>
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
            Bukan sekadar mencuci pakaian, kami mengembalikan waktu berharga Anda untuk fokus pada kuliah, karir, dan keluarga.
          </p>
        </div>

        {/* Testimonials 3D Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item, idx) => (
            <Interactive3DCard key={idx} maxTilt={8} className="h-full">
              <div className="h-full bg-[#FAF9F6] rounded-3xl p-7 border border-stone-200/90 shadow-sm flex flex-col justify-between relative group hover:shadow-md transition-all">
                
                {/* Quotation Mark Watermark */}
                <Quote className="w-10 h-10 text-stone-200 absolute top-6 right-6 pointer-events-none" />

                <div>
                  {/* Star Rating & Highlight Pill */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1 text-amber-500">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-100/70 text-blue-800 px-2.5 py-1 rounded-full">
                      {item.tag}
                    </span>
                  </div>

                  {/* Body Comment */}
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic mb-6">
                    "{item.comment}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-4 border-t border-stone-200/80 flex items-center justify-between">
                  <div>
                    <h4 className="font-serif text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      {item.name}
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                    </h4>
                    <p className="text-[11px] text-stone-500">{item.role}</p>
                    <p className="text-[10px] text-stone-400">{item.campus}</p>
                  </div>
                </div>

              </div>
            </Interactive3DCard>
          ))}
        </div>

      </div>
    </section>
  );
};
