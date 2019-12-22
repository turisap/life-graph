module.exports = ({ file, _, env }) => ({
  parser: file.extname === "scss" ? "sugarss" : false,
  plugins: {
    "postcss-import": {},
    "postcss-preset-env": {},
    cssnano: env === "production" ? {} : false
  }
});
