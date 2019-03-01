// @flow
import type { OutputShape } from './type';

export type OutputArgument = {
  src?: string,
  srcSet?: string,
  placeholder?: string,
  aspectRatio?: number,
  background?: string,
  palette?: Array<string>
};

export default function stringify(
  shape: OutputShape,
  object: OutputArgument
): string {
  return `module.exports={${Object.keys(object)
    .filter(key => key in shape && shape[key])
    .map(key => `${JSON.stringify(shape[key])}:${object[key]}`)
    .join(',')}}`;
}
