# Panduan Konfigurasi Database dengan Supabase untuk Website DIEGMA

## Pendahuluan

Website DIEGMA dapat menggunakan Supabase sebagai database cloud untuk menyimpan semua data proyek, layanan, statistik, dan informasi kontak. Dokumen ini berisi instruksi langkah demi langkah untuk mengkonfigurasi Supabase sebagai database untuk website DIEGMA.

## Prasyarat

1. Memiliki akun Supabase (gratis atau berbayar)
2. Memiliki proyek Supabase yang sudah dibuat
3. Kode website DIEGMA yang sudah diunduh atau di-clone

## Langkah 1: Membuat Proyek Supabase

1. Kunjungi [supabase.com](https://supabase.com/) dan buat akun atau login jika sudah memiliki akun
2. Buat proyek baru dengan mengklik tombol "New Project"
3. Isi informasi proyek:
   - Name: DIEGMA (atau nama yang diinginkan)
   - Database Password: (buat password yang aman)
   - Region: (pilih region terdekat dengan target audiens Anda)
4. Klik "Create new project" dan tunggu proses pembuatan selesai (sekitar 2-3 menit)

## Langkah 2: Mendapatkan Kredensial Supabase

Setelah proyek dibuat, Anda akan memerlukan dua kredensial utama:

1. **Supabase URL**: Pada dashboard proyek, klik "Settings" di sidebar, lalu pilih "API". Salin nilai "URL" di bagian "Project URL".
2. **Supabase Anon Key**: Pada halaman yang sama, salin nilai "anon" "public" di bagian "Project API keys".

## Langkah 3: Mengatur Environment Variables

Environment variables (variabel lingkungan) diperlukan untuk menyimpan kredensial database dengan aman tanpa meng-hardcode di kode. Ada dua cara untuk menyiapkannya:

### A. Menggunakan File .env

1. Buat file bernama `.env` di root direktori proyek (jika belum ada)
2. Tambahkan baris berikut (ganti nilai dengan kredensial Anda):

```
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_KEY=your-anon-key
```

### B. Menggunakan Platform Hosting (jika sudah di-deploy)

Jika website sudah di-deploy ke platform hosting seperti Vercel, Netlify, dll:

1. Buka pengaturan proyek di dashboard platform hosting
2. Cari bagian "Environment Variables" atau "Build Variables"
3. Tambahkan variabel:
   - Key: `SUPABASE_URL`, Value: URL Supabase Anda
   - Key: `SUPABASE_KEY`, Value: Anon key Supabase Anda
4. Simpan dan deploy ulang proyek jika diperlukan

## Langkah 4: Inisialisasi Database Supabase

Setelah kredensial terkonfigurasi dengan benar, Anda perlu menginisialisasi database untuk membuat tabel-tabel yang diperlukan.

1. Pastikan website berjalan di mode development dengan perintah:
   ```
   npm run dev
   ```

2. Kunjungi endpoint berikut di browser Anda (ganti domain jika diperlukan):
   ```
   http://localhost:5000/api/setup-supabase-direct
   ```

3. Sistem akan mencoba membuat struktur database yang diperlukan di Supabase Anda. Jika berhasil, Anda akan melihat pesan sukses.

## Langkah 5: Verifikasi Konfigurasi Database

Untuk memastikan database sudah terkonfigurasi dengan benar:

1. Kunjungi endpoint berikut di browser (ganti domain jika diperlukan):
   ```
   http://localhost:5000/api/test-supabase
   ```

2. Jika terhubung dengan sukses, Anda akan melihat pesan "Koneksi Supabase berhasil!"

3. Periksa di dashboard Supabase:
   - Buka dashboard Supabase dan pilih proyek Anda
   - Klik "Table Editor" di sidebar
   - Pastikan tabel-tabel berikut sudah terbuat:
     - `projects`
     - `project_categories`
     - `services`
     - `contacts`
     - `stats`

## Pemecahan Masalah

Jika Anda menghadapi masalah, berikut beberapa langkah pemecahan masalah:

1. **Masalah Koneksi**: Periksa kredensial Supabase URL dan Key apakah sudah benar
2. **Tabel Tidak Terbuat**: Anda dapat membuat tabel secara manual di dashboard Supabase dengan SQL Editor. Gunakan script SQL yang tersedia di file `scripts/setup-supabase.ts`
3. **Error "relation does not exist"**: Ini normal jika tabel belum dibuat. Lakukan setup terlebih dahulu
4. **Masalah Hak Akses**: Pastikan Anda menggunakan anon key dan bukan service_role key untuk koneksi dari sisi client

## Catatan Keamanan

1. Jangan pernah share atau commit kredensial Supabase Anda ke repositori publik
2. Batasi hak akses di Supabase dengan Row Level Security (RLS) jika website memiliki fitur akses publik

## Dukungan Tambahan

Jika Anda membutuhkan bantuan lebih lanjut:
- Lihat dokumentasi Supabase di [supabase.com/docs](https://supabase.com/docs)
- Hubungi tim pengembang DIEGMA untuk dukungan lebih lanjut

---

© 2025 DIEGMA Interior Design Studio