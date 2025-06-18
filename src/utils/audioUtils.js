// audioUtils.js
export const getAudioDuration = (audioSrc) => {
    return new Promise((resolve, reject) => {
      const audio = new Audio()
      
      // Handle successful metadata load
      const handleLoadedMetadata = () => {
        const duration = audio.duration
        
        // Check if duration is valid
        if (!isFinite(duration) || isNaN(duration) || duration === 0) {
          console.warn(`⚠️ Invalid duration for ${audioSrc}: ${duration}`)
          // Try one more time with durationchange event
          return
        }
        
        const minutes = Math.floor(duration / 60)
        const seconds = Math.floor(duration % 60)
        const formattedDuration = `${minutes}:${seconds.toString().padStart(2, '0')}`
        
        // Clean up
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
        audio.removeEventListener('durationchange', handleDurationChange)
        audio.removeEventListener('error', handleError)
        audio.src = '' // Release the audio resource
        
        resolve(formattedDuration)
      }
      
      // Backup handler for duration changes
      const handleDurationChange = () => {
        const duration = audio.duration
        
        if (isFinite(duration) && !isNaN(duration) && duration > 0) {
          const minutes = Math.floor(duration / 60)
          const seconds = Math.floor(duration % 60)
          const formattedDuration = `${minutes}:${seconds.toString().padStart(2, '0')}`
          
          // Clean up
          audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
          audio.removeEventListener('durationchange', handleDurationChange)
          audio.removeEventListener('error', handleError)
          audio.src = ''
          
          resolve(formattedDuration)
        }
      }
      
      // Handle errors
      const handleError = (error) => {
        console.error('❌ Error loading audio for duration:', error)
        
        // Clean up
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
        audio.removeEventListener('durationchange', handleDurationChange)
        audio.removeEventListener('error', handleError)
        audio.src = ''
        
        reject(error)
      }
      
      // Set up event listeners
      audio.addEventListener('loadedmetadata', handleLoadedMetadata)
      audio.addEventListener('durationchange', handleDurationChange)
      audio.addEventListener('error', handleError)
      
      // Set preload to metadata to minimize resource usage
      audio.preload = 'metadata'
      
      // Start loading
      audio.src = audioSrc
    })
  }
  
  export const updateProjectsWithRealDurations = async (projectsData) => {
    const updatedProjects = []
    
    // Process projects in parallel for faster loading
    const promises = projectsData.map(async (project) => {
      if (!project.audioFile) {
        return project
      }
      
      try {
        const realDuration = await getAudioDuration(project.audioFile)
        
        return {
          ...project,
          tracks: project.tracks.map(track => ({
            ...track,
            duration: realDuration
          }))
        }
      } catch (error) {
        console.error(`❌ Failed to get duration for ${project.title}:`, error)
        // Keep original project data if duration fetch fails
        return project
      }
    })
    
    // Wait for all promises to resolve
    const results = await Promise.all(promises)
    
    return results
  }