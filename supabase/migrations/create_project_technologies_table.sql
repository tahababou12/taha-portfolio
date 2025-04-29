/*
  # Create project_technologies table

  1. New Tables
    - `project_technologies`
      - `id` (uuid, primary key)
      - `project_id` (uuid, foreign key to projects)
      - `technology` (text)
      - `created_at` (timestamp)
  2. Security
    - Enable RLS on `project_technologies` table
    - Add policy for public read access
*/

CREATE TABLE IF NOT EXISTS project_technologies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  technology text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE project_technologies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to project_technologies"
  ON project_technologies
  FOR SELECT
  TO anon
  USING (true);
