import React from 'react'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="px-4 sm:px-8 py-8 sm:py-12 mt-16 sm:mt-24 border-t border-gray-800">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="mb-8 md:mb-0">
          <p className="text-gray-500 text-sm">© {currentYear} Taha Ababou. All rights reserved.</p>
        </div>
        <div className="flex flex-wrap gap-y-4">
          <a href="mailto:tahababou12@gmail.com" className="text-gray-500 text-sm hover:text-white transition-colors mr-6 sm:mr-8">
            Email
          </a>
          <a href="https://linkedin.com/in/tahaababou" target="_blank" rel="noopener noreferrer" className="text-gray-500 text-sm hover:text-white transition-colors mr-6 sm:mr-8">
            LinkedIn
          </a>
          <a href="https://github.com/tahababou12" target="_blank" rel="noopener noreferrer" className="text-gray-500 text-sm hover:text-white transition-colors mr-6 sm:mr-8">
            GitHub
          </a>
          <a href="https://tahaababou.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 text-sm hover:text-white transition-colors">
            Website
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
