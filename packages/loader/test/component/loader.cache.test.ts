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

  test('should emit cached files and output successfully with default options', async () => {
    const memfs = createMemfs();
    jest.doMock('fs-extra', () => ({
      __esModule: true,
      readJson: async (filepath: string) => {
        const content = await memfs.promises.readFile(filepath);
        return JSON.parse(content.toString()) as unknown;
      },
      readFile: async (filepath: string) => {
        return await memfs.promises.readFile(filepath);
      },
      outputFile: async (filepath: string, data: Buffer | string) => {
        await memfs.promises.mkdir(path.dirname(filepath), { recursive: true });
        await memfs.promises.writeFile(filepath, data);
      },
      outputJson: async (filepath: string, json: any) => {
        await memfs.promises.mkdir(path.dirname(filepath), { recursive: true });
        await memfs.promises.writeFile(filepath, JSON.stringify(json));
      },
    }));
    const actual1 = await compile(
      memfs,
      '../../../../__fixtures__/test-image.jpg',
      { outputPath: '/images/', cache: true }
    );
    const images1 = await memfs.promises.readdir(
      path.resolve(__dirname, './images')
    );
    expect(images1).toEqual(
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
    expect(images1).toHaveLength(10);
    expect(actual1).toMatchSnapshot();

    const actual2 = await compile(
      memfs,
      '../../../../__fixtures__/test-image.jpg',
      { outputPath: '/images/', cache: true }
    );
    const images2 = await memfs.promises.readdir(
      path.resolve(__dirname, './images')
    );
    expect(images2).toEqual(
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
    expect(images2).toHaveLength(10);
    expect(actual2).toMatchSnapshot();
    memfs.reset();
  }, 30000);
});
