import { describe, beforeEach, afterEach, test, expect } from '@jest/globals';
import { renderHook } from '@testing-library/react-hooks';
import { createRef } from 'react';
import * as State from '../../../src/state';

describe('useIntersection (IntersectionObserver supported)', () => {
  const subscribe = jest.fn((
    /* eslint-disable @typescript-eslint/no-unused-vars */
    element: Element,
    listener: (entry: IntersectionObserverEntry) => void
    /* eslint-enable @typescript-eslint/no-unused-vars */
  ) => () => null);
  const download = jest.fn(() => null);

  beforeEach(() => {
    jest.doMock('../../../src/utils/supportIntersectionObserver', () => ({
      __esModule: true,
      default: true,
    }));
    jest.doMock('../../../src/utils/intersection.ts', () => ({
      __esModule: true,
      subscribe,
    }));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should run noop in useEffect', async () => {
    const { default: useIntersection } = await import(
      '../../../src/hooks/useIntersection'
    );
    const ref = createRef<HTMLImageElement>();
    const state = State.INITIAL;
    const { result } = renderHook(() => useIntersection(ref, state, download));
    expect(result.error).toBeUndefined();
    expect(subscribe).toHaveBeenCalledTimes(1);
    expect(subscribe.mock.calls[0][0]).toEqual(ref.current);
  });
});
