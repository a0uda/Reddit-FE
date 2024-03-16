/** @type {import('tailwindcss').Config} */

import withMT from '@material-tailwind/react/utils/withMT';

export default withMT({
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '3rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {
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
        primary: '#FF4500',
        secondary: '#02315C',
        gold: '#FFD635',
        mint: '#00CCC0',
        destructive: '#D93A00',
        lightGray: '#EAEDEF',
        alarmRed: '#EB001F',
      },
    },
  },
  plugins: [],
});
