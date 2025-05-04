# Panduan Konfigurasi Database dari Neon ke Supabase

## Daftar Isi
1. [Pendahuluan](#pendahuluan)
2. [Perubahan Kode untuk Supabase](#perubahan-kode-untuk-supabase)
3. [Migrasi Data dan Schema](#migrasi-data-dan-schema)
4. [Pengujian Koneksi](#pengujian-koneksi)

## Pendahuluan

Website DIEGMA saat ini menggunakan Neon Database sebagai penyedia PostgreSQL. Dokumen ini akan memandu Anda untuk mengubah konfigurasi database agar dapat menggunakan Supabase sebagai penyedia PostgreSQL.

Supabase adalah platform open-source yang menyediakan database PostgreSQL terkelola dengan fitur tambahan seperti API otomatis, autentikasi, dan penyimpanan file.

## Perubahan Kode untuk Supabase

### 1. Update package.json

Pertama, pastikan Anda memiliki package PostgreSQL standar:

```bash
npm install pg @types/pg
```

### 2. Modifikasi File Koneksi Database

File `db/index.ts` perlu dimodifikasi agar kompatibel dengan Supabase:

```typescript
// db/index.ts
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/pg-core';
import * as schema from "@shared/schema";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Konfigurasi untuk Supabase
export const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // Diperlukan untuk Supabase
});

export const db = drizzle({ client: pool, schema });
```

### 3. Update Konfigurasi di drizzle.config.ts

Periksa dan update file `drizzle.config.ts` jika diperlukan:

```typescript
// drizzle.config.ts
import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config();

export default {
  schema: "./shared/schema.ts",
  out: "./drizzle",
  driver: 'pg', // Pastikan menggunakan driver pg untuk PostgreSQL
  dbCredentials: {
    connectionString: process.env.DATABASE_URL || "",
    ssl: true // Tambahkan ini untuk Supabase
  }
} satisfies Config;
```

## Migrasi Data dan Schema

Untuk memigrasikan schema dan data dari Neon ke Supabase, ikuti langkah-langkah berikut:

### 1. Dump Schema dan Data dari Neon

```bash
# Export schema dan data
pg_dump -h [NEON_HOST] -U [NEON_USER] -d [NEON_DB] -f diegma_full_backup.sql

# Atau hanya export data (tanpa schema)
pg_dump -h [NEON_HOST] -U [NEON_USER] -d [NEON_DB] --data-only -f diegma_data_only.sql
```

### 2. Siapkan Database Supabase

1. Login ke dashboard Supabase
2. Buat proyek baru
3. Catat connection string database

### 3. Import Schema dan Data ke Supabase

Opsi 1: Melalui SQL Editor
- Di dashboard Supabase, buka SQL Editor
- Copy konten file dump SQL Anda dan paste ke SQL Editor
- Jalankan query

Opsi 2: Melalui Command Line
```bash
psql -h [SUPABASE_HOST] -U [SUPABASE_USER] -d [SUPABASE_DB] -f diegma_full_backup.sql
```

### 4. Atau Gunakan Drizzle untuk Migrasi

Jika Anda menggunakan Drizzle ORM untuk migrasi:

1. Perbarui DATABASE_URL ke Supabase
2. Jalankan perintah migrasi:
```bash
npm run db:push
```

## Pengujian Koneksi

Setelah melakukan perubahan, uji koneksi ke Supabase:

### 1. Buat Endpoint Test

```typescript
// Di server/routes.ts
app.get('/api/test-supabase', async (_req, res) => {
  try {
    // Query sederhana untuk memastikan koneksi bekerja
    const result = await db.query.services.findMany({ limit: 1 });
    return res.json({
      success: true,
      message: 'Koneksi ke Supabase berhasil!',
      data: result
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Koneksi ke Supabase gagal!', 
      error: error instanceof Error ? error.message : String(error)
    });
  }
});
```

### 2. Uji Endpoint

Buka browser dan akses:
```
http://localhost:5000/api/test-supabase
```

Jika koneksi berhasil, Anda akan melihat respons JSON dengan status success.

## Template Connection String Supabase

Format connection string Supabase:

```
postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-ID].supabase.co:5432/postgres
```

Contoh (dengan password palsu):
```
postgresql://postgres:ExamplePassword123@db.abcdefghijklm.supabase.co:5432/postgres
```

## Menggunakan Variabel Lingkungan

Untuk deployment, simpan connection string Supabase di variabel lingkungan:

```
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-ID].supabase.co:5432/postgres
```

## Troubleshooting

### 1. Masalah SSL

Jika mengalami error SSL saat menghubungkan ke Supabase:

```
Error: self signed certificate
```

Pastikan Anda menambahkan konfigurasi SSL di Pool:

```typescript
export const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});
```

### 2. Masalah Koneksi

Jika tidak bisa terhubung ke Supabase:

1. Periksa connection string
2. Pastikan IP tidak diblokir (Supabase > Settings > Database > IP Restrictions)
3. Coba koneksi dari lingkungan lain (misalnya menggunakan psql command line)

```bash
psql postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-ID].supabase.co:5432/postgres
```

## Kelebihan Menggunakan Supabase

1. **Dashboard Manajemen Data**: Supabase menyediakan interface visual untuk mengelola data
2. **Autentikasi Bawaan**: Fitur autentikasi yang mudah diintegrasikan (jika diperlukan)
3. **Storage File**: Penyimpanan file terintegrasi (untuk gambar, dll)
4. **Edge Functions**: Fungsi serverless untuk logika backend tambahan
5. **Realtime Subscriptions**: Fitur realtime untuk update data langsung