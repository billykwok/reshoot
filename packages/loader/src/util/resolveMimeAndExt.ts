import path from 'path';
import { loader } from 'webpack';
import { Mime, Extension } from '../type';

function resolveMimeAndExt(
  ctx: Pick<loader.LoaderContext, 'resourcePath'>,
  enforceFormat: Mime = null
): [Mime, Extension] {
  if (enforceFormat) {
    const ext = Extension[enforceFormat];
    if (!ext) {
      throw new Error(`Format "${enforceFormat}" is not supported.`);
    }
    return [enforceFormat, Extension[enforceFormat]];
  }
  const ext = path.extname(ctx.resourcePath).replace(/\./, '') as Extension;
  const mime = Mime[ext.toUpperCase()] as Mime;
  if (!mime) {
    throw new Error(`Extension "${ext}" is not supported.`);
  }
  return [mime, ext];
}

export default resolveMimeAndExt;
