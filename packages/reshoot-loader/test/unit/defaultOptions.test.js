// @flow
import { generateDefaultOptions } from '../../src/defaultOptions';

describe('default options', () => {
  test('are correct in development environment', () => {
    expect(generateDefaultOptions('development')).toEqual({
      name: '[contenthash:16]-[width].[ext]',
      outputPath: null,
      publicPath: null,
      context: null,
      shape: {
        src: 'src',
        aspectRatio: 'aspectRatio',
        srcSet: 'srcSet',
        placeholder: 'placeholder',
        background: false,
        palette: false
      },
      srcSet: [480, 640, 840, 1080],
      quality: 80,
      background: '#fff',
      color: 'DarkMuted',
      forceFormat: false,
      placeholder: { size: 10, trimDataUrl: false },
      aspectRatio: { type: 'heightByWidth', format: 'percent', decimal: 2 },
      disable: true,
      emitFile: true
    });
  });

  test('are correct in other environment', () => {
    expect(generateDefaultOptions('production')).toEqual({
      name: '[contenthash:16]-[width].[ext]',
      outputPath: null,
      publicPath: null,
      context: null,
      shape: {
        src: 'src',
        aspectRatio: 'aspectRatio',
        srcSet: 'srcSet',
        placeholder: 'placeholder',
        background: false,
        palette: false
      },
      srcSet: [480, 640, 840, 1080],
      quality: 80,
      background: '#fff',
      color: 'DarkMuted',
      forceFormat: false,
      placeholder: { size: 10, trimDataUrl: false },
      aspectRatio: { type: 'heightByWidth', format: 'percent', decimal: 2 },
      disable: false,
      emitFile: true
    });
  });
});
