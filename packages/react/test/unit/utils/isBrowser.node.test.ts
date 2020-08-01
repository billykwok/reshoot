/**
 * @jest-environment node
 */
import { describe, test, expect } from '@jest/globals';
import IS_BROWSER from '../../../src/utils/isBrowser';

describe('isBrowser', () => {
  test('should return false when window is undefined', () => {
    expect(IS_BROWSER).toEqual(false);
  });
});
