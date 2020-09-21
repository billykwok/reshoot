import { describe, test, expect } from '@jest/globals';
import resolveColor from '../../../src/util/resolveColor';
import create1x1Image from './create1x1Image';

describe('resolveColor', () => {
  test('should flatten before extracting color if background is defined', async () => {
    const color = await resolveColor(create1x1Image(0, 0, 0), {
      background: '#fff',
    });
    expect(color).toEqual('#080808');
  });

  test('should not flatten before extracting color if background is not defined', async () => {
    const color = await resolveColor(create1x1Image(0, 0, 0), {
      background: null,
    });
    expect(color).toEqual('#080808');
  });
});
