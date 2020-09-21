import { isDataUrl } from '../util/dataUrl';
import { createStringifiable, stringify } from './stringify';

import type { Result, Options, Stringifiable } from '../type';

const WEBPACK_PUBLIC_PATH_PREFIX = '__webpack_public_path__+';

function transformSrc(value: string): Stringifiable<string> {
  return createStringifiable(
    value,
    () => WEBPACK_PUBLIC_PATH_PREFIX + JSON.stringify(value)
  );
}

function transformPlaceholder(value: string): Stringifiable<string> | string {
  if (!value) {
    return JSON.stringify(null);
  }
  return isDataUrl(value)
    ? value
    : createStringifiable(
        value,
        () => WEBPACK_PUBLIC_PATH_PREFIX + JSON.stringify(value)
      );
}

const SRCSET_DELIMITER = ',"+';
const SRCSET_SUFFIX = '"';
const SRCSET_EMPTY = '""';

function transformSrcSet(value: [string, number][]): Stringifiable<string[]> {
  const srcSet = value.map(([path, width]) => `${path} ${width}w`);
  return createStringifiable(srcSet, () =>
    srcSet.length
      ? srcSet
          .map((it) => WEBPACK_PUBLIC_PATH_PREFIX + SRCSET_SUFFIX + it)
          .join(SRCSET_DELIMITER)
          .concat(SRCSET_SUFFIX)
      : SRCSET_EMPTY
  );
}

const ES6_EXPORT = 'export default ';
const COMMON_JS_EXPORT = 'module.exports=';

function render(
  { src, srcSet, placeholder, sources, ...internalOutput }: Result,
  options: Options
): string {
  return (
    (options.esModule ? ES6_EXPORT : COMMON_JS_EXPORT) +
    stringify(
      options.shape({
        src: transformSrc(src),
        srcSet: transformSrcSet(srcSet),
        placeholder: transformPlaceholder(placeholder),
        sources: sources.map(({ type, src, srcSet }) => ({
          type,
          src: transformSrc(src),
          srcSet: transformSrcSet(srcSet),
        })),
        ...internalOutput,
      })
    ) +
    ';'
  );
}

export default render;
