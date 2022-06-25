module.exports = {
  targets: { esmodules: true },
  presets: [
    ['@babel/preset-env', { bugfixes: true }],
    ['@babel/preset-typescript', { allExtensions: true }],
  ],
  compact: true,
  minified: true,
};
