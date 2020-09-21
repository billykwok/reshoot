import path from 'path';

function createPublicPathResolver(
  publicPath: string | ((filename: string) => string)
): (filename: string) => string {
  if (!publicPath) return (filename: string) => path.join('/', filename);
  return publicPath instanceof Function
    ? publicPath
    : (filename: string) => path.join(publicPath, filename);
}

export default createPublicPathResolver;
