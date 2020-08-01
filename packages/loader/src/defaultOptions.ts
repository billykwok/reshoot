import { AspectRatioType, AspectRatioFormat } from './type';
import type { Options } from './type';

function resolveDefaultOptions(env: string): Options {
  return {
    name:
      env === 'development'
        ? '[path][name].[ext]'
        : '[contenthash:8]-[width].[ext]',
    outputPath: null,
    publicPath: null,
    shape: {
      mime: false,
      src: 'src',
      width: 'width',
      height: 'height',
      srcSet: 'srcSet',
      aspectRatio: 'aspectRatio',
      placeholder: 'placeholder',
      color: 'color',
    },
    srcSet: [480, 640, 840, 1080],
    quality: 80,
    background: '#fff',
    color: '#fff',
    enforceFormat: false,
    placeholder: { size: 8, trimDataUrl: false },
    aspectRatio: {
      type: AspectRatioType.WidthByHeight,
      format: AspectRatioFormat.Ratio,
      decimal: 4,
    },
    disable: env === 'development',
    cache: true,
    emitFile: true,
    esModule: true,
  };
}

export default resolveDefaultOptions;
