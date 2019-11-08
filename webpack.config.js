const path = require("path");
const webpack = require("webpack");
const modeConfig = mode => require(`./build-utils/webpack.${mode}`)(mode);
const webpackMerge = require("webpack-merge");
const presetConfig = require("./build-utils/loadPresets");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");

// TODO webpack polyfill fo css (postcss) for prod
// TODO webpack manifest for prod

module.exports = ({ mode, presets } = { mode: "production", presets: [] }) => {
  return webpackMerge(
    {
      mode,
      entry: "./src/index.tsx",
      output: {
        path: path.resolve(__dirname, "public"),
        publicPath: "./public",
        filename: "bundle.js"
      },
      resolve: {
        extensions: [".tsx", ".ts", ".js", ".jsx"],
        alias: {
          components: path.resolve(__dirname, "src/utilities/"),
          assets: path.resolve(__dirname, "assets/")
        }
      },
      module: {
        rules: [
          {
            enforce: "pre",
            loader: "eslint-loader",
            test: /\.js$/,
            exclude: /node_modules/,
            options: {
              emitWarning: true
            }
          },
          {
            test: /\.(tsx|ts)?$/,
            use: "ts-loader",
            exclude: /node_modules/
          },
          {
            test: /\.js$/,
            loader: "babel-loader",
            exclude: /node_modules/
          },
          {
            test: /\.(png|jpe?g|gif)$/i,
            loader: "file-loader",
            options: {
              outputPath: "images",
              name: "dirname/[contenthash].[ext]"
            }
          },
          {
            test: /\.html$/,
            use: [
              {
                loader: "html-loader",
                options: { minimize: true }
              }
            ]
          },
          {
            test: /\.jpe?g$/,
            use: [
              {
                loader: "url-loader",
                options: {
                  limit: 5000
                }
              }
            ]
          },
          {
            test: /\.s?css$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader
              },
              {
                loader: "css-loader"
              }
            ]
          }
        ]
      },
      plugins: [
        new webpack.ProgressPlugin(),
        new MiniCssExtractPlugin({
          filename: "[name].css",
          chunkFilename: "[id].css",
          hmr: process.env.NODE_ENV === "development"
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebPackPlugin({
          title: "Life chart",
          filename: "index.html",
          template: "src/index.html",
          minify: false
        })
      ],
      devServer: {
        //publicPath: "/public/",
        hot: true,
        historyApiFallback: true,
        port: 3000
      }
    },
    modeConfig(mode),
    presets ? presetConfig({ mode, presets }) : null
  );
};
