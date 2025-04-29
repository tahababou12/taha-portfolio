/**
 * Script to fetch all project slugs and create their directories in the images folder
 * 
 * Usage: node scripts/create-project-image-dirs.cjs
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

function getProjectSlug(title) {
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
const IMAGES_DIR = path.join(__dirname, '..', 'images');

async function createProjectDirectories() {
  // Create parent images directory if it doesn't exist
  if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
    console.log(`Created main images directory at ${IMAGES_DIR}`);
  }
  
  // Fetch all projects
  console.log('Fetching projects from database...');
  const { data: projects, error } = await supabase
    .from('projects')
    .select('title');
  
  if (error) {
    console.error('Error fetching projects:', error.message);
    process.exit(1);
  }
  
  console.log(`Found ${projects.length} projects`);
  
  // Create directories for each project
  const createdDirs = [];
  const skippedDirs = [];
  
  for (const project of projects) {
    const slug = getProjectSlug(project.title);
    const projectDir = path.join(IMAGES_DIR, slug);
    
    if (!fs.existsSync(projectDir)) {
      fs.mkdirSync(projectDir, { recursive: true });
      createdDirs.push({ title: project.title, slug, path: projectDir });
      console.log(`✅ Created directory for "${project.title}" at ${projectDir}`);
    } else {
      skippedDirs.push({ title: project.title, slug, path: projectDir });
      console.log(`ℹ️ Directory for "${project.title}" already exists at ${projectDir}`);
    }
  }
  
  // Print summary
  console.log('\n✅ Process completed!');
  console.log(`Created ${createdDirs.length} directories, skipped ${skippedDirs.length} existing directories.`);
  
  console.log('\n⭐ Created directories:');
  createdDirs.forEach(dir => {
    console.log(`- ${dir.title} (${dir.slug}): ${dir.path}`);
  });
  
  console.log('\n⭐ All available projects:');
  projects.forEach(project => {
    const slug = getProjectSlug(project.title);
    console.log(`- ${project.title} (slug: ${slug})`);
  });
  
  console.log('\n🎬 Next step: Add images to these directories, then run:');
  console.log('node scripts/upload-project-images.js <project-slug>');
}

createProjectDirectories().catch(err => {
  console.error('Unhandled error:', err);
  process.exit(1);
}); 