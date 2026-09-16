import { LaundryService, LaundryPartner, SimulatedOrder } from '../types';

export const LAUNDRY_SERVICES: LaundryService[] = [
  {
    id: 'cuci-komplit',
    name: 'Cuci Komplit Reguler',
    category: 'kiloan',
    pricePerUnit: 8000,
    unitLabel: 'kg',
    turnaroundHours: 24,
    description: 'Cuci bersih higienis, pengeringan mesin anti apek, setrika uap rapi & parfum premium.',
    popular: true,
    badge: 'Favorit Mahasiswa',
    features: ['Minimal 3 kg', 'Pemisahan warna pakaian', 'Plastik zip seal ramah lingkungan', 'Gratis antar-jemput min 5kg']
  },
  {
    id: 'express-6jam',
    name: 'Cuci Express Flash 6 Jam',
    category: 'express',
    pricePerUnit: 16000,
    unitLabel: 'kg',
    turnaroundHours: 6,
    description: 'Solusi darurat cucian bersih selesai dalam 6 jam. Prioritas mesin cuci dan driver khusus.',
    badge: 'Super Cepat',
    features: ['Prioritas antrian #1', 'Jemput dalam 20 menit', 'Pewangi tahan 7 hari', 'Garansi tepat waktu atau uang kembali']
  },
  {
    id: 'cuci-satuan-jas',
    name: 'Dry Clean & Satuan Mewah',
    category: 'satuan',
    pricePerUnit: 35000,
    unitLabel: 'pcs',
    turnaroundHours: 48,
    description: 'Perawatan khusus jas, blazer, kebaya, gamis sutra, & jaket kulit dengan metode dry clean profesional.',
    features: ['Teknologi dry clean tanpa luntur', 'Hanger kayu & cover pelindung', 'Inspeksi detail kancing & serat', 'Asuransi pakaian']
  },
  {
    id: 'shoes-bags',
    name: 'Care Sepatu & Tas Kulit',
    category: 'shoes_bags',
    pricePerUnit: 45000,
    unitLabel: 'pasang/pcs',
    turnaroundHours: 48,
    description: 'Deep cleaning sneakers, un-yellowing midsole, dan spa tas kulit dengan pelembab khusus.',
    badge: 'Sneakers & Leather',
    features: ['Pembersihan sol luar dalam', 'Treatment anti-jamur & bakteri', 'Pembersih berbahan natural organic', 'Finishing anti-air (water repellent)']
  },
  {
    id: 'bedcover-selimut',
    name: 'Bed Cover & Boneka Jumbo',
    category: 'satuan',
    pricePerUnit: 28000,
    unitLabel: 'pcs',
    turnaroundHours: 36,
    description: 'Pencucian bed cover king size, selimut tebal, sprei, dan boneka dengan mesin kapasitas 20kg.',
    features: ['Pembersihan tungau & debu alergen', 'Pengeringan total 100%', 'Wangi segar tahan lama', 'Kemasan vakum hemat ruang']
  }
];

export const FRAGRANCE_OPTIONS = [
  { id: 'fresh-lavender', name: 'French Lavender Relax', notes: 'Menenangkan, aroma spa mewah', color: '#8B5CF6' },
  { id: 'ocean-breeze', name: 'Ocean Clean Breeze', notes: 'Segar aktif, cocok untuk beraktivitas', color: '#0EA5E9' },
  { id: 'sakura-blossom', name: 'Tokyo Sakura Blossom', notes: 'Manis lembut floral khas musim semi', color: '#EC4899' },
  { id: 'sweet-vanilla', name: 'Vanilla Sandalwood Classic', notes: 'Klasik elegan, hangat & mewah', color: '#D97706' }
];

export const PARTNER_LAUNDRIES: LaundryPartner[] = [
  {
    id: 'p-01',
    name: 'Klinik Wangi Express Premium',
    area: 'Sekitar Kampus & Kost Mahasiswa',
    rating: 4.9,
    completedOrders: 3840,
    distanceKm: 0.8,
    verified: true,
    specialty: 'Spesialis Kiloan Cepat & Setrika Uap Tajam',
  },
  {
    id: 'p-02',
    name: 'EcoClean Organic Laundry Lab',
    area: 'Pusat Residensial & Perkantoran',
    rating: 4.95,
    completedOrders: 2190,
    distanceKm: 1.4,
    verified: true,
    specialty: 'Detergen Ramah Lingkungan & Kulit Sensitif',
  },
  {
    id: 'p-03',
    name: 'Atelier Dry Clean & Shoe Spa',
    area: 'Pusat Bisnis & Apartemen',
    rating: 4.88,
    completedOrders: 1450,
    distanceKm: 2.1,
    verified: true,
    specialty: 'Jas, Kebaya, Gaun & Sneakers Eksklusif',
  },
  {
    id: 'p-04',
    name: 'CleanFast 24H Hub',
    area: 'Zona Kost Putri & Asrama',
    rating: 4.85,
    completedOrders: 4200,
    distanceKm: 1.1,
    verified: true,
    specialty: 'Kapasitas Besar, Ready Pesanan Darurat',
  }
];

