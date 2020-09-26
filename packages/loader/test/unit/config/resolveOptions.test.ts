import { describe, beforeAll, afterEach, test, expect } from '@jest/globals';
import { AspectRatioFormat, AspectRatioType, Mime } from '../../../src/type';

import type { loader } from 'webpack';

describe('resolveOptions', () => {
  const parseQuery = jest.fn();
  const getOptions = jest.fn();
  const ctx = {
    mode: 'development',
    resourceQuery: '?color=#888',
  } as loader.LoaderContext;

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
      aspectRatio: {
        type: AspectRatioType.HeightByWidth,
        format: AspectRatioFormat.Ratio,
        decimal: 4,
      },
      background: '#fff',
      cache: true,
      color: '#888',
      emitFile: true,
      alternativeFormats: [Mime.WEBP],
      alternativeWidths: [480, 640, 840, 1080],
      defaultFormat: Mime.JPEG,
      defaultWidth: 720,
      esModule: true,
      fastMode: true,
      mode: 'development',
      name: '[path][name].[ext]',
      placeholder: { quality: 10, size: 8, trimDataUrl: false },
      quality: 80,
    });
  });

  test('with config in file config only', async () => {
    getOptions.mockReturnValue({ color: '#000', defaultFormat: Mime.JPEG });
    const { default: resolveOptions } = await import(
      '../../../src/config/resolveOptions'
    );
    expect(resolveOptions(ctx)).toMatchObject({
      aspectRatio: {
        type: AspectRatioType.HeightByWidth,
        format: AspectRatioFormat.Ratio,
        decimal: 4,
      },
      background: '#fff',
      cache: true,
      color: '#000',
      emitFile: true,
      alternativeFormats: [Mime.WEBP],
      alternativeWidths: [480, 640, 840, 1080],
      defaultFormat: Mime.JPEG,
      defaultWidth: 720,
      esModule: true,
      fastMode: true,
      mode: 'development',
      name: '[path][name].[ext]',
      placeholder: { quality: 10, size: 8, trimDataUrl: false },
      quality: 80,
    });
  });

  test('with config in query string only', async () => {
    parseQuery.mockReturnValue({ color: '#888' });
    const { default: resolveOptions } = await import(
      '../../../src/config/resolveOptions'
    );
    expect(resolveOptions(ctx)).toMatchObject({
      aspectRatio: {
        type: AspectRatioType.HeightByWidth,
        format: AspectRatioFormat.Ratio,
        decimal: 4,
      },
      background: '#fff',
      cache: true,
      color: '#888',
      emitFile: true,
      alternativeFormats: [Mime.WEBP],
      alternativeWidths: [480, 640, 840, 1080],
      defaultFormat: null,
      defaultWidth: 720,
      esModule: true,
      fastMode: true,
      mode: 'development',
      name: '[path][name].[ext]',
      placeholder: { quality: 10, size: 8, trimDataUrl: false },
      quality: 80,
    });
  });
});
