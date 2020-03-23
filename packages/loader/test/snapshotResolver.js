module.exports = {
  resolveSnapshotPath: (testPath, snapshotExtension) =>
    testPath
      .replace('test/unit', 'test/__snapshots__/unit')
      .replace('test/component', 'test/__snapshots__/component') +
    snapshotExtension,
  resolveTestPath: (snapshotFilePath, snapshotExtension) =>
    snapshotFilePath
      .replace('test/__snapshots__/unit', 'test/unit')
      .replace('test/__snapshots__/component', 'test/component')
      .slice(0, -snapshotExtension.length),
  testPathForConsistencyCheck: 'some/test/unit/example.test.js',
};
