function About() {
    return (
      <section id="about" className="min-h-[100vh] flex items-center py-12 md:py-20 px-4 md:px-8 bg-bgGray">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-20 px-4 lg:px-20">
            {/* About Image - Mobile Responsive */}
            <div className="flex-none flex justify-center w-full lg:w-auto">
              <div className="w-64 sm:w-80 md:w-96 lg:w-[32rem]">
                <img
                  src="/assets/images/portrait.png"
                  alt="Yuval Lavi"
                  className="w-full h-auto object-cover"
                  style={{
                    boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.25) 0px 10px 10px'
                  }}
                  onError={(e) => {
                    console.log('Image failed to load, trying fallback...')
                    e.target.src = "/public/assets/images/portrait.png";
                    e.target.onerror = () => {
                      e.target.src = "/src/assets/images/portrait.png";
                    };
                  }}
                />
              </div>
            </div>
  
            {/* About Text - Mobile Responsive */}
            <div className="flex-1 w-full lg:max-w-4xl">
              <div className="mb-6 md:mb-8 text-center lg:text-left">
                <small className="block mb-2 text-xl md:text-2xl">Yuval Lavi</small>
                <h1 className="mb-4 text-3xl md:text-4xl font-light">Film Composer</h1>
              </div>
              
              <div className="space-y-4 md:space-y-6 text-sm md:text-base leading-6 md:leading-7 text-justify">
                <p>
                  <span className="text-orange-400 font-medium">Yuval Lavi</span> is a classically and contemporary trained composer,
                  and producer for visual media based in Los Angeles. Due to his early
                  introduction to music and professional training in film-scoring,
                  Lavi can completely adapt to all kinds of genres in music and
                  visual media. For Lavi, visual media and music are unequivocally
                  intertwined as a story is rarely completely told without the
                  other. In his practice he often uses music to capture moments,
                  embodying emotions in time, not only through sound but through all
                  senses. The simultaneous juxtaposition of both harmony and melody,
                  as well as shadows and light, simply encapsulates the world around
                  us and allows for a truly uniquely powerful experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
  
  export default About