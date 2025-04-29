/**
 * This script exports data from the local SQLite database and pushes it to Supabase.
 * It's intended for use after making local changes that need to be synchronized.
 */
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
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

// Initialize SQLite database
const dbPath = path.join(__dirname, '..', 'local.db');
if (!fs.existsSync(dbPath)) {
  console.error(`Local database not found at ${dbPath}`);
  console.error('Run the sync-from-supabase.js script first to create it');
  process.exit(1);
}
const db = new Database(dbPath);

// Optional project ID filter
const projectId = process.argv[2];
if (projectId) {
  console.log(`Syncing only data for project ID: ${projectId}`);
} else {
  console.log('Syncing all project data');
}

// Tables to sync in specific order
const tables = [
  'projects', 
  'project_technologies', 
  'project_features',
  'project_team_members',
  'project_gallery',
  'project_sections'
];

/**
 * Export data from local SQLite to a JSON object
 */
function exportFromLocal(tableName) {
  try {
    let query = `SELECT * FROM ${tableName}`;
    const params = [];
    
    // If filtering by project ID
    if (projectId) {
      if (tableName === 'projects') {
        query += ` WHERE id = ?`;
        params.push(projectId);
      } else if (tableName.startsWith('project_')) {
        query += ` WHERE project_id = ?`;
        params.push(projectId);
      }
    }
    
    const statement = db.prepare(query);
    const rows = statement.all(...params);
    
    console.log(`📤 Exported ${rows.length} rows from local ${tableName}`);
    return rows;
  } catch (error) {
    console.error(`❌ Error exporting from local ${tableName}:`, error.message);
    return [];
  }
}

/**
 * Import data to Supabase
 */
async function importToSupabase(tableName, data) {
  if (!data || data.length === 0) {
    console.log(`ℹ️ No data to import for ${tableName}`);
    return 0;
  }
  
  try {
    // For each record, use upsert to create or update
    const { data: result, error } = await supabase
      .from(tableName)
      .upsert(data, { onConflict: 'id' });
    
    if (error) throw error;
    
    console.log(`✅ Imported ${data.length} rows into Supabase ${tableName}`);
    return data.length;
  } catch (error) {
    console.error(`❌ Error importing to Supabase ${tableName}:`, error.message);
    console.error(error);
    return 0;
  }
}

/**
 * Sync a single table from local to Supabase
 */
async function syncTable(tableName) {
  console.log(`\n🔄 Syncing ${tableName}...`);
  const localData = exportFromLocal(tableName);
  if (localData.length > 0) {
    await importToSupabase(tableName, localData);
  }
}

/**
 * Sync all tables
 */
async function syncAll() {
  console.log('🚀 Starting sync from local database to Supabase...');
  
  for (const table of tables) {
    await syncTable(table);
  }
  
  console.log('\n✅ Sync completed!');
}

// Run the sync
syncAll()
  .catch(err => {
    console.error('Sync failed:', err);
    process.exit(1);
  })
  .finally(() => {
    db.close();
  }); 