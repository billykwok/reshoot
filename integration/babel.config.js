module.exports = {
  babelrcRoots: ['.', './packages/*'],
  presets: [
    [
      '@babel/preset-modules',
      { targets: { node: 'current' }, useBuiltIns: 'usage', corejs: 3 }
    ],
    [
      '@babel/preset-typescript',
      { isTSX: true, allExtensions: true, allowNamespaces: true }
    ],
    '@babel/preset-react'
  ],
  plugins: [
    'babel-plugin-macros',
    [
      '@babel/plugin-transform-runtime',
      { corejs: 3, helpers: true, regenerator: true, useESModules: false }
    ]
  ]
};
