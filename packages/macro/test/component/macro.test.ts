import { transformAsync } from '@babel/core';

const babelConfig: {
  filename: string;
  configFile: false;
  babelrc: false;
  presets: any[];
  plugins: any[];
} = {
  filename: __filename,
  configFile: false,
  babelrc: false,
  presets: ['@babel/preset-env', '@babel/preset-typescript'],
  plugins: [
    'babel-plugin-macros',
    ['@babel/plugin-transform-modules-commonjs', { strictMode: false }]
  ]
};

describe('macros', () => {
  test('use default options', async () => {
    const tranformed = await transformAsync(
      `
        import reshoot from '../../lib/macro';
        const image = reshoot('some/directory/test-image.jpg');
      `,
      babelConfig
    );
    expect(tranformed.code.trim()).toEqual(
      "var image = require('some/directory/test-image.jpg');"
    );
  });

  test('override options', async () => {
    const tranformed = await transformAsync(
      `
        import reshoot from '../../lib/macro';
        const image = reshoot('some/directory/test-image.jpg', { key: 'irrelevant' });
      `,
      babelConfig
    );
    expect(tranformed.code.trim()).toEqual(
      'var image = require(\'some/directory/test-image.jpg?{"key":"irrelevant"}\');'
    );
  });
});
