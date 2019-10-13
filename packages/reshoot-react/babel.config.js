module.exports = {
  presets: [
    '@babel/preset-env',
    [
      '@babel/preset-typescript',
      { isTSX: true, allExtensions: true, allowNamespaces: true }
    ],
    '@babel/preset-react',
    ['@emotion/babel-preset-css-prop', { hoist: true }]
  ],
  plugins: [
    ['@babel/plugin-proposal-object-rest-spread', { useBuiltIns: true }],
    '@babel/plugin-proposal-optional-chaining'
  ]
};
