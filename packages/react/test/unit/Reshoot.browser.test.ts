import { describe, beforeEach, afterEach, test, expect } from '@jest/globals';
import { fireEvent, render } from '@testing-library/react';
import { createElement, createRef } from 'react';
import {
  MANUAL,
  OFFLINE,
  ERROR,
  HIDDEN,
  LOADING,
  FADING,
  LOADED,
} from '../../src/state';

describe('Reshoot', () => {
  const download = jest.fn(() => null);
  const baseData = {
    src: 'image.jpg',
    srcSet: 'image-480.jpg 480w, image-640.jpg 640w',
    width: 100,
    height: 80,
    color: '#fff',
    placeholder: 'data:jpeg;base64,1shfk241jkw',
  };
  const useLoadingState = jest.fn();
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  const setState = jest.fn((_: () => number): void => {});

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

  test('render valid input correctly in state MANUAL', async () => {
    useLoadingState.mockReturnValue([MANUAL, setState]);
    const { Reshoot } = await import('../../src/Reshoot');
    const ref = createRef<HTMLImageElement>();
    const { getByTestId } = render(
      createElement(Reshoot, { 'data-testid': '123', data: baseData, ref })
    );
    const dom = getByTestId('123');
    expect(dom).toEqual(ref.current);
    expect(dom).toMatchSnapshot();
  });

  test('render valid input correctly in state OFFLINE', async () => {
    useLoadingState.mockReturnValue([OFFLINE, setState]);
    const { Reshoot } = await import('../../src/Reshoot');
    const ref = createRef<HTMLImageElement>();
    const { getByTestId } = render(
      createElement(Reshoot, { 'data-testid': '123', data: baseData, ref })
    );
    const dom = getByTestId('123');
    expect(dom).toEqual(ref.current);
    expect(dom).toMatchSnapshot();
  });

  test('render valid input correctly in state ERROR', async () => {
    useLoadingState.mockReturnValue([ERROR, setState]);
    const { Reshoot } = await import('../../src/Reshoot');
    const ref = createRef<HTMLImageElement>();
    const { getByTestId } = render(
      createElement(Reshoot, { 'data-testid': '123', data: baseData, ref })
    );
    const dom = getByTestId('123');
    expect(dom).toEqual(ref.current);
    expect(dom).toMatchSnapshot();

    const children = dom.getElementsByTagName('button');
    expect(children).toHaveLength(1);

    fireEvent.click(children.item(0));
    expect(download).toHaveBeenCalledTimes(1);
    expect(dom).toMatchSnapshot();
  });

  test('render valid input correctly in state HIDDEN', async () => {
    useLoadingState.mockReturnValue([HIDDEN, setState]);
    const { Reshoot } = await import('../../src/Reshoot');
    const ref = createRef<HTMLImageElement>();
    const { getByTestId } = render(
      createElement(Reshoot, { 'data-testid': '123', data: baseData, ref })
    );
    const dom = getByTestId('123');
    expect(dom).toEqual(ref.current);
    expect(dom).toMatchSnapshot();
  });

  test('render valid input correctly in state LOADING', async () => {
    useLoadingState.mockReturnValue([LOADING, setState]);
    const { Reshoot } = await import('../../src/Reshoot');
    const ref = createRef<HTMLImageElement>();
    const { getByTestId } = render(
      createElement(Reshoot, { 'data-testid': '123', data: baseData, ref })
    );
    const dom = getByTestId('123');
    expect(dom).toEqual(ref.current);
    expect(dom).toMatchSnapshot();
  });

  test('render valid input correctly in state FADING', async () => {
    useLoadingState.mockReturnValue([FADING, setState]);
    const { Reshoot } = await import('../../src/Reshoot');
    const ref = createRef<HTMLImageElement>();
    const { getByTestId } = render(
      createElement(Reshoot, { 'data-testid': '123', data: baseData, ref })
    );
    const dom = getByTestId('123');
    expect(dom).toEqual(ref.current);
    expect(dom).toMatchSnapshot();

    const childrens = dom.getElementsByTagName('div');
    expect(childrens).toHaveLength(1);

    fireEvent.animationEnd(childrens.item(0));
    expect(setState).toHaveBeenCalledTimes(1);
    expect(setState.mock.calls[0][0]()).toEqual(LOADED);
  });

  test('render valid input correctly in state LOADED', async () => {
    useLoadingState.mockReturnValue([LOADED, setState]);
    const { Reshoot } = await import('../../src/Reshoot');
    const ref = createRef<HTMLImageElement>();
    const { getByTestId } = render(
      createElement(Reshoot, { 'data-testid': '123', data: baseData, ref })
    );
    const dom = getByTestId('123');
    expect(dom).toEqual(ref.current);
    expect(dom).toMatchSnapshot();
  });
  test('customized options for image link', async () => {
    useLoadingState.mockReturnValue([LOADED, setState]);
    const { Reshoot } = await import('../../src/Reshoot');
    const ref = createRef<HTMLImageElement>();
    const { getByTestId } = render(
      createElement(Reshoot, {
        'data-testid': '123',
        data: {
          ...baseData,
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
    useLoadingState.mockReturnValue([LOADING, setState]);
    const { Reshoot } = await import('../../src/Reshoot');
    const ref = createRef<HTMLImageElement>();
    const { getByTestId } = render(
      createElement(Reshoot, {
        'data-testid': '123',
        data: { ...baseData, color: '#fff', placeholder: false },
        ref,
      })
    );
    const dom = getByTestId('123');
    expect(dom).toEqual(ref.current);
    expect(dom).toMatchSnapshot();
  });

  test('customized options for normal image', async () => {
    useLoadingState.mockReturnValue([LOADED, setState]);
    const { Reshoot } = await import('../../src/Reshoot');
    const ref = createRef<HTMLImageElement>();
    const { getByTestId } = render(
      createElement(Reshoot, {
        'data-testid': '123',
        data: { ...baseData, color: '#fff' },
        ref,
      })
    );
    const dom = getByTestId('123');
    expect(dom).toEqual(ref.current);
    expect(dom).toMatchSnapshot();
  });

  test('aspect ratio can be overridden', async () => {
    useLoadingState.mockReturnValue([LOADED, setState]);
    const { Reshoot } = await import('../../src/Reshoot');
    const ref = createRef<HTMLImageElement>();
    const { getByTestId } = render(
      createElement(Reshoot, {
        'data-testid': '123',
        data: { ...baseData, aspectRatio: 0.5 },
        ref,
      })
    );
    const dom = getByTestId('123');
    expect(dom).toEqual(ref.current);
    expect(dom).toMatchSnapshot();
  });
});
