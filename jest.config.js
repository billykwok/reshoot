module.exports = {
  projects: ['<rootDir>/packages/*/jest.config.js'],
  collectCoverage: true,
  coverageProvider: 'v8',
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!**/src/index.ts',
    '!**/src/macro.ts',
    '!**/*.d.ts',
  ],
  notify: true,
  notifyMode: 'always',
  verbose: true,
};
