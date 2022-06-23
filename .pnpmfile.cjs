function readPackage(pkg, context) {
  if (pkg.name === '@types/loader-utils') {
    delete pkg.dependencies['@types/webpack'];
    context.log(
      `removed '@types/webpack' in favor of bundled types from 'webpack'`
    );
  }
  return pkg;
}

module.exports = { hooks: { readPackage } };
