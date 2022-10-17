const path = require('path')
const EnvNodePlugin = require('./plugin/index.cjs')
module.exports = {
  entry: './dist/index.js',
  mode: 'production',
  output: {
    filename: 'main.cjs',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [{
      test: /\.(js|ts)$/,
      loader: require.resolve('@open-wc/webpack-import-meta-loader')
    }]
  },
  target: 'node',
  plugins: [
    new EnvNodePlugin()
  ]
}
