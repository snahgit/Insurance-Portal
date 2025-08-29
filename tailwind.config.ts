import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./Pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "color-blue": "var(--theme-primary)",
        "color-slate": "var(--color-slate)",
        "color-sky": "var(--color-sky)",
        "gradient-from": "var(--gradient-from)",
        "gradient-to": "var(--gradient-to)",
        "body-font-color": "var(--body-font-color)",
        "bs-border-color-translucent": "var(--bs-border-color-translucent)",
      },
      fontFamily: {
        sans: ["var(--ff-sans-font)"],
        serif: ["var(--ff-serif-font)"],
        mono: ["var(--ff-mono-font)"],
        display: ["var(--ff-display-font)"],
        heading: ["var(--ff-heading-font)"],
        body: ["var(--ff-body-font)"],
        modern: ["var(--ff-modern-font)"],
        elegant: ["var(--ff-elegant-font)"],
        tech: ["var(--ff-tech-font)"],
        medical: ["var(--ff-medical-font)"],
        professional: ["var(--ff-professional-font)"],
        premium: ["var(--ff-premium-font)"],
        clean: ["var(--ff-clean-font)"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
