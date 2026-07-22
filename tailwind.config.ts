import type { Config } from "tailwindcss";

function colorWithOpacity(variableName: string): any {
  return `var(${variableName})`;
}

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/i18n/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/styles/theme/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: colorWithOpacity("--color-bg"),
        surface: colorWithOpacity("--color-surface"),
        surface2: colorWithOpacity("--color-surface-2"),
        border: colorWithOpacity("--color-border"),
        primary: {
          DEFAULT: colorWithOpacity("--color-primary"),
          light: colorWithOpacity("--color-primary-light"),
          dark: colorWithOpacity("--color-primary-dark"),
          foreground: colorWithOpacity("--color-primary-foreground"),
          subtle: colorWithOpacity("--color-primary-subtle"),
        },
        accent: {
          DEFAULT: colorWithOpacity("--color-accent"),
          light: colorWithOpacity("--color-accent-light"),
          dark: colorWithOpacity("--color-accent-dark"),
          subtle: colorWithOpacity("--color-accent-subtle"),
          foreground: colorWithOpacity("--color-accent-foreground"),
        },
        secondary: {
          DEFAULT: colorWithOpacity("--color-secondary"),
          light: colorWithOpacity("--color-secondary-light"),
        },
        heading: colorWithOpacity("--color-heading"),
        body: colorWithOpacity("--color-body"),
        mint: colorWithOpacity("--color-mint"),
        ink: colorWithOpacity("--color-ink"),
        muted: colorWithOpacity("--color-muted"),
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-space-grotesk)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, rgba(var(--color-bg), 0) 0%, rgb(var(--color-bg)) 100%)",
        "primary-accent-gradient":
          "linear-gradient(135deg, rgb(var(--color-primary)) 0%, rgb(var(--color-accent)) 100%)",
        "brand-gradient":
          "linear-gradient(120deg, rgb(var(--color-primary)) 0%, rgb(var(--color-mint)) 55%, rgb(var(--color-surface)) 100%)",
        "radial-glow":
          "radial-gradient(circle at 50% 0%, rgba(var(--color-primary), 0.25), transparent 60%)",
      },
      keyframes: {
        liquid: {
          "0%": {
            transform: "translate(0px, 0px) scale(1) rotate(0deg)",
            borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%",
          },
          "50%": {
            transform: "translate(20px, -30px) scale(1.1) rotate(180deg)",
            borderRadius: "70% 30% 50% 50% / 30% 60% 40% 70%",
          },
          "100%": {
            transform: "translate(-10px, 20px) scale(0.95) rotate(360deg)",
            borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-10px) rotate(1.5deg)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.55" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "liquid-blob": "liquid 10s infinite alternate ease-in-out",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 9s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        "fade-up": "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;