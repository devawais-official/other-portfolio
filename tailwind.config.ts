import type { Config } from "tailwindcss";

function colorWithOpacity(variableName: string, defaultOpacity?: number): any {
  return ({ opacityValue }: { opacityValue?: string }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    if (defaultOpacity !== undefined) {
      return `rgba(var(${variableName}), ${defaultOpacity})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: colorWithOpacity("--color-bg"),
        surface: colorWithOpacity("--color-surface"),
        surface2: colorWithOpacity("--color-surface2"),
        border: colorWithOpacity("--color-border", 0.15),
        primary: {
          DEFAULT: colorWithOpacity("--color-primary"),
          light: colorWithOpacity("--color-primary-light"),
          dark: colorWithOpacity("--color-primary-dark"),
        },
        accent: {
          DEFAULT: colorWithOpacity("--color-accent"),
          light: colorWithOpacity("--color-accent-light"),
        },
        secondary: {
          DEFAULT: colorWithOpacity("--color-secondary"),
          light: colorWithOpacity("--color-secondary-light"),
        },
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
        // Smooth fade out to the new charcoal background
        "grid-fade":
          "linear-gradient(to bottom, rgba(var(--color-bg), 0) 0%, rgb(var(--color-bg)) 100%)",
        // Gorgeous forest-to-soft-sage transition
        "primary-accent-gradient":
          "linear-gradient(135deg, rgb(var(--color-primary)) 0%, rgb(var(--color-accent)) 100%)",
        // Multi-stop premium organic gradient
        "brand-gradient":
          "linear-gradient(120deg, rgb(var(--color-primary)) 0%, rgb(var(--color-mint)) 55%, rgb(var(--color-surface)) 100%)",
        // Subtle, high-end deep green radial glow from the top
        "radial-glow":
          "radial-gradient(circle at 50% 0%, rgba(var(--color-primary), 0.25), transparent 60%)",
      },
      keyframes: {
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
