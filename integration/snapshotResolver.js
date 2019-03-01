module.exports = {
  resolveSnapshotPath: (testPath, snapshotExtension) =>
    testPath.replace('integration/build', 'integration/__snapshots__') +
    snapshotExtension,
  resolveTestPath: (snapshotFilePath, snapshotExtension) =>
    snapshotFilePath
      .replace('integration/__snapshots__', 'integration/build')
      .slice(0, -snapshotExtension.length),
  testPathForConsistencyCheck: 'some/test/integration/build/example.test.js'
};
