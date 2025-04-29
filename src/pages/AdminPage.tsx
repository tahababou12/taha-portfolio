import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Project } from '../types/project'

// Sample project data
const sampleProjects = [
  {
    title: "BragAI",
    description: "AI-powered app generator with 3K+ waitlist",
    category: "Featured",
    image: "https://images.unsplash.com/photo-1555952517-2e8e729e0b44?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    link: "https://bragai.dev",
    github: "https://github.com/BragAI/bragai",
    live_demo: "https://bragai.dev",
    long_description: "BragAI is an AI-powered development platform that allows anyone — regardless of technical skill — to build web apps and mobile apps simply using natural language and images. It combines intuitive project scaffolding with real-time code generation, one-click deployments, error recovery referencing official docs, and a 'developer co-pilot' that can even live code with users when needed.",
    year: "2023-Present",
    role: "Founder & Lead Developer",
    technologies: ["React", "Node.js", "TypeScript", "Claude API", "RAG", "Supabase", "Vercel"],
    features: [
      "Natural language app generation",
      "Real-time code generation",
      "One-click deployments",
      "Error recovery with official docs",
      "Developer co-pilot mode"
    ],
    team: ["Taha Ababou"],
    gallery: [
      "https://images.unsplash.com/photo-1555952517-2e8e729e0b44?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551033406-611cf9a28f67?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    title: "CoCo",
    description: "AI CoComposer - HackPrinceton Winner",
    category: "Featured",
    image: "https://images.unsplash.com/photo-1561736778-92e52a7769ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    link: "https://github.com/mohulshukla/CoCo",
    github: "https://github.com/mohulshukla/CoCo",
    long_description: "CoCo is a collaborative drawing platform with MediaPipe hand-tracking, React/TypeScript canvas rendering, and Google Gemini AI integration for sketch enhancement and automated video story generation. The project won the HackPrinceton Spring 2025 hackathon.",
    year: "2025",
    role: "Lead Developer",
    technologies: ["React", "TypeScript", "MediaPipe", "Google Gemini API", "Canvas API"],
    features: [
      "Real-time hand tracking",
      "Collaborative drawing",
      "AI sketch enhancement",
      "Automated video story generation"
    ],
    team: ["Taha Ababou", "Team members"],
    gallery: [
      "https://images.unsplash.com/photo-1561736778-92e52a7769ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1617791160505-6f00504e3519?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ]
  }
];

const AdminPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Function to insert a project and its related data
  async function insertProject(project: any) {
    try {
      // Insert the main project
      const { data: projectData, error: projectError } = await supabase
        .from('projects')
        .insert({
          title: project.title,
          description: project.description,
          category: project.category,
          image: project.image,
          link: project.link,
          github: project.github,
          live_demo: project.live_demo,
          long_description: project.long_description,
          year: project.year,
          role: project.role
        })
        .select()
        .single();
      
      if (projectError) throw projectError;
      
      const projectId = projectData.id;
      console.log(`Inserted project: ${project.title} with ID: ${projectId}`);
      
      // Insert technologies
      if (project.technologies && project.technologies.length > 0) {
        const techData = project.technologies.map((tech: string) => ({
          project_id: projectId,
          technology: tech
        }));
        
        const { error: techError } = await supabase
          .from('project_technologies')
          .insert(techData);
        
        if (techError) throw techError;
        console.log(`Inserted ${techData.length} technologies for project: ${project.title}`);
      }
      
      // Insert features
      if (project.features && project.features.length > 0) {
        const featureData = project.features.map((feature: string) => ({
          project_id: projectId,
          feature: feature
        }));
        
        const { error: featureError } = await supabase
          .from('project_features')
          .insert(featureData);
        
        if (featureError) throw featureError;
        console.log(`Inserted ${featureData.length} features for project: ${project.title}`);
      }
      
      // Insert team members
      if (project.team && project.team.length > 0) {
        const teamData = project.team.map((member: string) => ({
          project_id: projectId,
          member_name: member
        }));
        
        const { error: teamError } = await supabase
          .from('project_team_members')
          .insert(teamData);
        
        if (teamError) throw teamError;
        console.log(`Inserted ${teamData.length} team members for project: ${project.title}`);
      }
      
      // Insert gallery images
      if (project.gallery && project.gallery.length > 0) {
        const galleryData = project.gallery.map((image: string, index: number) => ({
          project_id: projectId,
          image_url: image,
          display_order: index
        }));
        
        const { error: galleryError } = await supabase
          .from('project_gallery')
          .insert(galleryData);
        
        if (galleryError) throw galleryError;
        console.log(`Inserted ${galleryData.length} gallery images for project: ${project.title}`);
      }
      
      return projectId;
    } catch (error: any) {
      console.error(`Error inserting project ${project.title}:`, error);
      throw error;
    }
  }

  const handlePopulateDatabase = async () => {
    setLoading(true);
    setResult(null);
    setError(null);
    
    try {
      for (const project of sampleProjects) {
        await insertProject(project);
      }
      
      setResult('Successfully populated database with sample projects!');
    } catch (err: any) {
      console.error('Error populating database:', err);
      setError(err.message || 'An error occurred while populating the database.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 sm:px-8 mt-16 sm:mt-32 max-w-4xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-normal mb-8">Admin Dashboard</h1>
      
      <div className="bg-gray-900 p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-normal mb-4">Database Management</h2>
        <p className="text-gray-300 mb-6">
          Use this tool to populate your Supabase database with sample project data.
          This will create projects with all related data (technologies, features, team members, gallery images).
        </p>
        
        <button
          onClick={handlePopulateDatabase}
          disabled={loading}
          className={`px-4 py-2 rounded-md ${
            loading 
              ? 'bg-gray-700 cursor-not-allowed' 
              : 'bg-gray-800 hover:bg-gray-700'
          } text-white transition-colors`}
        >
          {loading ? 'Populating...' : 'Populate Database with Sample Projects'}
        </button>
        
        {result && (
          <div className="mt-4 p-3 bg-green-900 bg-opacity-30 border border-green-800 rounded-md text-green-400">
            {result}
          </div>
        )}
        
        {error && (
          <div className="mt-4 p-3 bg-red-900 bg-opacity-30 border border-red-800 rounded-md text-red-400">
            {error}
          </div>
        )}
      </div>
      
      <div className="bg-gray-900 p-6 rounded-lg">
        <h2 className="text-2xl font-normal mb-4">Sample Data</h2>
        <p className="text-gray-300 mb-4">
          The following sample projects will be added to your database:
        </p>
        
        <div className="space-y-4">
          {sampleProjects.map((project, index) => (
            <div key={index} className="border border-gray-800 p-4 rounded-md">
              <h3 className="font-medium">{project.title}</h3>
              <p className="text-gray-400 text-sm">{project.description}</p>
              <p className="text-gray-500 text-xs mt-1">Category: {project.category}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Add this new component for managing featured projects */}
      <FeaturedProjectsManager />
    </div>
  );
};

// Add this new component for managing featured projects
const FeaturedProjectsManager: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      
      // Fetch all projects
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('featured_order', { ascending: true, nullsLast: true });
      
      if (error) throw error;
      
      setProjects(data || []);
    } catch (err: any) {
      console.error('Error fetching projects:', err);
      setError(err.message || 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const toggleFeatured = async (projectId: string, featured: boolean) => {
    try {
      setResult(null);
      setError(null);
      
      // Update the featured flag
      const { error } = await supabase
        .from('projects')
        .update({ 
          featured,
          // If featuring, assign it the highest order number + 1
          featured_order: featured ? 
            Math.max(0, ...projects.filter(p => p.featured).map(p => p.featured_order || 0)) + 1 : 
            null
        })
        .eq('id', projectId);
      
      if (error) throw error;
      
      // Refresh the projects list
      await fetchProjects();
      setResult(`Project ${featured ? 'featured' : 'unfeatured'} successfully`);
    } catch (err: any) {
      console.error('Error updating project:', err);
      setError(err.message || 'Failed to update project');
    }
  };

  const moveProject = async (projectId: string, direction: 'up' | 'down') => {
    try {
      setResult(null);
      setError(null);
      
      // Find the current project
      const featuredProjects = projects.filter(p => p.featured).sort((a, b) => 
        (a.featured_order || 0) - (b.featured_order || 0)
      );
      
      const currentIndex = featuredProjects.findIndex(p => p.id === projectId);
      if (currentIndex === -1) return;
      
      let swapIndex: number;
      if (direction === 'up') {
        if (currentIndex === 0) return; // Already at the top
        swapIndex = currentIndex - 1;
      } else {
        if (currentIndex === featuredProjects.length - 1) return; // Already at the bottom
        swapIndex = currentIndex + 1;
      }
      
      const currentProject = featuredProjects[currentIndex];
      const swapProject = featuredProjects[swapIndex];
      
      // Swap the order
      const { error: error1 } = await supabase
        .from('projects')
        .update({ featured_order: swapProject.featured_order })
        .eq('id', currentProject.id);
      
      if (error1) throw error1;
      
      const { error: error2 } = await supabase
        .from('projects')
        .update({ featured_order: currentProject.featured_order })
        .eq('id', swapProject.id);
      
      if (error2) throw error2;
      
      // Refresh the projects list
      await fetchProjects();
      setResult(`Project moved ${direction} successfully`);
    } catch (err: any) {
      console.error('Error reordering projects:', err);
      setError(err.message || 'Failed to reorder projects');
    }
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg mb-8">
      <h2 className="text-2xl font-normal mb-4">Featured Projects Management</h2>
      <p className="text-gray-300 mb-6">
        Use this section to manage which projects are featured on the homepage and their display order.
      </p>
      
      {loading ? (
        <div className="text-gray-400">Loading projects...</div>
      ) : (
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-300">Project</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-300">Category</th>
                  <th className="px-4 py-2 text-center text-sm font-medium text-gray-300">Featured</th>
                  <th className="px-4 py-2 text-center text-sm font-medium text-gray-300">Order</th>
                  <th className="px-4 py-2 text-center text-sm font-medium text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {projects.map((project) => (
                  <tr key={project.id} className={project.featured ? "bg-gray-800/30" : ""}>
                    <td className="px-4 py-3 text-sm text-white">{project.title}</td>
                    <td className="px-4 py-3 text-sm text-gray-300">{project.category}</td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => toggleFeatured(project.id, !project.featured)}
                        className={`px-3 py-1 rounded text-xs ${
                          project.featured
                            ? "bg-green-900/50 text-green-400 hover:bg-green-900/70"
                            : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                        }`}
                      >
                        {project.featured ? "Featured" : "Not Featured"}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-center text-sm text-gray-300">
                      {project.featured_order !== null ? project.featured_order : '-'}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {project.featured && (
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => moveProject(project.id, 'up')}
                            className="p-1 rounded hover:bg-gray-700"
                            title="Move Up"
                          >
                            ↑
                          </button>
                          <button
                            onClick={() => moveProject(project.id, 'down')}
                            className="p-1 rounded hover:bg-gray-700"
                            title="Move Down"
                          >
                            ↓
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {result && (
            <div className="mt-4 p-3 bg-green-900 bg-opacity-30 border border-green-800 rounded-md text-green-400">
              {result}
            </div>
          )}
          
          {error && (
            <div className="mt-4 p-3 bg-red-900 bg-opacity-30 border border-red-800 rounded-md text-red-400">
              {error}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminPage;
