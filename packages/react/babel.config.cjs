module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { esmodules: true }, bugfixes: true }],
    ['@babel/preset-typescript', { isTSX: true, allExtensions: true }],
    ['@babel/preset-react', { runtime: 'automatic', useBuiltIns: true }],
    '@linaria',
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      { corejs: { version: 3, proposals: true }, helpers: true },
    ],
  ],
};
