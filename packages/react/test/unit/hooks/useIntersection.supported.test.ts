import { describe, beforeEach, afterEach, test, expect } from '@jest/globals';
import { renderHook } from '@testing-library/react-hooks';
import { createRef } from 'react';
import { ERROR, HIDDEN, LOADING, LOADED } from '../../../src/state';

import type { State } from '../../../src/state';

describe('useIntersection (IntersectionObserver supported)', () => {
  const setState = jest.fn<void, [() => State]>();
  const subscribe = jest.fn<
    () => void,
    [Element, (entry: IntersectionObserverEntry) => void]
  >();
  const hasLoaded = jest.fn<boolean, [string]>(() => false);
  const hasFailed = jest.fn<boolean, [string]>(() => false);
  const src = 'image.jpg';
  const download = jest.fn<void, []>();

  beforeEach(() => {
    jest.doMock('../../../src/utils/supportIntersectionObserver', () => ({
      __esModule: true,
      default: true,
    }));
    jest.doMock('../../../src/utils/intersection', () => ({
      __esModule: true,
      default: subscribe,
    }));
    jest.doMock('../../../src/utils/cache', () => ({
      __esModule: true,
      hasLoaded,
      hasFailed,
    }));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should call subscribe in useEffect', async () => {
    const { default: useIntersection } = await import(
      '../../../src/hooks/useIntersection'
    );
    const ref = createRef<HTMLImageElement>();
    const { result } = renderHook(() =>
      useIntersection(ref, setState, src, download)
    );
    expect(result.error).toBeUndefined();
    expect(subscribe).toHaveBeenCalledTimes(1);
    const [[element, handler]] = subscribe.mock.calls;
    expect(element).toEqual(ref.current);

    handler({ isIntersecting: false } as IntersectionObserverEntry);
    expect(download).toHaveBeenCalledTimes(0);
    expect(setState).toHaveBeenCalledTimes(1);
    expect(setState.mock.calls[0][0]()).toEqual(HIDDEN);

    handler({ isIntersecting: true } as IntersectionObserverEntry);
    expect(download).toHaveBeenCalledTimes(1);
    expect(setState).toHaveBeenCalledTimes(2);
    expect(setState.mock.calls[1][0]()).toEqual(LOADING);

    hasFailed.mockReturnValue(true);
    handler({ isIntersecting: true } as IntersectionObserverEntry);
    expect(download).toHaveBeenCalledTimes(1);
    expect(setState).toHaveBeenCalledTimes(3);
    expect(setState.mock.calls[2][0]()).toEqual(ERROR);

    hasLoaded.mockReturnValue(true);
    handler({ isIntersecting: true } as IntersectionObserverEntry);
    expect(download).toHaveBeenCalledTimes(1);
    expect(setState).toHaveBeenCalledTimes(4);
    expect(setState.mock.calls[3][0]()).toEqual(LOADED);
  });
});
