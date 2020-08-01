import { describe, test, expect } from '@jest/globals';
import { intersectionObserver } from '@shopify/jest-dom-mocks';

describe('supportIntersectionObserver', () => {
  beforeEach(() => {
    intersectionObserver.mock();
  });

  afterEach(() => {
    intersectionObserver.restore();
  });

  test('should return true when IntersectionObserver is not undefined', async () => {
    const { default: SUPPORT_INTERSECTION_OBSERVER } = await import(
      '../../../src/utils/supportIntersectionObserver'
    );
    expect(SUPPORT_INTERSECTION_OBSERVER).toEqual(true);
  });
});
