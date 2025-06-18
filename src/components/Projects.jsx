import { useState, useEffect, useRef } from 'react'
import projectsData from '../data/projects.js'
import { getAudioDuration } from '../utils/audioUtils.js'
import treeImage from '../assets/images/tree.jpg'

function Projects({ onTrackSelect }) {
  const [visibleProjects, setVisibleProjects] = useState(new Set())
  const [displayedProjects, setDisplayedProjects] = useState(projectsData)
  const [durationsLoaded, setDurationsLoaded] = useState(false)
  const [backgroundLoaded, setBackgroundLoaded] = useState(false)
  const projectRefs = useRef({})

  // Preload tree background for instant, stable display
  useEffect(() => {
    const img = new Image()
    img.onload = () => {
      console.log('🌳 Tree background loaded!')
      setBackgroundLoaded(true)
    }
    img.onerror = () => {
      console.log('❌ Tree background failed to load')
      setBackgroundLoaded(true) // Still show section with fallback
    }
    img.src = treeImage
  }, [])

  // Load durations progressively
  useEffect(() => {
    const loadRealDurations = async () => {
      console.log('🎵 Loading real audio durations...')
      const updatedProjects = []
      
      for (const project of projectsData) {
        try {
          if (project.audioFile) {
            const realDuration = await getAudioDuration(project.audioFile)
            
            const updatedProject = {
              ...project,
              tracks: project.tracks.map(track => ({
                ...track,
                duration: realDuration
              }))
            }
            
            console.log(`✅ ${project.title}: ${realDuration}`)
            updatedProjects.push(updatedProject)
          } else {
            updatedProjects.push(project)
          }
        } catch (error) {
          console.error(`❌ Failed to get duration for ${project.title}:`, error)
          updatedProjects.push(project)
        }
      }
      
      setDisplayedProjects(updatedProjects)
      setDurationsLoaded(true)
      console.log('🎵 All durations loaded!')
    }

    loadRealDurations()
  }, [])

  const handlePlayClick = (project) => {
    console.log('🎵 Project play clicked for:', project.title)
    
    onTrackSelect(project.id)
    
    setTimeout(() => {
      if (window.startMusicPlayer && project.audioFile) {
        window.startMusicPlayer()
      } else if (!project.audioFile) {
        console.log('⚠️ No audio file for:', project.title)
      }
    }, 100)
  }

  // Optimized scroll detection
  useEffect(() => {
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const screenMiddle = window.innerHeight / 2
          const newVisibleProjects = new Set()

          Object.entries(projectRefs.current).forEach(([projectId, ref]) => {
            if (ref) {
              const rect = ref.getBoundingClientRect()
              const projectMiddle = rect.top + rect.height / 2
              
              if (Math.abs(projectMiddle - screenMiddle) < 200) {
                newVisibleProjects.add(parseInt(projectId))
              }
            }
          })

          setVisibleProjects(newVisibleProjects)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [displayedProjects])

  return (
    <section id="projects" className="min-h-screen py-20 px-8 text-white relative overflow-hidden">
      {/* ROCK SOLID Tree Background - No Jumping or Crazy Behavior */}
      <div className="absolute inset-0">
        {/* Instant fallback that matches tree colors */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-gray-800 to-gray-900" />
        
        {/* Tree image - loads on top when ready, zero layout shift */}
        <div 
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
            backgroundLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${treeImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            // Prevent any scrolling/jumping behavior
            backgroundAttachment: 'scroll',
            transform: 'translateZ(0)', // Force GPU layer
            willChange: 'opacity' // Optimize transitions
          }}
        />
      </div>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-bgGray bg-opacity-30" />
      
      {/* Gradient overlays for smooth section transitions */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              to top, 
              transparent 0%, 
              transparent 60%, 
              rgba(26, 26, 26, 0.2) 70%, 
              rgba(26, 26, 26, 0.5) 80%, 
              rgba(26, 26, 26, 0.6) 85%, 
              rgba(26, 26, 26, 0.8) 90%, 
              rgba(26, 26, 26, 1) 100%
            ), 
            linear-gradient(
              to bottom, 
              transparent 0%, 
              transparent 80%, 
              rgba(26, 26, 26, 0.7) 90%, 
              rgba(26, 26, 26, 1) 100%
            )`
        }}
      />

      {/* Content */}
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-sm tracking-[0.3em] uppercase opacity-70 mb-4">
            Selected Works
          </h2>
          <div className="w-12 h-[1px] bg-white" />
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedProjects.map((project) => (
            <div 
              key={project.id} 
              className="group cursor-pointer"
              ref={el => projectRefs.current[project.id] = el}
            >
              <div className="relative overflow-hidden bg-zinc-800 aspect-square flex items-center justify-center p-4">
                <img 
                  src={project.image} 
                  alt={project.title}
                  loading="lazy"
                  className={`w-full h-full object-cover transition-all duration-700 grayscale ${
                    visibleProjects.has(project.id) 
                      ? 'grayscale-[0.5]' 
                      : 'grayscale'
                  } group-hover:grayscale-0`}
                />
                
                {/* Overlay */}
                <div 
                  className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center"
                  onClick={() => handlePlayClick(project)}
                >
                  <div className="text-center">
                    <div className="w-12 h-12 border border-white rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-white hover:text-black transition-all duration-300">
                      <i className="fas fa-play text-sm ml-1" />
                    </div>
                    <p className="text-sm tracking-wider">LISTEN</p>
                    <p className="text-xs opacity-75 mt-1">
                      {durationsLoaded ? project.tracks[0]?.duration : 'Loading...'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 space-y-1">
                <h3 className="text-base font-light tracking-wide">{project.title}</h3>
                <p className="text-xs opacity-60">{project.genre}</p>
                <div className="flex justify-between text-xs opacity-50">
                  <span>{project.type}</span>
                  <span>{project.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {displayedProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-lg opacity-60">No projects found.</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default Projects