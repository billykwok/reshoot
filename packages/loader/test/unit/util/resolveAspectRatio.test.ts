import { describe, test, expect } from '@jest/globals';
import resolveAspectRatio from '../../../src/util/resolveAspectRatio';
import { AspectRatioFormat, AspectRatioType } from '../../../src/type';

describe('resolveAspectRatio', () => {
  test('convert to integer whenever possible', () => {
    expect(
      resolveAspectRatio(
        { width: 5, height: 5 },
        {
          aspectRatioDecimal: 10,
          aspectRatioFormat: AspectRatioFormat.Ratio,
          aspectRatioType: AspectRatioType.WidthByHeight,
        }
      )
    ).toEqual(1);
  });

  test('convert to width-by-height percentage in 2 d.p.', () => {
    expect(
      resolveAspectRatio(
        { width: 3, height: 2 },
        {
          aspectRatioDecimal: 2,
          aspectRatioFormat: AspectRatioFormat.Percent,
          aspectRatioType: AspectRatioType.WidthByHeight,
        }
      )
    ).toEqual(150);
  });

  test('convert to height-by-width percentage in 2 d.p.', () => {
    expect(
      resolveAspectRatio(
        { width: 3, height: 2 },
        {
          aspectRatioDecimal: 2,
          aspectRatioFormat: AspectRatioFormat.Percent,
          aspectRatioType: AspectRatioType.HeightByWidth,
        }
      )
    ).toEqual(66.66);
  });

  test('convert to width-by-height ratio in 2 d.p.', () => {
    expect(
      resolveAspectRatio(
        { width: 3, height: 2 },
        {
          aspectRatioDecimal: 2,
          aspectRatioFormat: AspectRatioFormat.Ratio,
          aspectRatioType: AspectRatioType.WidthByHeight,
        }
      )
    ).toEqual(1.5);
  });

  test('convert to height-by-width ratio in 2 d.p.', () => {
    expect(
      resolveAspectRatio(
        { width: 3, height: 2 },
        {
          aspectRatioDecimal: 2,
          aspectRatioFormat: AspectRatioFormat.Ratio,
          aspectRatioType: AspectRatioType.HeightByWidth,
        }
      )
    ).toEqual(0.66);
  });
});
