module.exports = {
  projects: [
    './packages/*/test/**/jest.config.js',
    './integration/jest.config.js'
  ],
  collectCoverageFrom: ['packages/*/src/**/*.jsx', 'packages/*/src/**/*.js']
};
