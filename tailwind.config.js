/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Red Soil Theme
        primary: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#C85A3D',  // Warm earthy red / terracotta primary
          600: '#A8422F',  // Darker clay-red accent
          700: '#8B3524',
          800: '#6B2819',
          900: '#4A1B11',
        },
        soil: {
          light: '#F5F1ED',  // Off-white background
          base: '#C85A3D',   // Terracotta
          dark: '#A8422F',   // Clay-red
          darker: '#8B3524', // Dark clay
        },
        text: {
          base: '#1A0F08',   // Red Soil deep dark brown - brighter, more vibrant
          light: '#3D2415',  // Red Soil brighter medium brown
          muted: '#6B4226',  // Red Soil brighter muted brown
        },
        bg: {
          light: '#F5F1ED',  // Off-white
          dark: '#EDE5DC',   // Light terracotta tint
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
