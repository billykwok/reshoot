import { type WebpackOptionsNormalized } from 'webpack';

import { type LoaderOptions } from './types';

export default function defaultPublicPath<
  T extends WebpackOptionsNormalized['output']['publicPath']
>(ctx: {
  _compiler?: { options?: { output?: { publicPath?: T } } };
}): LoaderOptions['publicPath'] {
  const compilerPublicPath = ctx._compiler?.options?.output?.publicPath;
  if (!compilerPublicPath) {
    return '/';
  }
  if (typeof compilerPublicPath === 'function') {
    return (filename: string) => compilerPublicPath({ filename });
  }
  if (compilerPublicPath === 'auto') {
    return '/';
  }
  return compilerPublicPath;
}
