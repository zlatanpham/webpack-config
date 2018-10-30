const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = mode => {
  return {
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_module/,
          use: { loader: "babel-loader" }
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "Custom template",
        // Load a custom template (lodash by default see the FAQ for details)
        template: "./src/index.html"
      })
    ],
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      compress: true,
      port: 9000
    }
  };
};
