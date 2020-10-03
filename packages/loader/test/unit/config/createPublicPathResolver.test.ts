import { describe, test, expect } from '@jest/globals';
import createPublicPathResolver from '../../../src/config/createPublicPathResolver';

describe('createPublicPathResolver', () => {
  test('should create function for string', () => {
    const resolvePublicPath = createPublicPathResolver('/public/');
    expect(resolvePublicPath).toBeInstanceOf(Function);
    expect(resolvePublicPath('file.ext')).toEqual('/public/file.ext');
  });

  test('should function as-is', () => {
    const fn = () => null;
    const resolvePublicPath = createPublicPathResolver(fn);
    expect(resolvePublicPath).toEqual(fn);
  });
});
