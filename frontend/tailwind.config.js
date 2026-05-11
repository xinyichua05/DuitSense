/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: '#0F1115',
        card: '#1A1D24',
        primary: '#5B8DEF',
        secondary: '#2A2D34',
        text: '#FFFFFF',
        textSecondary: '#9CA3AF'
      }
    },
  },
  plugins: [],
}
