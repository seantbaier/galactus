const defaultTheme = require("tailwindcss/defaultTheme")
const colors = require("tailwindcss/colors")

const VIEWPORT_PADDING = 25

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      layout: {
        titlebarHeight: "30px",
      },
      colors: {
        primary: { dark: "rgba(106, 26, 163, 0.25)", main: "blueviolet", light: "blueviolet" },
        secondary: { main: "#ECEDEE" },
        tertiary: { main: "#83878C" },
        teal: colors.teal,
        rose: colors.rose,
        pink: colors.pink,
        fuchsia: colors.fuchsia,
        purple: colors.purple,
        violet: colors.violet,
        indigo: colors.indigo,
        blue: colors.blue,
        sky: colors.sky,
        cyan: colors.cyan,
        emerald: colors.emerald,
        green: colors.green,
        lime: colors.lime,
        olive: colors.lime,
        yellow: colors.yellow,
        amber: colors.amber,
        orange: colors.orange,
        red: colors.red,
        stone: colors.stone,
        neutral: colors.neutral,
        gray: colors.gray,
        slate: colors.slate,
        black: { dark: "#070708", main: "#151618", light: "#070708" },
        white: { main: "#ecedee", light: "rgba(99, 100, 101, 0.5)" },
        maximize: { main: "#00ff00" },
        minimize: { main: "#ffcc00" },
        close: { main: "#ff0000" },
      },
      keyframes: {
        hide: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        "slide-in": {
          from: { transform: `translateX(calc(100% + ${VIEWPORT_PADDING}px))` },
          to: { transform: "translateX(0)" },
        },
        "swipe-out": {
          from: { transform: "translateX(var(--radix-toast-swipe-end-x))" },
          to: { transform: `translateX(calc(100% + ${VIEWPORT_PADDING}px))` },
        },
      },
      animation: {
        "slide-in": "slide-in 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        hide: "hide 100ms ease-in",
        "swipe-out": "swipe-out 100ms ease-out",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
}
