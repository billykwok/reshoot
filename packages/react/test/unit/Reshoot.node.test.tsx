import { describe, beforeAll, afterEach, test, expect } from '@jest/globals';
import * as React from 'react';
import { renderToString } from 'react-dom/server';

describe('Reshoot', () => {
  const baseData = {
    sources: [
      {
        type: 'image/webp',
        srcSet: 'image-480.webp 480w, image-640.webp 640w',
      },
    ],
    src: 'image.jpg',
    width: 100,
    height: 80,
    color: '#fff',
  };

  beforeAll(() => {
    jest.doMock('../../src/utils/isBrowser', () => ({
      __esModule: true,
      default: false,
    }));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('server side rendering', async () => {
    const { Reshoot } = await import('../../src/Reshoot');
    const ref = React.createRef<HTMLImageElement>();
    const html = renderToString(
      <Reshoot
        data-testid="123"
        data={{ ...baseData, aspectRatio: 2 }}
        imgProps={{ alt: 'Test image' }}
        ref={ref}
      />
    );
    expect(html).toMatchSnapshot();
  });
});
