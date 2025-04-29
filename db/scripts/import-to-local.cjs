const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Initialize database
const dbPath = path.join(__dirname, '..', 'local.db');
const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

const exportDir = path.join(__dirname, '..', 'exports');

// Tables to import in specific order (to respect foreign keys)
const tables = [
  'projects', 
  'project_technologies', 
  'project_features',
  'project_team_members',
  'project_gallery',
  'project_sections'
];

function loadData(tableName) {
  const filePath = path.join(exportDir, `${tableName}.json`);
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️ No data file found for ${tableName}`);
    return [];
  }
  
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return data;
  } catch (err) {
    console.error(`❌ Error reading data from ${filePath}:`, err.message);
    return [];
  }
}

function importTable(tableName, data) {
  if (!data || data.length === 0) {
    console.log(`ℹ️ No data to import for ${tableName}`);
    return 0;
  }
  
  try {
    // Clear existing data
    db.prepare(`DELETE FROM ${tableName}`).run();
    
    // Get column names from first object
    const sampleItem = data[0];
    const columns = Object.keys(sampleItem);
    
    // Create placeholders for prepared statement
    const placeholders = columns.map(() => '?').join(', ');
    
    // Prepare insert statement
    const insert = db.prepare(`
      INSERT INTO ${tableName} (${columns.join(', ')})
      VALUES (${placeholders})
    `);
    
    // Begin transaction
    const insertMany = db.transaction((items) => {
      for (const item of items) {
        const values = columns.map(col => item[col]);
        insert.run(values);
      }
    });
    
    // Execute transaction
    insertMany(data);
    
    console.log(`✅ Imported ${data.length} rows into ${tableName}`);
    return data.length;
  } catch (err) {
    console.error(`❌ Error importing ${tableName}:`, err.message);
    return 0;
  }
}

function importAll() {
  console.log('Starting import to local database...');
  
  // Create schema if it doesn't exist
  try {
    if (!fs.existsSync(dbPath)) {
      console.log('Database does not exist, creating schema first...');
      require('./create-schema.cjs');
    }
  } catch (err) {
    console.error('Error checking/creating database:', err);
    process.exit(1);
  }
  
  // Import all tables
  for (const table of tables) {
    const data = loadData(table);
    importTable(table, data);
  }
  
  console.log(`\nImport complete! Database: ${dbPath}`);
}

// Run the import
importAll();
db.close(); 