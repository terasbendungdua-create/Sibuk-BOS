# Generator SPMU, BAST & Surat Pesanan

Aplikasi otomasi dokumen pengadaan terpadu (Surat Perencanaan, Surat Pesanan, BAST, dan SPMU) siap cetak format PDF.

---

## Cara Online-kan ke Vercel (vercel.app)

Aplikasi ini sudah dilengkapi dengan file konfigurasi resmi `vercel.json` sehingga proses deploy ke Vercel sangat mudah.

### Cara 1: Deploy Lewat GitHub (Paling Direkomendasikan & Gratis)
1. **Push proyek ke GitHub**:
   - Buat repository baru di [GitHub](https://github.com/new).
   - Unggah atau `git push` seluruh file proyek ini ke repository Anda.
2. **Buka Vercel**:
   - Masuk ke akun Anda di [vercel.com](https://vercel.com).
   - Klik tombol **"Add New..."** lalu pilih **"Project"**.
   - Pilih repository GitHub yang baru saja Anda buat.
3. **Konfigurasi Project di Vercel**:
   - Vercel akan otomatis mendeteksi:
     - **Framework Preset**: `Vite`
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
4. **Klik "Deploy"**:
   - Tunggu sekitar 30–60 detik hingga proses build selesai.
   - Aplikasi Anda langsung online dengan link aktif, contoh: `https://nama-aplikasi-anda.vercel.app`!

---

### Cara 2: Deploy Lewat Terminal / Vercel CLI
Jika Anda mengunduh source code ke komputer Anda dan menggunakan terminal:
```bash
# 1. Install dependensi
npm install --legacy-peer-deps

# 2. Jalankan Vercel CLI
npx vercel
```
- Ikuti petunjuk di layar (pilih *Yes* untuk link to existing project / create new project).
- Jika sudah selesai, deploy versi production dengan:
```bash
npx vercel --prod
```

---

## Fitur Utama Aplikasi
- **Sistem 1 Kali Input**: Otomatis menghasilkan 4 dokumen administrasi pengadaan sekaligus:
  1. **Surat Perencanaan** (RAB / HPS / KAK)
  2. **Surat Pesanan (SP)**
  3. **Berita Acara Serah Terima (BAST)**
  4. **Surat Perintah Membayar Uang (SPMU)**
- **Preset Template**: Template BOS Sekolah, Dinas Pemda (SKPD), dan Pemerintah Desa (APBDes).
- **Cetak Presisi**: Dukungan ukuran kertas A4 & F4 (Folio), kop surat resmi ganda, dan ekspor ke PDF.
- **Perhitungan Otomatis**: Subtotal, PPN (11%), PPh (22/23), Netto, dan Terbilang Rupiah realtime.
