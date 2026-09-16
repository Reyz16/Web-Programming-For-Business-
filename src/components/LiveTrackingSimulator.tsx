import React, { useState } from 'react';
import { INITIAL_ORDERS } from '../data/laundryData';
import { SimulatedOrder } from '../types';
import { Search, CheckCircle, Clock, Truck, ShieldCheck, MapPin, Phone, AlertCircle, RefreshCw } from 'lucide-react';
import { Interactive3DCard } from './Interactive3DCard';

interface LiveTrackingSimulatorProps {
  currentOrder?: SimulatedOrder;
}

export const LiveTrackingSimulator: React.FC<LiveTrackingSimulatorProps> = ({ currentOrder }) => {
  const [searchCode, setSearchCode] = useState('PL-8892');
  const [activeOrder, setActiveOrder] = useState<SimulatedOrder>(currentOrder || INITIAL_ORDERS[0]);
  const [isSearching, setIsSearching] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setNotFound(false);

    setTimeout(() => {
      setIsSearching(false);
      const query = searchCode.trim().toUpperCase();

      if (currentOrder && currentOrder.orderId.toUpperCase() === query) {
        setActiveOrder(currentOrder);
      } else {
        const found = INITIAL_ORDERS.find(o => o.orderId.toUpperCase() === query);
        if (found) {
          setActiveOrder(found);
        } else {
          setNotFound(true);
        }
      }
    }, 400);
  };

  return (
    <section id="tracking" className="py-24 bg-white border-b border-stone-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 tracking-wider uppercase">
            Transparansi Real-Time
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-slate-900 tracking-tight">
            Lacak Status <span className="italic font-medium text-blue-800">Cucian Anda</span>
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
            Ketahui setiap detik posisi cucian Anda. Dari driver menjemput, proses cuci di mitra, hingga tahap pengantaran kembali.
          </p>

          {/* Quick Resi Input */}
          <form onSubmit={handleSearch} className="pt-4 max-w-md mx-auto flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                placeholder="Masukkan Nomor Resi (misal: PL-8892)"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 uppercase"
              />
            </div>
            <button
              type="submit"
              disabled={isSearching}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
            >
              {isSearching ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
              <span>Lacak</span>
            </button>
          </form>

          {notFound && (
            <p className="text-xs text-rose-600 mt-2 flex items-center justify-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Resi tidak ditemukan. Coba gunakan contoh <strong>PL-8892</strong>.</span>
            </p>
          )}
        </div>

        {/* Tracking 3D Dashboard Card */}
        <div className="max-w-4xl mx-auto">
          <Interactive3DCard maxTilt={6}>
            <div className="bg-[#FAF9F6] rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-xl space-y-8">
              
              {/* Top Banner Status */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-200 gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                      RESI: {activeOrder.orderId}
                    </span>
                    <span className="text-xs text-emerald-700 bg-emerald-100 font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                      Status Aktif
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-slate-900 mt-2">
                    {activeOrder.serviceName}
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Aroma Pilihan: <strong className="text-stone-700">{activeOrder.scent}</strong> • Berat: <strong className="text-stone-700">{activeOrder.weightKg} Kg</strong>
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <div className="text-[11px] text-stone-500 uppercase tracking-wider">Estimasi Siap Antar</div>
                  <div className="font-serif text-lg font-bold text-slate-900">
                    {activeOrder.estimatedDelivery}
                  </div>
                  <div className="text-xs text-stone-500">
                    Total: <span className="font-bold text-blue-600">Rp {activeOrder.totalPrice.toLocaleString('id-ID')}</span>
                  </div>
                </div>
              </div>

              {/* 3D Timeline Steps */}
              <div className="space-y-6">
                <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Tahapan Pengerjaan Cucian (6 Siklus)
                </div>

                <div className="relative pl-6 sm:pl-8 border-l-2 border-stone-200 space-y-8 ml-3">
                  {activeOrder.steps.map((step, idx) => {
                    const isDone = step.completed;
                    const isCurrent = step.current;

                    return (
                      <div key={idx} className="relative group">
                        {/* Step Marker Node */}
                        <div 
                          className={`absolute -left-[31px] sm:-left-[39px] top-0 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                            isDone
                              ? 'bg-emerald-600 border-white text-white shadow-md'
                              : isCurrent
                              ? 'bg-blue-600 border-blue-200 text-white ring-4 ring-blue-100 shadow-md animate-pulse'
                              : 'bg-stone-100 border-stone-300 text-stone-400'
                          }`}
                        >
                          {isDone ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : isCurrent ? (
                            <Clock className="w-4 h-4" />
                          ) : (
                            <span className="text-xs font-semibold">{idx + 1}</span>
                          )}
                        </div>

                        {/* Step Content */}
                        <div className={`p-4 rounded-2xl transition-all ${
                          isCurrent 
                            ? 'bg-white border border-blue-200 shadow-sm' 
                            : 'bg-transparent'
                        }`}>
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                            <div className="flex items-center gap-2">
                              <h4 className={`text-sm font-bold ${isCurrent ? 'text-blue-900' : isDone ? 'text-slate-900' : 'text-stone-500'}`}>
                                {step.title}
                              </h4>
                              {isCurrent && (
                                <span className="text-[10px] font-bold uppercase bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                                  Sedang Berlangsung
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-stone-500 font-mono">
                              {step.timestamp}
                            </span>
                          </div>
                          <p className="text-xs text-stone-600">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Partner & Driver Info Row */}
              <div className="pt-6 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-stone-200 flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase text-stone-400">Mitra Laundry Pelaksana</div>
                    <div className="text-xs font-bold text-slate-900">{activeOrder.partnerName}</div>
                    <div className="text-[11px] text-stone-500">Standar higienis hotel bintang 4</div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-stone-200 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase text-stone-400">Driver Penjemput</div>
                      <div className="text-xs font-bold text-slate-900">{activeOrder.driverName}</div>
                      <div className="text-[11px] text-stone-500">{activeOrder.driverPhone}</div>
                    </div>
                  </div>
                  <a
                    href={`tel:${activeOrder.driverPhone}`}
                    className="p-2.5 rounded-xl bg-stone-100 hover:bg-emerald-50 text-emerald-700 transition-colors"
                    title="Hubungi Driver"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </div>
              </div>

            </div>
          </Interactive3DCard>
        </div>

      </div>
    </section>
  );
};
