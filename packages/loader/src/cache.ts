import findCacheDir from 'find-cache-dir';
import { readFile, readJson, outputFile, outputJson } from 'fs-extra';
import { loader } from 'webpack';

export type Saver = {
  addFile(filename: string, content: string | Buffer): Promise<void>;
  save(output: string): Promise<void>;
};

const resolvePath = findCacheDir({
  name: '@reshoot/loader',
  create: true,
  thunk: true
});

async function readCacheFile(mode: string, filename: string) {
  return await readFile(resolvePath(mode, filename));
}

async function readCacheStats<T>(
  mode: string,
  hash: string,
  defaultValue: T
): Promise<T> {
  try {
    return await readJson(resolvePath(mode, `${hash}.json`));
  } catch (e) {
    return defaultValue;
  }
}

async function invalidateCache(
  mode: string,
  hash: string
): Promise<{
  output: string;
  files: string[];
} | null> {
  return await readCacheStats(mode, hash, null);
}

async function createSaver(
  loaderContext: loader.LoaderContext,
  hash: string
): Promise<Saver> {
  const { files } = await readCacheStats(loaderContext.mode, hash, {
    files: []
  });
  return {
    async addFile(filename: string, content: string | Buffer) {
      files.push(filename);
      await outputFile(resolvePath(loaderContext.mode, filename), content);
    },
    async save(output: string) {
      if (files.length === 0) {
        loaderContext.emitWarning(`Caching ${hash} without files`);
      }
      await outputJson(resolvePath(loaderContext.mode, `${hash}.json`), {
        output,
        files
      });
    }
  };
}

const cache = { readCacheFile, readCacheStats, invalidateCache, createSaver };

export default cache;
