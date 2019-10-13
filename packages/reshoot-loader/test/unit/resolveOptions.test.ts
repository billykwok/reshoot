import resolveOptions from '../../src/resolveOptions';
import defaultOptions from '../../src/defaultOptions';

describe('resolveOptions', () => {
  test('with config in file', () => {
    expect(
      resolveOptions({ resourceQuery: null, query: { foo: 'bar' } })
    ).toEqual({ ...defaultOptions, foo: 'bar' });
  });

  test('with config in query string', () => {
    expect(
      resolveOptions({ resourceQuery: '?foo=baz', query: { foo: 'bar' } })
    ).toEqual({ ...defaultOptions, foo: 'baz' });
  });
});
