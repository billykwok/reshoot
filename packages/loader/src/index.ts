import { readFile } from 'fs-extra';
import { loader } from 'webpack';

import resolveOptions from './resolveOptions';
import extractPassThroughProperties from './extractPassThroughProperties';
import resolveMimeAndExt from './resolveMimeAndExt';
import toScriptString from './toScriptString';
import resolveColor from './resolveColor';
import createSharp from './createSharp';
import createDataUrl from './createDataUrl';
import emit from './emit';
import resolveAspectRatio from './resolveAspectRatio';
import resize from './resize';
import createHash from './createHash';
import cache from './cache';
import resolveDefaultOptions from './defaultOptions';

async function reshootLoader(content: string) {
  const loaderContext = this as loader.LoaderContext;
  loaderContext.cacheable();
  const callback = loaderContext.async();
  const defaultOptions = resolveDefaultOptions(loaderContext.mode);
  const options = resolveOptions(loaderContext, defaultOptions);
  const context = options.context || loaderContext.rootContext;
  const output = extractPassThroughProperties(options, defaultOptions);

  const { shape: outputShape } = options;
  const [mime, ext] = resolveMimeAndExt(loaderContext, options.forceFormat);

  const image = createSharp(loaderContext.resourcePath);
  const hash = createHash(await image.content(), options);

  const cachedOutput = cache.invalidateCache(hash);
  if (cachedOutput) {
    if (options.emitFile) {
      const emitCache = async ({ outputPath, cachePath }) => {
        const content = await readFile(cache.resolvePath(cachePath));
        loaderContext.emitFile(outputPath, content, null);
      };
      await Promise.all(cachedOutput.files.map(emitCache));
    }
    image.close();
    return callback(null, cachedOutput.output);
  }

  const saver = cache.createSaver(hash);
  const metadata = await image.metadata();
  const rawPath = emit(
    loaderContext,
    context,
    content,
    hash,
    metadata.width,
    ext,
    options,
    saver
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
    const serializedOutput = toScriptString(outputShape, output);
    saver.save(serializedOutput);
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
    const serializedOutput = toScriptString(outputShape, output);
    saver.save(serializedOutput);
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
    const paths = new Map<number, string>();
    imagesData.forEach(({ content, width }) =>
      paths.set(
        width,
        emit(loaderContext, context, content, hash, width, ext, options, saver)
      )
    );
    if (paths.size > 0) {
      output.srcSet = options.srcSet
        .filter(size => paths.has(size))
        .map(size => `${paths.get(widths.get(size))} ${size}w`);
    } else {
      output.srcSet = null;
    }
  }

  const serializedOutput = toScriptString(outputShape, output);
  saver.save(serializedOutput);
  image.close();
  return callback(null, serializedOutput);
}

export const raw = true;

export default reshootLoader;
