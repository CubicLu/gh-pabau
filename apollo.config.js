module.exports = {
  client: {
    service: {
      name: "Hasura",
      url: 'https://api.new.pabau.com/v1/graphql',
      headers: { "X-Hasura-Admin-Secret": `madskills` },
    },
  },
}
