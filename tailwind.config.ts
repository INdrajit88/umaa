import type { Config } from "tailwindcss";

const config: Config = {
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
        gold: {
          50: "#fffdf0",
          100: "#fff9c2",
          200: "#fff085",
          300: "#ffe247",
          400: "#ffd11a",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
        sindoor: {
          400: "#fb7185",
          500: "#f43f5e",
          600: "#e11d48",
          700: "#be123c",
          800: "#9f1239",
          900: "#881337",
        },
        alta: {
          500: "#dc2626",
          600: "#b91c1c",
          700: "#991b1b",
        },
        shiuli: {
          orange: "#ff6b35",
          white: "#fffef9",
        },
      },
      fontFamily: {
        bengali: ["var(--font-bengali-serif)", "'Noto Serif Bengali'", "'Anek Bangla'", "serif"],
        bengaliSans: ["var(--font-bengali)", "'Anek Bangla'", "'Hind Siliguri'", "sans-serif"],
        cinzel: ["var(--font-cinzel)", "Cinzel", "serif"],
        sans: ["var(--font-outfit)", "Outfit", "Inter", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 20s linear infinite",
        "float": "float 5s ease-in-out infinite",
        "shimmer": "shimmer 3s ease-in-out infinite",
        "dhunuchi": "dhunuchi 8s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        dhunuchi: {
          "0%, 100%": { opacity: "0.25", transform: "scale(1)" },
          "50%": { opacity: "0.45", transform: "scale(1.05)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
