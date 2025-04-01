/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // <--- Important
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3A6EA5',
        secondary: '#5B8FB9',
        accent: '#A8D5BA',
        softgreen: '#D4EDDA',
        cream: '#F9FDFB',
        dark: '#2F4858',
        muted: '#CBD5E0',
      },
    },
  },
  plugins: [],
};
