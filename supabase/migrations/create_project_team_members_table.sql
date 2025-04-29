/*
  # Create project_team_members table

  1. New Tables
    - `project_team_members`
      - `id` (uuid, primary key)
      - `project_id` (uuid, foreign key to projects)
      - `member_name` (text)
      - `created_at` (timestamp)
  2. Security
    - Enable RLS on `project_team_members` table
    - Add policy for public read access
*/

CREATE TABLE IF NOT EXISTS project_team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  member_name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE project_team_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to project_team_members"
  ON project_team_members
  FOR SELECT
  TO anon
  USING (true);
