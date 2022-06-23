module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { esmodules: true }, bugfixes: true }],
    ['@babel/preset-typescript', { allExtensions: true }],
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      { corejs: { version: 3, proposals: true }, helpers: true },
    ],
  ],
};
