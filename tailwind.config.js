/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        sidebar: '#FFFFFF',
        sidebarHover: '#FFFFFF',
        backgroundDefault: '#FFFFFF'
      },
      boxShadow: {
        default: '0 2px 4px -2px rgb(0 0 0 / 0.1)'
      }
    },
    fontFamily: {
      sans: ['Montserrat']
    }
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ]
}
