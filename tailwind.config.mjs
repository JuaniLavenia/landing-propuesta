/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Codbyte palette. 100 and 700 are derived from Brilliant Azure:
        // 100 for soft backgrounds, 700 for small text (5.9:1 on white; 600 is only 3.8:1).
        brand: {
          50: '#f0f2f9', // Ghost White
          100: '#e1f0fd',
          400: '#04b4ed', // Bright Sky (decorative / on dark backgrounds only)
          500: '#0184ec',
          600: '#0184ec', // Brilliant Azure
          700: '#0165b8',
        },
        alabaster: '#d4dbdc', // Alabaster Grey
        dark: '#494849', // Charcoal
      },
    },
  },
  plugins: [],
}
