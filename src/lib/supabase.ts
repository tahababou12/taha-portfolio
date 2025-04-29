import { createClient } from '@supabase/supabase-js';
// @ts-expect-error - Module exists but TypeScript can't find it
import localDb from './local-db-browser';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const useLocalDb = import.meta.env.VITE_USE_LOCAL_DB === 'true';

if (!useLocalDb && (!supabaseUrl || !supabaseAnonKey)) {
  throw new Error('Missing Supabase environment variables');
}

// Use local DB adapter in development if configured
let dbClient;
if (useLocalDb) {
  try {
    dbClient = localDb;
    console.log('Using local SQLite database for development');
  } catch (error) {
    console.error('Failed to load local database:', error);
    throw new Error('Local database configuration error');
  }
} else {
  dbClient = createClient(supabaseUrl, supabaseAnonKey);
  console.log('Using Supabase database');
}

export const supabase = dbClient;
