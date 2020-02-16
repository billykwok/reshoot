import extractPassThroughProperties from '../../src/extractPassThroughProperties';

describe('extractPassThroughProperties', () => {
  test('extra attributes not in options', () => {
    expect(
      extractPassThroughProperties({ srcSet: [1, 2, 3], maxWidth: 10 })
    ).toEqual({ maxWidth: 10 });
  });
});
