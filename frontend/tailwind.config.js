/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#E46AD9",
        secondary: "#8864D5",
        custom_blue: "#025CCE",
      },
    },
  },
  plugins: [],
};
