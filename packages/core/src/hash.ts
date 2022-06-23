import crypto from 'node:crypto';
import { type CoreOptions } from '@reshoot/types';

export function generateHash(content: Buffer, options: CoreOptions): string {
  return crypto
    .createHash('md5')
    .update(JSON.stringify(options))
    .update(content)
    .digest('hex');
}
