import path from 'path';

function createOutputPathResolver(options: {
  outputPath: string | ((value: string) => string);
}): (filename: string) => string {
  if (!options.outputPath) return (filename: string) => filename;
  if (typeof options.outputPath === 'function') {
    return options.outputPath;
  }
  const prefix = options.outputPath;
  return (filename: string) => path.join(prefix, filename);
}

export default createOutputPathResolver;
