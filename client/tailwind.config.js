export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        /**
         * Sampled from the Rising Talents mark: crimson wordmark,
         * magenta-to-violet on the R. Paper is the logo's own white field.
         */
        brand: {
          50: '#FFF5F7',
          100: '#FFE4EA',
          200: '#FECDD6',
          300: '#FDA4B4',
          400: '#F43F5E',
          500: '#E1063A',
          600: '#BE123C',
          700: '#9F1239',
          800: '#881337',
          900: '#4C0519',
          950: '#2A0610',
        },
        wine: {
          DEFAULT: '#2A0614',
          soft: '#4A1028',
          mist: '#7A5564',
        },
        paper: '#FFF8F7',
        ink: '#2A0614',
        'ink-soft': '#7A5564',
        cream: '#FFF8F7',
        blush: '#FFF1F3',
      },
      fontFamily: {
        display: ['Syne', 'system-ui', 'sans-serif'],
        body: ['Manrope', 'system-ui', 'sans-serif'],
        script: ['"Great Vibes"', 'cursive'],
      },
      boxShadow: {
        soft: '0 18px 40px -24px rgba(225, 6, 58, 0.45)',
        card: '0 1px 0 rgba(42, 6, 20, 0.06), 0 16px 40px -28px rgba(42, 6, 20, 0.35)',
        ticket: '0 24px 50px -28px rgba(42, 6, 20, 0.45)',
      },
      backgroundImage: {
        mark: 'linear-gradient(105deg, #E1063A 0%, #C2185B 42%, #7B2CBF 100%)',
      },
    },
  },
  plugins: [],
};
