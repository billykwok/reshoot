import { describe, beforeAll, afterEach, test, expect } from '@jest/globals';
import { renderHook } from '@testing-library/react-hooks';
import { ERROR, LOADED, LOADING } from '../../../src/state';

import type { State } from '../../../src/state';

describe('useShowImage', () => {
  const hasLoaded = jest.fn<boolean, [string]>(() => false);
  const hasFailed = jest.fn<boolean, [string]>(() => false);
  const setState = jest.fn<void, [(state?: State) => State]>();
  const key = 'image.jpg';

  beforeAll(() => {
    jest.doMock('../../../src/utils/cache', () => ({ hasLoaded, hasFailed }));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should set LOADING and download new image', async () => {
    const { useShowImage } = await import('../../../src/hooks/useShowImage');
    const {
      result: { error, current: load },
    } = renderHook(() => useShowImage(key, setState));
    expect(error).toBeUndefined();
    load();
    expect(setState).toHaveBeenCalledTimes(1);
    expect(setState.mock.calls[0][0]()).toEqual(LOADING);
  });

  test('should set LOADED for downloaded image', async () => {
    hasLoaded.mockReturnValue(true);
    const { useShowImage } = await import('../../../src/hooks/useShowImage');
    const {
      result: { error, current: load },
    } = renderHook(() => useShowImage(key, setState));
    expect(error).toBeUndefined();
    load();
    expect(setState).toHaveBeenCalledTimes(1);
    expect(setState.mock.calls[0][0]()).toEqual(LOADED);
  });

  test('should set LOADED for downloaded image', async () => {
    hasLoaded.mockReturnValue(false);
    hasFailed.mockReturnValue(true);
    const { useShowImage } = await import('../../../src/hooks/useShowImage');
    const {
      result: { error, current: load },
    } = renderHook(() => useShowImage(key, setState));
    expect(error).toBeUndefined();
    load();
    expect(setState).toHaveBeenCalledTimes(1);
    expect(setState.mock.calls[0][0]()).toEqual(ERROR);
  });
});
