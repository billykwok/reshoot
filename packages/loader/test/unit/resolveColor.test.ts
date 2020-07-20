import { describe, test, expect } from '@jest/globals';
import resolveColor from '../../src/resolveColor';

import type {
  SharpImage,
  ResizeOptions,
  ResizeResult,
} from '../../src/createSharp';

describe('resolveColor', () => {
  const image: SharpImage = {
    metadata: jest.fn(() => Promise.resolve(null)),
    content: jest.fn(() => Promise.resolve(null)),
    color: jest.fn(() => Promise.resolve('#FFF')),
    resize: jest.fn((() => Promise.resolve(null)) as (
      width: number,
      mime: string,
      options: ResizeOptions
    ) => Promise<ResizeResult>),
    close: () => null,
  };

  test('should return color if defined', async () => {
    expect(await resolveColor(image, '#555', false)).toEqual('#555');
  });

  test("should return 'transparent' if disabled", async () => {
    expect(await resolveColor(image, null, true)).toEqual('transparent');
  });

  test('should call image.color() if not disabled but color is not defined', async () => {
    expect(await resolveColor(image, null, false)).toEqual('#FFF');
  });
});
