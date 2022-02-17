const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require('webpack');
const destPath = "dist/";

module.exports = {
  entry: './src/index.js',
  resolve: {
    extensions: ['.ts', '.js'],
    fallback: {
      os: require.resolve("os-browserify/browser"),
      http: require.resolve("stream-http"),
      buffer: require.resolve("buffer"),
      stream: require.resolve("stream-browserify"),
      https: require.resolve("https-browserify")
    }
  },
  output: {
    filename: '[name].bundle.js',
    sourceMapFilename: "[name].js.map",
    path: path.resolve(__dirname, `${destPath}`),
    library: {
      root: 'H5PXapiSender',
      amd: 'h5p-xapi-sender',
      commonjs: 'h5p-xapi-sender'
    },
    libraryExport: "default",
    libraryTarget: 'umd'
  },  
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname,'node_modules/h5p-standalone/dist/styles'), to: path.resolve(__dirname,`${destPath}styles`) },
        { from: path.resolve(__dirname,'node_modules/h5p-standalone/dist/fonts'), to: path.resolve(__dirname,`${destPath}fonts`) },
        { from: path.resolve(__dirname,'node_modules/h5p-standalone/dist/frame.bundle.js'), to: path.resolve(__dirname,`${destPath}frame.bundle.js`) }
      ]
    }),
    new webpack.ProvidePlugin({
        process: 'process/browser'
      }),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    })
  ]
};