/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // adjust depending on your file structure
  ],
  theme: {
    extend: {
      colors: {
        medical: {
          primary: "hsl(var(--primary))",
          dark: "#165a72", // adjust as needed
          secondary: "#38a169", // adjust as needed
        },
      },
    },
  },
  plugins: [],
};
