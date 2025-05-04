# Instruksi Migrasi Database DIEGMA ke Supabase

## Langkah 1: Membuat Akun dan Proyek di Supabase

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

## Langkah 2: Dapatkan Connection String

1. Di dashboard Supabase, buka proyek Anda
2. Klik "Settings" di sidebar kiri
3. Klik "Database"
4. Scroll ke bawah ke bagian "Connection string"
5. Pilih format "URI"
6. Copy connection string. Formatnya akan seperti ini:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-ID].supabase.co:5432/postgres
   ```
7. Ganti `[YOUR-PASSWORD]` dengan password yang Anda buat saat membuat proyek

## Langkah 3: Siapkan Schema Database di Supabase

1. **Buka SQL Editor di Dashboard Supabase**:
   - Di dashboard Supabase, klik "SQL Editor" di sidebar kiri
   - Klik "New Query"

2. **Buat Schema Database**:
   - Copy dan paste SQL berikut ke editor:

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
  is_featured INTEGER DEFAULT 0,
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
  residential_designs INTEGER NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Seed Data untuk Project Categories
INSERT INTO project_categories (name, slug) VALUES
('Residential', 'residential'),
('Commercial', 'commercial'),
('Furniture', 'furniture');

-- Seed Data untuk Services
INSERT INTO services (title, slug, description, short_description, icon, image_url) VALUES
('Desain Interior dan Eksterior', 'desain-interior-eksterior', 'Layanan desain interior dan eksterior kami mencakup konsultasi menyeluruh, perencanaan ruang, dan implementasi desain yang memadukan estetika dan fungsionalitas. Tim desainer berpengalaman kami akan bekerja sama dengan Anda untuk menciptakan ruang yang mencerminkan gaya dan kebutuhan unik Anda.', 'Transformasi ruang Anda menjadi karya seni yang fungsional dan nyaman ditinggali', 'fas fa-drafting-compass', '/images/services/desain-interior-eksterior.jpg'),
('Konstruksi', 'konstruksi', 'Layanan konstruksi kami menawarkan solusi end-to-end untuk proyek pembangunan dan renovasi. Dengan tim ahli bangunan dan pengalaman bertahun-tahun, kami menangani semua aspek konstruksi dari awal hingga akhir, memastikan proyek selesai tepat waktu dan sesuai anggaran.', 'Wujudkan desain impian Anda dengan layanan konstruksi berkualitas tinggi', 'fas fa-hammer', '/images/services/konstruksi.jpg'),
('Furniture', 'furniture', 'Koleksi furnitur kami mencakup berbagai gaya, dari klasik hingga kontemporer, dengan fokus pada kualitas dan desain yang timeless. Setiap produk dipilih dengan cermat untuk memastikan kenyamanan, daya tahan, dan nilai estetika yang tinggi bagi ruang Anda.', 'Lengkapi ruang Anda dengan furnitur berkualitas tinggi dan desain eksklusif', 'fas fa-couch', '/images/services/furniture.jpg');

-- Seed Data untuk Stats
INSERT INTO stats (completed_projects, turnkey_projects, years_experience, residential_designs) VALUES
(250, 57, 15, 180);

-- Seed Data untuk Projects
INSERT INTO projects (title, slug, description, short_description, category_id, location, image_url, gallery_images, is_featured) VALUES
('Residence Modern Jakarta', 'residence-modern-jakarta', 'Proyek hunian modern di Jakarta dengan konsep open space yang memadukan elemen alam dan desain kontemporer. Menggunakan material berkualitas tinggi dan pencahayaan alami yang maksimal untuk menciptakan ruang yang nyaman dan elegan.', 'Hunian modern dengan sentuhan alam di jantung kota Jakarta', 1, 'Jakarta Selatan', '/images/projects/residence-modern-jakarta.jpg', '["images/projects/residence-modern-jakarta-1.jpg", "/images/projects/residence-modern-jakarta-2.jpg"]', 1),
('Office Space Minimalist', 'office-space-minimalist', 'Desain kantor minimalis yang mengutamakan produktivitas dan kesejahteraan karyawan. Layout yang efisien dengan area kolaborasi dan ruang privat yang seimbang, dilengkapi dengan furniture ergonomis dan pencahayaan yang optimal.', 'Ruang kerja modern yang meningkatkan produktivitas dan kenyamanan', 2, 'Jakarta Pusat', '/images/projects/office-space-minimalist.jpg', '["images/projects/office-space-minimalist-1.jpg", "/images/projects/office-space-minimalist-2.jpg"]', 1),
('Custom Furniture Collection', 'custom-furniture-collection', 'Koleksi furnitur custom yang dirancang khusus untuk melengkapi interior hunian mewah. Setiap piece dibuat dengan keahlian tinggi dan material premium, menciptakan harmoni antara fungsi dan estetika.', 'Furnitur eksklusif yang dirancang khusus untuk kebutuhan unik Anda', 3, 'Bandung', '/images/projects/custom-furniture-collection.jpg', '["images/projects/custom-furniture-collection-1.jpg", "/images/projects/custom-furniture-collection-2.jpg"]', 1);
```

