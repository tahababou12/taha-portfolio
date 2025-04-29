/**
 * Script to add the Boston University Innovation Pathway Grant award
 * 
 * Usage: node scripts/add-bu-innovation-grant.cjs
 */

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: SUPABASE_URL and SUPABASE_KEY must be defined in your .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize local database
const dbPath = path.join(__dirname, '..', 'db', 'local.db');
const localDb = new Database(dbPath);

// Enable foreign keys
localDb.pragma('foreign_keys = ON');

// Generate a UUID for the award
const awardId = uuidv4();

// Award data
const award = {
  id: awardId,
  title: "Boston University Innovation Pathway Grant – $5,000",
  description: "Selected as a top finalist and awarded grant funding to develop AI-driven technology (BragAI)",
  organization: "Boston University",
  year: "2023", // Assuming year 2023, adjust if different
  full_description: "The Boston University Innovation Pathway Grant recognizes promising entrepreneurial ventures from students and faculty. This competitive grant provides funding and resources to help transform innovative ideas into viable businesses.\n\nMy project, BragAI, was selected as a top finalist from a large pool of applicants across the university. The $5,000 grant funding supported the early development of our AI-driven technology, enabling us to build a proof of concept and conduct initial user testing.\n\nThe grant program also provided access to mentorship from industry experts and Boston University's extensive network of entrepreneurs and investors, which proved invaluable in refining our business model and go-to-market strategy.",
  link: "https://www.bu.edu/innovate/",
  image: "", // Will be updated later after uploading images
  date: "2023" // Matching the year
};

async function addAwardToSupabase() {
  console.log('Adding award to Supabase database...');
  
  // Insert the award
  const { data, error } = await supabase
    .from('awards')
    .insert([award])
    .select();
    
  if (error) {
    console.error('Error inserting award to Supabase:', error.message);
    return false;
  }
  
  console.log(`✅ Successfully added award to Supabase: ${award.title} (ID: ${data[0].id})`);
  return true;
}

function addAwardToLocal() {
  console.log('Adding award to local database...');
  
  try {
    // Insert the award
    const insertAward = localDb.prepare(`
      INSERT INTO awards (id, title, description, organization, year, full_description, link, image)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    insertAward.run(
      award.id,
      award.title,
      award.description,
      award.organization,
      award.year,
      award.full_description,
      award.link,
      award.image
    );
    
    console.log(`✅ Successfully added award to local database: ${award.title}`);
    return true;
  } catch (err) {
    console.error('Error inserting award to local database:', err.message);
    return false;
  }
}

function createImageDirectory() {
  // Create slug from title
  const slug = award.title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove non-word chars
    .replace(/[\s_-]+/g, '-')  // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, '')   // Remove leading/trailing hyphens
    .trim();
  
  // Create directory path
  const dirPath = path.join(__dirname, '..', 'images', 'awards', slug);
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`✅ Created image directory at: ${dirPath}`);
  } else {
    console.log(`ℹ️ Image directory already exists at: ${dirPath}`);
  }
  
  return slug;
}

async function main() {
  try {
    // Add award to local database
    const localSuccess = addAwardToLocal();
    
    // Add award to Supabase
    const supabaseSuccess = await addAwardToSupabase();
    
    // Create image directory
    const slug = createImageDirectory();
    
    console.log('\n✅ Process completed!');
    console.log(`
Award "${award.title}" has been added:
- Added to local database: ${localSuccess ? '✅' : '❌'}
- Added to Supabase: ${supabaseSuccess ? '✅' : '❌'}
- Image directory created at: images/awards/${slug}

Next steps:
1. Add images to the directory: images/awards/${slug}/
2. Run the upload command: npm run upload-award-image ${slug}
    `);
    
  } catch (err) {
    console.error('Unhandled error:', err);
  } finally {
    // Close local database
    localDb.close();
  }
}

// Run the script
main(); 