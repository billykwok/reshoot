import { describe, beforeAll, test, expect } from '@jest/globals';
import { sessionStorage } from '@shopify/jest-dom-mocks';
import {
  cacheLoaded,
  cacheFailed,
  hasLoaded,
  hasFailed,
} from '../../../src/utils/cache';

describe('cache', () => {
  beforeAll(() => {
    cacheLoaded('0');
  });

  afterEach(() => {
    sessionStorage.restore();
  });

  test('cacheLoaded should return true when loaded, false otherwise', () => {
    cacheLoaded('0');
    expect(hasLoaded('0')).toEqual(true);
    expect(hasFailed('0')).toEqual(false);
  });

  test('cacheLoaded should swallow exception when sessionStorage is not available', () => {
    sessionStorage.setItem.mockImplementationOnce(() => {
      throw new Error();
    });
    cacheLoaded('0');
    expect(hasLoaded('0')).toEqual(false);
    expect(hasFailed('0')).toEqual(false);
  });

  test('cacheFailed should return true when failed, false otherwise', () => {
    cacheFailed('0');
    expect(hasLoaded('0')).toEqual(false);
    expect(hasFailed('0')).toEqual(true);
  });

  test('cacheFailed should delete the first value when size exceeds 100', () => {
    for (let i = 0; i < 100; ++i) {
      cacheFailed(i.toString());
    }
    expect(hasFailed('0')).toEqual(true);
    expect(hasFailed('100')).toEqual(false);
    cacheFailed('100');
    expect(hasFailed('0')).toEqual(false);
    expect(hasFailed('100')).toEqual(true);
  });
});
