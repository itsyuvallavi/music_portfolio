import { useState } from 'react'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  return (
    <section id="contact" className="min-h-[50vh] flex items-center py-12 px-8 bg-gray-100 text-black relative">
      <div className="max-w-4xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="mb-8 text-center">
          <h2 className="text-sm tracking-[0.3em] uppercase opacity-70 mb-4">
            Contact
          </h2>
          <div className="w-12 h-[1px] bg-black mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-light mb-4 tracking-wide">
                Let's work together
              </h3>
              <p className="text-base opacity-75 font-light leading-relaxed">
                Available for collaborations, commissions, and creative projects.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <div className="text-sm opacity-60 tracking-wider mb-1">EMAIL</div>
                <a href="mailto:yuvalavi12@gmail.com" className="hover:opacity-70 transition-opacity text-lg">
                  yuvalavi12@gmail.com
                </a>
              </div>
              
              <div>
                <div className="text-sm opacity-60 tracking-wider mb-1">LOCATION</div>
                <div className="text-lg">Available Worldwide</div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              <a 
                href="#" 
                className="w-10 h-10 border border-black border-opacity-30 rounded-full flex items-center justify-center hover:border-opacity-100 hover:bg-black hover:text-white transition-all duration-300"
              >
                <i className="fab fa-instagram text-sm"></i>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 border border-black border-opacity-30 rounded-full flex items-center justify-center hover:border-opacity-100 hover:bg-black hover:text-white transition-all duration-300"
              >
                <i className="fab fa-soundcloud text-sm"></i>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 border border-black border-opacity-30 rounded-full flex items-center justify-center hover:border-opacity-100 hover:bg-black hover:text-white transition-all duration-300"
              >
                <i className="fab fa-spotify text-sm"></i>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                  className="w-full bg-transparent border-b border-black border-opacity-30 py-3 text-base font-light placeholder-black placeholder-opacity-50 focus:outline-none focus:border-opacity-100 transition-all duration-300"
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                  className="w-full bg-transparent border-b border-black border-opacity-30 py-3 text-base font-light placeholder-black placeholder-opacity-50 focus:outline-none focus:border-opacity-100 transition-all duration-300"
                />
              </div>

              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Message"
                  required
                  rows={3}
                  className="w-full bg-transparent border-b border-black border-opacity-30 py-3 text-base font-light placeholder-black placeholder-opacity-50 focus:outline-none focus:border-opacity-100 transition-all duration-300 resize-none"
                />
              </div>

              <button
                type="submit"
                className="mt-6 px-8 py-3 border border-black border-opacity-50 text-sm tracking-wider hover:bg-black hover:text-white transition-all duration-300"
              >
                SEND MESSAGE
              </button>
            </form>
          </div>
        </div>
              </div>
    </section>
  )
}

export default Contact