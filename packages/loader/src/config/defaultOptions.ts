import { AspectRatioType, AspectRatioFormat, Mime } from '../type';

import type { Options } from '../type';

function defaultOptions(name: string, fastMode: boolean): Options {
  return {
    name,
    outputPath: null,
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
    alternativeFormats: [Mime.WEBP],
    alternativeWidths: [480, 800, 1120, 1440],
    defaultFormat: null,
    defaultWidth: 1120,
    quality: 80,
    background: '#fff',
    color: true,
    placeholder: { size: 8, quality: 10, trimDataUrl: false },
    aspectRatio: {
      type: AspectRatioType.HeightByWidth,
      format: AspectRatioFormat.Ratio,
      decimal: 4,
    },
    fastMode,
    cache: true,
    emitFile: true,
    esModule: true,
  };
}

const DEFAULT_OPTIONS_DEV = defaultOptions('[path][name]-[width].[ext]', true);

const DEFAULT_OPTIONS_OTHER = defaultOptions(
  '[contenthash:8]-[width].[ext]',
  false
);

function resolveDefaultOptions(env: string): Options {
  return env === 'development' ? DEFAULT_OPTIONS_DEV : DEFAULT_OPTIONS_OTHER;
}

export default resolveDefaultOptions;
