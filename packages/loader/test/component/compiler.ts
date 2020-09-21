import path from 'path';
import webpack from 'webpack';

import type { OutputFileSystem } from 'webpack';

async function compile(
  outputFileSystem: OutputFileSystem,
  fixture: string,
  options: Record<string, unknown> = {}
): Promise<string> {
  const compiler = webpack({
    mode: 'production',
    context: __dirname,
    entry: `./${fixture}`,
    output: { path: path.resolve(__dirname), filename: 'bundle.js' },
    performance: { hints: false },
    module: {
      rules: [
        {
          test: /\.(jpe?g)$/,
          use: [
            { loader: path.resolve(__dirname, '../../src/index.ts'), options },
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
        resolve(stats.toJson().modules[0].source);
      }
    })
  );
}

export default compile;
