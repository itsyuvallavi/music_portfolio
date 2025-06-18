import { useState } from 'react'

// Import plugin images
import HangDreamImage from '../assets/images/HangDream.png'
import FrozenReverbImage from '../assets/images/FrozenReverb.png'

function Plugins() {
  const [emailModal, setEmailModal] = useState({ isOpen: false, plugin: null })
  const [formData, setFormData] = useState({ email: '', name: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Plugin data
  const pluginsData = [
    {
      id: 1,
      name: "Hang Dream",
      description: "A beautifully captured digital recreation of the Hang Drum, recorded at God Knows Studios with premium microphones including the Coles 4038 and AKG C414 XLS.",
      image: HangDreamImage,
      downloadUrl: "https://drive.google.com/file/d/your-file-id-1/view", // Replace with your Google Drive link
      features: [
        "Premium studio recording with Coles 4038 & AKG C414 XLS microphones",
        "Versatile mic positioning and tonal adjustment controls", 
        "Perfect for ambient soundscapes and cinematic scores"
      ],
      version: "v1.1",
      compatibility: "Kontakt, VST3, AU, AAX",
      comingSoon: true // Added this flag
    },
    {
      id: 2,
      name: "FrozenReverb", 
      description: "A sophisticated reverb and shimmer plugin featuring intuitive controls for creating lush, atmospheric soundscapes with precise parameter control.",
      image: FrozenReverbImage,
      downloadUrl: "https://drive.google.com/file/d/your-file-id-2/view", // Replace with your Google Drive link
      features: [
        "Advanced reverb engine with size, width, and damping controls",
        "Built-in shimmer effect for ethereal, crystalline textures",
        "MIDI-controllable parameters for live performance"
      ],
      version: "v0.7",
      compatibility: "VST3, AU, AAX",
      comingSoon: true // Added this flag
    }
  ]

  const openEmailModal = (plugin) => {
    setEmailModal({ isOpen: true, plugin })
    setFormData({ email: '', name: '' })
  }

  const closeEmailModal = () => {
    setEmailModal({ isOpen: false, plugin: null })
    setFormData({ email: '', name: '' })
    setIsSubmitting(false)
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Here you would typically send the email to your backend/database
      // For now, we'll simulate the process
      console.log('Email submitted:', formData.email, 'for plugin:', emailModal.plugin.name)
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Open the Google Drive download link
      window.open(emailModal.plugin.downloadUrl, '_blank')
      
      // Show success message
      alert('Thank you! Your download should start shortly.')
      
      closeEmailModal()
    } catch (error) {
      console.error('Error submitting email:', error)
      alert('There was an error processing your request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="plugins" className="min-h-screen py-20 px-8 bg-bgGray relative pb-40">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-sm tracking-[0.3em] uppercase opacity-70 mb-4">
            Audio Plugins
          </h2>
          <div className="w-12 h-[1px] bg-white"></div>
        </div>

        {/* Plugins Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {pluginsData.map((plugin) => (
            <div key={plugin.id} className="bg-zinc-900 border border-zinc-800 overflow-hidden h-full flex flex-col">
              {/* Plugin Image */}
              <div className="aspect-video bg-zinc-800 flex items-center justify-center">
                <img 
                  src={plugin.image} 
                  alt={plugin.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to placeholder if image doesn't load
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23374151'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23fff' font-family='Arial' font-size='16'%3EPlugin Preview%3C/text%3E%3C/svg%3E"
                  }}
                />
              </div>

              {/* Plugin Content */}
              <div className="p-6 flex-1 flex flex-col">
                {/* Header */}
                <div className="mb-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-light tracking-wide">{plugin.name}</h3>
                    <span className="text-xs opacity-60 bg-zinc-800 px-2 py-1 rounded">
                      {plugin.version}
                    </span>
                  </div>
                  <p className="text-sm opacity-75 leading-relaxed">{plugin.description}</p>
                </div>

                {/* Features */}
                <div className="mb-6 flex-1">
                  <h4 className="text-sm tracking-wider opacity-70 mb-3">KEY FEATURES</h4>
                  <ul className="space-y-2">
                    {plugin.features.map((feature, index) => (
                      <li key={index} className="text-sm opacity-80 flex items-center">
                        <div className="w-1 h-1 bg-white rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Compatibility */}
                <div className="mb-6">
                  <h4 className="text-sm tracking-wider opacity-70 mb-2">COMPATIBILITY</h4>
                  <p className="text-sm opacity-80">{plugin.compatibility}</p>
                </div>

                {/* Download Button - Modified for Coming Soon */}
                <button
                  onClick={plugin.comingSoon ? null : () => openEmailModal(plugin)}
                  disabled={plugin.comingSoon}
                  className={`w-full py-3 text-sm tracking-wider mt-auto transition-all duration-300 ${
                    plugin.comingSoon 
                      ? 'border border-white border-opacity-20 text-white text-opacity-50 cursor-not-allowed bg-zinc-800 bg-opacity-50' 
                      : 'border border-white border-opacity-30 hover:bg-white hover:text-black'
                  }`}
                >
                  {plugin.comingSoon ? 'COMING SOON' : 'DOWNLOAD FREE'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Email Modal - Only shows for non-coming-soon plugins */}
        {emailModal.isOpen && !emailModal.plugin?.comingSoon && (
          <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-zinc-900 border border-zinc-700 max-w-md w-full p-6">
              <div className="mb-6">
                <h3 className="text-xl font-light mb-2">Download {emailModal.plugin?.name}</h3>
                <p className="text-sm opacity-75">
                  Enter your email to receive the download link and stay updated on new releases.
                </p>
              </div>

              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Name (Optional)"
                    className="w-full bg-transparent border-b border-white border-opacity-30 py-3 text-sm font-light placeholder-white placeholder-opacity-50 focus:outline-none focus:border-opacity-100 transition-all duration-300"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email Address"
                    required
                    className="w-full bg-transparent border-b border-white border-opacity-30 py-3 text-sm font-light placeholder-white placeholder-opacity-50 focus:outline-none focus:border-opacity-100 transition-all duration-300"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={closeEmailModal}
                    className="flex-1 py-3 border border-white border-opacity-30 text-sm tracking-wider hover:border-opacity-100 transition-all duration-300"
                    disabled={isSubmitting}
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-white text-black text-sm tracking-wider hover:bg-opacity-90 transition-all duration-300 disabled:opacity-50"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'SENDING...' : 'DOWNLOAD'}
                  </button>
                </div>
              </form>

              <p className="text-xs opacity-50 mt-4 text-center">
                We respect your privacy. Your email will only be used for updates about new releases.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Shape transition to Contact section */}
      <div className="absolute -bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-20"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            style={{ fill: '#f3f4f6' }}
          ></path>
        </svg>
      </div>
    </section>
  )
}

export default Plugins