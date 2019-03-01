module.exports = {
  extends: [
    '@commitlint/config-lerna-scopes',
    '@commitlint/config-conventional'
  ],
  parserPreset: 'conventional-changelog-atom',
  formatter: '@commitlint/format'
};
