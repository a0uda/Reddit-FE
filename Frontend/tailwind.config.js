/** @type {import('tailwindcss').Config} */

import withMT from '@material-tailwind/react/utils/withMT';

export default withMT({
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'neutral-50': '#FFFFFF',
        'neutral-500': '#D7DFE2',
        'neutral-600': '#BBC7CC',
        'neutral-800': '#7A9299',
        'neutral-900': '#000000',
        orangered: '#FF4500',
        gold: '#FFD635',
        mint: '#00CCC0',
      },
    },
  },
  plugins: [],
});
