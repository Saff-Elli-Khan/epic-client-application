const colors = require("tailwindcss/colors");

function hexToVariants(color, percent) {
  return (
    "#" +
    color
      .replace(/^#/, "")
      .replace(/../g, (color) =>
        (
          "0" +
          Math.min(255, Math.max(0, parseInt(color, 16) + percent)).toString(16)
        ).substr(-2)
      )
  );
}

function makeColor(color) {
  return [
    "900",
    "800",
    "700",
    "600",
    "500",
    "400",
    "300",
    "200",
    "100",
    "50",
  ].reduce(
    (obj, key, index) => ({
      ...obj,
      [key]: hexToVariants(color, (index - 4) * 10),
    }),
    {}
  );
}

module.exports = {
  mode: "jit",
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  // safelist: [
  //   {
  //     pattern: /bg-/g,
  //   },
  // ],
  theme: {
    extend: {
      colors: {
        primary: makeColor("#E85D04"),
        secondary: makeColor("#FAA307"),
        tertiary: makeColor("#F48C06"),
        warning: colors.yellow,
        danger: colors.red,
        success: colors.green,
        info: colors.purple,
        muted: colors.stone,
        light: colors.white,
      },

      animation: {
        fab: "fab 0.4s ease-out forwards 0.1s",
      },
      keyframes: {
        fab: {
          "0%": {
            transform: "scale(1, 1)",
          },
          "33%": {
            transform: "scale(0.95, 1.05)",
          },
          "66%": {
            transform: "scale(1.05, 0.95)",
          },
          "100%": {
            transform: "scale(1, 1)",
          },
        },
      },
    },
  },
  plugins: [],
};