export const INITIAL_ORDERS: SimulatedOrder[] = [
  {
    orderId: 'PL-8892',
    customerName: 'Reyhan (CEO Demo)',
    serviceName: 'Cuci Komplit Reguler + Wangi Lavender',
    weightKg: 4.5,
    scent: 'French Lavender Relax',
    partnerName: 'Klinik Wangi Express Premium',
    driverName: 'Pak Budi Hartono',
    driverPhone: '0812-8877-6655',
    pickupAddress: 'Kost Griya Mahasiswa Sejahtera No. 12, Kamar 204',
    totalPrice: 36000,
    estimatedDelivery: 'Hari Ini, 19:30 WIB',
    steps: [
      {
        step: 'driver_assigned',
        title: 'Driver Mengambil Cucian',
        description: 'Driver Pak Budi telah menjemput pakaian kotor di lokasi Anda.',
        timestamp: '10:15 WIB',
        completed: true,
        current: false
      },
      {
        step: 'weighed_picked',
        title: 'Timbang Digital & Verifikasi Mitra',
        description: 'Telah diverifikasi berat 4.5 Kg di Mitra Klinik Wangi Express.',
        timestamp: '11:00 WIB',
        completed: true,
        current: false
      },
      {
        step: 'washing',
        title: 'Sedang Dicuci Higienis',
        description: 'Proses cuci drum 3 tahap pemisahan warna & detergen antibakteri.',
        timestamp: '11:45 WIB',
        completed: true,
        current: false
      },
      {
        step: 'drying_ironing',
        title: 'Pengeringan & Setrika Uap Rapi',
        description: 'Tahap penyetrikaan uap presisi dengan aroma French Lavender.',
        timestamp: '13:20 WIB',
        completed: false,
        current: true
      },
      {
        step: 'delivering',
        title: 'Driver Mengantar ke Alamat',
        description: 'Pakaian terbungkus rapi siap diantarkan kembali ke depan pintu Anda.',
        timestamp: 'Estimasi 19:00 WIB',
        completed: false,
        current: false
      },
      {
        step: 'completed',
        title: 'Pesanan Selesai Diterima',
        description: 'Cucian diterima dalam kondisi bersih, rapi, dan wangi.',
        timestamp: 'Estimasi 19:30 WIB',
        completed: false,
        current: false
      }
    ]
  }
];

export const TESTIMONIALS = [
  {
    name: 'Andira Putri',
    role: 'Mahasiswi Semester 6 & Pebisnis Online',
    campus: 'Universitas Indonesia',
    comment: 'Sebagai mahasiswi yang jadwal kuliahnya padat plus ngurus toko online, pickuplaundry bener-bener nyelametin waktu saya. Gak perlu lagi mikirin nenteng cucian berkilo-kilo ke laundry langganan!',
    rating: 5,
    tag: 'Hemat Waktu 4 Jam/Minggu'
  },
  {
    name: 'Dimas Wicaksono',
    role: 'Product Designer & Pekerja Remote',
    campus: 'Kost Eksklusif Senopati',
    comment: 'UI webnya juara banget! Beda sama aplikasi laundry biasa yang kaku. Fitur tracking 3D-nya transparan, berat timbangan jelas, dan hasilnya baju disetrika rapi tanpa ada kancing lepas.',
    rating: 5,
    tag: 'Setrika Uap Sangat Rapi'
  },
  {
    name: 'Hj. Siti Rohmah',
    role: 'Owner "Klinik Cuci Wangi" (Mitra)',
    campus: 'Mitra Wilayah Jakarta Selatan',
    comment: 'Sebelum gabung pickuplaundry, mesin cuci sering nganggur di jam siang. Sejak bermitra dengan Mas Rey dan tim, orderan dari mahasiswa & kost-kostan naik 65% tanpa perlu kami cari kurir sendiri.',
    rating: 5,
    tag: 'Omset Naik 65%'
  }
];