3. **Jalankan Query** dengan mengklik tombol "Run"

## Langkah 4: Update DATABASE_URL di Environment Variable

Untuk menggunakan Supabase sebagai database, Anda perlu mengupdate environment variable DATABASE_URL dengan connection string Supabase yang sudah didapatkan.

### Saat Development:

1. Buat file `.env` di root project (jika belum ada)
2. Tambahkan baris berikut:
   ```
   DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-ID].supabase.co:5432/postgres
   ```
3. Restart server dengan perintah:
   ```
   npm run dev
   ```

### Saat Deployment:

1. Pada platform deployment (Netlify, Vercel, atau DomaiNesia), tambahkan environment variable:
   - Key: `DATABASE_URL`
   - Value: Connection string Supabase

## Langkah 5: Test Koneksi Database

1. Setelah mengupdate DATABASE_URL, kunjungi endpoint test yang telah dibuat:
   ```
   http://localhost:5000/api/test-db-connection
   ```

2. Jika koneksi berhasil, Anda akan melihat respons JSON dengan:
   ```json
   {
     "success": true,
     "message": "Koneksi database berhasil!",
     "databaseType": "Supabase",
     "data": [...]
   }
   ```

## Langkah 6: Menggunakan Dashboard Supabase untuk Mengelola Data

Kelebihan menggunakan Supabase adalah Anda bisa mengelola data langsung melalui dashboard visual yang user-friendly:

1. **Melihat dan Mengedit Data**:
   - Di dashboard Supabase, klik "Table Editor" di sidebar
   - Pilih tabel yang ingin diedit (projects, services, dll)
   - Gunakan interface untuk menambah, mengedit, atau menghapus data

2. **Operasi Umum**:

   - **Menambah Data**:
     - Klik tombol "Insert" di atas tabel
     - Isi formulir dengan data baru
     - Klik "Save"

   - **Mengedit Data**:
     - Klik langsung pada sel yang ingin diedit
     - Ubah nilai
     - Data akan otomatis tersimpan

   - **Menghapus Data**:
     - Pilih baris dengan mencentang checkbox di sebelah kiri
     - Klik tombol "Delete" dan konfirmasi

## Catatan Penting

- **Backup Data**: Lakukan backup data secara berkala melalui SQL Editor Supabase dengan perintah:
  ```sql
  SELECT * FROM projects; -- Ganti dengan tabel yang ingin di-backup
  ```
  Simpan hasil query sebagai file SQL.

- **Keamanan**: Jangan pernah menyebarkan connection string Supabase Anda. Selalu gunakan environment variable untuk menyimpannya.

- **Monitoring**: Pantau penggunaan database Anda melalui dashboard Supabase untuk memastikan Anda tidak melebihi batas paket gratis (jika menggunakan paket gratis).

- **Support**: Jika mengalami masalah, kunjungi [dokumentasi Supabase](https://supabase.com/docs) atau bergabung dengan [komunitas Discord Supabase](https://discord.supabase.com).