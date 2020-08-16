const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.mdx'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-viewport/register',
    'storybook-dark-mode/register',
    '@storybook/addon-backgrounds',
    '@storybook/addon-controls',
    '@storybook/addon-actions/register',
  ],
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
  webpackFinal: async (config) => {
    const localModules = path.resolve(__dirname, '../../../packages');
    config.resolve.modules.unshift(localModules);
    config.resolve.alias['@reshoot'] = localModules;
    config.resolve.extensions.push('.ts', '.tsx', '.md', '.mdx');
    config.module.rules.push({
      test: /\.md$/,
      exclude: /node_modules/,
      loader: 'markdown-loader',
    });
    return config;
  },
};
