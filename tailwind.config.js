/** @type {import('tailwindcss').Config} */

// const { nextui } = require("@nextui-org/react");
import { nextui } from "@nextui-org/react";


export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary_one: "#073034", 
        primary_two: "#BCFF66",
        secondary_one: "#0E5A67",
        secondary_two: "#80B7AE",
        secondary_three: "#CAEDEC",
        tertiary_one: "#AAD154",
        tertiary_two: "#FFB03E",
        tertiary_three: "#B50F37",
      },
    },
  },
  plugins: [nextui()],
  darkMode: 'class'
}

