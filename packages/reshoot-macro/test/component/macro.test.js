// @flow
import pluginTester from 'babel-plugin-tester';
import plugin from 'babel-plugin-macros';
import prettier from 'prettier';

import { transform } from '@babel/core';

const babelConfig = {
  filename: __filename,
  presets: [['@babel/preset-env', { modules: false }]],
  plugins: ['babel-plugin-macros']
};

describe('macros', () => {
  test('use default options', async () => {
    const tranformed = await transform(
      `
        import reshoot from '../../src/macro.js';
        const image = reshoot('some/directory/test-image.jpg');
      `,
      babelConfig
    );
    expect(tranformed.code.trim()).toEqual(
      "var image = require('some/directory/test-image.jpg');"
    );
  });

  test('override options', async () => {
    const tranformed = await transform(
      `
        import reshoot from '../../src/macro.js';
        const image = reshoot('some/directory/test-image.jpg', { key: 'irrelevant' });
      `,
      babelConfig
    );
    expect(tranformed.code.trim()).toEqual(
      'var image = require(\'some/directory/test-image.jpg?{"key":"irrelevant"}\');'
    );
  });
});
