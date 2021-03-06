const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  purge: ['./src/*.html', './src/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      mm: '320px',
      m: '375px',
      ...defaultTheme.screens,
    },
    extend: {
      aspectRatio: {
        'game-area-mm': '320 / 480',
        'game-area-m': '375 / 812',
        'game-eraser': '126 / 35',
        'game-result-award-image': '375 / 290',
        'site-pic': '280 / 183',
      },
      animation: {
        'loopMove-1': 'loopMove 1s -0s ease-in-out infinite',
        'loopMove-2': 'loopMove 1s -0.25s ease-in-out infinite',
        'loopMove-3': 'loopMove 1s -0.5s ease-in-out infinite',
      },
      colors: {},
      borderWidth: {
        1: '1px',
      },
      backgroundImage: {},
      backgroundSize: {
        '80%': '80%',
      },
      fontFamily: {
        Oswald: ['Oswald', 'sans-serif'],
      },
      height: {
        '0.05rem': '0.05rem',
        '10%': '10%',
        '20%': '20%',
        '30%': '30%',
        '40%': '40%',
        '50%': '50%',
        '60%': '60%',
        '70%': '70%',
        '77.5%': '77.5%',
        '80%': '80%',
        '82.5%': '82.5%',
        '90%': '90%',
        '95%': '95%',
      },
      inset: {
        '3%': '3%',
        '4%': '4%',
        '5%': '5%',
        '6%': '6%',
        '7%': '7%',
        '8%': '8%',
        '10%': '10%',
        '12%': '12%',
        '13.5%': '13.5%',
        '15%': '15%',
        '20%': '20%',
        '48%': '48%',
      },
      keyframes: {
        loopMove: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(0, 15px)' },
        },
      },
      maxWidth: {
        '30%': '30%',
        '50%': '50%',
        '80%': '80%',
        '90%': '90%',
      },
      margin: {
        '0.5%': '0.5%',
        '2.5%': '2.5%',
        '5%': '5%',
        '15%': '15%',
      },
      padding: {
        22: '5.5rem',
        '2.5%': '2.5%',
        '10%': '10%',
        '43.75%': '43.75%',
        '77.3%': '77.3%',
      },
      scale: {
        '-100': '-1',
      },
      translate: {
        '10%': '10%',
        '20%': '20%',
        '25%': '25%',
        '30%': '30%',
        '40%': '40%',
        '45%': '45%',
        '50%': '50%',
        '60%': '60%',
        '65%': '65%',
        '70%': '70%',
        '80%': '80%',
        '90%': '90%',
      },
      transformOrigin: {
        'center-bottom': 'center bottom',
      },
      width: {
        '5%': '5%',
        '10%': '10%',
        '20%': '20%',
        '23%': '23%',
        '25%': '25%',
        '30%': '30%',
        '33%': '33%',
        '70%': '70%',
        '80%': '80%',
        '85%': '85%',
        '90%': '90%',
        '95%': '95%',
      },
      maxHeight: {
        none: 'none',
      },
      zIndex: {
        60: '60',
        background: '100',
        game: '150',
        result: '190',
        'game-answer': '195',
        loading: '200',
        'loading-transition-fx': '300',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
