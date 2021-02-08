import { interpolateName } from 'loader-utils';

import type { LoaderContext } from '../type';

const regex = /\[(?:metrohash(?:64|128)?:)?(?:hash|contenthash)(?::hex)?(?::(\d+))?\]/gi;

function interpolate(
  ctx: LoaderContext,
  name: string,
  { hash, width, ext }: { hash: string; width: number; ext: string }
): string {
  let filename = name
    .replace(/\[ext\]/gi, ext)
    .replace(/\[width\]/gi, width.toString());
  const result = regex.exec(name);
  if (result && result.length) {
    filename = filename.replace(
      regex,
      hash.substring(0, Math.min(16, parseInt(result[1] || '16')))
    );
  }
  return interpolateName(ctx, filename, {
    context: ctx.rootContext,
    content: null,
  });
}

export default interpolate;
