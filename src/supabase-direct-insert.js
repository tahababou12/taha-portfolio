// Direct Supabase insert script for the browser
import { supabase } from './lib/supabase';

// Sample project data
const projects = [
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
    role: "Founder & Lead Developer"
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
    role: "Lead Developer"
  }
];

// Function to insert projects directly
export async function insertProjects() {
  try {
    console.log('Starting to insert projects directly...');
    
    // Insert projects
    const { data, error } = await supabase
      .from('projects')
      .insert(projects)
      .select();
    
    if (error) throw error;
    
    console.log('Successfully inserted projects:', data);
    return data;
  } catch (error) {
    console.error('Error inserting projects:', error);
    throw error;
  }
}

// Function to insert a project with all related data
export async function insertProjectWithRelations(project) {
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
      const techData = project.technologies.map(tech => ({
        project_id: projectId,
        technology: tech
      }));
      
      const { error: techError } = await supabase
        .from('project_technologies')
        .insert(techData);
      
      if (techError) throw techError;
    }
    
    // Insert features
    if (project.features && project.features.length > 0) {
      const featureData = project.features.map(feature => ({
        project_id: projectId,
        feature: feature
      }));
      
      const { error: featureError } = await supabase
        .from('project_features')
        .insert(featureData);
      
      if (featureError) throw featureError;
    }
    
    // Insert team members
    if (project.team && project.team.length > 0) {
      const teamData = project.team.map(member => ({
        project_id: projectId,
        member_name: member
      }));
      
      const { error: teamError } = await supabase
        .from('project_team_members')
        .insert(teamData);
      
      if (teamError) throw teamError;
    }
    
    // Insert gallery images
    if (project.gallery && project.gallery.length > 0) {
      const galleryData = project.gallery.map((image, index) => ({
        project_id: projectId,
        image_url: image,
        display_order: index
      }));
      
      const { error: galleryError } = await supabase
        .from('project_gallery')
        .insert(galleryData);
      
      if (galleryError) throw galleryError;
    }
    
    return projectId;
  } catch (error) {
    console.error(`Error inserting project ${project.title}:`, error);
    throw error;
  }
}
