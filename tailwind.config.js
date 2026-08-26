/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "wh-bg":       "#0a090f",
        "wh-surface":  "#12101a",
        "wh-surface2": "#1c1829",
        "wh-accent":   "#aa3bff",
        "wh-text":     "#e2dff0",
        "wh-muted":    "#7c7a96",
        "wh-success":  "#34d399",
        "wh-error":    "#f87171",
        "wh-warning":  "#fbbf24",
      },
      fontFamily: {
        sans: ["system-ui", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["ui-monospace", "Consolas", "monospace"],
      },
      boxShadow: {
        accent: "0 0 20px rgba(170, 59, 255, 0.35)",
        "accent-sm": "0 0 10px rgba(170, 59, 255, 0.2)",
      },
    },
  },
  plugins: [],
};
