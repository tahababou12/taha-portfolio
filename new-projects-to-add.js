// New projects to add to your portfolio
// Copy these entries and add them to the 'projects' array in scripts/populate-supabase.js

// Personal Projects
const uniDesktop = {
  title: "Uni Desktop",
  description: "University desktop application",
  category: "Personal",
  image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  link: "https://github.com/tahababou12/uni-desktop",
  github: "https://github.com/tahababou12/uni-desktop",
  long_description: "A desktop application designed for university students to manage courses, assignments, and schedules. Built with modern desktop technologies for a seamless user experience.",
  year: "2022",
  role: "Developer",
  technologies: ["Electron", "JavaScript", "HTML/CSS", "Node.js"],
  features: [
    "Course management",
    "Assignment tracking",
    "Schedule organization",
    "Notification system"
  ],
  team: ["Taha Ababou"],
  gallery: [
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  ],
  sections: [
    {
      section_title: "Project Overview",
      section_content: "Uni Desktop is a comprehensive desktop application that helps university students manage their academic life. It provides an integrated environment for tracking courses, assignments, deadlines, and schedules.",
      display_order: 1
    },
    {
      section_title: "Technical Implementation",
      section_content: "Built using Electron framework for cross-platform compatibility, along with modern JavaScript for the front-end logic. The application features local storage capabilities to ensure data persistence even when offline.",
      display_order: 2
    }
  ]
};

const pharmaML = {
  title: "PharmaML",
  description: "BU ECE Shark Tank Winner",
  category: "Personal",
  image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  link: "https://github.com/PharmaML",
  github: "https://github.com/PharmaML",
  long_description: "PharmaML is a machine learning platform designed for pharmaceutical research and development. The project won the BU ECE Shark Tank competition for its innovative approach to drug discovery and development.",
  year: "2023",
  role: "Lead Developer",
  technologies: ["Python", "TensorFlow", "Scikit-learn", "Flask", "React"],
  features: [
    "Drug discovery algorithms",
    "Molecular property prediction",
    "Data visualization dashboard",
    "API integration with research databases"
  ],
  team: ["Taha Ababou", "Team members"],
  gallery: [
    "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1583911860205-72f8ac8ddcbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1576086213369-97a306d36557?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  ],
  sections: [
    {
      section_title: "Award-Winning Innovation",
      section_content: "PharmaML won the BU ECE Shark Tank competition for its novel approach to applying machine learning in pharmaceutical research. The platform addresses key challenges in the drug discovery pipeline, reducing development time and costs.",
      display_order: 1
    },
    {
      section_title: "Technology Stack",
      section_content: "The system leverages state-of-the-art machine learning algorithms implemented in TensorFlow and Scikit-learn, with a Flask backend API and React frontend dashboard for researchers to interact with the platform.",
      display_order: 2
    }
  ]
};

const rekordbox = {
  title: "Rekordbox Online DJ Board",
  description: "Web-based DJ mixing platform",
  category: "Personal",
  image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  link: "https://rekordbox.vercel.app/",
  github: "https://github.com/tahababou12/rekordbox",
  live_demo: "https://rekordbox.vercel.app/",
  long_description: "Rekordbox is an online DJ board that brings professional mixing capabilities to the browser. The application allows users to mix tracks, apply effects, and create seamless transitions between songs.",
  year: "2023",
  role: "Full-stack Developer",
  technologies: ["React", "Web Audio API", "Next.js", "Tailwind CSS", "Vercel"],
  features: [
    "Dual deck mixing",
    "Real-time audio processing",
    "Beat detection and synchronization",
    "Effect controls and EQ",
    "Responsive design for various devices"
  ],
  team: ["Taha Ababou"],
  gallery: [
    "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  ],
  sections: [
    {
      section_title: "Professional DJ Experience in Browser",
      section_content: "Rekordbox brings professional DJ capabilities to the web browser, eliminating the need for expensive hardware or desktop software. Users can mix tracks with precision timing controls, apply audio effects, and create seamless transitions.",
      display_order: 1
    },
    {
      section_title: "Technical Challenges",
      section_content: "Building a DJ application for the web presented unique challenges with audio processing latency and synchronization. By leveraging the Web Audio API and optimizing the audio pipeline, the platform achieves near-native performance levels.",
      display_order: 2
    }
  ]
};

const spotifyClone = {
  title: "Spotify Clone",
  description: "Music streaming platform replica",
  category: "Personal",
  image: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  link: "https://github.com/tahababou12/spotify-clone",
  github: "https://github.com/tahababou12/spotify-clone",
  long_description: "A full-featured Spotify clone that replicates the core functionality of the popular music streaming service. Features include user authentication, playlists, search, and audio playback.",
  year: "2022",
  role: "Developer",
  technologies: ["React", "Node.js", "Express", "MongoDB", "Spotify API"],
  features: [
    "User authentication and profiles",
    "Playlist creation and management",
    "Search functionality",
    "Music playback controls",
    "Responsive design"
  ],
  team: ["Taha Ababou"],
  gallery: [
    "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  ]
};

// Games
const flappyBird = {
  title: "Flappy Bird Game",
  description: "Recreation of the classic mobile game",
  category: "Game",
  image: "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  link: "https://github.com/tahababou12/flappybird-game",
  github: "https://github.com/tahababou12/flappybird-game",
  long_description: "A recreation of the viral mobile game Flappy Bird, built with modern web technologies. The game features the same addictive gameplay with a bird navigating through pipes.",
  year: "2021",
  role: "Game Developer",
  technologies: ["JavaScript", "HTML5 Canvas", "CSS3", "Game Physics"],
  features: [
    "Faithful recreation of original gameplay",
    "Collision detection system",
    "Score tracking",
    "Difficulty progression",
    "Mobile touch controls"
  ],
  team: ["Taha Ababou"],
  gallery: [
    "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1553481187-be93c21490a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  ]
};

const physicsLetterAnimation = {
  title: "Physics Letter Animation",
  description: "Interactive physics-based typography",
  category: "Game",
  image: "https://images.unsplash.com/photo-1618172193763-c511deb635ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  link: "https://github.com/tahababou12/physics-letter-animation",
  github: "https://github.com/tahababou12/physics-letter-animation",
  long_description: "An interactive animation system that applies realistic physics to typography. Letters and words respond to gravity, collisions, and user interactions with fluid, natural movements.",
  year: "2022",
  role: "Creative Developer",
  technologies: ["JavaScript", "Physics Engine", "Three.js", "WebGL"],
  features: [
    "Real-time physics simulation",
    "Interactive typography",
    "User-driven interactions",
    "Customizable physics parameters",
    "Cross-browser compatibility"
  ],
  team: ["Taha Ababou"],
  gallery: [
    "https://images.unsplash.com/photo-1618172193763-c511deb635ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1622556498246-755f44ca76f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1635686250431-a9e8f7d7e2be?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  ]
};

const autoSnakeGame = {
  title: "Auto Snake Game",
  description: "Self-playing snake game with AI",
  category: "Game",
  image: "https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  link: "https://github.com/tahababou12/auto-snake-game",
  github: "https://github.com/tahababou12/auto-snake-game",
  long_description: "An AI-powered version of the classic Snake game that plays itself using pathfinding algorithms. The game demonstrates artificial intelligence concepts through an entertaining visual medium.",
  year: "2022",
  role: "Developer",
  technologies: ["JavaScript", "HTML5 Canvas", "Algorithms", "AI"],
  features: [
    "AI-driven gameplay",
    "Multiple algorithm options",
    "Visual algorithm execution",
    "Adjustable game speed",
    "Performance metrics"
  ],
  team: ["Taha Ababou"],
  gallery: [
    "https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1576086213369-97a306d36557?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  ]
};

// Research Papers
const twitterAnalysis = {
  title: "Twitter Customer Support Analysis",
  description: "Predicting engagement on Twitter",
  category: "Research",
  image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  link: "https://github.com/tahababou12/twitter-analysis",
  github: "https://github.com/tahababou12/twitter-analysis",
  long_description: "Research paper on predicting customer support engagement on Twitter using machine learning and natural language processing techniques. The study analyzes patterns in customer-brand interactions to optimize support strategies.",
  year: "2023",
  role: "Lead Researcher",
  technologies: ["Python", "NLP", "Machine Learning", "Data Analysis", "Twitter API"],
  features: [
    "Sentiment analysis",
    "Engagement prediction models",
    "Response time optimization",
    "Topic modeling",
    "Comparative brand analysis"
  ],
  team: ["Taha Ababou", "Research collaborators"],
  gallery: [
    "https://images.unsplash.com/photo-1611605698335-8b1569810432?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1611162616475-46b635cb6868?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  ],
  sections: [
    {
      section_title: "Research Methodology",
      section_content: "This study employed a mixed-methods approach combining qualitative analysis of tweet content with quantitative modeling of engagement metrics. The dataset included over 100,000 customer support interactions from major brands across various industries.",
      display_order: 1
    },
    {
      section_title: "Key Findings",
      section_content: "The research identified specific language patterns and response strategies that significantly increased customer satisfaction and engagement. Response time was found to be less important than personalization and solution clarity in determining positive outcomes.",
      display_order: 2
    }
  ]
};

const quantumLevitation = {
  title: "Quantum Levitation Research",
  description: "Flying vehicles in the near future",
  category: "Research",
  image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  link: "https://www.researchgate.net/publication/342878087_Quantum_Levitation_-_Flying_vehicles_in_the_near_future",
  long_description: "Academic paper exploring the potential applications of quantum levitation technology in transportation, specifically focusing on the feasibility of flying vehicles. The research examines the principles of superconductivity and quantum locking for sustainable transportation.",
  year: "2020",
  role: "Researcher",
  technologies: ["Quantum Physics", "Superconductivity", "Materials Science", "Transportation Engineering"],
  features: [
    "Quantum levitation principles",
    "Superconducting material analysis",
    "Energy efficiency calculations",
    "Transportation application models",
    "Future development roadmap"
  ],
  team: ["Taha Ababou", "Research collaborators"],
  gallery: [
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1581093458791-9fee8d0265a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1630839437035-dac17da580d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  ],
  sections: [
    {
      section_title: "Quantum Levitation Principles",
      section_content: "This paper explores the fundamental physics behind quantum levitation, particularly the Meissner effect and flux pinning in type-II superconductors. These phenomena allow objects to be suspended in space with remarkable stability when subjected to appropriate magnetic fields.",
      display_order: 1
    },
    {
      section_title: "Applications in Transportation",
      section_content: "The research proposes several practical applications for quantum levitation in transportation, from frictionless train systems to personal flying vehicles. The paper includes theoretical models for energy consumption, stability control, and safety mechanisms.",
      display_order: 2
    },
    {
      section_title: "Technical Challenges",
      section_content: "Current limitations of superconducting materials, particularly the requirement for extremely low temperatures, present significant engineering challenges. The paper discusses recent advances in high-temperature superconductors and their potential to overcome these obstacles.",
      display_order: 3
    }
  ]
};

// To add these projects to your portfolio:
// 1. Copy these project objects to scripts/populate-supabase.js
// 2. Add them to the 'projects' array
// 3. Run the populate-db script to update your database 