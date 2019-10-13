import extractRest from '../../src/extractRest';

describe('extractRest', () => {
  test('extra attributes not in options', () => {
    expect(extractRest({ srcSet: [1, 2, 3], maxWidth: 10 })).toEqual({
      maxWidth: '10'
    });
  });
});
