import extensions from '../../src/extensions';

describe('Extensions map', () => {
  test('is of the right shape', () => {
    expect(extensions).toEqual({
      'image/jpeg': 'jpg',
      'image/png': 'png',
      'image/gif': 'gif',
      'image/webp': 'webp',
      'image/svg+xml': 'svg'
    });
  });
});
