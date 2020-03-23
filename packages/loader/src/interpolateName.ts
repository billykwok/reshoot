import loaderUtils from 'loader-utils';
import { loader } from 'webpack';

type Options = {
  hash: string;
  width: number;
  ext: string;
  content: string | Buffer;
};

const regex = /\[(?:metrohash(?:64|128)?:)?(?:hash|contenthash)(?::hex)?(?::(\d+))?\]/gi;

function interpolateName(
  loaderContext: loader.LoaderContext,
  name: string,
  { hash, width, ext, content }: Options
): string {
  let filename = name
    .replace(/\[ext\]/gi, ext)
    .replace(/\[width\]/gi, width.toString());
  const result = regex.exec(name);
  if (result && result.length > 0) {
    filename = filename.replace(
      regex,
      hash.substring(0, parseInt(result[1] || '16'))
    );
  }
  return loaderUtils.interpolateName(loaderContext, filename, {
    context: loaderContext.rootContext,
    content,
  });
}

export default interpolateName;
