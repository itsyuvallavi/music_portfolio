/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        carme: ["Carme", "sans-serif"],
      },
      colors: {
        bgGray: "#1A1A1A", // Move this to the root level
        green: "#006400",
        dark: {
          DEFAULT: "#1a1a1a",
          lighter: "#2a2a2a",
          light: "#3a3a3a",
        },
        accent: {
          DEFAULT: "#ffffff",
          muted: "#cccccc",
          dark: "#999999",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.6s ease-out",
        "scale-hover": "scaleHover 0.3s ease-in-out",
        "slow-zoom": "slowZoom 12s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleHover: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.05)" },
        },
        slowZoom: {
          "0%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
