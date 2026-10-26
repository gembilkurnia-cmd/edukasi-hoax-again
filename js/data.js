/* =========================================================
   DATA MATERI — Detektif Hoax
   Edit file ini untuk mengubah isi materi tanpa menyentuh logika.
   Semua contoh pesan bersifat FIKTIF untuk keperluan latihan.
   ========================================================= */

/* ---------- 10 jenis hoax ---------- */
const JENIS_HOAX = [
  {
    id: "berita-palsu", ikon: "📰", nama: "Berita Palsu (Fake News)",
    ringkas: "Berita yang seluruh isinya dikarang, tetapi dikemas menyerupai berita sungguhan lengkap dengan judul, foto, bahkan tampilan situs berita.",
    contoh: "BREAKING: Pemerintah putuskan semua sekolah negeri ditutup mulai bulan depan, siswa belajar di rumah selamanya!",
    ciri: ["Tidak ada nama penulis atau redaksi", "Alamat situs mirip media terkenal, tetapi sedikit berbeda", "Tidak ada kutipan narasumber yang bisa dilacak", "Tidak ditemukan di media tepercaya lain"],
    cek: ["Cari judulnya di mesin pencari, lihat apakah media besar memberitakan hal yang sama", "Periksa alamat situs dengan teliti (huruf dipelesetkan, domain aneh)", "Buka halaman \"Tentang Kami\" dan kontak redaksi", "Cari pernyataan resmi dari instansi terkait"],
    bahaya: 4
  },
  {
    id: "kesehatan", ikon: "💊", nama: "Hoax Kesehatan",
    ringkas: "Klaim pengobatan, diet, atau \"bahaya makanan\" tanpa bukti ilmiah. Berbahaya karena dapat membuat orang menunda atau meninggalkan pengobatan medis.",
    contoh: "Minum air es setelah makan membuat lemak membeku di usus dan memicu kanker. Sudah dibuktikan dokter! Share biar keluarga selamat 🙏",
    ciri: ["Mengaku \"sudah terbukti\" tanpa menyebut penelitiannya", "Menjanjikan kesembuhan cepat atau total", "Mengatasnamakan dokter tanpa nama dan institusi", "Menyuruh berhenti dari pengobatan medis"],
    cek: ["Cari informasinya di situs Kementerian Kesehatan atau WHO", "Tanyakan kepada tenaga kesehatan (dokter, apoteker, puskesmas)", "Periksa apakah ada studi ilmiah dan siapa yang melakukannya", "Waspadai jika klaim dibarengi penjualan produk"],
    bahaya: 5
  },
  {
    id: "penipuan", ikon: "🎣", nama: "Penipuan & Phishing",
    ringkas: "Pesan yang berpura-pura dari bank, kurir, instansi, atau pemberi hadiah untuk mencuri uang dan data pribadi (OTP, PIN, kata sandi).",
    contoh: "SELAMAT! Nomor Anda terpilih memenangkan undian Rp75.000.000. Klik tautan ini dan transfer biaya administrasi Rp500.000 untuk pencairan.",
    ciri: ["Hadiah padahal tidak pernah ikut undian", "Meminta transfer, OTP, PIN, atau kata sandi", "Tautan aneh atau domain mirip situs resmi", "Mendesak: \"dalam 1 jam\" atau \"akun akan diblokir\""],
    cek: ["Jangan klik tautan; buka aplikasi atau situs resmi dengan mengetik alamatnya sendiri", "Hubungi layanan pelanggan lewat nomor resmi di kartu atau situs resmi", "Ingat: lembaga resmi tidak pernah meminta OTP atau PIN", "Blokir dan laporkan nomor pengirim"],
    bahaya: 5
  },
  {
    id: "konteks-salah", ikon: "🧩", nama: "Konteks Salah (False Context)",
    ringkas: "Foto, video, atau kutipan yang aslinya nyata, tetapi dipakai untuk peristiwa, tempat, atau waktu yang berbeda.",
    contoh: "[Foto banjir] Banjir bandang HARI INI di Kota Harapan! Ratusan rumah hanyut! — padahal foto itu berasal dari kejadian di kota lain bertahun-tahun lalu.",
    ciri: ["Tidak ada tanggal dan lokasi yang jelas", "Foto terasa \"pernah lihat\"", "Papan nama, plat nomor, atau bahasa di foto tidak cocok dengan lokasi yang diklaim", "Kutipan dipotong dari konteks aslinya"],
    cek: ["Lakukan pencarian gambar terbalik (Google Lens atau TinEye)", "Cari kata kunci peristiwa + tanggal di media tepercaya", "Perhatikan detail foto: cuaca, rambu, bahasa, bangunan", "Cari pidato atau video lengkapnya bila berupa kutipan"],
    bahaya: 4
  },
  {
    id: "manipulasi", ikon: "🎭", nama: "Foto/Video Manipulasi & Deepfake",
    ringkas: "Gambar, suara, atau video yang diedit atau dibuat dengan AI sehingga seolah-olah seseorang mengatakan atau melakukan sesuatu.",
    contoh: "Video \"Wali Kota Sentosa\" mengumumkan pajak rumah naik 300% — gerak bibir tidak sinkron dan tidak ada di kanal resmi. (tokoh fiktif)",
    ciri: ["Gerak bibir atau ekspresi tidak natural", "Suara datar atau terpotong-potong", "Tepi wajah, jari, atau bayangan tampak janggal", "Tidak ditemukan di kanal resmi tokoh tersebut"],
    cek: ["Cari pernyataan itu di akun atau kanal resmi yang bersangkutan", "Putar ulang pelan-pelan dan perhatikan detail", "Cari hasil cek fakta tentang video tersebut", "Curigai konten yang terlalu sensasional"],
    bahaya: 5
  },
  {
    id: "clickbait", ikon: "🪝", nama: "Judul Umpan (Clickbait)",
    ringkas: "Judul bombastis yang tidak sesuai isi, dibuat agar diklik demi keuntungan iklan atau jumlah tayangan.",
    contoh: "Tak disangka! Artis ini ternyata… yang terjadi selanjutnya bikin kamu menangis!",
    ciri: ["Judul penuh \"ternyata\", \"wow\", dan tanda seru", "Isi tidak menjawab janji judul", "Banyak iklan dan tampilan situs berantakan", "Inti informasi baru muncul di halaman ke sekian"],
    cek: ["Baca sampai selesai sebelum berkomentar atau berbagi", "Bandingkan dengan judul di media lain", "Periksa apakah isi mendukung judul", "Jangan membagikan hanya karena judulnya"],
    bahaya: 2
  },
  {
    id: "satire", ikon: "😂", nama: "Satire & Parodi",
    ringkas: "Berita lelucon yang tujuannya menghibur atau menyindir, tetapi bisa dikira sungguhan bila dibagikan tanpa konteks.",
    contoh: "Warga RT 07 resmi menetapkan sinyal Wi-Fi tetangga sebagai aset nasional.",
    ciri: ["Isi berlebihan atau tidak masuk akal", "Situs berlabel humor atau parodi (kadang kecil di footer)", "Nada menyindir", "Dibagikan sebagai tangkapan layar tanpa nama situs"],
    cek: ["Buka halaman \"Tentang\" situs: apakah situs humor?", "Cari berita yang sama di media tepercaya", "Jangan bagikan tangkapan layar tanpa menyebut sumber dan label parodi"],
    bahaya: 2
  },
  {
    id: "rantai", ikon: "🔗", nama: "Pesan Berantai",
    ringkas: "Pesan \"forward\" yang menyuruh diteruskan ke banyak orang, sering disertai ancaman, doa, atau janji keberuntungan.",
    contoh: "PENTING! Besok pukul 03.00 listrik se-Jawa padam 3 hari. Info dari teman yang kerja di PLN. Sebarkan ke semua kontak!",
    ciri: ["Tidak ada penulis atau sumber asli", "\"Info dari teman/kenalan\"", "Perintah menyebarkan ke banyak orang", "Teks berubah-ubah setiap diteruskan"],
    cek: ["Cek kanal resmi instansi yang disebut", "Tanyakan: siapa penulis pertamanya?", "Cari kalimat uniknya di mesin pencari", "Tahan jempolmu: jangan teruskan sebelum terverifikasi"],
    bahaya: 3
  },
  {
    id: "bencana", ikon: "🌪️", nama: "Hoax Bencana & Isu Darurat",
    ringkas: "Kabar gempa, tsunami, kerusuhan, atau wabah yang bukan berasal dari lembaga berwenang sehingga memicu kepanikan.",
    contoh: "Peringatan! Gempa besar akan terjadi besok sore pukul 15.00 di Jawa Barat. Segera mengungsi!",
    ciri: ["Memprediksi waktu gempa dengan tepat (ilmu pengetahuan belum mampu)", "Tidak menyebut BMKG, BNPB, atau BPBD", "Menyuruh panik atau mengungsi tanpa dasar", "Foto atau video dramatis tanpa tanggal"],
    cek: ["Cek informasi resmi BMKG, BNPB, atau BPBD setempat", "Ikuti akun resmi pemerintah daerah", "Ingat: gempa bumi tidak dapat diprediksi secara tepat", "Kabari keluarga dengan info resmi, bukan pesan terusan"],
    bahaya: 5
  },
  {
    id: "impostor", ikon: "🪪", nama: "Pencatutan Nama (Impostor)",
    ringkas: "Konten yang mengaku berasal dari media, tokoh, atau instansi tepercaya, lengkap dengan logo, untuk meminjam kredibilitas.",
    contoh: "[Logo mirip kementerian] Bantuan subsidi baru cair hari ini — daftar lewat tautan berikut sebelum kuota habis.",
    ciri: ["Logo dan nama dipakai, tetapi akun bukan akun resmi", "Username atau alamat situs dipelesetkan (huruf diganti angka)", "Gaya bahasa tidak seperti biasanya", "Berisi tautan pendaftaran atau pencairan"],
    cek: ["Kunjungi akun atau situs resmi lewat pencarian, bukan lewat tautan kiriman", "Periksa username dan tanggal pembuatan akun", "Cek pengumuman di kanal resmi instansi", "Laporkan akun peniru kepada platform"],
    bahaya: 4
  }
];

