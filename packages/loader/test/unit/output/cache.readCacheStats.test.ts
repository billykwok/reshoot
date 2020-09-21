import {
  describe,
  beforeAll,
  afterEach,
  afterAll,
  test,
  expect,
} from '@jest/globals';
import path from 'path';

describe('readCacheStats', () => {
  const readJson = jest.fn();

  beforeAll(() => {
    jest.doMock('../../../src/output/resolveCachePath', () => ({
      __esModule: true,
      default: (filename: string) => path.join('/Users/abc/cached', filename),
    }));
    jest.doMock('fs-extra', () => ({ __esModule: true, readJson }));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.resetModules();
  });

  test('should return stats if found', async () => {
    const content = { filenames: ['images/abc.jpg'], output: 'some_output' };
    readJson.mockReturnValue(Promise.resolve(content));
    const { readCacheStats } = await import('../../../src/output/cache');
    const stats = await readCacheStats('development', 'hash123');
    expect(stats).toEqual(content);
  });

  test('should return empty stats if not found', async () => {
    readJson.mockReturnValue(Promise.reject(new Error()));
    const { readCacheStats } = await import('../../../src/output/cache');
    const stats = await readCacheStats('development', 'hash123');
    expect(stats).toEqual({ filenames: [], output: null });
  });
});
