import { describe, test, expect } from '@jest/globals';
import { Mime, Extension } from '../../src/type';

describe('type', () => {
  test('mime is of the right shape', () => {
    expect(Mime).toEqual({
      JPG: 'image/jpeg',
      JPEG: 'image/jpeg',
      PNG: 'image/png',
      GIF: 'image/gif',
      WEBP: 'image/webp',
      SVG: 'image/svg+xml',
    });
  });

  test('extension is of the right shape', () => {
    expect(Extension).toEqual({
      'image/jpeg': 'jpg',
      'image/png': 'png',
      'image/gif': 'gif',
      'image/webp': 'webp',
      'image/svg+xml': 'svg',
    });
  });
});