/* ---------- Misinformasi / Disinformasi / Malinformasi ---------- */
const WAJAH_INFORMASI = {
  "salah|tidak": {
    nama: "Misinformasi", ikon: "🙈", warna: "warn",
    arti: "Informasi yang salah, tetapi penyebarnya tidak bermaksud menyesatkan. Ia yakin itu benar dan ingin menolong.",
    contoh: "Seorang paman meneruskan tips kesehatan keliru ke grup keluarga karena mengira itu bermanfaat."
  },
  "salah|ya": {
    nama: "Disinformasi", ikon: "🎯", warna: "alert",
    arti: "Informasi salah yang sengaja dibuat atau disebarkan untuk menipu, memecah belah, atau meraup keuntungan.",
    contoh: "Akun anonim membuat tangkapan layar berita palsu agar warga panik dan saling curiga."
  },
  "benar|ya": {
    nama: "Malinformasi", ikon: "🗡️", warna: "alert",
    arti: "Informasi yang sebenarnya benar, tetapi disebarkan untuk merugikan, misalnya membocorkan data atau percakapan pribadi.",
    contoh: "Menyebarkan alamat rumah dan foto pribadi seseorang untuk mempermalukannya."
  },
  "benar|tidak": {
    nama: "Informasi Akurat", ikon: "✅", warna: "ok",
    arti: "Informasi benar yang disebarkan dengan niat baik. Inilah yang ingin kita perbanyak, tetap periksa tanggal dan konteksnya.",
    contoh: "Membagikan pengumuman resmi jadwal imunisasi dari puskesmas lengkap dengan tautan sumbernya."
  }
};

