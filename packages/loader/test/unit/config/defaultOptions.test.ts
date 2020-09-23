import { describe, test, expect } from '@jest/globals';
import resolveDefaultOptions from '../../../src/config/defaultOptions';
import { Mime } from '../../../src/type';

describe('default options', () => {
  test('should return correct options in development environment', () => {
    expect(resolveDefaultOptions('development')).toMatchObject({
      name: '[path][name].[ext]',
      outputPath: null,
      publicPath: null,
      srcSet: [480, 640, 840, 1080],
      quality: 80,
      background: '#fff',
      color: null,
      sources: [Mime.WEBP],
      enforceFormat: null,
      placeholder: { size: 8, quality: 10, trimDataUrl: false },
      aspectRatio: { type: 'widthByHeight', format: 'ratio', decimal: 4 },
      fastMode: true,
      cache: true,
      emitFile: true,
      esModule: true,
    });
  });

  test('should return correct options in other environment', () => {
    expect(resolveDefaultOptions('production')).toMatchObject({
      name: '[contenthash:8]-[width].[ext]',
      outputPath: null,
      publicPath: null,
      srcSet: [480, 640, 840, 1080],
      quality: 80,
      background: '#fff',
      color: null,
      sources: [Mime.WEBP],
      enforceFormat: null,
      placeholder: { size: 8, quality: 10, trimDataUrl: false },
      aspectRatio: { type: 'widthByHeight', format: 'ratio', decimal: 4 },
      fastMode: false,
      cache: true,
      emitFile: true,
      esModule: true,
    });
  });
});
