import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Project } from '../types/project'
import { getProjectSlug } from '../utils/slug'

interface Technology {
  technology: string;
}

interface Feature {
  feature: string;
}

interface TeamMember {
  member_name: string;
}

interface GalleryImage {
  image_url: string;
}

const ProjectsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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

  // Fetch projects and related data from Supabase
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        
        // Fetch all projects
        const { data: projectsData, error: projectsError } = await supabase
          .from('projects')
          .select('*');
        
        if (projectsError) throw projectsError;
        
        // For each project, fetch related data
        const projectsWithRelations = await Promise.all(
          projectsData.map(async (project: Project) => {
            // Fetch technologies
            const { data: technologiesData } = await supabase
              .from('project_technologies')
              .select('technology')
              .eq('project_id', project.id);
            
            // Fetch features
            const { data: featuresData } = await supabase
              .from('project_features')
              .select('feature')
              .eq('project_id', project.id);
            
            // Fetch team members
            const { data: teamData } = await supabase
              .from('project_team_members')
              .select('member_name')
              .eq('project_id', project.id);
            
            // Fetch gallery images
            const { data: galleryData } = await supabase
              .from('project_gallery')
              .select('image_url')
              .eq('project_id', project.id)
              .order('display_order', { ascending: true });
            
            return {
              ...project,
              technologies: technologiesData?.map((t: Technology) => t.technology) || [],
              features: featuresData?.map((f: Feature) => f.feature) || [],
              team: teamData?.map((m: TeamMember) => m.member_name) || [],
              gallery: galleryData?.map((g: GalleryImage) => g.image_url) || [],
            };
          })
        );
        
        setProjects(projectsWithRelations);
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

  // Extract all unique categories, including those that are comma-separated
  const getAllCategories = () => {
    const categorySet = new Set<string>();
    
    projects.forEach(project => {
      if (project.category) {
        const categories = project.category.split(',');
        categories.forEach(category => {
          categorySet.add(category.trim());
        });
      }
    });
    
    return Array.from(categorySet);
  };
  
  // Get unique categories to populate filter buttons
  const uniqueCategories = getAllCategories();
  
  // Group projects by category, handling comma-separated categories
  const projectsByCategory: Record<string, Project[]> = {};
  
  uniqueCategories.forEach(category => {
    projectsByCategory[category.toLowerCase()] = projects.filter(p => 
      p.category && p.category.split(',').map(c => c.trim().toLowerCase()).includes(category.toLowerCase())
    );
  });
  
  // Get categories for filter buttons, ensuring 'all' is first
  const categories = ['all', ...uniqueCategories];

  // Filter projects based on active filter, accounting for comma-separated categories
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => 
        project.category && 
        project.category.split(',').map(c => c.trim().toLowerCase()).includes(activeFilter.toLowerCase())
      );

  // Get page title based on active filter
  const getPageTitle = () => {
    if (activeFilter === 'all') return 'All Projects';
    return `${activeFilter} Projects`;
  };

  // Render project card with link to detail page
  const renderProjectCard = (project: Project) => (
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
            <div className="flex flex-wrap gap-1">
              {project.category?.split(',').map((cat, i) => (
                <span key={i} className="text-xs bg-gray-800 text-gray-200 px-2 py-1 rounded-md">
                  {cat.trim()}
                </span>
              ))}
            </div>
            <span className="text-white text-sm underline">
              View Details
            </span>
          </div>
        </div>
      </div>
    </Link>
  );

  if (loading) {
    return (
      <div className="px-4 sm:px-8 flex items-center justify-center min-h-[70vh]">
        <div className="animate-pulse text-xl">Loading projects...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 sm:px-8 flex flex-col items-center justify-center min-h-[70vh]">
        <div className="text-red-500 mb-4">{error}</div>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-8">
      <div className="flex items-center mb-6">
        <Link to="/" className="text-gray-400 hover:text-white mr-4">
          ← Back
        </Link>
        <h1 className="text-3xl sm:text-4xl font-normal">{getPageTitle()}</h1>
      </div>

      {/* Filter Navigation */}
      <div className="mb-12 overflow-x-auto">
        <div className="flex space-x-2 pb-2 min-w-max">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 rounded-md text-sm transition-colors ${
                activeFilter === category
                  ? 'bg-gray-800 text-white border border-gray-600 font-medium'
                  : 'text-gray-400 hover:text-white hover:bg-gray-900'
              }`}
            >
              {category === 'all' ? 'All' : category}
            </button>
          ))}
        </div>
      </div>

      {/* Show all projects in their categories when "all" is selected */}
      {activeFilter === 'all' ? (
        <>
          {Object.entries(projectsByCategory).map(([category, categoryProjects]) => (
            categoryProjects.length > 0 && (
              <section key={category} className="mb-16">
                <h2 className="text-2xl font-normal mb-6 border-b border-gray-800 pb-2">
                  {category.charAt(0).toUpperCase() + category.slice(1)} Projects
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                  {categoryProjects.map(renderProjectCard)}
                </div>
              </section>
            )
          ))}
        </>
      ) : (
        // Show filtered projects when a specific category is selected
        <div className="mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {filteredProjects.map(renderProjectCard)}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProjectsPage
