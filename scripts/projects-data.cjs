// Project data for the portfolio
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
    ],
    sections: [
      {
        section_title: "The Challenge",
        section_content: "The current app development ecosystem is prohibitively complex for non-technical founders and creators. Even with no-code tools, building truly custom applications with specific functionality remains challenging without engineering expertise. Our goal was to create a platform that makes app development accessible to everyone, regardless of technical background.",
        display_order: 1
      },
      {
        section_title: "The Solution",
        section_content: "BragAI bridges this gap through a conversational AI interface that translates natural language descriptions into fully functional web and mobile applications. Users can describe what they want to build in plain English, and BragAI generates the code, handles the deployment, and even assists with debugging and improvements.",
        display_order: 2
      },
      {
        section_title: "Technical Architecture",
        section_content: "BragAI utilizes a sophisticated pipeline combining state-of-the-art language models, retrieval-augmented generation (RAG) for up-to-date documentation, and a custom code execution environment. The platform includes multiple specialized agents for different aspects of development, from UI design to database schema creation to testing and optimization.",
        display_order: 3
      }
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
  },
  // New Personal Projects
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  
  // New Games
  {
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
  },
  {
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
  },
  {
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
  },
  
  // New Research Papers
  {
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
  },
  {
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
  }
];

module.exports = { projects }; 