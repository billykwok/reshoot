const path = require('path');
const createCompiler = require('@storybook/addon-docs/mdx-compiler-plugin');

module.exports = {
  stories: ['../src/**/*.stories.mdx'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-viewport/register',
    'storybook-dark-mode/register',
    'storybook-readme/register',
    '@storybook/addon-knobs/register',
    '@storybook/addon-actions/register',
  ],
  webpackFinal: async (config) => {
    const localModules = path.resolve(__dirname, '../../../packages');
    config.resolve.modules.unshift(localModules);
    config.resolve.alias['@reshoot'] = localModules;
    config.resolve.extensions.push('.ts', '.tsx', '.md', '.mdx');
    config.module.rules.push(
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: [
          { loader: 'babel-loader' },
          {
            loader: '@storybook/source-loader',
            options: { parser: 'typescript' },
          },
        ],
      },
      { test: /\.md$/, exclude: /node_modules/, loader: 'markdown-loader' }
    );
    return config;
  },
};
