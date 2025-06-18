import { useState, useEffect } from 'react'
import homescreenImage from '../assets/images/homescreen.jpg'

function Home() {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Preload the optimized hero image
    const img = new Image()
    img.onload = () => {
      setImageLoaded(true)
      // Small delay for smooth transition
      setTimeout(() => setShowContent(true), 100)
    }
    img.src = homescreenImage

    // Prefetch other critical images
    const prefetchImages = [
      '../assets/images/portrait.png',
      '../assets/images/tree.jpg'
    ]
    
    prefetchImages.forEach(src => {
      const link = document.createElement('link')
      link.rel = 'prefetch'
      link.href = src
      document.head.appendChild(link)
    })
  }, [])

  return (
    <div className="min-h-screen h-[110vh] flex items-center justify-center relative overflow-hidden">
      {/* Fast-loading placeholder background */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black transition-opacity duration-500 ${
          imageLoaded ? 'opacity-30' : 'opacity-100'
        }`}
      />
      
      {/* Optimized Background Image - should load much faster now! */}
      {imageLoaded && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-slow-zoom"
          style={{
            backgroundImage: `url(${homescreenImage})`,
            willChange: 'transform'
          }}
        />
      )}
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-bgGray bg-opacity-30" />
      
      {/* Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, transparent 80%, rgba(26, 26, 26, 0.7) 90%, rgba(26, 26, 26, 1) 100%)",
        }}
      />
      
      {/* Hero Content - Show immediately, enhance when ready */}
      <div className={`text-center -mt-10 relative z-10 transition-all duration-700 ${
        showContent ? 'opacity-100 transform-none' : 'opacity-70 transform scale-95'
      }`}>
        <h1 className="text-6xl md:text-8xl font-light mb-4 tracking-wide">
          YUVAL LAVI
        </h1>
        <div className="w-24 h-[1px] bg-white mx-auto mb-6" />
        <p className="text-lg md:text-xl font-light tracking-widest opacity-70">
          FILM COMPOSER
        </p>
      </div>
      
      {/* Scroll indicator */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 animate-bounce z-10 cursor-pointer hover:opacity-80 transition-opacity"
        style={{ bottom: "calc(10vh + 2rem)" }}
        onClick={() => {
          document.getElementById("about")?.scrollIntoView({
            behavior: "smooth",
          });
        }}
      >
        <div className="w-6 h-10 border border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default Home;