import { describe, beforeEach, afterEach, test, expect } from '@jest/globals';
import { renderHook } from '@testing-library/react-hooks';
import { createRef } from 'react';

import type { RefCallback } from 'react';

describe('useIntersection (IntersectionObserver supported)', () => {
  const subscribe = jest.fn<
    void,
    [Element, (entry: IntersectionObserverEntry) => void]
  >();
  const unsubscribe = jest.fn<void, [Element]>();
  const loadImage = jest.fn<void, []>();

  beforeEach(() => {
    jest.doMock('../../../src/utils/supportIntersectionObserver', () => ({
      __esModule: true,
      default: true,
    }));
    jest.doMock('../../../src/utils/intersection', () => ({
      subscribe,
      unsubscribe,
    }));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should call subscribe in useEffect', async () => {
    const { useIntersection } = await import(
      '../../../src/hooks/useIntersection'
    );
    const ref = createRef<HTMLElement>();

    const {
      result: { error, current: innerRef },
    } = renderHook(() => useIntersection(ref, loadImage));
    expect(error).toBeUndefined();
    expect(innerRef).not.toHaveProperty('current');

    const element = document.createElement('div');
    (innerRef as RefCallback<HTMLElement>)(element);
    expect(subscribe).toHaveBeenCalledTimes(1);
    const [[subscribedElement, intersectionHandler]] = subscribe.mock.calls;
    expect(subscribedElement).toEqual(element);

    intersectionHandler({
      isIntersecting: false,
      intersectionRatio: 0,
    } as IntersectionObserverEntry);
    expect(loadImage).toHaveBeenCalledTimes(0);

    intersectionHandler({
      isIntersecting: true,
      intersectionRatio: 0.01,
    } as IntersectionObserverEntry);
    expect(loadImage).toHaveBeenCalledTimes(1);

    (innerRef as RefCallback<HTMLElement>)(null);
    expect(unsubscribe).toHaveBeenCalledTimes(1);
    expect(unsubscribe).toHaveBeenLastCalledWith(element);
  });
});
