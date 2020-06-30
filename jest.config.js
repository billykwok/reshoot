module.exports = {
  projects: ['<rootDir>/packages/*/jest.config.js'],
  collectCoverage: true,
  coverageProvider: 'v8',
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!**/*.d.ts'],
  notify: true,
  notifyMode: 'always',
  verbose: true,
};
