/*
  # Create project_features table

  1. New Tables
    - `project_features`
      - `id` (uuid, primary key)
      - `project_id` (uuid, foreign key to projects)
      - `feature` (text)
      - `created_at` (timestamp)
  2. Security
    - Enable RLS on `project_features` table
    - Add policy for public read access
*/

CREATE TABLE IF NOT EXISTS project_features (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  feature text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE project_features ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to project_features"
  ON project_features
  FOR SELECT
  TO anon
  USING (true);
