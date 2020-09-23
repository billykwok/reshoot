import { outputFile, outputJson } from 'fs-extra';
import resolveCachePath from './resolveCachePath';
import interpolate from './interpolate';
import render from './render';

import type { loader } from 'webpack';
import type { Result, ResolvedOptions, CacheEntry } from '../type';

async function outputImage(
  ctx: loader.LoaderContext,
  filename: string,
  content: Promise<Buffer | string>,
  { outputPath }: ResolvedOptions
): Promise<void> {
  ctx.emitFile(outputPath(filename), await content, null);
}

async function cacheAndOutputImage(
  ctx: loader.LoaderContext,
  filename: string,
  content: Promise<Buffer | string>,
  { mode, outputPath }: ResolvedOptions
): Promise<void> {
  const data = await content;
  outputFile(resolveCachePath(mode, filename), data);
  ctx.emitFile(outputPath(filename), data, null);
}

const NULL_PROMISE = Promise.resolve(null);

function createOutputWriter(
  ctx: loader.LoaderContext,
  hash: string,
  options: ResolvedOptions
): [
  (
    width: number,
    content: Promise<Buffer | string>,
    ext: string
  ) => [string, Promise<void>],
  (internalOutput: Result) => Promise<string>
] {
  const { name, emitFile, cache } = options;
  const filenames = [];
  return [
    function writeImage(
      width: number,
      content: Promise<Buffer | string>,
      ext: string
    ) {
      const filename = interpolate(ctx, name, { width, hash, ext });
      if (emitFile) {
        if (cache) {
          filenames.push(filename);
          return [
            filename,
            cacheAndOutputImage(ctx, filename, content, options),
          ];
        }
        return [filename, outputImage(ctx, filename, content, options)];
      }
      return [filename, NULL_PROMISE];
    },
    async function writeStats(internalOutput: Result) {
      const output = render(internalOutput, options);
      if (cache) {
        if (!options.fastMode && filenames.length === 0) {
          ctx.emitWarning(new Error(`Caching ${hash} without files`));
        }
        await outputJson(resolveCachePath(ctx.mode, `${hash}.json`), {
          output,
          filenames,
        } as CacheEntry);
      }
      return output;
    },
  ];
}

export default createOutputWriter;
