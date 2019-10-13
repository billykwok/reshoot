import loaderUtils from 'loader-utils';
import deepmerge from 'deepmerge';

import defaultOptions from './defaultOptions';

import { Options } from './type';

export default function resolveOptions(loaderContext: any): Options {
  const resourceQuery = loaderContext.resourceQuery
    ? loaderUtils.parseQuery(loaderContext.resourceQuery)
    : {};
  return deepmerge.all<Options>([
    defaultOptions,
    loaderUtils.getOptions(loaderContext) || {},
    resourceQuery
  ]);
}
