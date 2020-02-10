import { loader } from 'webpack';
import { parseQuery, getOptions, OptionObject } from 'loader-utils';

import resolveOptions from '../../src/resolveOptions';
import defaultOptions from '../../src/defaultOptions';

jest.mock('loader-utils');
(parseQuery as jest.Mock<OptionObject>).mockReturnValue({ foo: 'baz' });
(getOptions as jest.Mock<OptionObject>).mockReturnValue({ hello: 'world' });

describe('resolveOptions', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  test('with config in both', () => {
    expect(
      resolveOptions({ resourceQuery: '?foo=baz' } as loader.LoaderContext)
    ).toEqual({ ...defaultOptions, foo: 'baz', hello: 'world' });
  });

  test('with config in file', () => {
    expect(
      resolveOptions({ resourceQuery: null } as loader.LoaderContext)
    ).toEqual({ ...defaultOptions, hello: 'world' });
  });

  test('with config in query string', () => {
    (getOptions as jest.Mock<OptionObject>).mockReturnValue(null);
    expect(
      resolveOptions({ resourceQuery: '?foo=baz' } as loader.LoaderContext)
    ).toEqual({ ...defaultOptions, foo: 'baz' });
  });
});
