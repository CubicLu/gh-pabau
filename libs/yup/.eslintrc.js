const path = require('path')
module.exports = {
  extends: [
    'plugin:@nrwl/nx/react',
    '../../.eslintrc.js',
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  ignorePatterns: ['!**/*', '**/*.js'],
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  // root: false,
  parserOptions: {
    allowJs: true,
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
    project: path.resolve(__dirname, './tsconfig(.*)?.json'),
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    'react/prop-types': 0,
    // '@typescript-eslint/explicit-module-boundary-types': 0,
  },
}
