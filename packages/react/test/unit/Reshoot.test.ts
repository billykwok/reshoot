import { describe, test, expect } from '@jest/globals';
import { render, act } from '@testing-library/react';
import { createElement, createRef } from 'react';
import { renderToString } from 'react-dom/server';
import * as State from '../../src/state';

describe('Reshoot', () => {
  const download = jest.fn(() => Promise.resolve());
  const baseConfig = {
    src: 'image.jpg',
    alt: 'Test image',
    width: 100,
    height: 80,
  };

  beforeEach(() => {
    jest.doMock(
      '../../src/hooks/useDownload',
      () =>
        ({ __esModule: true, default: () => download } as { __esModule: true })
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('parse valid input', async () => {
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

  test('customized options for normal image', async () => {
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
    const { default: Reshoot } = await import('../../src/Reshoot');
    const ref = createRef<HTMLImageElement>();
    const { getByTestId } = render(
      createElement(Reshoot, {
        'data-testid': '123',
        config: baseConfig,
        ref,
        _s: State.ERROR,
      })
    );
    const dom = getByTestId('123');
    expect(dom).toEqual(ref.current);
    expect(dom).toMatchSnapshot();

    act(() => dom.click());
    expect(download).toHaveBeenCalledTimes(1);
    expect(dom).toMatchSnapshot();
  });

  test('aspect ratio can be overridden', async () => {
    const { default: Reshoot } = await import('../../src/Reshoot');
    const ref = createRef<HTMLImageElement>();
    const { getByTestId } = render(
      createElement(Reshoot, {
        'data-testid': '123',
        config: { ...baseConfig, aspectRatio: 2 },
        ref,
        _s: State.ERROR,
      })
    );
    const dom = getByTestId('123');
    expect(dom).toEqual(ref.current);
    expect(dom).toMatchSnapshot();
  });

  test('server side rendering', async () => {
    const { default: Reshoot } = await import('../../src/Reshoot');
    const ref = createRef<HTMLImageElement>();
    const html = renderToString(
      createElement(Reshoot, {
        'data-testid': '123',
        config: { ...baseConfig, aspectRatio: 2 },
        ref,
      })
    );
    expect(html).toMatchSnapshot();
  });
});
