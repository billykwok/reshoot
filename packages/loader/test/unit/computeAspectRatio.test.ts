import computeAspectRatio from '../../src/computeAspectRatio';
import { AspectRatioFormat, AspectRatioType } from '../../src/type';

describe('computeAspectRatio', () => {
  test('throw when decimal exceeds 10', () => {
    expect(() =>
      computeAspectRatio(
        { width: 5, height: 5 },
        {
          decimal: 11,
          format: AspectRatioFormat.Ratio,
          type: AspectRatioType.WidthByHeight
        }
      )
    ).toThrow(
      new Error(
        'Option "decimal" for aspect ratio must be a number not larger than 10, but got 11'
      )
    );
  });

  test('throw when decimal is falsy', () => {
    expect(() =>
      computeAspectRatio(
        { width: 5, height: 5 },
        {
          decimal: undefined,
          format: AspectRatioFormat.Ratio,
          type: AspectRatioType.WidthByHeight
        }
      )
    ).toThrow(
      new Error(
        'Option "decimal" for aspect ratio must be a number not larger than 10, but got undefined'
      )
    );
  });

  test('throw when format is falsy', () => {
    expect(() =>
      computeAspectRatio(
        { width: 5, height: 5 },
        {
          decimal: 2,
          format: undefined,
          type: AspectRatioType.WidthByHeight
        }
      )
    ).toThrow(
      new Error(
        'Option "format" for aspect ratio must be either percent or ratio but got undefined'
      )
    );
  });

  test('throw when type is falsy', () => {
    expect(() =>
      computeAspectRatio(
        { width: 5, height: 5 },
        {
          decimal: 2,
          format: AspectRatioFormat.Ratio,
          type: undefined
        }
      )
    ).toThrow(
      new Error(
        'Option "type" for aspect ratio must be either widthByHeight or heightByWidth but got "undefined"'
      )
    );
  });

  test('convert to integer whenever possible', () => {
    expect(
      computeAspectRatio(
        { width: 5, height: 5 },
        {
          decimal: 10,
          format: AspectRatioFormat.Ratio,
          type: AspectRatioType.WidthByHeight
        }
      )
    ).toEqual(1);
  });

  test('convert to width-by-height percentage in 2 d.p.', () => {
    expect(
      computeAspectRatio(
        { width: 3, height: 2 },
        {
          decimal: 2,
          format: AspectRatioFormat.Percent,
          type: AspectRatioType.WidthByHeight
        }
      )
    ).toEqual(150);
  });

  test('convert to height-by-width percentage in 2 d.p.', () => {
    expect(
      computeAspectRatio(
        { width: 3, height: 2 },
        {
          decimal: 2,
          format: AspectRatioFormat.Percent,
          type: AspectRatioType.HeightByWidth
        }
      )
    ).toEqual(66.66);
  });

  test('convert to width-by-height ratio in 2 d.p.', () => {
    expect(
      computeAspectRatio(
        { width: 3, height: 2 },
        {
          decimal: 2,
          format: AspectRatioFormat.Ratio,
          type: AspectRatioType.WidthByHeight
        }
      )
    ).toEqual(1.5);
  });

  test('convert to height-by-width ratio in 2 d.p.', () => {
    expect(
      computeAspectRatio(
        { width: 3, height: 2 },
        {
          decimal: 2,
          format: AspectRatioFormat.Ratio,
          type: AspectRatioType.HeightByWidth
        }
      )
    ).toEqual(0.66);
  });
});
