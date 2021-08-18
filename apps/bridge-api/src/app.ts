import express from 'express'
import cors from 'cors'
import { server } from './server'

interface Options {
  tracing: boolean
  debugApollo: boolean
  logging: boolean
}

/**
 * Creates a testable Express app
 */
export function createApp(options?: Options) {
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

  server.applyMiddleware({ app })
  return app
}
