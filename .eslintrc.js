const path = require('path');

module.exports = {
  root: true,
  env: {
    commonjs: true,
    amd: true,
    es6: true,
    node: true,
    browser: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
    ecmaFeatures: { impliedStrict: true, jsx: true },
    project: './tsconfig.json',
  },
  settings: {
    react: { version: 'detect' },
    'import/extensions': ['.js', '.jsx', '.json'],
    'import/resolver': {
      lerna: { packages: path.resolve(__dirname, 'packages') },
      node: {
        paths: [path.resolve(__dirname, 'node_modules')],
        moduleDirectory: ['node_modules'],
      },
      webpack: { config: {} },
    },
  },
  plugins: [
    'import',
    'prettier',
    'react',
    'react-hooks',
    'jsx-a11y',
    'testing-library',
  ],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'prettier/react',
    'plugin:testing-library/react',
  ],
  rules: {
    'prefer-spread': 'off',
    'react/prop-types': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'jsx-a11y/image-has-content': 'off',
    'jsx-a11y/heading-has-content': 'off',
    'jsx-a11y/anchor-has-content': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'consistent-return': 'off',
    'max-len': 'off',
    'no-console': 'off',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      settings: {
        'import/parsers': { '@typescript-eslint/parser': ['.ts', '.tsx'] },
        'import/extensions': ['.ts', '.tsx'],
      },
      plugins: [
        '@typescript-eslint',
        'import',
        'prettier',
        'react',
        'react-hooks',
        'jsx-a11y',
        'testing-library',
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
        'prettier/react',
        'plugin:testing-library/react',
      ],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': [
          'error',
          { allowArgumentsExplicitlyTypedAsAny: true },
        ],
        '@typescript-eslint/prefer-includes': 'off',
        'prefer-spread': 'off',
        'react/prop-types': 'off',
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
        'jsx-a11y/image-has-content': 'off',
        'jsx-a11y/heading-has-content': 'off',
        'jsx-a11y/anchor-has-content': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'consistent-return': 'off',
        'max-len': 'off',
        'no-console': 'off',
      },
    },
  ],
};
