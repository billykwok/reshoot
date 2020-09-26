import { default as loadImage } from 'sharp';
import resolveOptions from './config/resolveOptions';
import validateOptions from './config/validateOptions';
import resolveMimeAndExt from './util/resolveMimeAndExt';
import resolveColor from './util/resolveColor';
import resolvePlaceholder from './util/resolvePlaceholder';
import resolveAspectRatio from './util/resolveAspectRatio';
import resize from './util/resize';
import computeHash from './util/hash';
import { emitFromCache, readCacheStats } from './output/cache';
import createOutputWriter from './output/outputWriter';
import createError from './util/createError';
import { Mime, Extension } from './type';

import type { loader } from 'webpack';
import type { Result } from './type';

async function reshootLoader(
  this: loader.LoaderContext,
  content: Buffer | string
): Promise<void> {
  this.cacheable(true);
  const callback = this.async();
  const options = resolveOptions(this);

  const errors = validateOptions(options);
  if (errors.length) {
    return callback(new Error(createError(errors)));
  }

  const hash = computeHash(content, options);
  const awaitables: Promise<any>[] = [];

  if (options.cache) {
    const { mode } = options;
    const { filenames = [], output = null } = await readCacheStats(mode, hash);
    if (options.emitFile && filenames.length && output) {
      for (const filename of filenames) {
        awaitables.push(emitFromCache(this, filename, options));
      }
      await Promise.all(awaitables);
      return callback(null, output);
    }
  }

  const [mime, ext] = resolveMimeAndExt(this, options.defaultFormat);
  const isSvgOrGif = options.defaultFormat
    ? options.defaultFormat === Mime.SVG || options.defaultFormat === Mime.GIF
    : mime === Mime.SVG || mime === Mime.GIF;
  const [writeImage, writeStats] = createOutputWriter(this, hash, options);

  const image = loadImage(content);
  const metadata = await image.metadata();
  const defaultWidth = Math.min(options.defaultWidth || 0, metadata.width);
  const [rawPath, awaitable] = writeImage(
    isSvgOrGif ? metadata.width : defaultWidth,
    isSvgOrGif
      ? Promise.resolve(content)
      : resize(image, defaultWidth, mime, options),
    ext
  );
  awaitables.push(awaitable);

  const internalOutput: Result = {
    type: mime,
    src: rawPath,
    srcSet: [],
    width: metadata.width,
    height: metadata.height,
    aspectRatio: options.aspectRatio
      ? resolveAspectRatio(metadata, options.aspectRatio)
      : null,
    placeholder: null,
    color: options.color || 'transparent',
    sources: [],
  };

  if (!options.color) {
    internalOutput.color = await resolveColor(image, options);
  }

  if (options.placeholder) {
    internalOutput.placeholder = await resolvePlaceholder(
      image,
      internalOutput.color,
      options
    );
  }

  if (options.fastMode) {
    awaitables.unshift(writeStats(internalOutput));
    return callback(null, (await Promise.all(awaitables))[0]);
  }

  const isAlternativeFormatsEnabled =
    options.alternativeFormats && options.alternativeFormats.length;
  if (
    !isSvgOrGif &&
    ((options.alternativeWidths && options.alternativeWidths.length) ||
      isAlternativeFormatsEnabled)
  ) {
    const widths = options.alternativeWidths
      .filter((width) => width < metadata.width && width !== defaultWidth)
      .sort((a, b) => a - b);

    for (const width of widths) {
      const [srcSet, awaitable] = writeImage(
        width,
        resize(image, width, mime, options),
        ext
      );
      awaitables.push(awaitable);
      internalOutput.srcSet.push([srcSet, width]);
    }

    if (isAlternativeFormatsEnabled) {
      for (const type of options.alternativeFormats) {
        const extension = Extension[type];
        const [src, awaitable] = writeImage(
          defaultWidth,
          resize(image, defaultWidth, type, options),
          extension
        );
        awaitables.push(awaitable);

        const srcSet: [string, number][] = [];
        for (const width of widths) {
          const [path, awaitable] = writeImage(
            width,
            resize(image, width, type, options),
            extension
          );
          awaitables.push(awaitable);
          srcSet.push([path, width]);
        }

        internalOutput.sources.push({ type, src, srcSet });
      }
    }
  }

  awaitables.unshift(writeStats(internalOutput));
  return callback(null, (await Promise.all(awaitables))[0]);
}

export default reshootLoader;
