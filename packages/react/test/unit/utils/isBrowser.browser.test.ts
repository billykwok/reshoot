import { describe, test, expect } from '@jest/globals';
import IS_BROWSER from '../../../src/utils/isBrowser';

describe('isBrowser', () => {
  test('should return true when window is not undefined', () => {
    expect(IS_BROWSER).toEqual(true);
  });
});
