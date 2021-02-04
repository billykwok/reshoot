import { AspectRatioType, AspectRatioFormat, Mime } from '../type';

import type { Options } from '../type';

function defaultOptions(name: string, fastMode: boolean): Options {
  return {
    name,
    outputPath: null,
    publicPath: null,
    shape: ({
      id,
      src,
      width,
      height,
      srcSet,
      aspectRatio,
      placeholder,
      color,
      sources,
    }) => ({
      id,
      src,
      width,
      height,
      srcSet,
      aspectRatio,
      placeholder,
      color,
      sources,
    }),
    alternativeFormats: [Mime.AVIF, Mime.WEBP],
    alternativeWidths: [480, 800, 1120, 1440],
    defaultFormat: null,
    defaultWidth: 1120,
    quality: 80,
    background: '#fff',
    color: true,
    placeholderSize: 8,
    placeholderQuality: 10,
    placeholderTrimDataUrl: false,
    aspectRatioType: AspectRatioType.HeightByWidth,
    aspectRatioFormat: AspectRatioFormat.Ratio,
    aspectRatioDecimal: 4,
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