/* ---------- Bedah pesan (klik bagian mencurigakan) ---------- */
const BEDAH = {
  flags: [
    { ikon: "📢", judul: "Judul provokatif", penjelasan: "Huruf kapital, tanda seru, dan emoji alarm dipakai untuk memancing emosi sebelum kamu sempat berpikir.", tips: "Rasakan dulu emosimu, lalu tahan. Pesan yang \"berteriak\" jarang menyampaikan fakta yang tenang." },
    { ikon: "👤", judul: "Sumber tidak jelas", penjelasan: "\"Dokter terkenal di luar negeri\" tanpa nama, institusi, atau tautan tidak bisa diperiksa.", tips: "Tanyakan: siapa, di lembaga mana, kapan, dan di mana dipublikasikan?" },
    { ikon: "🪄", judul: "Klaim terlalu bagus", penjelasan: "Menyembuhkan penyakit kronis dalam 3 hari tanpa obat bertentangan dengan pengetahuan medis.", tips: "Klaim luar biasa membutuhkan bukti luar biasa. Cek di sumber kesehatan resmi." },
    { ikon: "🕵️", judul: "Teori konspirasi", penjelasan: "\"Disembunyikan dari kita\" membuat kamu tidak percaya pada pihak lain, sehingga hanya pesan ini yang terasa benar.", tips: "Waspadai narasi \"mereka menutupi kebenaran\" tanpa bukti." },
    { ikon: "📨", judul: "Perintah menyebarkan + tekanan emosi", penjelasan: "Disuruh menyebarkan ke 10 grup dan dituduh tidak peduli jika menolak adalah manipulasi rasa bersalah.", tips: "Tidak ada kewajiban meneruskan. Memeriksa dulu justru bentuk kepedulian." },
    { ikon: "🔗", judul: "Sumber berantai", penjelasan: "\"Teman kantor yang ayahnya kerja di rumah sakit\" adalah kabar dari kabar dari kabar: tidak bisa dilacak.", tips: "Semakin panjang rantai penyampainya, semakin besar peluang informasi berubah." }
  ],
  segmen: [
    { t: "🚨 BERITA VIRAL!!! 🚨", f: 0 },
    { t: "\n" },
    { t: "Menurut dokter terkenal di luar negeri", f: 1 },
    { t: ", minum air rebusan daun ajaib setiap pagi bisa " },
    { t: "menyembuhkan diabetes dalam 3 hari tanpa obat!", f: 2 },
    { t: "\n" },
    { t: "Pemerintah dan perusahaan farmasi MENYEMBUNYIKAN ini dari kita!", f: 3 },
    { t: "\n" },
    { t: "Segera SEBARKAN ke 10 grup WhatsApp, kalau tidak berarti kamu tidak peduli keluargamu.", f: 4 },
    { t: "\n" },
    { t: "Info dari teman kantor yang ayahnya kerja di rumah sakit.", f: 5 }
  ]
};

