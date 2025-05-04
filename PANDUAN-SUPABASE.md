# Panduan Supabase untuk Website DIEGMA

Website DIEGMA telah dipersiapkan untuk dapat menggunakan database Supabase sebagai alternatif dari Neon Database. Dokumen ini akan menjelaskan apa itu Supabase, mengapa mempertimbangkan penggunaannya, dan bagaimana cara menggunakannya dengan website DIEGMA.

## Apa itu Supabase?

Supabase adalah platform database open-source yang menyediakan semua fitur backend yang Anda butuhkan untuk membangun aplikasi. Supabase bisa dianggap sebagai alternatif open-source dari Firebase, tetapi dibangun di atas PostgreSQL yang sangat powerful.

## Keunggulan Supabase

1. **Interface Visual yang User-Friendly**
   - Dashboard admin yang mudah digunakan untuk mengelola database
   - Editor SQL visual untuk menjalankan query langsung
   - Fitur ekspor data dalam format CSV atau JSON

2. **Kompatibilitas PostgreSQL Penuh**
   - Dukungan penuh untuk fitur PostgreSQL termasuk JOIN, VIEW, Stored Procedures
   - Bisa menggunakan tools PostgreSQL standard untuk interaksi dengan database

3. **Fitur Tambahan**
   - Autentikasi dan manajemen pengguna (jika dibutuhkan di masa depan)
   - Penyimpanan file (Storage) untuk gambar dan aset lainnya
   - Realtime subscriptions untuk update data secara langsung
   - Edge Functions untuk kode serverless

4. **Performa dan Skalabilitas**
   - Performa yang bagus bahkan pada paket gratis
   - Opsi untuk upgrade sesuai kebutuhan proyek

## Cara Menggunakan Supabase dengan DIEGMA

### 1. Membuat Akun dan Project

1. Kunjungi [supabase.com](https://supabase.com) dan buat akun
2. Buat project baru (free tier sudah cukup untuk kebutuhan website DIEGMA)
3. Catat URL dan kredensial database yang diberikan

### 2. Mengubah Koneksi Database

Website DIEGMA sudah disiapkan untuk mendukung koneksi ke Supabase. Yang perlu dilakukan hanyalah mengubah environment variable `DATABASE_URL` ke connection string Supabase Anda.

#### Format Connection String Supabase:
```
postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-ID].supabase.co:5432/postgres
```

#### Cara Pengaturan:

1. **Untuk Development Lokal**:
   - Buat file `.env` di root directory project
   - Tambahkan variable berikut:
     ```
     DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-ID].supabase.co:5432/postgres
     ```
   - Restart server dengan `npm run dev`

2. **Untuk Production**:
   - Tambahkan environment variable `DATABASE_URL` dengan nilai connection string Supabase di platform deploy Anda (Netlify, Vercel, atau lainnya)

### 3. Testing Koneksi

Untuk memastikan koneksi ke Supabase berhasil, kunjungi endpoint test yang telah dibuat khusus:

```
https://[your-domain.com]/api/test-db-connection
```

atau jika di development lokal:

```
http://localhost:5000/api/test-db-connection
```

Jika koneksi berhasil, Anda akan melihat respons JSON seperti:

```json
{
  "success": true,
  "message": "Koneksi database berhasil!",
  "databaseType": "Supabase",
  "data": [...]
}
```

### 4. Mengelola Data melalui Dashboard Supabase

Salah satu keunggulan Supabase adalah kemampuan untuk mengelola data melalui dashboard visual:

1. **Melihat Data**:
   - Login ke dashboard Supabase
   - Klik "Table Editor" di sidebar
   - Pilih tabel yang ingin dilihat (projects, services, dll.)

2. **Menambah Data**:
   - Dari Table Editor, klik tombol "Insert" di atas tabel
   - Isi formulir dan klik "Save"

3. **Mengedit Data**:
   - Klik pada sel yang ingin diedit
   - Ubah nilai dan tekan Enter

4. **Menghapus Data**:
   - Pilih baris dengan mencentang checkbox di sebelah kiri
   - Klik tombol "Delete" di atas tabel

## Transfer Data dari Neon ke Supabase

Jika Anda sudah memiliki data di Neon Database dan ingin memindahkannya ke Supabase, Anda bisa mengikuti salah satu dari dua metode:

### Metode 1: Menggunakan SQL Editor Supabase

1. Ekstra data dari Neon dengan SQL:
   ```sql
   SELECT * FROM projects;
   SELECT * FROM services;
   SELECT * FROM project_categories;
   SELECT * FROM stats;
   ```

2. Copy output hasil query

3. Buat INSERT statements dan jalankan di SQL Editor Supabase:
   ```sql
   INSERT INTO projects (...) VALUES (...);
   ```

### Metode 2: Menggunakan Script Migrasi

Untuk langkah-langkah lebih detail mengenai script migrasi, silakan lihat file **KONFIGURASI-SUPABASE.md** yang disertakan dalam repositori ini.

## Catatan Penting

1. **Backup** - Selalu backup data Anda secara berkala
2. **Keamanan** - Jangan pernah share connection string database Anda
3. **SSL** - Supabase memerlukan SSL enabled di production
4. **Monitoring** - Pantau penggunaan database Anda untuk menghindari melewati batas free tier

## Dokumentasi Tambahan

Untuk informasi lebih detail, silakan lihat file-file berikut dalam repositori:

1. **INSTRUKSI-SUPABASE.md** - Langkah-langkah detail untuk setup dan konfigurasi
2. **KONFIGURASI-SUPABASE.md** - Informasi teknis untuk developer

## Resources Eksternal

- [Dokumentasi Supabase](https://supabase.com/docs)
- [Supabase GitHub](https://github.com/supabase/supabase)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

Jika Anda memiliki pertanyaan atau masalah saat menggunakan Supabase dengan website DIEGMA, jangan ragu untuk menghubungi developer atau konsultasikan dengan dokumentasi resmi Supabase.