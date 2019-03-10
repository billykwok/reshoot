// @flow
import cosmiconfig from 'cosmiconfig';

import resolveOptions from './resolveOptions';
import dedupe from './dedupe';
import extractRest from './extractRest';
import resolveMimeAndExt from './resolveMimeAndExt';
import stringify from './stringify';
import palette from './palette';
import processImage from './processImage';
import createDataUrl from './createDataUrl';
import createFile from './createFile';
import computeAspectRatio from './computeAspectRatio';
import resize from './resize';

import type { Options } from './type';

export default async function loader(content: string): void {
  const callback: (?Error, ?string) => void = this.async();
  const options: Options = resolveOptions(this);
  options.srcSet = dedupe(options.srcSet);
  const context = options.context || this.rootContext || this.options.context;
  const output = extractRest(options);

  let [mime, ext]: Array<string> = resolveMimeAndExt(this, options.forceFormat);

  if (options.shape.mime) {
    output.mime = JSON.stringify(mime);
  }

  if (options.shape.color) {
    const color = await palette(
      mime,
      options.color,
      this.resourcePath,
      options.disable
    );
    output.color = JSON.stringify(color);
  }

  const image = processImage(this.resourcePath);
  const meta = await image.metadata();

  const rawPath = createFile(this, context, content, meta.width, ext, options);

  output.src = '__webpack_public_path__+' + JSON.stringify(rawPath);

  if (options.shape.aspectRatio) {
    const aspectRatio = computeAspectRatio(meta, options.aspectRatio);
    output.aspectRatio = JSON.stringify(aspectRatio);
  }

  if (options.disable) {
    if (options.shape.placeholder) {
      output.placeholder = '__webpack_public_path__+' + JSON.stringify(rawPath);
    }
    if (options.shape.srcSet) {
      output.srcSet = JSON.stringify(null);
    }
    callback(null, stringify(options.shape, output));
    return;
  }

  const placeholder = options.placeholder;
  const [promises, widths] = resize(image, meta, placeholder, mime, options);
  if (widths.size === 0) {
    if (options.shape.placeholder) {
      output.placeholder = null;
    }
    if (options.shape.srcSet) {
      output.srcSet = null;
    }
    callback(null, stringify(options.shape, output));
    return;
  }

  const [placeholderData, ...imagesData] = await Promise.all(promises);

  if (options.shape.placeholder) {
    output.placeholder = JSON.stringify(
      createDataUrl(mime, placeholderData.content, placeholder.trimDataUrl)
    );
  }

  if (options.shape.srcSet) {
    const paths = new Map();
    imagesData.forEach(({ content, width }) => {
      paths.set(width, createFile(this, context, content, width, ext, options));
    });
    if (paths.size > 0) {
      const formatSize = size =>
        `__webpack_public_path__+${JSON.stringify(
          `${paths.get(widths.get(size))} ${size}w`
        )}`;
      output.srcSet = options.srcSet
        .filter(size => paths.has(size))
        .map(formatSize)
        .join('+","+');
    } else {
      output.srcSet = JSON.stringify(null);
    }
  }

  callback(null, stringify(options.shape, output));
  return;
}

export const raw = true;
