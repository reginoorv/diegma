# Panduan Lengkap Pengubahan Konten Website DIEGMA

## Daftar Isi
1. [Struktur Website](#struktur-website)
2. [Pengubahan Gambar](#pengubahan-gambar)
   - [Mengubah Gambar Proyek](#mengubah-gambar-proyek)
   - [Mengubah Gambar Layanan](#mengubah-gambar-layanan)
   - [Mengubah Gambar Produk Furnitur](#mengubah-gambar-produk-furnitur)
   - [Mengubah Gambar Testimoni](#mengubah-gambar-testimoni)
3. [Pengubahan Teks](#pengubahan-teks)
   - [Mengubah Teks Navigasi](#mengubah-teks-navigasi)
   - [Mengubah Teks Halaman Beranda](#mengubah-teks-halaman-beranda)
   - [Mengubah Teks Halaman Tentang Kami](#mengubah-teks-halaman-tentang-kami)
   - [Mengubah Teks Halaman Layanan](#mengubah-teks-halaman-layanan)
   - [Mengubah Teks Halaman Proyek](#mengubah-teks-halaman-proyek)
   - [Mengubah Teks Halaman Kontak](#mengubah-teks-halaman-kontak)
   - [Mengubah Teks Footer](#mengubah-teks-footer)
4. [Pengubahan Data](#pengubahan-data)
   - [Mengubah Data Proyek](#mengubah-data-proyek)
   - [Mengubah Data Layanan](#mengubah-data-layanan)
   - [Mengubah Data Produk Furnitur](#mengubah-data-produk-furnitur)
   - [Mengubah Data Statistik](#mengubah-data-statistik)

## Struktur Website

Website DIEGMA dibangun dengan struktur sebagai berikut:

1. **Halaman Utama (Beranda)**
   - Hero section dengan slider gambar
   - Bagian tentang kami
   - Layanan utama
   - Proyek unggulan
   - Statistik perusahaan
   - Kontak cepat

2. **Halaman Tentang Kami**
   - Sejarah perusahaan
   - Visi & misi
   - Tim kami
   - Nilai-nilai perusahaan

3. **Halaman Layanan**
   - Daftar layanan (Desain Interior & Eksterior, Konstruksi, Furniture)
   - Halaman detail untuk setiap layanan

4. **Halaman Proyek**
   - Daftar proyek dengan filter kategori
   - Halaman detail untuk setiap proyek

5. **Halaman Kontak**
   - Informasi kontak
   - Formulir pesan
   - Peta lokasi

## Pengubahan Gambar

### Mengubah Gambar Proyek

Semua gambar proyek disimpan di folder `/public/images/projects/`.

#### Cara Menambah atau Mengubah Gambar Proyek:

1. **Persiapkan Gambar Baru**:
   - Format gambar: JPG, PNG, atau WebP
   - Resolusi ideal: 1600x900px (rasio 16:9)
   - Kompres gambar untuk performa web yang baik (gunakan [TinyPNG](https://tinypng.com/))
   - Beri nama file yang deskriptif dan gunakan tanda hubung (-) untuk spasi, contoh: `apartemen-jakarta-modern.jpg`

2. **Upload Gambar**:
   - Upload gambar ke folder `/public/images/projects/`
   - Untuk gambar galeri proyek, buat nama file dengan penomoran, contoh: `apartemen-jakarta-modern-1.jpg`, `apartemen-jakarta-modern-2.jpg`, dsb.

3. **Update Data Proyek di Database**:
   - Perbarui kolom `imageUrl` pada tabel `projects` untuk gambar utama
   - Perbarui array `galleryImages` untuk gambar galeri

   Contoh SQL untuk update gambar:
   ```sql
   UPDATE projects 
   SET image_url = '/images/projects/apartemen-jakarta-modern.jpg', 
       gallery_images = '["images/projects/apartemen-jakarta-modern-1.jpg", "images/projects/apartemen-jakarta-modern-2.jpg"]'
   WHERE id = 1;
   ```

### Mengubah Gambar Layanan

Semua gambar layanan disimpan di folder `/public/images/services/`.

#### Cara Menambah atau Mengubah Gambar Layanan:

1. **Persiapkan Gambar Baru**:
   - Format gambar: JPG, PNG, atau WebP
   - Resolusi ideal: 1200x800px (rasio 3:2)
   - Kompres gambar untuk performa web yang baik
   - Beri nama file yang deskriptif, contoh: `desain-interior-eksterior.jpg`

2. **Upload Gambar**:
   - Upload gambar ke folder `/public/images/services/`

3. **Update Data Layanan di Database**:
   - Perbarui kolom `image_url` pada tabel `services`

   Contoh SQL untuk update gambar:
   ```sql
   UPDATE services 
   SET image_url = '/images/services/desain-interior-eksterior.jpg'
   WHERE id = 1;
   ```

### Mengubah Gambar Produk Furnitur

Semua gambar produk furnitur disimpan di folder `/public/images/products/`.

#### Cara Menambah atau Mengubah Gambar Produk:

1. **Persiapkan Gambar Baru**:
   - Format gambar: JPG, PNG, atau WebP
   - Resolusi ideal: 800x800px (rasio 1:1)
   - Kompres gambar untuk performa web yang baik
   - Beri nama file yang deskriptif, contoh: `sofa-minimalis.jpg`

2. **Upload Gambar**:
   - Upload gambar ke folder `/public/images/products/`

3. **Update Data Produk di Kode**:
   - Buka file `client/src/pages/service-detail.tsx`
   - Cari array `furnitureProducts`
   - Update nilai `imageUrl` untuk produk yang sesuai

   Contoh:
   ```javascript
   const furnitureProducts = [
     {
       id: 1,
       name: "Sofa Minimalis 3-Seater",
       description: "Sofa nyaman dengan desain minimalis...",
       price: "Rp 8.500.000",
       imageUrl: "/images/products/sofa-minimalis.jpg",
       category: "Sofa"
     },
     // Produk lainnya...
   ];
   ```

### Mengubah Gambar Testimoni

Gambar testimoni disimpan di folder `/public/images/testimonials/`.

#### Cara Menambah atau Mengubah Gambar Testimoni:

1. **Persiapkan Gambar Baru**:
   - Format gambar: JPG, PNG, atau WebP
   - Resolusi ideal: 200x200px (rasio 1:1)
   - Kompres gambar untuk performa web yang baik
   - Beri nama file yang deskriptif, contoh: `testimoni-budi.jpg`

2. **Upload Gambar**:
   - Upload gambar ke folder `/public/images/testimonials/`

3. **Update Referensi Gambar di Kode**:
   - Buka file `client/src/pages/service-detail.tsx` atau `client/src/pages/about.tsx` (tergantung di mana testimoni ditampilkan)
   - Update path gambar sesuai kebutuhan

## Pengubahan Teks

### Mengubah Teks Navigasi

Teks navigasi terdapat di file `client/src/components/layout/NavBar.tsx`.

#### Cara Mengubah Teks Navigasi:

1. Buka file `client/src/components/layout/NavBar.tsx`
2. Cari bagian dengan kode berikut:
   ```jsx
   const navItems = [
     { href: "/", label: "Beranda" },
     { href: "/tentang", label: "Tentang Kami" },
     { href: "/layanan", label: "Layanan" },
     { href: "/proyek", label: "Proyek" },
     { href: "/kontak", label: "Kontak" }
   ];
   ```
3. Ubah nilai `label` sesuai kebutuhan

### Mengubah Teks Halaman Beranda

Teks pada halaman beranda terbagi dalam beberapa komponen yang terpisah:

#### 1. Hero Section:
- Buka file `client/src/components/home/HeroSection.tsx`
- Cari dan ubah teks pada tag `<h1>`, `<p>`, dan teks tombol CTA

#### 2. About Section:
- Buka file `client/src/components/home/AboutSection.tsx`
- Cari dan ubah teks pada tag `<h2>`, `<p>`, dan daftar fitur

#### 3. Services Section:
- Buka file `client/src/components/home/ServicesSection.tsx`
- Cari dan ubah teks pada tag `<h2>`, `<p>`, dan deskripsi layanan

#### 4. Projects Section:
- Buka file `client/src/components/home/ProjectsSection.tsx`
- Cari dan ubah teks pada tag `<h2>`, `<p>`, dan deskripsi proyek

#### 5. Stats Section:
- Teks judul statistik berada di file-file di atas
- Data statistik diambil dari database tabel `stats`

### Mengubah Teks Halaman Tentang Kami

Untuk mengubah teks di halaman Tentang Kami:

1. Buka file `client/src/pages/about.tsx`
2. Cari dan ubah teks pada tag `<h1>`, `<p>`, dan bagian lainnya
3. Untuk mengubah informasi tim, cari array atau objek yang berisi data tim dan ubah sesuai kebutuhan

### Mengubah Teks Halaman Layanan

#### 1. Daftar Layanan:
- Data layanan diambil dari database tabel `services`
- Ubah data di database untuk mengubah judul dan deskripsi singkat

#### 2. Detail Layanan:
- Data detail layanan diambil dari database tabel `services`
- Untuk konten tambahan spesifik untuk layanan tertentu (seperti list fitur), buka file `client/src/pages/service-detail.tsx` dan cari conditional rendering berdasarkan `service.slug`

```jsx
{service.slug === "desain-interior-eksterior" && (
  <> 
    <h3>Layanan Desain Kami Mencakup:</h3>
    <ul>
      <!-- Ubah item list di sini -->
    </ul>
  </>
)}
```

### Mengubah Teks Halaman Proyek

#### 1. Daftar Proyek:
- Teks statis di bagian atas halaman terdapat di file `client/src/pages/projects.tsx`
- Data proyek diambil dari database tabel `projects`

#### 2. Detail Proyek:
- Data detail proyek diambil dari database tabel `projects`
- Format tampilan detail proyek terdapat di file `client/src/pages/project-detail.tsx`

### Mengubah Teks Halaman Kontak

Untuk mengubah teks di halaman Kontak:

1. Buka file `client/src/pages/contact.tsx`
2. Cari dan ubah teks pada tag `<h1>`, `<p>`, dan informasi kontak
3. Untuk mengubah label form, cari bagian form dan ubah teks label input

### Mengubah Teks Footer

Untuk mengubah teks di footer:

1. Buka file `client/src/components/layout/Footer.tsx`
2. Cari dan ubah teks copyright, informasi kontak, dan link

## Pengubahan Data

### Mengubah Data Proyek

Data proyek disimpan dalam database pada tabel `projects`.

#### 1. Menambah Proyek Baru:

```sql
INSERT INTO projects (
  title, 
  slug, 
  description, 
  short_description, 
  category_id, 
  location, 
  image_url, 
  gallery_images, 
  is_featured
) VALUES (
  'Nama Proyek Baru', 
  'nama-proyek-baru', 
  'Deskripsi lengkap proyek baru...', 
  'Deskripsi singkat proyek', 
  1, -- ID kategori, lihat tabel project_categories
  'Lokasi Proyek', 
  '/images/projects/nama-proyek-baru.jpg', 
  '["images/projects/nama-proyek-baru-1.jpg", "images/projects/nama-proyek-baru-2.jpg"]', 
  false -- true jika ingin dijadikan featured project
);
```

#### 2. Mengubah Proyek yang Ada:

```sql
UPDATE projects 
SET 
  title = 'Judul Proyek Update', 
  description = 'Deskripsi baru...', 
  short_description = 'Deskripsi singkat baru',
  location = 'Lokasi Baru',
  is_featured = true
WHERE 
  id = 1; -- ID proyek yang ingin diubah
```

#### 3. Menghapus Proyek:

```sql
DELETE FROM projects WHERE id = 1; -- ID proyek yang ingin dihapus
```

### Mengubah Data Layanan

Data layanan disimpan dalam database pada tabel `services`.

#### 1. Menambah Layanan Baru:

```sql
INSERT INTO services (
  title, 
  slug, 
  description, 
  short_description, 
  icon, 
  image_url
) VALUES (
  'Nama Layanan Baru', 
  'nama-layanan-baru', 
  'Deskripsi lengkap layanan baru...', 
  'Deskripsi singkat layanan', 
  'fas fa-home', -- kelas icon dari FontAwesome 
  '/images/services/nama-layanan-baru.jpg'
);
```

#### 2. Mengubah Layanan yang Ada:

```sql
UPDATE services 
SET 
  title = 'Judul Layanan Update', 
  description = 'Deskripsi baru...', 
  short_description = 'Deskripsi singkat baru',
  icon = 'fas fa-pencil'
WHERE 
  id = 1; -- ID layanan yang ingin diubah
```

#### 3. Menghapus Layanan:

```sql
DELETE FROM services WHERE id = 1; -- ID layanan yang ingin dihapus
```

### Mengubah Data Produk Furnitur

Data produk furnitur didefinisikan dalam file `client/src/pages/service-detail.tsx`.

#### Cara Mengubah Data Produk:

1. Buka file `client/src/pages/service-detail.tsx`
2. Cari array `furnitureProducts`
3. Tambah, ubah, atau hapus objek dalam array tersebut

```javascript
const furnitureProducts = [
  {
    id: 1,
    name: "Sofa Minimalis 3-Seater",
    description: "Sofa nyaman dengan desain minimalis...",
    price: "Rp 8.500.000",
    imageUrl: "/images/products/sofa-minimalis.jpg",
    category: "Sofa"
  },
  // Tambahkan produk baru di sini
  {
    id: 2,
    name: "Meja Makan Kayu Jati",
    description: "Meja makan elegan dengan kayu jati...",
    price: "Rp 12.000.000",
    imageUrl: "/images/products/meja-makan-jati.jpg",
    category: "Meja"
  },
  // dan seterusnya...
];
```

### Mengubah Data Statistik

Data statistik disimpan dalam database pada tabel `stats`.

#### Cara Mengubah Data Statistik:

```sql
UPDATE stats 
SET 
  completed_projects = 250, 
  turnkey_projects = 57, 
  years_experience = 15, 
  design_awards = 28
WHERE 
  id = 1; -- Biasanya hanya ada 1 baris di tabel stats
```

Jika tabel belum ada data:

```sql
INSERT INTO stats (
  completed_projects, 
  turnkey_projects, 
  years_experience, 
  design_awards
) VALUES (
  250, 
  57, 
  15, 
  28
);
```

## Tips dan Praktik Terbaik

### 1. Optimasi Gambar

- Selalu kompres gambar sebelum upload (gunakan tool seperti [TinyPNG](https://tinypng.com/) atau [Squoosh](https://squoosh.app/))
- Gunakan format gambar yang tepat:
  - JPG untuk foto
  - PNG untuk gambar dengan transparansi
  - WebP untuk kompresi yang lebih baik (dengan fallback ke JPG/PNG)
- Pertahankan aspek rasio yang konsisten untuk setiap jenis gambar

### 2. Manajemen Konten

- Backup database secara berkala sebelum melakukan perubahan besar
- Buat file cadangan untuk file kode yang akan diubah secara signifikan
- Gunakan kontrol versi (Git) untuk melacak perubahan

### 3. Pengujian Perubahan

- Selalu uji perubahan di lingkungan pengembangan sebelum menerapkannya ke produksi
- Periksa tampilan di berbagai perangkat (desktop, tablet, mobile) dan browser
- Validasi format data (tanggal, angka, URL) sebelum menyimpan ke database

### 4. SEO dan Aksesibilitas

- Gunakan teks alternatif (alt text) untuk semua gambar
- Pastikan judul dan deskripsi halaman bersifat deskriptif dan mengandung kata kunci relevan
- Jaga struktur heading yang hierarkis (h1, h2, h3, dst.)
- Pastikan kontras warna teks dan latar belakang cukup untuk keterbacaan