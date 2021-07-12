import { ApolloServer } from 'apollo-server-express'
import cookieSession from 'cookie-session'
import cors from 'cors'
import express, { Application } from 'express'
import { createContext } from './context'
import { schema } from './schema'
import { stringToBoolean } from './utils'

interface Options {
  tracing: boolean
  debugApollo: boolean
  logging: boolean
}

/**
 * Creates a testable Express app
 */
export function createApp(options?: Options) {
  const { debugApollo = false, tracing = false } = options || {}
  const server = new ApolloServer({
    schema,
    context: createContext,
    tracing,
    introspection: true,
    persistedQueries: false,
    debug: debugApollo,
    playground: {
      settings: {
        'schema.polling.enable': false,
        'request.credentials': 'include',
      },
    },
  })

  const app: Application = express()
  app.set('trust proxy', true)
  app
    .use(cors())
    .use(
      express.urlencoded({
        extended: true,
      })
    )
    .use(
      cookieSession({
        signed: false,
        secure: stringToBoolean(process.env.SECURE_COOKIES),
        httpOnly: true,
      })
    )

  server.applyMiddleware({ app })
  return app
}
