module.exports = {
  projects: [
    '<rootDir>/packages/*/jest.config.js',
    '<rootDir>/integration/jest.config.js'
  ],
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  notify: true,
  notifyMode: 'always',
  verbose: true
};
