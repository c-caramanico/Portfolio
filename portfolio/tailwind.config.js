/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}', './PortfolioBlueprint.jsx'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Archivo', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
