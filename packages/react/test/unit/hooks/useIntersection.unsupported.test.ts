import { describe, beforeAll, afterEach, test, expect } from '@jest/globals';
import { renderHook } from '@testing-library/react-hooks';
import { createRef } from 'react';

describe('useIntersection (IntersectionObserver unsupported)', () => {
  const loadImage = jest.fn<void, []>();

  beforeAll(() => {
    jest.doMock('../../../src/utils/supportIntersectionObserver', () => ({
      __esModule: true,
      default: false,
    }));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should be noop if IntersectionObserver is not supported', async () => {
    const { useIntersection } = await import(
      '../../../src/hooks/useIntersection'
    );
    const ref = createRef<HTMLElement>();
    const {
      result: { error, current: innerRef },
    } = renderHook(() => useIntersection(ref, loadImage));
    expect(error).toBeUndefined();
    expect(innerRef).toEqual(ref);
    expect(loadImage).toHaveBeenCalledTimes(1);
  });
});
