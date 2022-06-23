import { describe, expect, test } from '@jest/globals';

import { AspectRatioFormat, AspectRatioType } from '../src';

describe('Enum has correct value', () => {
  test('AspectRatioFormat', () => {
    expect(AspectRatioFormat.Percent).toBe('percent');
    expect(AspectRatioFormat.Ratio).toBe('ratio');
  });

  test('AspectRatioType', () => {
    expect(AspectRatioType.WidthByHeight).toBe('widthByHeight');
    expect(AspectRatioType.HeightByWidth).toBe('heightByWidth');
  });
});
