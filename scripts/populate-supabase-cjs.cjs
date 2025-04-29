// Script to populate local database with project data
const path = require('path');
const Database = require('better-sqlite3');
const crypto = require('crypto');

// Connect to local SQLite database
const dbPath = path.join(__dirname, '..', 'db', 'local.db');
const db = new Database(dbPath, { readonly: false });
console.log(`Connected to local database at: ${dbPath}`);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Import projects from populate-supabase.js
const { projects } = require('./projects-data.cjs');

// Function to insert a project and its related data
function insertProject(project) {
  try {
    // Begin transaction
    db.exec('BEGIN TRANSACTION');

    // Insert the main project
    const projectStmt = db.prepare(`
      INSERT INTO projects (
        id, title, description, category, image, link, github, 
        live_demo, long_description, year, role, created_at
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now')
      )
    `);

    const projectId = crypto.randomUUID();
    projectStmt.run(
      projectId,
      project.title,
      project.description,
      project.category,
      project.image,
      project.link,
      project.github || null,
      project.live_demo || null,
      project.long_description || null,
      project.year || null,
      project.role || null
    );
    
    console.log(`Inserted project: ${project.title} with ID: ${projectId}`);
    
    // Insert technologies
    if (project.technologies && project.technologies.length > 0) {
      const techStmt = db.prepare(`
        INSERT INTO project_technologies (
          id, project_id, technology, created_at
        ) VALUES (?, ?, ?, datetime('now'))
      `);
      
      for (const tech of project.technologies) {
        techStmt.run(crypto.randomUUID(), projectId, tech);
      }
      console.log(`Inserted ${project.technologies.length} technologies for project: ${project.title}`);
    }
    
    // Insert features
    if (project.features && project.features.length > 0) {
      const featureStmt = db.prepare(`
        INSERT INTO project_features (
          id, project_id, feature, created_at
        ) VALUES (?, ?, ?, datetime('now'))
      `);
      
      for (const feature of project.features) {
        featureStmt.run(crypto.randomUUID(), projectId, feature);
      }
      console.log(`Inserted ${project.features.length} features for project: ${project.title}`);
    }
    
    // Insert team members
    if (project.team && project.team.length > 0) {
      const teamStmt = db.prepare(`
        INSERT INTO project_team_members (
          id, project_id, member_name, created_at
        ) VALUES (?, ?, ?, datetime('now'))
      `);
      
      for (const member of project.team) {
        teamStmt.run(crypto.randomUUID(), projectId, member);
      }
      console.log(`Inserted ${project.team.length} team members for project: ${project.title}`);
    }
    
    // Insert gallery images
    if (project.gallery && project.gallery.length > 0) {
      const galleryStmt = db.prepare(`
        INSERT INTO project_gallery (
          id, project_id, image_url, display_order, created_at
        ) VALUES (?, ?, ?, ?, datetime('now'))
      `);
      
      for (let i = 0; i < project.gallery.length; i++) {
        galleryStmt.run(crypto.randomUUID(), projectId, project.gallery[i], i);
      }
      console.log(`Inserted ${project.gallery.length} gallery images for project: ${project.title}`);
    }
    
    // Insert project sections
    if (project.sections && project.sections.length > 0) {
      const sectionStmt = db.prepare(`
        INSERT INTO project_sections (
          id, project_id, section_title, section_content, display_order, created_at
        ) VALUES (?, ?, ?, ?, ?, datetime('now'))
      `);
      
      for (const section of project.sections) {
        sectionStmt.run(
          crypto.randomUUID(), 
          projectId, 
          section.section_title, 
          section.section_content, 
          section.display_order
        );
      }
      console.log(`Inserted ${project.sections.length} sections for project: ${project.title}`);
    }
    
    // Commit transaction
    db.exec('COMMIT');
    
    return projectId;
  } catch (error) {
    // Rollback on error
    db.exec('ROLLBACK');
    console.error(`Error inserting project ${project.title}:`, error);
    throw error;
  }
}

// Main function to populate all projects
function populateProjects() {
  try {
    console.log('Starting to populate projects...');
    
    // Clear existing data (optional)
    db.exec('DELETE FROM project_sections');
    db.exec('DELETE FROM project_gallery');
    db.exec('DELETE FROM project_team_members');
    db.exec('DELETE FROM project_features');
    db.exec('DELETE FROM project_technologies');
    db.exec('DELETE FROM projects');
    
    for (const project of projects) {
      insertProject(project);
    }
    
    console.log('Successfully populated all projects!');
  } catch (error) {
    console.error('Error populating projects:', error);
  } finally {
    // Close database connection
    db.close();
  }
}

// Run the population script
populateProjects();
