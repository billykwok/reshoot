/**
 * @jest-environment node
 */
import { describe, test, expect } from '@jest/globals';
import SUPPORT_SESSION_STORAGE from '../../../src/utils/supportSessionStorage';

describe('supportSessionStorage', () => {
  test('should return false when sessionStorage is undefined', () => {
    expect(SUPPORT_SESSION_STORAGE).toEqual(false);
  });
});
