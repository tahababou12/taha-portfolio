/*
  # Create projects table

  1. New Tables
    - `projects`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `category` (text)
      - `image` (text)
      - `link` (text)
      - `github` (text)
      - `live_demo` (text)
      - `long_description` (text)
      - `year` (text)
      - `role` (text)
      - `created_at` (timestamp)
  2. Security
    - Enable RLS on `projects` table
    - Add policy for public read access
*/

CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  image text NOT NULL,
  link text NOT NULL,
  github text,
  live_demo text,
  long_description text,
  year text,
  role text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to projects"
  ON projects
  FOR SELECT
  TO anon
  USING (true);
