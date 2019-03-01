// @flow
import path from 'path';
import webpack from 'webpack';
import memoryFS from 'memory-fs';

export default function compiler(fixture: string, options: any = {}) {
  const compiler = webpack({
    context: __dirname,
    entry: `./${fixture}`,
    output: {
      path: path.resolve(__dirname),
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.(jpe?g|png)$/,
          use: [
            {
              loader: path.resolve(__dirname, '../../src/index.js'),
              options
            }
          ]
        }
      ]
    }
  });

  compiler.outputFileSystem = new memoryFS();

  return new Promise((resolve, reject) =>
    compiler.run((err, stats) => {
      if (err || stats.hasErrors()) {
        console.error(err);
        console.info(stats);
        return reject(err);
      }
      return resolve(stats);
    })
  ).then(stats => stats.toJson().modules[0].source);
}
