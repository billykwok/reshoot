import path from 'path';

function createOutputPathResolver(
  outputPath: string | ((value: string) => string)
): (filename: string) => string {
  if (!outputPath) return (filename: string) => filename;
  if (typeof outputPath === 'function') return outputPath;
  return (filename: string) => path.join(outputPath, filename);
}

export default createOutputPathResolver;
