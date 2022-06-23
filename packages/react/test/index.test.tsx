import {
  afterEach,
  beforeAll,
  describe,
  expect,
  jest,
  test,
} from '@jest/globals';
import { createRef } from 'react';
import {
  act,
  screen,
  render,
  fireEvent,
  cleanup,
} from '@testing-library/react';
import { type ImageMeta } from '@reshoot/types';

type UseLifecycleRef = typeof import('use-lifecycle-ref').default;
type UseLazyImage = typeof import('../src/useLazyImage').default;

describe('Reshoot', () => {
  const completelyLoadedImgElement = Object.defineProperty(
    document.createElement('img'),
    'complete',
    { value: true }
  );
  const loadingImgElement = Object.defineProperty(
    document.createElement('img'),
    'complete',
    { value: false }
  );
  const imageMeta: ImageMeta = {
    src: 'image.jpg',
    width: 100,
    height: 80,
    aspectRatio: 0.8,
    color: '#fff',
    placeholder: 'data:jpeg;base64,1shfk241jkw',
  };
  const srcSet = 'image-480.jpg 480w, image-640.jpg 640w';
  const sizes = '';
  const alt = 'alt content';
  const className = 'classname-1 classname-2';
  const style = {};
  const useLifecycleRef = jest.fn<UseLifecycleRef>();
  const useLazyImage = jest.fn<UseLazyImage>();

  beforeAll(() => {
    jest.doMock('use-lifecycle-ref', () => useLifecycleRef);
    jest.doMock('../src/useLazyImage', () => useLazyImage);
  });

  afterEach(() => {
    cleanup();
    jest.resetAllMocks();
  });

  test('render input correctly on load with HTMLImageElement.complete true', async () => {
    useLifecycleRef.mockReturnValue(null);
    const { default: Img } = await import('../src');
    const ref = createRef<HTMLElement>();
    const imgRef = createRef<HTMLImageElement>();
    const element = (
      <Img
        meta={imageMeta}
        container="a"
        ref={ref}
        imgRef={imgRef}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        className={className}
        style={style}
        data-testid="123"
      />
    );

    render(element);
    expect(useLazyImage).toHaveBeenCalledTimes(1);
    const [, , , onLoad] = useLazyImage.mock.calls[0];
    expect(useLifecycleRef).toHaveBeenCalledTimes(1);
    const [{ onAttach, ref: outerImgRef }] = useLifecycleRef.mock.calls[0];
    expect(outerImgRef).toEqual(imgRef);
    const dom1 = screen.getByTestId('123');
    expect(dom1).toEqual(ref.current);
    expect(dom1).toMatchSnapshot();

    act(() => {
      onAttach(completelyLoadedImgElement);
    });
    const dom2 = screen.getByTestId('123');
    expect(dom2).toEqual(ref.current);
    expect(dom2).toMatchSnapshot();

    act(() => {
      onLoad(new Event('load'));
    });
    const dom3 = screen.getByTestId('123');
    expect(dom3).toEqual(ref.current);
    expect(dom3).toMatchSnapshot();
  });

  test('render input correctly on load with HTMLImageElement.complete false', async () => {
    useLifecycleRef.mockReturnValue(null);
    const { default: Img } = await import('../src');
    const ref = createRef<HTMLElement>();
    const imgRef = createRef<HTMLImageElement>();
    const element = (
      <Img
        meta={imageMeta}
        container="a"
        ref={ref}
        imgRef={imgRef}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        className={className}
        style={style}
        data-testid="123"
      />
    );

    render(element);
    expect(useLazyImage).toHaveBeenCalledTimes(1);
    const [, , , onLoad] = useLazyImage.mock.calls[0];
    expect(useLifecycleRef).toHaveBeenCalledTimes(1);
    const [{ onAttach, ref: outerImgRef }] = useLifecycleRef.mock.calls[0];
    expect(outerImgRef).toEqual(imgRef);
    const dom1 = screen.getByTestId('123');
    expect(dom1).toEqual(ref.current);
    expect(dom1).toMatchSnapshot();

    act(() => {
      onAttach(loadingImgElement);
    });
    const dom2 = screen.getByTestId('123');
    expect(dom2).toEqual(ref.current);
    expect(dom2).toMatchSnapshot();

    act(() => {
      onLoad(new Event('load'));
    });
    const dom3 = screen.getByTestId('123');
    expect(dom3).toEqual(ref.current);
    expect(dom3).toMatchSnapshot();

    // eslint-disable-next-line testing-library/no-node-access
    const placeholder = dom3.querySelector('[aria-hidden="true"]');
    fireEvent.animationEnd(placeholder);
    expect(dom3).toEqual(ref.current);
    expect(dom3).toMatchSnapshot();
  });

  test('render input correctly on error', async () => {
    useLifecycleRef.mockReturnValue(null);
    const { default: Img } = await import('../src');
    const ref = createRef<HTMLElement>();
    const imgRef = createRef<HTMLImageElement>();
    const element = (
      <Img
        meta={imageMeta}
        ref={ref}
        imgRef={imgRef}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        style={style}
        data-testid="123"
      />
    );

    render(element);
    expect(useLazyImage).toHaveBeenCalledTimes(1);
    const [, , , , onError] = useLazyImage.mock.calls[0];
    expect(useLifecycleRef).toHaveBeenCalledTimes(1);
    const [{ onAttach, ref: outerImgRef }] = useLifecycleRef.mock.calls[0];
    expect(outerImgRef).toEqual(imgRef);
    const dom1 = screen.getByTestId('123');
    expect(dom1).toEqual(ref.current);
    expect(dom1).toMatchSnapshot();

    act(() => {
      onAttach(loadingImgElement);
    });
    const dom2 = screen.getByTestId('123');
    expect(dom2).toEqual(ref.current);
    expect(dom2).toMatchSnapshot();

    act(() => {
      onError(new Event('error'));
    });
    const dom3 = screen.getByTestId('123');
    expect(dom3).toEqual(ref.current);
    expect(dom3).toMatchSnapshot();
  });
});
