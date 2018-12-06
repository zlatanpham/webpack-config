const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

module.exports = mode => ({
  entry: {
    app: ['./src/app/index.js'],
    iframe: ['./src/iframe/index.js'],
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname + '/dist'),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      title: 'Multiple entries app',
      template: './src/app/index.html',
      chunks: ['app'],
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: './src/iframe/index.html',
      title: 'Iframe',
      chunks: ['iframe'],
      filename: 'iframe.html',
    }),
    new CleanWebpackPlugin(['dist'], {}),
  ],
});
