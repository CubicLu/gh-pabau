module.exports = {
  extends: [
    'plugin:@nrwl/nx/react',
    '../../.eslintrc.js',
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  ignorePatterns: [
    '!**/*',
    'src/generated/**',
    'src/schema/graphql/**',
    'prisma/**',
  ],
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    parserOptions: { project: './tsconfig.eslint.json' },
  },
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    '@typescript-eslint/explicit-module-boundary-types': 0,
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
    // TODO temp disabling graphql/template-strings until we resolve issues sync issues
    // 'graphql/template-strings': [
    //   'error',
    //   {
    //     // Import default settings for your GraphQL client. Supported values:
    //     // 'apollo', 'relay', 'lokka', 'fraql', 'literal'
    //     env: 'apollo',
    //
    //     // Import your schema JSON here
    //     schemaJson: require('../../graphql.schema.json'),
    //
    //     // OR provide absolute path to your schema JSON (but not if using `eslint --cache`!)
    //     // schemaJsonFilepath: path.resolve(__dirname, './schema.json'),
    //
    //     // OR provide the schema in the Schema Language format
    //     // schemaString: printSchema(schema),
    //
    //     // tagName is gql by default
    //   },
    // ],
  },
  plugins: ['graphql'],
}
