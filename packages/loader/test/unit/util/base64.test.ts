import { describe, test, expect } from '@jest/globals';
import base64 from '../../../src/util/base64';

describe('base64', () => {
  test('should convert buffer as JPG without trimming', () => {
    expect(base64(Buffer.from('abcdefg'))).toEqual('YWJjZGVmZw==');
  });
});
