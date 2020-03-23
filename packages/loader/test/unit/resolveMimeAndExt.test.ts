import { loader } from 'webpack';
import { MacroError } from 'babel-plugin-macros';

import resolveMimeAndExt from '../../src/resolveMimeAndExt';

describe('resolveMimeAndExt', () => {
  test('with valid JPG extension and without forceFormat', () => {
    expect(
      resolveMimeAndExt({
        resourcePath: 'some/path/image.jpg',
      } as loader.LoaderContext)
    ).toEqual(['image/jpeg', 'jpg']);
  });

  test('with valid JPEG extension and without forceFormat', () => {
    expect(
      resolveMimeAndExt({
        resourcePath: 'some/path/image.jpeg',
      } as loader.LoaderContext)
    ).toEqual(['image/jpeg', 'jpeg']);
  });

  test('with valid PNG extension and without forceFormat', () => {
    expect(
      resolveMimeAndExt({
        resourcePath: 'some/path/image.png',
      } as loader.LoaderContext)
    ).toEqual(['image/png', 'png']);
  });

  test('with valid GIF extension and without forceFormat', () => {
    expect(
      resolveMimeAndExt({
        resourcePath: 'some/path/image.gif',
      } as loader.LoaderContext)
    ).toEqual(['image/gif', 'gif']);
  });

  test('with valid WEBP extension and without forceFormat', () => {
    expect(
      resolveMimeAndExt({
        resourcePath: 'some/path/image.webp',
      } as loader.LoaderContext)
    ).toEqual(['image/webp', 'webp']);
  });

  test('with valid SVG extension and without forceFormat', () => {
    expect(
      resolveMimeAndExt({
        resourcePath: 'some/path/image.svg',
      } as loader.LoaderContext)
    ).toEqual(['image/svg+xml', 'svg']);
  });

  test('with valid JPG extension and valid forceFormat', () => {
    expect(
      resolveMimeAndExt(
        { resourcePath: 'some/path/image.jpg' } as loader.LoaderContext,
        'png'
      )
    ).toEqual(['image/png', 'png']);
  });

  test('with invalid extension and without forceFormat', () => {
    expect(() =>
      resolveMimeAndExt({
        resourcePath: 'some/path/image.xyz',
      } as loader.LoaderContext)
    ).toThrow(new MacroError('Extension "xyz" is not supported.'));
  });

  test('with invalid JPG extension and without forceFormat', () => {
    expect(() =>
      resolveMimeAndExt(
        {
          resourcePath: 'some/path/image.jpg',
        } as loader.LoaderContext,
        'tiff'
      )
    ).toThrow(new MacroError('Format "tiff" is not supported.'));
  });
});
