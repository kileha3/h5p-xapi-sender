const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].bundle.js',
    sourceMapFilename: "[name].js.map",
    path: path.resolve(__dirname, 'dist'),
    libraryExport: "default",
    libraryTarget: 'umd'
  },
};