import { loader } from 'webpack';

import resolveOptions from './resolveOptions';
import extractPassThroughProperties from './extractPassThroughProperties';
import resolveMimeAndExt from './resolveMimeAndExt';
import renderScript from './renderScript';
import resolveColor from './resolveColor';
import createSharp from './createSharp';
import createDataUrl from './createDataUrl';
import emit from './emit';
import resolveAspectRatio from './resolveAspectRatio';
import resize from './resize';
import createHash from './createHash';
import cache from './cache';
import resolveDefaultOptions from './defaultOptions';
import createOutputPathResolver from './createOutputPathResolver';
import createPublicPathResolver from './createPublicPathResolver';

async function reshootLoader(
  this: loader.LoaderContext,
  content: string
): Promise<void> {
  this.cacheable(true);
  const callback = this.async();
  const defaultOptions = resolveDefaultOptions(this.mode);
  const options = resolveOptions(this, defaultOptions);
  const output = extractPassThroughProperties(options, defaultOptions);

  const { shape: outputShape } = options;

  const resolveOutputPath = createOutputPathResolver(options);
  const image = createSharp(this.resourcePath);
  const hash = createHash(await image.content(), options, this.mode);

  if (options.cache) {
    const cachedOutput = await cache.invalidateCache(this.mode, hash);
    if (cachedOutput) {
      if (options.emitFile && cachedOutput.files.length > 0) {
        const emitCache = async (filename: string) => {
          const content = await cache.readCacheFile(this.mode, filename);
          this.emitFile(resolveOutputPath(filename), content, null);
        };
        await Promise.all(cachedOutput.files.map(emitCache));
      }
      if (!options.emitFile || cachedOutput.files.length > 0) {
        image.close();
        return callback(null, cachedOutput.output);
      }
    }
  }

  const [[saveCache, saveCacheStats], metadata] = await Promise.all([
    cache.createSaver(this, hash, options),
    image.metadata(),
  ]);
  const resolvePublicPath = createPublicPathResolver(options);
  const [mime, ext] = resolveMimeAndExt(this, options.forceFormat);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, rawPath] = await emit(
    this,
    content,
    hash,
    metadata.width,
    ext,
    options,
    resolveOutputPath,
    resolvePublicPath,
    saveCache
  );

  output.src = rawPath;

  if (outputShape.mime) {
    output.mime = mime;
  }

  if (outputShape.aspectRatio) {
    output.aspectRatio = resolveAspectRatio(metadata, options.aspectRatio);
  }

  if (outputShape.color) {
    output.color = await resolveColor(image, options.color, options.disable);
  }

  if (options.disable) {
    if (outputShape.placeholder) {
      output.placeholder = rawPath;
    }
    if (outputShape.srcSet) {
      output.srcSet = null;
    }
    const serializedOutput = renderScript(output, options);
    await saveCacheStats(serializedOutput);
    image.close();
    return callback(null, serializedOutput);
  }

  const placeholder = options.placeholder;
  const [promises, widths] = resize(
    image,
    metadata,
    placeholder,
    mime,
    options
  );
  if (widths.size === 0) {
    if (outputShape.placeholder) {
      output.placeholder = null;
    }
    if (outputShape.srcSet) {
      output.srcSet = null;
    }
    const serializedOutput = renderScript(output, options);
    await saveCacheStats(serializedOutput);
    image.close();
    return callback(null, serializedOutput);
  }

  const [placeholderData, ...imagesData] = await Promise.all(promises);

  if (outputShape.placeholder) {
    output.placeholder = createDataUrl(
      mime,
      placeholderData.content,
      placeholder.trimDataUrl
    );
  }

  if (outputShape.srcSet) {
    const paths = new Map<number, string>(
      await Promise.all(
        imagesData.map(
          async ({ content, width }) =>
            await emit(
              this,
              content,
              hash,
              width,
              ext,
              options,
              resolveOutputPath,
              resolvePublicPath,
              saveCache
            )
        )
      )
    );
    if (paths.size > 0) {
      output.srcSet = options.srcSet
        .filter((size) => paths.has(size))
        .map((size) => `${paths.get(widths.get(size))} ${size}w`);
    } else {
      output.srcSet = null;
    }
  }

  const serializedOutput = renderScript(output, options);
  await saveCacheStats(serializedOutput);
  image.close();
  return callback(null, serializedOutput);
}

export const raw = true;

export default reshootLoader;