/* ---------- Langkah JEDA ---------- */
const LANGKAH_JEDA = [
  {
    huruf: "J", judul: "Jeda sebelum membagikan",
    isi: "Hoax bekerja dengan memancing reaksi cepat. Langkah paling ampuh adalah berhenti sejenak: tarik napas, jangan langsung menekan tombol bagikan.",
    tips: ["Tanyakan pada diri sendiri: apa yang sedang kurasakan, takut, marah, atau iba?", "Beri jeda minimal beberapa menit sebelum meneruskan pesan apa pun", "Kalau ragu, jangan bagikan"]
  },
  {
    huruf: "E", judul: "Evaluasi sumber dan isi",
    isi: "Periksa siapa yang membuat informasi ini dan apakah isinya masuk akal serta bisa dilacak sumber aslinya.",
    tips: ["Siapa penulisnya? Adakah nama, kontak, dan tanggal terbit?", "Apakah ada tautan ke sumber primer (laporan resmi, data, penelitian)?", "Apakah bahasanya netral atau penuh kemarahan dan kapital?", "Periksa alamat situs dan nama akun dengan teliti"]
  },
  {
    huruf: "D", judul: "Dobel-cek di sumber lain",
    isi: "Satu sumber belum cukup. Cari kabar yang sama di media tepercaya, situs resmi instansi, dan situs pemeriksa fakta.",
    tips: ["Cari kata kunci utama di mesin pencari, adakah media tepercaya yang memberitakannya?", "Untuk foto: gunakan pencarian gambar terbalik", "Cek arsip klarifikasi di situs pemeriksa fakta", "Cocokkan tanggal: apakah ini kejadian terbaru atau lama?"]
  },
  {
    huruf: "A", judul: "Ajak orang lain meluruskan",
    isi: "Kalau terbukti hoax, jangan hanya diam. Hentikan rantai penyebarannya dan bantu orang lain mendapat informasi yang benar.",
    tips: ["Laporkan konten ke platform (WhatsApp, Facebook, Instagram, TikTok, X)", "Balas dengan sopan dan sertakan tautan hasil cek fakta", "Jika sudah terlanjur membagikan, hapus lalu sampaikan klarifikasi", "Bantu keluarga yang kurang paham teknologi"]
  }
];

