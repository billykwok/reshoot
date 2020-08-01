import { describe, beforeEach, afterEach, test, expect } from '@jest/globals';
import { fireEvent, render, act } from '@testing-library/react';
import { createElement, createRef } from 'react';
import * as State from '../../src/state';

describe('Reshoot', () => {
  const download = jest.fn(() => null);
  const baseConfig = {
    src: 'image.jpg',
    srcSet: 'image-480.jpg 480w, image-640.jpg 640w',
    alt: 'Test image',
    width: 100,
    height: 80,
    color: '#fff',
    placeholder: 'data:jpeg;base64,1shfk241jkw',
  };
  const useLoadingState = jest.fn();
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  const setState = jest.fn((callback: () => number): void => {});

  beforeEach(() => {
    jest.doMock('../../src/utils/isBrowser', () => ({
      __esModule: true,
      default: true,
    }));
    jest.doMock('../../src/hooks/useLoadingState', () => ({
      __esModule: true,
      default: useLoadingState,
    }));
    jest.doMock('../../src/hooks/useIntersection', () => ({
      __esModule: true,
      default: () => null,
    }));
    jest.doMock('../../src/hooks/useDownload', () => ({
      __esModule: true,
      default: () => download,
    }));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('render valid input correctly in state INITIAL', async () => {
    useLoadingState.mockReturnValue([State.INITIAL, setState]);
    const { default: Reshoot } = await import('../../src/Reshoot');
    const ref = createRef<HTMLImageElement>();
    const { getByTestId } = render(
      createElement(Reshoot, { 'data-testid': '123', config: baseConfig, ref })
    );
    const dom = getByTestId('123');
    expect(dom).toEqual(ref.current);
    expect(dom).toMatchSnapshot();
  });

  test('render valid input correctly in state FADING', async () => {
    useLoadingState.mockReturnValue([State.FADING, setState]);
    const { default: Reshoot } = await import('../../src/Reshoot');
    const ref = createRef<HTMLImageElement>();
    const { getByTestId } = render(
      createElement(Reshoot, { 'data-testid': '123', config: baseConfig, ref })
    );
    const dom = getByTestId('123');
    expect(dom).toEqual(ref.current);
    expect(dom).toMatchSnapshot();

    const childrens = dom.getElementsByTagName('div');
    expect(childrens).toHaveLength(1);

    fireEvent.animationEnd(childrens.item(0));
    expect(setState).toHaveBeenCalledTimes(1);
    expect(setState.mock.calls[0][0]()).toEqual(State.LOADED);
  });

  test('render valid input correctly in state LOADED', async () => {
    useLoadingState.mockReturnValue([State.LOADED, setState]);
    const { default: Reshoot } = await import('../../src/Reshoot');
    const ref = createRef<HTMLImageElement>();
    const { getByTestId } = render(
      createElement(Reshoot, { 'data-testid': '123', config: baseConfig, ref })
    );
    const dom = getByTestId('123');
    expect(dom).toEqual(ref.current);
    expect(dom).toMatchSnapshot();
  });

  test('render valid input correctly in state MANUAL', async () => {
    useLoadingState.mockReturnValue([State.MANUAL, setState]);
    const { default: Reshoot } = await import('../../src/Reshoot');
    const ref = createRef<HTMLImageElement>();
    const { getByTestId } = render(
      createElement(Reshoot, { 'data-testid': '123', config: baseConfig, ref })
    );
    const dom = getByTestId('123');
    expect(dom).toEqual(ref.current);
    expect(dom).toMatchSnapshot();
  });

  test('render valid input correctly in state OFFLINE', async () => {
    useLoadingState.mockReturnValue([State.OFFLINE, setState]);
    const { default: Reshoot } = await import('../../src/Reshoot');
    const ref = createRef<HTMLImageElement>();
    const { getByTestId } = render(
      createElement(Reshoot, { 'data-testid': '123', config: baseConfig, ref })
    );
    const dom = getByTestId('123');
    expect(dom).toEqual(ref.current);
    expect(dom).toMatchSnapshot();
  });

  test('render valid input correctly in state ERROR', async () => {
    useLoadingState.mockReturnValue([State.ERROR, setState]);
    const { default: Reshoot } = await import('../../src/Reshoot');
    const ref = createRef<HTMLImageElement>();
    const { getByTestId } = render(
      createElement(Reshoot, { 'data-testid': '123', config: baseConfig, ref })
    );
    const dom = getByTestId('123');
    expect(dom).toEqual(ref.current);
    expect(dom).toMatchSnapshot();
  });

  test('customized options for image link', async () => {
    useLoadingState.mockReturnValue([State.LOADED, setState]);
    const { default: Reshoot } = await import('../../src/Reshoot');
    const ref = createRef<HTMLImageElement>();
    const { getByTestId } = render(
      createElement(Reshoot, {
        'data-testid': '123',
        config: {
          ...baseConfig,
          color: '#fff',
          placeholder: 'placeholder.jpg',
        },
        ref,
        target: '_blank',
        href: 'https://example.com',
      })
    );
    const dom = getByTestId('123');
    expect(dom).toEqual(ref.current);
    expect(dom).toMatchSnapshot();
  });

  test('do not render preview when placeholder is falsy', async () => {
    useLoadingState.mockReturnValue([State.INITIAL, setState]);
    const { default: Reshoot } = await import('../../src/Reshoot');
    const ref = createRef<HTMLImageElement>();
    const { getByTestId } = render(
      createElement(Reshoot, {
        'data-testid': '123',
        config: { ...baseConfig, color: '#fff', placeholder: false },
        ref,
      })
    );
    const dom = getByTestId('123');
    expect(dom).toEqual(ref.current);
    expect(dom).toMatchSnapshot();
  });

  test('customized options for normal image', async () => {
    useLoadingState.mockReturnValue([State.LOADED, setState]);
    const { default: Reshoot } = await import('../../src/Reshoot');
    const ref = createRef<HTMLImageElement>();
    const { getByTestId } = render(
      createElement(Reshoot, {
        'data-testid': '123',
        config: { ...baseConfig, color: '#fff' },
        ref,
      })
    );
    const dom = getByTestId('123');
    expect(dom).toEqual(ref.current);
    expect(dom).toMatchSnapshot();
  });

  test('customized options for error image', async () => {
    useLoadingState.mockReturnValue([State.ERROR, setState]);
    const { default: Reshoot } = await import('../../src/Reshoot');
    const ref = createRef<HTMLImageElement>();
    const { getByTestId } = render(
      createElement(Reshoot, { 'data-testid': '123', config: baseConfig, ref })
    );
    const dom = getByTestId('123');
    expect(dom).toEqual(ref.current);
    expect(dom).toMatchSnapshot();

    act(() => dom.click());
    expect(download).toHaveBeenCalledTimes(1);
    expect(dom).toMatchSnapshot();
  });

  test('aspect ratio can be overridden', async () => {
    useLoadingState.mockReturnValue([State.LOADED, setState]);
    const { default: Reshoot } = await import('../../src/Reshoot');
    const ref = createRef<HTMLImageElement>();
    const { getByTestId } = render(
      createElement(Reshoot, {
        'data-testid': '123',
        config: { ...baseConfig, aspectRatio: 2 },
        ref,
      })
    );
    const dom = getByTestId('123');
    expect(dom).toEqual(ref.current);
    expect(dom).toMatchSnapshot();
  });
});
