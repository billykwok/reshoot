import { describe, beforeAll, test, expect } from '@jest/globals';
import options from '../../../src/config/defaultOptions';
import { Mime } from '../../../src/type';

describe('hash', () => {
  const devMode = 'development';

  beforeAll(() => {
    jest.doMock('../../../package.json', () => ({
      __esModule: true,
      version: '1.1.1',
    }));
  });

  test('should hash null', async () => {
    const { default: computeHash } = await import('../../../src/util/hash');
    expect(
      computeHash(
        'content123',
        Object.assign({ mode: devMode }, options(devMode), {
          background: null,
          color: null,
          defaultFormat: null,
          aspectRatio: null,
          placeholder: null,
        })
      )
    ).toEqual('9ff1ba7af8921944');
  });

  test('should change when color changes', async () => {
    const { default: computeHash } = await import('../../../src/util/hash');
    expect(
      computeHash(
        'content123',
        Object.assign({ mode: devMode }, options(devMode), { color: null })
      )
    ).not.toEqual(
      computeHash(
        'content123',
        Object.assign({ mode: devMode }, options(devMode), { color: '#fff' })
      )
    );
  });

  test('should change when defaultFormat changes', async () => {
    const { default: computeHash } = await import('../../../src/util/hash');
    expect(
      computeHash(
        'content123',
        Object.assign({ mode: devMode }, options(devMode), {
          defaultFormat: null,
        })
      )
    ).not.toEqual(
      computeHash(
        'content123',
        Object.assign({ mode: devMode }, options(devMode), {
          defaultFormat: Mime.JPEG,
        })
      )
    );
  });

  test('should change when mode changes', async () => {
    const { default: computeHash } = await import('../../../src/util/hash');
    const prodMode = 'production';
    expect(
      computeHash(
        'content123',
        Object.assign({ mode: devMode }, options(devMode))
      )
    ).not.toEqual(
      computeHash(
        'content123',
        Object.assign({ mode: prodMode }, options(prodMode))
      )
    );
  });

  test('should change when content changes', async () => {
    const { default: computeHash } = await import('../../../src/util/hash');
    expect(
      computeHash(
        'content123',
        Object.assign({ mode: devMode }, options(devMode))
      )
    ).not.toEqual(
      computeHash(
        'content124',
        Object.assign({ mode: devMode }, options(devMode))
      )
    );
  });
});
