// Webpack configuration for preload scripts

const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/preload/preload.ts',
  output: {
    filename: 'preload.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  }
};
