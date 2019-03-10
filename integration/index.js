// @flow
import { matchOutputAsObject } from './matchOutput';

describe('end-to-end test', () => {
  test('basics', () => {
    const expected = {
      keys: ['mime', 'aspectRatio', 'placeholder', 'src', 'srcSet', 'color'],
      extra: { maxWidth: 10 }
    };
    const actual = require('../__fixtures__/test-image.jpg?{"maxWidth":10}');
    matchOutputAsObject(expected, actual);
  });
});
