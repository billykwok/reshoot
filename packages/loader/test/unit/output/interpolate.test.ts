import { describe, beforeAll, test, expect } from '@jest/globals';

import type { LoaderContext } from '../../../src/type';

describe('interpolate', () => {
  const interpolatedName = 'interpolatedName';
  const interpolateName = jest.fn(() => interpolatedName);

  beforeAll(() => {
    jest.doMock('loader-utils', () => ({ __esModule: true, interpolateName }));
  });

  test('should hash null', async () => {
    const { default: interpolate } = await import(
      '../../../src/output/interpolate'
    );
    const ctx = ({
      rootContext: jest.fn(),
    } as unknown) as LoaderContext;
    const name = 'file-[width]-[hash].[ext]';
    const hash = 'hash56789012345678';
    const width = 123;
    const ext = 'abc';
    const result = interpolate(ctx, name, { hash, width, ext });
    expect(result).toEqual(interpolatedName);
    expect(interpolateName).toHaveBeenCalledWith(
      ctx,
      'file-123-hash567890123456.abc',
      { context: ctx.rootContext, content: null }
    );
  });
});
