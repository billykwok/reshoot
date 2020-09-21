module.exports = {
  displayName: '@reshoot/loader',
  testEnvironment: 'node',
  coverageProvider: 'v8',
  verbose: true,
  transform: { '^.+\\.[tj]sx?$': './babel-jest-lerna.js' },
};
