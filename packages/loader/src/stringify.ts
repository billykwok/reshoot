import { OutputShape } from './type';

export default function stringify<T>(shape: OutputShape, object: T): string {
  return `module.exports={${Object.keys(object)
    .filter(key => !(key in shape) || shape[key])
    .map(
      key => `${JSON.stringify(key in shape ? shape[key] : key)}:${object[key]}`
    )
    .join(',')}}`;
}
