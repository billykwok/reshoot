import {
  describe,
  beforeAll,
  afterEach,
  afterAll,
  test,
  expect,
} from '@jest/globals';
import { Mime } from '../../../src/type';
import create1x1Image from './create1x1Image';

describe('resolvePlaceholder', () => {
  const resolvedColor = '#fff';
  const background = '#123';
  const placeholderSize = 4;
  const placeholderQuality = 9;
  const placeholderTrimDataUrl = true;
  const resized = create1x1Image(4, 3, 2);
  const dataUrl = 'data/url';
  const resize = jest.fn(() => resized);
  const createDataUrl = jest.fn(() => dataUrl);

  beforeAll(() => {
    jest.doMock('../../../src/util/resize', () => ({
      __esModule: true,
      default: resize,
    }));
    jest.doMock('../../../src/util/dataUrl', () => ({
      __esModule: true,
      createDataUrl,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetModules();
  });

  test('should resize with resolved color', async () => {
    const { default: resolvePlaceholder } = await import(
      '../../../src/util/resolvePlaceholder'
    );

    const input = create1x1Image();
    const placeholder = await resolvePlaceholder(input, resolvedColor, {
      background,
      placeholderSize,
      placeholderQuality,
      placeholderTrimDataUrl,
    });
    expect(placeholder).toEqual(dataUrl);
    expect(resize).toHaveBeenCalledTimes(1);
    expect(resize).toHaveBeenCalledWith(input, placeholderSize, Mime.JPEG, {
      background: resolvedColor,
      quality: placeholderQuality,
    });
    expect(createDataUrl).toHaveBeenCalledTimes(1);
    expect(createDataUrl).toHaveBeenCalledWith(resized, placeholderTrimDataUrl);
  });

  test('should resize with background color', async () => {
    const { default: resolvePlaceholder } = await import(
      '../../../src/util/resolvePlaceholder'
    );

    const input = create1x1Image();
    const placeholder = await resolvePlaceholder(input, 'transparent', {
      background,
      placeholderSize,
      placeholderQuality,
      placeholderTrimDataUrl,
    });
    expect(placeholder).toEqual(dataUrl);
    expect(resize).toHaveBeenCalledTimes(1);
    expect(resize).toHaveBeenCalledWith(input, placeholderSize, Mime.JPEG, {
      background,
      quality: placeholderQuality,
    });
    expect(createDataUrl).toHaveBeenCalledTimes(1);
    expect(createDataUrl).toHaveBeenCalledWith(resized, placeholderTrimDataUrl);
  });
});
