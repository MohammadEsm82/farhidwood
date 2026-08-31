/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: "#C8A96A",
        secondary: "#111111",
        accent: "#8A6A44",

        background: "#0A0A0A",
        surface: "#171717",
        surfaceLight: "#232323",

        text: {
          tprimary: "#FFFFFF",
          tsecondary: "#BDBDBD",
          tmuted: "#7A7A7A",
        },

        border: "#2E2E2E",

        success: "#22C55E",
        warning: "#F59E0B",
        danger: "#EF4444",
      },

      fontFamily: {
        primary: ["IRANSans", "sans-serif"],
      },
    },
  },

  plugins: [],
};
