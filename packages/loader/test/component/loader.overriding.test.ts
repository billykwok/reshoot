import { describe, beforeAll, afterAll, test, expect } from '@jest/globals';
import path from 'path';
import SegfaultHandler from 'segfault-handler';
import compile from './compiler';
import createMemfs from './createMemfs';
import { mockBase64, mockMetroHash } from './mock';

import type { ShapeArgument } from '../../src/type';

SegfaultHandler.registerHandler('crash.overriding.log');

describe('Overriding component test for @reshoot/loader', () => {
  beforeAll(() => {
    jest.doMock('metrohash', mockMetroHash('tEsThAsH'));
    jest.doMock('../../src/util/base64', mockBase64('data/of=someimage'));
  });

  afterAll((done) => {
    jest.resetModules();
    setTimeout(() => ((done as unknown) as () => void)(), 1000).unref();
  });

  test('should handle custom shape successfully', async () => {
    const memfs = createMemfs();
    const actual = await compile(
      memfs,
      '../../../../__fixtures__/test-image.jpg',
      {
        outputPath: '/images/',
        cache: false,
        shape: ({ type, src, srcSet, sources, ...output }: ShapeArgument) => ({
          ...output,
          sources: [{ type, src, srcSet }, ...sources],
        }),
      }
    );
    const images = await memfs.promises.readdir(
      path.resolve(__dirname, './images')
    );
    const expectedFilenames = [
      'tEsThAsH-480.avif',
      'tEsThAsH-800.avif',
      'tEsThAsH-1120.avif',
      'tEsThAsH-1440.avif',
      'tEsThAsH-480.webp',
      'tEsThAsH-800.webp',
      'tEsThAsH-1120.webp',
      'tEsThAsH-1440.webp',
      'tEsThAsH-480.jpg',
      'tEsThAsH-800.jpg',
      'tEsThAsH-1120.jpg',
      'tEsThAsH-1440.jpg',
    ];
    expect(images).toEqual(expect.arrayContaining(expectedFilenames));
    expect(images).toHaveLength(expectedFilenames.length);
    expect(actual).toMatchSnapshot();
    memfs.reset();
  }, 120000);
});
