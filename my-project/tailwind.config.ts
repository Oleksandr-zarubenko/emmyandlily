import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      xl: "1200px",
      smOnly: { max: "767.98px" },
      mdOnly: { min: "768px", max: "1199.98px" },
      notXl: { max: "1199.98px" },
    },
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "1rem",
          md: "2.5rem",
          xl: "100px",
        },
      },
      colors: {
        primary: "#FF8667",
        dark: "#333",
        black: "#000",
        white: "#FFF",
        bg_primary: "#fad5a2",
        bg_secondary: "#FFEACB",
      },
      fontSize: {
        t16: "16px",
        t20: "20px",
        t24n: "24px",
        t24: [
          "24px",
          {
            fontWeight: "700",
          },
        ],
        t40: [
          "40px",
          {
            fontWeight: "700",
          },
        ],
        t50: [
          "50px",
          {
            fontWeight: "800",
          },
        ],
        t80: [
          "80px",
          {
            fontWeight: "800",
          },
        ],
      },
    },
  },
  plugins: [],
};
export default config;
