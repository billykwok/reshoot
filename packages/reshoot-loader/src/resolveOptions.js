// @flow
import loaderUtils from 'loader-utils';
import * as deepmerge from 'deepmerge';

import defaultOptions from './defaultOptions';

import type { Options } from './type';

export default function resolveOptions(
  loaderContext: any,
  macroOptions: any
): Options {
  const resourceQuery = loaderContext.resourceQuery
    ? loaderUtils.parseQuery(loaderContext.resourceQuery)
    : {};
  return deepmerge.all([
    defaultOptions,
    loaderUtils.getOptions(loaderContext) || {},
    resourceQuery
  ]);
}
