import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  jest,
  test,
} from '@jest/globals';
import { renderHook } from '@testing-library/react';

const ORIGINAL_IMPLEMENTATION = global.Image;

class MockImage {
  static instances: MockImage[] = [];

  src: string;
  srcset: string;
  sizes: string;
  onload: (e: Event) => any;
  onerror: (e: Event) => any;

  constructor() {
    MockImage.instances.push(this);
  }
}

describe('useLazyImage', () => {
  const src = '/image.png';
  const srcSet = '/image-480.png 480w, /image-800.png 800w';
  const sizes = '(max-width: 600px) 480px, 800px';
  const onLoad: (e: Event) => any = jest.fn();
  const onError: (e: Event) => any = jest.fn();

  beforeAll(() => {
    global.Image = MockImage as unknown as typeof Image;
  });

  afterEach(() => {
    MockImage.instances.splice(0, MockImage.instances.length);
  });

  afterAll(() => {
    global.Image = ORIGINAL_IMPLEMENTATION;
  });

  test('should set correct properties on Image object', async () => {
    const { default: useLazyImage } = await import('../src/useLazyImage');
    renderHook(() => {
      useLazyImage(src, srcSet, sizes, onLoad, onError);
    });
    expect(MockImage.instances.length).toEqual(1);
    const mockImage = MockImage.instances[0];
    expect(mockImage.src).toEqual(src);
    expect(mockImage.srcset).toEqual(srcSet);
    expect(mockImage.sizes).toEqual(sizes);
    expect(mockImage.onload).toEqual(onLoad);
    expect(mockImage.onerror).toEqual(onError);
  });

  test('should set correct properties when srcSet and sizes are missing', async () => {
    const { default: useLazyImage } = await import('../src/useLazyImage');
    renderHook(() => {
      useLazyImage(src, null, null, onLoad, onError);
    });
    expect(MockImage.instances.length).toEqual(1);
    const mockImage = MockImage.instances[0];
    expect(mockImage.src).toEqual(src);
    expect(mockImage.srcset).toBeUndefined();
    expect(mockImage.sizes).toBeUndefined();
    expect(mockImage.onload).toEqual(onLoad);
    expect(mockImage.onerror).toEqual(onError);
  });
});
