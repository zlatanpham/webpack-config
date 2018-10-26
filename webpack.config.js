const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const glob = require("glob");
const dotenv = require("dotenv");
const tailwindcss = require("tailwindcss");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");
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
          use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "Tailwind config",
        template: "./src/index.html"
      })
      new ExtractTextPlugin("styles.css"),
    new PurgecssPlugin({
      paths: glob.sync([
        path.join(__dirname, "resources/views/**/*.blade.php"),
        path.join(__dirname, "resources/assets/js/**/*.vue")
      ]),
      extractors: [
        {
          extractor: TailwindExtractor,
          extensions: ["html", "js", "php", "vue"]
        }
      ]
    })
    ],
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      compress: true,
      port: process.env.PORT
    }
  };
};
