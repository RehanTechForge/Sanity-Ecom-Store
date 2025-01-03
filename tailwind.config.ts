import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        darkPrimary: "var(--color-dark-primary)",
        primary: "var(--color-primary)",
        lightGrey: "var(--color-light-grey)",
        borderGrey: "var(--color-border-grey)",
        white: "var(--color-white)",
        borderDark: "var(--color-border-dark)",
      },
      fontFamily: {
        satoshi: ["var(--font-satoshi)", "sans-serif"],
        clash: ["var(--font-clash-display)", "sans-serif"],
      },
      fontSize: {
        // Clash Display font sizes
        "clash-36": "48px", // 36pt * 1.33 ≈ 48px
        "clash-32": "43px", // 32pt * 1.33 ≈ 43px
        "clash-24": "32px", // 24pt * 1.33 ≈ 32px
        "clash-20": "27px", // 20pt * 1.33 ≈ 27px
        "clash-16": "21px", // 16pt * 1.33 ≈ 21px
        "clash-14": "19px", // 14pt * 1.33 ≈ 19px

        // Satoshi font sizes
        "satoshi-16": "21px", // 16pt * 1.33 ≈ 21px
        "satoshi-14": "19px", // 14pt * 1.33 ≈ 19px
        "satoshi-18": "24px", // 18pt * 1.33 ≈ 24px
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      screens: {
        xs: { min: "420px" }, // Custom breakpoint for 420px and below
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
