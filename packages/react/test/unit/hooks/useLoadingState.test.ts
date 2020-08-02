import { describe, beforeEach, afterEach, test, expect } from '@jest/globals';
import { renderHook, act } from '@testing-library/react-hooks';
import { connection } from '@shopify/jest-dom-mocks';
import { MANUAL, OFFLINE, ERROR, LOADING, LOADED } from '../../../src/state';

describe('useLoadingState', () => {
  const src = 'path/to/test.jpg';
  const isCached = jest.fn();

  beforeEach(() => {
    jest.doMock('../../../src/utils/cache', () => ({
      __esModule: true,
      isCached,
    }));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('return LOADING by default and can be updated with setState', async () => {
    const { default: useLoadingState } = await import(
      '../../../src/hooks/useLoadingState'
    );
    const { result } = renderHook(() => useLoadingState(null, src));
    expect(result.error).toBeUndefined();
    const [state1, setState] = result.current;
    expect(state1).toEqual(LOADING);

    act(() => setState(ERROR));
    const [state2] = result.current;
    expect(state2).toEqual(ERROR);
  });

  test('return LOADED if image src is present in cache', async () => {
    isCached.mockReturnValue(true);
    const { default: useLoadingState } = await import(
      '../../../src/hooks/useLoadingState'
    );
    const { result } = renderHook(() => useLoadingState(null, src));
    expect(result.error).toBeUndefined();
    expect(result.current[0]).toEqual(LOADED);
  });

  test('return MANUAL if network connection is too slow', async () => {
    connection.mock({ effectiveType: '2g' });
    const { default: useLoadingState } = await import(
      '../../../src/hooks/useLoadingState'
    );
    const { result } = renderHook(() => useLoadingState(null, src));
    expect(result.error).toBeUndefined();
    expect(result.current[0]).toEqual(MANUAL);
    connection.restore();
  });

  test('return OFFLINE if navigator.onLine is false', async () => {
    jest.spyOn(navigator, 'onLine', 'get').mockReturnValueOnce(false);
    const { default: useLoadingState } = await import(
      '../../../src/hooks/useLoadingState'
    );
    const { result } = renderHook(() => useLoadingState(null, src));
    expect(result.error).toBeUndefined();
    expect(result.current[0]).toEqual(OFFLINE);
    jest.restoreAllMocks();
  });

  test('state can be overridden with non-null first argument', async () => {
    const { default: useLoadingState } = await import(
      '../../../src/hooks/useLoadingState'
    );
    const { result } = renderHook(() => useLoadingState(ERROR, src));
    expect(result.error).toBeUndefined();
    expect(result.current[0]).toEqual(ERROR);
  });
});
