const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
      },
      colors: {
        brand: {
          yellow: '#ddab40',
          red: '#c1554d',
          blue: '#009683',
          brown: '#624100',
        },
        'input-bg': '#f3eed9',
      },
      fontFamily: {
        sans: ['Alata', 'sans-serif'],
      },
      extend: {
        spacing: {
          128: '32rem',
          144: '36rem',
        },
        borderRadius: {
          '4xl': '2rem',
        },
      },
    },
  },
  plugins: [],
};
