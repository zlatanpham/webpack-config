const merge = require("webpack-merge");
const PATHS = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const parts = require("./webpack.parts");

const commonConfig = merge([
  {
    plugins: [
      new HtmlWebpackPlugin({
        title: "Webpack demo",
        template: "src/index.html"
      })
    ]
  },
  parts.loadJavascript({ include: PATHS.app, exclude: /node_modules/ })
]);

const productionConfig = merge([
  parts.extractCSS({
    use: "css-loader"
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
  if (mode === "production") {
    return merge(commonConfig, productionConfig, { mode });
  }

  return merge(commonConfig, developmentConfig, { mode });
};
