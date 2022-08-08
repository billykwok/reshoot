module.exports = {
  root: true,
  env: { node: true, commonjs: true, es6: true, 'jest/globals': true },
  parser: '@babel/eslint-parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { impliedStrict: true },
    babelOptions: { configFile: './babel.config.cjs' },
  },
  settings: {
    'import/extensions': ['.js', '.json'],
    'import/resolver': { node: { moduleDirectory: ['node_modules'] } },
  },
  plugins: ['import', 'prettier', 'testing-library', 'jest'],
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'prettier',
    'plugin:jest/recommended',
  ],
  rules: {
    'prefer-spread': 'off',
    'consistent-return': 'off',
    'max-len': 'off',
    'no-console': 'off',
  },
  overrides: [
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        tsconfigRootDir: __dirname,
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { impliedStrict: true },
        project: ['./tsconfig.json', './packages/*/tsconfig.json'],
      },
      settings: {
        'import/extensions': ['.ts'],
        'import/resolver': {
          node: { moduleDirectory: ['node_modules'] },
          webpack: { config: {} },
        },
        'import/parsers': { '@typescript-eslint/parser': ['.ts'] },
      },
      plugins: [
        '@typescript-eslint',
        'import',
        'prettier',
        'testing-library',
        'jest',
      ],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:prettier/recommended',
        'prettier',
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
        'jest/no-standalone-expect': 'off',
      },
    },
  ],
};
