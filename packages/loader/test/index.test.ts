import path from 'node:path';
import { describe, expect, test } from '@jest/globals';
import { type IFs } from 'memfs';
import { format } from 'prettier';

import { compile, createMemfs } from './util';

const IMAGE_PATH = '../../../__fixtures__/lena.png';

async function listImages(fs: IFs, pathname: string) {
  const files = (await fs.promises.readdir(
    path.join(__dirname, pathname)
  )) as string[];
  return files.filter((image) => /\.(png|jpe?g)$/i.test(image));
}

expect.addSnapshotSerializer({
  serialize: (value: string) => format(value, { parser: 'babel' }),
  test: (value: string) =>
    typeof value === 'string' &&
    /(module\.exports|export default)/i.test(value),
});

describe('Webpack with @reshoot/loader', () => {
  const options = {
    outputPath: (filename: string) =>
      `/images/${filename.replaceAll(/\/|\\/g, '_')}`,
  };

  test('should extract image meta and output image in development mode', async () => {
    const memfs = createMemfs();

    const output = await compile('development', memfs, IMAGE_PATH, options);
    expect(output).toMatchSnapshot();

    const images = await listImages(memfs, './images');
    expect(images).toMatchSnapshot();

    memfs.reset();
  });

  test('should extract image meta and output image in production mode', async () => {
    const memfs = createMemfs();

    const output = await compile('production', memfs, IMAGE_PATH, options);
    expect(output).toMatchSnapshot();

    const images = await listImages(memfs, './images');
    expect(images).toMatchSnapshot();

    memfs.reset();
  });

  test('should extract image meta and output image without hash length', async () => {
    const memfs = createMemfs();

    const output = await compile('production', memfs, IMAGE_PATH, {
      filename: '[contenthash].[ext]',
    });
    expect(output).toMatchSnapshot();

    const images = await listImages(memfs, './');
    expect(images).toMatchSnapshot();

    memfs.reset();
  });

  test('should extract image meta and output image without options', async () => {
    const memfs = createMemfs();

    const output = await compile('production', memfs, IMAGE_PATH);
    expect(output).toMatchSnapshot();

    const images = await listImages(memfs, './');
    expect(images).toMatchSnapshot();

    memfs.reset();
  });

  test('should extract image meta and output image with outputPath as a string', async () => {
    const memfs = createMemfs();

    const output = await compile('production', memfs, IMAGE_PATH, {
      outputPath: '/images/',
    });
    expect(output).toMatchSnapshot();

    const images = await listImages(memfs, './images');
    expect(images).toMatchSnapshot();

    memfs.reset();
  });

  test('should extract image meta and output image with publicPath as a function', async () => {
    const memfs = createMemfs();

    const output = await compile('production', memfs, IMAGE_PATH, {
      outputPath: '/images/',
      publicPath: (filename: string) => path.join('/images/', filename),
    });
    expect(output).toMatchSnapshot();

    const images = await listImages(memfs, './images');
    expect(images).toMatchSnapshot();

    memfs.reset();
  });

  test('should extract image meta and output image with webpack publicPath', async () => {
    const memfs = createMemfs();

    const output = await compile('production', memfs, IMAGE_PATH, options, {
      publicPath: '/static/',
    });
    expect(output).toMatchSnapshot();

    const images = await listImages(memfs, './images');
    expect(images).toMatchSnapshot();

    memfs.reset();
  });

  test('should extract image meta and output image with emitFile disabled', async () => {
    const memfs = createMemfs();

    const output = await compile('production', memfs, IMAGE_PATH, {
      emitFile: false,
    });
    expect(output).toMatchSnapshot();

    const images = await listImages(memfs, './');
    expect(images).toMatchSnapshot();

    memfs.reset();
  });

  test('should extract image meta and output image with esModule enabled', async () => {
    const memfs = createMemfs();

    const output = await compile('production', memfs, IMAGE_PATH, {
      esModule: true,
    });
    expect(output).toMatchSnapshot();

    const images = await listImages(memfs, './');
    expect(images).toMatchSnapshot();

    memfs.reset();
  });

  test('should pass user provided color if specified', async () => {
    const memfs = createMemfs();

    const output = await compile(
      'production',
      memfs,
      `${IMAGE_PATH}?color=#eee`,
      { esModule: true }
    );
    expect(output).toMatchSnapshot();

    const images = await listImages(memfs, './');
    expect(images).toMatchSnapshot();

    memfs.reset();
  });

  test('should decode user provided color if possible', async () => {
    const memfs = createMemfs();

    const output = await compile(
      'production',
      memfs,
      `${IMAGE_PATH}?color=%23eee`,
      { esModule: true }
    );
    expect(output).toMatchSnapshot();

    const images = await listImages(memfs, './');
    expect(images).toMatchSnapshot();

    memfs.reset();
  });
});
