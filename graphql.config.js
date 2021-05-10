// graphql.config.js
module.exports = {
  projects: {
    app: {
      schemaPath: './hasura/schema.graphql',
      documents: ['**/*.{graphql,ts,tsx}'],
      extensions: {
        endpoints: {
          default: {
            url: 'http://localhost:8080/v1/graphql',
            headers: {
              'X-Hasura-Admin-Secret': `${process.env.HASURA_GRAPHQL_ADMIN_SECRET}`,
            },
          },
        },
      },
    },
  },
}
