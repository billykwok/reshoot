import { describe, beforeEach, afterEach, test, expect } from '@jest/globals';
import { renderHook } from '@testing-library/react-hooks';
import { createRef } from 'react';
import * as State from '../../../src/state';
import noop from '../../../src/utils/noop';

describe('useIntersection (IntersectionObserver unsupported)', () => {
  beforeEach(() => {
    jest.doMock(
      '../../../src/utils/supportIntersectionObserver',
      () => ({ __esModule: true, default: false } as { __esModule: true })
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should be noop if IntersectionObserver is not supported', async () => {
    const { default: useIntersection } = await import(
      '../../../src/hooks/useIntersection'
    );
    const { result } = renderHook(() =>
      useIntersection(
        createRef<HTMLImageElement>(),
        State.INITIAL,
        false,
        jest.fn()
      )
    );
    expect(result.error).toBeUndefined();
    expect(useIntersection).toBe(noop);
  });
});
