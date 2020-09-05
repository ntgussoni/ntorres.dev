const purgecss = [
  "@fullhuman/postcss-purgecss",
  {
    content: [
      "components/**/*.js",
      "pages/**/*.js",
      "css/**/*.*",
      "images/**/*.svg",
    ],
    whitelist: ["html", "body"],
    defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
  },
];

module.exports = {
  plugins: [
    "postcss-import",
    "tailwindcss",
    "autoprefixer",
    ...(process.env.NODE_ENV === "production" ? [purgecss] : []),
  ],
};
