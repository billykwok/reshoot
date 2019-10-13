import mimes from '../../src/mimes';

describe('MIME map', () => {
  test('is of the right shape', () => {
    expect(mimes).toEqual({
      JPG: 'image/jpeg',
      JPEG: 'image/jpeg',
      PNG: 'image/png',
      GIF: 'image/gif',
      WEBP: 'image/webp',
      SVG: 'image/svg+xml'
    });
  });
});
