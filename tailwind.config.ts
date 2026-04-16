import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "var(--obsidian)",
        charcoal: "var(--charcoal)",
        mist: "var(--mist)",
        gold: "var(--gold)",
        "gold-soft": "var(--gold-soft)",
        ivory: "var(--ivory)",
        bone: "var(--bone)",
      },
      borderColor: {
        line: "var(--line)",
        "line-soft": "var(--line-soft)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        eyebrow: "0.25em",
        button: "0.2em",
        wordmark: "0.35em",
        caption: "0.3em",
      },
      maxWidth: {
        prose: "60ch",
        letter: "65ch",
      },
      transitionTimingFunction: {
        "out-quiet": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
