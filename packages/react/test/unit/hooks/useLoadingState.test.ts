import { describe, beforeAll, afterEach, test, expect } from '@jest/globals';
import { renderHook, act } from '@testing-library/react-hooks';
import { connection } from '@shopify/jest-dom-mocks';
import {
  MANUAL,
  OFFLINE,
  ERROR,
  LOADING,
  FADING,
  LOADED,
} from '../../../src/state';

describe('useLoadingState', () => {
  const src = 'path/to/test.jpg';
  const hasLoaded = jest.fn<boolean, [string]>(() => false);
  const hasFailed = jest.fn<boolean, [string]>(() => false);

  beforeAll(() => {
    jest.doMock('../../../src/utils/cache', () => ({ hasLoaded, hasFailed }));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('return LOADING by default and can be updated with setState', async () => {
    const { useLoadingState } = await import(
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
    hasLoaded.mockReturnValue(true);
    const { useLoadingState } = await import(
      '../../../src/hooks/useLoadingState'
    );
    const { result } = renderHook(() => useLoadingState(null, src));
    expect(result.error).toBeUndefined();
    expect(result.current[0]).toEqual(LOADED);
  });

  test('return ERROR if image loading failed in the last download attempt', async () => {
    hasLoaded.mockReturnValue(false);
    hasFailed.mockReturnValue(true);
    const { useLoadingState } = await import(
      '../../../src/hooks/useLoadingState'
    );
    const { result } = renderHook(() => useLoadingState(null, src));
    expect(result.error).toBeUndefined();
    expect(result.current[0]).toEqual(ERROR);
  });

  test('return MANUAL if network connection is too slow', async () => {
    connection.mock({ effectiveType: '2g' });
    const { useLoadingState } = await import(
      '../../../src/hooks/useLoadingState'
    );
    const { result } = renderHook(() => useLoadingState(null, src));
    expect(result.error).toBeUndefined();
    expect(result.current[0]).toEqual(MANUAL);
    connection.restore();
  });

  test('return OFFLINE if navigator.onLine is false', async () => {
    jest.spyOn(navigator, 'onLine', 'get').mockReturnValueOnce(false);
    const { useLoadingState } = await import(
      '../../../src/hooks/useLoadingState'
    );
    const { result } = renderHook(() => useLoadingState(null, src));
    expect(result.error).toBeUndefined();
    expect(result.current[0]).toEqual(OFFLINE);
    jest.restoreAllMocks();
  });

  test('state can be overridden with non-null first argument', async () => {
    const { useLoadingState } = await import(
      '../../../src/hooks/useLoadingState'
    );
    const { result } = renderHook(() => useLoadingState(FADING, src));
    expect(result.error).toBeUndefined();
    expect(result.current[0]).toEqual(FADING);
  });
});
