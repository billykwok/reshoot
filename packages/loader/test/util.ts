import path from 'node:path';
import webpack, { type Compiler, type Configuration } from 'webpack';
import { Volume, createFsFromVolume, type IFs } from 'memfs';

import { type LoaderOptions } from '../src/types';

export function createMemfs(): IFs & { join: typeof path.join } {
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

const statsOptions = { source: true };

export async function compile(
  mode: Configuration['mode'],
  outputFileSystem: Compiler['outputFileSystem'],
  fixture: string,
  loaderOptions: Partial<LoaderOptions> = {},
  outputOptions: Configuration['output'] = {}
): Promise<string> {
  const compiler = webpack({
    mode,
    target: 'web',
    context: __dirname,
    entry: `./${fixture}`,
    output: {
      path: path.join(__dirname),
      filename: 'bundle.js',
      ...outputOptions,
    },
    performance: { hints: false },
    stats: {
      preset: 'normal',
      chunks: false,
      assets: false,
      runtimeModules: false,
      dependentModules: false,
      ...statsOptions,
    },
    module: {
      rules: [
        {
          test: /\.png$/,
          use: [
            {
              loader: path.join(__dirname, '../src/index.ts'),
              options: loaderOptions,
            },
          ],
        },
      ],
    },
  });

  compiler.outputFileSystem = outputFileSystem;

  return new Promise((resolve, reject) =>
    compiler.run((err, stats) => {
      if (err) {
        reject(err);
      } else if (stats.hasErrors()) {
        reject(stats.toJson().errors);
      } else {
        if (stats.hasWarnings()) {
          console.warn(stats.toJson().warnings);
        }
        const output = stats.toJson(statsOptions).modules[0].source as string;
        resolve(
          output.replaceAll(
            /placeholder:\s*'data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIBAMAAAA2IaO4AAAA[a-zA-Z0-9+/=]*'/g,
            "placeholder:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIBAMAAAA2IaO4AAAA'"
          )
        );
      }
    })
  );
}
