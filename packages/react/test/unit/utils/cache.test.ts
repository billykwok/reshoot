import { describe, beforeAll, test, expect } from '@jest/globals';
import { cache, isCached } from '../../../src/utils/cache';

describe('cache', () => {
  beforeAll(() => {
    cache('0');
  });

  test('should return true when a value is cached, false otherwise', () => {
    cache('0');
    expect(isCached('0')).toEqual(true);
    expect(isCached('')).toEqual(false);
  });

  test('should delete the first value when size exceeds 100', () => {
    for (let i = 1; i < 100; ++i) {
      cache(i.toString());
    }
    expect(isCached('0')).toEqual(true);
    cache('100');
    expect(isCached('0')).toEqual(false);
    expect(isCached('100')).toEqual(true);
  });
});
