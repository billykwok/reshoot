import { describe, beforeAll, afterAll, test, expect } from '@jest/globals';
import path from 'path';
import compile from './compiler';
import createMemfs from './createMemfs';
import { mockBase64, mockMetroHash } from './mock';

describe('Basic component test for @reshoot/loader', () => {
  beforeAll(() => {
    jest.doMock('metrohash', mockMetroHash('tEsThAsH'));
    jest.doMock('../../src/util/base64', mockBase64('data/of=someimage'));
    jest.doMock('../../src/util/version', () => ({
      __esModule: true,
      default: '1.2.3',
    }));
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
    expect(images1).toEqual(expect.arrayContaining(expectedFilenames));
    expect(images1).toHaveLength(expectedFilenames.length);
    expect(actual1).toMatchSnapshot();

    const cachePath = path.resolve(
      __dirname,
      '../../../../node_modules/.cache/@reshoot/loader/1.2.3/production/tEsThAsH'
    );
    const cachedOutput = await memfs.promises.readFile(
      path.join(cachePath, 'stats.json')
    );
    expect(cachedOutput.toString()).toMatchSnapshot();
    const cachedFiles = await memfs.promises.readdir(cachePath);
    expect(cachedFiles).toEqual(
      expect.arrayContaining([
        'stats.json',
        '640.jpg',
        '1120.jpg',
        '1440.jpg',
        '640.webp',
        '1120.webp',
        '1440.webp',
      ])
    );

    const actual2 = await compile(
      memfs,
      '../../../../__fixtures__/test-image.jpg',
      { outputPath: '/images/', cache: true }
    );
    const images2 = await memfs.promises.readdir(
      path.resolve(__dirname, './images')
    );
    const expectedFilenames2 = [
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
    expect(images2).toEqual(expect.arrayContaining(expectedFilenames2));
    expect(images2).toHaveLength(expectedFilenames2.length);
    expect(actual2).toMatchSnapshot();
    memfs.reset();
  }, 120000);
});
