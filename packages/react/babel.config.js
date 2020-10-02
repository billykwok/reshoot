module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { esmodules: true }, bugfixes: true }],
    [
      '@babel/preset-typescript',
      {
        isTSX: true,
        allExtensions: true,
        allowNamespaces: true,
        allowDeclareFields: true,
      },
    ],
    '@babel/preset-react',
    'linaria/babel',
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      { corejs: { version: 3, proposals: true }, helpers: true },
    ],
    ['const-enum', { transform: 'constObject' }],
  ],
};
