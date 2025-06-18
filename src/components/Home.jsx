function Home() {
  return (
    <div className="min-h-screen h-[110vh] flex items-center justify-center relative overflow-hidden bg-black">
      {/* Dark background instead of image for testing */}
      <div className="absolute inset-0 bg-black"></div>
      
      {/* Minimal Hero Section */}
      <div className="text-center -mt-10 relative z-10">
        <h1 className="text-6xl md:text-8xl font-light mb-4 tracking-wide text-white">
          YUVAL LAVI
        </h1>
        <div className="w-24 h-[1px] bg-white mx-auto mb-6"></div>
        <p className="text-lg md:text-xl font-light tracking-widest opacity-70 text-white">
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
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

export default Home;