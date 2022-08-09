const defaultTheme = require("tailwindcss/defaultTheme")
const colors = require("tailwindcss/colors")

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
        white: { main: "#ecedee" },
        maximize: { main: "#00ff00" },
        minimize: { main: "#ffcc00" },
        close: { main: "#ff0000" },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
}
