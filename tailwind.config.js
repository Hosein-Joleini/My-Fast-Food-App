/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Roboto Mono', 'monospace'],
    },
    extend: {
      height: {
        screen: '100dvh',
      },
      screens: {
        smaller: '384px',
      },
      backgroundImage: {
        hero: "url('/hero.jpg')",
      },
      width: {
        dvwminus: 'calc(100dvw - 1.75rem)',
      },
    },
  },
  plugins: [],
};
