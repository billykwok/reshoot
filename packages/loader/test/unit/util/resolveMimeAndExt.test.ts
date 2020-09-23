import { describe, test, expect } from '@jest/globals';
import resolveMimeAndExt from '../../../src/util/resolveMimeAndExt';
import { Extension, Mime } from '../../../src/type';

describe('resolveMimeAndExt', () => {
  test('should return mime and ext with valid JPG extension and without defaultFormat', () => {
    expect(resolveMimeAndExt({ resourcePath: 'some/path/image.jpg' })).toEqual([
      Mime.JPEG,
      Extension[Mime.JPEG],
    ]);
  });

  test('should return mime and ext with valid JPEG extension and without defaultFormat', () => {
    expect(
      resolveMimeAndExt({ resourcePath: 'some/path/image.jpeg' })
    ).toEqual([Mime.JPEG, 'jpeg']);
  });

  test('should return mime and ext with valid PNG extension and without defaultFormat', () => {
    expect(resolveMimeAndExt({ resourcePath: 'some/path/image.png' })).toEqual([
      Mime.PNG,
      Extension[Mime.PNG],
    ]);
  });

  test('should return mime and ext with valid GIF extension and without defaultFormat', () => {
    expect(resolveMimeAndExt({ resourcePath: 'some/path/image.gif' })).toEqual([
      Mime.GIF,
      Extension[Mime.GIF],
    ]);
  });

  test('should return mime and ext with valid WEBP extension and without defaultFormat', () => {
    expect(
      resolveMimeAndExt({ resourcePath: 'some/path/image.webp' })
    ).toEqual([Mime.WEBP, Extension[Mime.WEBP]]);
  });

  test('should return mime and ext with valid SVG extension and without defaultFormat', () => {
    expect(resolveMimeAndExt({ resourcePath: 'some/path/image.svg' })).toEqual([
      Mime.SVG,
      Extension[Mime.SVG],
    ]);
  });

  test('should return mime and ext with valid JPG extension and valid defaultFormat', () => {
    expect(
      resolveMimeAndExt({ resourcePath: 'some/path/image.jpg' }, Mime.PNG)
    ).toEqual([Mime.PNG, Extension[Mime.PNG]]);
  });

  test('should return mime and ext with invalid extension and without defaultFormat', () => {
    expect(() =>
      resolveMimeAndExt({ resourcePath: 'some/path/image.xyz' })
    ).toThrow(new Error('Extension "xyz" is not supported.'));
  });

  test('should return mime and ext with invalid JPG extension and without defaultFormat', () => {
    expect(() =>
      resolveMimeAndExt({ resourcePath: 'some/path/image.jpg' }, 'tiff' as Mime)
    ).toThrow(new Error('Format "tiff" is not supported.'));
  });
});
