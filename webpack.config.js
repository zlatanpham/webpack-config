const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = mode => {
  return {
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_module/,
          use: { loader: "babel-loader" }
        },
        {
          test: /\.scss$/,
          exclude: /node_module/,
          use: [
            mode !== "production"
              ? "style-loader"
              : MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader"
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "Custom template",
        // Load a custom template (lodash by default see the FAQ for details)
        template: "./src/index.html"
      }),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: mode !== "production" ? "[name].css" : "[name].[hash].css",
        chunkFilename: mode !== "production" ? "[id].css" : "[id].[hash].css"
      })
    ],
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      compress: true,
      port: 9000
    }
  };
};
