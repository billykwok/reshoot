// @flow
import mimes from '../../src/mimes';

describe('MIME map', () => {
  test('is of the right shape', () => {
    expect(mimes).toEqual({
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png'
    });
  });
});
