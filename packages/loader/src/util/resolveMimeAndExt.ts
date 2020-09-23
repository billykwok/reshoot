import path from 'path';
import { loader } from 'webpack';
import { Mime, Extension } from '../type';

function resolveMimeAndExt(
  ctx: Pick<loader.LoaderContext, 'resourcePath'>,
  defaultFormat: Mime = null
): [Mime, Extension] {
  if (defaultFormat) {
    const ext = Extension[defaultFormat];
    if (!ext) {
      throw new Error(`Format "${defaultFormat}" is not supported.`);
    }
    return [defaultFormat, Extension[defaultFormat]];
  }
  const ext = path.extname(ctx.resourcePath).replace(/\./, '') as Extension;
  const mime = Mime[ext.toUpperCase()] as Mime;
  if (!mime) {
    throw new Error(`Extension "${ext}" is not supported.`);
  }
  return [mime, ext];
}

export default resolveMimeAndExt;
