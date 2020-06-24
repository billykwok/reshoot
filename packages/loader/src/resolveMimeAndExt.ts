import path from 'path';
import { loader } from 'webpack';

import Mimes from './mimes';
import Extensions from './extensions';

function resolveMimeAndExt(
  loaderContext: loader.LoaderContext,
  forceFormat: string | false = false
): [Mimes, Extensions] {
  let mime: Mimes;
  let ext: Extensions;
  if (forceFormat) {
    if (!(forceFormat.toUpperCase() in Mimes)) {
      throw new Error(`Format "${forceFormat}" is not supported.`);
    }
    mime = Mimes[forceFormat.toUpperCase()] as Mimes;
    ext = Extensions[mime];
  } else {
    ext = path
      .extname(loaderContext.resourcePath)
      .replace(/\./, '') as Extensions;
    mime = Mimes[ext.toUpperCase()] as Mimes;
    if (!mime) {
      throw new Error(`Extension "${ext}" is not supported.`);
    }
  }
  return [mime, ext];
}

export default resolveMimeAndExt;
