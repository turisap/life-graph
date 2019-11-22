const path = require("path");

module.exports = ({ config, env }) => {
  config.resolve.modules = [
    ...(config.resolve.modules || []),
    path.resolve("../")
  ];

  config.module.rules.push({
    test: /\.(ts|tsx)?$/,
    exclude: /node_modules/,
    include: [/stories/],
    loader: "ts-loader"
  });
  config.module.rules.push({
    test: /\.s?css$/,
    loaders: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
    include: path.resolve(__dirname, "../")
  });
  config.resolve.extensions.push(".ts", ".tsx");

  return config;
};
