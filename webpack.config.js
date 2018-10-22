const merge = require("webpack-merge");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

const parts = require("./webpack.parts");

const commonConfig = merge([
  { plugins: [new HtmlWebpackPlugin({ title: "Webpack demo" })] },
  parts.loadJavascript({ include: PATHS.app })
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
