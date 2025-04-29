/**
 * This script performs all necessary setup for the local database:
 * 1. Creates database schema
 * 2. Exports data from Supabase
 * 3. Imports it into the local database
 */
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { execSync } = require('child_process');

// Check if .env file exists
const envPath = path.join(__dirname, '..', '..', '.env');
if (!fs.existsSync(envPath)) {
  console.log('\nCreating .env file for configuration...');
  const envExample = `
# Development environment variables
VITE_SUPABASE_URL=https://msaiogbfcgtbjwzkufaa.supabase.co
VITE_SUPABASE_ANON_KEY=

# Set to 'true' to use local database or 'false' for Supabase
VITE_USE_LOCAL_DB=true

# For scripts only (not exposed to browser)
SUPABASE_URL=https://msaiogbfcgtbjwzkufaa.supabase.co
SUPABASE_KEY=
`;
  fs.writeFileSync(envPath, envExample);
  console.log('Created .env file. Please edit it to add your Supabase key.');
}

// Create interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Ask user for Supabase key if it's not in the .env file
const askForSupabaseKey = async () => {
  return new Promise((resolve) => {
    if (process.env.SUPABASE_KEY) {
      resolve(process.env.SUPABASE_KEY);
      return;
    }
    
    rl.question('\nEnter your Supabase anon key: ', (key) => {
      if (key) {
        console.log('Updating .env file with provided key...');
        let envContent = fs.readFileSync(envPath, 'utf8');
        envContent = envContent
          .replace('VITE_SUPABASE_ANON_KEY=', `VITE_SUPABASE_ANON_KEY=${key}`)
          .replace('SUPABASE_KEY=', `SUPABASE_KEY=${key}`);
        fs.writeFileSync(envPath, envContent);
        
        console.log('Updated .env file with Supabase key.');
        process.env.SUPABASE_KEY = key;
      }
      resolve(key);
    });
  });
};

// Ask user if they want to include the specific project
const askForProjectId = async () => {
  return new Promise((resolve) => {
    rl.question('\nDo you want to export a specific project? (y/N): ', (answer) => {
      if (answer.toLowerCase() === 'y') {
        rl.question('Enter project ID (e.g., c2593a84-0676-42bf-83fa-4bf21e4af697): ', (id) => {
          resolve(id);
        });
      } else {
        resolve(null);
      }
    });
  });
};

// Main setup function
const setup = async () => {
  console.log('=== 🚀 Local Database Setup ===');
  
  // 1. Create schema
  console.log('\n📊 Creating database schema...');
  try {
    execSync(`node ${path.join(__dirname, 'create-schema.cjs')}`, { stdio: 'inherit' });
  } catch (error) {
    console.error('\n❌ Failed to create schema:', error.message);
    process.exit(1);
  }
  
  // 2. Ask for Supabase key
  const key = await askForSupabaseKey();
  if (!key) {
    console.log('\n⚠️ No Supabase key provided. Skipping data export/import.');
    console.log('You can manually add your key to .env file and run this script again.');
    rl.close();
    return;
  }
  
  // 3. Ask for specific project ID
  const projectId = await askForProjectId();
  const projectArg = projectId ? ` ${projectId}` : '';
  
  // 4. Export from Supabase
  console.log('\n📤 Exporting data from Supabase...');
  try {
    execSync(`node ${path.join(__dirname, 'export-from-supabase.cjs')}${projectArg}`, { stdio: 'inherit' });
  } catch (error) {
    console.error('\n❌ Failed to export data:', error.message);
    rl.close();
    process.exit(1);
  }
  
  // 5. Import to local database
  console.log('\n📥 Importing data to local database...');
  try {
    execSync(`node ${path.join(__dirname, 'import-to-local.cjs')}`, { stdio: 'inherit' });
  } catch (error) {
    console.error('\n❌ Failed to import data:', error.message);
    rl.close();
    process.exit(1);
  }
  
  console.log('\n✅ Setup completed successfully!');
  console.log('\nYou can now run your app with:');
  console.log('npm run dev');
  
  rl.close();
};

// Run setup
setup().catch(err => {
  console.error('\n❌ Setup failed:', err);
  rl.close();
  process.exit(1);
}); 