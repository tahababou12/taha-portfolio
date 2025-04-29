/**
 * Migration script to add 'featured' and 'featured_order' columns to the Supabase projects table only
 */
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Supabase client setup for remote updates
const supabaseUrl = process.env.SUPABASE_URL || 'https://msaiogbfcgtbjwzkufaa.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || '';

if (!supabaseKey) {
  console.error('Error: SUPABASE_KEY environment variable is required');
  console.error('Create a .env file with:');
  console.error('SUPABASE_URL=https://msaiogbfcgtbjwzkufaa.supabase.co');
  console.error('SUPABASE_KEY=your_anon_key');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function runSupabaseMigration() {
  console.log('Starting Supabase migration to add featured columns...');
  
  try {
    // Add the columns to the remote table
    console.log('Adding featured and featured_order columns...');
    await supabase.rpc('pgsu_exec', { 
      query: `
        -- Add featured column
        ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false;
        
        -- Add featured_order column
        ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS featured_order INTEGER DEFAULT NULL;
      `
    });
    
    console.log('Updating existing featured projects...');
    // Update existing featured projects in Supabase
    await supabase.rpc('pgsu_exec', { 
      query: `
        -- Update existing featured projects
        UPDATE public.projects SET featured = true WHERE category = 'Featured';
        
        -- Set initial order based on created_at timestamp
        UPDATE public.projects 
        SET featured_order = (
          SELECT COUNT(*) 
          FROM public.projects as p 
          WHERE p.created_at <= public.projects.created_at AND p.category = 'Featured'
        ) 
        WHERE category = 'Featured';
      `
    });
    
    console.log('✅ Supabase database migration complete');
    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Error during Supabase migration:', error);
    process.exit(1);
  }
}

// Run the migration
runSupabaseMigration(); 