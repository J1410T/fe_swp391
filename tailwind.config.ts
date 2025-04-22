/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "fpt-orange": "#F37021", // Màu cam FPT #F37021
        "fpt-green": "#239E3E", // Màu xanh FPT
      },
      keyframes: {},
    },
    plugins: [],
  },
};
