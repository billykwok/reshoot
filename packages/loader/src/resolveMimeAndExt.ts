import path from 'path';
import Webpack from 'webpack';

import Mimes from './mimes';
import Extensions from './extensions';

export default function resolveMimeAndExt(
  loaderContext: Webpack.loader.LoaderContext,
  forceFormat: string | false
): [Mimes, Extensions] {
  let mime: Mimes;
  let ext: Extensions;
  if (forceFormat) {
    if (!(forceFormat in Mimes)) {
      throw new Error('Format "' + forceFormat + '" not supported.');
    }
    mime = Mimes[forceFormat.toUpperCase()];
    ext = Extensions[mime];
  } else {
    ext = path
      .extname(loaderContext.resourcePath)
      .replace(/\./, '') as Extensions;
    mime = Mimes[ext.toUpperCase()];
    if (!mime || Object.values(Extensions).indexOf(ext) < 0) {
      throw new Error('Extension "' + ext + '" not supported.');
    }
  }
  return [mime, ext];
}
