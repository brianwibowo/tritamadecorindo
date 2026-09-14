import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const SCREENSHOTS_DIR = path.resolve('public/docs/screenshots');

function getBase64Image(filename) {
  const filePath = path.join(SCREENSHOTS_DIR, filename);
  if (!fs.existsSync(filePath)) {
    console.warn('Image not found:', filePath);
    return '';
  }
  const data = fs.readFileSync(filePath);
  return `data:image/png;base64,${data.toString('base64')}`;
}

const images = {
  home: getBase64Image('01_storefront_home.png'),
  products: getBase64Image('02_storefront_products.png'),
  productDetail: getBase64Image('03_storefront_product_detail.png'),
  gallery: getBase64Image('04_storefront_gallery.png'),
  login: getBase64Image('05_admin_login.png'),
  dashboard: getBase64Image('06_admin_dashboard.png'),
  adminProducts: getBase64Image('07_admin_products_index.png'),
  adminProductsCreate: getBase64Image('08_admin_products_create.png'),
  adminGalleries: getBase64Image('09_admin_galleries_index.png'),
  adminOrders: getBase64Image('10_admin_order_archives.png'),
  adminUsers: getBase64Image('11_admin_users_index.png'),
  adminProfile: getBase64Image('12_admin_profile_modal.png'),
};

