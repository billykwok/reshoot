import type { InternalOutput, Options } from './type';

function serializeKey(value: string, fallback: string) {
  return JSON.stringify(typeof value === 'string' ? value : fallback);
}

function serializePath(
  value: string,
  staticPublicPath: string | ((path: string) => string)
) {
  return staticPublicPath
    ? JSON.stringify(value)
    : '__webpack_public_path__+' + JSON.stringify(value);
}

function renderScript(
  object: Partial<InternalOutput>,
  options: Options
): string {
  const { shape } = options;
  return `${
    options.esModule ? 'export default ' : 'module.exports='
  }{${Object.keys(object)
    .filter(
      (key: string): boolean =>
        !(key in shape) || (key in shape && !!shape[key])
    )
    .map((key: string) => {
      if (key === 'src' && shape.src) {
        const serializedValue = serializePath(object.src, options.publicPath);
        return `${serializeKey(shape.src, key)}:${serializedValue}`;
      }
      if (key === 'placeholder' && shape.placeholder) {
        const serializedValue = object.placeholder
          ? /^data:/gi.test(object.placeholder)
            ? JSON.stringify(object.placeholder)
            : serializePath(object.placeholder, options.publicPath)
          : JSON.stringify(null);
        return `${serializeKey(shape.placeholder, key)}:${serializedValue}`;
      }
      if (key === 'srcSet' && shape.srcSet) {
        const serializedValue = object.srcSet
          ? object.srcSet
              .map((s) => serializePath(s, options.publicPath))
              .join('+","+')
              .replace(/"\+","/gi, ',"')
              .replace(/"\+"/gi, '')
          : JSON.stringify(null);
        return `${serializeKey(shape.srcSet, key)}:${serializedValue}`;
      }
      return `${serializeKey(shape[key], key)}:${JSON.stringify(object[key])}`;
    })
    .join(',')}}`;
}

export default renderScript;
