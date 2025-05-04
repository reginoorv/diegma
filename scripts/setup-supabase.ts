import { supabase } from '../shared/supabase';

// Fungsi utilitas untuk mengeksekusi SQL di Supabase
async function executeSQL(sqlQuery: string, params?: any[]) {
  try {
    const { data, error } = await supabase.rpc('exec_sql', { query: sqlQuery, params: params || [] });
    
    if (error) {
      console.error('Error executing SQL:', error);
      return { success: false, error };
    }
    
    return { success: true, data };
  } catch (error) {
    console.error('Unexpected error executing SQL:', error);
    return { success: false, error };
  }
}

const dbSetup = async () => {
  try {
    console.log('🚀 Memulai setup database Supabase...');

    // Buat tabel project_categories
    console.log('📊 Membuat tabel project_categories...');
    const createProjectCategoriesResult = await executeSQL(`
      CREATE TABLE IF NOT EXISTS project_categories (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    if (!createProjectCategoriesResult.success) {
      throw new Error(`Gagal membuat tabel project_categories: ${createProjectCategoriesResult.error}`);
    }

    // Buat tabel projects
    console.log('📊 Membuat tabel projects...');
    const createProjectsResult = await executeSQL(`
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
    `);
    
    if (!createProjectsResult.success) {
      throw new Error(`Gagal membuat tabel projects: ${createProjectsResult.error}`);
    }

    // Buat tabel services
    console.log('📊 Membuat tabel services...');
    const createServicesResult = await executeSQL(`
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
    `);
    
    if (!createServicesResult.success) {
      throw new Error(`Gagal membuat tabel services: ${createServicesResult.error}`);
    }

    // Buat tabel contacts
    console.log('📊 Membuat tabel contacts...');
    const createContactsResult = await executeSQL(`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        message TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    if (!createContactsResult.success) {
      throw new Error(`Gagal membuat tabel contacts: ${createContactsResult.error}`);
    }

    // Buat tabel stats
    console.log('📊 Membuat tabel stats...');
    const createStatsResult = await executeSQL(`
      CREATE TABLE IF NOT EXISTS stats (
        id SERIAL PRIMARY KEY,
        completed_projects INTEGER NOT NULL,
        turnkey_projects INTEGER NOT NULL,
        years_experience INTEGER NOT NULL,
        residential_designs INTEGER NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    if (!createStatsResult.success) {
      throw new Error(`Gagal membuat tabel stats: ${createStatsResult.error}`);
    }

    // Seed Data untuk Project Categories
    console.log('🌱 Menyiapkan data awal untuk project_categories...');
    const seedCategoriesResult = await executeSQL(`
      INSERT INTO project_categories (name, slug)
      VALUES 
        ('Residential', 'residential'),
        ('Commercial', 'commercial'),
        ('Furniture', 'furniture')
      ON CONFLICT (slug) DO NOTHING;
    `);
    
    if (!seedCategoriesResult.success) {
      throw new Error(`Gagal menyiapkan data project_categories: ${seedCategoriesResult.error}`);
    }

    // Seed Data untuk Services
    console.log('🌱 Menyiapkan data awal untuk services...');
    const seedServicesResult = await executeSQL(`
      INSERT INTO services (title, slug, description, short_description, icon, image_url)
      VALUES
        ('Desain Interior dan Eksterior', 'desain-interior-eksterior', 'Layanan desain interior dan eksterior kami mencakup konsultasi menyeluruh, perencanaan ruang, dan implementasi desain yang memadukan estetika dan fungsionalitas. Tim desainer berpengalaman kami akan bekerja sama dengan Anda untuk menciptakan ruang yang mencerminkan gaya dan kebutuhan unik Anda.', 'Transformasi ruang Anda menjadi karya seni yang fungsional dan nyaman ditinggali', 'fas fa-drafting-compass', '/images/services/desain-interior-eksterior.jpg'),
        ('Konstruksi', 'konstruksi', 'Layanan konstruksi kami menawarkan solusi end-to-end untuk proyek pembangunan dan renovasi. Dengan tim ahli bangunan dan pengalaman bertahun-tahun, kami menangani semua aspek konstruksi dari awal hingga akhir, memastikan proyek selesai tepat waktu dan sesuai anggaran.', 'Wujudkan desain impian Anda dengan layanan konstruksi berkualitas tinggi', 'fas fa-hammer', '/images/services/konstruksi.jpg'),
        ('Furniture', 'furniture', 'Koleksi furnitur kami mencakup berbagai gaya, dari klasik hingga kontemporer, dengan fokus pada kualitas dan desain yang timeless. Setiap produk dipilih dengan cermat untuk memastikan kenyamanan, daya tahan, dan nilai estetika yang tinggi bagi ruang Anda.', 'Lengkapi ruang Anda dengan furnitur berkualitas tinggi dan desain eksklusif', 'fas fa-couch', '/images/services/furniture.jpg')
      ON CONFLICT (slug) DO NOTHING;
    `);
    
    if (!seedServicesResult.success) {
      throw new Error(`Gagal menyiapkan data services: ${seedServicesResult.error}`);
    }

    // Seed Data untuk Stats
    console.log('🌱 Menyiapkan data awal untuk stats...');
    const seedStatsResult = await executeSQL(`
      INSERT INTO stats (completed_projects, turnkey_projects, years_experience, residential_designs)
      VALUES (250, 57, 15, 180)
      ON CONFLICT DO NOTHING;
    `);
    
    if (!seedStatsResult.success) {
      throw new Error(`Gagal menyiapkan data stats: ${seedStatsResult.error}`);
    }

    // Seed Data untuk Projects
    console.log('🌱 Menyiapkan data awal untuk projects...');
    // Dapatkan IDs dari kategori terlebih dahulu
    const { data: categories, error: categoriesError } = await supabase
      .from('project_categories')
      .select('id, slug');
    
    if (categoriesError) {
      throw new Error(`Gagal mendapatkan data kategori: ${categoriesError.message}`);
    }
    
    if (!categories || categories.length === 0) {
      throw new Error('Tidak ada kategori yang ditemukan');
    }
    
    const categoryMap = categories.reduce((acc, cat) => {
      acc[cat.slug] = cat.id;
      return acc;
    }, {} as Record<string, number>);
    
    const seedProjectsResult = await executeSQL(`
      INSERT INTO projects (title, slug, description, short_description, category_id, location, image_url, gallery_images, is_featured)
      VALUES
        ('Residence Modern Jakarta', 'residence-modern-jakarta', 'Proyek hunian modern di Jakarta dengan konsep open space yang memadukan elemen alam dan desain kontemporer. Menggunakan material berkualitas tinggi dan pencahayaan alami yang maksimal untuk menciptakan ruang yang nyaman dan elegan.', 'Hunian modern dengan sentuhan alam di jantung kota Jakarta', ${categoryMap['residential']}, 'Jakarta Selatan', '/images/projects/residence-modern-jakarta.jpg', '["images/projects/residence-modern-jakarta-1.jpg", "/images/projects/residence-modern-jakarta-2.jpg"]', 1),
        ('Office Space Minimalist', 'office-space-minimalist', 'Desain kantor minimalis yang mengutamakan produktivitas dan kesejahteraan karyawan. Layout yang efisien dengan area kolaborasi dan ruang privat yang seimbang, dilengkapi dengan furniture ergonomis dan pencahayaan yang optimal.', 'Ruang kerja modern yang meningkatkan produktivitas dan kenyamanan', ${categoryMap['commercial']}, 'Jakarta Pusat', '/images/projects/office-space-minimalist.jpg', '["images/projects/office-space-minimalist-1.jpg", "/images/projects/office-space-minimalist-2.jpg"]', 1),
        ('Custom Furniture Collection', 'custom-furniture-collection', 'Koleksi furnitur custom yang dirancang khusus untuk melengkapi interior hunian mewah. Setiap piece dibuat dengan keahlian tinggi dan material premium, menciptakan harmoni antara fungsi dan estetika.', 'Furnitur eksklusif yang dirancang khusus untuk kebutuhan unik Anda', ${categoryMap['furniture']}, 'Bandung', '/images/projects/custom-furniture-collection.jpg', '["images/projects/custom-furniture-collection-1.jpg", "/images/projects/custom-furniture-collection-2.jpg"]', 1)
      ON CONFLICT (slug) DO NOTHING;
    `);
    
    if (!seedProjectsResult.success) {
      throw new Error(`Gagal menyiapkan data projects: ${seedProjectsResult.error}`);
    }

    console.log('✅ Setup database Supabase berhasil!');
    
    // Verifikasi data
    const verifyCategories = await supabase.from('project_categories').select('*');
    console.log(`📊 Jumlah kategori: ${verifyCategories.data?.length || 0}`);
    
    const verifyProjects = await supabase.from('projects').select('*');
    console.log(`📊 Jumlah proyek: ${verifyProjects.data?.length || 0}`);
    
    const verifyServices = await supabase.from('services').select('*');
    console.log(`📊 Jumlah layanan: ${verifyServices.data?.length || 0}`);
    
    const verifyStats = await supabase.from('stats').select('*');
    console.log(`📊 Jumlah statistik: ${verifyStats.data?.length || 0}`);
    
  } catch (error) {
    console.error('❌ Error saat setup database Supabase:', error);
  } finally {
    process.exit();
  }
};

dbSetup();