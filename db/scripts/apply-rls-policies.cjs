/**
 * This script applies RLS policies to Supabase tables to allow anonymous access
 */
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Get credentials from environment
const supabaseUrl = process.env.SUPABASE_URL || 'https://msaiogbfcgtbjwzkufaa.supabase.co';
const projectId = supabaseUrl.split('.')[0].replace('https://', '');

try {
  console.log('Applying RLS policies to Supabase tables...');
  
  // Read the SQL file
  const sqlPath = path.join(__dirname, 'setup-rls-policies.sql');
  const sql = fs.readFileSync(sqlPath, 'utf8');
  
  // Create a temporary file with the SQL
  const tempSqlPath = path.join(__dirname, 'temp-policies.sql');
  fs.writeFileSync(tempSqlPath, sql);
  
  // Use the Supabase CLI to apply the SQL
  console.log('Running SQL against Supabase project...');
  console.log(`\nIMPORTANT: You'll need to login to Supabase CLI first if you haven't already.`);
  console.log(`Run "supabase login" if necessary.`);
  console.log(`Also make sure you have linked your project: "supabase link --project-ref ${projectId}"\n`);
  
  // Wait for user confirmation
  console.log('Please confirm you want to apply these RLS policies to your Supabase project:');
  console.log('1. Enabling Row Level Security on all tables');
  console.log('2. Creating policies to allow anonymous read access');
  console.log('3. Creating policies to allow authenticated users full access');
  console.log('\nPress Enter to continue or Ctrl+C to cancel...');
  
  // Apply the SQL manually through the Supabase Studio SQL Editor
  console.log('\n\nTo apply these policies manually:');
  console.log('1. Go to the Supabase dashboard at: https://app.supabase.com/project/' + projectId);
  console.log('2. Navigate to the SQL Editor');
  console.log('3. Copy and paste the following SQL:');
  console.log('\n' + '-'.repeat(80) + '\n');
  console.log(sql);
  console.log('\n' + '-'.repeat(80) + '\n');
  console.log('4. Run the SQL script');
  
  // Clean up
  fs.unlinkSync(tempSqlPath);
  
  console.log('\n✅ Instructions provided for applying RLS policies.');
  console.log('Once applied, your anonymous users should be able to read the project data.');
  
} catch (error) {
  console.error('Error:', error);
} 