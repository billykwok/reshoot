import path from 'path';
import { createFsFromVolume, Volume } from 'memfs';

import type { IFs } from 'memfs';

function createMemfs(): IFs & { join: typeof path.join } {
  const vol = new Volume();
  return Object.assign(createFsFromVolume(vol), {
    join: (...paths: string[]) => path.join(...paths),
    toJSON: () => vol.toJSON(),
    reset: () => {
      if (vol.existsSync('./')) {
        vol.rmdirSync('./', { recursive: true });
      }
      vol.reset();
    },
  });
}

export default createMemfs;
