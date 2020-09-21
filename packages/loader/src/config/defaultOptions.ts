import { AspectRatioType, AspectRatioFormat, Mime } from '../type';

import type { Options } from '../type';

function defaultOptions(name: string, fastMode: boolean): Options {
  return {
    name,
    outputPath: '/images',
    publicPath: null,
    shape: ({
      src,
      width,
      height,
      srcSet,
      aspectRatio,
      placeholder,
      color,
      sources,
    }) => ({
      src,
      width,
      height,
      srcSet,
      aspectRatio,
      placeholder,
      color,
      sources,
    }),
    sources: [Mime.WEBP],
    enforceFormat: null,
    srcSet: [480, 640, 840, 1080],
    quality: 80,
    background: '#fff',
    color: null,
    placeholder: { size: 8, quality: 10, trimDataUrl: false },
    aspectRatio: {
      type: AspectRatioType.WidthByHeight,
      format: AspectRatioFormat.Ratio,
      decimal: 4,
    },
    fastMode,
    cache: true,
    emitFile: true,
    esModule: true,
  };
}

const DEFAULT_OPTIONS_DEV = defaultOptions('[path][name].[ext]', true);

const DEFAULT_OPTIONS_OTHER = defaultOptions(
  '[contenthash:8]-[width].[ext]',
  false
);

function resolveDefaultOptions(env: string): Options {
  return env === 'development' ? DEFAULT_OPTIONS_DEV : DEFAULT_OPTIONS_OTHER;
}

export default resolveDefaultOptions;
