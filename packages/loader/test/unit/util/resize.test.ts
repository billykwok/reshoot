import { describe, test, expect } from '@jest/globals';
import resize from '../../../src/util/resize';
import { Mime } from '../../../src/type';

import type {
  Sharp,
  JpegOptions,
  PngOptions,
  WebpOptions,
  AvifOptions,
  FlattenOptions,
  ResizeOptions,
} from 'sharp';

type Image = {
  clone: jest.Mock<Image, []>;
  resize: jest.Mock<Image, [ResizeOptions?]>;
  flatten: jest.Mock<Image, [FlattenOptions?]>;
  jpeg: jest.Mock<Image, [JpegOptions?]>;
  png: jest.Mock<Image, [PngOptions?]>;
  webp: jest.Mock<Image, [WebpOptions?]>;
  avif: jest.Mock<Image, [AvifOptions?]>;
  toBuffer: jest.Mock<Promise<Buffer>, []>;
};

describe('resize', () => {
  const buffer = Buffer.from([0]);
  const background = '#fff';
  const quality = 80;
  const image = {
    clone: jest.fn<Image, []>(() => image),
    resize: jest.fn<Image, [ResizeOptions?]>(() => image),
    flatten: jest.fn<Image, [FlattenOptions?]>(() => image),
    jpeg: jest.fn<Image, [JpegOptions?]>(() => image),
    png: jest.fn<Image, [PngOptions?]>(() => image),
    webp: jest.fn<Image, [WebpOptions?]>(() => image),
    avif: jest.fn<Image, [AvifOptions?]>(() => image),
    toBuffer: jest.fn(() => Promise.resolve(buffer)),
  } as Image;

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  test('should resize JPEG', async () => {
    const resized = await resize((image as unknown) as Sharp, 2, Mime.JPEG, {
      background,
      quality,
    });
    expect(image.clone).toHaveBeenCalledTimes(1);
    expect(image.resize).toHaveBeenCalledTimes(1);
    expect(image.flatten).toHaveBeenCalledTimes(1);
    expect(image.jpeg).toHaveBeenCalledTimes(1);
    expect(image.toBuffer).toHaveBeenCalledTimes(1);
    expect(image.resize).toHaveBeenCalledWith({
      fit: 'outside',
      height: 16,
      width: 16,
      withoutEnlargement: true,
    });
    expect(image.flatten).toHaveBeenCalledWith({ background });
    expect(image.jpeg).toHaveBeenCalledWith({ quality });
    expect(resized).toEqual(buffer);
  });

  test('should resize JPG', async () => {
    const resized = await resize((image as unknown) as Sharp, 2, Mime.JPG, {
      background,
      quality,
    });
    expect(image.clone).toHaveBeenCalledTimes(1);
    expect(image.resize).toHaveBeenCalledTimes(1);
    expect(image.flatten).toHaveBeenCalledTimes(1);
    expect(image.jpeg).toHaveBeenCalledTimes(1);
    expect(image.toBuffer).toHaveBeenCalledTimes(1);
    expect(image.resize).toHaveBeenCalledWith({
      fit: 'outside',
      height: 16,
      width: 16,
      withoutEnlargement: true,
    });
    expect(image.flatten).toHaveBeenCalledWith({ background });
    expect(image.jpeg).toHaveBeenCalledWith({ quality });
    expect(resized).toEqual(buffer);
  });

  test('should resize JPEG without flattening', async () => {
    const resized = await resize((image as unknown) as Sharp, 2, Mime.JPEG, {
      background: null,
      quality,
    });
    expect(image.clone).toHaveBeenCalledTimes(1);
    expect(image.resize).toHaveBeenCalledTimes(1);
    expect(image.flatten).toHaveBeenCalledTimes(1);
    expect(image.jpeg).toHaveBeenCalledTimes(1);
    expect(image.toBuffer).toHaveBeenCalledTimes(1);
    expect(image.resize).toHaveBeenCalledWith({
      fit: 'outside',
      height: 16,
      width: 16,
      withoutEnlargement: true,
    });
    expect(image.flatten).toHaveBeenCalledWith(false);
    expect(image.jpeg).toHaveBeenCalledWith({ quality });
    expect(resized).toEqual(buffer);
  });

  test('should resize JPG without flattening', async () => {
    const resized = await resize((image as unknown) as Sharp, 2, Mime.JPG, {
      background: null,
      quality,
    });
    expect(image.clone).toHaveBeenCalledTimes(1);
    expect(image.resize).toHaveBeenCalledTimes(1);
    expect(image.flatten).toHaveBeenCalledTimes(1);
    expect(image.jpeg).toHaveBeenCalledTimes(1);
    expect(image.toBuffer).toHaveBeenCalledTimes(1);
    expect(image.resize).toHaveBeenCalledWith({
      fit: 'outside',
      height: 16,
      width: 16,
      withoutEnlargement: true,
    });
    expect(image.flatten).toHaveBeenCalledWith(false);
    expect(image.jpeg).toHaveBeenCalledWith({ quality });
    expect(resized).toEqual(buffer);
  });

  test('should resize PNG', async () => {
    const resized = await resize((image as unknown) as Sharp, 2, Mime.PNG, {
      background,
      quality,
    });
    expect(image.clone).toHaveBeenCalledTimes(1);
    expect(image.resize).toHaveBeenCalledTimes(1);
    expect(image.flatten).toHaveBeenCalledTimes(0);
    expect(image.png).toHaveBeenCalledTimes(1);
    expect(image.toBuffer).toHaveBeenCalledTimes(1);
    expect(image.resize).toHaveBeenCalledWith({
      fit: 'outside',
      height: 16,
      width: 16,
      withoutEnlargement: true,
    });
    expect(image.png).toHaveBeenCalledWith({ quality });
    expect(resized).toEqual(buffer);
  });

  test('should resize WEBP', async () => {
    const resized = await resize((image as unknown) as Sharp, 2, Mime.WEBP, {
      background,
      quality,
    });
    expect(image.clone).toHaveBeenCalledTimes(1);
    expect(image.resize).toHaveBeenCalledTimes(1);
    expect(image.flatten).toHaveBeenCalledTimes(0);
    expect(image.webp).toHaveBeenCalledTimes(1);
    expect(image.toBuffer).toHaveBeenCalledTimes(1);
    expect(image.resize).toHaveBeenCalledWith({
      fit: 'outside',
      height: 16,
      width: 16,
      withoutEnlargement: true,
    });
    expect(image.webp).toHaveBeenCalledWith({ quality, reductionEffort: 6 });
    expect(resized).toEqual(buffer);
  });

  test('should resize AVIF', async () => {
    const resized = await resize((image as unknown) as Sharp, 2, Mime.AVIF, {
      background,
      quality,
    });
    expect(image.clone).toHaveBeenCalledTimes(1);
    expect(image.resize).toHaveBeenCalledTimes(1);
    expect(image.flatten).toHaveBeenCalledTimes(0);
    expect(image.avif).toHaveBeenCalledTimes(1);
    expect(image.toBuffer).toHaveBeenCalledTimes(1);
    expect(image.resize).toHaveBeenCalledWith({
      fit: 'outside',
      height: 16,
      width: 16,
      withoutEnlargement: true,
    });
    expect(image.avif).toHaveBeenCalledWith({ quality });
    expect(resized).toEqual(buffer);
  });

  test('should throw for GIF', async () => {
    await expect(
      resize((image as unknown) as Sharp, 2, Mime.GIF, {
        background,
        quality,
      })
    ).rejects.toEqual(new Error(`Unsupported MIME type "${Mime.GIF}"`));
  });

  test('should throw for SVG', async () => {
    await expect(
      resize((image as unknown) as Sharp, 2, Mime.SVG, {
        background,
        quality,
      })
    ).rejects.toEqual(new Error(`Unsupported MIME type "${Mime.SVG}"`));
  });
});
