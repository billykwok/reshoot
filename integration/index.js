// @flow
import { matchOutputAsObject } from './matchOutput';

describe('end-to-end test', () => {
  test('basics', () => {
    const expected = {
      keys: ['mime', 'aspectRatio', 'placeholder', 'src', 'srcSet', 'color']
    };
    const actual = require('../__fixtures__/test-image.jpg');
    matchOutputAsObject(expected, actual);
  });
});
