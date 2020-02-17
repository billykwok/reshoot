import { MetroHash128 } from 'metrohash';

import { version } from '../package.json';
import { Options } from './type.js';

function excludeNonCacheDeterminingOptions({
  /* eslint-disable @typescript-eslint/no-unused-vars */
  outputPath,
  emitFile,
  /* eslint-enable @typescript-eslint/no-unused-vars */
  ...options
}: Options) {
  return options;
}

function createHash(content: string | Buffer, options: Options) {
  const hasher = new MetroHash128();
  hasher.update(version);
  hasher.update(content);
  hasher.update(JSON.stringify(excludeNonCacheDeterminingOptions(options)));
  return hasher.digest();
}

export default createHash;
