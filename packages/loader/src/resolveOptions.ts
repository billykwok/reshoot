import { parseQuery, getOptions } from 'loader-utils';
import deepmerge from 'deepmerge';
import { loader } from 'webpack';

import defaultOptions from './defaultOptions';

import { Options } from './type';

function resolveOptions(loaderContext: loader.LoaderContext): Options {
  const resourceQuery = loaderContext.resourceQuery
    ? parseQuery(loaderContext.resourceQuery)
    : {};
  return deepmerge.all<Options>([
    defaultOptions,
    getOptions(loaderContext) || {},
    resourceQuery
  ]);
}

export default resolveOptions;
