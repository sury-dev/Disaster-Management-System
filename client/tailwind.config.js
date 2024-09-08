/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'dark-purple': '#5941A9',  
        'dark-purple-x': '#2E2258',      
        'light-purple': '#EEE2F3',
      },
      fontFamily: {
        suse: ['Raleway', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif']
      }
    },
  },
  plugins: [],
};