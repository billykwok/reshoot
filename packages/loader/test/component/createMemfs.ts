import path from 'path';
import { createFsFromVolume, Volume, IFs } from 'memfs';

function createMemfs(): IFs & { join: typeof path.join } {
  const memfs = createFsFromVolume(new Volume());
  const nextFs = Object.create(memfs) as IFs & { join: typeof path.join };
  nextFs.join = (...paths: string[]) => path.join(...paths);
  return nextFs;
}

export default createMemfs;
