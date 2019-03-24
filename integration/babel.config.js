// @flow
module.exports = {
  babelrcRoots: ['.', './packages/*'],
  presets: [
    [
      '@babel/preset-env',
      { targets: { node: 'current' }, useBuiltIns: 'usage', corejs: 3 }
    ],
    '@babel/preset-react',
    '@babel/preset-flow'
  ],
  plugins: [
    'babel-plugin-macros',
    '@babel/plugin-proposal-optional-chaining',
    [
      '@babel/plugin-transform-runtime',
      { corejs: 3, helpers: true, regenerator: true, useESModules: false }
    ]
  ]
};
