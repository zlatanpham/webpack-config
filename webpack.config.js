const merge = require("webpack-merge");
const PATHS = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const parts = require("./webpack.parts");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const dotenv = require("dotenv");

dotenv.config();

const commonConfig = merge([
  {
    resolve: {
      modules: [PATHS.resolve(__dirname, "./src"), "node_modules"],
      extensions: [".js", ".jsx", ".json"],
      alias: {
        "@": PATHS.resolve(__dirname, "./src")
      }
    },
    plugins: [
      new CaseSensitivePathsPlugin(),
      new CleanWebpackPlugin(["dist", "build"]),
      new HtmlWebpackPlugin({
        title: "Webpack demo",
        template: "./src/index.html"
      })
    ]
  },
  parts.loadJavascript({ include: PATHS.app, exclude: /node_modules/ })
]);

const productionConfig = merge([
  parts.extractCSS({
    use: ["css-loader"]
  })
]);

const developmentConfig = merge([
  parts.devServer({
    host: process.env.HOST,
    port: process.env.PORT
  }),
  parts.loadCSS()
]);

module.exports = mode => {
  console.log("enviroment");
  console.log(process.env.PORT);
  console.log(process.env.TEST);

  if (mode === "production") {
    return merge(commonConfig, productionConfig, { mode });
  }

  return merge(commonConfig, developmentConfig, { mode });
};
