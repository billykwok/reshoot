import { parseQuery, getOptions } from 'loader-utils';
import resolveDefaultOptions from './defaultOptions';
import createPublicPathResolver from './createPublicPathResolver';
import createOutputPathResolver from './createOutputPathResolver';

import type {
  LoaderContext,
  Options,
  QueryOptions,
  ResolvedOptions,
} from '../type';

function resolveOptions(ctx: LoaderContext): ResolvedOptions {
  const defaultOptions = resolveDefaultOptions(ctx.mode);
  const fileOptions = (getOptions(ctx) as Partial<Options>) || {};
  const queryParams = (ctx.resourceQuery
    ? parseQuery(ctx.resourceQuery) || {}
    : {}) as QueryOptions;
  const queryOptions: Partial<Options> = {};
  if (queryParams) {
    if ('name' in queryParams && queryParams.name !== null) {
      queryOptions.name = queryParams.name;
    }
    if ('fastMode' in queryParams && queryParams.fastMode !== null) {
      queryOptions.fastMode = queryParams.fastMode === 'true';
    }
    if ('cache' in queryParams && queryParams.cache !== null) {
      queryOptions.cache = queryParams.cache === 'true';
    }
    if ('emitFile' in queryParams && queryParams.emitFile !== null) {
      queryOptions.emitFile = queryParams.emitFile === 'true';
    }
    if ('esModule' in queryParams && queryParams.esModule !== null) {
      queryOptions.esModule = queryParams.esModule === 'true';
    }
    if ('quality' in queryParams && queryParams.quality !== null) {
      queryOptions.quality = parseInt(queryParams.quality);
    }
    if (
      'alternativeFormats' in queryParams &&
      queryParams.alternativeFormats !== null
    ) {
      queryOptions.alternativeFormats = queryParams.alternativeFormats;
    }
    if (
      'alternativeWidths' in queryParams &&
      queryParams.alternativeWidths !== null
    ) {
      queryOptions.alternativeWidths = queryParams.alternativeWidths.map((w) =>
        parseInt(w)
      );
    }
    if ('defaultFormat' in queryParams && queryParams.defaultFormat !== null) {
      queryOptions.defaultFormat = queryParams.defaultFormat;
    }
    if ('defaultWidth' in queryParams && queryParams.defaultWidth !== null) {
      queryOptions.defaultWidth = parseInt(queryParams.defaultWidth);
    }
    if ('background' in queryParams && queryParams.background !== null) {
      queryOptions.background = queryParams.background;
    }
    if ('color' in queryParams && queryParams.color !== null) {
      if (queryParams.color.startsWith('#')) {
        queryOptions.color = queryParams.color;
      } else {
        queryOptions.color = queryParams.color === 'true';
      }
    }
    if (
      'placeholderSize' in queryParams &&
      queryParams.placeholderSize !== null
    ) {
      queryOptions.placeholderSize = parseInt(queryParams.placeholderSize);
    }
    if (
      'placeholderQuality' in queryParams &&
      queryParams.placeholderQuality !== null
    ) {
      queryOptions.placeholderQuality = parseInt(
        queryParams.placeholderQuality
      );
    }
    if (
      'placeholderTrimDataUrl' in queryParams &&
      queryParams.placeholderTrimDataUrl !== null
    ) {
      queryOptions.placeholderTrimDataUrl =
        queryParams.placeholderTrimDataUrl === 'true';
    }
    if (
      'aspectRatioType' in queryParams &&
      queryParams.aspectRatioType !== null
    ) {
      queryOptions.aspectRatioType = queryParams.aspectRatioType;
    }
    if (
      'aspectRatioFormat' in queryParams &&
      queryParams.aspectRatioFormat !== null
    ) {
      queryOptions.aspectRatioFormat = queryParams.aspectRatioFormat;
    }
    if (
      'aspectRatioDecimal' in queryParams &&
      queryParams.aspectRatioDecimal !== null
    ) {
      queryOptions.aspectRatioDecimal = parseInt(
        queryParams.aspectRatioDecimal
      );
    }
  }
  const options = Object.assign({}, defaultOptions, fileOptions, queryOptions);
  const outputPath = createOutputPathResolver(options.outputPath);
  return Object.assign({ mode: ctx.mode }, options, {
    outputPath,
    publicPath: createPublicPathResolver(options.publicPath),
  });
}

export default resolveOptions;
