// @flow
module.exports = {
  presets: [
    ['@babel/preset-env', { useBuiltIns: 'usage', corejs: 3 }],
    '@babel/preset-react',
    '@babel/preset-flow'
  ],
  plugins: [
    'babel-plugin-macros',
    '@babel/plugin-proposal-optional-chaining',
    [
      '@babel/transform-runtime',
      { corejs: 3, helpers: true, regenerator: true }
    ]
  ]
};
