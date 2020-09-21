import { describe, test, expect } from '@jest/globals';
import { createDataUrl, isDataUrl } from '../../../src/util/dataUrl';

describe('createDataUrl', () => {
  test('should convert buffer as JPG without trimming', () => {
    expect(createDataUrl(Buffer.from('abcdefg'), false)).toEqual(
      'data:image/jpeg;base64,YWJjZGVmZw=='
    );
  });

  test('should convert buffer as JPG with default trimming', () => {
    expect(createDataUrl(Buffer.from('abcdefg'))).toEqual(
      'data:image/jpeg;base64,YWJjZGVmZw=='
    );
  });

  test('should convert buffer as JPG with trimming', () => {
    expect(createDataUrl(Buffer.from('abcdefg'), true)).toEqual('YWJjZGVmZw==');
  });
});

describe('isDataUrl', () => {
  test('should return true when value is data url', () => {
    expect(isDataUrl('data:image/jpeg;base64,YWJjZGVmZw==')).toBe(true);
  });

  test('should return true when value is data url', () => {
    expect(isDataUrl('YWJjZGVmZw==')).toBe(false);
  });
});
