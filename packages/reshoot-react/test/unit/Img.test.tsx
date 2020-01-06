import React from 'react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';

import Img from '../../src/Img';
import State from '../../src/state';

describe('Img tag', () => {
  test('renders error', () => {
    expect(
      renderer
        .create(
          <Img
            color="red"
            placeholder="another.png"
            src="image.png"
            srcSet="100w image-small.png"
            alt="description"
            state={State.ERROR}
            blur={10}
          />
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  test('renders initial', () => {
    expect(
      renderer
        .create(
          <Img
            color="red"
            placeholder="another.png"
            src="image.png"
            srcSet="100w image-small.png"
            alt="description"
            state={State.INITIAL}
            blur={10}
          />
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  test('renders loaded', () => {
    expect(
      renderer
        .create(
          <Img
            color="red"
            placeholder="another.png"
            src="image.png"
            srcSet="100w image-small.png"
            alt="description"
            state={State.LOADED}
            blur={10}
          />
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  test('renders manual', () => {
    expect(
      renderer
        .create(
          <Img
            color="red"
            placeholder="another.png"
            src="image.png"
            srcSet="100w image-small.png"
            alt="description"
            state={State.MANUAL}
            blur={10}
          />
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  test('renders offline', () => {
    expect(
      renderer
        .create(
          <Img
            color="red"
            placeholder="another.png"
            src="image.png"
            srcSet="100w image-small.png"
            alt="description"
            state={State.OFFLINE}
            blur={10}
          />
        )
        .toJSON()
    ).toMatchSnapshot();
  });
});
