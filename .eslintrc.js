// @flow
module.exports = {
  env: {
    worker: true,
    commonjs: true,
    amd: true,
    es6: true,
    node: true,
    browser: true,
    'shared-node-browser': true
  },
  plugins: ['babel', 'jest', 'flowtype', 'react', 'prettier', 'react-hooks'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
    ecmaFeatures: { impliedStrict: true, jsx: true }
  },
  settings: {
    flowtype: { onlyFilesWithFlowAnnotation: true },
    'import/resolver': {
      node: { extensions: ['.js', '.jsx'], moduleDirectory: ['node-modules'] },
      webpack: { config: { resolve: { extensions: ['jsx', 'js'] } } },
      lerna: { packages: path.resolve(__dirname, 'packages') }
    }
  },
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:jest/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:flowtype/recommended',
    'plugin:react/recommended',
    'prettier',
    'prettier/flowtype',
    'prettier/react'
  ],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'consistent-return': 'off',
    'max-len': 'off',
    'no-console': 'off'
  }
};
