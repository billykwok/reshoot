import findCacheDir from 'find-cache-dir';
import { readFile, readJson, outputFile, outputJson } from 'fs-extra';
import { loader } from 'webpack';

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
): Promise<
  [
    (filename: string, content: string | Buffer) => Promise<void>,
    (output: string) => Promise<void>
  ]
> {
  const { files } = await readCacheStats(loaderContext.mode, hash, {
    files: []
  });
  return [
    async (filename: string, content: string | Buffer) => {
      files.push(filename);
      await outputFile(resolvePath(loaderContext.mode, filename), content);
    },
    async (output: string) => {
      if (files.length === 0) {
        loaderContext.emitWarning(new Error(`Caching ${hash} without files`));
      }
      await outputJson(resolvePath(loaderContext.mode, `${hash}.json`), {
        output,
        files
      });
    }
  ];
}

const cache = { readCacheFile, readCacheStats, invalidateCache, createSaver };

export default cache;
