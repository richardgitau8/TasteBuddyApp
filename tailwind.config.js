/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F23A29',
        hover: '#C2251C',
        secondary: '#F29F05',
        success: '#9ABF80',
        accent: '#518C27',
        dark: '#262626',
        medium: '#595959',
        light: '#F2F2F2',
      },
    },
  },
  plugins: [],
}