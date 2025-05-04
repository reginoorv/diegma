# Panduan Konfigurasi Manual Tabel di Supabase untuk Website DIEGMA

## Pendahuluan

Dokumen ini berisi instruksi detail untuk membuat dan mengkonfigurasi tabel-tabel yang diperlukan pada database Supabase secara manual. Gunakan panduan ini jika proses setup otomatis tidak berfungsi atau jika Anda ingin melakukan kustomisasi khusus pada struktur database.

## Akses SQL Editor Supabase

1. Login ke akun Supabase Anda dan pilih proyek yang digunakan untuk website DIEGMA
2. Pada sidebar, klik "SQL Editor"
3. Klik "New Query" untuk membuat query SQL baru

## Struktur Tabel yang Diperlukan

Berikut adalah script SQL untuk membuat semua tabel yang diperlukan oleh website DIEGMA:

### 1. Tabel Project Categories

```sql
CREATE TABLE IF NOT EXISTS project_categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Data awal untuk kategori
INSERT INTO project_categories (name, slug)
VALUES 
  ('Residential', 'residential'),
  ('Commercial', 'commercial'),
  ('Furniture', 'furniture')
ON CONFLICT (slug) DO NOTHING;
```

### 2. Tabel Projects

```sql
CREATE TABLE IF NOT EXISTS projects (
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

-- Data awal untuk proyek
-- Catatan: Pastikan tabel project_categories sudah dibuat dan terisi terlebih dahulu
INSERT INTO projects (title, slug, description, short_description, category_id, location, image_url, gallery_images, is_featured)
VALUES
  ('Residence Modern Jakarta', 'residence-modern-jakarta', 'Proyek hunian modern di Jakarta dengan konsep open space yang memadukan elemen alam dan desain kontemporer. Menggunakan material berkualitas tinggi dan pencahayaan alami yang maksimal untuk menciptakan ruang yang nyaman dan elegan.', 'Hunian modern dengan sentuhan alam di jantung kota Jakarta', 
   (SELECT id FROM project_categories WHERE slug = 'residential'), 
   'Jakarta Selatan', '/images/projects/residence-modern-jakarta.jpg', 
   '["images/projects/residence-modern-jakarta-1.jpg", "/images/projects/residence-modern-jakarta-2.jpg"]', 1),
  
  ('Office Space Minimalist', 'office-space-minimalist', 'Desain kantor minimalis yang mengutamakan produktivitas dan kesejahteraan karyawan. Layout yang efisien dengan area kolaborasi dan ruang privat yang seimbang, dilengkapi dengan furniture ergonomis dan pencahayaan yang optimal.', 'Ruang kerja modern yang meningkatkan produktivitas dan kenyamanan', 
   (SELECT id FROM project_categories WHERE slug = 'commercial'), 
   'Jakarta Pusat', '/images/projects/office-space-minimalist.jpg', 
   '["images/projects/office-space-minimalist-1.jpg", "/images/projects/office-space-minimalist-2.jpg"]', 1),
  
  ('Custom Furniture Collection', 'custom-furniture-collection', 'Koleksi furnitur custom yang dirancang khusus untuk melengkapi interior hunian mewah. Setiap piece dibuat dengan keahlian tinggi dan material premium, menciptakan harmoni antara fungsi dan estetika.', 'Furnitur eksklusif yang dirancang khusus untuk kebutuhan unik Anda', 
   (SELECT id FROM project_categories WHERE slug = 'furniture'), 
   'Bandung', '/images/projects/custom-furniture-collection.jpg', 
   '["images/projects/custom-furniture-collection-1.jpg", "/images/projects/custom-furniture-collection-2.jpg"]', 1)
ON CONFLICT (slug) DO NOTHING;
```

### 3. Tabel Services

```sql
CREATE TABLE IF NOT EXISTS services (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  short_description TEXT,
  icon TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Data awal untuk layanan
INSERT INTO services (title, slug, description, short_description, icon, image_url)
VALUES
  ('Desain Interior dan Eksterior', 'desain-interior-eksterior', 'Layanan desain interior dan eksterior kami mencakup konsultasi menyeluruh, perencanaan ruang, dan implementasi desain yang memadukan estetika dan fungsionalitas. Tim desainer berpengalaman kami akan bekerja sama dengan Anda untuk menciptakan ruang yang mencerminkan gaya dan kebutuhan unik Anda.', 'Transformasi ruang Anda menjadi karya seni yang fungsional dan nyaman ditinggali', 'fas fa-drafting-compass', '/images/services/desain-interior-eksterior.jpg'),
  
  ('Konstruksi', 'konstruksi', 'Layanan konstruksi kami menawarkan solusi end-to-end untuk proyek pembangunan dan renovasi. Dengan tim ahli bangunan dan pengalaman bertahun-tahun, kami menangani semua aspek konstruksi dari awal hingga akhir, memastikan proyek selesai tepat waktu dan sesuai anggaran.', 'Wujudkan desain impian Anda dengan layanan konstruksi berkualitas tinggi', 'fas fa-hammer', '/images/services/konstruksi.jpg'),
  
  ('Furniture', 'furniture', 'Koleksi furnitur kami mencakup berbagai gaya, dari klasik hingga kontemporer, dengan fokus pada kualitas dan desain yang timeless. Setiap produk dipilih dengan cermat untuk memastikan kenyamanan, daya tahan, dan nilai estetika yang tinggi bagi ruang Anda.', 'Lengkapi ruang Anda dengan furnitur berkualitas tinggi dan desain eksklusif', 'fas fa-couch', '/images/services/furniture.jpg')
ON CONFLICT (slug) DO NOTHING;
```

