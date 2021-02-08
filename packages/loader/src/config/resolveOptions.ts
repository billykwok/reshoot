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

function isDefinedAndNotEmpty(
  params: Record<string, unknown>,
  key: string
): boolean {
  if (!(key in params)) {
    return false;
  }
  const value = params[key];
  return typeof value !== 'undefined' && value !== null && value !== '';
}

function isDefined(params: Record<string, unknown>, key: string): boolean {
  if (!(key in params)) {
    return false;
  }
  const value = params[key];
  return typeof value !== 'undefined' && value !== null;
}

function resolveOptions(ctx: LoaderContext): ResolvedOptions {
  const defaultOptions = resolveDefaultOptions(ctx.mode);
  const fileOptions = (getOptions(ctx) as Partial<Options>) || {};
  const queryParams = (ctx.resourceQuery
    ? parseQuery(ctx.resourceQuery) || {}
    : {}) as QueryOptions;
  const queryOptions: Partial<Options> = {};
  if (queryParams) {
    if (isDefinedAndNotEmpty(queryParams, 'name')) {
      queryOptions.name = queryParams.name;
    }
    if (isDefinedAndNotEmpty(queryParams, 'fastMode')) {
      queryOptions.fastMode = queryParams.fastMode === 'true';
    }
    if (isDefinedAndNotEmpty(queryParams, 'cache')) {
      queryOptions.cache = queryParams.cache === 'true';
    }
    if (isDefinedAndNotEmpty(queryParams, 'emitFile')) {
      queryOptions.emitFile = queryParams.emitFile === 'true';
    }
    if (isDefinedAndNotEmpty(queryParams, 'esModule')) {
      queryOptions.esModule = queryParams.esModule === 'true';
    }
    if (isDefined(queryParams, 'quality')) {
      queryOptions.quality =
        queryParams.quality === '' ? null : parseInt(queryParams.quality);
    }
    if (isDefinedAndNotEmpty(queryParams, 'alternativeFormats')) {
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
    if (isDefinedAndNotEmpty(queryParams, 'defaultFormat')) {
      queryOptions.defaultFormat = queryParams.defaultFormat;
    }
    if (isDefinedAndNotEmpty(queryParams, 'defaultWidth')) {
      queryOptions.defaultWidth = parseInt(queryParams.defaultWidth);
    }
    if (isDefined(queryParams, 'background')) {
      queryOptions.background =
        queryParams.background === '' ? null : queryParams.background;
    }
    if (isDefinedAndNotEmpty(queryParams, 'color')) {
      if (queryParams.color === 'true') {
        queryOptions.color = true;
      } else if (queryParams.color === 'false') {
        queryOptions.color = false;
      } else if (queryParams.color === '') {
        queryOptions.color = null;
      } else {
        queryOptions.color = queryParams.color;
      }
    }
    if (isDefinedAndNotEmpty(queryParams, 'placeholderSize')) {
      queryOptions.placeholderSize = parseInt(queryParams.placeholderSize);
    }
    if (isDefinedAndNotEmpty(queryParams, 'placeholderQuality')) {
      queryOptions.placeholderQuality = parseInt(
        queryParams.placeholderQuality
      );
    }
    if (isDefinedAndNotEmpty(queryParams, 'placeholderTrimDataUrl')) {
      queryOptions.placeholderTrimDataUrl =
        queryParams.placeholderTrimDataUrl === 'true';
    }
    if (isDefinedAndNotEmpty(queryParams, 'aspectRatioType')) {
      queryOptions.aspectRatioType = queryParams.aspectRatioType;
    }
    if (isDefinedAndNotEmpty(queryParams, 'aspectRatioFormat')) {
      queryOptions.aspectRatioFormat = queryParams.aspectRatioFormat;
    }
    if (isDefinedAndNotEmpty(queryParams, 'aspectRatioDecimal')) {
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
