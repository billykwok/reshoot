const path = require('path');

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
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
    ecmaFeatures: { impliedStrict: true, jsx: true },
    project: './tsconfig.json'
  },
  settings: {
    react: { version: 'detect' },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx', '.json'],
        moduleDirectory: ['node-modules']
      },
      lerna: { packages: path.resolve(__dirname, 'packages') },
      webpack: {
        config: {
          resolve: { extensions: ['js', 'jsx', '.mjs', '.ts', '.tsx', '.json'] }
        }
      }
    }
  },
  plugins: [
    '@typescript-eslint',
    'import',
    'prettier',
    'emotion',
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
    'jsx-a11y/image-has-content': 'off',
    'jsx-a11y/heading-has-content': 'off',
    'jsx-a11y/anchor-has-content': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        optionalDependencies: true,
        peerDependencies: true
      }
    ],
    'react-hooks/rules-of-hooks': 'error',
    'consistent-return': 'off',
    'max-len': 'off',
    'no-console': 'off'
  }
};
