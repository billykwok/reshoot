// @flow
import compiler from './compiler';
import { matchOutputAsString } from '../utils/matchOutput';

describe('loaderTest', () => {
  test('Inserts name and outputs JavaScript', async () => {
    const expected = {
      keys: ['mime', 'aspectRatio', 'placeholder', 'src', 'srcSet', 'color']
    };
    const actual = await compiler('../../../../__fixtures__/test-image.jpg');
    matchOutputAsString(expected, actual);
  });
});
