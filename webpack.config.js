const path = require("path");
const webpack = require("webpack");
const TSLintPlugin = require("tslint-webpack-plugin");
const modeConfig = mode => require(`./build-utils/webpack.${mode}`)(mode);
const webpackMerge = require("webpack-merge");
const presetConfig = require("./build-utils/loadPresets");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");

module.exports = ({ mode, presets } = { mode: "production", presets: [] }) => {
  return webpackMerge(
    {
      mode,
      entry: "./src/index.tsx",
      output: {
        path: path.resolve(__dirname, "public/packs"),
        publicPath: "/packs/",
        filename: "bundle.js"
      },
      resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        alias: {
          components: path.resolve(__dirname, "src/components/"),
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
            test: /\.(jpe?g|png|gif)$/,
            use: ["file-loader"]
          },
          {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: ["file-loader"]
          },
          {
            test: /\.s?css$/,
            use: [
              MiniCssExtractPlugin.loader,
              "css-loader",
              "postcss-loader",
              "resolve-url-loader",
              "sass-loader"
            ]
          }
        ]
      },
      plugins: [
        new webpack.ProgressPlugin(),
        new MiniCssExtractPlugin({
          filename: "[name].css",
          chunkFilename: "[id].css"
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebPackPlugin({
          title: "Life chart",
          filename: "index.html",
          template: "src/template.html",
          minify: false,
          cache: false
        }),
        new ManifestPlugin(),
        new TSLintPlugin({
          files: ["./src/**/*.ts", "./src/**/*.tsx"],
          silent: false,
          warningsAsError: true,
          config: "./tslint.json"
        })
      ],
      devServer: {
        publicPath: "/packs/",
        contentBase: path.join(__dirname, "public/packs"),
        historyApiFallback: true,
        port: 3000,
        open: true,
        stats: {
          colors: true,
          hash: false,
          timing: true,
          chunks: true
        }
      }
    },
    modeConfig(mode),
    presets ? presetConfig({ mode, presets }) : null
  );
};
