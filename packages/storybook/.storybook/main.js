const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.mdx'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-viewport',
    '@storybook/addon-backgrounds',
    '@storybook/addon-controls',
    '@storybook/addon-actions',
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
    return config;
  },
};
