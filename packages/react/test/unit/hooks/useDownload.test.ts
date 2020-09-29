import {
  describe,
  beforeAll,
  beforeEach,
  afterEach,
  test,
  expect,
} from '@jest/globals';
import { renderHook, act } from '@testing-library/react-hooks';
import { FADING, ERROR } from '../../../src/state';

import type { State } from '../../../src/state';

const image = (() => {
  let originalImage: typeof Image = null;
  const created: HTMLImageElement[] = [];
  return {
    mock() {
      if (!originalImage) {
        originalImage = global.Image;
      }
      global.Image = class MockImage extends Image {
        constructor(width?: number, height?: number) {
          super(width, height);
          created.push(this);
        }
      };
    },
    restore() {
      if (originalImage) {
        global.Image = originalImage;
      }
      created.length = 0;
    },
    images() {
      return created;
    },
  };
})();

describe('useDownload', () => {
  const setState = jest.fn<void, [() => State]>();
  const src = 'https://example.com/path/to/test.jpg';
  const srcSet =
    'https://example.com/path/to/test-100.jpg 100w, https://example.com/path/to/test-200.jpg 200w';
  const onLoad = jest.fn();
  const onError = jest.fn() as (event: Event) => void;
  const event = new Event('event');
  const cacheLoaded = jest.fn<void, [string]>();
  const cacheFailed = jest.fn<void, [string]>();

  beforeAll(() => {
    jest.doMock('../../../src/utils/cache', () => ({
      cacheLoaded,
      cacheFailed,
    }));
  });

  beforeEach(() => {
    image.mock();
  });

  afterEach(() => {
    image.restore();
    jest.resetAllMocks();
  });

  test('should trigger onLoad via Image props when decode is not supported', async () => {
    const { useDownload } = await import('../../../src/hooks/useDownload');
    const { result } = renderHook(() =>
      useDownload(setState, src, srcSet, onLoad, onError)
    );
    expect(result.error).toBeUndefined();
    const download = result.current;

    act(() => download());
    const images = image.images();
    expect(images).toHaveLength(1);
    expect(images[0].src).toEqual(src);
    expect(images[0].srcset).toEqual(srcSet);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    act(() => images[0].onload(event));
    expect(cacheLoaded).toHaveBeenNthCalledWith(1, src);
    expect(onLoad).toHaveBeenCalledTimes(1);
    expect(setState).toHaveBeenCalledTimes(1);
    expect(setState.mock.calls[0][0]()).toEqual(FADING);
  });

  test('should trigger onError via Image props when decode is not supported', async () => {
    const { useDownload } = await import('../../../src/hooks/useDownload');
    const { result } = renderHook(() =>
      useDownload(setState, src, srcSet, onLoad, onError)
    );
    expect(result.error).toBeUndefined();
    const download = result.current;

    act(() => download());
    const images = image.images();
    expect(images).toHaveLength(1);
    expect(images[0].src).toEqual(src);
    expect(images[0].srcset).toEqual(srcSet);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    act(() => images[0].onerror(event));
    expect(cacheFailed).toHaveBeenNthCalledWith(1, src);
    expect(onError).toHaveBeenNthCalledWith(1, event);
    expect(setState).toHaveBeenCalledTimes(1);
    expect(setState.mock.calls[0][0]()).toEqual(ERROR);
  });
});
