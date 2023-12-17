import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';
import typogrpahy from '@tailwindcss/typography';
import queries from '@tailwindcss/container-queries';
import colors from 'tailwindcss/colors';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        ckb: ['rabar', 'Arial', 'montserrat'],
        en: ['montserrat', 'rabar', 'Arial'],
      },
      colors: {
        primary: '#FC002A',
        accent: {
          light: '#999999',
          dark: '#404040',
        },
        secondery: {
          light: '#D9D9D9',
          dark: '#0d0d0d',
        },
        danger: {
          light: colors.rose[400],
          normal: colors.rose[500],
          dark: colors.rose[600],
        },
        warning: {
          light: colors.yellow[400],
          normal: colors.yellow[500],
          dark: colors.yellow[600],
        },
        success: {
          light: colors.green[400],
          normal: colors.green[500],
          dark: colors.green[600],
        },
        info: {
          light: colors.blue[400],
          normal: colors.blue[500],
          dark: colors.blue[600],
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [forms, typogrpahy, queries],
};
export default config;
