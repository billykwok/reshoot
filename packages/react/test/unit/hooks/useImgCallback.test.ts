import { describe, beforeEach, afterEach, test, expect } from '@jest/globals';
import { renderHook, act } from '@testing-library/react-hooks';
import { sessionStorage } from '@shopify/jest-dom-mocks';
import { createRef, useState } from 'react';
import * as State from '../../../src/state';

import type { Dispatch, SetStateAction, SyntheticEvent } from 'react';

describe('useImgCallback', () => {
  const mockUnsubscribe = jest.fn();
  const src = 'path/to/test.jpg';

  beforeEach(() => {
    jest.doMock('../../../src/utils/intersection', () => ({
      __esModule: true,
      unsubscribe: mockUnsubscribe,
    }));
  });

  afterEach(() => {
    sessionStorage.restore();
    jest.resetAllMocks();
  });

  test('return enhanced version of onLoad and onError', async () => {
    const ref = createRef<HTMLImageElement>();
    const onLoad = jest.fn();
    const onError = jest.fn();
    const { default: useImgCallback } = await import(
      '../../../src/hooks/useImgCallback'
    );
    const { result } = renderHook((): [
      State.State,
      Dispatch<SetStateAction<State.State>>,
      () => void,
      (event: Event | SyntheticEvent | string) => void
    ] => {
      const [state, setState] = useState<State.State>(State.INITIAL);
      return [
        state,
        setState,
        ...useImgCallback(ref, src, state, setState, onLoad, onError),
      ];
    });
    expect(result.error).toBeUndefined();
    const [, , enhancedOnLoad, enhancedOnError] = result.current;

    act(() => enhancedOnLoad());
    expect(sessionStorage.getItem(src)).toEqual('y');
    expect(result.current[0]).toEqual(State.FADING);
    expect(mockUnsubscribe).toHaveBeenNthCalledWith(1, ref.current);
    expect(onLoad).toHaveBeenCalledTimes(1);

    act(() => enhancedOnError(new Event('onerror')));
    expect(result.current[0]).toEqual(State.ERROR);
    expect(mockUnsubscribe).toHaveBeenNthCalledWith(1, ref.current);
    expect(onError).toHaveBeenCalledTimes(1);
  });

  test('onLoad should not throw if sessionStorage is not available', async () => {
    const ref = createRef<HTMLImageElement>();
    const onLoad = jest.fn();
    const onError = jest.fn();
    jest.spyOn(sessionStorage, 'setItem').mockImplementation(() => {
      throw new Error('sessionStorage is disabled in private mode');
    });
    const { default: useImgCallback } = await import(
      '../../../src/hooks/useImgCallback'
    );
    const { result } = renderHook(() =>
      useImgCallback(ref, src, State.INITIAL, () => null, onLoad, onError)
    );
    expect(result.error).toBeUndefined();
    const [enhancedOnLoad] = result.current;

    act(() => enhancedOnLoad());
    expect(sessionStorage.getItem(src)).toBeNull();
    expect(mockUnsubscribe).toHaveBeenNthCalledWith(1, ref.current);
    expect(onLoad).toHaveBeenCalledTimes(1);
  });
});
