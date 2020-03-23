module.exports = {
  projects: ['<rootDir>/packages/*/jest.config.js'],
  collectCoverage: true,
  testEnvironment: 'jest-environment-jsdom-sixteen',
  coverageProvider: 'v8',
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  notify: true,
  notifyMode: 'always',
  verbose: true,
};
