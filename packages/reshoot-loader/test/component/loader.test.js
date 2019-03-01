// @flow
import compiler from './compiler';
import { matchOutputAsString } from '../utils/matchOutput';

describe('loaderTest', () => {
  test('Inserts name and outputs JavaScript', async () => {
    const expected = {
      keys: ['aspectRatio', 'placeholder', 'src', 'srcSet']
    };
    const actual = await compiler('../../../../__fixtures__/test-image.jpg');
    matchOutputAsString(expected, actual);
  });
});
