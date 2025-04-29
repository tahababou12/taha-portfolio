/**
 * Script to fetch all award IDs and create their directories in the images folder
 * 
 * Usage: node scripts/create-award-image-dirs.cjs
 */

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// We can't directly import from ES modules, so we'll reimplement the slug function
function createSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove non-word chars
    .replace(/[\s_-]+/g, '-')  // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, '')   // Remove leading/trailing hyphens
    .trim();
}

function getAwardSlug(title) {
  return createSlug(title);
}

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: SUPABASE_URL and SUPABASE_KEY must be defined in your .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Set up constants
const IMAGES_DIR = path.join(__dirname, '..', 'images', 'awards');

async function createAwardDirectories() {
  // Create parent images directory if it doesn't exist
  if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
    console.log(`Created main awards images directory at ${IMAGES_DIR}`);
  }
  
  // Fetch all awards
  console.log('Fetching awards from database...');
  const { data: awards, error } = await supabase
    .from('awards')
    .select('id, title');
  
  if (error) {
    console.error('Error fetching awards:', error.message);
    process.exit(1);
  }
  
  console.log(`Found ${awards.length} awards`);
  
  // Create directories for each award
  const createdDirs = [];
  const skippedDirs = [];
  
  for (const award of awards) {
    const slug = getAwardSlug(award.title);
    const awardDir = path.join(IMAGES_DIR, slug);
    
    if (!fs.existsSync(awardDir)) {
      fs.mkdirSync(awardDir, { recursive: true });
      createdDirs.push({ title: award.title, slug, path: awardDir });
      console.log(`✅ Created directory for "${award.title}" at ${awardDir}`);
    } else {
      skippedDirs.push({ title: award.title, slug, path: awardDir });
      console.log(`ℹ️ Directory for "${award.title}" already exists at ${awardDir}`);
    }
  }
  
  // Print summary
  console.log('\n✅ Process completed!');
  console.log(`Created ${createdDirs.length} directories, skipped ${skippedDirs.length} existing directories.`);
  
  console.log('\n⭐ Created directories:');
  createdDirs.forEach(dir => {
    console.log(`- ${dir.title} (${dir.slug}): ${dir.path}`);
  });
  
  console.log('\n⭐ All available awards:');
  awards.forEach(award => {
    const slug = getAwardSlug(award.title);
    console.log(`- ${award.title} (slug: ${slug})`);
  });
  
  console.log('\n🎬 Next step: Add images to these directories, then run:');
  console.log('node scripts/upload-award-images.cjs <award-slug>');
}

createAwardDirectories().catch(err => {
  console.error('Unhandled error:', err);
  process.exit(1);
}); 