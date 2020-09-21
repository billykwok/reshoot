import base64 from './base64';

const PREFIX = 'data:image/jpeg;base64,';

export function createDataUrl(value: Buffer, trimDataUrl = false): string {
  return trimDataUrl ? base64(value) : PREFIX + base64(value);
}

export function isDataUrl(value: string): boolean {
  return /^data:/gi.test(value);
}
