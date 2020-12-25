const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].bundle.js',
    sourceMapFilename: "[name].js.map",
    path: path.resolve(__dirname, 'dist'),
    libraryExport: "default",
    libraryTarget: 'umd'
  },  
  plugins: [
    new CopyPlugin([
      { from: path.resolve(__dirname,'node_modules/h5p-standalone-fix/dist/styles'), to: path.resolve(__dirname,'dist/styles') },
      { from: path.resolve(__dirname,'node_modules/h5p-standalone-fix/dist/fonts'), to: path.resolve(__dirname,'dist/fonts') },
      { from: path.resolve(__dirname,'node_modules/h5p-standalone-fix/dist/frame.bundle.js'), to: path.resolve(__dirname,'dist/frame.bundle.js') }
    ]),
  ]
};