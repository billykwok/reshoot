import path from 'path';

function createOutputPathResolver(options: {
  outputPath: string | ((value: string) => string);
}) {
  return (filename: string) => {
    if (options.outputPath) {
      if (typeof options.outputPath === 'function') {
        return options.outputPath(filename);
      }
      return path.join(options.outputPath, filename);
    }
    return filename;
  };
}

export default createOutputPathResolver;
