// @flow
module.exports = {
  babelrcRoots: ['.', './packages/*'],
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-react',
    '@babel/preset-flow'
  ],
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: { version: 3, proposals: true },
        helpers: true,
        regenerator: true,
        useESModules: false
      }
    ]
  ]
};
