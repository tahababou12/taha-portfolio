import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const ProjectsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  
  // Projects categorized
  const projects = {
    featured: [
      {
        id: 1,
        image: "https://images.unsplash.com/photo-1555952517-2e8e729e0b44?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        title: "BragAI",
        description: "AI-powered app generator with 3K+ waitlist",
        link: "https://bragai.dev",
        category: "AI"
      },
      {
        id: 2,
        image: "https://images.unsplash.com/photo-1561736778-92e52a7769ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        title: "CoCo",
        description: "AI CoComposer - HackPrinceton Winner",
        link: "https://github.com/mohulshukla/CoCo",
        category: "AI"
      },
      {
        id: 3,
        image: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        title: "EchoPath",
        description: "AI-Powered Blind Cane - MakeHarvard Winner",
        link: "https://github.com/tahababou12/EchoPath",
        category: "Hardware"
      },
      {
        id: 4,
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        title: "Open-Source RAG Framework",
        description: "2.8K+ GitHub Stars, LangChain Featured",
        link: "https://github.com/bRAGAI/bRAG-langchain",
        category: "AI"
      },
      {
        id: 5,
        image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        title: "RAFT for Code Generation",
        description: "Fine-tuned LLMs with 15% accuracy improvement",
        link: "https://github.com/BragAI/bragai-paper",
        category: "AI"
      },
      {
        id: 6,
        image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        title: "Fidelity RAG Pipeline",
        description: "Multi-query system with 80% faster retrieval",
        link: "#",
        category: "AI"
      }
    ],
    personal: [
      {
        id: 7,
        image: "https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        title: "RECOG",
        description: "Recognition system for computer vision",
        link: "https://github.com/tahababou12/RECOG",
        category: "AI"
      },
      {
        id: 8,
        image: "https://images.unsplash.com/photo-1551033406-611cf9a28f67?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        title: "Uni Desktop",
        description: "Desktop application for university management",
        link: "https://github.com/tahababou12/uni-desktop",
        category: "Web"
      },
      {
        id: 9,
        image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        title: "PharmaML",
        description: "ML models for pharmaceutical applications",
        link: "https://github.com/PharmaML",
        category: "AI"
      },
      {
        id: 10,
        image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        title: "Rekordbox",
        description: "Music management application",
        link: "https://rekordbox.vercel.app/",
        category: "Web"
      },
      {
        id: 11,
        image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        title: "Spotify Clone",
        description: "Full-featured Spotify clone",
        link: "https://github.com/tahababou12/spotify-clone",
        category: "Web"
      }
    ],
    games: [
      {
        id: 12,
        image: "https://images.unsplash.com/photo-1611996575749-79a3a250f948?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        title: "8Ball Pool",
        description: "Interactive pool game",
        link: "https://github.com/tahababou12/8BallPool",
        category: "Game"
      },
      {
        id: 13,
        image: "https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        title: "Flappy Bird",
        description: "Recreation of the classic game",
        link: "https://github.com/tahababou12/flappybird-game",
        category: "Game"
      },
      {
        id: 14,
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        title: "Physics Letter Animation",
        description: "Interactive physics-based animations",
        link: "https://github.com/tahababou12/physics-letter-animation",
        category: "Game"
      },
      {
        id: 15,
        image: "https://images.unsplash.com/photo-1615751072497-5f5169febe17?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        title: "Auto Snake Game",
        description: "Self-playing snake game with AI",
        link: "https://github.com/tahababou12/auto-snake-game",
        category: "Game"
      }
    ],
    papers: [
      {
        id: 16,
        image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        title: "RAG Framework Paper",
        description: "Paper on Retrieval-Augmented Generation (RAG) framework fine-tuned using parameter-efficient methods (LoRA) for domain-specific applications",
        link: "https://github.com/BragAI/bragai-paper",
        category: "Research"
      },
      {
        id: 17,
        image: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        title: "Twitter Analysis",
        description: "Predicting Customer Support Engagement on Twitter",
        link: "https://github.com/tahababou12/twitter-analysis",
        category: "Research"
      },
      {
        id: 18,
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        title: "Quantum Levitation",
        description: "Quantum Levitation — Flying vehicles in the near future?",
        link: "https://www.researchgate.net/publication/342878087_Quantum_Levitation_-_Flying_vehicles_in_the_near_future",
        category: "Research"
      }
    ]
  };

  // Combine all projects into a single array
  const allProjects = [
    ...projects.featured,
    ...projects.personal,
    ...projects.games,
    ...projects.papers
  ];

  // Get unique categories
  const categories = ['all', ...new Set(allProjects.map(project => project.category))];

  // Filter projects based on active filter
  const filteredProjects = activeFilter === 'all' 
    ? allProjects 
    : allProjects.filter(project => project.category === activeFilter);

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
          <section className="mb-16">
            <h2 className="text-2xl font-normal mb-6 border-b border-gray-800 pb-2">Featured Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {projects.featured.map((project) => (
                <div key={project.id} className="aspect-square overflow-hidden relative group">
                  <img 
                    src={project.image} 
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
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-white underline text-xs sm:text-sm">View Project</a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-normal mb-6 border-b border-gray-800 pb-2">Personal Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {projects.personal.map((project) => (
                <div key={project.id} className="aspect-square overflow-hidden relative group">
                  <img 
                    src={project.image} 
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
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-white underline text-xs sm:text-sm">View Project</a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-normal mb-6 border-b border-gray-800 pb-2">Games</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {projects.games.map((project) => (
                <div key={project.id} className="aspect-square overflow-hidden relative group">
                  <img 
                    src={project.image} 
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
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-white underline text-xs sm:text-sm">View Project</a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-normal mb-6 border-b border-gray-800 pb-2">Research Papers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {projects.papers.map((paper) => (
                <div key={paper.id} className="aspect-square overflow-hidden relative group">
                  <img 
                    src={paper.image} 
                    alt={paper.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-white text-lg sm:text-xl font-medium">{paper.title}</h3>
                      <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                        {paper.category}
                      </span>
                    </div>
                    <p className="text-gray-300 text-xs sm:text-sm mb-4">{paper.description}</p>
                    <a href={paper.link} target="_blank" rel="noopener noreferrer" className="text-white underline text-xs sm:text-sm">View Project</a>
                  </div>
                </div>
              ))}
            </div>
          </section>

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
            {filteredProjects.map((project) => (
              <div key={project.id} className="aspect-square overflow-hidden relative group">
                <img 
                  src={project.image} 
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
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-white underline text-xs sm:text-sm">View Project</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProjectsPage
