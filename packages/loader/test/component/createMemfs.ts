import path from 'path';
import { createFsFromVolume, Volume } from 'memfs';

function createMemfs() {
  const memfs = createFsFromVolume(new Volume());
  const nextFs = Object.create(memfs);
  nextFs.join = path.join;
  return nextFs;
}

export default createMemfs;
