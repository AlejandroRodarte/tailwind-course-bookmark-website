module.exports = {
  content: ['./*.html'],
  plugins: [],
  theme: {
    extend: {
      backgroundImage: () => ({
        // .bg-dots
        dots: "url('../images/bg-dots.svg')"
      }),
      colors: {
        'soft-blue': 'hsl(231, 69%, 60%)',
        'soft-red': 'hsl(0, 94%, 66%)',
        'grayish-blue': 'hsl(229, 8%, 60%)',
        'very-dark-blue': 'hsl(229, 31%, 21%)',
      },
      fontFamily: {
        sans: ['Rubik', 'sans-serif'],
      },
    },
    screens: {
      sm: '480px',
      md: '768px',
      lg: '1020px',
      xl: '1440px',
    },
  },
};
