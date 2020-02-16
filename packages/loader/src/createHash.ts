import { MetroHash128 } from 'metrohash';

import { version } from '../package.json';
import { Options } from './type.js';

function createHash(content: string | Buffer, options: Options) {
  const hasher = new MetroHash128();
  hasher.update(version);
  hasher.update(content);
  hasher.update(JSON.stringify(options));
  return hasher.digest();
}

export default createHash;
