function createPublicPathResolver(options: {
  publicPath: string | ((value: string) => string);
}): (filename: string) => string {
  if (typeof options.publicPath === 'function') {
    return options.publicPath;
  }
  if (/\/$/gi.test(options.publicPath)) {
    return (filename: string) => (options.publicPath as string) + filename;
  }
  return (filename: string) => `${options.publicPath as string}/${filename}`;
}

export default createPublicPathResolver;
