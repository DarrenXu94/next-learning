module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        'landscape': "url('https://images.pexels.com/photos/6469/red-hands-woman-creative.jpg?cs=srgb&dl=pexels-kaboompics-com-6469.jpg&fm=jpg')",
       }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
