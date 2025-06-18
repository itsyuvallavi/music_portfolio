import { useState, useRef, useEffect } from 'react'
import projectsData from '../data/projects.js'

function BottomMusicPlayer({ currentTrackId, onTrackChange }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.5) // Set default volume to 50%
  const [isMuted, setIsMuted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const audioRef = useRef(null)
  
  const currentProject = projectsData.find(project => project.id === currentTrackId)

  console.log('🎵 BottomMusicPlayer rendered with currentTrackId:', currentTrackId)

  // Format time display
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  // Show player when a track is selected
  useEffect(() => {
    console.log('🎵 BottomMusicPlayer: currentTrackId changed to:', currentTrackId)
    console.log('🎵 BottomMusicPlayer: currentProject:', currentProject?.title)
    setIsVisible(!!currentTrackId)
    console.log('🎵 BottomMusicPlayer: isVisible set to:', !!currentTrackId)
  }, [currentTrackId])

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
  }, [currentProject])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (!currentProject?.audioFile) {
      alert('Audio preview not available for this track yet.')
      return
    }

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play().then(() => {
        console.log('✅ Successfully started playing:', currentProject?.title)
      }).catch(error => {
        console.error('❌ Error playing audio:', error)
        alert(`Unable to play this audio file: ${error.message}`)
      })
    }
    
    setIsPlaying(!isPlaying)
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
      audio.volume = volume
      setIsMuted(false)
    } else {
      audio.volume = 0
      setIsMuted(true)
    }
  }

  // SIMPLIFIED VOLUME HANDLER - NO DEPENDENCIES
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    console.log(`🔊 Volume slider moved to: ${Math.round(newVolume * 100)}%`)
    
    // Update state
    setVolume(newVolume)
    
    // Update audio volume directly - NO DEPENDENCIES
    const audio = audioRef.current
    if (audio && !isMuted) {
      audio.volume = newVolume
      console.log(`🔊 Audio volume updated to: ${Math.round(newVolume * 100)}%`)
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

  // SIMPLIFIED AUDIO LOADING - ONLY TRACK CHANGES
  useEffect(() => {
    console.log('🔄 useEffect triggered for audio loading')
    const audio = audioRef.current
    if (audio && currentProject) {
      console.log('🔄 Loading new track:', currentProject.title)
      
      const handleLoadedMetadata = () => {
        setDuration(audio.duration)
        audio.volume = volume // Set current volume
        console.log(`📊 Metadata loaded: ${currentProject?.title}`)
        console.log(`🔊 Volume set to: ${Math.round(volume * 100)}%`)
      }

      const handleTimeUpdate = () => {
        setCurrentTime(audio.currentTime)
        setDuration(audio.duration || 0)
      }

      const handleEnded = () => {
        setIsPlaying(false)
        setCurrentTime(0)
      }

      const handlePlay = () => {
        setIsPlaying(true)
      }

      const handlePause = () => {
        setIsPlaying(false)
      }

      // Add event listeners
      audio.addEventListener('loadedmetadata', handleLoadedMetadata)
      audio.addEventListener('timeupdate', handleTimeUpdate)
      audio.addEventListener('ended', handleEnded)
      audio.addEventListener('play', handlePlay)
      audio.addEventListener('pause', handlePause)

      // Load the audio
      audio.load()
      setIsPlaying(false)
      setCurrentTime(0)

      // Cleanup function
      return () => {
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
        audio.removeEventListener('timeupdate', handleTimeUpdate)
        audio.removeEventListener('ended', handleEnded)
        audio.removeEventListener('play', handlePlay)
        audio.removeEventListener('pause', handlePause)
      }
    }
  }, [currentTrackId]) // ONLY currentTrackId - nothing else!

  if (!isVisible || !currentProject) {
    console.log('🎵 BottomMusicPlayer: Not rendering because isVisible:', isVisible, 'currentProject:', !!currentProject)
    return null
  }

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black bg-opacity-95 backdrop-blur-md border-t border-white border-opacity-20 z-50">
      {/* Hidden audio element */}
      <audio 
        ref={audioRef}
        src={currentProject?.audioFile}
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
              {formatTime(currentTime)} / {duration > 0 ? formatTime(duration) : currentProject.tracks[0]?.duration}
            </span>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={toggleMute}
                className="w-6 h-6 flex items-center justify-center hover:opacity-70 transition-opacity"
              >
                <i className={`fas ${isMuted ? 'fa-volume-mute' : 'fa-volume-up'} text-xs`}></i>
              </button>
              
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-20 h-1 bg-white bg-opacity-20 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, white 0%, white ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.2) ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.2) 100%)`
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