export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0b0908',
        surface: '#171310',
        'surface-2': '#211a16',
        border: '#514237',
        gold: '#f3b43f',
        orange: '#f07a4f',
        magenta: '#e54791',
        'text-muted': '#c7bbb0',
        'text-dim': '#a89a8e',
      },
      fontFamily: {
        heading: ['Oswald', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
};