/* ---------- Alat dan sumber cek fakta ---------- */
const ALAT_CEK = [
  { ikon: "🛑", nama: "TurnBackHoax (Mafindo)", ket: "Arsip klarifikasi hoax terbesar di Indonesia yang dikelola relawan Masyarakat Anti Fitnah Indonesia.", url: "https://turnbackhoax.id" },
  { ikon: "🤝", nama: "CekFakta.com", ket: "Kolaborasi berbagai media dan organisasi untuk memeriksa fakta berita.", url: "https://cekfakta.com" },
  { ikon: "🔎", nama: "Google Fact Check Explorer", ket: "Mencari hasil cek fakta dari banyak organisasi dunia berdasarkan kata kunci.", url: "https://toolbox.google.com/factcheck/explorer" },
  { ikon: "🖼️", nama: "Google Lens", ket: "Pencarian gambar terbalik untuk menelusuri asal-usul sebuah foto.", url: "https://lens.google.com" },
  { ikon: "🧬", nama: "TinEye", ket: "Pencarian gambar terbalik yang menampilkan kemunculan pertama sebuah gambar.", url: "https://tineye.com" },
  { ikon: "🌦️", nama: "BMKG", ket: "Sumber resmi info cuaca, iklim, gempa bumi, dan peringatan dini tsunami.", url: "https://www.bmkg.go.id" }
];

/* ---------- Kasus permainan detektif ---------- */
const KASUS_DETEKTIF = [
  {
    avatar: "👩‍🦳", sumber: "Grup WA Arisan RT", waktu: "Hari ini, 08.14",
    teks: "SELAMAT!! Nomor kamu terpilih sebagai pemenang undian Bank Nusantara Rp75.000.000. Hubungi 0812-xxxx-xxxx dan transfer biaya administrasi Rp500.000 agar hadiah segera cair.",
    jawaban: "hoax", kategori: "Penipuan & Phishing",
    petunjuk: ["Hadiah tanpa pernah ikut undian", "Diminta transfer uang lebih dulu", "Nomor pribadi, bukan kanal resmi bank"],
    penjelasan: "Penipuan klasik: lembaga resmi tidak pernah meminta biaya di muka untuk \"mencairkan\" hadiah. Abaikan, jangan transfer, dan laporkan nomornya."
  },
  {
    avatar: "🌦️", sumber: "Akun resmi BMKG (contoh fiktif)", waktu: "Selasa, 14.20",
    teks: "Prakiraan cuaca: hujan lebat disertai petir berpotensi terjadi di sebagian wilayah Jawa Barat pada sore hingga malam hari. Masyarakat diimbau waspada pohon tumbang dan genangan. Info lengkap: bmkg.go.id",
    jawaban: "bukan", kategori: "Informasi Resmi",
    petunjuk: ["Berasal dari lembaga yang berwenang", "Bahasa tenang dan spesifik", "Mengarahkan ke situs resmi"],
    penjelasan: "Isinya imbauan yang wajar, menyebut wilayah dan waktu secara umum, serta menyertakan tautan ke situs resmi. Tetap biasakan membuka situs resminya sendiri untuk memastikan."
  },
  {
    avatar: "👨‍💼", sumber: "Grup WA Alumni", waktu: "Kemarin, 21.47",
    teks: "PENTING!! Besok pukul 03.00 dini hari akan ada pemadaman listrik total se-Jawa selama 3 hari! Isi penuh baterai dan tampung air. Info dari tetangga yang kerja di PLN. SEBARKAN ke semua kontak!",
    jawaban: "hoax", kategori: "Pesan Berantai",
    petunjuk: ["Sumbernya \"tetangga yang kerja di PLN\"", "Perintah menyebarkan ke semua kontak", "Tidak ada pengumuman resmi"],
    penjelasan: "Pemadaman besar pasti diumumkan lewat kanal resmi perusahaan listrik. Kabar dari kenalan tanpa tautan resmi adalah ciri pesan berantai."
  },
  {
    avatar: "📸", sumber: "Status Facebook Teman", waktu: "Hari ini, 10.05",
    teks: "[Foto banjir setinggi atap rumah] Banjir bandang HARI INI di Kota Harapan! Ratusan rumah hanyut!",
    catatan: "Catatan penyelidik: pencarian gambar terbalik menunjukkan foto yang sama pertama kali diunggah pada 2019 untuk kejadian di kota lain.",
    jawaban: "hoax", kategori: "Konteks Salah",
    petunjuk: ["Foto lama dipakai untuk kejadian baru", "Hasil pencarian gambar terbalik menunjukkan 2019", "Lokasi berbeda dengan klaim"],
    penjelasan: "Fotonya asli, tetapi konteksnya salah. Inilah mengapa pencarian gambar terbalik penting sebelum membagikan foto bencana."
  },
  {
    avatar: "🧾", sumber: "Artikel pemeriksa fakta (contoh fiktif)", waktu: "Rabu, 09.00",
    teks: "[SALAH] Video \"ikan raksasa terdampar di pantai\" yang viral ternyata cuplikan efek visual sebuah film. Hasil penelusuran menemukan video asli diunggah oleh studio efek visual dengan keterangan produksi.",
    jawaban: "bukan", kategori: "Klarifikasi / Cek Fakta",
    petunjuk: ["Ini artikel klarifikasi, bukan hoax itu sendiri", "Menyebut hasil penelusuran dan sumber asli", "Nada netral dan bisa diverifikasi"],
    penjelasan: "Hati-hati: kata \"SALAH\" di judul menandakan ini hasil cek fakta yang membantah hoax. Artikelnya sendiri bukan hoax; ia menjelaskan bukti dan sumber aslinya."
  },
  {
    avatar: "🧓", sumber: "Grup WA Keluarga Besar", waktu: "Hari ini, 06.30",
    teks: "Minum air es setelah makan membuat lemak membeku di usus dan memicu kanker. Sudah dibuktikan dokter terkenal! Share biar keluarga kita selamat 🙏",
    jawaban: "hoax", kategori: "Hoax Kesehatan",
    petunjuk: ["\"Dokter terkenal\" tanpa nama", "\"Sudah dibuktikan\" tanpa penelitian", "Ajakan share dengan sentuhan emosi"],
    penjelasan: "Klaim kesehatan harus disertai penelitian yang bisa ditelusuri. Pesan ini hanya memakai rasa takut dan ajakan membagikan. Cek ke tenaga kesehatan atau situs resmi Kemenkes."
  },
  {
    avatar: "🎬", sumber: "Video Beranda TikTok", waktu: "Hari ini, 19.12",
    teks: "VIDEO: \"Wali Kota Sentosa\" mengumumkan pajak rumah naik 300% mulai bulan depan. (tokoh fiktif)",
    catatan: "Catatan penyelidik: gerak bibir tampak tidak sinkron dengan suara, dan video tidak ditemukan di kanal resmi pemerintah kota.",
    jawaban: "hoax", kategori: "Deepfake / Manipulasi",
    petunjuk: ["Bibir dan suara tidak sinkron", "Tidak ada di kanal resmi", "Kebijakan drastis tanpa dokumen resmi"],
    penjelasan: "Kebijakan besar selalu diumumkan melalui kanal resmi dan disertai dokumen. Video yang hanya beredar di media sosial dengan tanda manipulasi patut dicurigai."
  },
  {
    avatar: "🏫", sumber: "Akun resmi Dinas Pendidikan (contoh fiktif)", waktu: "Senin, 15.00",
    teks: "Pengumuman: Pelaksanaan Asesmen Tengah Semester jenjang SMP se-Kabupaten dimulai Senin, 2 November 2026. Jadwal lengkap dapat diunduh di situs resmi dinas: disdik.kabupaten-contoh.go.id/jadwal",
    jawaban: "bukan", kategori: "Informasi Resmi",
    petunjuk: ["Akun dan domain instansi (.go.id)", "Tanggal dan ruang lingkup jelas", "Tidak meminta data atau uang"],
    penjelasan: "Pengumuman memuat tanggal, cakupan, dan tautan ke domain resmi tanpa tekanan emosional. Tetap cocokkan dengan sekolah atau situs dinas langsung."
  }
];

