import { describe, test, expect } from '@jest/globals';
import { renderHook, act } from '@testing-library/react-hooks';
import { sessionStorage, connection } from '@shopify/jest-dom-mocks';
import useLoadingState from '../../../src/hooks/useLoadingState';
import * as State from '../../../src/state';

describe('useLoadingState', () => {
  const src = 'path/to/test.jpg';

  test('return INITIAL by default and can be updated with setState', () => {
    const { result } = renderHook(() => useLoadingState(null, src));
    expect(result.error).toBeUndefined();
    const [state1, setState] = result.current;
    expect(state1).toEqual(State.INITIAL);

    act(() => setState(State.ERROR));
    const [state2] = result.current;
    expect(state2).toEqual(State.ERROR);
  });

  test('return LOADED if image src is present in sessionStorage', () => {
    sessionStorage.setItem(src, 'y');
    const { result } = renderHook(() => useLoadingState(null, src));
    expect(result.error).toBeUndefined();
    expect(result.current[0]).toEqual(State.LOADED);
    sessionStorage.restore();
  });

  test('return MANUAL if network connection is too slow', () => {
    connection.mock({ effectiveType: '2g' });
    const { result } = renderHook(() => useLoadingState(null, src));
    expect(result.error).toBeUndefined();
    expect(result.current[0]).toEqual(State.MANUAL);
    connection.restore();
  });

  test('return OFFLINE if navigator.onLine is false', () => {
    jest.spyOn(navigator, 'onLine', 'get').mockReturnValueOnce(false);
    const { result } = renderHook(() => useLoadingState(null, src));
    expect(result.error).toBeUndefined();
    expect(result.current[0]).toEqual(State.OFFLINE);
    jest.restoreAllMocks();
  });

  test('state can be overridden with non-null first argument', () => {
    const { result } = renderHook(() => useLoadingState(State.ERROR, src));
    expect(result.error).toBeUndefined();
    expect(result.current[0]).toEqual(State.ERROR);
  });
});
