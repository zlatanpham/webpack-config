const merge = require("webpack-merge");
const glob = require("glob");
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
var SystemBellPlugin = require("system-bell-webpack-plugin");

const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

const parts = require("./webpack.parts");

const PATHS = {
  app: path.join(__dirname, "src"),
  build: path.join(__dirname, "dist")
};

const commonConfig = merge([
  parts.loadJavaScript({ include: PATHS.app, exclude: /node_modules/ }),
  {
    plugins: [new HtmlWebpackPlugin({ title: "Webpack demo" })]
    // entry: { style: glob.sync("./src/**/*.css") }
  }
]);

const productionConfig = merge([
  {
    output: {
      chunkFilename: "[name].[chunkhash:4].js",
      filename: "[name].[chunkhash:4].js"
    }
  },
  {
    performance: {
      hints: "warning", // "error" or false are valid too
      maxEntrypointSize: 50000, // in bytes, default 250k
      maxAssetSize: 450000 // in bytes
    }
  },
  parts.clean(PATHS.build),
  parts.minifyJavaScript(),
  {
    optimization: {
      splitChunks: {
        // chunks: "initial"
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendor",
            chunks: "initial"
          }
        }
      },
      runtimeChunk: {
        name: "manifest"
      }
    }
  },
  parts.attachRevision(),
  parts.generateSourceMaps({ type: "source-map" }),
  parts.extractCSS({
    use: ["css-loader", parts.autoprefix()]
  }),
  parts.purifyCSS({
    paths: glob.sync(`${PATHS.app}/**/*.js`, { nodir: true })
  }),
  parts.analyzer()
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