/* ---------- Soal kuis pilihan ganda ---------- */
/* "benar" = indeks jawaban benar pada array "opsi" (opsi diacak saat tampil) */
const SOAL_KUIS = [
  {
    tanya: "Informasi salah yang dibagikan seseorang tanpa niat menyesatkan, karena ia mengira itu benar, disebut…",
    opsi: ["Misinformasi", "Disinformasi", "Malinformasi", "Satire"], benar: 0,
    jelas: "Misinformasi = salah + tidak ada niat jahat. Disinformasi = salah + sengaja menipu."
  },
  {
    tanya: "Foto banjir lama dipakai untuk memberitakan banjir \"hari ini\" di kota lain. Ini termasuk jenis…",
    opsi: ["Konteks salah", "Satire", "Clickbait", "Berita akurat"], benar: 0,
    jelas: "Fotonya asli, tetapi konteks waktu dan tempatnya salah."
  },
  {
    tanya: "Kamu menerima pesan yang mengagetkan dan menyuruh \"sebarkan segera\". Langkah pertama yang tepat adalah…",
    opsi: ["Berhenti sejenak dan jangan langsung membagikan", "Meneruskan ke grup keluarga agar mereka waspada", "Membalas dengan emoji marah", "Menghapus pesan lalu lupa"], benar: 0,
    jelas: "J pada JEDA: beri jeda. Hoax mengandalkan reaksi spontan."
  },
  {
    tanya: "Cara paling tepat untuk menelusuri asal-usul sebuah foto viral adalah…",
    opsi: ["Pencarian gambar terbalik (Google Lens/TinEye)", "Menghitung jumlah like", "Menanyakan di kolom komentar", "Melihat apakah fotonya berwarna"], benar: 0,
    jelas: "Pencarian gambar terbalik menunjukkan kapan dan di mana foto pertama kali muncul."
  },
  {
    tanya: "Pesan: \"Anda menang undian, transfer biaya administrasi untuk mencairkan hadiah.\" Ini adalah…",
    opsi: ["Penipuan / phishing", "Informasi resmi bank", "Berita satire", "Pesan promosi biasa"], benar: 0,
    jelas: "Hadiah yang mengharuskan membayar di muka adalah modus penipuan."
  },
  {
    tanya: "Mengapa hoax mudah menyebar?",
    opsi: ["Karena memicu emosi sehingga orang bertindak cepat tanpa memeriksa", "Karena selalu ditulis dengan bahasa ilmiah", "Karena hanya beredar di internet lama", "Karena selalu berasal dari media resmi"], benar: 0,
    jelas: "Rasa takut, marah, dan iba mendorong kita membagikan sebelum berpikir."
  },
  {
    tanya: "Ciri sumber informasi yang lebih dapat dipercaya adalah…",
    opsi: ["Ada penulis, tanggal, kontak redaksi, dan tautan ke sumber primer", "Banyak huruf kapital dan tanda seru", "Hanya berupa tangkapan layar tanpa sumber", "Dikirim oleh banyak orang berbeda"], benar: 0,
    jelas: "Transparansi penulis, waktu, dan sumber membuat informasi bisa diperiksa."
  },
  {
    tanya: "Kamu baru sadar sudah membagikan hoax. Tindakan terbaik adalah…",
    opsi: ["Menghapus kiriman, lalu menyampaikan klarifikasi dengan sumber yang benar", "Membiarkan saja karena sudah terlanjur", "Menyalahkan orang yang mengirim ke kamu", "Mengganti nomor telepon"], benar: 0,
    jelas: "A pada JEDA: ajak orang lain meluruskan. Klarifikasi membantu memutus rantai hoax."
  }
];

