/**
 * This script automates the process of:
 * 1. Exporting data from Supabase
 * 2. Importing it into the local SQLite database
 */
require('dotenv').config();
const { execSync } = require('child_process');
const path = require('path');

// Project ID for specific project sync (optional)
const projectId = process.argv[2]; // e.g., c2593a84-0676-42bf-83fa-4bf21e4af697
const projectArg = projectId ? ` ${projectId}` : '';

console.log('🔄 Starting Supabase to local sync process...');

try {
  // Step 1: Export from Supabase
  console.log('\n📤 Exporting from Supabase...');
  execSync(`node ${path.join(__dirname, 'export-from-supabase.cjs')}${projectArg}`, { stdio: 'inherit' });
  
  // Step 2: Import to local database
  console.log('\n📥 Importing to local database...');
  execSync(`node ${path.join(__dirname, 'import-to-local.cjs')}`, { stdio: 'inherit' });
  
  console.log('\n✅ Sync completed successfully!');
} catch (error) {
  console.error('\n❌ Sync process failed:', error.message);
  process.exit(1);
} 