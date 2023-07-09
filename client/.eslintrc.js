module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react/recommended'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      rules: {
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
      },
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'simple-import-sort', 'react'],
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-non-null-asserted-optional-chain': 0,
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
