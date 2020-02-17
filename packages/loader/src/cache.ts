import path from 'path';
import findCacheDir from 'find-cache-dir';
import { readFile, writeFile, readJson, writeJson } from 'fs-extra';

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

async function readCacheFile(cachePath: string) {
  return await readFile(resolvePath(cachePath));
}

async function readCacheStats(hash: string, defaultValue: any) {
  try {
    return await readJson(resolvePath(`${hash}.json`));
  } catch (e) {
    return defaultValue;
  }
}

async function invalidateCache(
  hash: string
): Promise<{
  output: string;
  files: { outputPath: string; cachePath: string }[];
} | null> {
  return await readCacheStats(hash, null);
}

async function createSaver(hash: string): Promise<Saver> {
  const stats = await readCacheStats(hash, { output: {}, files: [] });
  return {
    async addFile(
      outputPath: string,
      filename: string,
      content: string | Buffer
    ) {
      stats.files.push({ outputPath, cachePath: filename });
      await writeFile(path.join(resolvePath(), filename), content);
    },
    async save(output: string) {
      stats.output = output;
      await writeJson(resolvePath(`${hash}.json`), stats);
    }
  };
}

const cache = { readCacheFile, readCacheStats, invalidateCache, createSaver };

export default cache;
