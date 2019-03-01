// @flow
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  target: 'web',
  mode: 'development',
  entry: path.resolve(__dirname, 'src/index.jsx'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'public/[name].[contenthash].js'
  },
  resolve: { extensions: ['.jsx', '.js', '.json'] },
  module: {
    rules: [
      {
        test: /\.(jpe?g|png)$/,
        include: path.resolve(__dirname, 'src'),
        use: [
          {
            loader: '@reshoot/loader',
            options: { outputPath: 'public/', shape: { color: 'color' } }
          }
        ]
      },
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, 'src'),
        use: [{ loader: 'babel-loader' }]
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html')
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    port: 45678,
    overlay: true
  }
};
