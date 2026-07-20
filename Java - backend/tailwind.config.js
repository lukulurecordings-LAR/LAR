
export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        bg: '#0D0907',
        surface: '#1A1410',
        'surface-2': '#241E18',
        border: '#3D3228',
        gold: '#E8A838',
        'gold-light': '#F5C563',
        orange: '#E17055',
        magenta: '#D63384',
        purple: '#7B2D8E',
        'text-muted': '#A89F91',
        'text-dim': '#7A7063',
      },
      fontFamily: {
        heading: ['Oswald', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-sunset': 'linear-gradient(135deg, #7B2D8E, #D63384, #E17055, #E8A838)',
        'gradient-warm': 'linear-gradient(135deg, #E17055, #E8A838)',
      }
    },
  },
}
