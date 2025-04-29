/**
 * Script to upload project images to Supabase Storage and update project records
 * 
 * Usage:
 * 1. Create a folder named after your project slug in the 'images' directory
 * 2. Place your images in that folder
 * 3. Run: node scripts/upload-project-images.cjs <project-slug>
 * 
 * Example: node scripts/upload-project-images.cjs bragai
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
const STORAGE_BUCKET = 'project-images';

async function uploadImages() {
  // Get project slug from command line argument
  const projectSlug = process.argv[2];
  
  if (!projectSlug) {
    console.error('Error: Project slug not provided');
    console.log('Usage: node scripts/upload-project-images.cjs <project-slug>');
    process.exit(1);
  }
  
  // Create images directory if it doesn't exist
  if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
    console.log(`Created images directory at ${IMAGES_DIR}`);
    console.log(`Please add your images to ${path.join(IMAGES_DIR, projectSlug)} and run this script again.`);
    process.exit(0);
  }
  
  // Check if project folder exists
  const projectDir = path.join(IMAGES_DIR, projectSlug);
  if (!fs.existsSync(projectDir)) {
    fs.mkdirSync(projectDir, { recursive: true });
    console.log(`Created project image directory at ${projectDir}`);
    console.log(`Please add your images to this directory and run this script again.`);
    process.exit(0);
  }
  
  // Get list of image files in the project directory
  const files = fs.readdirSync(projectDir)
    .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));
  
  if (files.length === 0) {
    console.error(`No image files found in ${projectDir}`);
    console.log('Please add your images to this directory and run this script again.');
    process.exit(1);
  }
  
  console.log(`Found ${files.length} images in ${projectDir}`);
  
  // Find the project in the database using the slug
  const { data: projectsData, error: projectsError } = await supabase
    .from('projects')
    .select('*');
  
  if (projectsError) {
    console.error('Error fetching projects:', projectsError.message);
    process.exit(1);
  }
  
  // Find the project with matching slug
  const project = projectsData.find(
    (p) => getProjectSlug(p.title) === projectSlug
  );
  
  if (!project) {
    console.error(`Project with slug "${projectSlug}" not found in the database`);
    console.log('Available projects:');
    projectsData.forEach(p => {
      console.log(`- ${p.title} (slug: ${getProjectSlug(p.title)})`);
    });
    process.exit(1);
  }
  
  console.log(`Uploading images for project: ${project.title} (ID: ${project.id})`);
  
  // Check if the bucket exists, create it if not
  const { data: buckets } = await supabase.storage.listBuckets();
  const bucketExists = buckets.some(b => b.name === STORAGE_BUCKET);
  
  if (!bucketExists) {
    console.log(`Creating storage bucket: ${STORAGE_BUCKET}`);
    await supabase.storage.createBucket(STORAGE_BUCKET, {
      public: true
    });
  }
  
  // Upload each image to Supabase Storage
  const uploadedUrls = [];
  
  for (let i = 0; i < files.length; i++) {
    const filePath = path.join(projectDir, files[i]);
    const fileData = fs.readFileSync(filePath);
    const fileExt = path.extname(files[i]).toLowerCase().replace('.', '');
    const contentType = `image/${fileExt === 'jpg' ? 'jpeg' : fileExt}`;
    const fileName = `${projectSlug}-${i+1}${path.extname(files[i])}`;
    
    console.log(`Uploading ${files[i]} as ${fileName}...`);
    
    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(`${projectSlug}/${fileName}`, fileData, {
        contentType,
        upsert: true
      });
    
    if (error) {
      console.error(`Error uploading ${files[i]}:`, error.message);
      continue;
    }
    
    // Get public URL
    const { data: urlData } = supabase.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(`${projectSlug}/${fileName}`);
    
    uploadedUrls.push(urlData.publicUrl);
    console.log(`✅ Uploaded ${files[i]} successfully`);
  }
  
  console.log(`\nAll images uploaded. Total: ${uploadedUrls.length}`);
  
  if (uploadedUrls.length === 0) {
    console.error('No images were uploaded successfully');
    process.exit(1);
  }
  
  // Update database with new URLs
  console.log('\nUpdating project database records...');
  
  // Update main project image to the first uploaded image
  const { error: updateError } = await supabase
    .from('projects')
    .update({ image: uploadedUrls[0] })
    .eq('id', project.id);
  
  if (updateError) {
    console.error('Error updating project image:', updateError.message);
  } else {
    console.log(`✅ Updated main project image`);
  }
  
  // Prepare gallery data
  const galleryData = uploadedUrls.map((url, index) => ({
    project_id: project.id,
    image_url: url,
    display_order: index + 1
  }));
  
  // Delete existing gallery images for this project
  const { error: deleteError } = await supabase
    .from('project_gallery')
    .delete()
    .eq('project_id', project.id);
  
  if (deleteError) {
    console.error('Error deleting existing gallery images:', deleteError.message);
  } else {
    console.log(`✅ Removed old gallery images`);
  }
  
  // Insert new gallery images
  const { error: insertError } = await supabase
    .from('project_gallery')
    .insert(galleryData);
  
  if (insertError) {
    console.error('Error inserting gallery images:', insertError.message);
  } else {
    console.log(`✅ Added ${galleryData.length} new gallery images`);
  }
  
  console.log('\n✅ Process completed successfully!');
  console.log(`
Images for "${project.title}" have been updated:
- Main project image: ${uploadedUrls[0]}
- ${uploadedUrls.length} gallery images uploaded
  `);
}

uploadImages().catch(err => {
  console.error('Unhandled error:', err);
  process.exit(1);
}); 