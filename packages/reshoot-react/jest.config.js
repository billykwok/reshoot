module.exports = {
  displayName: '@reshoot/react',
  snapshotSerializers: ['jest-emotion'],
  snapshotResolver: '<rootDir>/test/snapshotResolver.js',
  testEnvironment: 'jest-environment-jsdom-fifteen',
  verbose: true
};
