import path from 'path';
import findCacheDir from 'find-cache-dir';
import {
  writeJSONSync,
  pathExistsSync,
  writeFileSync,
  writeJsonSync
} from 'fs-extra';

const resolvePath = findCacheDir({
  name: '@reshoot/loader',
  create: true,
  thunk: true
});

const statsPath = resolvePath('./stats.json');

function initializeStats() {
  try {
    const s = require(statsPath);
    if (s) return s;
  } catch (e) {
    writeJSONSync(statsPath, {});
  }
  return {};
}

const stats = initializeStats();

function invalidateCache(
  hash: string
): {
  output: string;
  files: { outputPath: string; cachePath: string }[];
} | null {
  const cached = stats[hash];
  if (
    !cached ||
    !cached.output ||
    !cached.files ||
    cached.files.some(
      ({ cachePath }) => !pathExistsSync(resolvePath(cachePath))
    )
  ) {
    return null;
  }
  return cached;
}

export class Saver {
  hash: string;

  constructor(hash: string) {
    this.hash = hash;
    stats[hash] = { output: {}, files: [] };
  }

  addFile(outputPath: string, filename: string, content: string | Buffer) {
    stats[this.hash].files.push({ outputPath, cachePath: filename });
    writeFileSync(path.join(resolvePath(), filename), content);
  }

  save(output: string) {
    stats[this.hash].output = output;
    writeJsonSync(statsPath, stats);
  }
}

function createSaver(hash: string) {
  return new Saver(hash);
}

const cache = { resolvePath, invalidateCache, createSaver };

export default cache;
