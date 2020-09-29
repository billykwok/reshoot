import { describe, beforeAll, afterEach, test, expect } from '@jest/globals';
import { renderHook } from '@testing-library/react-hooks';
import { ERROR, LOADED, LOADING } from '../../../src/state';

import type { State } from '../../../src/state';

describe('useLoadImage', () => {
  const hasLoaded = jest.fn<boolean, [string]>(() => false);
  const hasFailed = jest.fn<boolean, [string]>(() => false);
  const setState = jest.fn<void, [(state?: State) => State]>();
  const src = 'image.jpg';
  const download = jest.fn();

  beforeAll(() => {
    jest.doMock('../../../src/utils/cache', () => ({ hasLoaded, hasFailed }));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should set LOADING and download new image', async () => {
    const { useLoadImage } = await import('../../../src/hooks/useLoadImage');
    const {
      result: { error, current: load },
    } = renderHook(() => useLoadImage(setState, src, download));
    expect(error).toBeUndefined();
    load();
    expect(setState).toHaveBeenCalledTimes(1);
    expect(setState.mock.calls[0][0]()).toEqual(LOADING);
    expect(download).toHaveBeenCalledTimes(1);
  });

  test('should set LOADED for downloaded image', async () => {
    hasLoaded.mockReturnValue(true);
    const { useLoadImage } = await import('../../../src/hooks/useLoadImage');
    const {
      result: { error, current: load },
    } = renderHook(() => useLoadImage(setState, src, download));
    expect(error).toBeUndefined();
    load();
    expect(setState).toHaveBeenCalledTimes(1);
    expect(setState.mock.calls[0][0]()).toEqual(LOADED);
    expect(download).toHaveBeenCalledTimes(0);
  });

  test('should set LOADED for downloaded image', async () => {
    hasLoaded.mockReturnValue(false);
    hasFailed.mockReturnValue(true);
    const { useLoadImage } = await import('../../../src/hooks/useLoadImage');
    const {
      result: { error, current: load },
    } = renderHook(() => useLoadImage(setState, src, download));
    expect(error).toBeUndefined();
    load();
    expect(setState).toHaveBeenCalledTimes(1);
    expect(setState.mock.calls[0][0]()).toEqual(ERROR);
    expect(download).toHaveBeenCalledTimes(0);
  });
});
