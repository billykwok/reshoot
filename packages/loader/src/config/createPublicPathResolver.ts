function createPublicPathResolver(
  publicPath: string | ((filename: string) => string)
): (filename: string) => string {
  if (
    typeof publicPath !== 'string' &&
    !(publicPath instanceof String) &&
    !publicPath
  ) {
    return null;
  }
  return publicPath instanceof Function
    ? publicPath
    : (filename: string) =>
        publicPath.replace(/\/$/, '') + '/' + filename.replace(/^\//, '');
}

export default createPublicPathResolver;
