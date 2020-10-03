import { MetroHash64 } from 'metrohash';
import { isDataUrl } from '../util/dataUrl';
import { createStringifiable, stringify } from './stringify';

import type { Result, Stringifiable, ResolvedOptions } from '../type';

const WEBPACK_PUBLIC_PATH_PREFIX = '__webpack_public_path__+';

function transformSrc(
  value: string,
  options: ResolvedOptions
): Stringifiable<string> {
  return createStringifiable(value, () =>
    options.publicPath
      ? JSON.stringify(options.publicPath(value))
      : WEBPACK_PUBLIC_PATH_PREFIX + JSON.stringify(value)
  );
}

function transformPlaceholder(
  value: string,
  options: ResolvedOptions
): Stringifiable<string> | string {
  if (!value) {
    return null;
  }
  return isDataUrl(value)
    ? value
    : createStringifiable(value, () =>
        options.publicPath
          ? JSON.stringify(options.publicPath(value))
          : WEBPACK_PUBLIC_PATH_PREFIX + JSON.stringify(value)
      );
}

function transformSrcSet(
  value: [string, number][],
  options: ResolvedOptions
): Stringifiable<[string, number][]> {
  if (!value.length) {
    return null;
  }
  return createStringifiable(value, () =>
    options.publicPath || !value.length
      ? JSON.stringify(
          value
            .map(([path, width]) => `${options.publicPath(path)} ${width}w`)
            .join(',')
        )
      : value
          .map(
            ([path, width]) => WEBPACK_PUBLIC_PATH_PREFIX + `"${path} ${width}w`
          )
          .join(',"+')
          .concat('"')
  );
}

const ES6_EXPORT = 'export default ';
const COMMON_JS_EXPORT = 'module.exports=';

function render(
  { src, srcSet, placeholder, sources, ...internalOutput }: Result,
  options: ResolvedOptions
): string {
  return (
    (options.esModule ? ES6_EXPORT : COMMON_JS_EXPORT) +
    stringify(
      options.shape({
        id: new MetroHash64()
          .update(src)
          .update(srcSet.map(([path, width]) => `${path}${width}`).join())
          .update(sources.map((source) => source.srcSet).join())
          .digest(),
        src: transformSrc(src, options),
        srcSet: transformSrcSet(srcSet, options),
        placeholder: transformPlaceholder(placeholder, options),
        sources: sources.length
          ? sources.map(({ type, srcSet }) => ({
              type,
              srcSet: transformSrcSet(srcSet, options),
            }))
          : null,
        ...internalOutput,
      })
    ) +
    ';'
  );
}

export default render;
