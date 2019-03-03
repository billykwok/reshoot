// @flow
import extractRest from '../../src/extractRest';

describe('extractRest', () => {
  test('extra attributes not in options', () => {
    expect(extractRest({ srcSet: [1, 2, 3], some: 'extra' })).toEqual({
      some: 'extra'
    });
  });
});
