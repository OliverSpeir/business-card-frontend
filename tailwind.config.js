/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        30: "7.5rem",
        18: "4.5rem",
        26: "6.5rem"
      },
      minHeight: {
        84: "83.5vh",
        78: "78vh",
        32: "50vw"
      },
      minWidth: {
        32: "32rem"
      }
    },
  },
  daisyui: {
    themes: [
      "light",
      {
        dark: {
          ...require("daisyui/src/theming/themes")["[data-theme=dark]"],
          "primary": "#13a52c",
          "secondary": "#80edb1",
          "accent": "#916fd6",
          "neutral": "#1e192e",
          "base-100": "#373a3e",
          "info": "#8bace9",
          "success": "#7aebd1",
          "warning": "#f7cd36",
          "error": "#fc697a",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};