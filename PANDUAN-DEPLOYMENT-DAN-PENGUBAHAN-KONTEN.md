# Panduan Lengkap DIEGMA Website

## Daftar Isi
1. [Cara Melakukan Push ke GitHub](#cara-melakukan-push-ke-github)
2. [Panduan Deployment](#panduan-deployment)
   - [Deployment dengan Netlify](#deployment-dengan-netlify)
   - [Deployment dengan Vercel](#deployment-dengan-vercel)
   - [Deployment dengan DomaiNesia](#deployment-dengan-domainesia)
3. [Panduan Pengubahan Konten](#panduan-pengubahan-konten)
   - [Mengubah Gambar](#mengubah-gambar)
   - [Mengubah Teks](#mengubah-teks)
   - [Mengubah Data Proyek](#mengubah-data-proyek)
   - [Mengubah Data Layanan](#mengubah-data-layanan)
   - [Mengubah Produk Furnitur](#mengubah-produk-furnitur)
   - [Mengubah Statistik](#mengubah-statistik)

## Cara Melakukan Push ke GitHub

Berikut adalah langkah-langkah untuk meng-upload kode website DIEGMA ke GitHub:

### Persiapan Awal

1. **Install Git**:
   - Unduh Git dari [git-scm.com](https://git-scm.com/downloads)
   - Install dengan mengikuti panduan instalasi
   - Buka terminal/command prompt dan verifikasi instalasi dengan perintah:
     ```
     git --version
     ```

2. **Buat Akun GitHub**:
   - Jika belum memiliki akun, daftar di [github.com](https://github.com/join)
   - Login ke akun GitHub Anda

3. **Buat Repository Baru**:
   - Klik tombol "New" di halaman GitHub Anda
   - Beri nama repository, misalnya "diegma-website"
   - Atur visibility sesuai kebutuhan (public atau private)
   - Klik "Create repository"

### Proses Upload Kode ke GitHub

1. **Inisialisasi Repository Lokal**:
   - Buka terminal/command prompt
   - Navigasi ke folder proyek DIEGMA:
     ```
     cd path/ke/folder/diegma
     ```
   - Inisialisasi git repository:
     ```
     git init
     ```

2. **Tambahkan Remote Repository**:
   ```
   git remote add origin https://github.com/username/diegma-website.git
   ```
   (Ganti "username" dengan username GitHub Anda dan "diegma-website" dengan nama repository yang dibuat)

3. **Tambahkan File ke Staging Area**:
   ```
   git add .
   ```

4. **Buat Commit Pertama**:
   ```
   git commit -m "Initial commit - DIEGMA website"
   ```

5. **Push ke GitHub**:
   ```
   git push -u origin main
   ```
   (Jika branch utama bernama "master", ganti "main" dengan "master")

6. **Verifikasi Upload**:
   - Kunjungi repository GitHub Anda
   - Pastikan semua file telah terupload dengan benar

### Pembaruan Selanjutnya

Setiap kali melakukan perubahan pada kode website, lakukan langkah berikut:

1. **Tambahkan Perubahan**:
   ```
   git add .
   ```

2. **Buat Commit Baru**:
   ```
   git commit -m "Deskripsi perubahan yang dilakukan"
   ```

3. **Push Perubahan**:
   ```
   git push
   ```

## Panduan Deployment

### Persiapan Umum untuk Deployment

Sebelum melakukan deployment, pastikan proyek Anda siap dengan menjalankan langkah-langkah berikut:

1. **Build Project**:
   ```
   npm run build
   ```
   Perintah ini akan membuat versi produksi website di folder `dist`.

2. **Verifikasi Build**:
   - Periksa apakah semua file yang diperlukan telah di-build dengan benar
   - Pastikan semua dependensi tercantum dalam `package.json`

### Deployment dengan Netlify

#### Langkah 1: Persiapan Akun dan Project

1. **Buat Akun Netlify**:
   - Kunjungi [netlify.com](https://netlify.com)
   - Daftar akun baru atau login dengan akun yang sudah ada
   - Anda dapat mendaftar dengan GitHub, GitLab, atau email

2. **Persiapkan Project untuk Deployment**:
   - Pastikan project telah di-push ke GitHub (lihat bagian [Cara Melakukan Push ke GitHub](#cara-melakukan-push-ke-github))
   - Pastikan file `netlify.toml` ada di root project dengan konfigurasi berikut:

   ```toml
   [build]
     command = "npm run build"
     publish = "dist"
   
   [functions]
     directory = "functions"
   
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

#### Langkah 2: Deploy ke Netlify

1. **Deployment Otomatis via GitHub**:
   - Di dashboard Netlify, klik "New site from Git"
   - Pilih "GitHub" sebagai penyedia Git
   - Pilih repository "diegma-website"
   - Konfigurasi pengaturan build:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Klik "Deploy site"

2. **Deployment Manual**:
   - Build project lokal: `npm run build`
   - Di dashboard Netlify, klik "Sites" lalu "Drag and drop"
   - Drag dan drop folder `dist` ke area yang ditentukan

#### Langkah 3: Konfigurasi Environment Variables

1. Di dashboard Netlify, pilih site yang baru dibuat
2. Buka "Site settings" > "Build & deploy" > "Environment"
3. Klik "Edit variables" dan tambahkan variabel berikut:
   - Key: `DATABASE_URL`
   - Value: URL database PostgreSQL yang digunakan

4. Tambahkan variabel environment lain yang diperlukan

#### Langkah 4: Konfigurasi Domain Custom

1. Di dashboard Netlify, pilih site yang baru dibuat
2. Buka "Domain settings"
3. Klik "Add custom domain"
4. Masukkan nama domain Anda (misalnya: diegma.com)
5. Ikuti petunjuk untuk mengkonfigurasi DNS

### Deployment dengan Vercel

#### Langkah 1: Persiapan Akun dan Project

1. **Buat Akun Vercel**:
   - Kunjungi [vercel.com](https://vercel.com)
   - Daftar akun baru atau login dengan akun yang sudah ada
   - Anda dapat mendaftar dengan GitHub, GitLab, atau email

2. **Persiapkan Project untuk Deployment**:
   - Pastikan project telah di-push ke GitHub
   - Tambahkan file `vercel.json` di root project:

   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "package.json",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       { "handle": "filesystem" },
       { "src": "/.*", "dest": "/index.html" }
     ]
   }
   ```

#### Langkah 2: Deploy ke Vercel

1. **Deployment Otomatis via GitHub**:
   - Di dashboard Vercel, klik "Import Project"
   - Pilih "Import Git Repository"
   - Pilih repository "diegma-website"
   - Konfigurasi pengaturan build:
     - Build Command: `npm run build`
     - Output Directory: `dist`
     - Development Command: `npm run dev`
   - Klik "Deploy"

2. **Deployment dengan Vercel CLI**:
   - Install Vercel CLI: `npm i -g vercel`
   - Login ke Vercel: `vercel login`
   - Deploy: `vercel`
   - Untuk production: `vercel --prod`

#### Langkah 3: Konfigurasi Environment Variables

1. Di dashboard Vercel, pilih project yang baru dibuat
2. Buka tab "Settings" > "Environment Variables"
3. Tambahkan variabel yang diperlukan, contohnya:
   - Name: `DATABASE_URL`
   - Value: URL database PostgreSQL yang digunakan
4. Klik "Save"

#### Langkah 4: Konfigurasi Domain Custom

1. Di dashboard Vercel, pilih project yang baru dibuat
2. Buka tab "Settings" > "Domains"
3. Masukkan nama domain Anda (contoh: diegma.com)
4. Ikuti petunjuk konfigurasi DNS

### Deployment dengan DomaiNesia

#### Langkah 1: Menyiapkan Hosting DomaiNesia

1. **Buat Akun dan Order Hosting**:
   - Kunjungi [domainesia.com](https://www.domainesia.com/)
   - Daftar akun baru atau login ke akun yang sudah ada
   - Pilih dan order layanan hosting yang sesuai (disarankan paket yang mendukung Node.js)

2. **Dapatkan Informasi Akses**:
   - Login ke Member Area DomaiNesia
   - Catat informasi berikut:
     - cPanel URL
     - cPanel Username
     - cPanel Password

#### Langkah 2: Setup Database PostgreSQL

1. **Buat Database PostgreSQL**:
   - Login ke cPanel
   - Buka "Database" > "PostgreSQL Database"
   - Buat database baru dengan nama "diegma_db"
   - Catat nama database, username, dan password

2. **Import Database**:
   - Export database dari development environment:
     ```
     pg_dump -U username -h localhost diegma_db > diegma_backup.sql
     ```
   - Import ke database di DomaiNesia melalui phpPgAdmin di cPanel

#### Langkah 3: Upload Files via FTP

1. **Persiapkan Project untuk Upload**:
   - Build project: `npm run build`
   - Ini akan menghasilkan folder `dist` dengan file-file statis

2. **Setup FTP Client**:
   - Download dan install FTP client seperti FileZilla
   - Buka FileZilla dan masuk ke menu "Site Manager"
   - Klik "New Site" dan beri nama "DIEGMA DomaiNesia"
   - Masukkan detail berikut:
     - Host: FTP host dari DomaiNesia (biasanya ftp.namadomainanda.com)
     - Port: 21
     - Protocol: FTP - File Transfer Protocol
     - Encryption: Use explicit FTP over TLS if available
     - Logon Type: Normal
     - User: Username FTP dari DomaiNesia (biasanya sama dengan username cPanel)
     - Password: Password FTP dari DomaiNesia

3. **Upload Files**:
   - Connect ke server menggunakan detail FTP
   - Navigasi ke folder public_html di panel kanan
   - Upload semua file dari folder `dist` ke folder public_html

#### Langkah 4: Konfigurasi Node.js (jika didukung)

1. **Aktifkan Node.js**:
   - Login ke cPanel
   - Buka "Setup Node.js App"
   - Klik "Create Application"
   - Isi detail aplikasi:
     - Node.js version: Pilih versi yang sesuai (misalnya 16.x)
     - Application mode: Production
     - Application root: /home/username/public_html
     - Application URL: yourdomain.com
     - Application startup file: server/index.js
   - Klik "Create"

2. **Konfigurasi Environment Variables**:
   - Masih di halaman Setup Node.js App
   - Buka tab "Environment variables"
   - Tambahkan variabel yang diperlukan:
     - DATABASE_URL: Sesuaikan dengan informasi database PostgreSQL yang telah dibuat

3. **Restart Aplikasi**:
   - Klik tombol "Restart" untuk menerapkan perubahan

#### Langkah 5: Setup Domain dan SSL

1. **Konfigurasi Domain**:
   - Di Member Area DomaiNesia, pastikan domain mengarah ke hosting yang benar
   - Tunggu propagasi DNS (bisa memakan waktu hingga 24 jam)

2. **Aktifkan SSL**:
   - Login ke cPanel
   - Buka "SSL/TLS" > "Let's Encrypt SSL"
   - Pilih domain yang ingin diaktifkan SSL-nya
   - Klik "Issue" untuk mengaktifkan SSL

## Panduan Pengubahan Konten

### Struktur Penyimpanan Konten Website

Website DIEGMA menggunakan struktur penyimpanan konten berikut:

1. **Data Dinamis**: Disimpan dalam database PostgreSQL dengan tabel:
   - `projects`: Menyimpan data proyek
   - `project_categories`: Kategori proyek
   - `services`: Layanan yang ditawarkan
   - `contacts`: Data kontak dari pengunjung
   - `stats`: Statistik perusahaan

2. **Aset Gambar**: Disimpan dalam direktori `/public/images/` dengan sub-direktori:
   - `/public/images/projects/`: Gambar proyek
   - `/public/images/services/`: Gambar layanan
   - `/public/images/products/`: Gambar produk furnitur
   - `/public/images/team/`: Foto tim
   - `/public/images/testimonials/`: Foto testimonial

### Mengubah Gambar

#### Mengganti Gambar Proyek

1. **Persiapkan Gambar**:
   - Format yang didukung: JPG, PNG, WebP
   - Resolusi yang direkomendasikan: 1600x900px (rasio 16:9)
   - Pastikan ukuran file kurang dari 500KB untuk performa yang baik

2. **Upload Gambar Baru**:
   - Simpan gambar baru di folder `/public/images/projects/`
   - Gunakan nama file yang deskriptif dan gunakan tanda hubung untuk spasi, misalnya: `residence-modern-jakarta.jpg`

3. **Update Database**:
   - Update field `imageUrl` di tabel `projects` untuk proyek yang sesuai
   - Pastikan path gambar benar: `/images/projects/nama-file.jpg`

#### Mengganti Gambar Layanan

1. **Persiapkan Gambar**:
   - Format yang didukung: JPG, PNG, WebP
   - Resolusi yang direkomendasikan: 1200x800px
   - Pastikan ukuran file kurang dari 400KB

2. **Upload Gambar Baru**:
   - Simpan gambar baru di folder `/public/images/services/`
   - Gunakan nama file yang deskriptif, misalnya: `desain-interior-eksterior.jpg`

3. **Update Database**:
   - Update field `image_url` di tabel `services` untuk layanan yang sesuai
   - Pastikan path gambar benar: `/images/services/nama-file.jpg`

#### Mengganti Gambar Produk Furnitur

1. **Persiapkan Gambar**:
   - Format yang didukung: JPG, PNG, WebP
   - Resolusi yang direkomendasikan: 800x800px (rasio 1:1)
   - Pastikan ukuran file kurang dari 300KB

2. **Upload Gambar Baru**:
   - Simpan gambar baru di folder `/public/images/products/`
   - Gunakan nama file yang deskriptif, misalnya: `sofa-minimalis.jpg`

3. **Update Database atau Kode**:
   - Jika data produk disimpan di database, update field `imageUrl`
   - Jika data produk disimpan dalam kode, update array `furnitureProducts` di file `client/src/pages/service-detail.tsx`

### Mengubah Teks

#### Mengubah Teks Halaman Beranda

1. **Bagian Hero**:
   - Buka file `client/src/components/home/HeroSection.tsx`
   - Edit teks judul, subtitle, dan deskripsi sesuai kebutuhan

2. **Bagian About**:
   - Buka file `client/src/components/home/AboutSection.tsx`
   - Edit teks judul, deskripsi, dan fitur-fitur

3. **Bagian Services**:
   - Buka file `client/src/components/home/ServicesSection.tsx`
   - Edit teks judul, subtitle, dan deskripsi

4. **Bagian Projects**:
   - Buka file `client/src/components/home/ProjectsSection.tsx`
   - Edit teks judul, subtitle, dan deskripsi

#### Mengubah Teks Halaman Tentang Kami

1. Buka file `client/src/pages/about.tsx`
2. Edit teks judul, deskripsi, dan informasi tim

#### Mengubah Teks Halaman Layanan

1. **Halaman Daftar Layanan**:
   - Buka file `client/src/pages/services.tsx`
   - Edit teks judul, subtitle, dan deskripsi

2. **Halaman Detail Layanan**:
   - Data layanan disimpan dalam database di tabel `services`
   - Update field `title`, `description`, dan `shortDescription` sesuai kebutuhan

#### Mengubah Teks Halaman Proyek

1. **Halaman Daftar Proyek**:
   - Buka file `client/src/pages/projects.tsx`
   - Edit teks judul, subtitle, dan deskripsi

2. **Halaman Detail Proyek**:
   - Data proyek disimpan dalam database di tabel `projects`
   - Update field `title`, `description`, `category`, dan `location` sesuai kebutuhan

#### Mengubah Teks Halaman Kontak

1. Buka file `client/src/pages/contact.tsx`
2. Edit teks judul, subtitle, dan informasi kontak

### Mengubah Data Proyek

#### Menambah Proyek Baru

1. **Persiapkan Gambar**:
   - Siapkan gambar utama proyek dan gambar gallery
   - Upload ke folder `/public/images/projects/`

2. **Tambahkan Data Proyek ke Database**:
   - Tambahkan data baru ke tabel `projects` dengan informasi:
     - `title`: Judul proyek
     - `slug`: URL slug (gunakan huruf kecil dan tanda hubung)
     - `description`: Deskripsi lengkap proyek
     - `shortDescription`: Deskripsi singkat untuk tampilan card
     - `categoryId`: ID kategori proyek (lihat tabel `project_categories`)
     - `location`: Lokasi proyek
     - `imageUrl`: Path gambar utama (`/images/projects/nama-file.jpg`)
     - `galleryImages`: Array path gambar gallery dalam format JSON
     - `isFeatured`: Boolean untuk menandai proyek unggulan

   **Contoh Query SQL**:
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
     'Residence Modern Jakarta', 
     'residence-modern-jakarta', 
     'Deskripsi lengkap proyek...', 
     'Deskripsi singkat untuk card', 
     1, 
     'Jakarta Selatan', 
     '/images/projects/residence-modern-jakarta.jpg', 
     '["images/projects/residence-modern-jakarta-1.jpg", "/images/projects/residence-modern-jakarta-2.jpg"]', 
     true
   );
   ```

#### Mengedit Proyek yang Ada

1. **Update Gambar** (jika diperlukan):
   - Upload gambar baru ke folder `/public/images/projects/`

2. **Update Data Proyek di Database**:
   - Update informasi di tabel `projects` untuk proyek yang sesuai

   **Contoh Query SQL**:
   ```sql
   UPDATE projects 
   SET 
     title = 'Residence Modern Jakarta Updated', 
     description = 'Deskripsi baru...', 
     location = 'Jakarta Barat'
   WHERE 
     id = 1;
   ```

#### Menghapus Proyek

1. **Hapus Data Proyek dari Database**:
   - Hapus data dari tabel `projects` untuk proyek yang ingin dihapus

   **Contoh Query SQL**:
   ```sql
   DELETE FROM projects WHERE id = 1;
   ```

2. **Hapus Gambar Terkait** (opsional):
   - Hapus file gambar dari folder `/public/images/projects/` jika sudah tidak digunakan

### Mengubah Data Layanan

#### Menambah Layanan Baru

1. **Persiapkan Gambar**:
   - Siapkan gambar layanan
   - Upload ke folder `/public/images/services/`

2. **Tambahkan Data Layanan ke Database**:
   - Tambahkan data baru ke tabel `services` dengan informasi:
     - `title`: Judul layanan
     - `slug`: URL slug (gunakan huruf kecil dan tanda hubung)
     - `description`: Deskripsi lengkap layanan
     - `shortDescription`: Deskripsi singkat untuk tampilan card
     - `icon`: Kelas ikon (mis. "fas fa-home")
     - `image_url`: Path gambar (`/images/services/nama-file.jpg`)

   **Contoh Query SQL**:
   ```sql
   INSERT INTO services (
     title, 
     slug, 
     description, 
     short_description, 
     icon, 
     image_url
   ) VALUES (
     'Desain Interior dan Eksterior', 
     'desain-interior-eksterior', 
     'Deskripsi lengkap layanan...', 
     'Deskripsi singkat untuk card', 
     'fas fa-drafting-compass', 
     '/images/services/desain-interior-eksterior.jpg'
   );
   ```

#### Mengedit Layanan yang Ada

1. **Update Gambar** (jika diperlukan):
   - Upload gambar baru ke folder `/public/images/services/`

2. **Update Data Layanan di Database**:
   - Update informasi di tabel `services` untuk layanan yang sesuai

   **Contoh Query SQL**:
   ```sql
   UPDATE services 
   SET 
     title = 'Desain Interior dan Eksterior Updated', 
     description = 'Deskripsi baru...', 
     icon = 'fas fa-pencil-ruler'
   WHERE 
     id = 1;
   ```

#### Menghapus Layanan

1. **Hapus Data Layanan dari Database**:
   - Hapus data dari tabel `services` untuk layanan yang ingin dihapus

   **Contoh Query SQL**:
   ```sql
   DELETE FROM services WHERE id = 1;
   ```

2. **Hapus Gambar Terkait** (opsional):
   - Hapus file gambar dari folder `/public/images/services/` jika sudah tidak digunakan

### Mengubah Produk Furnitur

Produk furnitur ditampilkan di halaman detail layanan untuk layanan "Furniture". Berikut cara mengubahnya:

1. **Persiapkan Gambar**:
   - Siapkan gambar produk furnitur
   - Upload ke folder `/public/images/products/`

2. **Edit Array Produk di Kode**:
   - Buka file `client/src/pages/service-detail.tsx`
   - Cari array `furnitureProducts`
   - Edit, tambah, atau hapus objek produk sesuai kebutuhan

   **Contoh Format**:
   ```javascript
   const furnitureProducts = [
     {
       id: 1,
       name: "Sofa Minimalis 3-Seater",
       description: "Sofa nyaman dengan desain minimalis yang cocok untuk ruang tamu modern.",
       price: "Rp 8.500.000",
       imageUrl: "/images/products/sofa-minimalis.jpg",
       category: "Sofa"
     },
     // Produk lainnya...
   ];
   ```

### Mengubah Statistik

Statistik perusahaan ditampilkan di beberapa bagian website. Berikut cara mengubahnya:

1. **Update Data Statistik di Database**:
   - Update informasi di tabel `stats`

   **Contoh Query SQL**:
   ```sql
   UPDATE stats 
   SET 
     completed_projects = 250, 
     turnkey_projects = 57, 
     years_experience = 15, 
     design_awards = 28
   WHERE 
     id = 1;
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

## Catatan Penting

1. **Backup Database Secara Berkala**:
   ```
   pg_dump -U username -h localhost diegma_db > diegma_backup_$(date +%Y%m%d).sql
   ```

2. **Gunakan Optimasi Gambar**:
   - Kompres gambar sebelum upload menggunakan tools seperti [TinyPNG](https://tinypng.com/)
   - Pastikan ukuran file tidak terlalu besar untuk menjaga performa website

3. **Versionisasi Konten**:
   - Gunakan Git untuk melacak perubahan konten
   - Commit dan push setelah setiap perubahan signifikan

4. **Testing Sebelum Deploy**:
   - Selalu uji perubahan di lingkungan lokal sebelum deploy ke production
   - Periksa tampilan di berbagai perangkat dan browser