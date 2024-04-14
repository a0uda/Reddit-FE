/** @type {import('tailwindcss').Config} */

import withMT from '@material-tailwind/react/utils/withMT';

export default withMT({
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1rem',
        lg: '2rem',
        xl: '3rem',
        '2xl': '3rem',
      },
    },
    extend: {
      height: {
        navbar: 'var(--navbar-height)',
      },
      gridTemplateColumns: {
        // Simple 16 col grid
        16: 'repeat(16, minmax(0, 1fr))',

        // Complex site-specific col configuration
        layout: '272px minmax(400px, 1fr)',
      },
      gridTemplateRows: {
        // Simple 16 row grid
        16: 'repeat(16, minmax(0, 1fr))',

        // Complex site-specific row configuration
        layout: '300px minmax(400px, 1fr) 400px',
      },
      colors: {
        'neutral-white': '#FFFFFF',
        'neutral-muted': '#e2e7e9',
        'neutral-black': '#000000',
        'neutral-200': '#F2F6F7',
        'neutral-500': '#D7DFE2',
        'neutral-700': '#BBC7CC',
        'neutral-900': '#7A9299',
        foreground: '#000000',
        background: '#FFFFFF',
        // red: '#EA0027',
        'red-muted': '#B8001F',
        orange: '#FF4500',
        'orange-muted': '#CC3600',
        'orange-red': '#FB133A',
        yellow: '#FFB000',
        'yellow-muted': '#CC8B00',
        gold: '#FFD635',
        'gold-muted': '#CCAC2B',
        'green-light': '#94E044',
        'green-light-muted': '#73AD34',
        // green: '#46D160',
        'green-muted': '#349E48',
        'mint-light': '#0DD3BB',
        'mint-light-muted': '#0AA18F',
        mint: '#00A6A5',
        'mint-muted': '#007373',
        'blue-light': '#0079D3',
        'blue-light-muted': '#005BA1',
        blue: '#014980',
        'blue-muted': '#0266B3',
        violet: '#7193FF',
        'violet-muted': '#5A74CC',
        pink: '#FF66AC',
        'pink-muted': '#CC5289',
        'danger-red': '#ff585b',
        'lines-color': '#EDEFF1',
        'gray-light': '#7C7C7C',
      },
      width: {
        'fit-content': 'fit-content',
      },
    },
  },
  plugins: [],
});
