module.exports = {
  displayName: '@reshoot/react',
  snapshotResolver: '<rootDir>/test/snapshotResolver.js',
  setupFilesAfterEnv: ['<rootDir>/test/setup.js'],
  coverageProvider: 'v8',
  verbose: true,
  transform: { '^.+\\.[tj]sx?$': './babel-jest-lerna.js' },
};
