/**
 * Script to set up the awards schema in the local database
 * 
 * Usage: node db/scripts/setup-awards-schema.cjs
 */

const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

// Initialize local database
const dbPath = path.join(__dirname, '..', 'local.db');
const localDb = new Database(dbPath);

// Enable foreign keys
localDb.pragma('foreign_keys = ON');

console.log('Setting up awards schema in local database...');

// Begin transaction
const transaction = localDb.transaction(() => {
  // Create awards table if it doesn't exist
  localDb.prepare(`
    CREATE TABLE IF NOT EXISTS awards (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      organization TEXT NOT NULL,
      description TEXT NOT NULL,
      image TEXT,
      year TEXT,
      full_description TEXT,
      link TEXT,
      certificate_url TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      display_order INTEGER DEFAULT 0
    )
  `).run();

  console.log('Created or updated awards table');

  // Create award_gallery table if it doesn't exist
  localDb.prepare(`
    CREATE TABLE IF NOT EXISTS award_gallery (
      id TEXT PRIMARY KEY,
      award_id TEXT NOT NULL,
      image_url TEXT NOT NULL,
      display_order INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (award_id) REFERENCES awards(id) ON DELETE CASCADE
    )
  `).run();

  console.log('Created or updated award_gallery table');
});

// Execute transaction
transaction();

console.log('Awards schema setup completed!');

// Close local database
localDb.close(); 