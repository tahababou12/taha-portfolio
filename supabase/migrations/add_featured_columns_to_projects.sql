/*
  # Add featured columns to projects table

  1. Updates to existing tables
    - `projects`
      - Add `featured` (boolean, default false)
      - Add `featured_order` (integer, nullable)
*/

ALTER TABLE projects
ADD COLUMN IF NOT EXISTS featured boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS featured_order integer DEFAULT NULL; 