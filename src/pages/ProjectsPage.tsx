import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Project } from '../types/project'

const ProjectsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
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
          projectsData.map(async (project) => {
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
              technologies: technologiesData?.map(t => t.technology) || [],
              features: featuresData?.map(f => f.feature) || [],
              team: teamData?.map(t => t.member_name) || [],
              gallery: galleryData?.map(g => g.image_url) || [],
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

  // Group projects by category
  const projectsByCategory = {
    featured: projects.filter(p => p.category === 'Featured'),
    personal: projects.filter(p => p.category === 'Personal'),
    games: projects.filter(p => p.category === 'Game'),
    papers: projects.filter(p => p.category === 'Research')
  };

  // Get unique categories
  const categories = ['all', ...new Set(projects.map(project => project.category))];

  // Filter projects based on active filter
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  // Awards and programs (static data for now)
  const awards = [
    {
      title: "HackPrinceton Spring 2025",
      description: "Best Game Award"
    },
    {
      title: "Harvard University MakeHarvard Hardware Hackathon",
      description: "Most Interactive Design Award"
    },
    {
      title: "BU ECE Shark Tank Winner",
      link: "https://github.com/PharmaML"
    }
  ];

  const programs = [
    "BU Innovation Pathway",
    "BU First Year Innovation Fellowship"
  ];

  // Get page title based on active filter
  const getPageTitle = () => {
    if (activeFilter === 'all') return 'All Projects';
    return `${activeFilter} Projects`;
  };

  // Render project card with link to detail page
  const renderProjectCard = (project: Project) => (
    <Link 
      key={project.id} 
      to={`/project/${project.id}`}
      className="aspect-square overflow-hidden relative group block cursor-pointer"
    >
      <img 
        src={project.gallery && project.gallery.length > 0 ? project.gallery[0] : project.image} 
        alt={project.title} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-white text-lg sm:text-xl font-medium">{project.title}</h3>
          <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
            {project.category}
          </span>
        </div>
        <p className="text-gray-300 text-xs sm:text-sm mb-4">{project.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-white underline text-xs sm:text-sm">
            View Details
          </span>
          <a 
            href={project.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-white underline text-xs sm:text-sm"
            onClick={(e) => e.stopPropagation()}
          >
            View Project
          </a>
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
              {category.charAt(0).toUpperCase() + category.slice(1)}
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

          <section className="mb-16">
            <h2 className="text-2xl font-normal mb-6 border-b border-gray-800 pb-2">Awards & Competitions</h2>
            <ul className="space-y-3">
              {awards.map((award, index) => (
                <li key={index} className="bg-gray-900 p-4 rounded-lg">
                  <h3 className="font-medium">{award.title}</h3>
                  <p className="text-gray-400">{award.description}</p>
                  {award.link && (
                    <a 
                      href={award.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white underline text-sm mt-1 inline-block"
                    >
                      View Project
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-normal mb-6 border-b border-gray-800 pb-2">Entrepreneurship Programs</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              {programs.map((program, index) => (
                <li key={index}>{program}</li>
              ))}
            </ul>
          </section>
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
