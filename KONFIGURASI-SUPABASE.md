# Konfigurasi Supabase untuk Website DIEGMA

Dokumen ini berisi panduan teknis yang lebih mendalam tentang konfigurasi Supabase sebagai alternatif database untuk website DIEGMA. Panduan ini ditujukan untuk developer yang akan melakukan setup, migrasi, atau maintenance database.

## Keuntungan Menggunakan Supabase

1. **Dashboard Visual**: Interface yang user-friendly untuk mengelola database
2. **Auth Built-in**: Fitur autentikasi yang lengkap jika diperlukan di masa depan
3. **Storage**: Penyimpanan file terintegrasi untuk gambar dan aset
4. **Edge Functions**: Serverless functions untuk logika backend tambahan
5. **Realtime**: Fitur real-time untuk data yang selalu up-to-date

## Struktur Database

Website DIEGMA menggunakan skema database berikut di Supabase:

### 1. project_categories
- `id`: SERIAL PRIMARY KEY
- `name`: TEXT NOT NULL
- `slug`: TEXT NOT NULL UNIQUE
- `created_at`: TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP

### 2. projects
- `id`: SERIAL PRIMARY KEY
- `title`: TEXT NOT NULL
- `slug`: TEXT NOT NULL UNIQUE
- `description`: TEXT NOT NULL
- `short_description`: TEXT
- `category_id`: INTEGER REFERENCES project_categories(id)
- `location`: TEXT
- `image_url`: TEXT NOT NULL
- `gallery_images`: JSONB (array of image paths)
- `is_featured`: INTEGER DEFAULT 0
- `created_at`: TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP

### 3. services
- `id`: SERIAL PRIMARY KEY
- `title`: TEXT NOT NULL
- `slug`: TEXT NOT NULL UNIQUE
- `description`: TEXT NOT NULL
- `short_description`: TEXT
- `icon`: TEXT
- `image_url`: TEXT
- `created_at`: TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP

### 4. contacts
- `id`: SERIAL PRIMARY KEY
- `name`: TEXT NOT NULL
- `email`: TEXT NOT NULL
- `phone`: TEXT
- `message`: TEXT NOT NULL
- `created_at`: TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP

### 5. stats
- `id`: SERIAL PRIMARY KEY
- `completed_projects`: INTEGER NOT NULL
- `turnkey_projects`: INTEGER NOT NULL
- `years_experience`: INTEGER NOT NULL
- `residential_designs`: INTEGER NOT NULL
- `updated_at`: TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP

## Konfigurasi Connection Pool

Untuk mengoptimalkan performa database, connection pool dikonfigurasi sebagai berikut:

```javascript
// db/index.ts
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "@shared/schema";

// Konfigurasi Pool untuk Supabase
export const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  // Konfigurasi SSL - wajib untuk Supabase di production
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  // Konfigurasi connection pool optimal
  max: 20, // maksimum 20 koneksi
  idleTimeoutMillis: 30000, // koneksi akan ditutup setelah idle 30 detik
  connectionTimeoutMillis: 2000 // timeout koneksi setelah 2 detik
});

export const db = drizzle(pool, { schema });
```

## Migrasi Data dari Neon ke Supabase

Untuk melakukan migrasi data dari Neon Database ke Supabase, ikuti langkah-langkah berikut:

1. **Export data dari Neon Database**:
   ```bash
   # Gunakan pg_dump untuk mengekspor data dari Neon
   pg_dump -h [NEON_HOST] -U [NEON_USER] -d [NEON_DB] -f neon_backup.sql
   ```

2. **Import data ke Supabase**:
   - Buka SQL Editor di dashboard Supabase
   - Klik "New Query"
   - Copy isi file `neon_backup.sql` dan paste ke editor
   - Klik "Run" untuk menjalankan query

