/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: '#faf7f2',
          surface: '#f1ece4',
          panel: '#e8e1d5',
          card: '#ddd4c4',
          'card-hover': '#d3c9b7',
          input: '#f5f1eb',
        },
        emerald: {
          bright: '#c0805a',
          mid: '#a86e4a',
          dim: '#8b5a3c',
          glow: 'rgba(192, 128, 90, 0.1)',
          'glow-lg': 'rgba(192, 128, 90, 0.18)',
        },
        danger: {
          red: '#c44545',
          dim: '#8b3a3a',
          bg: 'rgba(196, 69, 69, 0.08)',
          border: 'rgba(196, 69, 69, 0.35)',
        },
        txt: {
          primary: '#3d3124',
          secondary: '#8b7a68',
          muted: '#b5a494',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"Fira Code"', '"Courier New"', 'monospace'],
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '16px',
        xl: '22px',
      },
      spacing: {
        sidebar: '240px',
        header: '56px',
        disclaimer: '40px',
      },
      animation: {
        'fade-in': 'fadeIn 200ms ease',
        bounce: 'bounce 1s ease infinite',
        'orb-glow': 'bounce 2s infinite ease-in-out',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
