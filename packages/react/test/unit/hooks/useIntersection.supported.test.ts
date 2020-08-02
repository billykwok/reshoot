import { describe, beforeEach, afterEach, test, expect } from '@jest/globals';
import { renderHook } from '@testing-library/react-hooks';
import { createRef } from 'react';
import { HIDDEN, LOADING, LOADED } from '../../../src/state';

import type { State } from '../../../src/state';

describe('useIntersection (IntersectionObserver supported)', () => {
  const setState = jest.fn<void, [() => State]>();
  const subscribe = jest.fn<
    () => void,
    [Element, (entry: IntersectionObserverEntry) => void]
  >();
  const isCached = jest.fn<boolean, [string]>();
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
      isCached,
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
    expect(setState).toHaveBeenCalledTimes(1);
    expect(setState.mock.calls[0][0]()).toEqual(HIDDEN);

    isCached.mockReturnValue(false);
    handler({ isIntersecting: true } as IntersectionObserverEntry);
    expect(download).toHaveBeenCalledTimes(1);
    expect(setState).toHaveBeenCalledTimes(2);
    expect(setState.mock.calls[1][0]()).toEqual(LOADING);

    isCached.mockReturnValue(true);
    handler({ isIntersecting: true } as IntersectionObserverEntry);
    expect(setState).toHaveBeenCalledTimes(3);
    expect(setState.mock.calls[2][0]()).toEqual(LOADED);
  });
});
