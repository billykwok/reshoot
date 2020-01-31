module.exports = {
  presets: [
    '@babel/preset-modules',
    [
      '@babel/preset-typescript',
      { isTSX: true, allExtensions: true, allowNamespaces: true }
    ],
    '@babel/preset-react',
    'linaria/babel'
  ]
};
