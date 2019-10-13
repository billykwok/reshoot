import React from 'react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';

import Reshoot from '../../src';

describe('react', () => {
  test('parse valid input', () => {
    expect(
      renderer
        .create(<Reshoot src="image.jpg" alt="Test image" aspectRatio={80} />)
        .toJSON()
    ).toMatchSnapshot();
  });
});

describe('react', () => {
  test('parse invalid input', () => {
    expect(
      renderer
        .create(<Reshoot src="image2.jpg" alt="Test image" aspectRatio={80} />)
        .toJSON()
    ).toMatchSnapshot();
  });
});
