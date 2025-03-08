/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1.25rem",
      },
      colors: {
        primary: "#00D991",
        secondary: "#FF7A00",
        accent: "#FF4081",
        background: {
          DEFAULT: "#F8F9FA",
          dark: "#1A1A1A",
        },
        text: {
          DEFAULT: "#212529",
          dark: "#E9ECEF",
        },
      },
    },
  },
  plugins: [],
};
