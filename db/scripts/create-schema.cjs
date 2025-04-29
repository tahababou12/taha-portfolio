const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

// Initialize database
const dbPath = path.join(__dirname, '..', 'local.db');
const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

console.log('Creating local database schema...');

// Create tables
db.exec(`
-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  image TEXT NOT NULL,
  link TEXT NOT NULL,
  github TEXT,
  live_demo TEXT,
  long_description TEXT,
  year TEXT,
  role TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Project technologies table
CREATE TABLE IF NOT EXISTS project_technologies (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  technology TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- Project features table
CREATE TABLE IF NOT EXISTS project_features (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  feature TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- Project team members table
CREATE TABLE IF NOT EXISTS project_team_members (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  member_name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- Project gallery table
CREATE TABLE IF NOT EXISTS project_gallery (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  image_url TEXT NOT NULL,
  display_order INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- Project sections table
CREATE TABLE IF NOT EXISTS project_sections (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  section_title TEXT NOT NULL,
  section_content TEXT NOT NULL,
  display_order INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);
`);

console.log('Schema created successfully!');
console.log(`Database file: ${dbPath}`);

db.close(); 