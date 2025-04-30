import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ExternalLink, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Github } from 'lucide-react'
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

const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [prevProject, setPrevProject] = useState<{id: string, title: string} | null>(null)
  const [nextProject, setNextProject] = useState<{id: string, title: string} | null>(null)
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Gallery navigation functions
  const openGallery = (index: number) => {
    setCurrentImageIndex(index);
    setGalleryOpen(true);
    // Prevent scrolling when gallery is open
    document.body.style.overflow = 'hidden';
  };

  const closeGallery = () => {
    setGalleryOpen(false);
    // Restore scrolling
    document.body.style.overflow = 'auto';
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!project?.gallery) return;
    setCurrentImageIndex((prev) => (prev + 1) % project.gallery!.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!project?.gallery) return;
    setCurrentImageIndex((prev) => (prev - 1 + project.gallery!.length) % project.gallery!.length);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!galleryOpen || !project?.gallery) return;
      
      if (e.key === 'Escape') {
        closeGallery();
      } else if (e.key === 'ArrowRight') {
        setCurrentImageIndex((prev) => (prev + 1) % project.gallery!.length);
      } else if (e.key === 'ArrowLeft') {
        setCurrentImageIndex((prev) => (prev - 1 + project.gallery!.length) % project.gallery!.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [galleryOpen, project]);

  useEffect(() => {
    const fetchProject = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        
        // Fetch all projects to find by slug
        const { data: projectsData, error: projectsError } = await supabase
          .from('projects')
          .select('*');
        
        if (projectsError) throw projectsError;
        
        // Find the project with matching slug
        const matchingProject = projectsData.find(
          (p: Project) => getProjectSlug(p.title) === slug
        );
        
        if (!matchingProject) throw new Error('Project not found');
        
        const projectId = matchingProject.id;
        
        // Fetch technologies
        const { data: technologiesData } = await supabase
          .from('project_technologies')
          .select('technology')
          .eq('project_id', projectId);
        
        // Fetch features
        const { data: featuresData } = await supabase
          .from('project_features')
          .select('feature')
          .eq('project_id', projectId);
        
        // Fetch team members
        const { data: teamData } = await supabase
          .from('project_team_members')
          .select('member_name')
          .eq('project_id', projectId);
        
        // Fetch gallery images
        const { data: galleryData } = await supabase
          .from('project_gallery')
          .select('image_url')
          .eq('project_id', projectId)
          .order('display_order', { ascending: true });
        
        // Fetch project sections
        const { data: sectionsData } = await supabase
          .from('project_sections')
          .select('*')
          .eq('project_id', projectId)
          .order('display_order', { ascending: true });
        
        // Combine all data
        const fullProject = {
          ...matchingProject,
          technologies: technologiesData?.map((t: Technology) => t.technology) || [],
          features: featuresData?.map((f: Feature) => f.feature) || [],
          team: teamData?.map((m: TeamMember) => m.member_name) || [],
          gallery: galleryData?.map((g: GalleryImage) => g.image_url) || [],
          sections: sectionsData || [],
        };
        
        setProject(fullProject);
        
        // Find previous and next projects for navigation
        if (projectsData && projectsData.length > 0) {
          // Sort projects by created_at
          const sortedProjects = [...projectsData].sort((a: Project, b: Project) => 
            new Date(a.created_at || '').getTime() - new Date(b.created_at || '').getTime()
          );
          
          const currentIndex = sortedProjects.findIndex((p: Project) => p.id === projectId);
          
          if (currentIndex > 0) {
            const prev = sortedProjects[currentIndex - 1];
            setPrevProject({
              id: prev.id,
              title: prev.title
            });
          } else {
            setPrevProject(null);
          }
          
          if (currentIndex < sortedProjects.length - 1) {
            const next = sortedProjects[currentIndex + 1];
            setNextProject({
              id: next.id,
              title: next.title
            });
          } else {
            setNextProject(null);
          }
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching project:', err);
        setError('Failed to load project details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="px-4 sm:px-8 flex items-center justify-center min-h-[70vh]">
        <div className="animate-pulse text-xl">Loading project...</div>
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="px-4 sm:px-8 flex flex-col items-center justify-center min-h-[70vh]">
        <h1 className="text-2xl mb-4">Project not found</h1>
        <p className="text-gray-400 mb-6">{error || 'The project you\'re looking for doesn\'t exist or has been removed.'}</p>
        <Link to="/projects" className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-colors">
          Back to Projects
        </Link>
      </div>
    )
  }

  return (
    <div className="px-4 sm:px-8">
      {/* Back button */}
      <div className="mb-8">
        <Link to="/projects" className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
          <ArrowLeft size={20} className="mr-2" />
          Back to Projects
        </Link>
      </div>

      {/* Project header */}
      <div className="mb-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <h1 className="text-3xl sm:text-4xl font-normal mb-2 md:mb-0">{project.title}</h1>
          <span className="inline-block bg-gray-800 text-gray-200 px-3 py-1 rounded-md text-sm">
            {project.category}
          </span>
        </div>
        <p className="text-xl text-gray-300">{project.description}</p>
      </div>

      {/* Hero image - using the first gallery image */}
      <div className="mb-12 rounded-lg overflow-hidden cursor-pointer" onClick={() => project.gallery && project.gallery.length > 0 && openGallery(0)}>
        <img 
          src={project.gallery && project.gallery.length > 0 ? project.gallery[0] : project.image} 
          alt={project.title} 
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Project links */}
      <div className="flex flex-wrap gap-4 mb-12">
        {project.github && (
          <a 
            href={project.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            <Github size={18} className="mr-2" />
            View on GitHub
          </a>
        )}
        {project.live_demo && (
          <a 
            href={project.live_demo} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            <ExternalLink size={18} className="mr-2" />
            Live Demo
          </a>
        )}
      </div>

      {/* Project details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-normal mb-4 border-b border-gray-800 pb-2">About the Project</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            {project.long_description}
          </p>

          {/* Project Sections */}
          {project.sections && project.sections.length > 0 && (
            <div className="space-y-8 mb-8">
              {project.sections.map((section) => (
                <div key={section.id} className="project-section">
                  <h3 className="text-xl font-normal mb-4">{section.section_title}</h3>
                  <p className="text-gray-300 leading-relaxed">{section.section_content}</p>
                </div>
              ))}
            </div>
          )}

          {project.features && project.features.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-normal mb-4">Key Features</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                {project.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-normal mb-4 border-b border-gray-800 pb-2">Project Details</h2>
          
          <div className="space-y-4">
            {project.technologies && project.technologies.length > 0 && (
              <div>
                <h3 className="text-lg font-medium mb-2">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="bg-gray-900 text-gray-300 px-3 py-1 rounded-md text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {project.year && (
              <div>
                <h3 className="text-lg font-medium mb-2">Year</h3>
                <p className="text-gray-300">{project.year}</p>
              </div>
            )}

            {project.role && (
              <div>
                <h3 className="text-lg font-medium mb-2">My Role</h3>
                <p className="text-gray-300">{project.role}</p>
              </div>
            )}

            {project.team && project.team.length > 0 && (
              <div>
                <h3 className="text-lg font-medium mb-2">Team</h3>
                <ul className="list-disc list-inside text-gray-300">
                  {project.team.map((member, index) => (
                    <li key={index}>{member}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Project gallery - showing additional images (skipping the first one which is used as hero) */}
      {project.gallery && project.gallery.length > 1 && (
        <div className="mb-12">
          <h2 className="text-2xl font-normal mb-6 border-b border-gray-800 pb-2"><span className="font-bold">{project.title}</span> Project Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {project.gallery.slice(1).map((image, index) => (
              <div 
                key={index} 
                className="rounded-lg overflow-hidden cursor-pointer" 
                onClick={() => openGallery(index + 1)}
              >
                <img 
                  src={image} 
                  alt={`${project.title} gallery ${index + 1}`} 
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Next/Previous project navigation */}
      <div className="flex justify-between items-center border-t border-gray-800 pt-8 mt-12">
        {prevProject ? (
          <Link 
            to={`/project/${getProjectSlug(prevProject.title)}`} 
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Previous Project
          </Link>
        ) : (
          <span className="text-gray-600 pointer-events-none inline-flex items-center">
            <ArrowLeft size={20} className="mr-2" />
            Previous Project
          </span>
        )}
        
        {nextProject ? (
          <Link 
            to={`/project/${getProjectSlug(nextProject.title)}`} 
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
          >
            Next Project
            <ArrowLeft size={20} className="ml-2 transform rotate-180" />
          </Link>
        ) : (
          <span className="text-gray-600 pointer-events-none inline-flex items-center">
            Next Project
            <ArrowLeft size={20} className="ml-2 transform rotate-180" />
          </span>
        )}
      </div>

      {/* Gallery Modal */}
      {galleryOpen && project.gallery && (
        <div 
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
          onClick={closeGallery}
        >
          <div className="absolute top-4 right-4 z-10">
            <button 
              className="text-white bg-gray-800 rounded-full p-2 hover:bg-gray-700 transition-colors"
              onClick={closeGallery}
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="absolute left-4 z-10">
            <button 
              className="text-white bg-gray-800 rounded-full p-2 hover:bg-gray-700 transition-colors"
              onClick={prevImage}
            >
              <ChevronLeft size={24} />
            </button>
          </div>
          
          <div className="absolute right-4 z-10">
            <button 
              className="text-white bg-gray-800 rounded-full p-2 hover:bg-gray-700 transition-colors"
              onClick={nextImage}
            >
              <ChevronRight size={24} />
            </button>
          </div>
          
          <div className="w-full max-w-4xl max-h-[80vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img 
              src={project.gallery[currentImageIndex]} 
              alt={`${project.title} gallery ${currentImageIndex + 1}`}
              className="max-w-full max-h-[80vh] object-contain"
            />
          </div>
          
          <div className="absolute bottom-4 text-center text-white">
            {currentImageIndex + 1} / {project.gallery.length}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProjectDetailPage
