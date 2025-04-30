import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Project } from '../types/project'
import HeroGraphic from '../components/HeroGraphic'
import { getProjectSlug } from '../utils/slug'

interface GalleryImage {
  image_url: string;
}

const HomePage: React.FC = () => {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalProjects, setTotalProjects] = useState(0);
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
  
  // Handle card hover for desktop
  const handleCardHover = (projectId: string | null) => {
    setHoveredProjectId(projectId);
  };

  // Reset hovered state when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.project-card')) {
        setHoveredProjectId(null);
      }
    };
    
    document.addEventListener('click', handleOutsideClick);
    
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        
        // Fetch featured projects using the new featured flag and order
        const { data: projectsData, error: projectsError } = await supabase
          .from('projects')
          .select('*')
          .eq('featured', true)
          .order('featured_order', { ascending: true })
          .limit(12); // Increased limit to accommodate more featured projects
        
        if (projectsError) throw projectsError;
        
        // For each project, fetch gallery images
        const projectsWithGallery = await Promise.all(
          projectsData.map(async (project: Project) => {
            // Fetch gallery images
            const { data: galleryData } = await supabase
              .from('project_gallery')
              .select('image_url')
              .eq('project_id', project.id)
              .order('display_order', { ascending: true });
            
            return {
              ...project,
              gallery: galleryData?.map((g: GalleryImage) => g.image_url) || [],
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
            Taha Ababou <span className="text-gray-500">is a Full-Stack Software & Machine Learning Engineer building</span> <span className="text-white cursor-pointer">AI-driven applications</span>.
          </h1>
          
          <div className="mt-8 max-w-2xl">
            <p className="text-xl sm:text-2xl font-normal text-gray-500">
              He builds AI-powered applications and data systems. Machine learning and software engineering is his jam. Past: <span className="text-white cursor-pointer">Fidelity Investments</span>, <span className="text-white cursor-pointer">Local</span>, <span className="text-white cursor-pointer">The Society of Scent</span>, <span className="text-white cursor-pointer">Bank of Africa</span>.
            </p>
          </div>
          
          <div className="mt-8 space-y-2">
            <p className="text-lg sm:text-xl text-gray-500">
              See his <a href="https://github.com/tahababou12" target="_blank" rel="noopener noreferrer" className="text-white underline">GitHub</a>
            </p>
            <p className="text-lg sm:text-xl">
              <a href="https://bragai.dev" target="_blank" rel="noopener noreferrer" className="text-white underline">BragAI</a>
              <span className="text-gray-500"> - Launching soon!</span>
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
            <Link 
              key={project.id} 
              to={`/project/${getProjectSlug(project.title)}`}
              className="project-card aspect-square overflow-hidden relative group block cursor-pointer"
              onMouseEnter={() => handleCardHover(project.id)}
              onMouseLeave={() => handleCardHover(null)}
            >
              <img 
                src={project.gallery && project.gallery.length > 0 ? project.gallery[0] : project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Overlay that appears on hover or when tapped on mobile */}
              <div className={`absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 transition-opacity duration-300 flex flex-col justify-between p-6 ${
                hoveredProjectId === project.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}>
                {/* Top section with title */}
                <div>
                  <h3 className="text-white text-2xl sm:text-3xl font-medium drop-shadow-md">
                    {project.title}
                  </h3>
                </div>

                {/* Bottom section with description and category */}
                <div className="space-y-2">
                  <p className="text-white text-base sm:text-lg drop-shadow-md">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm bg-gray-800/80 text-gray-200 px-2 py-1 rounded">
                      {project.category}
                    </span>
                    <span className="text-white text-sm underline">
                      View Details
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default HomePage
