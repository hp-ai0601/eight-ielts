import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0B0C0F",
        panel: "#12141A",
        line: "#23262E",
        text: "#ECEAE4",
        mute: "#8B8E98",
        lime: "#D4F562",
        warn: "#F3B264",
        bad: "#EF6B5E",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
