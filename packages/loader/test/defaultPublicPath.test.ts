import path from 'node:path/win32';
import { PathData } from 'webpack';
import { describe, expect, test } from '@jest/globals';

import defaultPublicPath from '../src/defaultPublicPath';

describe('defaultPublicPath', () => {
  test('should return correct default public path 1', () => {
    expect(
      defaultPublicPath({
        _compiler: { options: { output: { publicPath: 'auto' } } },
      })
    ).toEqual('/');
  });

  test('should return correct default public path 2', () => {
    expect(
      defaultPublicPath({
        _compiler: { options: { output: { publicPath: '/static/' } } },
      })
    ).toEqual('/static/');
  });

  test('should return correct default public path 3', () => {
    expect(
      (
        defaultPublicPath({
          _compiler: {
            options: {
              output: {
                publicPath: ({ filename }: PathData) =>
                  path.join('/static/', filename),
              },
            },
          },
        }) as (filename: string) => string
      )('image.png')
    ).toEqual('\\static\\image.png');
  });

  test('should return correct default public path 4', () => {
    expect(
      defaultPublicPath({ _compiler: { options: { output: {} } } })
    ).toEqual('/');
  });

  test('should return correct default public path 5', () => {
    expect(defaultPublicPath({ _compiler: { options: {} } })).toEqual('/');
  });

  test('should return correct default public path 6', () => {
    expect(defaultPublicPath({ _compiler: {} })).toEqual('/');
  });

  test('should return correct default public path 7', () => {
    expect(defaultPublicPath({})).toEqual('/');
  });
});
