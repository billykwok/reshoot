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

function isDefined(params: Record<string, unknown>, key: string): boolean {
  if (!(key in params)) {
    return false;
  }
  const value = params[key];
  return typeof value !== 'undefined' && value !== null && value !== '';
}

function resolveOptions(ctx: LoaderContext): ResolvedOptions {
  const defaultOptions = resolveDefaultOptions(ctx.mode);
  const fileOptions = (getOptions(ctx) as Partial<Options>) || {};
  const queryParams = (ctx.resourceQuery
    ? parseQuery(ctx.resourceQuery) || {}
    : {}) as QueryOptions;
  const queryOptions: Partial<Options> = {};
  if (queryParams) {
    if (isDefined(queryParams, 'name')) {
      queryOptions.name = queryParams.name;
    }
    if (isDefined(queryParams, 'fastMode')) {
      queryOptions.fastMode = queryParams.fastMode === 'true';
    }
    if (isDefined(queryParams, 'cache')) {
      queryOptions.cache = queryParams.cache === 'true';
    }
    if (isDefined(queryParams, 'emitFile')) {
      queryOptions.emitFile = queryParams.emitFile === 'true';
    }
    if (isDefined(queryParams, 'esModule')) {
      queryOptions.esModule = queryParams.esModule === 'true';
    }
    if (isDefined(queryParams, 'quality')) {
      queryOptions.quality = parseInt(queryParams.quality);
    }
    if (isDefined(queryParams, 'alternativeFormats')) {
      queryOptions.alternativeFormats = queryParams.alternativeFormats;
    }
    if (
      isDefined(queryParams, 'alternativeWidths') &&
      Array.isArray(queryParams.alternativeWidths)
    ) {
      queryOptions.alternativeWidths = queryParams.alternativeWidths.map((w) =>
        parseInt(w)
      );
    }
    if (isDefined(queryParams, 'defaultFormat')) {
      queryOptions.defaultFormat = queryParams.defaultFormat;
    }
    if (isDefined(queryParams, 'defaultWidth')) {
      queryOptions.defaultWidth = parseInt(queryParams.defaultWidth);
    }
    if (isDefined(queryParams, 'background')) {
      queryOptions.background = queryParams.background;
    }
    if (isDefined(queryParams, 'color')) {
      if (queryParams.color.startsWith('#')) {
        queryOptions.color = queryParams.color;
      } else {
        queryOptions.color = queryParams.color === 'true';
      }
    }
    if (isDefined(queryParams, 'placeholderSize')) {
      queryOptions.placeholderSize = parseInt(queryParams.placeholderSize);
    }
    if (isDefined(queryParams, 'placeholderQuality')) {
      queryOptions.placeholderQuality = parseInt(
        queryParams.placeholderQuality
      );
    }
    if (isDefined(queryParams, 'placeholderTrimDataUrl')) {
      queryOptions.placeholderTrimDataUrl =
        queryParams.placeholderTrimDataUrl === 'true';
    }
    if (isDefined(queryParams, 'aspectRatioType')) {
      queryOptions.aspectRatioType = queryParams.aspectRatioType;
    }
    if (isDefined(queryParams, 'aspectRatioFormat')) {
      queryOptions.aspectRatioFormat = queryParams.aspectRatioFormat;
    }
    if (isDefined(queryParams, 'aspectRatioDecimal')) {
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
