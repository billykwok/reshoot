import { Options, AspectRatioType, AspectRatioFormat } from './type';

function resolveDefaultOptions(env: string): Options {
  return {
    name:
      env === 'development'
        ? '[path][name].[ext]'
        : '[contenthash:16]-[width].[ext]',
    outputPath: null,
    publicPath: null,
    context: null,
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
    aspectRatio: {
      type: AspectRatioType.HeightByWidth,
      format: AspectRatioFormat.Percent,
      decimal: 2
    },
    disable: env === 'development',
    emitFile: true
  };
}

export default resolveDefaultOptions;
