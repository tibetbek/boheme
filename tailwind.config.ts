import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sand: '#E8DDD0',
        linen: '#F5F0E8',
        terracotta: '#C4714A',
        sage: '#7A8C6E',
        earth: '#2C2318',
        cream: '#FAF7F2',
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'Georgia', 'serif'],
        dm: ['var(--font-dm)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'drift-left': 'drift-left 35s linear infinite',
      },
      keyframes: {
        'drift-left': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