3. **Alternatif: Migrasi Manual**:
   Jika metode di atas mengalami masalah, gunakan migrasi manual dengan script berikut:

   ```javascript
   // scripts/migrate-to-supabase.js
   require('dotenv').config();
   const { Pool } = require('pg');
   
   // Koneksi ke database sumber (Neon)
   const sourcePool = new Pool({
     connectionString: process.env.NEON_DATABASE_URL
   });
   
   // Koneksi ke database tujuan (Supabase)
   const targetPool = new Pool({
     connectionString: process.env.SUPABASE_DATABASE_URL,
     ssl: { rejectUnauthorized: false }
   });
   
   async function migrateTable(tableName, sourceClient, targetClient) {
     console.log(`Migrating table: ${tableName}`);
     
     // Get data from source
     const { rows } = await sourceClient.query(`SELECT * FROM ${tableName}`);
     console.log(`Found ${rows.length} rows in ${tableName}`);
     
     // Skip if no data
     if (rows.length === 0) return;
     
     // Generate insert statements
     for (const row of rows) {
       const columns = Object.keys(row).join(', ');
       const values = Object.values(row).map(val => 
         typeof val === 'string' ? `'${val.replace(/'/g, "''")}'` : 
         val === null ? 'NULL' : 
         Array.isArray(val) ? `'${JSON.stringify(val)}'` : val
       ).join(', ');
       
       try {
         await targetClient.query(`
           INSERT INTO ${tableName} (${columns}) 
           VALUES (${values})
           ON CONFLICT DO NOTHING
         `);
       } catch (error) {
         console.error(`Error inserting into ${tableName}:`, error.message);
       }
     }
     
     console.log(`Migration completed for ${tableName}`);
   }
   
   async function migrate() {
     const sourceClient = await sourcePool.connect();
     const targetClient = await targetPool.connect();
     
     try {
       // Migrate tables in order (consider foreign key dependencies)
       await migrateTable('project_categories', sourceClient, targetClient);
       await migrateTable('projects', sourceClient, targetClient);
       await migrateTable('services', sourceClient, targetClient);
       await migrateTable('contacts', sourceClient, targetClient);
       await migrateTable('stats', sourceClient, targetClient);
       
       console.log('Migration completed successfully!');
     } catch (error) {
       console.error('Migration failed:', error);
     } finally {
       sourceClient.release();
       targetClient.release();
       sourcePool.end();
       targetPool.end();
     }
   }
   
   migrate();
   ```

## Row Level Security (RLS) untuk Keamanan

Supabase menyediakan Row Level Security untuk mengontrol akses ke data. Berikut adalah contoh policy untuk tabel `contacts`:

```sql
-- Aktifkan RLS pada tabel contacts
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Hanya admin yang bisa melihat data kontak
CREATE POLICY "Admin can see all contacts" 
ON contacts FOR SELECT 
TO authenticated
USING (auth.role() = 'admin');

-- Siapapun bisa mengirim pesan kontak baru
CREATE POLICY "Anyone can insert contacts" 
ON contacts FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- Hanya admin yang bisa menghapus kontak
CREATE POLICY "Only admin can delete contacts" 
ON contacts FOR DELETE 
TO authenticated
USING (auth.role() = 'admin');
```

## Storage Bucket untuk Gambar

Jika ingin memigrasikan penyimpanan gambar ke Supabase Storage:

1. **Buat bucket baru**:
   - Di dashboard Supabase, buka menu "Storage"
   - Klik "New Bucket"
   - Nama: `diegma-images`
   - Pilih "Private" atau "Public" sesuai kebutuhan
   - Klik "Create"

2. **Update path gambar di aplikasi**:
   - Ganti path gambar dari `/images/...` menjadi URL Supabase Storage:
   ```
   https://[PROJECT_ID].supabase.co/storage/v1/object/public/diegma-images/...
   ```

## Monitoring dan Maintenance

1. **Monitoring Database**:
   - Cek performance di Dashboard Supabase > Database > Monitoring
   - Set up alerts untuk usage limits

2. **Backup Reguler**:
   - Jalankan SQL berikut di SQL Editor secara berkala:
   ```sql
   COPY (SELECT * FROM projects) TO '/tmp/projects_backup.csv' WITH CSV HEADER;
   COPY (SELECT * FROM services) TO '/tmp/services_backup.csv' WITH CSV HEADER;
   COPY (SELECT * FROM contacts) TO '/tmp/contacts_backup.csv' WITH CSV HEADER;
   COPY (SELECT * FROM project_categories) TO '/tmp/project_categories_backup.csv' WITH CSV HEADER;
   COPY (SELECT * FROM stats) TO '/tmp/stats_backup.csv' WITH CSV HEADER;
   ```

3. **Optimasi Query**:
   - Buat index untuk kolom yang sering digunakan dalam WHERE clause:
   ```sql
   CREATE INDEX idx_projects_slug ON projects(slug);
   CREATE INDEX idx_services_slug ON services(slug);
   ```

## Troubleshooting

### 1. Masalah Koneksi

Jika mengalami masalah koneksi ke Supabase:

- Pastikan URL koneksi benar dan lengkap
- Verifikasi password dalam URL koneksi
- Cek apakah SSL diaktifkan dengan benar
- Periksa firewall atau VPN yang mungkin memblokir koneksi

### 2. Error "Too many connections"

Jika muncul error "too many connections":

- Kurangi nilai `max` di konfigurasi Pool
- Pastikan koneksi ditutup setelah digunakan
- Tingkatkan tier database Supabase jika diperlukan

### 3. Performa Query Lambat

Untuk meningkatkan performa query:

- Analisis query dengan EXPLAIN ANALYZE
- Tambahkan index untuk kolom yang sering difilter
- Optimalkan JOIN dengan memastikan relasi yang benar

## Resources

- [Dokumentasi Supabase](https://supabase.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Drizzle ORM Documentation](https://orm.drizzle.team/docs/overview)
- [node-postgres Documentation](https://node-postgres.com/)