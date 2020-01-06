import React from 'react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';

import Message from '../../src/Message';
import State from '../../src/state';

describe('Message tag', () => {
  test('renders error', () => {
    expect(
      renderer
        .create(<Message state={State.ERROR} text="some message" />)
        .toJSON()
    ).toMatchSnapshot();
  });

  test('renders initial', () => {
    expect(
      renderer
        .create(<Message state={State.INITIAL} text="some message" />)
        .toJSON()
    ).toMatchSnapshot();
  });

  test('renders loaded', () => {
    expect(
      renderer
        .create(<Message state={State.LOADED} text="some message" />)
        .toJSON()
    ).toMatchSnapshot();
  });

  test('renders manual', () => {
    expect(
      renderer
        .create(<Message state={State.MANUAL} text="some message" />)
        .toJSON()
    ).toMatchSnapshot();
  });

  test('renders offline', () => {
    expect(
      renderer
        .create(<Message state={State.OFFLINE} text="some message" />)
        .toJSON()
    ).toMatchSnapshot();
  });
});
