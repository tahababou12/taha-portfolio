-- Enable RLS on all tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_technologies ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_sections ENABLE ROW LEVEL SECURITY;

-- Create policies for anonymous read access
-- Projects table
DROP POLICY IF EXISTS "Allow anonymous read access" ON projects;
CREATE POLICY "Allow anonymous read access" 
ON projects FOR SELECT 
TO anon
USING (true);

-- Project technologies table
DROP POLICY IF EXISTS "Allow anonymous read access" ON project_technologies;
CREATE POLICY "Allow anonymous read access" 
ON project_technologies FOR SELECT 
TO anon
USING (true);

-- Project features table
DROP POLICY IF EXISTS "Allow anonymous read access" ON project_features;
CREATE POLICY "Allow anonymous read access" 
ON project_features FOR SELECT 
TO anon
USING (true);

-- Project team members table
DROP POLICY IF EXISTS "Allow anonymous read access" ON project_team_members;
CREATE POLICY "Allow anonymous read access" 
ON project_team_members FOR SELECT 
TO anon
USING (true);

-- Project gallery table
DROP POLICY IF EXISTS "Allow anonymous read access" ON project_gallery;
CREATE POLICY "Allow anonymous read access" 
ON project_gallery FOR SELECT 
TO anon
USING (true);

-- Project sections table
DROP POLICY IF EXISTS "Allow anonymous read access" ON project_sections;
CREATE POLICY "Allow anonymous read access" 
ON project_sections FOR SELECT 
TO anon
USING (true);

-- Optional: Create admin policies if needed
-- This allows authorized users to manage the data
-- Projects table (admin access)
DROP POLICY IF EXISTS "Allow admin access" ON projects;
CREATE POLICY "Allow admin access" 
ON projects
TO authenticated
USING (true)
WITH CHECK (true);

-- Project technologies table (admin access)
DROP POLICY IF EXISTS "Allow admin access" ON project_technologies;
CREATE POLICY "Allow admin access" 
ON project_technologies
TO authenticated
USING (true)
WITH CHECK (true);

-- Project features table (admin access)
DROP POLICY IF EXISTS "Allow admin access" ON project_features;
CREATE POLICY "Allow admin access" 
ON project_features
TO authenticated
USING (true)
WITH CHECK (true);

-- Project team members table (admin access)
DROP POLICY IF EXISTS "Allow admin access" ON project_team_members;
CREATE POLICY "Allow admin access" 
ON project_team_members
TO authenticated
USING (true)
WITH CHECK (true);

-- Project gallery table (admin access)
DROP POLICY IF EXISTS "Allow admin access" ON project_gallery;
CREATE POLICY "Allow admin access" 
ON project_gallery
TO authenticated
USING (true)
WITH CHECK (true);

-- Project sections table (admin access)
DROP POLICY IF EXISTS "Allow admin access" ON project_sections;
CREATE POLICY "Allow admin access" 
ON project_sections
TO authenticated
USING (true)
WITH CHECK (true); 