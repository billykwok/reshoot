const path = require('path');

module.exports = {
  env: {
    commonjs: true,
    amd: true,
    es6: true,
    node: true,
    browser: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
    ecmaFeatures: { impliedStrict: true, jsx: true },
    project: './tsconfig.json'
  },
  settings: {
    react: { version: 'detect' },
    'import/parsers': { '@typescript-eslint/parser': ['.ts', '.tsx'] },
    'import/extensions': ['.js', '.jsx', '.mjs', '.ts', '.tsx', '.json'],
    'import/resolver': {
      lerna: { packages: path.resolve(__dirname, 'packages') },
      node: {
        paths: [path.resolve(__dirname, 'node_modules')],
        moduleDirectory: ['node_modules']
      },
      webpack: { config: {} }
    }
  },
  plugins: [
    '@typescript-eslint',
    'import',
    'prettier',
    'react',
    'react-hooks',
    'jsx-a11y'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'prettier/react'
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/prefer-includes': 'off',
    'prefer-spread': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'jsx-a11y/image-has-content': 'off',
    'jsx-a11y/heading-has-content': 'off',
    'jsx-a11y/anchor-has-content': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'consistent-return': 'off',
    'max-len': 'off',
    'no-console': 'off'
  }
};
