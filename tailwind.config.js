/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F5F1E8',
        paper: '#FBF9F4',
        stone: '#E7E1D2',
        ink: '#2B2119',
        ink2: '#3A2E23',
        olive: {
          DEFAULT: '#47502F',
          light: '#5C6A3D',
          dark: '#333A22',
        },
        clay: '#C98F6E',
        rose: '#D9A497',
        sage: {
          50: '#F1F0E7',
          100: '#DDE0CB',
          200: '#BFC6A0',
          300: '#98A56E',
          400: '#748249',
          500: '#586636',
          600: '#3D4726',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        body: ['"Public Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      letterSpacing: {
        widest2: '0.22em',
      },
    },
  },
  plugins: [],
}
