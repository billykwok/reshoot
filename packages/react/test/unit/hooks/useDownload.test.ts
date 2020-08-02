import { describe, beforeEach, afterEach, test, expect } from '@jest/globals';
import { renderHook, act } from '@testing-library/react-hooks';
import useDownload from '../../../src/hooks/useDownload';

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const setState = jest.fn((callback: () => State): void => null);
  const src = 'https://example.com/path/to/test.jpg';
  const srcSet =
    'https://example.com/path/to/test-100.jpg 100w, https://example.com/path/to/test-200.jpg 200w';
  const onLoad = jest.fn();
  const onError = jest.fn() as (event: Event) => void;
  const event = new Event('event');

  beforeEach(() => {
    image.mock();
  });

  afterEach(() => {
    image.restore();
    jest.resetAllMocks();
  });

  test('should trigger onLoad via Image props when decode is not supported', () => {
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
    expect(onLoad).toHaveBeenCalledTimes(1);
  });

  test('should trigger onError via Image props when decode is not supported', () => {
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
    expect(onError).toHaveBeenNthCalledWith(1, event);
  });
});
