import { OutputShape, InternalOutput } from './type';

function serializeKey(value: string) {
  return /^[a-zA-Z][a-zA-Z0-9]*$/gi.test(value) ? value : JSON.stringify(value);
}

function serializePath(value: string) {
  return '__webpack_public_path__+' + JSON.stringify(value);
}

function toScriptString(
  shape: OutputShape,
  object: Partial<InternalOutput>
): string {
  return `module.exports={${Object.keys(object)
    .filter(key => !(key in shape) || shape[key])
    .map(key => {
      if (!(key in shape)) {
        return `${serializeKey(key)}:${JSON.stringify(object[key])}`;
      }
      if (key === 'src' && shape.src) {
        const serializedValue = serializePath(object.src);
        return `${serializeKey(shape.src)}:${serializedValue}`;
      }
      if (key === 'placeholder' && shape.placeholder) {
        const serializedValue = object.placeholder.startsWith('data:')
          ? JSON.stringify(object.placeholder)
          : serializePath(object.placeholder);
        return `${serializeKey(shape.placeholder)}:${serializedValue}`;
      }
      if (key === 'srcSet' && shape.srcSet) {
        const serializedValue = object.srcSet
          .map(serializePath)
          .join('+","+')
          .replace(/"\+","/gi, ',"');
        return `${serializeKey(shape.srcSet)}:${serializedValue}`;
      }
      return `${serializeKey(shape[key])}:${JSON.stringify(object[key])}`;
    })
    .join(',')}}`;
}

export default toScriptString;
