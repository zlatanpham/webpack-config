const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const Autoprefixer = require("autoprefixer")

module.exports = mode => {
  const devMode = mode !== "production"

  return {
    output: {
      filename: "[name].[contenthash].js",
      path: path.resolve(__dirname, "dist")
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_module/,
          use: { loader: "babel-loader" }
        },
        {
          test: /\.(sa|sc|c)ss$/,
          exclude: /node_module/,
          use: [
            devMode ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader?modules&importLoaders=1&localIdentName=___[hash:base64:5]",
            {
              loader: "postcss-loader",
              options: {
                plugins: () => [new Autoprefixer()]
              }
            },
            // "postcss-loader",
            "sass-loader"
          ]
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(["dist"], { verbose: true, dry: false }),
      new HtmlWebpackPlugin({
        title: "Custom template",
        // Load a custom template (lodash by default see the FAQ for details)
        template: "./src/index.html"
      }),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: devMode ? "[name].css" : "[name].[hash].css",
        chunkFilename: devMode ? "[id].css" : "[id].[hash].css"
      })
    ],
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      compress: true,
      port: 9000
    }
  }
}
