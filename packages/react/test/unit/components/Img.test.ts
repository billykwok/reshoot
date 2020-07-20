import { describe, test, expect } from '@jest/globals';
import { render } from '@testing-library/react';
import { createElement } from 'react';
import * as State from '../../../src/state';
import Img from '../../../src/components/Img';

describe('Img tag', () => {
  const onLoad = jest.fn();
  const onError = jest.fn();
  const baseProps = {
    src: 'image.png',
    srcSet: '100w image-small.png',
    color: 'red',
    placeholder: 'another.png',
    __imgProps: { alt: 'description' },
  };

  test('renders error', () => {
    const { getByAltText } = render(
      createElement(Img, {
        ...baseProps,
        __options: [onLoad, onError, State.ERROR, true],
      })
    );
    expect(getByAltText('description')).toMatchSnapshot();
  });

  test('renders initial', () => {
    const { getByAltText } = render(
      createElement(Img, {
        ...baseProps,
        __options: [onLoad, onError, State.INITIAL, true],
      })
    );
    expect(getByAltText('description')).toMatchSnapshot();
  });

  test('renders loaded', () => {
    const { getByAltText } = render(
      createElement(Img, {
        ...baseProps,
        __options: [onLoad, onError, State.LOADED, true],
      })
    );
    expect(getByAltText('description')).toMatchSnapshot();
  });

  test('renders manual', () => {
    const { getByAltText } = render(
      createElement(Img, {
        ...baseProps,
        __options: [onLoad, onError, State.MANUAL, true],
      })
    );
    expect(getByAltText('description')).toMatchSnapshot();
  });

  test('renders offline', () => {
    const { getByAltText } = render(
      createElement(Img, {
        ...baseProps,
        __options: [onLoad, onError, State.OFFLINE, true],
      })
    );
    expect(getByAltText('description')).toMatchSnapshot();
  });
});
