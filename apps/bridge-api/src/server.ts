import { ApolloServer } from 'apollo-server-express'
import { applyMiddleware } from 'graphql-middleware'
import { schema } from './schema'
import { permissions } from './permissions'
import { createContext } from './context'
import { BASIC_LOGGING } from './logging'
import { stringToBoolean } from './utils'

console.log('Creating Apollo Server...')

export const server = new ApolloServer({
  schema: applyMiddleware(schema, permissions),
  context: createContext,
  tracing: stringToBoolean(process.env['TRACING']),
  introspection: true,
  persistedQueries: false,
  debug: stringToBoolean(process.env['DEBUG_APOLLO']),
  playground: {
    settings: {
      'schema.polling.enable': false,
      'request.credentials': 'include',
    },
  },
  plugins: stringToBoolean(process.env['LOGGING']) ? [BASIC_LOGGING] : [],
})
