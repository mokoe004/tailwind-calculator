/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./dist/index.html",
    "./src/**/*.{js, jsx, ts}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "git-1": "#979ca2",
        "gray-complement": "#271123",
        "gray-complement-shadow": "#1f0e1c",
        "gray-complement-2": "#662d5c",
        "gray-complement-2-shadow": "#1f0e1c",
        "gray-complement-3": "#a54894",
        "gray-600-shadow": "#2d333b",
      },
    },
  },
  plugins: [],
};
