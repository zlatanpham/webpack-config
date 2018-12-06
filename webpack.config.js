const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = env => ({
  entry: {
    app: ['./src/app/index.js'],
    iframe: ['./src/iframe/index.js'],
  },
  output: {
    filename: '[name].[hash].js',
    path: __dirname + '/dist',
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'head',
      title: 'Multiple entries app',
      template: './src/app/index.html',
      chunks: ['app'],
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      inject: 'head',
      template: './src/iframe/index.html',
      title: 'Iframe',
      chunks: ['iframe'],
      filename: 'iframe.html',
    }),
    new CleanWebpackPlugin(['dist'], {}),
  ],
});
