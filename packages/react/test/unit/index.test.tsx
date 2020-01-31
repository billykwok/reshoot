import React from 'react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';

import Reshoot from '../../src';

describe('react', () => {
  beforeAll(() => {
    (window as any).IntersectionObserver = class IntersectionObserver {
      observe() {
        return null;
      }

      unobserve() {
        return null;
      }
    };
  });

  test('parse valid input', () => {
    expect(
      renderer
        .create(<Reshoot src="image.jpg" alt="Test image" aspectRatio={80} />)
        .toJSON()
    ).toMatchSnapshot();
  });

  test('customized options for image link', () => {
    expect(
      renderer
        .create(
          <Reshoot
            src="image.jpg"
            alt="Test image"
            aspectRatio={80}
            blur={100}
            color="#fff"
            placeholder="placeholder.jpg"
            target="_blank"
            href="https://example.com"
            messages={{
              MANUAL: 'manual!',
              OFFLINE: 'offline!',
              ERROR: 'error!'
            }}
          />
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  test('customized options for normal image', () => {
    expect(
      renderer
        .create(
          <Reshoot
            src="image.jpg"
            alt="Test image"
            aspectRatio={80}
            blur={100}
            color="#fff"
            messages={{
              MANUAL: 'manual!',
              OFFLINE: 'offline!',
              ERROR: 'error!'
            }}
          />
        )
        .toJSON()
    ).toMatchSnapshot();
  });
});
