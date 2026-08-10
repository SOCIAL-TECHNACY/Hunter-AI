import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: "#5E35B1",
          "purple-hover": "#512DA8",
          dark: "#1A1033",
          night: "#0D0820",
          light: "#F3EFFF",
          "light-lavender": "#F8F6FE",
          accent: "#8E64FF",
          "accent-light": "#B39DDB",
          emerald: "#10B981",
        },
      },
      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "Plus Jakarta Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-instrument-serif)", "Instrument Serif", "Georgia", "serif"],
      },
      keyframes: {
        "radar-sweep": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.08)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "radar-sweep": "radar-sweep 8s linear infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        "float-slow": "float-slow 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
