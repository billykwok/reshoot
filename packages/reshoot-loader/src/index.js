// @flow
import cosmiconfig from 'cosmiconfig';

import resolveOptions from './resolveOptions';
import dedupe from './dedupe';
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

  let [mime, ext] = resolveMimeAndExt(this, options.forceFormat);
  this.addDependency(this.resourcePath);

  const output = {};
  const color = await palette(options.color, this.resourcePath);
  if (color) {
    output.color = JSON.stringify(color);
  }

  const image = processImage(this.resourcePath);
  const meta = await image.metadata();

  const rawPath = createFile(this, context, content, meta.width, ext, options);
  output.src = '__webpack_public_path__+' + JSON.stringify(rawPath);
  if (options.shape.aspectRatio) {
    output.aspectRatio = JSON.stringify(
      computeAspectRatio(meta, options.aspectRatio)
    );
  }

  if (options.disable) {
    output.placeholder = JSON.stringify(rawPath);
    output.srcSet = '__webpack_public_path__+' + JSON.stringify(rawPath);
    return callback(null, stringify(options.shape, output));
  }

  const placeholder = options.placeholder;
  const [promises, widths] = resize(image, meta, placeholder, mime, options);
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
    const formatSize = size =>
      `__webpack_public_path__+${JSON.stringify(
        `${paths.get(widths.get(size))} ${size}w`
      )}`;
    output.srcSet = options.srcSet.map(formatSize).join('+","+');
  }
  return callback(null, stringify(options.shape, output));
}

export const raw = true;
