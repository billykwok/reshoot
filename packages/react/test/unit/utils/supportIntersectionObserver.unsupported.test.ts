/**
 * @jest-environment node
 */
import { describe, test, expect } from '@jest/globals';
import SUPPORT_INTERSECTION_OBSERVER from '../../../src/utils/supportIntersectionObserver';

describe('supportIntersectionObserver', () => {
  test('should return true when IntersectionObserver is undefined', () => {
    expect(SUPPORT_INTERSECTION_OBSERVER).toEqual(false);
  });
});
