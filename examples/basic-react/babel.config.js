module.exports = {
  presets: ['@babel/preset-modules', '@babel/preset-react'],
  plugins: [
    'babel-plugin-macros',
    [
      '@babel/transform-runtime',
      { corejs: 3, helpers: true, regenerator: true }
    ]
  ]
};
