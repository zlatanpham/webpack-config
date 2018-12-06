const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = mode => ({
  entry: {
    app: ['./src/app/index.js'],
    iframe: ['./src/iframe/index.js'],
    iframestyle: ['./src/iframe/style.css'],
  },
  output: {
    filename: chunkData => {
      // console.log(chunkData);
      return '[name].[hash].js';
    },
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
      {
        test: /\.css$/,
        exclude: /node_modules/,
        // include: ['./src/iframe'],
        use: [
          mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
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
      chunks: ['iframe', 'iframestyle'],
      filename: 'iframe.html',
    }),
    new CleanWebpackPlugin(['dist'], {}),
  ],
});
