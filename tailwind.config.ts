// tailwind.config.js
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    //
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#0d9488",
              foreground: "#f1f5f9",
            },
          },
        },
      },
    }),
    require("tailwindcss-debug-screens"),
  ],
};
