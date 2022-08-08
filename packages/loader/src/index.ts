import JSON5 from 'json5';
import path from 'node:path';
import { type RawLoaderDefinitionFunction } from 'webpack';
import { extractMeta } from '@reshoot/core';

import defaultPublicPath from './defaultPublicPath';
import interpolate from './interpolate';
import { type LoaderImageMeta, type LoaderOptions } from './types';

const DEFAULT_SHAPE: LoaderOptions['shape'] = Object.freeze(
  ({ hash, src, width, height, aspectRatio, placeholder, color }) => ({
    hash,
    src,
    width,
    height,
    aspectRatio,
    placeholder,
    color,
  })
);

const reshootLoader: RawLoaderDefinitionFunction<LoaderOptions> =
  async function (this, content, sourceMap, meta): Promise<string | Buffer> {
    this.cacheable(true);
    const callback = this.async();
    const loaderOptions: LoaderOptions = {
      shape: DEFAULT_SHAPE,
      filename:
        this.mode === 'development'
          ? '[path][name].[ext]'
          : '[contenthash:16].[ext]',
      outputPath: null,
      publicPath: defaultPublicPath(this),
      emitFile: true,
      esModule: false,
      ...this.getOptions(),
    };
    const [, searchQuery = ''] = /^.+(?:\?(.+))$/.exec(this.resource) || [];
    const searchParams = new URLSearchParams(searchQuery);

    const coreImageMeta = await extractMeta(content, {
      ...loaderOptions.meta,
      color: searchParams.get('color')?.replace('%23', '#'),
      maxWidth: parseInt(searchParams.get('maxWidth')),
      filename: loaderOptions.filename,
    });
    const filename = interpolate(
      loaderOptions.filename,
      coreImageMeta.hash,
      this
    );
    const loaderImageMeta: LoaderImageMeta = {
      ...coreImageMeta,
      src:
        typeof loaderOptions.publicPath === 'function'
          ? loaderOptions.publicPath(filename)
          : path.join(loaderOptions.publicPath, filename),
    };

    if (loaderOptions.emitFile) {
      this.emitFile(
        !loaderOptions.outputPath
          ? filename
          : typeof loaderOptions.outputPath === 'function'
          ? loaderOptions.outputPath(filename)
          : path.join(loaderOptions.outputPath, filename),
        content
      );
    }

    callback(
      null,
      (loaderOptions.esModule ? 'export default ' : 'module.exports=') +
        JSON5.stringify(
          loaderOptions.shape(loaderImageMeta, this.resourcePath)
        ),
      sourceMap,
      meta
    );
    return content;
  };

export const raw = true;

export { AspectRatioFormat, AspectRatioType } from '@reshoot/types';

export type { LoaderImageMeta, LoaderOptions } from './types';

export default reshootLoader;
