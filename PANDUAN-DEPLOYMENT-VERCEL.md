# Panduan Deployment Website DIEGMA di Vercel

## Persiapan Deployment

Website DIEGMA sudah dioptimalkan untuk deployment langsung tanpa perlu konfigurasi database. Data disimpan secara statis di dalam aplikasi, sehingga tidak memerlukan koneksi ke PostgreSQL atau Supabase.

## Langkah-langkah Deployment di Vercel

1. **Buat Akun Vercel**
   - Kunjungi [vercel.com](https://vercel.com) dan buat akun jika belum memiliki
   - Login ke dashboard Vercel

2. **Import Repository**
   - Klik tombol "Add New..." dan pilih "Project"
   - Connect dengan Git provider (GitHub, GitLab, atau Bitbucket) tempat kode website disimpan
   - Pilih repository DIEGMA

3. **Konfigurasi Project**
   - Project Name: Isi nama yang diinginkan, misalnya "diegma-studio"
   - Framework Preset: Pilih "Other"
   - Root Directory: Biarkan kosong (default)
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Deploy**
   - Klik tombol "Deploy"
   - Tunggu proses deployment selesai
   - Jika berhasil, Vercel akan memberikan URL untuk mengakses website (contoh: diegma-studio.vercel.app)

## Solusi untuk Masalah Routing di Vercel

Website DIEGMA menggunakan client-side routing (dengan Wouter), sehingga ketika mengakses URL seperti `/layanan` atau `/proyek` secara langsung dapat menimbulkan masalah "404 Not Found". Untuk mengatasi ini, kita sudah menyediakan file `vercel.json` yang mengkonfigurasi Vercel untuk menangani routing dengan benar.

### Isi file `vercel.json`:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/node"
    }
  ],
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/$1"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

File ini memberi tahu Vercel untuk:
1. Mengarahkan semua request API ke endpoint API yang sesuai
2. Mengarahkan semua request lainnya ke `index.html` sehingga client-side router (Wouter) dapat menanganinya

### Jika Masih Mengalami Masalah

Jika setelah deployment, halaman `/layanan` dan `/proyek` masih tidak dapat diakses, pastikan:

1. **File vercel.json Sudah Ter-upload**
   - Pastikan file `vercel.json` sudah ter-commit dan ter-push ke repository
   - Atau tambahkan file secara manual di dashboard Vercel:
     - Masuk ke Project Settings
     - Pilih tab "Git"
     - Scroll ke bagian "Ignored Build Step"
     - Tambahkan file vercel.json dengan isi sesuai di atas

2. **Reset Cache**
   - Di dashboard Vercel, pilih project DIEGMA
   - Klik "Deployments"
   - Klik "..." pada deployment terbaru dan pilih "Redeploy"
   - Centang "Clear cache and deploy"

3. **Periksa Build Output**
   - Klik pada deployment untuk melihat build log
   - Pastikan tidak ada error selama proses build

## Pengujian Setelah Deployment

Setelah website berhasil di-deploy, uji akses ke halaman berikut melalui URL langsung (ketik langsung di browser):

1. Homepage: `https://[your-vercel-url]/`
2. Halaman Layanan: `https://[your-vercel-url]/layanan`
3. Halaman Proyek: `https://[your-vercel-url]/proyek`
4. Detail Layanan: `https://[your-vercel-url]/layanan/desain-interior-eksterior`
5. Detail Proyek: `https://[your-vercel-url]/proyek/residence-modern-jakarta`

Semua halaman di atas seharusnya dapat diakses dengan benar tanpa error 404.

## Menggunakan Custom Domain

Jika ingin menggunakan domain kustom (mis. diegma.com):

1. Di dashboard Vercel, pilih project DIEGMA
2. Klik tab "Domains"
3. Masukkan domain yang ingin digunakan
4. Ikuti panduan Vercel untuk mengatur DNS (biasanya dengan menambahkan CNAME record)

---

Jika memerlukan bantuan lebih lanjut, silakan hubungi tim pengembang DIEGMA.

© 2025 DIEGMA Interior Design Studio