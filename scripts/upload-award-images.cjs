/**
 * Script to upload award images to Supabase Storage and update award records
 * 
 * Usage:
 * 1. Place your award images in the 'images/awards/[award-slug]' directory
 * 2. Run: node scripts/upload-award-images.cjs <award-slug>
 * 
 * Example: node scripts/upload-award-images.cjs first-place-hackathon
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
const AWARDS_IMAGES_DIR = path.join(__dirname, '..', 'images', 'awards');
const STORAGE_BUCKET = 'award-images';

async function uploadImages() {
  // Get award slug from command line argument
  const awardSlug = process.argv[2];
  
  if (!awardSlug) {
    console.error('Error: Award slug not provided');
    console.log('Usage: node scripts/upload-award-images.cjs <award-slug>');
    process.exit(1);
  }
  
  // Check if parent award images directory exists
  if (!fs.existsSync(AWARDS_IMAGES_DIR)) {
    fs.mkdirSync(AWARDS_IMAGES_DIR, { recursive: true });
    console.log(`Created awards images directory at ${AWARDS_IMAGES_DIR}`);
    console.log(`Please run "node scripts/create-award-image-dirs.cjs" first to create award directories.`);
    process.exit(0);
  }
  
  // Check if award folder exists
  const awardDir = path.join(AWARDS_IMAGES_DIR, awardSlug);
  if (!fs.existsSync(awardDir)) {
    console.error(`Error: Award directory not found at ${awardDir}`);
    console.log(`Please run "node scripts/create-award-image-dirs.cjs" first to create award directories.`);
    process.exit(1);
  }
  
  // Get list of image files in the award directory
  const files = fs.readdirSync(awardDir)
    .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));
  
  if (files.length === 0) {
    console.error(`No image files found in ${awardDir}`);
    console.log('Please add your images to this directory and run this script again.');
    process.exit(1);
  }
  
  console.log(`Found ${files.length} images in ${awardDir}`);
  
  // Find the award in the database using the slug
  const { data: awardsData, error: awardsError } = await supabase
    .from('awards')
    .select('*');
  
  if (awardsError) {
    console.error('Error fetching awards:', awardsError.message);
    process.exit(1);
  }
  
  // Find the award with matching slug
  const award = awardsData.find(
    (a) => getAwardSlug(a.title) === awardSlug
  );
  
  if (!award) {
    console.error(`Award with slug "${awardSlug}" not found in the database`);
    console.log('Available awards:');
    awardsData.forEach(a => {
      console.log(`- ${a.title} (slug: ${getAwardSlug(a.title)})`);
    });
    process.exit(1);
  }
  
  console.log(`Uploading images for award: ${award.title} (ID: ${award.id})`);
  
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
    const filePath = path.join(awardDir, files[i]);
    const fileData = fs.readFileSync(filePath);
    const fileExt = path.extname(files[i]).toLowerCase().replace('.', '');
    const contentType = `image/${fileExt === 'jpg' ? 'jpeg' : fileExt}`;
    const fileName = `${awardSlug}-${i+1}${path.extname(files[i])}`;
    
    console.log(`Uploading ${files[i]} as ${fileName}...`);
    
    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(`${awardSlug}/${fileName}`, fileData, {
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
      .getPublicUrl(`${awardSlug}/${fileName}`);
    
    uploadedUrls.push(urlData.publicUrl);
    console.log(`✅ Uploaded ${files[i]} successfully`);
  }
  
  console.log(`\nAll images uploaded. Total: ${uploadedUrls.length}`);
  
  if (uploadedUrls.length === 0) {
    console.error('No images were uploaded successfully');
    process.exit(1);
  }
  
  // Update database with new URLs
  console.log('\nUpdating award database records...');
  
  // Update main award image to the first uploaded image
  const { error: updateError } = await supabase
    .from('awards')
    .update({ image: uploadedUrls[0] })
    .eq('id', award.id);
  
  if (updateError) {
    console.error('Error updating award image:', updateError.message);
  } else {
    console.log(`✅ Updated main award image`);
  }
  
  // Prepare gallery data
  const galleryData = uploadedUrls.map((url, index) => ({
    award_id: award.id,
    image_url: url,
    display_order: index + 1
  }));
  
  // Delete existing gallery images for this award
  const { error: deleteError } = await supabase
    .from('award_gallery')
    .delete()
    .eq('award_id', award.id);
  
  if (deleteError) {
    console.error('Error deleting existing gallery images:', deleteError.message);
  } else {
    console.log(`✅ Removed old gallery images`);
  }
  
  // Insert new gallery images
  const { error: insertError } = await supabase
    .from('award_gallery')
    .insert(galleryData);
  
  if (insertError) {
    console.error('Error inserting gallery images:', insertError.message);
  } else {
    console.log(`✅ Added ${galleryData.length} new gallery images`);
  }
  
  console.log('\n✅ Process completed successfully!');
  console.log(`
Images for "${award.title}" have been updated:
- Main award image: ${uploadedUrls[0]}
- ${uploadedUrls.length} gallery images uploaded
  `);
}

uploadImages().catch(err => {
  console.error('Unhandled error:', err);
  process.exit(1);
});