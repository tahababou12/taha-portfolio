// Copy this template and modify it to add a new project
// Then add it to the projects array in scripts/populate-supabase.js

const newProject = {
  title: "Project Title",
  description: "Short project description (displayed in cards)",
  category: "Featured", // Options: Featured, Personal, Game, Research
  image: "https://example.com/main-image.jpg", // Main project image
  link: "https://project-url.com", // Project URL
  github: "https://github.com/username/project", // GitHub repository
  live_demo: "https://demo-url.com", // Live demo URL (optional)
  long_description: "Detailed project description that appears at the top of the project page. This should provide an overview of the entire project.",
  year: "2023-2024", // Project timeframe
  role: "Your role in the project", // E.g., Lead Developer, Designer, etc.
  
  // Technologies used in the project
  technologies: [
    "Technology 1", 
    "Technology 2", 
    "Technology 3"
  ],
  
  // Key features of the project (displayed as bullet points)
  features: [
    "Feature 1 description",
    "Feature 2 description",
    "Feature 3 description",
    "Feature 4 description"
  ],
  
  // Team members who worked on the project
  team: [
    "Your Name",
    "Team Member 1",
    "Team Member 2"
  ],
  
  // Gallery images (displayed in the project detail page)
  gallery: [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg",
    "https://example.com/image3.jpg"
  ],
  
  // Project sections (detailed content about specific aspects of the project)
  sections: [
    {
      section_title: "Problem Statement",
      section_content: "Describe the problem your project is solving. What challenges existed that motivated you to create this project?",
      display_order: 1
    },
    {
      section_title: "Approach & Methodology",
      section_content: "Explain your approach to solving the problem. What methods, frameworks, or techniques did you use?",
      display_order: 2
    },
    {
      section_title: "Technical Implementation",
      section_content: "Provide technical details about how the project was implemented. You can discuss architecture, data flow, algorithms, etc.",
      display_order: 3
    },
    {
      section_title: "Challenges & Solutions",
      section_content: "What challenges did you face during development and how did you overcome them?",
      display_order: 4
    },
    {
      section_title: "Results & Impact",
      section_content: "What were the outcomes of your project? Did it achieve its goals? What impact did it have?",
      display_order: 5
    }
  ]
};

// To add this project to your portfolio:
// 1. Copy this template and modify it with your project details
// 2. Add it to the projects array in scripts/populate-supabase.js
// 3. Run the populate-supabase script to update your database 