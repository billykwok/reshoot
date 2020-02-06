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
      'var image = require("some/directory/test-image.jpg");'
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
      'var image = require("some/directory/test-image.jpg?{\\"key\\":\\"irrelevant\\"}");'
    );
  });

  test('evaluate template literal', async () => {
    const tranformed = await transformAsync(
      `
        import reshoot from '../../lib/macro';
        const filename = 'test-image.jpg';
        const path = \`some/directory/\${filename}\`;
        const image = reshoot(path, { key: 'irrelevant' });
      `,
      babelConfig
    );
    expect(tranformed.code.trim()).toEqual(
      'var filename = \'test-image.jpg\';\nvar path = "some/directory/".concat(filename);\n\nvar image = require("some/directory/test-image.jpg?{\\"key\\":\\"irrelevant\\"}");'
    );
  });

  test('evaluate import path', async () => {
    const tranformed = await transformAsync(
      `
        import reshoot from '../../lib/macro';
        const images = reshoot('../../../../__fixtures__/paths.json', { key: 'irrelevant' });
      `,
      babelConfig
    );
    expect(tranformed.code.trim()).toEqual(
      'var images = [require("test path 1?{\\"color\\":\\"red\\",\\"others\\":1}"), require("test path 2?{\\"color\\":\\"blue\\",\\"others\\":2}"), require("test path 3?{\\"color\\":\\"yellow\\",\\"others\\":3}"), require("test path 4?{\\"color\\":\\"#ddeeaa\\",\\"others\\":4}"), require("test path 5?{\\"color\\":\\"black\\",\\"others\\":5}")];'
    );
  });
});
