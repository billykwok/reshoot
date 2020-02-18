import { loader } from 'webpack';

import { Options } from './type';
import interpolateName from './interpolateName';
import { Saver } from './cache';

function resolvePublicPath(
  outputPath: string,
  filename: string,
  options: { publicPath: string | ((value: string) => string) }
) {
  if (options.publicPath) {
    if (typeof options.publicPath === 'function') {
      return options.publicPath(filename);
    } else if (options.publicPath.endsWith('/')) {
      return options.publicPath + filename;
    } else {
      return `${options.publicPath}/${filename}`;
    }
  }
  return outputPath;
}

function emit(
  loaderContext: loader.LoaderContext,
  context: string,
  content: string | Buffer,
  hash: string,
  width: number,
  ext: string,
  options: Options,
  resolveOutputPath: (filename: string) => string,
  saver: Saver
): string {
  const filename = interpolateName(loaderContext, options.name, {
    hash,
    width,
    ext,
    context,
    content
  });
  const outputPath = resolveOutputPath(filename);
  const publicPath = resolvePublicPath(outputPath, filename, options);

  if (options.emitFile) {
    saver.addFile(outputPath, filename, content);
    loaderContext.emitFile(outputPath, content, null);
  }

  return publicPath;
}

export default emit;
