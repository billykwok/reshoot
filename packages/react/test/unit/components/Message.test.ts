import { describe, test, expect } from '@jest/globals';
import { render } from '@testing-library/react';
import { createElement } from 'react';
import Message from '../../../src/components/Message';
import * as State from '../../../src/state';

describe('Message tag', () => {
  test('renders error', () => {
    const { container } = render(
      createElement(Message, { state: State.ERROR })
    );
    expect(container.getElementsByTagName('div')[0]).toMatchSnapshot();
  });

  test('renders initial', () => {
    const { container } = render(
      createElement(Message, { state: State.INITIAL })
    );
    expect(container.getElementsByTagName('div')[0]).toMatchSnapshot();
  });

  test('renders loaded', () => {
    const { container } = render(
      createElement(Message, { state: State.LOADED })
    );
    expect(container.getElementsByTagName('div')[0]).toMatchSnapshot();
  });

  test('renders manual', () => {
    const { container } = render(
      createElement(Message, { state: State.MANUAL })
    );
    expect(container.getElementsByTagName('div')[0]).toMatchSnapshot();
  });

  test('renders offline', () => {
    const { container } = render(
      createElement(Message, { state: State.OFFLINE })
    );
    expect(container.getElementsByTagName('div')[0]).toMatchSnapshot();
  });
});
