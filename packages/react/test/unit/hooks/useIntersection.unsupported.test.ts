import { describe, beforeEach, afterEach, test, expect } from '@jest/globals';
import { renderHook } from '@testing-library/react-hooks';
import { createRef } from 'react';

import type { State } from '../../../src/state';

describe('useIntersection (IntersectionObserver unsupported)', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const setState = jest.fn((callback: () => State): void => null);
  const src = 'image.jpg';
  const download = jest.fn();

  beforeEach(() => {
    jest.doMock('../../../src/utils/supportIntersectionObserver', () => ({
      __esModule: true,
      default: false,
    }));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should be noop if IntersectionObserver is not supported', async () => {
    const { default: useIntersection } = await import(
      '../../../src/hooks/useIntersection'
    );
    const { result } = renderHook(() =>
      useIntersection(createRef<HTMLImageElement>(), setState, src, download)
    );
    expect(result.error).toBeUndefined();
    expect(download).toHaveBeenCalledTimes(1);
  });
});
