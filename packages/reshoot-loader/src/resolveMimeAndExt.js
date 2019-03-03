// @flow
import path from 'path';

import mimes from './mimes';
import extensions from './extensions';

export default function resolveMimeAndExt(
  loaderContext: any,
  forceFormat: string | false
) {
  let mime: string;
  let ext: string;
  if (forceFormat) {
    if (!(forceFormat in mimes)) {
      throw new Error('Format "' + forceFormat + '" not supported.');
    }
    mime = mimes[forceFormat];
    ext = extensions[mime];
  } else {
    ext = path.extname(loaderContext.resourcePath).replace(/\./, '');
    mime = mimes[ext];
    if (!mime) {
      throw new Error('Extension "' + ext + '" not supported.');
    }
  }
  return [mime, ext];
}
