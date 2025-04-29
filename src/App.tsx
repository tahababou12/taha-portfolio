import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import InfoPage from './pages/InfoPage'
import ProjectsPage from './pages/ProjectsPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import AdminPage from './pages/AdminPage'
import AwardsPage from './pages/AwardsPage'
import Footer from './components/Footer'

function ScrollToTop() {
  const { pathname } = useLocation()
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  
  return null
}

// Setup static file server for DB exports in development mode
function useStaticFileServer() {
  const [isSetup, setIsSetup] = useState(false);
  
  useEffect(() => {
    // Create a hidden iframe to serve DB export files
    const useLocalDb = import.meta.env.VITE_USE_LOCAL_DB === 'true';
    if (useLocalDb && !isSetup) {
      // Check if we're in development mode with local DB
      console.log('Setting up static file server for DB exports in development mode');
      
      // Alert the user about needed configuration
      console.info(
        'Local DB mode is active. Make sure your Vite server is configured to serve the /db/exports directory.\n' +
        'Add this to vite.config.ts:\n\n' +
        'server: {\n' +
        '  fs: {\n' +
        '    allow: [\'.\', \'../\']\n' +
        '  }\n' +
        '}'
      );
      
      setIsSetup(true);
    }
  }, [isSetup]);
  
  return isSetup;
}

function App() {
  // Setup static file server if needed
  useStaticFileServer();
  
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-black text-white m-8">
        <Navbar />
        <div className="pt-32">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/info" element={<InfoPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/project/:slug" element={<ProjectDetailPage />} />
            <Route path="/awards" element={<AwardsPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  )
}

export default App
