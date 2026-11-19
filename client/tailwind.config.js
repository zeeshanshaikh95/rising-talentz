export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        /**
         * Premium, modern palette. Violet anchors the Rising Talents mark;
         * warm orange carries the Diwali/festive cue; navy gives weight.
         */
        brand: {
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
          950: '#2E1065',
        },
        warm: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          500: '#F97316',
          600: '#EA580C',
          700: '#C2410C',
        },
        navy: {
          DEFAULT: '#0B1020',
          soft: '#1E293B',
          mist: '#475569',
        },
        paper: '#FBF8F4',
        ink: '#0B1020',
        'ink-soft': '#475569',
        cream: '#FBF8F4',
        blush: '#F5F3FF',
      },
      fontFamily: {
        display: ['Syne', 'system-ui', 'sans-serif'],
        body: ['Manrope', 'system-ui', 'sans-serif'],
        script: ['"Great Vibes"', 'cursive'],
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(124, 58, 237, 0.35)',
        card: '0 1px 2px rgba(11,16,32,0.06), 0 18px 40px -24px rgba(11,16,32,0.25)',
        ticket: '0 24px 60px -28px rgba(11,16,32,0.4)',
        glow: '0 0 60px -10px rgba(124, 58, 237, 0.45)',
      },
      backgroundImage: {
        mark: 'linear-gradient(110deg, #7C3AED 0%, #EC4899 50%, #F97316 100%)',
        'mark-soft': 'linear-gradient(110deg, rgba(124,58,237,0.12) 0%, rgba(236,72,153,0.08) 100%)',
      },
      borderRadius: {
        blob: '1.25rem',
      },
    },
  },
  plugins: [],
};
