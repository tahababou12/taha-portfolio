/**
 * Script to populate awards data in Supabase
 * 
 * Usage: node scripts/populate-awards.cjs
 */

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: SUPABASE_URL and SUPABASE_KEY must be defined in your .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Sample awards data
const sampleAwards = [
  {
    title: "First Place Hackathon",
    description: "Won first place at the annual hackathon for developing an innovative AI solution.",
    organization: "Tech University",
    date: "2023",
    certificate_url: "https://example.com/certificate1",
    display_order: 1
  },
  {
    title: "Outstanding Research Award",
    description: "Recognized for exceptional research contributions in machine learning applications.",
    organization: "AI Research Foundation",
    date: "2022",
    certificate_url: "https://example.com/certificate2",
    display_order: 2
  },
  {
    title: "Best Paper Award",
    description: "Awarded for the best paper submission at the International Conference on AI.",
    organization: "International AI Society",
    date: "2021",
    certificate_url: "https://example.com/certificate3",
    display_order: 3
  }
];

async function insertAward(award) {
  console.log(`Inserting award: ${award.title}`);
  
  try {
    // Insert award
    const { data, error } = await supabase
      .from('awards')
      .insert([award])
      .select();
    
    if (error) {
      console.error(`Error inserting award "${award.title}":`, error.message);
      return null;
    }
    
    console.log(`✅ Successfully inserted award: ${award.title} (ID: ${data[0].id})`);
    return data[0];
  } catch (err) {
    console.error(`Unexpected error inserting award "${award.title}":`, err.message);
    return null;
  }
}

async function populateAwards() {
  console.log('Starting to populate awards...');
  
  for (const award of sampleAwards) {
    await insertAward(award);
  }
  
  console.log('\n✅ Awards population completed successfully!');
}

// If running this module directly, populate the awards
if (require.main === module) {
  populateAwards().catch(err => {
    console.error('Unhandled error:', err);
    process.exit(1);
  });
} 