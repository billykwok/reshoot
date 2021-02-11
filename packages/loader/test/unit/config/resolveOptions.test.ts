import { describe, beforeAll, afterEach, test, expect } from '@jest/globals';
import { AspectRatioFormat, AspectRatioType, Mime } from '../../../src/type';

import type { LoaderContext } from '../../../src/type';

describe('resolveOptions', () => {
  const parseQuery = jest.fn();
  const getOptions = jest.fn();
  const ctx = {
    mode: 'development',
    resourceQuery: '?color=%23888',
  } as LoaderContext;

  beforeAll(() => {
    jest.doMock('loader-utils', () => ({ parseQuery, getOptions }));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('with config in both', async () => {
    parseQuery.mockReturnValue({ color: '#888' });
    getOptions.mockReturnValue({ color: '#000', defaultFormat: Mime.JPEG });
    const { default: resolveOptions } = await import(
      '../../../src/config/resolveOptions'
    );
    expect(resolveOptions(ctx)).toMatchObject({
      aspectRatioType: AspectRatioType.HeightByWidth,
      aspectRatioFormat: AspectRatioFormat.Ratio,
      aspectRatioDecimal: 4,
      background: '#fff',
      cache: true,
      color: '#888',
      emitFile: true,
      alternativeFormats: [Mime.AVIF, Mime.WEBP],
      alternativeWidths: [640, 1120, 1440],
      defaultFormat: Mime.JPEG,
      defaultWidth: 1120,
      esModule: false,
      fastMode: true,
      mode: 'development',
      name: '[path][name]-[width].[ext]',
      placeholderQuality: 10,
      placeholderSize: 8,
      placeholderTrimDataUrl: false,
      quality: 80,
    });
  });

  test('with config in file config only', async () => {
    getOptions.mockReturnValue({ color: '#000', defaultFormat: Mime.JPEG });
    const { default: resolveOptions } = await import(
      '../../../src/config/resolveOptions'
    );
    expect(resolveOptions(ctx)).toMatchObject({
      aspectRatioType: AspectRatioType.HeightByWidth,
      aspectRatioFormat: AspectRatioFormat.Ratio,
      aspectRatioDecimal: 4,
      background: '#fff',
      cache: true,
      color: '#000',
      emitFile: true,
      alternativeFormats: [Mime.AVIF, Mime.WEBP],
      alternativeWidths: [640, 1120, 1440],
      defaultFormat: Mime.JPEG,
      defaultWidth: 1120,
      esModule: false,
      fastMode: true,
      mode: 'development',
      name: '[path][name]-[width].[ext]',
      placeholderQuality: 10,
      placeholderSize: 8,
      placeholderTrimDataUrl: false,
      quality: 80,
    });
  });

  test('with config in query string only', async () => {
    parseQuery.mockReturnValue({ color: '#888' });
    const { default: resolveOptions } = await import(
      '../../../src/config/resolveOptions'
    );
    expect(resolveOptions(ctx)).toMatchObject({
      aspectRatioType: AspectRatioType.HeightByWidth,
      aspectRatioFormat: AspectRatioFormat.Ratio,
      aspectRatioDecimal: 4,
      background: '#fff',
      cache: true,
      color: '#888',
      emitFile: true,
      alternativeFormats: [Mime.AVIF, Mime.WEBP],
      alternativeWidths: [640, 1120, 1440],
      defaultFormat: null,
      defaultWidth: 1120,
      esModule: false,
      fastMode: true,
      mode: 'development',
      name: '[path][name]-[width].[ext]',
      placeholderQuality: 10,
      placeholderSize: 8,
      placeholderTrimDataUrl: false,
      quality: 80,
    });
  });
});
