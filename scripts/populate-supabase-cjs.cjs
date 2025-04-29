// Script to populate Supabase with project data (CommonJS version)
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
  },
  {
    title: "EchoPath",
    description: "AI-Powered Blind Cane - MakeHarvard Winner",
    category: "Featured",
    image: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    link: "https://github.com/tahababou12/EchoPath",
    github: "https://github.com/tahababou12/EchoPath",
    long_description: "EchoPath is an AI-powered smart cane for visually impaired users that uses computer vision and haptic feedback to detect obstacles and provide navigation assistance. The project won the Most Interactive Design Award at the Harvard University MakeHarvard Hardware Hackathon.",
    year: "2025",
    role: "Hardware & AI Lead",
    technologies: ["Python", "TensorFlow", "Arduino", "Computer Vision", "Haptic Feedback"],
    features: [
      "Real-time obstacle detection",
      "Haptic feedback system",
      "Voice commands and notifications",
      "GPS integration",
      "Lightweight, portable design"
    ],
    team: ["Taha Ababou", "Team members"],
    gallery: [
      "https://images.unsplash.com/photo-1617791160505-6f00504e3519?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1611162616475-46b635cb6868?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1611996575749-79a3a250f948?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    title: "Open-Source RAG Framework",
    description: "2.8K+ GitHub Stars, LangChain Featured",
    category: "Featured",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    link: "https://github.com/bRAGAI/bRAG-langchain",
    github: "https://github.com/bRAGAI/bRAG-langchain",
    long_description: "Open-sourced a comprehensive framework called brag-langchain to explore RAG architectures at personal and enterprise scales. The project has gained over 2,800 GitHub stars and has been recognized by LangChain and multiple AI communities for its clarity, real-world examples, and versatility.",
    year: "2023",
    role: "Creator & Maintainer",
    technologies: ["Python", "LangChain", "Vector Databases", "LLMs", "Embeddings"],
    features: [
      "Document retrieval",
      "Context-based AI responses",
      "Enterprise-scale RAG architecture",
      "Comprehensive documentation",
      "Real-world examples"
    ],
    team: ["Taha Ababou"],
    gallery: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1611162616475-46b635cb6868?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    title: "RAFT for Code Generation",
    description: "Fine-tuned LLMs with 15% accuracy improvement",
    category: "Featured",
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    link: "https://github.com/BragAI/bragai-paper",
    github: "https://github.com/BragAI/bragai-paper",
    long_description: "Developed a Retrieval-Augmented Fine-Tuning (RAFT) approach for code generation models. By combining retrieval techniques with parameter-efficient fine-tuning methods like LoRA, we achieved a 15% improvement in inference accuracy on production datasets compared to baseline models.",
    year: "2023",
    role: "Lead Researcher",
    technologies: ["Python", "PyTorch", "Hugging Face", "LoRA", "RAG"],
    features: [
      "Parameter-efficient fine-tuning",
      "Retrieval-augmented generation",
      "Code-specific optimizations",
      "Production-ready deployment",
      "Comprehensive evaluation metrics"
    ],
    team: ["Taha Ababou", "Research collaborators"],
    gallery: [
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555952517-2e8e729e0b44?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    title: "RECOG",
    description: "Recognition system for computer vision",
    category: "Personal",
    image: "https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    link: "https://github.com/tahababou12/RECOG",
    github: "https://github.com/tahababou12/RECOG",
    long_description: "RECOG is a computer vision system designed for real-time object and facial recognition. It uses a combination of traditional CV techniques and modern deep learning approaches to achieve high accuracy with minimal computational resources.",
    year: "2023",
    role: "Developer",
    technologies: ["Python", "OpenCV", "TensorFlow", "PyTorch", "YOLO"],
    features: [
      "Real-time object detection",
      "Facial recognition",
      "Emotion analysis",
      "Low-latency processing",
      "Edge device compatibility"
    ],
    team: ["Taha Ababou"],
    gallery: [
      "https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1617791160505-6f00504e3519?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    title: "8Ball Pool",
    description: "Interactive pool game",
    category: "Game",
    image: "https://images.unsplash.com/photo-1611996575749-79a3a250f948?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    link: "https://github.com/tahababou12/8BallPool",
    github: "https://github.com/tahababou12/8BallPool",
    long_description: "A realistic 8-ball pool game built with JavaScript and HTML5 Canvas. Features accurate physics simulation, multiplayer capabilities, and customizable game settings.",
    year: "2022",
    role: "Developer",
    technologies: ["JavaScript", "HTML5 Canvas", "Physics Engine", "WebSockets"],
    features: [
      "Realistic physics",
      "Multiplayer mode",
      "Customizable tables and cues",
      "Tournament system",
      "Mobile-responsive design"
    ],
    team: ["Taha Ababou"],
    gallery: [
      "https://images.unsplash.com/photo-1611996575749-79a3a250f948?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1615751072497-5f5169febe17?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    title: "RAG Framework Paper",
    description: "Research on Retrieval-Augmented Generation",
    category: "Research",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    link: "https://github.com/BragAI/bragai-paper",
    github: "https://github.com/BragAI/bragai-paper",
    long_description: "Academic paper on Retrieval-Augmented Generation (RAG) framework fine-tuned using parameter-efficient methods (LoRA) for domain-specific applications. The paper explores novel approaches to combining retrieval mechanisms with generative models.",
    year: "2023",
    role: "Lead Author",
    technologies: ["Python", "PyTorch", "Hugging Face", "Vector Databases", "LLMs"],
    features: [
      "Novel RAG architecture",
      "Parameter-efficient fine-tuning",
      "Comprehensive evaluation framework",
      "Domain adaptation techniques",
      "Open-source implementation"
    ],
    team: ["Taha Ababou", "Research collaborators"],
    gallery: [
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ]
  }
];

// Function to insert a project and its related data
async function insertProject(project) {
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
      console.log(`Inserted ${techData.length} technologies for project: ${project.title}`);
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
      console.log(`Inserted ${featureData.length} features for project: ${project.title}`);
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
      console.log(`Inserted ${teamData.length} team members for project: ${project.title}`);
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
      console.log(`Inserted ${galleryData.length} gallery images for project: ${project.title}`);
    }
    
    return projectId;
  } catch (error) {
    console.error(`Error inserting project ${project.title}:`, error);
    throw error;
  }
}

// Main function to populate all projects
async function populateProjects() {
  try {
    console.log('Starting to populate projects...');
    
    for (const project of projects) {
      await insertProject(project);
    }
    
    console.log('Successfully populated all projects!');
  } catch (error) {
    console.error('Error populating projects:', error);
  }
}

// Run the population script
populateProjects();
