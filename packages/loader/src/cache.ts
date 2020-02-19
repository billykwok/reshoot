import findCacheDir from 'find-cache-dir';
import { readFile, readJson, outputFile, outputJson } from 'fs-extra';

export type Saver = {
  addFile(
    outputPath: string,
    filename: string,
    content: string | Buffer
  ): Promise<void>;
  save(output: string): Promise<void>;
};

const resolvePath = findCacheDir({
  name: '@reshoot/loader',
  create: true,
  thunk: true
});

async function readCacheFile(mode: string, cachePath: string) {
  return await readFile(resolvePath(mode, cachePath));
}

async function readCacheStats(mode: string, hash: string, defaultValue: any) {
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
  files: { outputPath: string; cachePath: string }[];
} | null> {
  return await readCacheStats(mode, hash, null);
}

async function createSaver(mode: string, hash: string): Promise<Saver> {
  const stats = await readCacheStats(mode, hash, { output: {}, files: [] });
  return {
    async addFile(
      outputPath: string,
      filename: string,
      content: string | Buffer
    ) {
      stats.files.push({ outputPath, cachePath: filename });
      await outputFile(resolvePath(mode, filename), content);
    },
    async save(output: string) {
      stats.output = output;
      await outputJson(resolvePath(mode, `${hash}.json`), stats);
    }
  };
}

const cache = { readCacheFile, readCacheStats, invalidateCache, createSaver };

export default cache;
