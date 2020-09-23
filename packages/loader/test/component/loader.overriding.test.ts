import { describe, beforeAll, afterAll, test, expect } from '@jest/globals';
import path from 'path';
import compile from './compiler';
import createMemfs from './createMemfs';
import { mockBase64, mockMetroHash } from './mock';

import type { ShapeArgument } from '../../src/type';

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
    expect(images).toEqual(
      expect.arrayContaining([
        'tEsThAsH-480.jpg',
        'tEsThAsH-640.jpg',
        'tEsThAsH-720.jpg',
        'tEsThAsH-840.jpg',
        'tEsThAsH-1080.jpg',
        'tEsThAsH-480.webp',
        'tEsThAsH-640.webp',
        'tEsThAsH-720.webp',
        'tEsThAsH-840.webp',
        'tEsThAsH-1080.webp',
      ])
    );
    expect(images).toHaveLength(10);
    expect(actual).toMatchSnapshot();
    memfs.reset();
  }, 30000);
});
