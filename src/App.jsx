import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'

// Import components
import Home from './components/Home'
import About from './components/About'
import Projects from './components/Projects'
import Plugins from './components/Plugins'
import Contact from './components/Contact'
import BottomMusicPlayer from './components/BottomMusicPlayer'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentTrackId, setCurrentTrackId] = useState(null)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const handleTrackChange = (trackId) => {
    setCurrentTrackId(trackId)
  }

  return (
    <Router basename="/music_portfolio">
      <div className="min-h-screen flex flex-col">
        <header className="fixed top-0 left-0 right-0 z-50 py-6 px-8">
          <nav className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="text-sm tracking-[0.3em] font-light">
              YUVAL LAVI
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-12 text-sm tracking-wider">
              <a href="#home" className="opacity-70 hover:opacity-100 transition-opacity">
                HOME
              </a>
              <a href="#about" className="opacity-70 hover:opacity-100 transition-opacity">
                ABOUT
              </a>
              <a href="#projects" className="opacity-70 hover:opacity-100 transition-opacity">
                WORK
              </a>
              <a href="#plugins" className="opacity-70 hover:opacity-100 transition-opacity">
                PLUGINS
              </a>
              <a href="#contact" className="opacity-70 hover:opacity-100 transition-opacity">
                CONTACT
              </a>
            </div>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden text-white"
              onClick={toggleMenu}
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`w-full h-[1px] bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`w-full h-[1px] bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`w-full h-[1px] bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>

            {/* Mobile Navigation */}
            <div className={`md:hidden fixed inset-0 bg-black transition-all duration-500 ${
              isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}>
              <div className="flex items-center justify-center h-full">
                <div className="text-center space-y-8 text-2xl font-light tracking-wider">
                  <a 
                    href="#home" 
                    className="block opacity-70 hover:opacity-100 transition-opacity"
                    onClick={closeMenu}
                  >
                    HOME
                  </a>
                  <a 
                    href="#about" 
                    className="block opacity-70 hover:opacity-100 transition-opacity"
                    onClick={closeMenu}
                  >
                    ABOUT
                  </a>
                  <a 
                    href="#projects" 
                    className="block opacity-70 hover:opacity-100 transition-opacity"
                    onClick={closeMenu}
                  >
                    WORK
                  </a>
                  <a 
                    href="#plugins" 
                    className="block opacity-70 hover:opacity-100 transition-opacity"
                    onClick={closeMenu}
                  >
                    PLUGINS
                  </a>
                  <a 
                    href="#contact" 
                    className="block opacity-70 hover:opacity-100 transition-opacity"
                    onClick={closeMenu}
                  >
                    CONTACT
                  </a>
                </div>
              </div>
            </div>
          </nav>
        </header>
        
        <main className="flex-1" style={{ paddingBottom: currentTrackId ? '80px' : '0' }}>
          <Routes>
            <Route path="/" element={
              <div>
                <div id="home">
                  <Home />
                </div>
                <div id="about">
                  <About />
                </div>
                <div id="projects">
                  <Projects onTrackSelect={handleTrackChange} />
                </div>
                <div id="plugins">
                  <Plugins />
                </div>
                <div id="contact">
                  <Contact />
                </div>
              </div>
            } />
          </Routes>
        </main>

        {/* Bottom Music Player */}
        <BottomMusicPlayer 
          currentTrackId={currentTrackId}
          onTrackChange={handleTrackChange}
        />
      </div>
    </Router>
  )
}

export default App