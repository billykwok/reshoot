import { describe, test, expect } from '@jest/globals';
import computeHash from '../../../src/util/hash';
import options from '../../../src/config/defaultOptions';
import { Mime } from '../../../src/type';

describe('hash', () => {
  const devMode = 'development';

  test('should hash null', () => {
    expect(
      computeHash(
        'content123',
        Object.assign({ mode: devMode }, options(devMode), {
          background: null,
          color: null,
          enforceFormat: null,
          aspectRatio: null,
          placeholder: null,
        })
      )
    ).toEqual('a70a2f88e2b89ced');
  });

  test('should change when color changes', () => {
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

  test('should change when enforceFormat changes', () => {
    expect(
      computeHash(
        'content123',
        Object.assign({ mode: devMode }, options(devMode), {
          enforceFormat: null,
        })
      )
    ).not.toEqual(
      computeHash(
        'content123',
        Object.assign({ mode: devMode }, options(devMode), {
          enforceFormat: Mime.JPEG,
        })
      )
    );
  });

  test('should change when mode changes', () => {
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

  test('should change when content changes', () => {
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
