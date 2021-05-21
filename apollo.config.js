module.exports = {
  client: {
    service: {
      name: "hasura",
      url: process.env.NODE_ENV !== 'production' ? 'http://localhost:8080/v1/graphql' : 'https://api.new.pabau.com/v1/graphql',
      headers: {
        "X-Hasura-Admin-Secret": `${process.env.HASURA_GRAPHQL_ADMIN_SECRET}`
      },
    },
  },
}
