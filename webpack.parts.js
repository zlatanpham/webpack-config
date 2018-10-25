const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const glob = require('glob')
const PurgecssPlugin = require('purgecss-webpack-plugin')
const path = require('path')

const PATHS = {
  src: path.join(__dirname, 'src'),
}

exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    stats: 'errors-only',
    host,
    port,
    open: false,
    overlay: true,
  },
})

exports.loadCSS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.scss$/,
        include,
        exclude,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [require('autoprefixer')],
            },
          },
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [
                './src/style/resources/variables.scss',
                './src/style/resources/classes.scss',
                './src/style/resources/mixins.scss',
              ],
            },
          },
        ],
      },
    ],
  },
})

exports.extractCSS = ({ include, exclude, use = [] }) => {
  return {
    module: {
      rules: [
        {
          test: /\.scss$/,
          include,
          exclude,
          use: [MiniCssExtractPlugin.loader].concat(use),
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
      new PurgecssPlugin({
        paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
      }),
    ],
  }
}

exports.loadJavascript = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude,
        include,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
})
