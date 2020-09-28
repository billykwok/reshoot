import { describe, test, expect } from '@jest/globals';
import resolveDefaultOptions from '../../../src/config/defaultOptions';
import { AspectRatioFormat, AspectRatioType, Mime } from '../../../src/type';

describe('default options', () => {
  test('should return correct options in development environment', () => {
    expect(resolveDefaultOptions('development')).toMatchObject({
      name: '[path][name]-[width].[ext]',
      outputPath: null,
      publicPath: null,
      quality: 80,
      background: '#fff',
      color: true,
      alternativeFormats: [Mime.WEBP],
      alternativeWidths: [480, 800, 1120, 1440],
      defaultFormat: null,
      defaultWidth: 1120,
      placeholder: { size: 8, quality: 10, trimDataUrl: false },
      aspectRatio: {
        type: AspectRatioType.HeightByWidth,
        format: AspectRatioFormat.Ratio,
        decimal: 4,
      },
      fastMode: true,
      cache: true,
      emitFile: true,
      esModule: true,
    });
  });

  test('should return correct options in other environment', () => {
    expect(resolveDefaultOptions('production')).toMatchObject({
      name: '[contenthash:8]-[width].[ext]',
      outputPath: null,
      publicPath: null,
      quality: 80,
      background: '#fff',
      color: true,
      alternativeFormats: [Mime.WEBP],
      alternativeWidths: [480, 800, 1120, 1440],
      defaultFormat: null,
      defaultWidth: 1120,
      placeholder: { size: 8, quality: 10, trimDataUrl: false },
      aspectRatio: {
        type: AspectRatioType.HeightByWidth,
        format: AspectRatioFormat.Ratio,
        decimal: 4,
      },
      fastMode: false,
      cache: true,
      emitFile: true,
      esModule: true,
    });
  });
});
