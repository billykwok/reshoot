import { describe, beforeEach, afterEach, test, expect } from '@jest/globals';
import { renderHook } from '@testing-library/react-hooks';
import { createRef } from 'react';
import * as State from '../../../src/state';

describe('useIntersection (IntersectionObserver unsupported)', () => {
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
      useIntersection(createRef<HTMLImageElement>(), State.INITIAL, download)
    );
    expect(result.error).toBeUndefined();
    expect(download).toHaveBeenCalledTimes(1);
  });
});
