const path = require('path')

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{ test: /\.ts$/, use: ['babel-loader'] }]
  },
  target: 'node'
}
