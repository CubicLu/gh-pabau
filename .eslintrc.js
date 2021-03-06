module.exports = {
  root: true,
  ignorePatterns: ['**/*', '!/*.js'],
  plugins: ['@nrwl/nx', 'tsdoc', 'graphql', 'rebase'],
  extends: [
    'plugin:unicorn/recommended',
    'plugin:you-dont-need-lodash-underscore/compatible',
    'plugin:prettier/recommended',
  ],
  rules: {
    'tsdoc/syntax': 'warn',
    'id-length': 0,
    'babel/object-curly-spacing': 0,
    '@typescript-eslint/prefer-optional-chain': ['error'],
    'unicorn/no-null': 0,
    'unicorn/no-useless-undefined': 0,
    'unicorn/filename-case': 0,
    'unicorn/prefer-node-protocol': 0,
    'graphql/template-strings': 2,

    //TODO: turn these on in the future
    'unicorn/no-abusive-eslint-disable': 0,
    'unicorn/numeric-separators-style': 0,
    '@next/next/no-html-link-for-pages': 0,
    'unicorn/consistent-destructuring': 0,
    'unicorn/consistent-function-scoping': 0,
    'unicorn/prefer-includes': 0,
    'unicorn/prefer-module': 0,
    'unicorn/no-array-reduce': 0,
    'unicorn/no-nested-ternary': 0,
    'unicorn/prefer-array-some': 0,
    'unicorn/prefer-string-slice': 0,
    'unicorn/prevent-abbreviations': 0,
    'unicorn/prefer-switch': 0,
    'unicorn/prefer-ternary': 0,
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      rules: {
        '@nrwl/nx/enforce-module-boundaries': [
          'error',
          {
            enforceBuildableLibDependency: true,
            allowCircularSelfDependency: true, //TODO: make this false
            allow: [],
            depConstraints: [
              {
                sourceTag: '*',
                onlyDependOnLibsWithTags: ['*'],
              },
            ],
          },
        ],
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      extends: ['plugin:@nrwl/nx/typescript'],
      rules: {},
    },
    {
      files: ['*.js', '*.jsx'],
      extends: ['plugin:@nrwl/nx/javascript'],
      rules: {},
    },
  ],
}
