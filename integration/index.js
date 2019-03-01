// @flow
import { matchOutputAsObject } from './matchOutput';

describe('end-to-end test', () => {
  test('basics', () => {
    const expected = { keys: ['aspectRatio', 'placeholder', 'src', 'srcSet'] };
    const actual = require('../__fixtures__/test-image.jpg');
    matchOutputAsObject(expected, actual);
  });
});
