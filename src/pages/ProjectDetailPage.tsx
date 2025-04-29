import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { Github } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { Project } from '../types/project'

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [prevProjectId, setPrevProjectId] = useState<string | null>(null)
  const [nextProjectId, setNextProjectId] = useState<string | null>(null)

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        
        // Fetch the project
        const { data: projectData, error: projectError } = await supabase
          .from('projects')
          .select('*')
          .eq('id', id)
          .single();
        
        if (projectError) throw projectError;
        if (!projectData) throw new Error('Project not found');
        
        // Fetch technologies
        const { data: technologiesData } = await supabase
          .from('project_technologies')
          .select('technology')
          .eq('project_id', id);
        
        // Fetch features
        const { data: featuresData } = await supabase
          .from('project_features')
          .select('feature')
          .eq('project_id', id);
        
        // Fetch team members
        const { data: teamData } = await supabase
          .from('project_team_members')
          .select('member_name')
          .eq('project_id', id);
        
        // Fetch gallery images
        const { data: galleryData } = await supabase
          .from('project_gallery')
          .select('image_url')
          .eq('project_id', id)
          .order('display_order', { ascending: true });
        
        // Combine all data
        const fullProject = {
          ...projectData,
          technologies: technologiesData?.map(t => t.technology) || [],
          features: featuresData?.map(f => f.feature) || [],
          team: teamData?.map(t => t.member_name) || [],
          gallery: galleryData?.map(g => g.image_url) || [],
        };
        
        setProject(fullProject);
        
        // Fetch previous and next project IDs for navigation
        const { data: allProjects } = await supabase
          .from('projects')
          .select('id')
          .order('created_at', { ascending: true });
        
        if (allProjects && allProjects.length > 0) {
          const currentIndex = allProjects.findIndex(p => p.id === id);
          
          if (currentIndex > 0) {
            setPrevProjectId(allProjects[currentIndex - 1].id);
          } else {
            setPrevProjectId(null);
          }
          
          if (currentIndex < allProjects.length - 1) {
            setNextProjectId(allProjects[currentIndex + 1].id);
          } else {
            setNextProjectId(null);
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
  }, [id]);

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
      <div className="mb-12 rounded-lg overflow-hidden">
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
          <h2 className="text-2xl font-normal mb-6 border-b border-gray-800 pb-2">Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {project.gallery.slice(1).map((image, index) => (
              <div key={index} className="rounded-lg overflow-hidden">
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
        {prevProjectId ? (
          <Link 
            to={`/project/${prevProjectId}`} 
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
        
        {nextProjectId ? (
          <Link 
            to={`/project/${nextProjectId}`} 
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
    </div>
  )
}

export default ProjectDetailPage
