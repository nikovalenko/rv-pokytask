/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Inter', 'ui-sans-serif', 'Roboto', 'Noto Sans', 'sans-serif'],
    },
    extend: {
      fontWeight: {
        h1: '700',
      },
      colors: {
        primary: '#1A1A1E',
        secondary: '#CFCFCF',
      },
    },
  },
  variants: {
    bg: ({ after }) => after(['disabled']),
  },
  plugins: [],
};
