module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily:{
          'sans': ['-apple-system', 'BlinkMacSystemFont'],
            'serif': ['Georgia', 'Cambria'],
           'mono': ['SFMono-Regular', 'Menlo'],

    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('@tailwindcss/line-clamp')
  ],
}
