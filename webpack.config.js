const merge = require('webpack-merge')
const PATHS = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const parts = require('./webpack.parts')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const dotenv = require('dotenv')
const chalk = require('chalk')

const log = console.log

dotenv.config()

const commonConfig = merge([
  {
    resolve: {
      modules: [PATHS.resolve(__dirname, './src'), 'node_modules'],
      extensions: ['.js', '.jsx', '.json'],
      alias: {
        '@': PATHS.resolve(__dirname, './src'),
      },
    },
    plugins: [
      new CaseSensitivePathsPlugin(),
      new HtmlWebpackPlugin({
        title: 'Webpack demo',
        template: './src/index.html',
      }),
    ],
  },
  parts.loadJavascript({ include: PATHS.app, exclude: /node_modules/ }),
])

const productionConfig = merge([
  parts.extractCSS({
    use: [
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
  }),
  {
    optimization: {
      splitChunks: {
        chunks: 'initial',
      },
    },
    plugins: [new CleanWebpackPlugin(['dist', 'build'])],
  },
])

const developmentConfig = merge([
  parts.devServer({
    host: process.env.HOST,
    port: process.env.PORT,
  }),
  parts.loadCSS(),
])

module.exports = mode => {
  log(chalk.bgRed('Enviroment'))
  log(chalk.bgBlue(chalk.red(process.env.PORT)))

  if (mode === 'production') {
    return merge(commonConfig, productionConfig, { mode })
  }

  return merge(commonConfig, developmentConfig, { mode })
}
