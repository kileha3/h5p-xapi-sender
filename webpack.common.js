const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: './src/index.js',
  resolve: {
    fallback: {
      os: require.resolve("os-browserify/browser"),
      http: require.resolve("stream-http"),
      buffer: require.resolve("buffer/"),
      https: require.resolve("https-browserify")
    }
  },
  output: {
    filename: '[name].bundle.js',
    sourceMapFilename: "[name].js.map",
    path: path.resolve(__dirname, 'dist'),
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
        { from: path.resolve(__dirname,'node_modules/h5p-standalone/dist/styles'), to: path.resolve(__dirname,'dist/styles') },
        { from: path.resolve(__dirname,'node_modules/h5p-standalone/dist/fonts'), to: path.resolve(__dirname,'dist/fonts') },
        { from: path.resolve(__dirname,'node_modules/h5p-standalone/dist/frame.bundle.js'), to: path.resolve(__dirname,'dist/frame.bundle.js') }
      ]
    }),
  ]
};