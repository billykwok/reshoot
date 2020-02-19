import resolveDefaultOptions from '../../src/defaultOptions';

describe('default options', () => {
  test('are correct in development environment', () => {
    expect(resolveDefaultOptions('development')).toEqual({
      name: '[path][name].[ext]',
      outputPath: null,
      publicPath: null,
      shape: {
        mime: 'mime',
        src: 'src',
        aspectRatio: 'aspectRatio',
        srcSet: 'srcSet',
        placeholder: 'placeholder',
        color: 'color'
      },
      srcSet: [480, 640, 840, 1080],
      quality: 80,
      background: '#fff',
      color: 'DarkMuted',
      forceFormat: false,
      placeholder: { size: 8, trimDataUrl: false },
      aspectRatio: { type: 'heightByWidth', format: 'percent', decimal: 2 },
      disable: true,
      emitFile: true,
      esModule: true
    });
  });

  test('are correct in other environment', () => {
    expect(resolveDefaultOptions('production')).toEqual({
      name: '[contenthash:16]-[width].[ext]',
      outputPath: null,
      publicPath: null,
      shape: {
        mime: 'mime',
        src: 'src',
        aspectRatio: 'aspectRatio',
        srcSet: 'srcSet',
        placeholder: 'placeholder',
        color: 'color'
      },
      srcSet: [480, 640, 840, 1080],
      quality: 80,
      background: '#fff',
      color: 'DarkMuted',
      forceFormat: false,
      placeholder: { size: 8, trimDataUrl: false },
      aspectRatio: { type: 'heightByWidth', format: 'percent', decimal: 2 },
      disable: false,
      emitFile: true,
      esModule: true
    });
  });
});
