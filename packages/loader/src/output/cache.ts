import { readFile, readJson } from 'fs-extra';
import resolveCachePath from './resolveCachePath';

import type { loader } from 'webpack';
import type { CacheEntry, ResolvedOptions } from '../type';

export async function readCacheStats(
  mode: string,
  hash: string
): Promise<CacheEntry> {
  try {
    return (await readJson(resolveCachePath(mode, `${hash}.json`))) as Promise<
      CacheEntry
    >;
  } catch (e) {
    return { filenames: [], output: null };
  }
}

export async function emitFromCache(
  ctx: Pick<loader.LoaderContext, 'emitFile'>,
  filename: string,
  { mode, outputPath }: Pick<ResolvedOptions, 'mode' | 'outputPath'>
): Promise<void> {
  ctx.emitFile(
    outputPath(filename),
    await readFile(resolveCachePath(mode, filename)),
    null
  );
}
