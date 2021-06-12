module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      boxShadow: {
        DEFAULT: '0 1px 3px 0 rgba(0, 255, 0, 0.1)',
        md: '0 4px 6px -1px rgba(0, 255, 0, 0.2), 0 2px 4px -1px rgba(0, 255, 0, 0.2)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('tailwind-scrollbar')],
};
