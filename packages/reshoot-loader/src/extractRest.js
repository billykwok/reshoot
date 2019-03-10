// @flow
import defaultOptions from './defaultOptions';

const supportedKeys = Object.keys(defaultOptions);

export default function extractRest(options: any) {
  return Object.entries(options)
    .filter(entry => supportedKeys.indexOf(entry[0]) < 0)
    .reduce((acc, cur) => {
      acc[cur[0]] = JSON.stringify(cur[1]);
      return acc;
    }, {});
}
