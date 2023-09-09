import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class', '.dark-theme'],
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './ui/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        white: 'var(--white)',
        stone: {
          50: 'var(--stone-50)',
          100: 'var(--stone-100)',
          200: 'var(--stone-200)',
          300: 'var(--stone-300)',
          400: 'var(--stone-400)',
          500: 'var(--stone-500)',
          600: 'var(--stone-600)',
          700: 'var(--stone-700)',
          800: 'var(--stone-800)',
          900: 'var(--stone-900)',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('tailwindcss-animate'), require('tailwindcss-radix')()],
};
export default config;
