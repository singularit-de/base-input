/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './cypress/support/component-index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
