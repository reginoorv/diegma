import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

// Cek keberadaan environment variables tanpa validasi ketat
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  console.error('Supabase environment variables tidak ditemukan');
  console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? 'Ada' : 'Tidak ada');
  console.log('SUPABASE_KEY:', process.env.SUPABASE_KEY ? 'Ada' : 'Tidak ada');
}

// URL Supabase dalam format: https://kkltnceprxqjopbapsng.supabase.co
// Hard coding URL untuk development
let supabaseUrl = 'https://kkltnceprxqjopbapsng.supabase.co';

// Hard-coding API key untuk development
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtrbHRuY2Vwcnhxam9wYmFwc25nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYzMjUwMzgsImV4cCI6MjA2MTkwMTAzOH0.T9av6HddcJTw9TZH4XNw2lkpxSCbrUFpNMg0gSqh9Dk';

// Buat client Supabase
export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey, // Gunakan hardcoded value untuk development
  {
    auth: {
      persistSession: false,
      autoRefreshToken: true,
    },
    db: {
      schema: 'public',
    }
  }
);

// Fungsi untuk memeriksa koneksi Supabase
export async function checkSupabaseConnection() {
  try {
    const { data, error } = await supabase.from('services').select('*').limit(1);
    
    if (error) {
      console.error('Supabase connection error:', error);
      return { success: false, error };
    }
    
    return { success: true, data };
  } catch (error) {
    console.error('Unexpected error connecting to Supabase:', error);
    return { success: false, error };
  }
}

// Fungsi utilitas untuk mengeksekusi SQL di Supabase
export async function executeSQL(sqlQuery: string, params?: any[]) {
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