module.exports = {
  targets: { esmodules: true },
  presets: [
    ['@babel/preset-env', { bugfixes: true }],
    ['@babel/preset-typescript', { allExtensions: true }],
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      { corejs: { version: 3 }, helpers: true },
    ],
  ],
  compact: true,
  minified: true,
};
