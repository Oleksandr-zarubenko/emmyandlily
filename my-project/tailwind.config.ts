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
        grey: "#292d2d",
        primary: "#fad5a2",
        primary_T: "#FFF0ED",
        dark: "#33333399",
        black: "#0B0605",
        white: "#FBFBFB",
        bg_primary: "#FF8667",
        bg_secondary: "#333",
        border: "#DCDCDC",
        bg_transparent: "rgba(51, 51, 51, 0.60)",
        video_overlay: "rgba(11, 6, 5, 0.60)",
      },
      fontFamily: {
        abril: ["var(--font-abril)"],
        sans: ["var(--font-libre)"],
        playfair: "Georgia",
      },
      boxShadow: {
        custom: "0px 3px 30px 0px rgba(140, 140, 140, 0.10)",
        order: "4px 15px 40px 0px #100E0C33",
      },
      letterSpacing: {
        "1": "0em",
        "2": "0.025em",
        "3": "0.05em",
        "4": "0.1em",
        "5": "0.5%",
      },
      fontSize: {
        t8: "8px",
        t10: "10px",
        t12: "12px",
        t14: [
          "14px",
          {
            fontWeight: "400",
            lineHeight: "18.2px",
          },
        ],
        t16: [
          "16px",
          {
            fontWeight: "400",
            lineHeight: "20.8px",
          },
        ],
        t16i: [
          "16px",
          {
            fontWeight: "400",
            lineHeight: "20.8px",
          },
        ],
        t18: "18px",
        t20: "20px",
        t24n: "24px",
        t24: [
          "24px",
          {
            fontWeight: "400",
            lineHeight: "22.8px",
          },
        ],
        t30: [
          "30px",
          {
            fontWeight: "700",
          },
        ],
        t32: [
          "32px",
          {
            fontWeight: "400",
            lineHeight: "38.4px",
          },
        ],
        t32n: "32px",
        t40: [
          "40px",
          {
            fontWeight: "700",
          },
        ],
        t48: [
          "48px",
          {
            fontWeight: "400",
            lineHeight: "57.6px",
          },
        ],
        t53: [
          "53px",
          {
            fontWeight: "400",
            lineHeight: "63.6px",
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
