import React from 'react'

const InfoPage: React.FC = () => {
  return (
    <div className="px-4 sm:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-normal mb-8 sm:mb-12">About Me</h1>
        
        <div className="mb-12">
          <p className="text-lg text-gray-300 mb-6">
            I'm Taha Ababou, a software engineer, AI builder, and entrepreneur with a strong foundation in both engineering and statistics. I'm passionate about developing innovative technologies that blend cutting-edge AI, intuitive product design, and practical real-world use cases. I care deeply about creating tools that are useful, usable, and scalable — whether that's through startups, open-source contributions, or consulting projects.
          </p>
          <p className="text-lg text-gray-300 mb-6">
            I'm originally from Morocco, and I've lived in Spain and the U.S. (Boston). I speak four languages: Arabic, French, English, and Spanish. My global background shapes my entrepreneurial mindset and the way I approach product design — always considering scalability and user diversity.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-normal mb-6">Education</h2>
          <div className="mb-6">
            <h3 className="text-xl font-medium">Boston University</h3>
            <p className="text-gray-300 mt-2">B.S. in Computer Engineering, May 2024</p>
            <p className="text-gray-300">Concentration: Technology Innovation</p>
          </div>
          <div>
            <h3 className="text-xl font-medium">Boston University</h3>
            <p className="text-gray-300 mt-2">M.S. in Statistical Practice (MSSP), In Progress (2025 Expected)</p>
            <p className="text-gray-300">Awarded an Honors Scholarship</p>
            <p className="text-gray-300">Focus areas: Applied Statistical Modeling, Machine Learning, Data Science, Consulting</p>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-normal mb-6">Key Projects and Experiences</h2>
          
          <div className="mb-8">
            <h3 className="text-xl font-medium">🛠 bRAG AI (Founder)</h3>
            <p className="text-gray-300 mt-2">
              Building an AI-powered development platform that allows anyone — regardless of technical skill — to build web apps and mobile apps simply using natural language and images.
            </p>
            <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
              <li>Over 3,000 waitlist signups pre-launch</li>
              <li>Built the backend using Claude 3.5/3.7 Sonnet models and RAG techniques</li>
              <li>Empowers users to stay in control rather than having the AI do everything blindly</li>
            </ul>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-medium">📚 Brag-LangChain (Open Source Project)</h3>
            <p className="text-gray-300 mt-2">
              Open-sourced a comprehensive framework called brag-langchain to explore RAG architectures at personal and enterprise scales.
            </p>
            <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
              <li>Over 2,800+ GitHub stars</li>
              <li>Recognized by LangChain and multiple AI communities</li>
              <li>Designed to help others understand and deploy RAG systems</li>
            </ul>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-medium">🛡 Local (Series A Startup)</h3>
            <p className="text-gray-300 mt-2">
              Technical Lead at Local, a $1M-valued Series A social discovery startup.
            </p>
            <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
              <li>Led a team of 10–15 full-time developers</li>
              <li>Developed AI models to predict high-crime areas</li>
              <li>Presented at the Rio Web Summit 2023</li>
            </ul>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-medium">🏦 Fidelity Investments (Consultant)</h3>
            <p className="text-gray-300 mt-2">
              Partnered with Fidelity Investments as part of my MSSP program.
            </p>
            <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
              <li>Led efforts to build AI models for document retrieval quality scoring</li>
              <li>Designed machine learning models for AI chatbot context</li>
              <li>Developed predictive pipelines for ingestion and indexing systems</li>
            </ul>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-normal mb-6">Technical Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-xl font-medium mb-3">Languages</h3>
              <p className="text-gray-300">Python, JavaScript, C, C++, R, PHP</p>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-3">AI/ML</h3>
              <p className="text-gray-300">OpenAI APIs, Claude models, WebRTC, LangChain, RAG pipelines</p>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-3">Databases</h3>
              <p className="text-gray-300">Supabase, PostgreSQL, Firestore, SQL</p>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-3">Backend</h3>
              <p className="text-gray-300">Node.js (Express), FastAPI</p>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-3">Frontend</h3>
              <p className="text-gray-300">React Native, Expo, TailwindCSS</p>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-3">Infrastructure</h3>
              <p className="text-gray-300">AWS, Vercel, Cloudflare, GitHub Actions</p>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-normal mb-6">Personal Philosophy</h2>
          <ul className="space-y-4">
            <li>
              <h3 className="text-xl font-medium">Time is greater Money</h3>
              <p className="text-gray-300 mt-1">I believe time is the most valuable currency — everything I build, I build to either save time or create more meaningful uses of time.</p>
            </li>
            <li>
              <h3 className="text-xl font-medium">Pragmatic Builder</h3>
              <p className="text-gray-300 mt-1">I prioritize getting real users on real products, quickly — not just building theoretical prototypes.</p>
            </li>
            <li>
              <h3 className="text-xl font-medium">Global Perspective</h3>
              <p className="text-gray-300 mt-1">Living in multiple countries, speaking multiple languages, and experiencing different cultures has shaped me into a globally-minded builder.</p>
            </li>
            <li>
              <h3 className="text-xl font-medium">Constant Learner</h3>
              <p className="text-gray-300 mt-1">Whether mastering a new statistical method in R, leading a full-stack app project, or learning about startup GTM strategies, I'm always evolving and iterating.</p>
            </li>
            <li>
              <h3 className="text-xl font-medium">Builder for Builders</h3>
              <p className="text-gray-300 mt-1">Especially with bRAG AI, my goal is to give other builders tools that let them reach 10x productivity without giving up their control.</p>
            </li>
          </ul>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-normal mb-6">One-line Summary</h2>
          <p className="text-lg text-gray-300 italic">
            "Engineer, entrepreneur, and builder — passionate about turning complex AI and software systems into usable, scalable tools for real people."
          </p>
        </div>
      </div>
    </div>
  )
}

export default InfoPage
