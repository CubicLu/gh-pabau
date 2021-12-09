module.exports = {
  extends: [
    'plugin:@nrwl/nx/react',
    '../../.eslintrc.js',
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  ignorePatterns: ['!**/*'],
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    project: './tsconfig(*.)?.json',
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    'react/display-name': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'unicorn/prefer-spread': 0,
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: [],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 0,
    'react/destructuring-assignment': ['error', 'always'],
  },
}
