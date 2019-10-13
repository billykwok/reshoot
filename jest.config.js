module.exports = {
  projects: [
    './packages/*/test/**/jest.config.js',
    './integration/jest.config.js'
  ],
  collectCoverageFrom: [
    'packages/*/src/**/*.js',
    'packages/*/src/**/*.jsx',
    'packages/*/src/**/*.ts',
    'packages/*/src/**/*.tsx'
  ]
};
