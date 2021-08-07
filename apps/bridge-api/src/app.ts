import express from 'express'
import cors from 'cors'
import cookieSession from 'cookie-session'
import { stringToBoolean } from './utils'
import { ApolloServer } from 'apollo-server-express'
import { middleware } from './schema'
import { createContext } from './context'
import { BASIC_LOGGING } from './logging'

interface Options {
  tracing: boolean
  debugApollo: boolean
  logging: boolean
}

/**
 * Creates a testable Express app
 */
export function createApp(options?: Options) {
  const { debugApollo = false, logging = false, tracing = false } =
    options || {}
  const server = new ApolloServer({
    schema: middleware,
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
    plugins: logging ? [BASIC_LOGGING] : [],
  })

  const app = express()
  app.set('trust proxy', true)
  app
    .get('/', function ({ res }) {
      res.send('<h1>Private</h1>')
    })
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
