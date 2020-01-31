import React from 'react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';

import Placeholder from '../../src/Placeholder';

describe('Placeholder tag', () => {
  test('is in good shape', () => {
    expect(
      renderer.create(<Placeholder aspectRatio={1.5} color="red" />).toJSON()
    ).toMatchSnapshot();
  });
});
