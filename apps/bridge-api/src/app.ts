import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { schema } from './schema'
import { createContext } from './context'

/**
 * Creates a testable ApolloServer
 */
export const server = new ApolloServer({
  schema,
  context: createContext,
  introspection: true,
  persistedQueries: false,
  playground: {
    settings: {
      'schema.polling.enable': false,
      'request.credentials': 'include',
    },
  },
  // plugins: logging ? [BASIC_LOGGING] : [],
})

/**
 * Creates a testable Express app
 */
export function createApp() {
  const app = express()

  app.get('/', function ({ res }) {
    res.send('<h1>Private</h1>')
  })

  server.applyMiddleware({ app })
  return app
}
