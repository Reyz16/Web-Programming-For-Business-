import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Berapa minimal berat untuk layanan jemput cuci kiloan?',
      a: 'Minimal order cuci kiloan adalah 3 kg. Jika cucian Anda kurang dari 3 kg, tetap akan dihitung 3 kg. Untuk pemesanan 5 kg ke atas, Anda mendapatkan promo GRATIS ongkos antar-jemput pulang-pergi!'
    },
    {
      q: 'Apakah cucian saya akan dicampur dengan cucian pelanggan lain?',
      a: 'Sama sekali TIDAK. SOP pickuplaundry menerapkan prinsip "1 Mesin 1 Pelanggan". Setiap cucian diberi kode barcode unik anti-tertukar dan dicuci secara terpisah di mesin terdedikasi.'
    },
    {
      q: 'Bagaimana jika ada pakaian yang luntur, rusak, atau hilang?',
      a: 'Sebelum dicuci, tim kami melakukan sortir dan memisahkan pakaian putih/berwarna. Jika terjadi kehilangan atau kerusakan akibat kelalaian mitra, kami memberikan Garansi Ganti Rugi hingga 10x lipat biaya cuci pakaian terkait.'
    },
    {
      q: 'Bagaimana cara pembayaran?',
      a: 'Pembayaran sangat fleksibel! Setelah driver menimbang pakaian Anda di depan pintu dan total biaya terkonfirmasi, Anda bisa membayar langsung lewat QRIS (GoPay, OVO, Dana, ShopeePay, BCA) atau Bayar di Tempat (COD) saat pakaian diantar kembali.'
    },
    {
      q: 'Saya pemilik usaha laundry, bagaimana skema kerjasamanya?',
      a: 'Mitra laundry mendapatkan pasokan pesanan rutin dari mahasiswa dan warga sekitar tanpa perlu pusing menggaji kurir pengantar. Pembagian hasil komisi 85% untuk mitra laundry dan 15% untuk platform pickuplaundry, dengan pencairan dana otomatis setiap minggu.'
    }
  ];

  return (
    <section id="faq" className="py-20 bg-white border-b border-stone-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-semibold uppercase tracking-wider">
            Tanya Jawab (FAQ)
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-slate-900">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Segala hal yang perlu Anda ketahui mengenai proses penjemputan, pencucian, dan garansi.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-stone-200 overflow-hidden bg-[#FAF9F6] transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-serif text-sm sm:text-base font-bold text-slate-900">
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-stone-500 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-blue-600' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-200/60">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
