import { describe, beforeEach, afterEach, test, expect } from '@jest/globals';
import { renderHook } from '@testing-library/react-hooks';
import { createRef } from 'react';
import * as State from '../../../src/state';

describe('useIntersection (IntersectionObserver supported)', () => {
  const subscribe = jest.fn();
  const download = jest.fn();

  beforeEach(() => {
    jest.doMock(
      '../../../src/utils/supportIntersectionObserver',
      () => ({ __esModule: true, default: true } as { __esModule: true })
    );
    jest.doMock(
      '../../../src/utils/intersection.ts',
      () => ({ __esModule: true, subscribe } as { __esModule: true })
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should register callback into IntersectionObserver', async () => {
    const { default: useIntersection } = await import(
      '../../../src/hooks/useIntersection'
    );
    const ref = createRef<HTMLImageElement>();
    const { result } = renderHook(() =>
      useIntersection(ref, State.INITIAL, false, download)
    );
    expect(result.error).toBeUndefined();
    expect(subscribe).toHaveBeenCalledTimes(1);
  });

  test('should run noop in useEffect if native lazy loading is supported', async () => {
    const { default: useIntersection } = await import(
      '../../../src/hooks/useIntersection'
    );
    const ref = createRef<HTMLImageElement>();
    const { result } = renderHook(() =>
      useIntersection(ref, State.INITIAL, true, download)
    );
    expect(result.error).toBeUndefined();
    expect(subscribe).toHaveBeenCalledTimes(0);
  });
});
