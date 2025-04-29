/**
 * This script clears all data from the Supabase tables before syncing
 */
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Supabase client setup
const supabaseUrl = process.env.SUPABASE_URL || 'https://msaiogbfcgtbjwzkufaa.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || '';

if (!supabaseKey) {
  console.error('Error: SUPABASE_KEY environment variable is required');
  console.error('Create a .env file with:');
  console.error('SUPABASE_URL=https://msaiogbfcgtbjwzkufaa.supabase.co');
  console.error('SUPABASE_KEY=your_anon_key');
  process.exit(1);
}

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// Tables to clear in reverse order to respect foreign key constraints
const tables = [
  'project_sections',
  'project_gallery',
  'project_team_members',
  'project_features',
  'project_technologies',
  'projects'
];

/**
 * Clear all data from a Supabase table
 */
async function clearTable(tableName) {
  try {
    console.log(`🧹 Clearing ${tableName}...`);
    const { data, error } = await supabase
      .from(tableName)
      .delete()
      .not('id', 'is', null); // Delete all rows
    
    if (error) throw error;
    
    console.log(`✅ Cleared ${tableName}`);
  } catch (error) {
    console.error(`❌ Error clearing ${tableName}:`, error.message);
  }
}

/**
 * Clear all tables
 */
async function clearAll() {
  console.log('🚀 Starting to clear all Supabase tables...');
  
  for (const table of tables) {
    await clearTable(table);
  }
  
  console.log('\n✅ All tables cleared!');
}

// Run the clear
clearAll()
  .catch(err => {
    console.error('Clear failed:', err);
    process.exit(1);
  }); 