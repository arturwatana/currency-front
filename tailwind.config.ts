import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        rotate180: "rotate180 1s ease forwards",
        openHeight: "openHeight 1s ease forwards"
      },
      keyframes: {
        rotate180: {
          "0%": {transform: "rotate(0deg)"},
          "100%": {transform: "rotate(180deg)"}
        },
        openHeight: {
          "0%": {height: "0%"},
          "100%": {height: "100%"}
        }
      },
      colors: {
        primaryGreen: "#0074E4 ",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    screens: {
      '2xl': {'max': '1536px'},
      'xl': {'max': '1280px'},
      'lg': {'max': '1024px'},
      'md': {'max': '768px'},
      'sm': {'max': '640px'},
      "sosm": {"max": '440px'}
    }
  },
  plugins: [],
};
export default config;
