/* eslint-disable global-require */
module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial-hot':
          'linear-gradient(90deg, rgba(255,207,0,1) 0%, rgba(254,148,30,1) 39%, rgba(252,79,79,1) 100%)',
        'gradient-radial-cool':
          'linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(48,217,194,1) 44%, rgba(65,44,245,1) 100%)',
      },
      keyframes: {
        move: {
          to: { transform: 'rotate(360deg)' },
        },
        'zoom-down': {
          from: { transform: 'scale(1)' },
          to: { transform: 'scale(1.05)' },
        },
        'zoom-up': {
          from: { transform: 'scale(1)' },
          to: { transform: 'scale(0.85) translateY(-20%)' },
        },
      },
      animation: {
        'spin-slow': 'move 2s linear infinite',
        'zoom-down': 'zoom-down 0.5s forwards',
        'zoom-up': 'zoom-up 0.5s forwards',
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
        boxesHighlight: '0px 0px 30px rgb(242 153 74 / 25%)',
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
