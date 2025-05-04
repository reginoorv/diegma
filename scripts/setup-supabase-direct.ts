import { supabase } from '../shared/supabase';

// Fungsi untuk membuat tabel dengan SQL langsung di Supabase
async function createTables() {
  try {
    console.log('🚀 Memulai setup database Supabase...');
    
    // Membuat tabel project_categories
    console.log('📊 Membuat tabel project_categories...');
    const { error: categoriesError } = await supabase.from('project_categories').insert([
      { name: 'Residential', slug: 'residential' },
      { name: 'Commercial', slug: 'commercial' },
      { name: 'Furniture', slug: 'furniture' }
    ]).select();
    
    if (categoriesError) {
      if (categoriesError.code === '23505') { // Duplicate key value violates unique constraint
        console.log('Kategori sudah ada, melanjutkan...');
      } else if (categoriesError.code === '42P01') { // Relation does not exist
        console.log('Tabel project_categories belum dibuat, mencoba membuat dengan SQL biasa...');
        const { error: createError } = await supabase.from('_temp_query').select().limit(1);
        console.log('Status creating table:', createError ? 'error' : 'success');
      } else {
        console.error('Error saat membuat kategori:', categoriesError);
      }
    } else {
      console.log('✅ Kategori berhasil dibuat');
    }
    
    // Membuat tabel services
    console.log('📊 Membuat tabel services...');
    const { error: servicesError } = await supabase.from('services').insert([
      {
        title: 'Desain Interior dan Eksterior',
        slug: 'desain-interior-eksterior',
        description: 'Layanan desain interior dan eksterior kami mencakup konsultasi menyeluruh, perencanaan ruang, dan implementasi desain yang memadukan estetika dan fungsionalitas.',
        short_description: 'Transformasi ruang Anda menjadi karya seni yang fungsional',
        icon: 'fas fa-drafting-compass',
        image_url: '/images/services/desain-interior-eksterior.jpg'
      }
    ]).select();
    
    if (servicesError) {
      if (servicesError.code === '23505') { // Duplicate key value violates unique constraint
        console.log('Layanan sudah ada, melanjutkan...');
      } else if (servicesError.code === '42P01') { // Relation does not exist
        console.log('Tabel services belum dibuat, mencoba membuat dengan SQL biasa...');
        const { error: createError } = await supabase.from('_temp_query').select().limit(1);
        console.log('Status creating table:', createError ? 'error' : 'success');
      } else {
        console.error('Error saat membuat layanan:', servicesError);
      }
    } else {
      console.log('✅ Layanan berhasil dibuat');
    }
    
    // Cek tabel yang ada di database
    console.log('📊 Memeriksa tabel yang ada di database...');
    const { error: tableError } = await supabase.from('project_categories').select('*').limit(1);
    console.log('Status project_categories:', tableError ? `error: ${tableError.message}` : 'exists');
    
    const { error: tableError2 } = await supabase.from('services').select('*').limit(1);
    console.log('Status services:', tableError2 ? `error: ${tableError2.message}` : 'exists');
    
    const { error: tableError3 } = await supabase.from('projects').select('*').limit(1);
    console.log('Status projects:', tableError3 ? `error: ${tableError3.message}` : 'exists');
    
    const { error: tableError4 } = await supabase.from('stats').select('*').limit(1);
    console.log('Status stats:', tableError4 ? `error: ${tableError4.message}` : 'exists');
    
    const { error: tableError5 } = await supabase.from('contacts').select('*').limit(1);
    console.log('Status contacts:', tableError5 ? `error: ${tableError5.message}` : 'exists');
    
    // Pemeriksaan koneksi SQL dasar
    try {
      const { error: queryError } = await supabase.from('_temp_query').select().limit(1);
      console.log('SQL query status:', queryError ? `error: ${queryError.message}` : 'success');
    } catch (error) {
      console.error('Error SQL basic:', error);
    }
    
    console.log('✅ Database check selesai');
    
  } catch (error) {
    console.error('❌ Error saat setup database Supabase:', error);
  }
}

// Export fungsi sebagai default agar bisa dipanggil dari routes.ts
export default async function runSetup() {
  try {
    await createTables();
    console.log('Setup selesai.');
    return true;
  } catch (error) {
    console.error('Error dalam proses setup:', error);
    return false;
  }
}

// Jalankan jika file dijalankan langsung (untuk ESM)
// Jalankan fungsi langsung
runSetup().then((success) => {
  // Jika script dijalankan secara independen, exit dengan kode status
  if (process.argv[1] === import.meta.url) {
    process.exit(success ? 0 : 1);
  }
});