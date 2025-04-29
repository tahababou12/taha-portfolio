/**
 * Script to export data from local SQLite database to JSON files
 * These files will be used by the browser to load data into IndexedDB
 */
const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');

// Connect to local SQLite database
const dbPath = path.join(__dirname, '..', 'local.db');
const exportsDir = path.join(__dirname, '..', 'exports');
const db = new Database(dbPath, { readonly: true });

console.log('Starting export from local database...');

// Create exports directory if it doesn't exist
if (!fs.existsSync(exportsDir)) {
  fs.mkdirSync(exportsDir, { recursive: true });
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

// Total rows exported
let totalRows = 0;

// Export each table to a JSON file
for (const table of tables) {
  try {
    console.log(`Exporting ${table}...`);
    
    // Get all rows from table
    const rows = db.prepare(`SELECT * FROM ${table}`).all();
    
    // Write to JSON file
    const outputPath = path.join(exportsDir, `${table}.json`);
    fs.writeFileSync(outputPath, JSON.stringify(rows, null, 2));
    
    console.log(`✅ Exported ${rows.length} rows from ${table}`);
    totalRows += rows.length;
  } catch (error) {
    console.error(`Error exporting ${table}:`, error.message);
  }
}

// Close database connection
db.close();

console.log(`\nExport complete! ${totalRows} total rows exported to ${exportsDir}`); 