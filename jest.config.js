const config = {
  injectGlobals: false,
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!types/**/*.ts',
    '!test/**/*.ts',
  ],
  notify: true,
  notifyMode: 'always',
  verbose: true,
};

export default config;
