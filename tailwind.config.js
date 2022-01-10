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

function makeColor(color, skipShades = false) {
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
      [key]: !skipShades ? hexToVariants(color, (index - 4) * 10) : color,
    }),
    {}
  );
}

module.exports = {
  mode: "jit",
  darkMode: "class",
  content: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  safelist: [
    {
      pattern: /(bg|text|ring|border)-(\w+)(-[0-9]+)?/,
      variants: [
        "lg",
        "hover",
        "focus",
        "lg:hover",
        "placeholder",
        "dark",
        "dark:hover",
        "dark:placeholder",
      ],
    },
  ],
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
        light: makeColor(colors.white, true),
        dark: makeColor(colors.black, true),
      },

      animation: {
        fab: "fab 0.4s ease-out forwards 0.1s",
        rotate: "1s rotate infinite linear",
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
        rotate: {
          "0%": {
            transform: "rotate(0)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
      },
    },
  },
  plugins: [],
};
