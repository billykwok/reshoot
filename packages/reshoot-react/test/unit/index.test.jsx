// @flow
import React from 'react';
import { render, fireEvent, waitForElement } from 'react-testing-library';
import 'jest-dom/extend-expect';

import Reshoot from '../../src';

describe('macros', () => {
  test('parse valid input', () => {
    const props = {
      'data-testid': 'target',
      src: 'image.jpg',
      alt: 'Test image',
      aspectRatio: 80
    };
    const { container, getByTestId } = render(<Reshoot {...props} />);
    expect(getByTestId('target')).toMatchSnapshot();
  });
});
