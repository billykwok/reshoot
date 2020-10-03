import path from 'path';
import { outputFile, outputJson } from 'fs-extra';
import resolveCachePath from './resolveCachePath';
import interpolate from './interpolate';
import render from './render';
import version from '../util/version';

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
  cacheName: string,
  filename: string,
  content: Promise<Buffer | string>,
  { outputPath }: ResolvedOptions
): Promise<void> {
  const data = await content;
  outputFile(resolveCachePath(cacheName), data);
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
    ext: string,
    content: Promise<Buffer | string>
  ) => [string, Promise<void>],
  (internalOutput: Result) => Promise<string>
] {
  const { name, emitFile, cache } = options;
  const filenames: string[] = [];
  const cacheDir = path.join(version, ctx.mode, hash);
  return [
    function writeImage(
      width: number,
      ext: string,
      content: Promise<Buffer | string> = null
    ) {
      const filename = interpolate(ctx, name, { width, hash, ext });
      if (content !== null) {
        if (cache) {
          const cacheName = `${width}.${ext}`;
          filenames.push(cacheName);
          const cachePath = path.join(cacheDir, cacheName);
          return [
            filename,
            cacheAndOutputImage(ctx, cachePath, filename, content, options),
          ];
        }
        return [filename, outputImage(ctx, filename, content, options)];
      }
      return [filename, NULL_PROMISE];
    },
    async function writeStats(internalOutput: Result) {
      const output = render(internalOutput, options);
      if (cache && emitFile) {
        if (!options.fastMode && filenames.length < 1) {
          ctx.emitWarning(new Error(`Caching ${hash} without filenames`));
        }
        await outputJson(resolveCachePath(cacheDir, 'stats.json'), {
          output,
          filenames,
        } as CacheEntry);
      }
      return output;
    },
  ];
}

export default createOutputWriter;
