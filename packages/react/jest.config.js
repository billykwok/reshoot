export default {
  displayName: '@reshoot/react',
  snapshotResolver: '<rootDir>/test/snapshotResolver.cjs',
  setupFilesAfterEnv: ['<rootDir>/test/setup.js'],
  coverageProvider: 'v8',
  verbose: true,
  transform: { '^.+\\.[tj]sx?$': './babel-jest-lerna.cjs' },
};
