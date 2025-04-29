-- Create the awards table
CREATE TABLE IF NOT EXISTS public.awards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  organization TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT,
  year TEXT,
  full_description TEXT,
  link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create the award gallery table
CREATE TABLE IF NOT EXISTS public.award_gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  award_id UUID NOT NULL REFERENCES public.awards(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  display_order INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Set up RLS policies
ALTER TABLE public.awards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.award_gallery ENABLE ROW LEVEL SECURITY;

-- Create policies for the awards table
CREATE POLICY "Allow anonymous read access to awards" 
  ON public.awards 
  FOR SELECT 
  TO anon 
  USING (true);

CREATE POLICY "Allow authenticated users to manage awards" 
  ON public.awards 
  FOR ALL 
  TO authenticated 
  USING (true) 
  WITH CHECK (true);

-- Create policies for the award_gallery table
CREATE POLICY "Allow anonymous read access to award gallery" 
  ON public.award_gallery 
  FOR SELECT 
  TO anon 
  USING (true);

CREATE POLICY "Allow authenticated users to manage award gallery" 
  ON public.award_gallery 
  FOR ALL 
  TO authenticated 
  USING (true) 
  WITH CHECK (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_award_gallery_award_id ON public.award_gallery(award_id);
