import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#D4AF37",
          light: "#E8C547",
          dark: "#B8960C",
        },
        surface: {
          DEFAULT: "#0A0A0A",
          alt: "#111111",
        }
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
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
        goldGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(212, 175, 55, 0.5)" },
          "50%": { boxShadow: "0 0 40px rgba(212, 175, 55, 0.8)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 1s ease-in-out",
        slideUp: "slideUp 0.8s ease-out",
        goldGlow: "goldGlow 2s infinite",
        float: "float 3s ease-in-out infinite",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(to right, #B8960C, #D4AF37, #E8C547)",
      }
    },
  },
  plugins: [],
};

export default config;
