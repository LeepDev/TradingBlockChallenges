/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'midnight-blue': "#001236",
        teal: '#19bab4',
        'light-sky-blue': '#a4cfff',
        'white-smoke': '#eaecef',
        orange: '#fccc81',
        'dark-slate-blue': '#33415e',
      }
    },
  },
  plugins: [],
}

