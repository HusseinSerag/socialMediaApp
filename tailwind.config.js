/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          100: "#f7f7f7",
          500: "#8f92a1",
          800: "#4b4c4d",
          900: "#1e1f20",
          "500_33": "#8f92a133",
          "900_66": "#1e1f2066",
          "500_7e": "#8f92a17e",
          "500_66": "#8f92a166",
          "500_99": "#8f92a199",
        },
        light_blue: { 200: "#79d0f1", "200_33": "#79d0f133" },
        white: {
          A700: "#ffffff",
          A700_99: "#ffffff99",
          A700_33: "#ffffff33",
          A700_cc: "#ffffffcc",
          A700_7e: "#ffffff7e",
          A700_66: "#ffffff66",
        },
        indigo: { 600: "#39579b", A200: "#666aec", A200_33: "#666aec33" },
        red: { A200: "#ff4e4e" },
        green: { 400: "#53d769" },
      },
      boxShadow: {},
      fontFamily: { inter: "Inter", sfprodisplay: "SF Pro Display" },
      backgroundImage: {
        gradient: "linear-gradient(180deg, #1e1f2000,#1e1f20cc)",
      },
      opacity: { 0.4: 0.4 },
    },
  },
  plugins: [],
};
