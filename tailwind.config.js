const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,svg}'],
  theme: {
    fontFamily: {
      sans: ['Inter var', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        turquoise: '#003747', // Adjust the hex code to your preferred shade of turquoise
      },
      boxShadow: {
        'neumorphic': '8px 8px 15px #a7a7a7, -8px -8px 15px #ffffff', // Adjust the values for your desired neumorphic effect
      },
    },
  },
  variants: {
    extend: {
      ring: ['focus-visible'],
    },
  },
};
