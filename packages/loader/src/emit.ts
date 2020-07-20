import { loader } from 'webpack';
import interpolateName from './interpolateName';

import type { Options } from './type';

async function emit(
  loaderContext: loader.LoaderContext,
  content: string | Buffer,
  hash: string,
  width: number,
  ext: string,
  options: Options,
  resolveOutputPath: (filename: string) => string,
  resolvePublicPath: (filename: string) => string,
  markForCache: (filename: string, content: string | Buffer) => Promise<void>
): Promise<[number, string]> {
  const filename = interpolateName(loaderContext, options.name, {
    hash,
    width,
    ext,
    content,
  });
  const outputPath = resolveOutputPath(filename);

  if (options.emitFile) {
    if (options.cache) {
      await markForCache(filename, content);
    }
    loaderContext.emitFile(outputPath, content, null);
  }

  return [width, options.publicPath ? resolvePublicPath(filename) : outputPath];
}

export default emit;
