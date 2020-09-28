import { readFile, readJson } from 'fs-extra';
import resolveCachePath from './resolveCachePath';
import version from '../util/version';

import type { loader } from 'webpack';
import type { CacheEntry, ResolvedOptions } from '../type';

export async function readCacheStats(
  mode: string,
  hash: string
): Promise<CacheEntry> {
  try {
    return (await readJson(
      resolveCachePath(version, mode, hash, 'output.json')
    )) as Promise<CacheEntry>;
  } catch (e) {
    return { filenames: [], output: null };
  }
}

export async function emitFromCache(
  ctx: Pick<loader.LoaderContext, 'emitFile'>,
  hash: string,
  filename: string,
  { mode, outputPath }: Pick<ResolvedOptions, 'mode' | 'outputPath'>
): Promise<void> {
  ctx.emitFile(
    outputPath(filename),
    await readFile(resolveCachePath(version, mode, hash, filename)),
    null
  );
}
