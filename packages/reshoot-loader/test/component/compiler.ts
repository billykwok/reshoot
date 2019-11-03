import path from 'path';
import webpack from 'webpack';

export default function compiler(fixture: string, options: any = {}) {
  const compiler = webpack({
    mode: 'production',
    context: __dirname,
    entry: `./${fixture}`,
    output: {
      path: path.resolve(__dirname),
      filename: 'bundle.js'
    },
    performance: { hints: false },
    resolve: { alias: { fs: 'memfs' } },
    module: {
      rules: [
        {
          test: /\.(jpe?g|png)$/,
          use: [
            { loader: path.resolve(__dirname, '../../src/index.ts'), options }
          ]
        }
      ]
    }
  });

  return new Promise<webpack.Stats>((resolve, reject) =>
    compiler.run((err, stats) => {
      if (err) {
        console.error(err);
        return reject(err);
      }
      if (stats.hasErrors()) {
        console.error(stats.compilation.errors);
        return reject(stats.compilation);
      }
      if (stats.hasWarnings()) {
        console.warn(stats.compilation.warnings);
      }
      return resolve(stats);
    })
  ).then(stats => stats.toJson().modules[0].source);
}
