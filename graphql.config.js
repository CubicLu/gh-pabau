const ENVIRONMENTS_WANTED = ['development', 'production']

const fs = require('fs')
const path = require('path')
const dotEnvFlow = require('dotenv-flow')

module.exports = {
  projects: {
    app: {
      schema: './hasura/schema.graphql',
      extensions: {
        endpoints: ENVIRONMENTS_WANTED.reduce((a, c) => {
          const files = dotEnvFlow
            .listDotenvFiles(path.resolve(__dirname, 'hasura/'), { node_env: c })
            .filter((e) => fs.existsSync(e))
          const {
            HASURA_GRAPHQL_ENDPOINT,
            HASURA_GRAPHQL_ADMIN_SECRET,
            JWT_TOKEN,
          } = dotEnvFlow.parse(files)
          if (!HASURA_GRAPHQL_ADMIN_SECRET) return a
          if (!HASURA_GRAPHQL_ENDPOINT && c !== "development") return a
          return {
            ...a,
            [c]: {
              url: HASURA_GRAPHQL_ENDPOINT || "http://localhost:8080/v1/graphql",
              headers: {
                'X-Hasura-Admin-Secret': HASURA_GRAPHQL_ADMIN_SECRET,
                'Authorization': JWT_TOKEN ? `Bearer ${JWT_TOKEN}` : undefined,
              },
            },
          }
        }, {}),
      },
      include: '{apps,libs}/**/*.{tsx,ts,graphql}',
    },
  },
}
