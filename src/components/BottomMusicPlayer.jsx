import { useState, useRef, useEffect } from 'react'
import projectsData from '../data/projects.js'

function BottomMusicPlayer({ currentTrackId, onTrackChange }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.6) // Set default volume to 60%
  const [isMuted, setIsMuted] = useState(false)
  const [previousVolume, setPreviousVolume] = useState(0.6) // Store previous volume for unmute
  const [audioSrc, setAudioSrc] = useState(null)
  const [hasTriedFallback, setHasTriedFallback] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const audioRef = useRef(null)
  
  const currentProject = projectsData.find(project => project.id === currentTrackId)

  // Format time display
  const formatTime = (timeInSeconds) => {
    if (!isFinite(timeInSeconds) || isNaN(timeInSeconds)) {
      return "0:00"
    }
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  // Set audio source when project changes
  useEffect(() => {
    if (currentProject?.audioFile) {
      console.log('🔄 Project changed, setting new audio source:', currentProject.audioFile)
      setAudioSrc(currentProject.audioFile)
      setHasTriedFallback(false)
    }
  }, [currentProject])

  // Show player when a track is selected
  useEffect(() => {
    setIsVisible(!!currentTrackId)
  }, [currentTrackId])

  // Initialize audio element with proper volume
  useEffect(() => {
    const audio = audioRef.current
    if (audio && audioSrc) {
      // Set volume immediately when audio element is ready
      audio.volume = isMuted ? 0 : volume
      console.log(`🔊 Initial volume set to: ${Math.round(audio.volume * 100)}%`)
    }
  }, [audioSrc]) // Only depend on audioSrc change

  // Handle volume changes separately
  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      // Only update volume, don't touch other audio properties
      audio.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  // Expose play function to be called externally
  useEffect(() => {
    window.startMusicPlayer = () => {
      const audio = audioRef.current
      if (audio && currentProject?.audioFile) {
        console.log('🎵 Starting music from external call')
        audio.play().then(() => {
          setIsPlaying(true)
          console.log('✅ Successfully started from external call')
        }).catch(error => {
          console.log('❌ External play failed:', error.message)
        })
      }
    }

    return () => {
      delete window.startMusicPlayer
    }
  }, [currentProject, audioSrc])

  const togglePlay = () => {
    const audio = audioRef.current
    console.log('🎵 Toggle play clicked')
    
    if (!audio) {
      console.error('❌ Audio element not found')
      return
    }

    if (!currentProject?.audioFile) {
      console.warn('⚠️ No audio file available')
      alert('Audio preview not available for this track yet.')
      return
    }

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      const playPromise = audio.play()
      
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setIsPlaying(true)
          console.log('✅ Playing:', currentProject?.title)
        }).catch(error => {
          console.error('❌ Play error:', error)
          setIsPlaying(false)
          alert(`Unable to play: ${error.message}`)
        })
      }
    }
  }

  const stopAudio = () => {
    const audio = audioRef.current
    if (!audio) return

    audio.pause()
    audio.currentTime = 0
    setIsPlaying(false)
    setCurrentTime(0)
  }

  const handleProgressClick = (e) => {
    const audio = audioRef.current
    if (!audio || !duration) return

    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const newTime = (clickX / rect.width) * duration
    
    audio.currentTime = newTime
    setCurrentTime(newTime)
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isMuted) {
      // Unmute: restore previous volume
      setIsMuted(false)
      setVolume(previousVolume)
    } else {
      // Mute: save current volume and set to 0
      setPreviousVolume(volume)
      setIsMuted(true)
    }
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    
    // If changing volume while muted, unmute
    if (isMuted && newVolume > 0) {
      setIsMuted(false)
    }
  }

  const nextTrack = () => {
    const allProjects = projectsData
    const currentIndex = allProjects.findIndex(p => p.id === currentTrackId)
    const nextIndex = (currentIndex + 1) % allProjects.length
    onTrackChange(allProjects[nextIndex].id)
  }

  const prevTrack = () => {
    const allProjects = projectsData
    const currentIndex = allProjects.findIndex(p => p.id === currentTrackId)
    const prevIndex = currentIndex === 0 ? allProjects.length - 1 : currentIndex - 1
    onTrackChange(allProjects[prevIndex].id)
  }

  const closePlayer = () => {
    stopAudio()
    setIsVisible(false)
    onTrackChange(null)
  }

  // Load and setup audio when track changes
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !currentProject || !audioSrc) return

    console.log('🔄 Setting up new track:', currentProject.title)
    
    // Event handlers
    const handleLoadedMetadata = () => {
      const audioDuration = audio.duration
      if (isFinite(audioDuration) && !isNaN(audioDuration)) {
        setDuration(audioDuration)
        console.log(`📊 Duration loaded: ${formatTime(audioDuration)}`)
      }
    }

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
      
      // Update duration if it wasn't set properly before
      if (audio.duration && isFinite(audio.duration) && (!duration || duration === 0)) {
        setDuration(audio.duration)
      }
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
      console.log('🏁 Track ended')
    }

    const handlePlay = () => {
      setIsPlaying(true)
    }

    const handlePause = () => {
      setIsPlaying(false)
    }

    const handleCanPlay = () => {
      console.log('✅ Audio can play')
      // Ensure volume is set when audio is ready
      audio.volume = isMuted ? 0 : volume
    }

    const handleError = (e) => {
      console.error('❌ Audio error:', e)
      setIsPlaying(false)
    }

    // Add all event listeners
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('canplay', handleCanPlay)
    audio.addEventListener('error', handleError)

    // Reset states
    setIsPlaying(false)
    setCurrentTime(0)
    setDuration(0)

    // Load the new track
    audio.load()

    // Cleanup
    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('canplay', handleCanPlay)
      audio.removeEventListener('error', handleError)
    }
  }, [currentTrackId, audioSrc]) // Remove volume from dependencies

  if (!isVisible || !currentProject) return null

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0
  const displayVolume = isMuted ? 0 : volume

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black bg-opacity-95 backdrop-blur-md border-t border-white border-opacity-20 z-50">
      {/* Hidden audio element */}
      <audio 
        ref={audioRef}
        src={audioSrc}
        preload="metadata"
      />

      <div className="px-4 py-3">
        {/* Progress Bar */}
        <div 
          className="w-full h-1 bg-white bg-opacity-20 rounded-full cursor-pointer mb-3"
          onClick={handleProgressClick}
        >
          <div 
            className="h-full bg-white rounded-full transition-all duration-100"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Main Player Content */}
        <div className="flex items-center justify-between">
          {/* Track Info */}
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <img 
              src={currentProject.image} 
              alt={currentProject.title}
              className={`w-12 h-12 object-contain rounded ${isPlaying ? '' : 'grayscale'}`}
            />
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-medium truncate">{currentProject.title}</h3>
              <p className="text-xs opacity-60 truncate">{currentProject.genre}</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            <button 
              onClick={prevTrack}
              className="w-8 h-8 flex items-center justify-center hover:opacity-70 transition-opacity"
            >
              <i className="fas fa-step-backward text-sm"></i>
            </button>
            
            <button 
              onClick={togglePlay}
              className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:bg-opacity-90 transition-all duration-300"
            >
              <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'} ${!isPlaying ? 'ml-0.5' : ''} text-sm`}></i>
            </button>

            <button 
              onClick={stopAudio}
              className="w-8 h-8 flex items-center justify-center hover:opacity-70 transition-opacity"
            >
              <i className="fas fa-stop text-sm"></i>
            </button>
            
            <button 
              onClick={nextTrack}
              className="w-8 h-8 flex items-center justify-center hover:opacity-70 transition-opacity"
            >
              <i className="fas fa-step-forward text-sm"></i>
            </button>
          </div>

          {/* Time & Volume */}
          <div className="flex items-center gap-4 flex-1 justify-end">
            <span className="text-xs opacity-60 min-w-max">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={toggleMute}
                className="w-6 h-6 flex items-center justify-center hover:opacity-70 transition-opacity"
              >
                <i className={`fas ${isMuted || volume === 0 ? 'fa-volume-mute' : volume < 0.5 ? 'fa-volume-down' : 'fa-volume-up'} text-xs`}></i>
              </button>
              
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={displayVolume}
                onChange={handleVolumeChange}
                className="w-20 h-1 bg-white bg-opacity-20 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, white 0%, white ${displayVolume * 100}%, rgba(255,255,255,0.2) ${displayVolume * 100}%, rgba(255,255,255,0.2) 100%)`
                }}
              />
            </div>

            <button 
              onClick={closePlayer}
              className="w-6 h-6 flex items-center justify-center hover:opacity-70 transition-opacity ml-2"
            >
              <i className="fas fa-times text-xs"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BottomMusicPlayer