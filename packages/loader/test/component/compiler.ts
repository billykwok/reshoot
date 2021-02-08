import path from 'path';
import webpack, { Compiler } from 'webpack';

const statsOptions = { source: true };

async function compile(
  outputFileSystem: Compiler['outputFileSystem'],
  fixture: string,
  options: Record<string, unknown> = {}
): Promise<string | Buffer> {
  const compiler = webpack({
    mode: 'production',
    context: __dirname,
    entry: `./${fixture}`,
    output: { path: path.resolve(__dirname), filename: 'bundle.js' },
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
        resolve(stats.toJson(statsOptions).modules[0].source);
      }
    })
  );
}

export default compile;
