import React from 'react'
import { Link } from 'react-router-dom'

const HomePage: React.FC = () => {
  const featuredProjects = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1555952517-2e8e729e0b44?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      title: "BragAI",
      description: "AI-powered app generator with 3K+ waitlist",
      link: "https://bragai.dev"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1561736778-92e52a7769ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      title: "CoCo",
      description: "AI CoComposer - HackPrinceton Winner",
      link: "https://github.com/mohulshukla/CoCo"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      title: "EchoPath",
      description: "AI-Powered Blind Cane - MakeHarvard Winner",
      link: "https://github.com/tahababou12/EchoPath"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      title: "Open-Source RAG Framework",
      description: "2.8K+ GitHub Stars, LangChain Featured",
      link: "https://github.com/bRAGAI/bRAG-langchain"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      title: "RAFT for Code Generation",
      description: "Fine-tuned LLMs with 15% accuracy improvement",
      link: "https://github.com/BragAI/bragai-paper"
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      title: "Fidelity RAG Pipeline",
      description: "Multi-query system with 80% faster retrieval",
      link: "#"
    }
  ];

  // All projects including featured and additional ones
  const allProjects = [
    ...featuredProjects,
    {
      id: 7,
      title: "RECOG",
      description: "Recognition system for computer vision",
      link: "https://github.com/tahababou12/RECOG"
    },
    {
      id: 8,
      title: "Uni Desktop",
      description: "Desktop application for university management",
      link: "https://github.com/tahababou12/uni-desktop"
    },
    {
      id: 9,
      title: "PharmaML",
      description: "ML models for pharmaceutical applications",
      link: "https://github.com/PharmaML"
    },
    {
      id: 10,
      title: "Rekordbox",
      description: "Music management application",
      link: "https://rekordbox.vercel.app/"
    },
    {
      id: 11,
      title: "Spotify Clone",
      description: "Full-featured Spotify clone",
      link: "https://github.com/tahababou12/spotify-clone"
    },
    {
      id: 12,
      title: "8Ball Pool",
      description: "Interactive pool game",
      link: "https://github.com/tahababou12/8BallPool"
    },
    {
      id: 13,
      title: "Flappy Bird",
      description: "Recreation of the classic game",
      link: "https://github.com/tahababou12/flappybird-game"
    },
    {
      id: 14,
      title: "Physics Letter Animation",
      description: "Interactive physics-based animations",
      link: "https://github.com/tahababou12/physics-letter-animation"
    },
    {
      id: 15,
      title: "Auto Snake Game",
      description: "Self-playing snake game with AI",
      link: "https://github.com/tahababou12/auto-snake-game"
    }
  ];

  const totalProjects = allProjects.length;

  return (
    <div className="px-4 sm:px-8">
      <div className="mb-8 sm:mb-16">
        <h1 className="text-2xl sm:text-3xl font-normal">
          Taha Ababou <span className="text-gray-500">is a Data Scientist at</span> <a href="#" className="text-white">Fidelity Investments</a>.
        </h1>
      </div>

      <div className="mb-8 sm:mb-16 max-w-2xl">
        <p className="text-xl sm:text-2xl font-normal text-gray-500">
          He builds AI-powered applications and data systems. Machine learning and software engineering is his jam. Past: <a href="#" className="text-white">Local</a>, <a href="#" className="text-white">The Society of Scent</a>.
        </p>
      </div>

      <div className="space-y-2 mb-12 sm:mb-16">
        <p className="text-lg sm:text-xl text-gray-500">
          See his <a href="https://github.com/tahababou12" target="_blank" rel="noopener noreferrer" className="text-white underline">GitHub</a>
        </p>
        <p className="text-lg sm:text-xl">
          <a href="https://bragai.dev" target="_blank" rel="noopener noreferrer" className="text-white underline">BragAI</a> Project
        </p>
        <p className="text-lg sm:text-xl">
          <a href="https://github.com/bRAGAI/bRAG-langchain" target="_blank" rel="noopener noreferrer" className="text-white underline">Open-Source</a> Contributions
        </p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-normal">Featured Projects</h2>
        <Link to="/projects" className="text-white border border-gray-700 px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
          View All ({totalProjects})
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        {featuredProjects.map((project) => (
          <div key={project.id} className="aspect-square overflow-hidden relative group">
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <h3 className="text-white text-lg sm:text-xl font-medium">{project.title}</h3>
              <p className="text-gray-300 text-xs sm:text-sm mb-4">{project.description}</p>
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-white underline text-xs sm:text-sm">View Project</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomePage
