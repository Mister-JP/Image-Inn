/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'sequel': ['Sequel Sans', 'sans-serif'] // Assuming 'Sequel Sans' font is installed or imported
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.700'),
            a: {
              color: theme('colors.blue.500'),
              '&:hover': {
                color: theme('colors.blue.700'),
              },
            },
            h2: {
              fontFamily: theme('fontFamily.sequel'),
              letterSpacing: theme('letterSpacing.widest'),
              background: 'linear-gradient(to right, red , yellow)', // Replace 'red' and 'yellow' with your desired colors
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            },
          },
        },
      }),
    },
  },
  plugins: [],
}
