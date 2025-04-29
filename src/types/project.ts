export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  link: string;
  github?: string;
  live_demo?: string;
  long_description?: string;
  year?: string;
  role?: string;
  created_at?: string;
  technologies?: string[];
  features?: string[];
  team?: string[];
  gallery?: string[];
}
