# Panduan Deployment Website DIEGMA di Shared Hosting

## Pendahuluan

Website DIEGMA menggunakan teknologi Node.js dan React, yang tidak secara langsung didukung oleh hosting tradisional (shared hosting). Namun, dengan beberapa langkah tambahan, kita dapat men-deploy website ini ke hosting tradisional dengan melakukan "static export".

## Persiapan Deployment

### 1. Build Aplikasi untuk Static Hosting

1. Pada komputer lokal, jalankan perintah berikut untuk membangun versi statis website:
   ```
   npm run build
   ```

2. Setelah proses build selesai, folder `dist` akan berisi file-file statis website yang siap di-deploy.

3. Jika folder `dist` tidak terbuat, mungkin perlu memeriksa konfigurasi Vite untuk memastikan output folder adalah `dist`.

### 2. Konfigurasi untuk Routing pada Static Hosting

Untuk menangani routing pada hosting statis, kita perlu membuat file `.htaccess` (untuk server Apache) atau konfigurasi untuk Nginx.

1. Buat file `.htaccess` di dalam folder `dist`:

```
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## Langkah-langkah Upload ke Shared Hosting

### 1. Upload File ke Hosting

1. Sambungkan ke hosting menggunakan FTP client (seperti FileZilla, WinSCP)
2. Upload semua file dari folder `dist` ke folder public_html atau www di hosting Anda
3. Pastikan file `.htaccess` juga terupload (jika menggunakan Apache)

### 2. Konfigurasi Domain

1. Arahkan domain ke folder yang berisi file-file website
2. Pastikan pengaturan DNS sudah benar mengarah ke server hosting

## Solusi untuk Masalah Umum

### 1. Masalah dengan Routing (Halaman 404 saat mengakses URL langsung)

Jika saat mengakses URL seperti `/layanan` atau `/proyek` langsung muncul error 404, periksa:

1. **File .htaccess tidak terupload atau tidak berfungsi**
   - Pastikan file `.htaccess` terupload dengan benar
   - Pastikan `mod_rewrite` aktif di server Apache (hubungi provider hosting jika perlu)

2. **Jika menggunakan Nginx**
   - Minta provider hosting untuk menambahkan konfigurasi berikut:
     ```
     location / {
       try_files $uri $uri/ /index.html;
     }
     ```

### 2. Masalah dengan API

Karena website DIEGMA sudah dimodifikasi untuk menggunakan data statis, API tidak perlu dijalankan di server. Semua data sudah termasuk dalam aplikasi frontend.

Jika ingin menambahkan fungsionalitas backend di kemudian hari:

1. Pertimbangkan untuk menggunakan serverless functions (seperti AWS Lambda atau Netlify Functions)
2. Atau gunakan layanan backend terpisah (seperti Firebase, Supabase)

## Alternatif Deployment yang Lebih Mudah

Jika menemui kesulitan dengan shared hosting tradisional, pertimbangkan untuk menggunakan platform yang dirancang untuk aplikasi modern seperti:

1. **Vercel**: Platform yang optimal untuk aplikasi React, dengan dukungan routing bawaan (lihat PANDUAN-DEPLOYMENT-VERCEL.md)
2. **Netlify**: Mirip dengan Vercel, mendukung React dengan baik
3. **GitHub Pages**: Gratis untuk repositori publik, bisa dikonfigurasi untuk SPA dengan file 404.html

## Pengujian Deployment

Setelah di-deploy, uji akses ke halaman-halaman berikut:

1. Homepage: `https://[domain]/`
2. Halaman Layanan: `https://[domain]/layanan`
3. Halaman Proyek: `https://[domain]/proyek`
4. Detail Layanan: `https://[domain]/layanan/desain-interior-eksterior`
5. Detail Proyek: `https://[domain]/proyek/residence-modern-jakarta`

## Catatan Penting untuk Hosting Tradisional

1. **Performance**: Website modern seperti DIEGMA akan berjalan optimal di hosting yang mendukung HTTP/2 dan memiliki SSL
2. **Caching**: Aktifkan caching untuk file statis (JS, CSS, images) untuk meningkatkan performa
3. **Kompresi**: Aktifkan GZIP atau Brotli untuk kompresi file
4. **SSL**: Pastikan website diakses melalui HTTPS untuk keamanan dan performa optimal

---

Jika memerlukan bantuan lebih lanjut, silakan hubungi tim pengembang DIEGMA.

© 2025 DIEGMA Interior Design Studio