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
        "orbit-cw": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "orbit-ccw": {
          "0%": { transform: "rotate(360deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
      },
      animation: {
        "radar-sweep": "radar-sweep 12s linear infinite",
        "orbit-slow": "orbit-cw 36s linear infinite",
        "orbit-reverse": "orbit-ccw 26s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