const htmlContent = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Buku Panduan Website & Panel Admin Tritama Decorindo</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

    @page {
      size: A4;
      margin: 18mm 16mm 20mm 16mm;
      @bottom-right {
        content: counter(page);
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 9pt;
        color: #64748B;
      }
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #1E293B;
      line-height: 1.65;
      font-size: 10.5pt;
      background: #FFFFFF;
    }

    /* Cover Page */
    .cover-page {
      page-break-after: always;
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 40px 20px 20px 20px;
    }

    .cover-header {
      border-bottom: 2px solid #E2E8F0;
      padding-bottom: 24px;
    }

    .cover-badge {
      display: inline-block;
      background: #EEF2FF;
      color: #111FA2;
      border: 1px solid #C7D2FE;
      padding: 6px 14px;
      border-radius: 9999px;
      font-size: 9pt;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      margin-bottom: 20px;
    }

    .cover-title {
      font-size: 32pt;
      font-weight: 800;
      color: #0F172A;
      line-height: 1.15;
      letter-spacing: -0.02em;
      margin-bottom: 12px;
    }

    .cover-title span {
      color: #111FA2;
    }

    .cover-subtitle {
      font-size: 13pt;
      color: #475569;
      font-weight: 500;
      max-width: 600px;
      line-height: 1.5;
    }

    .cover-card {
      background: linear-gradient(135deg, #111FA2 0%, #080E4E 100%);
      color: #FFFFFF;
      border-radius: 20px;
      padding: 32px;
      margin: 40px 0;
      box-shadow: 0 10px 25px -5px rgba(17, 31, 162, 0.25);
    }

    .cover-card h3 {
      font-size: 14pt;
      font-weight: 700;
      color: #FFDE42;
      margin-bottom: 8px;
    }

    .cover-card p {
      font-size: 10.5pt;
      color: #E2E8F0;
      line-height: 1.6;
    }

    .cover-footer {
      border-top: 1px solid #E2E8F0;
      padding-top: 20px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      font-size: 9.5pt;
      color: #64748B;
    }

    .cover-footer strong {
      color: #0F172A;
    }

    /* Page Breaks */
    .page-break {
      page-break-before: always;
    }

    /* Headings */
    h1 {
      font-size: 20pt;
      font-weight: 800;
      color: #0F172A;
      margin-top: 0;
      margin-bottom: 14px;
      letter-spacing: -0.01em;
      border-bottom: 2px solid #E2E8F0;
      padding-bottom: 8px;
    }

    h2 {
      font-size: 14pt;
      font-weight: 700;
      color: #111FA2;
      margin-top: 24px;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    h3 {
      font-size: 11.5pt;
      font-weight: 700;
      color: #1E293B;
      margin-top: 16px;
      margin-bottom: 8px;
    }

    p {
      margin-bottom: 12px;
    }

    /* Table of Contents */
    .toc-box {
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 16px;
      padding: 24px 28px;
      margin-bottom: 30px;
    }

    .toc-list {
      list-style: none;
    }

    .toc-list li {
      padding: 6px 0;
      border-bottom: 1px dashed #E2E8F0;
      display: flex;
      justify-content: space-between;
      font-size: 10.5pt;
      font-weight: 600;
      color: #334155;
    }

    .toc-list li span.dots {
      flex: 1;
      border-bottom: 1px dotted #CBD5E1;
      margin: 0 10px 4px 10px;
    }

    /* Callout & Tips */
    .tip-box {
      background: #F0FDF4;
      border-left: 4px solid #16A34A;
      padding: 12px 16px;
      border-radius: 0 12px 12px 0;
      margin: 14px 0;
      font-size: 9.5pt;
      color: #166534;
    }

    .info-box {
      background: #EFF6FF;
      border-left: 4px solid #2563EB;
      padding: 12px 16px;
      border-radius: 0 12px 12px 0;
      margin: 14px 0;
      font-size: 9.5pt;
      color: #1E40AF;
    }

    /* Images and Captions */
    .img-container {
      margin: 14px 0 18px 0;
      page-break-inside: avoid;
      border: 1px solid #CBD5E1;
      border-radius: 12px;
      overflow: hidden;
      background: #F8FAFC;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }

    .img-container img {
      width: 100%;
      display: block;
      height: auto;
    }

    .img-caption {
      font-size: 8.5pt;
      color: #64748B;
      padding: 8px 14px;
      background: #F1F5F9;
      border-top: 1px solid #E2E8F0;
      font-style: italic;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    /* Lists */
    ol, ul {
      margin-left: 20px;
      margin-bottom: 14px;
    }

    li {
      margin-bottom: 6px;
    }

    li strong {
      color: #0F172A;
    }

    /* Step numbers */
    .step-badge {
      display: inline-block;
      background: #111FA2;
      color: #FFFFFF;
      font-size: 8pt;
      font-weight: 800;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      text-align: center;
      line-height: 18px;
      margin-right: 6px;
    }

    /* Key-Value Tables */
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 14px 0;
      font-size: 9.5pt;
      page-break-inside: avoid;
    }

    th {
      background: #F1F5F9;
      color: #0F172A;
      font-weight: 700;
      text-align: left;
      padding: 10px 14px;
      border: 1px solid #E2E8F0;
    }

    td {
      padding: 10px 14px;
      border: 1px solid #E2E8F0;
      color: #334155;
    }

    tr:nth-child(even) td {
      background: #F8FAFC;
    }

    .badge-status {
      display: inline-block;
      padding: 3px 8px;
      border-radius: 6px;
      font-size: 8pt;
      font-weight: 700;
    }
    .badge-green { background: #DCFCE7; color: #15803D; }
    .badge-blue { background: #DBEAFE; color: #1D4ED8; }
  </style>
</head>
<body>

  <!-- ========================================================================= -->
  <!-- COVER PAGE -->
  <!-- ========================================================================= -->
  <div class="cover-page">
    <div class="cover-header">
      <div class="cover-badge">Buku Panduan Resmi • Edisi 2026</div>
      <h1 class="cover-title">Panduan Penggunaan Website & <span>Panel Admin</span></h1>
      <p class="cover-subtitle">
        Petunjuk operasional lengkap pengelolaan katalog produk, galeri hasil pemasangan, arsip pemesanan, dan pengaturan akun pada website resmi PT Tritama Decorindo Stiker.
      </p>
    </div>

    <div class="cover-card">
      <h3>🌟 PT Tritama Decorindo Stiker</h3>
      <p>
        Pusat Spesialis Kaca Film Gedung & Rumah (Riben, Sparta, One Way), Sandblast Cutting Logo, Wallpaper Dinding 3D, Roller Blinds, dan Huruf Timbul LED di Bekasi & Seluruh Jabodetabek. Berpengalaman & bergaransi sejak 2009.
      </p>
    </div>

    <div class="cover-footer">
      <div>
        <p><strong>Diterbitkan untuk:</strong> Tim Administrator & Manajemen Toko</p>
        <p><strong>Website:</strong> https://tritamadecorindostiker.com</p>
      </div>
      <div style="text-align: right;">
        <p><strong>Status Sistem:</strong> Produksi (Live)</p>
        <p><strong>Versi Dokumen:</strong> 1.0 (September 2026)</p>
      </div>
    </div>
  </div>

  <!-- ========================================================================= -->
  <!-- TABLE OF CONTENTS -->
  <!-- ========================================================================= -->
  <div class="page-break"></div>
  <h1>Daftar Isi Panduan</h1>
  <div class="toc-box">
    <ul class="toc-list">
      <li><span>1. Mengenal Website Tritama Decorindo</span> <span class="dots"></span> <span>Bab 1</span></li>
      <li><span>2. Panduan Halaman Publik (Tampilan Pengunjung)</span> <span class="dots"></span> <span>Bab 2</span></li>
      <li style="padding-left: 20px; font-weight: normal;"><span>• 2.1 Halaman Beranda Utama</span> <span class="dots"></span> <span>2.1</span></li>
      <li style="padding-left: 20px; font-weight: normal;"><span>• 2.2 Katalog Produk & Filter Kategori</span> <span class="dots"></span> <span>2.2</span></li>
      <li style="padding-left: 20px; font-weight: normal;"><span>• 2.3 Halaman Detail Produk & Simulasi Biaya</span> <span class="dots"></span> <span>2.3</span></li>
      <li style="padding-left: 20px; font-weight: normal;"><span>• 2.4 Galeri Portofolio Hasil Pemasangan</span> <span class="dots"></span> <span>2.4</span></li>
      <li><span>3. Panduan Pengelolaan Panel Admin</span> <span class="dots"></span> <span>Bab 3</span></li>
      <li style="padding-left: 20px; font-weight: normal;"><span>• 3.1 Cara Masuk ke Panel Admin (Login)</span> <span class="dots"></span> <span>3.1</span></li>
      <li style="padding-left: 20px; font-weight: normal;"><span>• 3.2 Mengenal Menu Dashboard Admin</span> <span class="dots"></span> <span>3.2</span></li>
      <li style="padding-left: 20px; font-weight: normal;"><span>• 3.3 Kelola Produk (Tambah, Edit, Mode Nego WA)</span> <span class="dots"></span> <span>3.3</span></li>
      <li style="padding-left: 20px; font-weight: normal;"><span>• 3.4 Fitur Tambah Kategori Cepat (Tombol "+")</span> <span class="dots"></span> <span>3.4</span></li>
      <li style="padding-left: 20px; font-weight: normal;"><span>• 3.5 Kelola Galeri Proyek (Unggah Foto & Switch)</span> <span class="dots"></span> <span>3.5</span></li>
      <li style="padding-left: 20px; font-weight: normal;"><span>• 3.6 Arsip Pemesanan Pelanggan</span> <span class="dots"></span> <span>3.6</span></li>
      <li style="padding-left: 20px; font-weight: normal;"><span>• 3.7 Manajemen User & Staf Admin</span> <span class="dots"></span> <span>3.7</span></li>
      <li style="padding-left: 20px; font-weight: normal;"><span>• 3.8 Ubah Profil Pribadi & Foto Avatar</span> <span class="dots"></span> <span>3.8</span></li>
      <li style="padding-left: 20px; font-weight: normal;"><span>• 3.9 Cara Keluar Akun (Logout) yang Benar</span> <span class="dots"></span> <span>3.9</span></li>
    </ul>
  </div>

  <h2>1. Mengenal Website Tritama Decorindo</h2>
  <p>
    Website ini adalah kantor digital resmi <strong>PT Tritama Decorindo Stiker</strong>. Dibuat dengan desain modern, cepat, dan terhubung langsung ke layanan pelanggan WhatsApp, website ini melayani:
  </p>
  <table>
    <thead>
      <tr>
        <th style="width: 30%;">Layanan & Material</th>
        <th>Deskripsi Layanan</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Kaca Film Gedung</strong></td>
        <td>Riben tolak panas UV 99% (kegelapan 40%, 60%, 80%), Sparta mirror reflektif, dan One Way Vision.</td>
      </tr>
      <tr>
        <td><strong>Sandblast & Stiker</strong></td>
        <td>Stiker es buram polos untuk partisi ruang rapat, cutting motif garis artistik, dan cutting logo instansi/perusahaan.</td>
      </tr>
      <tr>
        <td><strong>Wallpaper Dinding</strong></td>
        <td>Wallpaper custom gambar 3D tajam berdimensi dan wallpaper pabrikan bertekstur elegan tahan lembap.</td>
      </tr>
      <tr>
        <td><strong>Blinds & Tirai Kantor</strong></td>
        <td>Roller blinds blackout penahan panas terik dan vertical blinds pengatur cahaya perkantoran modern.</td>
      </tr>
      <tr>
        <td><strong>Signage & Facade</strong></td>
        <td>Huruf timbul akrilik dengan lampu LED backlight menyala malam hari untuk lobby dan fasad ruko.</td>
      </tr>
    </tbody>
  </table>

  <!-- ========================================================================= -->
  <!-- BAB 2: STOREFRONT -->
  <!-- ========================================================================= -->
  <div class="page-break"></div>
  <h1>2. Panduan Halaman Publik (Tampilan Pengunjung)</h1>

  <h2>2.1 Halaman Beranda Utama</h2>
  <p>
    Halaman beranda adalah halaman utama yang pertama kali dilihat saat membuka alamat <code>tritamadecorindostiker.com</code>.
  </p>

  <div class="img-container">
    <img src="${images.home}" alt="Halaman Beranda Tritama Decorindo">
    <div class="img-caption">📷 Gambar 1: Tampilan Halaman Beranda Utama dengan banner foto galeri berputar & header transparan.</div>
  </div>

  <p><strong>Bagian-Bagian Penting di Beranda:</strong></p>
  <ul>
    <li><strong>Running Text (Paling Atas)</strong>: Pengumuman bergerak yang berisi info garansi pemasangan, survey gratis Jabodetabek, dan kontak WhatsApp.</li>
    <li><strong>Header Transparan Modern</strong>: Logo Tritama Decorindo dan menu utama mengambang elegan di atas foto tanpa balok warna gelap.</li>
    <li><strong>Banner Foto Sorot (Spotlight)</strong>: Foto-foto proyek berputar secara otomatis dan lembut setiap 5,5 detik, menyorot hasil pemasangan secara tajam.</li>
    <li><strong>Tombol WhatsApp Melayang (Kanan Bawah)</strong>: Tombol hijau WhatsApp yang otomatis muncul saat pengunjung mulai menggulir layar ke bawah.</li>
  </ul>

  <h2>2.2 Katalog Produk & Biaya (/products)</h2>
  <p>
    Pengunjung dapat melihat katalog material lengkap dengan mengklik menu <strong>"Produk & Harga"</strong>.
  </p>

  <div class="img-container">
    <img src="${images.products}" alt="Katalog Produk Tritama Decorindo">
    <div class="img-caption">📷 Gambar 2: Tampilan Katalog Produk lengkap dengan filter kategori & tombol konsultasi WhatsApp.</div>
  </div>

  <ul>
    <li><strong>Filter Kategori</strong>: Memudahkan pengunjung menyaring produk (contoh: hanya melihat Kaca Film atau Sandblast).</li>
    <li><strong>Label Harga & Nego</strong>: Menampilkan estimasi harga terendah atau label <em>"Harga Khusus / Nego WA"</em>.</li>
  </ul>

  <div class="page-break"></div>
  <h2>2.3 Halaman Detail Produk (/product/{slug})</h2>
  <p>
    Saat pengunjung mengklik salah satu kartu produk, halaman detail produk akan terbuka:
  </p>

  <div class="img-container">
    <img src="${images.productDetail}" alt="Detail Produk Tritama Decorindo">
    <div class="img-caption">📷 Gambar 3: Halaman Detail Produk dengan pilihan varian ukuran & tombol pesan otomatis WhatsApp.</div>
  </div>

  <ul>
    <li><strong>Pilihan Varian Ukuran/Tingkat Kegelapan</strong>: Pengunjung dapat memilih varian yang diinginkan.</li>
    <li><strong>Tombol Pesan Otomatis</strong>: Sekali klik, aplikasi WhatsApp di HP pengunjung akan otomatis terbuka dengan pesan berisi nama produk yang dipilih.</li>
  </ul>

  <h2>2.4 Galeri Portofolio Proyek (/galeri)</h2>
  <p>
    Halaman ini memamerkan dokumentasi asli pekerjaan yang sudah selesai dikerjakan oleh teknisi Tritama Decorindo.
  </p>

  <div class="img-container">
    <img src="${images.gallery}" alt="Galeri Portofolio Proyek">
    <div class="img-caption">📷 Gambar 4: Galeri Dokumentasi Hasil Pemasangan Nyata di Gedung, Kantor, dan Rumah Klien.</div>
  </div>

  <!-- ========================================================================= -->
  <!-- BAB 3: ADMIN PANEL -->
  <!-- ========================================================================= -->
  <div class="page-break"></div>
  <h1>3. Panduan Pengelolaan Panel Admin</h1>

  <h2>3.1 Cara Masuk ke Panel Admin (Login)</h2>
  <p>
    Panel admin digunakan khusus oleh staf dan manajemen untuk menambah foto, mengupdate harga, dan mencatat data pesanan pelanggan.
  </p>

  <div class="img-container">
    <img src="${images.login}" alt="Halaman Login Panel Admin">
    <div class="img-caption">📷 Gambar 5: Halaman Login Administrator yang aman dan terlindungi.</div>
  </div>

  <p><strong>Langkah Masuk:</strong></p>
  <ol>
    <li>Buka alamat: <code>https://tritamadecorindostiker.com/login</code></li>
    <li>Masukkan Email: <strong>admin@tritamadecorindo.com</strong></li>
    <li>Masukkan Kata Sandi: <strong>password123</strong></li>
    <li>Centang kotak <strong>"Ingat sesi login saya"</strong>.</li>
    <li>Klik tombol biru <strong>"Masuk ke Panel Admin"</strong>.</li>
  </ol>

  <h2>3.2 Mengenal Menu Dashboard Admin</h2>
  <p>
    Setelah login, Anda akan masuk ke halaman Ringkasan Panel Administrator (<code>/admin</code>).
  </p>

  <div class="img-container">
    <img src="${images.dashboard}" alt="Dashboard Panel Admin">
    <div class="img-caption">📷 Gambar 6: Halaman Dashboard Admin dengan ringkasan statistik dan tombol aksi cepat.</div>
  </div>

  <ul>
    <li><strong>Kartu Statistik</strong>: Menampilkan total produk aktif, kategori, dokumentasi foto, dan arsip pesanan.</li>
    <li><strong>Tombol Aksi Cepat</strong>: Tombol instan untuk langsung menambah produk baru, kategori, atau mencatat pesanan.</li>
    <li><strong>Menu Samping Kiri (Sidebar)</strong>: Navigasi lengkap menuju Produk, Galeri, Arsip Pemesanan, dan Manajemen User.</li>
  </ul>

  <div class="page-break"></div>
  <h2>3.3 Tutorial Kelola Produk (Katalog & Harga)</h2>
  <p>
    Buka menu <strong>"Produk"</strong> pada sidebar kiri untuk mengelola katalog material toko.
  </p>

  <div class="img-container">
    <img src="${images.adminProducts}" alt="Daftar Produk di Panel Admin">
    <div class="img-caption">📷 Gambar 7: Tabel Kelola Produk dilengkapi tombol sakelar (toggle) Tampilkan Harga / Nego WA.</div>
  </div>

  <div class="tip-box">
    <strong>💡 Fitur Sakelar Tampilkan Harga:</strong><br>
    Jika sakelar <strong>ON (Biru)</strong>, harga nominal akan tampil di website publik. Jika diubah menjadi <strong>OFF (Abu-abu)</strong>, di website publik harga otomatis berubah menjadi <em>"Harga Khusus / Nego WhatsApp"</em>. Sangat berguna untuk material borongan yang harganya menyesuaikan luas bidang!
  </div>

  <h3>Cara Menambah Produk Baru:</h3>
  <ol>
    <li>Klik tombol biru <strong>"+ Tambah Produk"</strong> di pojok kanan atas.</li>
    <li>Isi Nama Produk, pilih Kategori, dan tulis Deskripsi singkat.</li>
    <li>Unggah foto produk dari komputer atau HP (bisa pilih beberapa foto sekaligus).</li>
    <li>Masukkan Varian Harga (misalnya: varian Roll 50m atau varian Per Meter Lari).</li>
    <li>Klik <strong>"Simpan Produk"</strong>. Produk langsung tayang di website seketika!</li>
  </ol>

  <div class="img-container">
    <img src="${images.adminProductsCreate}" alt="Form Tambah Produk Baru">
    <div class="img-caption">📷 Gambar 8: Form Tambah Produk Baru dengan tombol "+" untuk membuat kategori baru secara instan.</div>
  </div>

  <div class="info-box">
    <strong>✨ Fitur Tombol Tambah Kategori Cepat ("+"):</strong><br>
    Di samping pilihan kategori terdapat tombol lingkaran bertanda <strong>"+"</strong>. Anda bisa langsung membuat kategori baru dari form ini tanpa perlu repot membuka halaman lain!
  </div>

  <div class="page-break"></div>
  <h2>3.4 Tutorial Kelola Galeri Proyek (Dokumentasi Pemasangan)</h2>
  <p>
    Foto-foto hasil kerja adalah kunci utama meyakinkan pelanggan. Kelola dokumentasi foto melalui menu <strong>"Galeri"</strong>.
  </p>

  <div class="img-container">
    <img src="${images.adminGalleries}" alt="Kelola Galeri Proyek">
    <div class="img-caption">📷 Gambar 9: Tabel Galeri Proyek dengan tombol switch tampil/sembunyikan foto seketika.</div>
  </div>

  <p><strong>Cara Menambah Foto Proyek Baru:</strong></p>
  <ol>
    <li>Klik tombol <strong>"+ Tambah Foto Galeri"</strong>.</li>
    <li>Pilih Kategori Proyek (Kaca Film, Sandblast, Wallpaper, Blinds, atau Signage).</li>
    <li>Beri Judul Proyek (contoh: <em>Pemasangan Sandblast Logo Kantor Telkom Bekasi</em>).</li>
    <li>Pilih 1 atau beberapa foto dokumentasi terbaik dari lokasi kerja.</li>
    <li>Tuliskan Catatan / Caption singkat.</li>
    <li>Klik <strong>"Simpan Galeri"</strong>.</li>
  </ol>

  <h2>3.5 Tutorial Arsip Pemesanan (Pencatatan Pelanggan)</h2>
  <p>
    Menu <strong>"Arsip Pemesanan"</strong> berfungsi mencatat pelanggan yang sudah memesan atau menjadwalkan survey lokasi.
  </p>

  <div class="img-container">
    <img src="${images.adminOrders}" alt="Kelola Arsip Pemesanan">
    <div class="img-caption">📷 Gambar 10: Arsip Pemesanan untuk mencatat nomor WA pelanggan, biaya, dan status pengerjaan.</div>
  </div>

  <ul>
    <li>Mencatat Nama Klien / Instansi dan nomor WhatsApp pelanggan.</li>
    <li>Mencatat Nilai Kontrak / Biaya Pengerjaan.</li>
    <li>Mengupdate status pekerjaan: <span class="badge-status badge-blue">Survey Lokasi</span>, <span class="badge-status badge-green">Sedang Dikerjakan</span>, atau <span class="badge-status badge-green">Selesai</span>.</li>
  </ul>

  <div class="page-break"></div>
  <h2>3.6 Tutorial Manajemen Pengguna (Staf Admin)</h2>
  <p>
    Buka menu <strong>"Manajemen User"</strong> jika Anda ingin memberikan hak akses admin kepada staf atau teknisi kantor.
  </p>

  <div class="img-container">
    <img src="${images.adminUsers}" alt="Manajemen Pengguna Admin">
    <div class="img-caption">📷 Gambar 11: Tabel Pengguna Admin untuk menambah atau mengelola akun staf.</div>
  </div>

  <ul>
    <li>Klik <strong>"+ Tambah Pengguna Baru"</strong> untuk mendaftarkan staf baru dengan email dan kata sandinya sendiri.</li>
    <li><strong>Keamanan Sistem</strong>: Admin yang sedang login tidak dapat menghapus akunnya sendiri demi mencegah Anda terkunci keluar dari sistem.</li>
  </ul>

  <h2>3.7 Tutorial Ganti Foto & Profil Pribadi Admin</h2>
  <p>
    Anda dapat mengganti foto avatar dan memperbarui nomor kontak Anda sewaktu-waktu:
  </p>

  <div class="img-container">
    <img src="${images.adminProfile}" alt="Modal Ubah Profil Admin">
    <div class="img-caption">📷 Gambar 12: Jendela Pop-up Profil untuk mengganti foto profil avatar & nomor kontak WhatsApp.</div>
  </div>

  <ol>
    <li>Di pojok kanan atas halaman admin mana saja, klik pada <strong>Foto Avatar & Nama Anda</strong>.</li>
    <li>Jendela pop-up profil administrator akan terbuka.</li>
    <li>Klik lingkaran foto untuk memilih foto baru dari komputer.</li>
    <li>Ubah nama lengkap atau nomor WhatsApp admin jika ada perubahan.</li>
    <li>Klik tombol biru <strong>"Simpan Perubahan"</strong>.</li>
  </ol>

  <h2>3.8 Cara Keluar Akun (Logout) Aman</h2>
  <p>
    Setelah selesai mengelola website, klik tombol merah <strong>"Logout"</strong> di bagian paling bawah menu sebelah kiri, lalu pilih <strong>"Ya, Keluar Akun"</strong> pada konfirmasi yang muncul.
  </p>

  <div class="tip-box">
    <strong>🔒 Tips Keamanan Harian:</strong><br>
    Selalu lakukan logout jika menggunakan laptop atau komputer bersama agar akun admin Anda tetap aman dan tidak disalahgunakan.
  </div>

  <br>
  <hr style="border: none; border-top: 1px solid #E2E8F0; margin: 30px 0;">
  <p style="text-align: center; font-size: 9pt; color: #64748B;">
    © 2026 PT Tritama Decorindo Stiker • Seluruh Hak Cipta Dilindungi Undang-Undang.
  </p>

</body>
</html>
`;

async function generatePDF() {
  console.log('Generating PDF documentation...');
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

  const pdfPathRoot = path.resolve('Panduan_Penggunaan_Web_dan_Admin_Tritama_Decorindo.pdf');
  const pdfPathPublic = path.resolve('public/docs/Panduan_Penggunaan_Web_dan_Admin_Tritama_Decorindo.pdf');

  await page.pdf({
    path: pdfPathRoot,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '18mm',
      right: '16mm',
      bottom: '20mm',
      left: '16mm'
    }
  });

  fs.copyFileSync(pdfPathRoot, pdfPathPublic);

  await browser.close();
  console.log('PDF successfully generated at:');
  console.log('1.', pdfPathRoot);
  console.log('2.', pdfPathPublic);
}

generatePDF().catch(err => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});
