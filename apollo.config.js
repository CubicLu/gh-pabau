module.exports = {
  client: {
    service: {
      url: process.env.NODE_ENV === 'development' ? 'http://localhost:8080/v1/graphql' : 'https://api.new.pabau.com/v1/graphql',
    },
  },
}
