/*
  # Create project_gallery table

  1. New Tables
    - `project_gallery`
      - `id` (uuid, primary key)
      - `project_id` (uuid, foreign key to projects)
      - `image_url` (text)
      - `display_order` (integer)
      - `created_at` (timestamp)
  2. Security
    - Enable RLS on `project_gallery` table
    - Add policy for public read access
*/

CREATE TABLE IF NOT EXISTS project_gallery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  display_order integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE project_gallery ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to project_gallery"
  ON project_gallery
  FOR SELECT
  TO anon
  USING (true);
