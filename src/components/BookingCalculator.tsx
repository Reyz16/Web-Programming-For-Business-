import React, { useState } from 'react';
import { LAUNDRY_SERVICES, FRAGRANCE_OPTIONS, PARTNER_LAUNDRIES } from '../data/laundryData';
import { LaundryService, SimulatedOrder } from '../types';
import { Scale, Clock, Sparkles, MapPin, CheckCircle2, Truck, ArrowRight, Shield, Calendar } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Interactive3DCard } from './Interactive3DCard';

interface BookingCalculatorProps {
  selectedService: LaundryService;
  onSelectService: (service: LaundryService) => void;
  onOrderCreated: (order: SimulatedOrder) => void;
}

export const BookingCalculator: React.FC<BookingCalculatorProps> = ({
  selectedService,
  onSelectService,
  onOrderCreated
}) => {
  const [weightOrUnits, setWeightOrUnits] = useState<number>(4);
  const [selectedFragrance, setSelectedFragrance] = useState(FRAGRANCE_OPTIONS[0]);
  const [pickupTimeSlot, setPickupTimeSlot] = useState('Pagi (08:30 - 11:00 WIB)');
  const [customerName, setCustomerName] = useState('Reyhan');
  const [customerPhone, setCustomerPhone] = useState('0812-9876-5432');
  const [customerAddress, setCustomerAddress] = useState('Kosan Mahasiswa Kartika No. 18, Kamar 3B, Dekat Kampus');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccessModal, setOrderSuccessModal] = useState<SimulatedOrder | null>(null);

  // Subtotal calculations
  const subtotal = weightOrUnits * selectedService.pricePerUnit;
  // Free delivery for orders >= 5kg or subtotal >= 35,000
  const deliveryFee = subtotal >= 32000 ? 0 : 5000;
  const total = subtotal + deliveryFee;

  // Estimated completion calculation
  const getEstimatedCompletion = () => {
    const now = new Date();
    now.setHours(now.getHours() + selectedService.turnaroundHours);
    return now.toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    }) + ' WIB';
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);

      // Trigger Celebration Confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      const randomCode = `PL-${Math.floor(1000 + Math.random() * 9000)}`;
      const newOrder: SimulatedOrder = {
        orderId: randomCode,
        customerName: customerName || 'Pelanggan pickuplaundry',
        serviceName: `${selectedService.name} (${weightOrUnits} ${selectedService.unitLabel})`,
        weightKg: weightOrUnits,
        scent: selectedFragrance.name,
        partnerName: PARTNER_LAUNDRIES[0].name,
        driverName: 'Mas Danang Santoso',
        driverPhone: '0813-2211-9988',
        pickupAddress: customerAddress,
        totalPrice: total,
        estimatedDelivery: getEstimatedCompletion(),
        steps: [
          {
            step: 'driver_assigned',
            title: 'Kurir Menuju Lokasi Anda',
            description: `Driver Mas Danang sedang menuju alamat ${customerAddress}.`,
            timestamp: 'Baru saja',
            completed: true,
            current: true
          },
          {
            step: 'weighed_picked',
            title: 'Timbang Digital & Verifikasi Barcode',
            description: 'Pakaian akan ditimbang di tempat dan dimasukkan ke kantong berbarcode unik.',
            timestamp: 'Menunggu driver tiba',
            completed: false,
            current: false
          },
          {
            step: 'washing',
            title: 'Pencucian Higienis oleh Mitra',
            description: `Akan diproses di ${PARTNER_LAUNDRIES[0].name} dengan aroma ${selectedFragrance.name}.`,
            timestamp: '-',
            completed: false,
            current: false
          },
          {
            step: 'drying_ironing',
            title: 'Pengeringan & Setrika Uap',
            description: 'Perawatan uap tajam tanpa merusak serat kain.',
            timestamp: '-',
            completed: false,
            current: false
          },
          {
            step: 'delivering',
            title: 'Pengantaran Kembali',
            description: 'Diantar dalam keadaan bersih, wangi, dan tersegel rapi.',
            timestamp: `Estimasi ${getEstimatedCompletion()}`,
            completed: false,
            current: false
          },
          {
            step: 'completed',
            title: 'Pesanan Diterima',
            description: 'Selesai dan siap dipakai.',
            timestamp: '-',
            completed: false,
            current: false
          }
        ]
      };

      setOrderSuccessModal(newOrder);
      onOrderCreated(newOrder);
    }, 900);
  };

  return (
    <section id="calculator" className="py-24 bg-[#FAF9F6] border-b border-stone-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-xs font-semibold text-blue-900 tracking-wider uppercase">
            Simulasi & Pemesanan Instan
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-slate-900 tracking-tight">
            Kalkulator Tarif & <span className="italic font-medium text-blue-800">Jadwal Penjemputan</span>
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
            Hitung biaya cucian Anda secara transparan tanpa biaya tersembunyi. Driver kami akan menjemput sesuai jadwal yang Anda tentukan.
          </p>
        </div>

        {/* Main 2-Column Calculator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Interactive Form Controls */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-8">
            
            {/* 1. Service Selection Pills */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center justify-between">
                <span>1. Pilih Kategori Layanan</span>
                <span className="text-[11px] text-blue-600 font-medium">{selectedService.name}</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {LAUNDRY_SERVICES.map((s) => {
                  const active = selectedService.id === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => onSelectService(s)}
                      className={`p-3 rounded-xl text-left transition-all cursor-pointer border ${
                        active
                          ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                          : 'bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-200'
                      }`}
                    >
                      <div className="text-xs font-bold truncate">{s.name}</div>
                      <div className={`text-[11px] mt-0.5 ${active ? 'text-blue-300' : 'text-stone-500'}`}>
                        Rp {s.pricePerUnit.toLocaleString('id-ID')} / {s.unitLabel}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Weight / Quantity Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-blue-600" />
                  <span>2. Estimasi Berat / Jumlah Item</span>
                </label>
                <div className="font-serif text-2xl font-bold text-slate-900">
                  {weightOrUnits} <span className="text-sm font-sans font-medium text-stone-500">{selectedService.unitLabel}</span>
                </div>
              </div>

              {/* Range Slider */}
              <input
                type="range"
                min={selectedService.category === 'kiloan' ? 3 : 1}
                max={selectedService.category === 'kiloan' ? 25 : 10}
                step={selectedService.category === 'kiloan' ? 0.5 : 1}
                value={weightOrUnits}
                onChange={(e) => setWeightOrUnits(parseFloat(e.target.value))}
                className="w-full h-2.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />

              <div className="flex justify-between text-[11px] text-stone-400 font-medium">
                <span>Min. {selectedService.category === 'kiloan' ? '3 kg' : '1 pcs'}</span>
                <span>{selectedService.category === 'kiloan' ? 'Cucian Harian 4-6 kg (Baju Kosan 1 Minggu)' : 'Pakaian Satuan'}</span>
                <span>Max. {selectedService.category === 'kiloan' ? '25 kg' : '10 pcs'}</span>
              </div>
            </div>

            {/* 3. Fragrance Selection */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>3. Pilihan Aroma Parfum Premium (Gratis)</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
                {FRAGRANCE_OPTIONS.map((frag) => {
                  const active = selectedFragrance.id === frag.id;
                  return (
                    <button
                      key={frag.id}
                      type="button"
                      onClick={() => setSelectedFragrance(frag)}
                      className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                        active
                          ? 'border-blue-600 bg-blue-50/50 ring-1 ring-blue-500 shadow-2xs'
                          : 'border-stone-200 bg-white hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span 
                          className="w-3 h-3 rounded-full shrink-0" 
                          style={{ backgroundColor: frag.color }}
                        />
                        <span className="text-xs font-bold text-slate-900 truncate">{frag.name}</span>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-1 pl-5 truncate">
                        {frag.notes}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Time Slot & Customer Info Form */}
            <form onSubmit={handleBookingSubmit} className="space-y-4 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Nama Pemesan
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Contoh: Reyhan"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    No. WhatsApp (Aktif)
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="08xxxxxxxxxx"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Jadwal Penjemputan Driver
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    'Pagi (08:30 - 11:00 WIB)',
                    'Siang (13:00 - 15:30 WIB)',
                    'Malam (18:00 - 20:30 WIB)',
                  ].map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setPickupTimeSlot(slot)}
                      className={`p-2.5 rounded-xl text-center text-xs font-medium border transition-all cursor-pointer ${
                        pickupTimeSlot === slot
                          ? 'bg-blue-600 text-white border-blue-600 font-semibold'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Alamat Lengkap & Patokan Kosan
                </label>
                <textarea
                  rows={2}
                  required
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  placeholder="Nama Kosan / Komplek, Nomor Kamar, Patokan dekat..."
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                />
              </div>

              {/* Submit Trigger in Mobile view */}
              <div className="block lg:hidden pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Truck className="w-4 h-4" />
                  <span>{isSubmitting ? 'Memproses Penjemputan...' : `Jemput Sekarang — Rp ${total.toLocaleString('id-ID')}`}</span>
                </button>
              </div>
            </form>

          </div>

          {/* Right Column: 3D Summary Ticket / Invoice Card */}
          <div className="lg:col-span-5 sticky top-28">
            <Interactive3DCard maxTilt={10}>
              <div className="bg-gradient-to-b from-slate-900 to-[#0F172A] text-white rounded-3xl p-7 border border-slate-800 shadow-2xl space-y-6 relative overflow-hidden">
                
                {/* Visual Receipt Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-blue-400">
                      TIKET ESTIMASI PENJEMPUTAN
                    </span>
                    <h3 className="font-serif text-xl font-bold text-white mt-0.5">
                      pickuplaundry
                    </h3>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
                    <Truck className="w-5 h-5" />
                  </div>
                </div>

                {/* Live Details Breakdown */}
                <div className="space-y-3.5 text-xs">
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Layanan Terpilih</span>
                    <span className="font-semibold text-white">{selectedService.name}</span>
                  </div>

                  <div className="flex justify-between items-center text-slate-300">
                    <span>Berat / Kuantitas</span>
                    <span className="font-semibold text-white">
                      {weightOrUnits} {selectedService.unitLabel} @ Rp {selectedService.pricePerUnit.toLocaleString('id-ID')}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-slate-300">
                    <span>Aroma Pewangi</span>
                    <span className="font-semibold text-amber-300">{selectedFragrance.name}</span>
                  </div>

                  <div className="flex justify-between items-center text-slate-300">
                    <span>Jadwal Jemput</span>
                    <span className="font-semibold text-white">{pickupTimeSlot}</span>
                  </div>

                  <div className="flex justify-between items-center text-slate-300">
                    <span>Mitra Laundry Terdekat</span>
                    <span className="font-semibold text-emerald-400">{PARTNER_LAUNDRIES[0].name} (0.8 km)</span>
                  </div>

                  <div className="flex justify-between items-center text-slate-300">
                    <span>Estimasi Siap Antar</span>
                    <span className="font-semibold text-cyan-300">{getEstimatedCompletion()}</span>
                  </div>

                  <div className="border-t border-slate-800 pt-3 space-y-2">
                    <div className="flex justify-between text-slate-400">
                      <span>Subtotal Cucian</span>
                      <span>Rp {subtotal.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Ongkos Antar Jemput (PP)</span>
                      <span className={deliveryFee === 0 ? 'text-emerald-400 font-semibold' : ''}>
                        {deliveryFee === 0 ? 'GRATIS (Promo)' : `Rp ${deliveryFee.toLocaleString('id-ID')}`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Total Block */}
                <div className="border-t border-slate-700/80 pt-4 flex items-baseline justify-between">
                  <div>
                    <div className="text-[11px] text-slate-400 uppercase tracking-wider">Total Pembayaran</div>
                    <div className="text-[10px] text-slate-400">Bayar setelah ditimbang digital (QRIS / Tunai)</div>
                  </div>
                  <div className="text-right">
                    <div className="font-serif text-3xl font-bold text-white">
                      Rp {total.toLocaleString('id-ID')}
                    </div>
                  </div>
                </div>

                {/* Primary Booking Button */}
                <button
                  type="button"
                  onClick={handleBookingSubmit}
                  disabled={isSubmitting}
                  id="btn-confirm-order-calc"
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <Truck className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  <span>{isSubmitting ? 'Memproses Reservasi...' : 'Jadwalkan Penjemputan Otomatis'}</span>
                </button>

                {/* Trust Guarantee */}
                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
                  <Shield className="w-3.5 h-3.5 text-blue-400" />
                  <span>Tanpa DP • Bayar Aman Saat Cucian Diantar</span>
                </div>

              </div>
            </Interactive3DCard>
          </div>

        </div>

      </div>

      {/* Booking Success Modal */}
      {orderSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-7 border border-stone-200 shadow-2xl space-y-5">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-stone-500 uppercase">KODE RESI ANDA</span>
                <div className="font-mono text-xl font-bold text-blue-600">{orderSuccessModal.orderId}</div>
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="font-serif text-2xl font-bold text-slate-900">
                Penjemputan Berhasil Dijadwalkan!
              </h3>
              <p className="text-xs text-stone-600">
                Kurir telah ditugaskan dan sedang bersiap menuju alamat Anda. Notifikasi WhatsApp juga telah dikirimkan ke <span className="font-semibold text-slate-900">{customerPhone}</span>.
              </p>
            </div>

            {/* Order Details Brief */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-stone-500">Layanan:</span>
                <span className="font-semibold text-slate-900">{orderSuccessModal.serviceName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Aroma:</span>
                <span className="font-semibold text-amber-700">{orderSuccessModal.scent}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Kurir Penjemput:</span>
                <span className="font-semibold text-slate-900">{orderSuccessModal.driverName} ({orderSuccessModal.driverPhone})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Total Biaya:</span>
                <span className="font-bold text-blue-700">Rp {orderSuccessModal.totalPrice.toLocaleString('id-ID')}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => setOrderSuccessModal(null)}
                className="flex-1 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold cursor-pointer transition-colors"
              >
                Tutup Jendela
              </button>
              <a
                href="#tracking"
                onClick={() => setOrderSuccessModal(null)}
                className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold text-center cursor-pointer transition-colors shadow-sm"
              >
                Lacak Status Pesanan Ini →
              </a>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
