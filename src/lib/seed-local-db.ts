/**
 * This script can be used to seed the local database with sample data.
 * Run this in development to have some data to work with when using VITE_USE_LOCAL_DB=true
 */
import localDb from './local-db-browser';

// Sample project data
const sampleProjects = [
  {
    id: '1',
    title: 'Sample Project 1',
    description: 'A sample project for local development',
    category: 'Featured',
    image: 'https://placehold.co/600x400?text=Sample+Project+1',
    link: 'https://example.com/project1',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Sample Project 2',
    description: 'Another sample project for local development',
    category: 'Featured',
    image: 'https://placehold.co/600x400?text=Sample+Project+2',
    link: 'https://example.com/project2',
    created_at: new Date().toISOString()
  }
];

// Sample gallery data
const sampleGallery = [
  {
    id: '1',
    project_id: '1',
    image_url: 'https://placehold.co/600x400?text=Gallery+1',
    display_order: 1
  },
  {
    id: '2',
    project_id: '1',
    image_url: 'https://placehold.co/600x400?text=Gallery+2',
    display_order: 2
  },
  {
    id: '3',
    project_id: '2',
    image_url: 'https://placehold.co/600x400?text=Gallery+3',
    display_order: 1
  }
];

// Sample technologies data
const sampleTechnologies = [
  {
    id: '1',
    project_id: '1',
    name: 'React',
    category: 'Frontend'
  },
  {
    id: '2',
    project_id: '1',
    name: 'TypeScript',
    category: 'Language'
  },
  {
    id: '3',
    project_id: '2',
    name: 'Next.js',
    category: 'Framework'
  }
];

export async function seedLocalDatabase() {
  console.log('Seeding local database with sample data...');
  
  try {
    // Clear existing data
    localStorage.removeItem('localDbData');
    
    // Add projects
    for (const project of sampleProjects) {
      await localDb.from('projects').insert(project);
    }
    console.log(`✅ Added ${sampleProjects.length} sample projects`);
    
    // Add gallery images
    for (const gallery of sampleGallery) {
      await localDb.from('project_gallery').insert(gallery);
    }
    console.log(`✅ Added ${sampleGallery.length} sample gallery images`);
    
    // Add technologies
    for (const tech of sampleTechnologies) {
      await localDb.from('project_technologies').insert(tech);
    }
    console.log(`✅ Added ${sampleTechnologies.length} sample technologies`);
    
    console.log('Local database seeded successfully!');
  } catch (error) {
    console.error('Error seeding local database:', error);
  }
}

// Run the seeding function if this file is loaded directly
if (import.meta.url === import.meta.main) {
  seedLocalDatabase();
} 