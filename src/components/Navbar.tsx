import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 bg-black z-50 py-6 px-4 sm:px-8">
      <div className="flex justify-between items-center">
        <div>
          <Link to="/" className="text-white text-xl font-normal">Taha Ababou</Link>
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Desktop navigation */}
        <div className="hidden md:flex md:space-x-8">
          <Link to="/" className="text-white hover:text-gray-300 transition-colors">Work</Link>
          <Link to="/awards" className="text-white hover:text-gray-300 transition-colors">Awards</Link>
          <Link to="/info" className="text-white hover:text-gray-300 transition-colors">Info</Link>
          <a href="#" className="text-white hover:text-gray-300 transition-colors">Resume</a>
        </div>
      </div>
      
      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-4 py-4">
          <Link to="/" className="text-white hover:text-gray-300 transition-colors">Work</Link>
          <Link to="/awards" className="text-white hover:text-gray-300 transition-colors">Awards</Link>
          <Link to="/info" className="text-white hover:text-gray-300 transition-colors">Info</Link>
          <a href="#" className="text-white hover:text-gray-300 transition-colors">Resume</a>
        </div>
      )}
    </nav>
  )
}

export default Navbar
