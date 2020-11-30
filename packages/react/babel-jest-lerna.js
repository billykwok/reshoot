module.exports = require('babel-jest').createTransformer({
  rootMode: 'upward',
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    [
      '@babel/preset-typescript',
      {
        isTSX: true,
        allExtensions: true,
        allowNamespaces: true,
        allowDeclareFields: true,
        onlyRemoveTypeImports: true,
      },
    ],
    ['@babel/preset-react', { runtime: 'automatic', useBuiltIns: true }],
    'linaria/babel',
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: { version: 3, proposals: true },
        helpers: true,
        regenerator: true,
      },
    ],
    'dynamic-import-node',
    ['const-enum', { transform: 'constObject' }],
  ],
});
