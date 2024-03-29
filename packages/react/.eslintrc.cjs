module.exports = {
  root: false,
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true,
    'jest/globals': true,
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { impliedStrict: true, jsx: true },
    babelOptions: { configFile: './babel.config.cjs' },
  },
  settings: {
    react: { version: 'detect' },
    'import/extensions': ['.js', '.jsx', '.json'],
    'import/resolver': { node: { moduleDirectory: ['node_modules'] } },
  },
  plugins: [
    'import',
    'prettier',
    'react',
    'react-hooks',
    'jsx-a11y',
    'testing-library',
    'jest',
  ],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'plugin:testing-library/react',
    'plugin:jest/recommended',
  ],
  rules: {
    'react/prop-types': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'jsx-a11y/image-has-content': 'off',
    'jsx-a11y/heading-has-content': 'off',
    'jsx-a11y/anchor-has-content': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'prefer-spread': 'off',
    'consistent-return': 'off',
    'max-len': 'off',
    'no-console': 'off',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { impliedStrict: true, jsx: true },
        project: ['./tsconfig.json'],
      },
      settings: {
        react: { version: 'detect' },
        'import/extensions': ['.ts', '.tsx'],
        'import/resolver': { node: { moduleDirectory: ['node_modules'] } },
        'import/parsers': { '@typescript-eslint/parser': ['.ts', '.tsx'] },
      },
      plugins: [
        '@typescript-eslint',
        'import',
        'prettier',
        'react',
        'react-hooks',
        'jsx-a11y',
        'testing-library',
        'jest',
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
        'plugin:testing-library/react',
        'plugin:jest/recommended',
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
        'react/prop-types': 'off',
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
        'jsx-a11y/image-has-content': 'off',
        'jsx-a11y/heading-has-content': 'off',
        'jsx-a11y/anchor-has-content': 'off',
        'react-hooks/rules-of-hooks': 'error',
      },
    },
  ],
};