### 4. Tabel Contacts

```sql
CREATE TABLE IF NOT EXISTS contacts (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 5. Tabel Stats

```sql
CREATE TABLE IF NOT EXISTS stats (
  id SERIAL PRIMARY KEY,
  completed_projects INTEGER NOT NULL,
  turnkey_projects INTEGER NOT NULL,
  years_experience INTEGER NOT NULL,
  residential_designs INTEGER NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Data awal untuk statistik
INSERT INTO stats (completed_projects, turnkey_projects, years_experience, residential_designs)
VALUES (250, 57, 15, 180)
ON CONFLICT DO NOTHING;
```

## Langkah-langkah Pembuatan Tabel Manual

1. **Buat Tabel Project Categories**:
   - Copy script SQL untuk tabel project_categories ke SQL Editor Supabase
   - Klik "Run" atau tekan Ctrl+Enter untuk mengeksekusi
   - Pastikan tidak ada error

2. **Buat Tabel Services**:
   - Copy script SQL untuk tabel services ke SQL Editor Supabase
   - Klik "Run" untuk mengeksekusi
   - Pastikan tidak ada error

3. **Buat Tabel Stats**:
   - Copy script SQL untuk tabel stats ke SQL Editor Supabase
   - Klik "Run" untuk mengeksekusi
   - Pastikan tidak ada error

4. **Buat Tabel Projects**:
   - PENTING: Pastikan tabel project_categories sudah dibuat terlebih dahulu!
   - Copy script SQL untuk tabel projects ke SQL Editor Supabase
   - Klik "Run" untuk mengeksekusi
   - Pastikan tidak ada error

5. **Buat Tabel Contacts**:
   - Copy script SQL untuk tabel contacts ke SQL Editor Supabase
   - Klik "Run" untuk mengeksekusi
   - Pastikan tidak ada error

## Verifikasi Struktur Tabel

Setelah menjalankan semua script:

1. Klik "Table Editor" di sidebar
2. Anda akan melihat semua tabel yang telah dibuat:
   - `project_categories`
   - `projects`
   - `services`
   - `contacts`
   - `stats`

3. Klik pada masing-masing tabel untuk memastikan strukturnya sudah benar dan data awal sudah terisi

## Konfigurasi Row Level Security (RLS)

Untuk mengamankan database Anda, sebaiknya aktifkan Row Level Security:

1. Pada Table Editor, pilih tabel yang ingin diatur
2. Klik tab "Authentication" di bagian atas
3. Aktifkan "Row Level Security" dengan menggeser toggle
4. Klik "Add Policy"
5. Pilih template policy sesuai kebutuhan:
   - Untuk tabel yang hanya bisa dibaca public: Pilih "Select for everyone"
   - Untuk tabel yang perlu dikelola admin: Buat policy custom

## Catatan Penting

1. **Urutan Pembuatan**: Tabel dengan relasi foreign key (seperti `projects`) harus dibuat setelah tabel yang direferensikan (`project_categories`)
2. **Eksekusi Script**: Pastikan setiap script dijalankan secara terpisah dan berurutan untuk menghindari error
3. **Backup Data**: Selalu backup data penting sebelum melakukan perubahan struktur pada tabel yang sudah ada
4. **Konsistensi**: Jika Anda mengubah struktur tabel, pastikan kode aplikasi juga diupdate untuk mencerminkan perubahan tersebut

## Pemecahan Masalah

1. **Error Foreign Key**: Pastikan tabel yang direferensikan sudah dibuat dan memiliki data
2. **Unique Constraint Violated**: Data dengan slug yang sama sudah ada di database
3. **Permission Denied**: Periksa apakah Anda memiliki hak akses yang cukup atau cek konfigurasi RLS

---

© 2025 DIEGMA Interior Design Studio