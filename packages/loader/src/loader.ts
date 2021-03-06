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
import { Mime, Extension, LoaderContext } from './type';

import type { Result } from './type';

async function reshootLoader(
  this: LoaderContext,
  content: Buffer | string,
  sourceMap: any,
  meta: any
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
    if (output) {
      if (options.emitFile && filenames.length) {
        for (const filename of filenames) {
          awaitables.push(emitFromCache(this, hash, filename, options));
        }
        await Promise.all(awaitables);
      }
      return callback(null, output, sourceMap, meta);
    }
  }

  const [mime, ext] = resolveMimeAndExt(this, options.defaultFormat);
  const isSvg = options.defaultFormat
    ? options.defaultFormat === Mime.SVG
    : mime === Mime.SVG;
  const isGif = options.defaultFormat
    ? options.defaultFormat === Mime.GIF
    : mime === Mime.GIF;
  const isSvgOrGif = isSvg || isGif;
  const [writeImage, writeStats] = createOutputWriter(this, hash, options);

  const image = loadImage(content);
  const metadata = await image.metadata();
  const defaultWidth = Math.min(options.defaultWidth || 0, metadata.width);
  const [rawPath, awaitable] = writeImage(
    isSvgOrGif ? metadata.width : defaultWidth,
    ext,
    isSvgOrGif
      ? Promise.resolve(content)
      : options.emitFile
      ? resize(image, defaultWidth, mime, options)
      : null
  );
  awaitables.push(awaitable);

  const internalOutput: Result = {
    id: hash,
    type: mime,
    src: rawPath,
    srcSet: [],
    width: metadata.width,
    height: metadata.height,
    aspectRatio:
      options.aspectRatioType !== null &&
      options.aspectRatioFormat !== null &&
      options.aspectRatioDecimal !== null
        ? resolveAspectRatio(metadata, options)
        : null,
    placeholder: null,
    color:
      typeof options.color === 'boolean' || options.color === null
        ? null
        : options.color,
    sources: [],
  };

  if (!isSvg) {
    if (options.color === true) {
      internalOutput.color = await resolveColor(image, options);
    }
    if (
      options.placeholderSize !== null &&
      options.placeholderQuality !== null &&
      options.placeholderTrimDataUrl !== null
    ) {
      internalOutput.placeholder = await resolvePlaceholder(
        image,
        internalOutput.color,
        options
      );
    }
  }

  if (isSvgOrGif || options.fastMode) {
    awaitables.unshift(writeStats(internalOutput));
    return callback(null, (await Promise.all(awaitables))[0], sourceMap, meta);
  }

  if (options.alternativeWidths && options.alternativeWidths.length) {
    const widths = options.alternativeWidths
      .filter((width) => width < metadata.width && width !== defaultWidth)
      .sort((a, b) => a - b);

    for (const width of widths) {
      const [srcSet, awaitable] = writeImage(
        width,
        ext,
        options.emitFile ? resize(image, width, mime, options) : null
      );
      awaitables.push(awaitable);
      internalOutput.srcSet.push([srcSet, width]);
    }

    if (options.alternativeFormats && options.alternativeFormats.length) {
      for (const type of options.alternativeFormats.filter((f) => f !== mime)) {
        const extension = Extension[type];
        const srcSet: [string, number][] = [];
        for (const width of widths.concat(defaultWidth)) {
          const [path, awaitable] = writeImage(
            width,
            extension,
            options.emitFile ? resize(image, width, type, options) : null
          );
          awaitables.push(awaitable);
          srcSet.push([path, width]);
        }

        internalOutput.sources.push({ type, srcSet });
      }
    }
  }

  awaitables.unshift(writeStats(internalOutput));
  return callback(null, (await Promise.all(awaitables))[0], sourceMap, meta);
}

export default reshootLoader;
