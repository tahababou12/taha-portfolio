/**
 * This script exports data from Supabase tables to JSON files
 */
require('dotenv').config({ path: require('path').join(__dirname, '..', '..', '.env') });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Verify environment variables
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  console.error('❌ Error: SUPABASE_URL and SUPABASE_KEY must be defined in your .env file');
  process.exit(1);
}

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Create exports directory if it doesn't exist
const exportDir = path.join(__dirname, '..', 'exports');
if (!fs.existsSync(exportDir)) {
  fs.mkdirSync(exportDir, { recursive: true });
}

// Tables to export
const tables = [
  'projects', 
  'project_technologies', 
  'project_features',
  'project_team_members',
  'project_gallery',
  'project_sections'
];

// Check for specific project ID argument
const projectId = process.argv[2];
const projectFilter = projectId ? { id: projectId } : {};

async function exportTable(tableName) {
  console.log(`Exporting ${tableName}...`);
  
  try {
    let query = supabase.from(tableName).select('*');
    
    // Apply project filter if applicable and this is a project-related table
    if (projectId && tableName !== 'projects') {
      query = query.eq('project_id', projectId);
    } else if (projectId && tableName === 'projects') {
      query = query.eq('id', projectId);
    }
    
    const { data, error } = await query;
    
    if (error) {
      throw error;
    }
    
    if (!data || data.length === 0) {
      console.log(`No data found for ${tableName}`);
      // Write empty array to keep consistent files
      fs.writeFileSync(
        path.join(exportDir, `${tableName}.json`),
        JSON.stringify([], null, 2)
      );
      return 0;
    }
    
    // Write data to file
    fs.writeFileSync(
      path.join(exportDir, `${tableName}.json`),
      JSON.stringify(data, null, 2)
    );
    
    console.log(`✅ Exported ${data.length} rows from ${tableName}`);
    return data.length;
  } catch (err) {
    console.error(`❌ Error exporting ${tableName}:`, err.message);
    return 0;
  }
}

async function exportAll() {
  console.log('Starting export from Supabase...');
  
  if (projectId) {
    console.log(`Filtering for project ID: ${projectId}`);
  }
  
  let totalRowsExported = 0;
  
  for (const table of tables) {
    const rowCount = await exportTable(table);
    totalRowsExported += rowCount;
  }
  
  console.log(`\nExport complete! ${totalRowsExported} total rows exported to ${exportDir}`);
}

// Run the export
exportAll().catch(err => {
  console.error('Export failed:', err);
  process.exit(1);
}); 