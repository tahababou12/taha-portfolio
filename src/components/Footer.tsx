import React from 'react'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="px-4 sm:px-8 py-8 sm:py-12 mt-16 sm:mt-24 border-t border-gray-800">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="mb-8 md:mb-0">
          <p className="text-gray-500 text-sm">© {currentYear} Taha Ababou. All rights reserved.</p>
        </div>
        
        <div className="mb-8 md:mb-0 order-3 md:order-2">
          <a 
            href="https://bragai.dev" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-400 text-xs hover:text-white transition-colors relative group"
          >
            <span className="animate-pulse inline-block">Built with BragAI</span>{" "}
            <span className="font-medium text-gray-500 group-hover:text-white transition-colors duration-300">
              {/* BragAI */}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
            </span>
          </a>
        </div>
        
        <div className="flex flex-wrap gap-y-4 order-2 md:order-3">
          <a href="mailto:tahababou12@gmail.com" className="text-gray-500 text-sm hover:text-white transition-colors mr-6 sm:mr-8">
            Email
          </a>
          <a href="https://linkedin.com/in/tahaababou" target="_blank" rel="noopener noreferrer" className="text-gray-500 text-sm hover:text-white transition-colors mr-6 sm:mr-8">
            LinkedIn
          </a>
          <a href="https://github.com/tahababou12" target="_blank" rel="noopener noreferrer" className="text-gray-500 text-sm hover:text-white transition-colors mr-6 sm:mr-8">
            GitHub
          </a>
          <a href="https://drive.google.com/file/d/1d0_nLHEYijiMREiB56gRUehfX021xLVm/view" target="_blank" rel="noopener noreferrer" className="text-gray-500 text-sm hover:text-white transition-colors">
            Resume
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
