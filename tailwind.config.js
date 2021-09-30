const plugin = require('tailwindcss/plugin')

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    listStyleType: {
      none: 'none',
     disc: 'disc',
     decimal: 'decimal',
     square: 'square',
     roman: 'upper-roman',
    },
    extend: {
      backgroundImage: {
        'landscape': "url('https://images.pexels.com/photos/6469/red-hands-woman-creative.jpg?cs=srgb&dl=pexels-kaboompics-com-6469.jpg&fm=jpg')",
       },
       animation: {
        enter: 'enter 200ms ease-out',
        'slide-in': 'slide-in 0.6s cubic-bezier(.41,.73,.51,1.02)',
        leave: 'leave 150ms ease-in forwards',
      },
      keyframes: {
        enter: {
          '0%': { transform: 'scale(0.9)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        leave: {
          '0%': { transform: 'scale(1)', opacity: 1 },
          '100%': { transform: 'scale(0.9)', opacity: 0 },
        },
        'slide-in': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function({ addBase, theme }) {
      addBase({
        'h1': { fontSize: theme('fontSize.2xl') },
        'h2': { fontSize: theme('fontSize.xl') },
        'h3': { fontSize: theme('fontSize.lg') },
        'ul': {listStyleType: 'disc', listStylePosition: 'outside', paddingInlineStart: "40px"},
        'ol': {listStyleType: 'decimal', listStylePosition: 'outside', paddingInlineStart: "40px"}
      })
    })
  ],
}
