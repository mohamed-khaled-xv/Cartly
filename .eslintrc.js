// .eslintrc.cjs (rename to .cjs to avoid ESM/CommonJS friction)
module.exports = {
  root: true,
  extends: ['@react-native', 'plugin:react-hooks/recommended', 'prettier'],
  plugins: ['unused-imports', '@typescript-eslint', 'import'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {jsx: true},
    sourceType: 'module',
    // If you don't want type-aware rules yet, omit "project"
    tsconfigRootDir: __dirname,
  },
  settings: {
    'import/resolver': {
      typescript: {project: './tsconfig.json'},
      node: {extensions: ['.js', '.jsx', '.ts', '.tsx']},
    },
  },
  rules: {
    // --- your RN choices ---
    'react-native/no-inline-styles': 'off',
    'react-native/no-raw-text': 'off',
    'react-native/no-unused-styles': 'off',
    'react-native/split-platform-components': 'warn',
    'react-native/no-color-literals': 'off',
    'react/style-prop-object': 'off',

    // --- unused imports/vars ---
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],

    // --- general quality ---
    'no-unused-expressions': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/no-unstable-nested-components': ['warn', {allowAsProps: true}],

    // --- import hygiene ---
    'import/first': 'error',
    'import/no-duplicates': 'error',
    'import/newline-after-import': 'error',
    'import/order': [
      'warn',
      {
        'newlines-between': 'always',
        alphabetize: {order: 'asc', caseInsensitive: true},
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling', 'index'],
        ],
        pathGroups: [{pattern: '@/**', group: 'internal', position: 'after'}],
        pathGroupsExcludedImportTypes: ['builtin'],
      },
    ],
  },
  ignorePatterns: ['node_modules/', 'android/', 'ios/', 'dist/', 'build/'],
};
