/**
 * Migration script to add 'featured' and 'featured_order' columns to the projects table
 */
const path = require('path');
const Database = require('better-sqlite3');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Connect to local SQLite database
const dbPath = path.join(__dirname, '..', 'local.db');
const db = new Database(dbPath, { readonly: false });
console.log(`Connected to local database at: ${dbPath}`);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Supabase client setup for remote updates
const supabaseUrl = process.env.SUPABASE_URL || 'https://msaiogbfcgtbjwzkufaa.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

async function runMigration() {
  console.log('Starting migration to add featured columns...');
  
  try {
    // Alter the local SQLite table
    db.exec(`
      -- Add featured column with default false
      ALTER TABLE projects ADD COLUMN featured BOOLEAN DEFAULT 0;
      
      -- Add featured_order column with default NULL
      ALTER TABLE projects ADD COLUMN featured_order INTEGER DEFAULT NULL;
      
      -- Update existing featured projects
      UPDATE projects SET featured = 1 WHERE category = 'Featured';
      
      -- Set initial order based on created_at timestamp
      UPDATE projects 
      SET featured_order = (
        SELECT COUNT(*) 
        FROM projects as p 
        WHERE p.created_at <= projects.created_at AND p.category = 'Featured'
      ) 
      WHERE category = 'Featured';
    `);
    
    console.log('✅ Local database migration complete');
    
    // Check if Supabase credentials are available
    if (supabaseKey) {
      console.log('Starting Supabase migration...');
      
      // First, add the columns to the remote table
      await supabase.rpc('pgsu_exec', { 
        query: `
          -- Add featured column
          ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false;
          
          -- Add featured_order column
          ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS featured_order INTEGER DEFAULT NULL;
        `
      });
      
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
    } else {
      console.log('⚠️ Skipping Supabase migration: No API key provided');
    }
    
    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Error during migration:', error);
  } finally {
    // Close the database connection
    db.close();
  }
}

// Run the migration
runMigration(); 