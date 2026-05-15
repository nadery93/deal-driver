import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  safelist: [
    "bg-mint/15",
    "text-teal-800",
    "border-mint/30",
    "bg-electric/15",
    "text-blue-800",
    "border-electric/30",
    "bg-amber/15",
    "text-amber-800",
    "border-amber/30",
    "bg-red-50",
    "text-red-800",
    "border-red-100"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#09111f",
        panel: "#101827",
        line: "#d9e2ee",
        chrome: "#eef3f8",
        electric: "#1d9bf0",
        mint: "#2dd4bf",
        amber: "#f59e0b"
      },
      boxShadow: {
        glow: "0 24px 80px rgba(29, 155, 240, 0.18)",
        soft: "0 18px 50px rgba(9, 17, 31, 0.10)"
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem"
      }
    }
  },
  plugins: []
};

export default config;
