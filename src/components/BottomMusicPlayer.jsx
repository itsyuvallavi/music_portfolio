import { useState, useRef, useEffect } from 'react'
import projectsData from '../data/projects.js'

function BottomMusicPlayer({ currentTrackId, onTrackChange }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.6)
  const [isMuted, setIsMuted] = useState(false)
  const [previousVolume, setPreviousVolume] = useState(0.6)
  const [isVisible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
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

  // Show/hide player when track changes
  useEffect(() => {
    setIsVisible(!!currentTrackId)
    if (!currentTrackId) {
      setError(null)
    }
  }, [currentTrackId])

  // Expose play function for external calls
  useEffect(() => {
    window.startMusicPlayer = () => {
      const audio = audioRef.current
      if (audio && currentProject?.audioFile) {
        audio.play().then(() => {
          setIsPlaying(true)
        }).catch(error => {
          setError('Unable to play audio')
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
      setError('Audio preview not available for this track')
      return
    }

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      setIsLoading(true)
      const playPromise = audio.play()
      
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setIsPlaying(true)
          setIsLoading(false)
          setError(null)
        }).catch(error => {
          setIsPlaying(false)
          setIsLoading(false)
          setError(`Unable to play: ${error.message}`)
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
    setError(null)
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
      setIsMuted(false)
      setVolume(previousVolume)
      audio.volume = previousVolume
    } else {
      setPreviousVolume(volume)
      setIsMuted(true)
      audio.volume = 0
    }
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    
    const audio = audioRef.current
    if (audio) {
      audio.volume = isMuted ? 0 : newVolume
    }
    
    // Auto-unmute if volume is changed while muted
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

  // Handle audio loading and events
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !currentProject?.audioFile) return

    setIsLoading(true)
    setError(null)
    
    const handleLoadedMetadata = () => {
      const audioDuration = audio.duration
      if (isFinite(audioDuration) && !isNaN(audioDuration)) {
        setDuration(audioDuration)
      }
      setIsLoading(false)
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
      // Auto-play next track
      nextTrack()
    }

    const handlePlay = () => {
      setIsPlaying(true)
    }

    const handlePause = () => {
      setIsPlaying(false)
    }

    const handleCanPlay = () => {
      // Ensure volume is set when audio is ready
      audio.volume = isMuted ? 0 : volume
      setIsLoading(false)
    }

    const handleError = (e) => {
      setIsPlaying(false)
      setIsLoading(false)
      setError('Failed to load audio file')
    }

    const handleLoadStart = () => {
      setIsLoading(true)
    }

    // Add event listeners
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('canplay', handleCanPlay)
    audio.addEventListener('error', handleError)
    audio.addEventListener('loadstart', handleLoadStart)

    // Reset states and load new track
    setIsPlaying(false)
    setCurrentTime(0)
    setDuration(0)
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
      audio.removeEventListener('loadstart', handleLoadStart)
    }
  }, [currentTrackId])

  if (!isVisible || !currentProject) return null

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0
  const displayVolume = isMuted ? 0 : volume

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 bg-black bg-opacity-95 backdrop-blur-md border-t border-white border-opacity-20 z-50"
      role="region"
      aria-label="Music player"
    >
      {/* Hidden audio element */}
      <audio 
        ref={audioRef}
        src={currentProject?.audioFile}
        preload="metadata"
        aria-hidden="true"
      />

      <div className="px-4 py-3">
        {/* Error Display */}
        {error && (
          <div className="w-full bg-red-900 bg-opacity-50 text-red-200 text-xs px-3 py-1 mb-2 rounded">
            {error}
          </div>
        )}

        {/* Progress Bar */}
        <div 
          className="w-full h-1 bg-white bg-opacity-20 rounded-full cursor-pointer mb-3 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          onClick={handleProgressClick}
          role="slider"
          aria-label="Audio progress"
          aria-valuemin="0"
          aria-valuemax={duration}
          aria-valuenow={currentTime}
          tabIndex="0"
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
              const audio = audioRef.current
              if (audio && duration) {
                const step = duration * 0.05 // 5% steps
                const newTime = e.key === 'ArrowLeft' 
                  ? Math.max(0, currentTime - step)
                  : Math.min(duration, currentTime + step)
                audio.currentTime = newTime
              }
            }
          }}
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
              alt={`${currentProject.title} album cover`}
              className={`w-12 h-12 object-contain rounded transition-all duration-300 ${
                isPlaying ? '' : 'grayscale'
              } ${isLoading ? 'animate-pulse' : ''}`}
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
              className="w-8 h-8 flex items-center justify-center hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded"
              aria-label="Previous track"
              type="button"
            >
              <i className="fas fa-step-backward text-sm" aria-hidden="true"></i>
            </button>
            
            <button 
              onClick={togglePlay}
              disabled={isLoading}
              className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:bg-opacity-90 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 disabled:opacity-50"
              aria-label={isPlaying ? 'Pause' : 'Play'}
              type="button"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'} ${!isPlaying ? 'ml-0.5' : ''} text-sm`} aria-hidden="true"></i>
              )}
            </button>

            <button 
              onClick={stopAudio}
              className="w-8 h-8 flex items-center justify-center hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded"
              aria-label="Stop"
              type="button"
            >
              <i className="fas fa-stop text-sm" aria-hidden="true"></i>
            </button>
            
            <button 
              onClick={nextTrack}
              className="w-8 h-8 flex items-center justify-center hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded"
              aria-label="Next track"
              type="button"
            >
              <i className="fas fa-step-forward text-sm" aria-hidden="true"></i>
            </button>
          </div>

          {/* Time & Volume */}
          <div className="flex items-center gap-4 flex-1 justify-end">
            <span className="text-xs opacity-60 min-w-max" aria-live="polite">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={toggleMute}
                className="w-6 h-6 flex items-center justify-center hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
                type="button"
              >
                <i className={`fas ${
                  isMuted || volume === 0 ? 'fa-volume-mute' : 
                  volume < 0.5 ? 'fa-volume-down' : 'fa-volume-up'
                } text-xs`} aria-hidden="true"></i>
              </button>
              
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={displayVolume}
                onChange={handleVolumeChange}
                className="w-20 h-1 bg-white bg-opacity-20 rounded-full appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                style={{
                  background: `linear-gradient(to right, white 0%, white ${displayVolume * 100}%, rgba(255,255,255,0.2) ${displayVolume * 100}%, rgba(255,255,255,0.2) 100%)`
                }}
                aria-label="Volume"
                aria-valuemin="0"
                aria-valuemax="1"
                aria-valuenow={displayVolume}
              />
            </div>

            <button 
              onClick={closePlayer}
              className="w-6 h-6 flex items-center justify-center hover:opacity-70 transition-opacity ml-2 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded"
              aria-label="Close player"
              type="button"
            >
              <i className="fas fa-times text-xs" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BottomMusicPlayer