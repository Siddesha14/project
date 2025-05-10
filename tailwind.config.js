module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  important: true,
  theme: {
    extend: {
      colors: {
        bloodred: {
          DEFAULT: '#DC2626',
          light: '#EF4444',
          dark: '#B91C1C'
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/postcss') // Add this line
  ]
}
