import extractPassThroughProperties from '../../src/extractPassThroughProperties';
import resolveDefaultOptions from '../../src/defaultOptions';

const defaultOptions = resolveDefaultOptions('development');

describe('extractPassThroughProperties', () => {
  test('extra attributes not in options', () => {
    expect(
      extractPassThroughProperties(
        { srcSet: [1, 2, 3], maxWidth: 10 },
        defaultOptions
      )
    ).toEqual({ maxWidth: 10 });
  });
});
