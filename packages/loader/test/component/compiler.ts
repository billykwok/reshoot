import path from 'path';
import webpack from 'webpack';

import createMemfs from './createMemfs';

async function compiler(fixture: string, options: any = {}) {
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
  compiler.outputFileSystem = createMemfs();

  return new Promise((resolve, reject) =>
    compiler.run((err, stats) => {
      if (err) {
        console.error(err);
        reject(err);
      } else if (stats.hasErrors()) {
        console.error(stats.toJson().errors);
        reject(stats.toJson().errors);
      } else {
        if (stats.hasWarnings()) console.warn(stats.toJson().warnings);
        resolve(stats.toJson().modules[0].source);
      }
    })
  );
}

export default compiler;
