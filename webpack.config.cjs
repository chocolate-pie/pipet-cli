const path = require('path')

module.exports = {
  entry: './dist/index.js',
  mode: 'production',
  output: {
    filename: '[name].cjs',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [{ test: /\.js$/, use: ['babel-loader'] }, {
      test: /\.(js|ts)$/,
      loader: require.resolve('@open-wc/webpack-import-meta-loader')
    }]
  },
  target: 'node'
}
