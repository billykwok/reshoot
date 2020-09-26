import { describe, test, expect } from '@jest/globals';
import { createElement, createRef } from 'react';
import { renderToString } from 'react-dom/server';

describe('Reshoot', () => {
  const download = jest.fn(() => Promise.resolve());
  const baseData = { src: 'image.jpg', width: 100, height: 80, color: '#fff' };

  beforeEach(() => {
    jest.doMock('../../src/utils/isBrowser', () => ({
      __esModule: true,
      default: false,
    }));
    jest.doMock('../../src/hooks/useDownload', () => ({
      __esModule: true,
      default: () => download,
    }));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('server side rendering', async () => {
    const { Reshoot } = await import('../../src/Reshoot');
    const ref = createRef<HTMLImageElement>();
    const html = renderToString(
      createElement(Reshoot, {
        'data-testid': '123',
        data: { ...baseData, aspectRatio: 2 },
        imgProps: { alt: 'Test image' },
        ref,
      })
    );
    expect(html).toMatchSnapshot();
  });
});
