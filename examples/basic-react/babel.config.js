// @flow
module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-flow'],
  plugins: [
    'babel-plugin-macros',
    '@babel/plugin-proposal-optional-chaining',
    [
      '@babel/transform-runtime',
      { corejs: 3, helpers: true, regenerator: true }
    ]
  ]
};
