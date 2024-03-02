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
          DEFAULT: "28px",
          sm: "28px",
          md: "80px",
          xl: "100px",
        },
      },
      colors: {
        primary: "#fad5a2",
        primary_T: "#FFF0ED",
        dark: "#FFEACB",
        black: "#000",
        white: "#FFF",
        bg_primary: "#FF8667",
        bg_secondary: "#333",
        border: "#DCDCDC",
        error: "#FF0000",
      },
      fontSize: {
        t8: "8px",
        t10: "10px",
        t12: "12px",
        t16: "16px",
        t18: "18px",
        t20: "20px",
        t24n: "24px",
        t24: [
          "24px",
          {
            fontWeight: "700",
          },
        ],
        t30: [
          "30px",
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
