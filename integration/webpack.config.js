// @flow
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'index'),
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '__webpack_public_path__/',
    filename: 'test.js'
  },
  module: {
    rules: [
      {
        test: /\.(jpe?g|png)$/,
        use: [
          {
            loader: require.resolve('../packages/@reshoot/loader/lib/index.js'),
            options: {}
          }
        ]
      }
    ]
  },
  target: 'node',
  mode: 'production'
};
