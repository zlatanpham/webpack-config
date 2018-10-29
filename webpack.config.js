const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const dotenv = require("dotenv");
const tailwindcss = require("tailwindcss");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const glob = require("glob-all");
const PurgecssPlugin = require("purgecss-webpack-plugin");

/**
 * Custom PurgeCSS Extractor
 * https://github.com/FullHuman/purgecss
 * https://github.com/FullHuman/purgecss-webpack-plugin
 */
class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-z0-9-:\/]+/g);
  }
}

dotenv.config();

const PATHS = {
  src: path.join(__dirname, "src")
};

module.exports = mode => {
  return {
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.scss$/,
          use: [
            mode === "production"
              ? {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                    // you can specify a publicPath here
                    // by default it use publicPath in webpackOptions.output
                    publicPath: "../"
                  }
                }
              : "style-loader",
            "css-loader",
            "postcss-loader",
            "sass-loader"
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "Tailwind config",
        template: "./src/index.html"
      }),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "[name].css",
        chunkFilename: "[id].css"
      }),
      new PurgecssPlugin({
        paths: glob.sync(`${PATHS.src}/*`)
      })
    ],
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      compress: true,
      port: process.env.PORT
    }
  };
};
