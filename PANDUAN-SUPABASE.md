# Panduan Integrasi DIEGMA dengan Supabase

## Daftar Isi
1. [Pengenalan Supabase](#pengenalan-supabase)
2. [Setup Awal Supabase](#setup-awal-supabase)
3. [Migrasi Database ke Supabase](#migrasi-database-ke-supabase)
4. [Konfigurasi Koneksi dengan DIEGMA](#konfigurasi-koneksi-dengan-diegma)
5. [Mengelola Data Melalui Dashboard Supabase](#mengelola-data-melalui-dashboard-supabase)
6. [Panduan Keamanan dan Praktik Terbaik](#panduan-keamanan-dan-praktik-terbaik)

## Pengenalan Supabase

Supabase adalah platform open-source yang menyediakan alternatif untuk Firebase dengan fokus pada database PostgreSQL. Supabase menawarkan beberapa keunggulan:

- Database PostgreSQL terkelola
- API RESTful yang otomatis dihasilkan
- Autentikasi dan manajemen pengguna
- Penyimpanan file
- Fungsi serverless
- Akses real-time ke database

## Setup Awal Supabase

### Langkah 1: Membuat Akun dan Proyek Supabase

1. **Buat Akun Supabase**:
   - Kunjungi [supabase.com](https://supabase.com)
   - Klik "Start your project"
   - Daftar dengan GitHub atau email

2. **Buat Proyek Baru**:
   - Setelah login, klik "New Project"
   - Isi informasi proyek:
     - Name: `diegma-website`
     - Database Password: Buat password yang kuat
     - Region: Pilih region terdekat (misalnya Singapore untuk Indonesia)
   - Klik "Create New Project"
   - Tunggu proses pembuatan proyek (sekitar 2-3 menit)

### Langkah 2: Mencatat Informasi Koneksi Database

Setelah proyek dibuat, Anda akan membutuhkan informasi koneksi database:

1. Di dashboard Supabase, buka proyek Anda
2. Buka menu "Settings" > "Database"
3. Catat informasi berikut:
   - **Connection String** (lihat bagian "Connection string" dan pilih format URI)
   - **Host**: [nama-proyek].supabase.co
   - **Database Name**: postgres
   - **Port**: 5432
   - **User**: postgres
   - **Password**: password yang Anda buat saat membuat proyek

Connection string akan terlihat seperti ini:
```
postgresql://postgres:[PASSWORD]@db.[PROJECT-ID].supabase.co:5432/postgres
```

## Migrasi Database ke Supabase

### Langkah 1: Persiapan Schema Database

1. **Buka SQL Editor di Dashboard Supabase**:
   - Di dashboard Supabase, klik menu "SQL Editor"
   - Klik "New Query"

2. **Buat Schema Database**:
   - Copy dan paste SQL untuk membuat semua tabel yang diperlukan:

```sql
-- Project Categories
CREATE TABLE project_categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Projects
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  short_description TEXT,
  category_id INTEGER REFERENCES project_categories(id),
  location TEXT,
  image_url TEXT NOT NULL,
  gallery_images JSONB,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Services
CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  short_description TEXT,
  icon TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Contacts
CREATE TABLE contacts (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Stats
CREATE TABLE stats (
  id SERIAL PRIMARY KEY,
  completed_projects INTEGER NOT NULL,
  turnkey_projects INTEGER NOT NULL,
  years_experience INTEGER NOT NULL,
  design_awards INTEGER NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

3. **Jalankan Query** untuk membuat tabel-tabel tersebut.

### Langkah 2: Migrasi Data Existing (Jika Ada)

Jika Anda sudah memiliki data di database lama, Anda dapat memigrasikannya ke Supabase dengan dua cara:

#### Opsi 1: Melalui Export/Import SQL

1. **Export Data dari Database Lama**:
   ```bash
   pg_dump -U username -h localhost -d diegma -t projects -t project_categories -t services -t contacts -t stats --data-only > diegma_data.sql
   ```

2. **Import Data ke Supabase**:
   - Di dashboard Supabase, buka menu "SQL Editor"
   - Buat Query baru dan paste isi dari file `diegma_data.sql`
   - Jalankan Query

#### Opsi 2: Melalui Insert Manual

Jika jumlah data tidak terlalu banyak, Anda bisa melakukan insert manual melalui SQL Editor:

```sql
-- Contoh insert untuk project_categories
INSERT INTO project_categories (name, slug) VALUES 
('Residential', 'residential'),
('Commercial', 'commercial'),
('Furniture', 'furniture');

-- Contoh insert untuk services
INSERT INTO services (title, slug, description, short_description, icon, image_url) VALUES 
('Desain Interior dan Eksterior', 'desain-interior-eksterior', 'Layanan desain interior dan eksterior kami mencakup...', 'Transformasi ruang Anda menjadi karya seni yang fungsional', 'fas fa-drafting-compass', '/images/services/desain-interior-eksterior.jpg');

-- Dan seterusnya untuk tabel lainnya
```

## Konfigurasi Koneksi dengan DIEGMA

### Langkah 1: Update Konfigurasi Database di DIEGMA

1. **Update Environment Variable**:
   - Di file `.env` atau environment variable hosting Anda, set `DATABASE_URL` ke connection string Supabase:
   ```
   DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-ID].supabase.co:5432/postgres
   ```

2. **Update Konfigurasi Database** (Opsional):
   - Jika diperlukan, update file `db/index.ts` untuk memastikan koneksi ke Supabase berjalan dengan baik:

```typescript
// db/index.ts
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/pg-core';
import * as schema from '../shared/schema';

export const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // Tambahkan ini jika menggunakan Supabase
});

export const db = drizzle({ client: pool, schema });
```

### Langkah 2: Testing Koneksi

1. **Test Koneksi di Kode**:
   - Tambahkan endpoint test di `server/routes.ts` untuk memastikan koneksi berfungsi:

```typescript
// Tambahkan ke registerRoutes
app.get('/api/test-db', async (_req, res) => {
  try {
    const result = await db.query.services.findMany();
    return res.json({ success: true, count: result.length });
  } catch (error) {
    console.error('Database connection error:', error);
    return res.status(500).json({ error: 'Database connection error' });
  }
});
```

2. **Coba Akses Endpoint Test**:
   - Buka browser dan akses `http://localhost:5000/api/test-db`
   - Jika koneksi berhasil, Anda akan melihat respons JSON dengan data sukses

## Mengelola Data Melalui Dashboard Supabase

Supabase menyediakan dashboard yang user-friendly untuk mengelola data tanpa perlu menulis SQL.

### Mengakses dan Mengelola Tabel

1. **Buka "Table Editor"**:
   - Di dashboard Supabase, klik "Table Editor" di sidebar
   - Anda akan melihat semua tabel yang telah dibuat

2. **Melihat dan Mengedit Data**:
   - Klik nama tabel untuk melihat isinya
   - Gunakan interface visual untuk:
     - Menambah data baru: Klik "Insert" dan isi form
     - Mengedit data: Klik pada sel yang ingin diedit
     - Menghapus data: Pilih baris dan klik "Delete"

### Contoh Operasi Umum

#### 1. Menambah Proyek Baru:
- Buka tabel "projects"
- Klik "Insert"
- Isi semua field yang diperlukan
- Untuk `gallery_images`, masukkan array JSON:
  ```json
  ["images/projects/proyek-baru-1.jpg", "images/projects/proyek-baru-2.jpg"]
  ```
- Klik "Save"

#### 2. Mengubah Layanan:
- Buka tabel "services"
- Cari layanan yang ingin diubah
- Klik pada sel yang ingin diubah dan edit nilainya
- Perubahan akan otomatis disimpan

#### 3. Menghapus Data:
- Buka tabel yang diinginkan
- Pilih baris yang ingin dihapus dengan mencentang checkbox di sebelah kiri
- Klik tombol "Delete" dan konfirmasi

## Menggunakan SQL Editor Supabase

Untuk operasi yang lebih kompleks, Anda dapat menggunakan SQL Editor:

1. Buka "SQL Editor" di sidebar
2. Klik "New Query"
3. Tulis query SQL Anda, contoh:
   ```sql
   -- Mencari proyek berdasarkan kategori
   SELECT p.title, p.description, c.name as category
   FROM projects p
   JOIN project_categories c ON p.category_id = c.id
   WHERE c.slug = 'residential'
   ORDER BY p.created_at DESC;
   ```
4. Klik "Run" untuk menjalankan query

## Panduan Keamanan dan Praktik Terbaik

### Pengaturan Keamanan

1. **Aktifkan Row Level Security (RLS)**:
   - Di dashboard Supabase, buka "Authentication" > "Policies"
   - Untuk setiap tabel, aktifkan RLS dengan mengklik toggle
   - Buat kebijakan yang sesuai:

   Contoh kebijakan untuk tabel "contacts" agar hanya admin yang bisa membaca:
   ```sql
   CREATE POLICY "Admin can read contacts" ON contacts
   FOR SELECT 
   USING (auth.uid() IN (SELECT id FROM admin_users));
   ```

2. **Mengamankan Koneksi Database**:
   - Jangan pernah menyimpan DATABASE_URL langsung di kode yang diekspos ke client
   - Gunakan environment variable untuk menyimpan informasi database
   - Untuk deployment, gunakan secret manager dari platform hosting Anda

### Praktik Terbaik

1. **Backup Berkala**:
   - Supabase sudah melakukan backup otomatis, tapi tetap lakukan backup manual secara berkala
   - Di dashboard Supabase, buka "Settings" > "Database" > "Backups"
   - Klik "Generate a backup" untuk membuat backup manual

2. **Monitoring Database**:
   - Monitor penggunaan database di dashboard Supabase
   - Perhatikan jumlah rows, ukuran database, dan kuota gratis/berbayar

3. **Pengelolaan Schema**:
   - Selalu buat migration script untuk perubahan schema
   - Simpan semua script di repository untuk melacak perubahan

## Migrasi ke Production

Saat website DIEGMA siap untuk dipublish ke production:

1. **Buat Proyek Supabase Production**:
   - Ikuti langkah yang sama seperti setup awal
   - Beri nama yang jelas (misal: `diegma-website-prod`)

2. **Migrasi Schema dan Data**:
   - Export schema dan data dari proyek development
   - Import ke proyek production

3. **Update Environment Variable**:
   - Update `DATABASE_URL` di environment hosting production dengan connection string proyek Supabase production

## Keuntungan Menggunakan Supabase untuk DIEGMA Website

1. **Dashboard Admin Bawaan**:
   - Tim DIEGMA dapat mengelola konten website langsung dari dashboard Supabase tanpa perlu membangun custom CMS

2. **Skalabilitas**:
   - Supabase dapat menangani pertumbuhan traffic dan data seiring perkembangan DIEGMA

3. **PostgreSQL Lengkap**:
   - Akses ke semua fitur PostgreSQL seperti full-text search, JSON functions, dll

4. **Keamanan Enterprise**:
   - Supabase menyediakan enkripsi data, backup otomatis, dan monitoring keamanan

5. **Hemat Biaya**:
   - Plan gratis Supabase sudah cukup untuk website seperti DIEGMA
   - Jika diperlukan, upgrade ke plan berbayar sesuai kebutuhan

## Bantuan dan Troubleshooting

Jika mengalami masalah dengan koneksi Supabase:

1. **Periksa Connection String**:
   - Pastikan format connection string benar
   - Verifikasi password tidak mengandung karakter khusus yang perlu di-escape

2. **SSL Issue**:
   - Jika mengalami error SSL, pastikan parameter SSL diset dengan benar:
   ```typescript
   const pool = new Pool({ 
     connectionString: process.env.DATABASE_URL,
     ssl: { rejectUnauthorized: false }
   });
   ```

3. **IP Restriction**:
   - Jika tidak bisa connect, periksa "Project Settings" > "Database" > "Connection Pooling"
   - Pastikan IP restriction tidak memblokir akses

4. **Bantuan Lanjutan**:
   - Kunjungi [dokumentasi Supabase](https://supabase.com/docs)
   - Bergabung dengan [komunitas Discord Supabase](https://discord.supabase.com)
   - Email support di support@supabase.io