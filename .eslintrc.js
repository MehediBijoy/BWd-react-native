module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'prettier',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react', 'react-native', 'prettier'],
  rules: {
    'no-console': 'warn',
    'arrow-body-style': ['warn', 'as-needed'],
    'no-empty-function': 'error',
    quotes: ['warn', 'single', {avoidEscape: true}],
    'prefer-const': 'off',
    'no-dupe-keys': 'warn',
    'react/react-in-jsx-scope': ['off'],
    'no-duplicate-imports': ['warn'],
    '@typescript-eslint/no-unused-vars': ['warn'],
    // '@typescript-eslint/no-explicit-any': ['error'],
    'valid-typeof': ['error', {requireStringLiterals: true}],

    'prettier/prettier': ['warn'],

    'import/no-unresolved': ['warn', {caseSensitive: false}],
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
        'newlines-between': 'always',
        pathGroups: [
          {
            pattern: '@core/**',
            group: 'internal',
            position: 'before',
          },
        ],
      },
    ],
    'import/no-named-as-default-member': ['off'],
    'import/no-anonymous-default-export': [
      'error',
      {
        allowArray: false,
        allowArrowFunction: false,
        allowAnonymousClass: false,
        allowAnonymousFunction: false,
        allowCallExpression: true,
        allowNew: false,
        allowLiteral: false,
        allowObject: false,
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {
        // @alwaysTryTypes always try to resolve types under `<root>@types`
        // directory even it doesn't contain any source code, like `@types/unist`
        alwaysTryTypes: true,
        project: './tsconfig.json',
        extensions: ['.ts', '.d.ts', '.tsx'],
      },
    },
  },
}
