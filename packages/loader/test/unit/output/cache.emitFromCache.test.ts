import {
  describe,
  beforeAll,
  afterEach,
  afterAll,
  test,
  expect,
} from '@jest/globals';
import path from 'path';

describe('emitFromCache', () => {
  const buffer = Buffer.from([0]);
  const emitFile = jest.fn(() => Promise.resolve());
  const readFile = jest.fn(() => Promise.resolve(buffer));
  const outputPath = jest.fn((value: string) => path.join('output', value));

  beforeAll(() => {
    jest.doMock('../../../src/output/resolveCachePath', () => ({
      __esModule: true,
      default: (filename: string) => path.join('/Users/abc/cached', filename),
    }));
    jest.doMock('fs-extra', () => ({ __esModule: true, readFile }));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.resetModules();
  });

  test('should create function for string', async () => {
    const { emitFromCache } = await import('../../../src/output/cache');
    await emitFromCache({ emitFile }, 'hAsH', 'abc.jpg', {
      mode: 'mode',
      outputPath,
    });
    expect(emitFile).toHaveBeenCalledTimes(1);
    expect(emitFile).toHaveBeenCalledWith('output/abc.jpg', buffer, null);
  });
});
