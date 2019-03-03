// @flow
import defaultOptions from './defaultOptions';

export default function extractRest(options: any) {
  const supportedKeys = Object.keys(defaultOptions);
  return Object.entries(options)
    .filter(entry => supportedKeys.indexOf(entry[0]) < 0)
    .reduce((acc, cur) => {
      acc[cur[0]] = cur[1];
      return acc;
    }, {});
}
