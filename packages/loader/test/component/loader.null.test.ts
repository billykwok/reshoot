import { describe, beforeAll, afterAll, test, expect } from '@jest/globals';
import path from 'path';
import compile from './compiler';
import createMemfs from './createMemfs';
import { mockBase64, mockMetroHash } from './mock';

describe('Null component test for @reshoot/loader', () => {
  beforeAll(() => {
    jest.doMock('metrohash', mockMetroHash('tEsThAsH'));
    jest.doMock('../../src/util/base64', mockBase64('data/of=someimage'));
  });

  afterAll((done) => {
    jest.resetModules();
    setTimeout(() => ((done as unknown) as () => void)(), 1000).unref();
  });

  test('should handle null color and background successfully', async () => {
    const memfs = createMemfs();
    const actual = await compile(
      memfs,
      '../../../../__fixtures__/test-image.jpg',
      { outputPath: '/images/', cache: false, color: null }
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

  test('should handle null placeholder and aspectRatio successfully', async () => {
    const memfs = createMemfs();
    const actual = await compile(
      memfs,
      '../../../../__fixtures__/test-image.jpg',
      {
        outputPath: '/images/',
        cache: false,
        placeholderSize: null,
        aspectRatioType: null,
      }
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

  test('should handle empty srcSet and sources successfully', async () => {
    const memfs = createMemfs();
    const actual = await compile(
      memfs,
      '../../../../__fixtures__/test-image.jpg',
      {
        outputPath: '/images/',
        cache: false,
        alternativeWidths: [],
        alternativeFormats: [],
      }
    );
    const images = await memfs.promises.readdir(
      path.resolve(__dirname, './images')
    );
    expect(images).toEqual(['tEsThAsH-1120.jpg']);
    expect(actual).toMatchSnapshot();
    memfs.reset();
  }, 120000);
});
