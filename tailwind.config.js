module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#D10606',
      },
      fontFamily: {
        nunito: ['Nunito'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
