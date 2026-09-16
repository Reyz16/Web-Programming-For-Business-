import React, { useState } from 'react';
import { PARTNER_LAUNDRIES } from '../data/laundryData';
import { Store, TrendingUp, Users, Shield, ArrowRight, CheckCircle2, DollarSign } from 'lucide-react';
import { Interactive3DCard } from './Interactive3DCard';

export const PartnerSection: React.FC = () => {
  const [capacityPerDay, setCapacityPerDay] = useState(50); // kg
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const [partnerType, setPartnerType] = useState<'laundry' | 'driver'>('laundry');
  const [submitted, setSubmitted] = useState(false);

  // Revenue estimation
  // Average profit per kg for partner = Rp 5,500
  const estimatedMonthlyAdditional = capacityPerDay * 5500 * 26;

  const handleSubmitPartner = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setPartnerModalOpen(false);
    }, 2000);
  };

  return (
    <section id="partners" className="py-24 bg-[#FAF9F6] border-b border-stone-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-200 text-xs font-semibold text-amber-900 tracking-wider uppercase">
            Ekosistem & Kemitraan UMKM
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-slate-900 tracking-tight">
            Tumbuh Bersama <span className="italic font-medium text-blue-800">pickuplaundry</span>
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
            Bagi pemilik usaha laundry dan driver lokal: Kami bawa pelanggan mahasiswa dan perkantoran langsung ke mesin cuci Anda tanpa perlu pusing urusan armada pengiriman.
          </p>
        </div>

        {/* 2-Column Partner Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Benefits & Value Prop */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
                Punya Mesin Cuci Menganggur di Jam Siang?
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Rata-rata UMKM laundry mengalami idle capacity hingga 40% di hari kerja. pickuplaundry mengalokasikan pesanan dari kluster kosan mahasiswa dan apartemen terdekat langsung ke workshop Anda.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {[
                {
                  title: 'Bebas Biaya Armada & Kurir',
                  desc: 'Kurir pickuplaundry yang mengambil pakaian kotor dan mengantarkannya kembali ke pelanggan.'
                },
                {
                  title: 'Pencairan Dana Mingguan Otomatis',
                  desc: 'Pendapatan langsung ditransfer ke rekening bank mitra setiap hari Selasa tanpa potongan tersembunyi.'
                },
                {
                  title: 'Aplikasi Kasir & Barcode Digital Gratis',
                  desc: 'Sistem POS digital untuk melacak cucian, mencegah pakaian tertukar, dan rekap keuangan otomatis.'
                }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-stone-200/80 shadow-2xs">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                    <p className="text-[11px] text-stone-500 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => { setPartnerType('laundry'); setPartnerModalOpen(true); }}
                className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer flex items-center gap-2"
              >
                <Store className="w-4 h-4" />
                <span>Daftar Jadi Mitra Laundry</span>
              </button>
              <button
                onClick={() => { setPartnerType('driver'); setPartnerModalOpen(true); }}
                className="px-5 py-3 rounded-xl bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-2 shadow-2xs"
              >
                <Users className="w-4 h-4 text-blue-600" />
                <span>Daftar Jadi Driver Mitra</span>
              </button>
            </div>
          </div>

          {/* Right Column: 3D Interactive Partner Income Estimator */}
          <div className="lg:col-span-6">
            <Interactive3DCard maxTilt={8}>
              <div className="bg-white rounded-3xl p-7 sm:p-9 border border-stone-200/90 shadow-xl space-y-7">
                
                <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Kalkulator Potensi Omset Mitra</h4>
                      <p className="text-[11px] text-stone-500">Estimasi pendapatan tambahan per bulan</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-1 rounded-md">
                    Margin Bersih
                  </span>
                </div>

                {/* Capacity Slider */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-stone-700">Kapasitas Mesin Cuci Tersedia per Hari</span>
                    <span className="font-serif text-xl font-bold text-blue-700">
                      {capacityPerDay} <span className="text-xs font-sans text-stone-500">kg/hari</span>
                    </span>
                  </div>

                  <input
                    type="range"
                    min={15}
                    max={200}
                    step={5}
                    value={capacityPerDay}
                    onChange={(e) => setCapacityPerDay(parseInt(e.target.value))}
                    className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />

                  <div className="flex justify-between text-[11px] text-stone-400 font-medium">
                    <span>15 kg (Laundry Kecil)</span>
                    <span>50 kg (Standard)</span>
                    <span>200 kg (Workshop Besar)</span>
                  </div>
                </div>

                {/* Simulated Earnings Display */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-[#1E293B] text-white space-y-2">
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider">
                    Estimasi Tambahan Profit Bersih / Bulan
                  </div>
                  <div className="font-serif text-3xl sm:text-4xl font-bold text-amber-300">
                    Rp {estimatedMonthlyAdditional.toLocaleString('id-ID')}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    *Berdasarkan 26 hari operasional dengan alokasi pesanan pickuplaundry
                  </div>
                </div>

                {/* Top Partner Proof */}
                <div className="space-y-2 pt-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">
                    Mitra Terverifikasi di Area Kampus
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {PARTNER_LAUNDRIES.slice(0, 2).map((p) => (
                      <div key={p.id} className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                        <div className="font-bold text-slate-900 truncate">{p.name}</div>
                        <div className="text-[11px] text-stone-500 mt-0.5">{p.completedOrders}+ cucian selesai</div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </Interactive3DCard>
          </div>

        </div>

      </div>

      {/* Partner Registration Modal */}
      {partnerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-7 border border-stone-200 shadow-2xl space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl font-bold text-slate-900">
                Pendaftaran Kemitraan {partnerType === 'laundry' ? 'Laundry UMKM' : 'Driver Logistik'}
              </h3>
              <button
                onClick={() => setPartnerModalOpen(false)}
                className="text-stone-400 hover:text-stone-700 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            {submitted ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-serif text-lg font-bold text-slate-900">Terima Kasih!</h4>
                <p className="text-xs text-stone-600">
                  Tim operasional pickuplaundry akan menghubungi nomor WhatsApp Anda dalam 1x24 jam untuk verifikasi lokasi dan survey workshop.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitPartner} className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Nama Pemilik / Pelamar</label>
                  <input
                    type="text"
                    required
                    placeholder="Nama Lengkap"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">
                    {partnerType === 'laundry' ? 'Nama Usaha Laundry' : 'Kendaraan Motor & Plat Nomor'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={partnerType === 'laundry' ? 'Contoh: Laundry Berkah Bersih' : 'Honda Beat / B 1234 XYZ'}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Nomor WhatsApp</label>
                  <input
                    type="tel"
                    required
                    placeholder="08123456789"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Alamat Domisili / Workshop</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Alamat lengkap..."
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setPartnerModalOpen(false)}
                    className="flex-1 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold cursor-pointer shadow-sm"
                  >
                    Kirim Formulir Mitra
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </section>
  );
};
