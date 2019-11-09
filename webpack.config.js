const path = require("path");
const webpack = require("webpack");
const modeConfig = mode => require(`./build-utils/webpack.${mode}`)(mode);
const webpackMerge = require("webpack-merge");
const presetConfig = require("./build-utils/loadPresets");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const postcssPresetEnv = require("postcss-preset-env");
const autoprefixer = require("autoprefixer");
const stylelint = require("stylelint");

// TODO webpack polyfill fo css (postcss) for prod
// TODO webpack manifest for prod

module.exports = ({ mode, presets } = { mode: "production", presets: [] }) => {
  return webpackMerge(
    {
      mode,
      entry: "./src/index.tsx",
      output: {
        path: path.resolve(__dirname, "public"),
        filename: "bundle.js"
      },
      resolve: {
        extensions: [".tsx", ".ts", ".js", ".jsx"],
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
              {
                loader: MiniCssExtractPlugin.loader
              },
              {
                loader: "css-loader"
              },
              // {
              //   loader: "postcss-loader",
              //   options: {
              //     parser: "sugarss",
              //     ident: "postcss",
              //     plugins: () => [
              //       postcssPresetEnv(),
              //       autoprefixer({ grid: "autoplace" }),
              //       stylelint()
              //     ]
              //   }
              // }
              {
                loader: "sass-loader"
              }
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
          template: "src/index.html",
          minify: false,
          cache: false
        })
      ],
      devServer: {
        publicPath: "/",
        hot: true,
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
