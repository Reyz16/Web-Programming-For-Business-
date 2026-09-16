import React from 'react';
import { Shirt, ShieldCheck, Heart, FileText, ArrowUp, Phone, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  onOpenPRD: () => void;
  onScrollTo: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPRD, onScrollTo }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-white pt-16 pb-12 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-900">
          
          {/* Col 1: Brand & Mission */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={scrollToTop}>
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center border border-slate-700">
                <span className="font-serif font-bold text-lg text-amber-300">P</span>
                <span className="font-serif font-light text-sm -ml-0.5">L</span>
              </div>
              <span className="font-serif font-bold text-2xl tracking-tight text-white">
                pickuplaundry
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Platform jemput antar laundry otomatis berbasis kemitraan UMKM. Menghadirkan kepraktisan hidup bagi mahasiswa dan kaum profesional dengan jaminan higienis 1 mesin 1 pelanggan.
            </p>

            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 space-y-1">
              <div className="font-semibold text-amber-300 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                <span>Web Programming for Business — Project Showcase</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Dirancang dan dipimpin oleh <strong>Rey (CEO pickuplaundry)</strong> sebagai model bisnis digital terintegrasi.
              </p>
            </div>
          </div>

          {/* Col 2: Layanan */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Layanan
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button onClick={() => onScrollTo('services')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  Cuci Komplit Kiloan
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('services')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  Express Flash 6 Jam
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('services')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  Dry Clean Satuan & Jas
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('services')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  Sneakers & Leather Care
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('services')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  Bed Cover & Karpet
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Kemitraan */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Ekosistem
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button onClick={() => onScrollTo('partners')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  Gabung Mitra Laundry
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('partners')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  Daftar Driver Logistik
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('how-it-works')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  Standar Higienis SOP
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('tracking')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  Lacak Resi Cucian
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Business Document & Project */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Dokumen Proyek
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Akses dokumen lengkap perancangan sistem informasi bisnis, spesifikasi ERD, dan analisis kebutuhan produk.
            </p>
            <button
              onClick={onOpenPRD}
              className="w-full py-2.5 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Buka Dokumen PRD Kuliah</span>
            </button>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            © 2026 <strong>pickuplaundry</strong> by Rey. All rights reserved. Built for Web Programming for Business.
          </div>

          <div className="flex items-center space-x-6">
            <span className="text-slate-400">Garansi Higienis 100%</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-400">Timbang Digital Transparan</span>
            <span className="text-slate-400">•</span>
            <button
              onClick={scrollToTop}
              className="hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <span>Ke Atas</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
