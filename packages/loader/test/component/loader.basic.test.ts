import { describe, beforeAll, afterAll, test, expect } from '@jest/globals';
import path from 'path';
import compile from './compiler';
import createMemfs from './createMemfs';
import { mockBase64, mockMetroHash } from './mock';

describe('Basic component test for @reshoot/loader', () => {
  beforeAll(() => {
    jest.doMock('metrohash', mockMetroHash('tEsThAsH'));
    jest.doMock('../../src/util/base64', mockBase64('data/of=someimage'));
  });

  afterAll((done) => {
    jest.resetModules();
    setTimeout(() => ((done as unknown) as () => void)(), 1000).unref();
  });

  test('should emit files and output successfully with default options', async () => {
    const memfs = createMemfs();
    const actual = await compile(
      memfs,
      '../../../../__fixtures__/test-image.jpg',
      { outputPath: '/images/', cache: false }
    );
    const images = await memfs.promises.readdir(
      path.resolve(__dirname, './images')
    );
    const expectedFilenames = [
      'tEsThAsH-640.avif',
      'tEsThAsH-1120.avif',
      'tEsThAsH-1440.avif',
      'tEsThAsH-640.webp',
      'tEsThAsH-1120.webp',
      'tEsThAsH-1440.webp',
      'tEsThAsH-640.jpg',
      'tEsThAsH-1120.jpg',
      'tEsThAsH-1440.jpg',
    ];
    expect(images).toEqual(expect.arrayContaining(expectedFilenames));
    expect(images).toHaveLength(expectedFilenames.length);
    expect(actual).toMatchSnapshot();
    memfs.reset();
  }, 120000);

  test('should emit error with invalid options', async () => {
    const memfs = createMemfs();
    const actual = compile(memfs, '../../../../__fixtures__/test-image.jpg', {
      cache: false,
      aspectRatio: { decimal: 11 },
    });
    await expect(actual).rejects.toThrowErrorMatchingSnapshot();
    expect(memfs.existsSync(path.resolve(__dirname, './images'))).toBe(false);
    memfs.reset();
  }, 120000);
});
