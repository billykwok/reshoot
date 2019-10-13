import loaderUtils from 'loader-utils';
import path from 'path';

import { Options } from './type';

export default function createFile(
  loaderContext: any,
  context: any,
  content: any,
  width: number,
  ext: string,
  options: Options
): string {
  const filename = loaderUtils.interpolateName(
    loaderContext,
    options.name
      .replace(/\[ext\]/gi, ext)
      .replace(/\[width\]/gi, width.toString()),
    { context, content }
  );
  let outputPath: string = filename;

  if (options.outputPath) {
    if (typeof options.outputPath === 'function') {
      outputPath = options.outputPath(filename);
    } else {
      outputPath = path.posix.join(options.outputPath, filename);
    }
  }

  let publicPath: string = outputPath;

  if (options.publicPath) {
    if (typeof options.publicPath === 'function') {
      publicPath = options.publicPath(filename);
    } else if (options.publicPath.endsWith('/')) {
      publicPath = options.publicPath + filename;
    } else {
      publicPath = `${options.publicPath}/${filename}`;
    }
  }

  if (options.emitFile) {
    loaderContext.emitFile(outputPath, content);
  }

  return publicPath;
}