/* ---------- Pemindai ciri hoax ---------- */
const cocok = (re) => (t) => { const m = t.match(re); return m ? "\"" + m[0].trim() + "\"" : null; };

const ATURAN_PINDAI = [
  {
    id: "kapital", label: "Huruf kapital berlebihan", bobot: 12,
    saran: "Teks yang \"berteriak\" sering dipakai untuk memancing emosi, bukan menjelaskan fakta.",
    uji: (t) => {
      const h = t.match(/[A-Za-z]/g) || [];
      if (h.length < 25) return null;
      const k = t.match(/[A-Z]/g) || [];
      const r = k.length / h.length;
      return r > 0.35 ? "Sekitar " + Math.round(r * 100) + "% huruf berupa kapital" : null;
    }
  },
  {
    id: "seru", label: "Tanda seru berlebihan", bobot: 10,
    saran: "Banyak tanda seru menandakan upaya membangun kepanikan atau sensasi.",
    uji: (t) => { const n = (t.match(/!/g) || []).length; return n >= 3 ? n + " tanda seru" : null; }
  },
  {
    id: "alarm", label: "Emoji alarm", bobot: 6,
    saran: "Emoji sirene dan peringatan sering dipakai untuk menciptakan rasa darurat.",
    uji: cocok(/🚨|⚠️|‼️|❗/)
  },
  {
    id: "sebar", label: "Ajakan menyebarkan", bobot: 18,
    saran: "Informasi yang benar tidak perlu memaksa diteruskan. Perintah menyebarkan adalah ciri khas pesan berantai.",
    uji: cocok(/sebarkan|sebar ke|bagikan ke|share (ke|sebanyak|sekarang)|forward|teruskan|viralkan|broadcast/i)
  },
  {
    id: "klaim", label: "Klaim berlebihan / terlalu bagus", bobot: 14,
    saran: "Klaim absolut seperti \"100%\" atau \"dijamin\" jarang benar. Cari bukti dari sumber ilmiah atau resmi.",
    uji: cocok(/100 ?%|dijamin|pasti (sembuh|berhasil|untung)|sembuh total|ajaib|instan|terbukti ampuh|tanpa obat|obat mujarab|rahasia/i)
  },
  {
    id: "samar", label: "Sumber samar / katanya", bobot: 14,
    saran: "Sumber tanpa nama dan institusi tidak bisa diperiksa. Tanyakan: siapa persisnya?",
    uji: cocok(/katanya|konon|kabarnya|menurut (seorang )?(dokter|pakar|ahli|orang dalam|peneliti)|info dari|dari teman|teman saya|orang dalam|sumber terpercaya/i)
  },
  {
    id: "tekanan", label: "Tekanan emosional", bobot: 12,
    saran: "Rasa bersalah, ancaman, atau iba dipakai agar kamu bertindak sebelum berpikir.",
    uji: cocok(/kalau tidak|jika tidak|jangan sampai|tidak peduli|kasihan|bahaya besar|mengerikan|dosa|doakan/i)
  },
  {
    id: "konspirasi", label: "Nada konspirasi", bobot: 12,
    saran: "Narasi \"disembunyikan/ditutup-tutupi\" tanpa bukti membuat kamu hanya percaya pada pesan itu.",
    uji: cocok(/disembunyikan|menyembunyikan|ditutup-tutupi|media (tidak|nggak|enggan)|tidak (ingin|mau) (kamu|anda|kita) tahu|konspirasi|dibungkam/i)
  },
  {
    id: "uang", label: "Meminta uang atau mengarahkan ke tautan", bobot: 18,
    saran: "Jangan transfer ke pihak tak dikenal dan jangan klik tautan dari pesan yang tidak kamu minta.",
    uji: cocok(/transfer|biaya administrasi|klik (link|tautan)|isi data|nomor rekening|pulsa/i)
  },
  {
    id: "kode", label: "Meminta kode rahasia atau kata sandi", bobot: 18,
    saran: "Tanda bahaya tertinggi. Bank dan layanan resmi tidak pernah meminta OTP, PIN, atau kata sandi.",
    uji: cocok(/\botp\b|kode verifikasi|kode rahasia|\bpin\b|kata sandi|password/i)
  },
  {
    id: "umpan", label: "Umpan hadiah atau undian", bobot: 14,
    saran: "Hadiah yang tiba-tiba, apalagi tanpa kamu ikut undian, adalah umpan penipuan yang sangat umum.",
    uji: cocok(/undian|pemenang|memenangkan|hadiah|selamat anda|selamat!/i)
  },
  {
    id: "mendesak", label: "Desakan waktu", bobot: 8,
    saran: "Desakan membuat kita tidak sempat memeriksa. Pesan yang valid biasanya memberi waktu yang wajar.",
    uji: cocok(/segera|sekarang juga|hari ini juga|dalam 24 jam|dalam 1 jam|sebelum terlambat|buruan|kuota terbatas/i)
  },
  {
    id: "tautan", label: "Tidak ada tautan atau sumber", bobot: 8,
    saran: "Informasi yang baik biasanya menyertakan sumber yang bisa diklik dan diperiksa.",
    uji: (t) => (t.length >= 80 && !/https?:\/\/|www\./i.test(t)) ? "Tidak ditemukan tautan sumber" : null
  }
];

const CONTOH_PINDAI = [
  { label: "Contoh penipuan", teks: "SELAMAT!!! Nomor Anda terpilih memenangkan undian Rp75.000.000. Segera transfer biaya administrasi Rp500.000 dan kirim kode OTP yang masuk agar hadiah cair hari ini juga!" },
  { label: "Contoh hoax kesehatan", teks: "🚨 Menurut dokter terkenal di luar negeri, rebusan daun ajaib ini 100% sembuhkan diabetes tanpa obat. Pemerintah MENYEMBUNYIKAN rahasia ini! Kalau tidak sebarkan berarti kamu tidak peduli keluargamu." },
  { label: "Contoh pengumuman wajar", teks: "Pengumuman: Kerja bakti RW 05 dilaksanakan Minggu, 1 November 2026 pukul 07.00 di balai warga. Mohon membawa peralatan kebersihan masing-masing. Informasi lengkap: https://rw05.example.id/pengumuman" }
];
