import { parseQuery, getOptions } from 'loader-utils';
import resolveDefaultOptions from './defaultOptions';
import createPublicPathResolver from './createPublicPathResolver';
import createOutputPathResolver from './createOutputPathResolver';

import type { LoaderContext, Options, ResolvedOptions } from '../type';

function resolveOptions(ctx: LoaderContext): ResolvedOptions {
  const defaultOptions = resolveDefaultOptions(ctx.mode);
  const fileOptions = (getOptions(ctx) as Partial<Options>) || {};
  const queryOptions = (ctx.resourceQuery
    ? parseQuery(ctx.resourceQuery) || {}
    : {}) as Partial<Options>;
  const options = Object.assign({}, defaultOptions, fileOptions, queryOptions);
  const outputPath = createOutputPathResolver(options.outputPath);
  return Object.assign({ mode: ctx.mode }, options, {
    outputPath,
    publicPath: createPublicPathResolver(options.publicPath),
  });
}

export default resolveOptions;
