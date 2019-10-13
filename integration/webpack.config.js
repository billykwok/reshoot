const path = require('path');

module.exports = {
  mode: 'production',
  target: 'node',
  entry: path.resolve(__dirname, 'index.ts'),
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '__webpack_public_path__/',
    filename: 'test.js'
  },
  resolve: { extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'] },
  module: {
    rules: [
      {
        test: /\.(jpe?g|png)$/,
        use: [
          {
            loader: require.resolve('../packages/reshoot-loader/lib/index.js'),
            options: {}
          }
        ]
      }
    ]
  },
  performance: { hints: false }
};
