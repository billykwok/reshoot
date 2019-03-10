// @flow
import type { OutputShape } from './type';

export type OutputArgument = {
  mime?: string,
  src?: string,
  srcSet?: string,
  placeholder?: string,
  aspectRatio?: number,
  color?: string
};

export default function stringify(
  shape: OutputShape,
  object: OutputArgument
): string {
  return `module.exports={${Object.keys(object)
    .filter(key => !(key in shape) || shape[key])
    .map(
      key => `${JSON.stringify(key in shape ? shape[key] : key)}:${object[key]}`
    )
    .join(',')}}`;
}
