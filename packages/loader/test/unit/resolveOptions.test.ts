import { loader } from 'webpack';
import { parseQuery, getOptions } from 'loader-utils';
import type { OptionObject } from 'loader-utils';

import resolveOptions from '../../src/resolveOptions';
import resolveDefaultOptions from '../../src/defaultOptions';

jest.mock('loader-utils');
(parseQuery as jest.Mock<OptionObject>).mockReturnValue({ foo: 'baz' });
(getOptions as jest.Mock<OptionObject>).mockReturnValue({ hello: 'world' });

describe('resolveOptions', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  test('with config in both', () => {
    const defaultOptions = resolveDefaultOptions('development');
    expect(
      resolveOptions(
        { resourceQuery: '?foo=baz' } as loader.LoaderContext,
        defaultOptions
      )
    ).toEqual({ ...defaultOptions, foo: 'baz', hello: 'world' });
  });

  test('with config in file', () => {
    const defaultOptions = resolveDefaultOptions('development');
    expect(
      resolveOptions(
        { resourceQuery: null } as loader.LoaderContext,
        defaultOptions
      )
    ).toEqual({ ...defaultOptions, hello: 'world' });
  });

  test('with config in query string', () => {
    const defaultOptions = resolveDefaultOptions('development');
    (getOptions as jest.Mock<OptionObject>).mockReturnValue(null);
    expect(
      resolveOptions(
        { resourceQuery: '?foo=baz' } as loader.LoaderContext,
        defaultOptions
      )
    ).toEqual({ ...defaultOptions, foo: 'baz' });
  });
});
