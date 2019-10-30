module.exports = {
  resolveSnapshotPath: (testPath, snapshotExtension) =>
    testPath
      .replace('test/unit', 'test/unit/__snapshots__')
      .replace('test/component', 'test/component/__snapshots__') +
    snapshotExtension,
  resolveTestPath: (snapshotFilePath, snapshotExtension) =>
    snapshotFilePath
      .replace('test/unit/__snapshots__', 'test/unit')
      .replace('test/component/__snapshots__', 'test/component')
      .slice(0, -snapshotExtension.length),
  testPathForConsistencyCheck: 'some/test/unit/example.test.js'
};
