import { useState, useEffect, useRef } from 'react'
import projectsData from '../data/projects.js'
import { getAudioDuration } from '../utils/audioUtils.js'

function Projects({ onTrackSelect }) {
  const [visibleProjects, setVisibleProjects] = useState(new Set())
  const [displayedProjects, setDisplayedProjects] = useState(projectsData)
  const [durationsLoaded, setDurationsLoaded] = useState(false)
  const projectRefs = useRef({})

  // Load real audio durations on component mount
  useEffect(() => {
    const loadRealDurations = async () => {
      console.log('🎵 Loading real audio durations...')
      console.log('📊 Total projects found:', projectsData.length)
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
          updatedProjects.push(project) // Keep original if failed
        }
      }
      
      console.log('📊 Final projects count:', updatedProjects.length)
      setDisplayedProjects(updatedProjects)
      setDurationsLoaded(true)
      console.log('🎵 All durations loaded!')
    }

    loadRealDurations()
  }, [])

  const handlePlayClick = (project) => {
    console.log('🎵 Project play clicked for:', project.title)
    
    // First, set the track in the player
    onTrackSelect(project.id)
    
    // Then try to start playing using the global function
    setTimeout(() => {
      if (window.startMusicPlayer && project.audioFile) {
        window.startMusicPlayer()
      } else if (!project.audioFile) {
        console.log('⚠️ No audio file for:', project.title)
      }
    }, 100) // Small delay to ensure player is set up
  }

  // Scroll function to check if projects are in the middle of screen
  useEffect(() => {
    const handleScroll = () => {
      const screenMiddle = window.innerHeight / 2
      const newVisibleProjects = new Set()

      Object.entries(projectRefs.current).forEach(([projectId, ref]) => {
        if (ref) {
          const rect = ref.getBoundingClientRect()
          const projectMiddle = rect.top + rect.height / 2
          
          // Check if project center is near screen center (within 200px range)
          if (Math.abs(projectMiddle - screenMiddle) < 200) {
            newVisibleProjects.add(parseInt(projectId))
          }
        }
      })

      setVisibleProjects(newVisibleProjects)
    }

    // Add scroll listener
    window.addEventListener('scroll', handleScroll)
    // Check initial state
    handleScroll()

    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll)
  }, [displayedProjects])

  return (
    <section id="projects" className="min-h-screen py-20 px-8 text-white relative overflow-hidden">
      {/* Tree Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/src/assets/images/tree.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-bgGray bg-opacity-30"></div>
        
        {/* Gradient Overlay - fades to bgGray to match About section */}
        <div
          className="absolute inset-0"
          style={{
            background:
            "linear-gradient(to top, transparent 0%, transparent 60%, rgba(26, 26, 26, 0.2) 70%, rgba(26, 26, 26, 0.5) 80%, rgba(26, 26, 26, 0.6) 85%, rgba(26, 26, 26, 0.8) 90%, rgba(26, 26, 26, 1) 100%), linear-gradient(to bottom, transparent 0%, transparent 80%, rgba(26, 26, 26, 0.7) 90%, rgba(26, 26, 26, 1) 100%)",
        }}
        ></div>


      
      {/* Content */}
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-sm tracking-[0.3em] uppercase opacity-70 mb-4">
            Selected Works
          </h2>
          <div className="w-12 h-[1px] bg-white"></div>
        </div>

        {/* Projects Grid - No filter buttons anymore */}
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
                      <i className="fas fa-play text-sm ml-1"></i>
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