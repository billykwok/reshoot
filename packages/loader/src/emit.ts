import { loader } from 'webpack';

import { Options } from './type';
import interpolateName from './interpolateName';
import { Saver } from './cache';

function emit(
  loaderContext: loader.LoaderContext,
  content: string | Buffer,
  hash: string,
  width: number,
  ext: string,
  options: Options,
  resolveOutputPath: (filename: string) => string,
  resolvePublicPath: (filename: string) => string,
  saver: Saver
): string {
  const filename = interpolateName(loaderContext, options.name, {
    hash,
    width,
    ext,
    content
  });
  const outputPath = resolveOutputPath(filename);

  if (options.emitFile) {
    saver.addFile(outputPath, filename, content);
    loaderContext.emitFile(outputPath, content, null);
  }

  return options.publicPath ? resolvePublicPath(filename) : outputPath;
}

export default emit;
