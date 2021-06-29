/* eslint-disable global-require */
module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial':
          'linear-gradient(90deg, rgba(255,207,0,1) 0%, rgba(254,148,30,1) 39%, rgba(252,79,79,1) 100%);',
      },
      keyframes: {
        move: {
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'spin-slow': 'move 2s linear infinite',
      },
      colors: {
        'primary-blue': '#71EAFF',
        headers: '#BDBDBD',
      },
      fontFamily: {
        body: ['Montserrat', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      boxShadow: {
        boxes: '0px 0px 30px rgba(0, 0, 0, 0.25)',
        scroll: '0px 0px 30px 3px #F2994A',
      },
      dropShadow: {
        inputs: '0px 0px 30px #56CCF2',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
