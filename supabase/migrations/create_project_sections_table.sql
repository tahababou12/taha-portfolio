/*
  # Create project_sections table

  1. New Tables
    - `project_sections`
      - `id` (uuid, primary key)
      - `project_id` (uuid, foreign key to projects)
      - `section_title` (text)
      - `section_content` (text)
      - `display_order` (integer)
      - `created_at` (timestamp)
  2. Security
    - Enable RLS on `project_sections` table
    - Add policy for public read access
*/

CREATE TABLE IF NOT EXISTS project_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  section_title text NOT NULL,
  section_content text NOT NULL,
  display_order integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE project_sections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to project_sections"
  ON project_sections
  FOR SELECT
  TO anon
  USING (true); 