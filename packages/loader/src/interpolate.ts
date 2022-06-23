import { type LoaderContext } from 'webpack';
import { interpolateName } from 'loader-utils';

import { type LoaderOptions } from './types';

const REGEX = /\[(?:hash|contenthash)(?::hex)?(?::(\d+)?)?\]/gi;

export default function interpolate(
  filename: string,
  hash: string,
  ctx: LoaderContext<LoaderOptions>
): string {
  let name = filename;
  const result = REGEX.exec(name);
  if (result && result.length) {
    name = name.replace(
      REGEX,
      hash.substring(0, Math.min(16, parseInt(result[1] || '16')))
    );
  }
  return interpolateName(ctx, name, {
    context: ctx.rootContext,
    content: null,
  });
}
