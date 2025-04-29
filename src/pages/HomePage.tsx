import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Project } from '../types/project'
import HeroGraphic from '../components/HeroGraphic'

const HomePage: React.FC = () => {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalProjects, setTotalProjects] = useState(0);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        
        // Fetch featured projects
        const { data: projectsData, error: projectsError } = await supabase
          .from('projects')
          .select('*')
          .eq('category', 'Featured')
          .order('created_at', { ascending: false })
          .limit(6);
        
        if (projectsError) throw projectsError;
        
        // For each project, fetch gallery images
        const projectsWithGallery = await Promise.all(
          projectsData.map(async (project) => {
            // Fetch gallery images
            const { data: galleryData } = await supabase
              .from('project_gallery')
              .select('image_url')
              .eq('project_id', project.id)
              .order('display_order', { ascending: true });
            
            return {
              ...project,
              gallery: galleryData?.map(g => g.image_url) || [],
            };
          })
        );
        
        setFeaturedProjects(projectsWithGallery);
        
        // Get total project count
        const { count } = await supabase
          .from('projects')
          .select('*', { count: 'exact', head: true });
        
        setTotalProjects(count || 0);
        setError(null);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="px-4 sm:px-8 flex items-center justify-center min-h-[50vh]">
        <div className="animate-pulse text-xl">Loading projects...</div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-8">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8 sm:mb-16">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-2xl sm:text-3xl font-normal">
            Taha Ababou <span className="text-gray-500">is a Machine Learning Engineer with</span> <a href="#" className="text-white">4 YoE</a>.
          </h1>
          
          <div className="mt-8 max-w-2xl">
            <p className="text-xl sm:text-2xl font-normal text-gray-500">
              He builds AI-powered applications and data systems. Machine learning and software engineering is his jam. Past: <a href="#" className="text-white">Fidelity Investments</a>, <a href="#" className="text-white">Local</a>, <a href="#" className="text-white">The Society of Scent</a>.
            </p>
          </div>
          
          <div className="mt-8 space-y-2">
            <p className="text-lg sm:text-xl text-gray-500">
              See his <a href="https://github.com/tahababou12" target="_blank" rel="noopener noreferrer" className="text-white underline">GitHub</a>
            </p>
            <p className="text-lg sm:text-xl">
              <a href="https://bragai.dev" target="_blank" rel="noopener noreferrer" className="text-white underline">BragAI</a> Project
            </p>
            <p className="text-lg sm:text-xl">
              <a href="https://github.com/bRAGAI/bRAG-langchain" target="_blank" rel="noopener noreferrer" className="text-white underline">Open-Source</a> Contributions
            </p>
          </div>
        </div>
        
        <div className="md:w-1/2 flex justify-center md:justify-end">
          <div className="w-full max-w-md">
            <HeroGraphic followScroll={true} />
          </div>
        </div>
      </div>

      {/* Floating 3D graphic that follows scroll */}
      <div className="fixed bottom-10 right-10 w-32 h-32 z-10 pointer-events-none hidden md:block">
        <HeroGraphic followScroll={true} />
      </div>

      <div className="flex justify-between items-center mb-6 mt-16">
        <h2 className="text-2xl font-normal">Featured Projects</h2>
        <Link to="/projects" className="text-white border border-gray-700 px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
          View All ({totalProjects})
        </Link>
      </div>

      {error ? (
        <div className="text-red-500 mb-4">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {featuredProjects.map((project) => (
            <div key={project.id} className="aspect-square overflow-hidden relative group">
              <img 
                src={project.gallery && project.gallery.length > 0 ? project.gallery[0] : project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <h3 className="text-white text-lg sm:text-xl font-medium">{project.title}</h3>
                <p className="text-gray-300 text-xs sm:text-sm mb-4">{project.description}</p>
                <div className="flex justify-between items-center">
                  <Link to={`/project/${project.id}`} className="text-white underline text-xs sm:text-sm">
                    View Details
                  </Link>
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-white underline text-xs sm:text-sm">
                    View Project
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default HomePage
