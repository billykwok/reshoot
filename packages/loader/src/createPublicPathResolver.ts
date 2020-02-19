function createPublicPathResolver(options: {
  publicPath: string | ((value: string) => string);
}) {
  if (typeof options.publicPath === 'function') {
    return options.publicPath;
  }
  if (/\/$/gi.test(options.publicPath)) {
    return (filename: string) => options.publicPath + filename;
  }
  return (filename: string) => `${options.publicPath}/${filename}`;
}

export default createPublicPathResolver;
