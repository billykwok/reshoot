import { describe, test, expect } from '@jest/globals';
import { sessionStorage } from '@shopify/jest-dom-mocks';

describe('supportSessionStorage', () => {
  afterEach(() => {
    sessionStorage.restore();
  });

  test('should return true when sessionStorage is not undefined', async () => {
    const { default: SUPPORT_SESSION_STORAGE } = await import(
      '../../../src/utils/supportSessionStorage'
    );
    expect(SUPPORT_SESSION_STORAGE).toEqual(true);
  });
});
