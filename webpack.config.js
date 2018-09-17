const merge = require("webpack-merge");

const HtmlWebpackPlugin = require("html-webpack-plugin");
var SystemBellPlugin = require("system-bell-webpack-plugin");

const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

const parts = require("./webpack.parts");

const commonConfig = merge([
  { plugins: [new HtmlWebpackPlugin({ title: "Webpack demo" })] }
]);

const productionConfig = merge([
  parts.extractCSS({
    use: [
      "css-loader",
      {
        loader: "postcss-loader",
        options: {
          plugins: () => [require("autoprefixer"), require("precss")]
        }
      }
    ]
  })
]);

const developmentConfig = merge([
  parts.devServer({
    host: process.env.HOST,
    port: process.env.PORT
  }),
  parts.loadCSS(),
  { plugins: [new SystemBellPlugin()] }
]);

module.exports = mode => {
  if (mode === "production") {
    return merge(commonConfig, productionConfig, { mode });
  }

  return merge(commonConfig, developmentConfig, { mode });
};
