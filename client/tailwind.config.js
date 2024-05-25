/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primaryWhite: '#FFFFFE',
        primaryBlack: '#121826',
        secondaryBlack: '#364153',
        primaryGray: '#CED6E1',
        primaryBlue: '#406AFF'
      },
      fontFamily: {
        outfit: 'Outfit'
      },
      fontSize: {
        smallH: '2rem',
        bigH: '2.5rem',
        medB: '1rem',
        smallB: '0.625rem'
      }
    },
  },
  plugins: [],
  darkMode: 'class'
}

