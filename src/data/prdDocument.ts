export interface PRDDoc {
  projectTitle: string;
  version: string;
  author: string;
  role: string;
  course: string;
  lastUpdated: string;
  status: string;
  executiveSummary: string;
  problemStatement: string;
  proposedSolution: string;
  businessModel: {
    title: string;
    description: string;
    points: string[];
  }[];
  userPersonas: {
    personaName: string;
    role: string;
    painPoints: string[];
    needs: string[];
    quote: string;
  }[];
  techStack: {
    layer: string;
    technologies: string;
    rationale: string;
  }[];
  databaseSchema: {
    table: string;
    description: string;
    columns: { name: string; type: string; key: string; description: string }[];
  }[];
  functionalRequirements: {
    code: string;
    module: string;
    feature: string;
    priority: 'High (P0)' | 'Medium (P1)' | 'Low (P2)';
    acceptanceCriteria: string;
  }[];
  apiSpecifications: {
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    endpoint: string;
    description: string;
    requestBody?: string;
    responseBody: string;
  }[];
  developmentRoadmap: {
    sprint: string;
    timeline: string;
    focus: string;
    deliverables: string[];
  }[];
  kpis: {
    metric: string;
    target: string;
    category: string;
  }[];
}

export const PRD_DATA: PRDDoc = {
  projectTitle: "PRD: Platform On-Demand 'pickuplaundry' (Automated Pickup & Delivery)",
  version: "1.0.0 (Production Blueprint)",
  author: "Rey",
  role: "Chief Executive Officer (CEO) & Lead Product Architect",
  course: "Web Programming for Business",
  lastUpdated: "September 2026",
  status: "Approved for Implementation",
  executiveSummary: "pickuplaundry adalah solusi digital aggregator berbasis web yang menjembatani pelanggan (mahasiswa, pekerja sibuk, keluarga modern) dengan ekosistem mitra laundry kiloan dan satuan lokal. Melalui otomatisasi penjadwalan penjemputan, penimbangan transparan, serta sistem pelacakan status cucian real-time, pickuplaundry mentransformasi industri laundry konvensional menjadi layanan terstandarisasi, higienis, dan tanpa repot.",
  problemStatement: "1) Bagi Konsumen: Mahasiswa dan pekerja kantor kehilangan 3–5 jam per minggu untuk mengantar, mengantri, dan mengambil cucian; sering mengalami insiden pakaian tertukar, luntur, atau hilang tanpa pertanggungjawaban jelas.\n2) Bagi Mitra Laundry UMKM: Memiliki kapasitas mesin yang 'idle' (menganggur) hingga 40% pada jam sepi karena keterbatasan jangkauan fisik dan tingginya biaya rekrutmen kurir sendiri.",
  proposedSolution: "Platform web terintegrasi dengan algoritma Smart Dispatch yang menghubungkan permintaan penjemputan ke mitra laundry terdekat dengan kapasitas aktif. Dilengkapi antarmuka interaktif 3D yang estetik, estimasi biaya transparan, verifikasi berat digital sebelum pencucian, serta tracking live.",
  businessModel: [
    {
      title: "Revenue Sharing Mitra (15% - 20%)",
      description: "Platform memotong komisi 15% dari total nilai transaksi cucian yang berhasil diselesaikan oleh mitra laundry UMKM.",
      points: ["Menjamin harga bagi konsumen tetap setara atau kompetitif dengan walk-in price", "Mitra mendapatkan volume pesanan baru tanpa beban marketing"]
    },
    {
      title: "Convenience & Delivery Surcharge",
      description: "Tarif flat ongkir Rp 5.000 untuk jarak < 3km, atau GRATIS untuk pemesanan di atas 5 kg (cross-subsidized). Opsi Express 6 Jam dikenakan biaya premium (+100%).",
      points: ["Insentif untuk pengemudi mitra lokal", "Driver pool dioptimalkan dengan batch pick-up per kluster area"]
    },
    {
      title: "Paket Langganan Mahasiswa ('Sultan Kosan')",
      description: "Model subscription bulanan: Rp 149.000/bulan untuk kuota 25 kg cucian komplit + 4x gratis jemput antar instan dan jaminan detergen antibakteri.",
      points: ["Memberikan prediktabilitas Monthly Recurring Revenue (MRR)", "Meningkatkan customer retention hingga 78%"]
    }
  ],
  userPersonas: [
    {
      personaName: "Dimas (21 thn) - Mahasiswa Rantau Kosan",
      role: "End User Utama",
      painPoints: ["Gak punya kendaraan untuk bawa tumpukan cucian berat", "Sering lupa ambil cucian sampai laundry tutup", "Uang bulanan ketat, butuh kepastian harga di awal"],
      needs: ["Pesan jemput dari kamar kos", "Pengingat status via WhatsApp/Web", "Pembayaran mudah dengan QRIS / E-wallet"],
      quote: "Gua cuma mau pulang kuliah baju udah bersih wangi di depan pintu kamar, gak perlu pusing mikirin nyuci di sela tugas skripsi."
    },
    {
      personaName: "Bu Ratna (46 thn) - Pemilik Laundry 'Wangi Jaya'",
      role: "Mitra Laundry UMKM",
      painPoints: ["Mesin 10 unit sering nganggur di hari kerja", "Kewalahan bayar gaji tetap kurir motor", "Pencatatan nota kertas sering hilang"],
      needs: ["Orderan rutin masuk tiap hari", "Dashboard pencatatan digital yang simpel di HP", "Pencairan dana otomatis yang cepat"],
      quote: "Kalau ada aplikasi yang bantu bawain cucian ke toko saya dan langsung bayar, saya siap fokus jaga mutu cucian dan setrikaan."
    },
    {
      personaName: "Fajar (26 thn) - Driver Mitra PickUp",
      role: "Mitra Logistik Penjemput",
      painPoints: ["Rute acak boros bensin", "Pelanggan sering lama keluar rumah saat dijemput"],
      needs: ["Rute jemput yang terkumpul dalam satu cluster kost", "Informasi kontak dan tag lokasi tepat"],
      quote: "Kalau dalam 1 komplek kosan bisa langsung ambil 4 orderan sekaligus, penghasilan saya bisa 2x lipat lebih efisien."
    }
  ],
  techStack: [
    {
      layer: "Frontend UI/UX",
      technologies: "React 19, TypeScript, Tailwind CSS v4, Motion (Framer Motion)",
      rationale: "Menghadirkan tampilan modern klasik minimalis yang responsif, visual 3D interaktif dengan performa 60 FPS tanpa beban library 3D berat."
    },
    {
      layer: "Backend Architecture",
      technologies: "Node.js with Express.js / TypeScript, RESTful API, WebSocket",
      rationale: "Handling penugasan pesanan real-time, sinkronisasi status kurir, dan keamanan data transaksi bisnis."
    },
    {
      layer: "Database & Cache",
      technologies: "PostgreSQL (Relational Data & Transaksi) + Redis (Session & Geo-Cluster)",
      rationale: "Integritas ACID untuk transaksi keuangan dan penentuan vendor laundry terdekat berdasarkan koordinat GPS."
    },
    {
      layer: "Third-party Integrations",
      technologies: "Midtrans/Xendit (Payment Gateway QRIS), Google Maps Geocoding API, WhatsApp Cloud API",
      rationale: "Kelancaran pembayaran instan tanpa kontak fisik dan notifikasi otomatis ke nomor pelanggan."
    }
  ],
  databaseSchema: [
    {
      table: "users",
      description: "Menyimpan data pengguna (pelanggan, pemilik laundry, admin)",
      columns: [
        { name: "id", type: "UUID", key: "PRIMARY KEY", description: "Identifier unik pengguna" },
        { name: "name", type: "VARCHAR(120)", key: "-", description: "Nama lengkap pengguna" },
        { name: "email", type: "VARCHAR(100)", key: "UNIQUE", description: "Email untuk autentikasi" },
        { name: "phone", type: "VARCHAR(20)", key: "INDEX", description: "Nomor WhatsApp aktif" },
        { name: "role", type: "ENUM('customer','partner','driver','admin')", key: "-", description: "Peran pengguna dalam sistem" },
        { name: "created_at", type: "TIMESTAMP", key: "-", description: "Waktu pendaftaran akun" }
      ]
    },
    {
      table: "laundry_partners",
      description: "Data vendor/mitra laundry yang bekerjasama",
      columns: [
        { name: "id", type: "UUID", key: "PRIMARY KEY", description: "ID unik mitra laundry" },
        { name: "name", type: "VARCHAR(150)", key: "-", description: "Nama usaha laundry" },
        { name: "owner_name", type: "VARCHAR(120)", key: "-", description: "Nama pemilik toko" },
        { name: "address", type: "TEXT", key: "-", description: "Alamat fisik workshop laundry" },
        { name: "latitude / longitude", type: "DECIMAL(10,8)", key: "SPATIAL", description: "Koordinat lokasi untuk routing terdekat" },
        { name: "daily_capacity_kg", type: "INT", key: "-", description: "Kapasitas maksimal cuci per hari" },
        { name: "rating", type: "DECIMAL(3,2)", key: "-", description: "Nilai kepuasan pelanggan rata-rata" },
        { name: "is_active", type: "BOOLEAN", key: "-", description: "Status apakah siap menerima pesanan" }
      ]
    },
    {
      table: "orders",
      description: "Tabel induk transaksi pemesanan layanan laundry",
      columns: [
        { name: "order_id", type: "VARCHAR(20)", key: "PRIMARY KEY", description: "Kode resi unik (contoh: PL-8892)" },
        { name: "user_id", type: "UUID", key: "FOREIGN KEY", description: "Relasi ke pengguna pemesan" },
        { name: "partner_id", type: "UUID", key: "FOREIGN KEY", description: "Relasi ke mitra laundry pelaksana" },
        { name: "service_type", type: "VARCHAR(50)", key: "-", description: "Kategori layanan (kiloan/satuan/express)" },
        { name: "weight_kg", type: "DECIMAL(5,2)", key: "-", description: "Berat riil hasil timbang digital kurir" },
        { name: "scent_choice", type: "VARCHAR(50)", key: "-", description: "Pilihan parfum premium" },
        { name: "pickup_address", type: "TEXT", key: "-", description: "Alamat penjemputan lengkap & catatan" },
        { name: "total_amount", type: "DECIMAL(12,2)", key: "-", description: "Total nominal pembayaran" },
        { name: "order_status", type: "ENUM", key: "INDEX", description: "Status terkini siklus pencucian" },
        { name: "payment_status", type: "ENUM('unpaid','paid','refunded')", key: "-", description: "Status transaksi gateway" }
      ]
    },
    {
      table: "order_tracking_logs",
      description: "Pencatatan jejak audit siklus hidup cucian secara kronologis",
      columns: [
        { name: "id", type: "BIGSERIAL", key: "PRIMARY KEY", description: "ID log" },
        { name: "order_id", type: "VARCHAR(20)", key: "FOREIGN KEY", description: "Relasi ke order induk" },
        { name: "step_status", type: "VARCHAR(50)", key: "-", description: "Nama fase (contoh: washing, drying)" },
        { name: "notes", type: "TEXT", key: "-", description: "Keterangan opsional (misal: 'Dipisahkan baju putih')" },
        { name: "photo_proof_url", type: "VARCHAR(255)", key: "-", description: "Foto bukti timbangan atau kerapihan setrika" },
        { name: "timestamp", type: "TIMESTAMP", key: "-", description: "Waktu tepat kejadian log" }
      ]
    }
  ],
  functionalRequirements: [
    {
      code: "FR-01",
      module: "Booking & Calculator",
      feature: "Kalkulator Estimasi Biaya & Durasi 3D",
      priority: "High (P0)",
      acceptanceCriteria: "Pengguna dapat memilih varian layanan, menggeser slider berat, memilih varian parfum, dan melihat total biaya sebelum menekan konfirmasi penjemputan."
    },
    {
      code: "FR-02",
      module: "Smart Dispatch",
      feature: "Auto-Routing ke Mitra Terdekat",
      priority: "High (P0)",
      acceptanceCriteria: "Sistem otomatis menugaskan pesanan ke mitra laundry berstatus aktif dalam radius < 3km yang memiliki sisa kapasitas mesin cuci hari itu."
    },
    {
      code: "FR-03",
      module: "Weighing & Verification",
      feature: "Verifikasi Berat & Segel Barcode",
      priority: "High (P0)",
      acceptanceCriteria: "Kurir menginput berat dari timbangan gantung digital portable ke dalam aplikasi kurir, mengirim foto nota & berat timbangan kepada pelanggan untuk konfirmasi nominal."
    },
    {
      code: "FR-04",
      module: "Live Tracking",
      feature: "Pelacakan Siklus Laundry Real-Time",
      priority: "High (P0)",
      acceptanceCriteria: "Pelanggan dapat memasukkan nomor resi pada web tanpa perlu login untuk mengecek 6 tahapan cucian (Driver Jemput -> Timbang -> Cuci -> Setrika Uap -> Pengantaran -> Selesai)."
    },
    {
      code: "FR-05",
      module: "Payment",
      feature: "Integrasi Pembayaran Digital QRIS & E-Wallet",
      priority: "High (P0)",
      acceptanceCriteria: "Pembayaran dapat diselesaikan via dynamic QRIS, GoPay, OVO, ShopeePay, atau metode Bayar di Tempat (COD) terverifikasi."
    },
    {
      code: "FR-06",
      module: "Partner Portal",
      feature: "Dashboard Kelola Cucian Mitra",
      priority: "Medium (P1)",
      acceptanceCriteria: "Mitra laundry dapat mengubah status pesanan dari 'Dicuci' ke 'Selesai Setrika' dan memantau pendapatan harian serta penarikan saldo."
    }
  ],
  apiSpecifications: [
    {
      method: "POST",
      endpoint: "/api/orders/estimate",
      description: "Menghitung estimasi biaya dan durasi berdasarkan jenis layanan & berat",
      requestBody: `{ "serviceId": "cuci-komplit", "estimatedWeight": 4.5, "fragranceId": "fresh-lavender", "lat": -6.2088, "lng": 106.8456 }`,
      responseBody: `{ "subtotal": 36000, "deliveryFee": 0, "total": 36000, "estimatedHours": 24, "nearestPartner": "Klinik Wangi Express" }`
    },
    {
      method: "POST",
      endpoint: "/api/orders/create",
      description: "Membuat tiket pesanan penjemputan otomatis baru",
      requestBody: `{ "serviceId": "cuci-komplit", "weightKg": 4.5, "customerPhone": "08123456789", "address": "Kost Kartika No 4", "notes": "Baju putih tolong dipisah" }`,
      responseBody: `{ "success": true, "orderId": "PL-8892", "status": "driver_assigned", "estimatedPickup": "15 menit" }`
    },
    {
      method: "GET",
      endpoint: "/api/orders/track/:orderId",
      description: "Mengambil riwayat tracking & foto bukti penimbangan cucian",
      responseBody: `{ "orderId": "PL-8892", "status": "washing", "currentStep": 3, "totalSteps": 6, "logs": [...] }`
    }
  ],
  developmentRoadmap: [
    {
      sprint: "Sprint 1 (Minggu 1-2)",
      timeline: "Fondasi & UI Modern Klasik 3D",
      focus: "Landing Page & Kalkulator Interaktif",
      deliverables: ["Desain UI responsif modern klasik", "Komponen 3D mesin cuci dan kartu interaktif", "Kalkulator tarif dan form jadwal jemput"]
    },
    {
      sprint: "Sprint 2 (Minggu 3-4)",
      timeline: "Modul Transaksi & Dispatch Engine",
      focus: "Integrasi API, Database & QRIS Gateway",
      deliverables: ["Skema Database PostgreSQL & Drizzle ORM", "API Order creation & tracking endpoint", "Integrasi Sandbox Payment Gateway Midtrans"]
    },
    {
      sprint: "Sprint 3 (Minggu 5)",
      timeline: "Portal Mitra & Sistem Notifikasi",
      focus: "Manajemen Order Mitra & WhatsApp Bot",
      deliverables: ["Portal web responsif khusus mitra laundry", "Webhook notifikasi WhatsApp status cucian", "Audit log keamanan & timbangan digital"]
    },
    {
      sprint: "Sprint 4 (Minggu 6)",
      timeline: "User Acceptance Test (UAT) & Launch",
      focus: "Pilot Project di Kampus & Presentasi",
      deliverables: ["Uji coba jemput 50 pesanan perdana mahasiswa", "Dokumentasi PRD final untuk presentasi mata kuliah", "Deployment ke Cloud Run"]
    }
  ],
  kpis: [
    { metric: "Turnaround Time (TAT) Akurasi", target: "≥ 98.5% tepat waktu", category: "Operasional" },
    { metric: "Tingkat Kerusakan / Hilang", target: "< 0.05% (Garansi Ganti Rugi)", category: "Kualitas" },
    { metric: "Customer Repeat Order Rate", target: "≥ 65% dalam 30 hari", category: "Pertumbuhan" },
    { metric: "Mitra Machine Utilization", target: "Peningkatan 45% kapasitas mesin", category: "Dampak Mitra" }
  ]
};
