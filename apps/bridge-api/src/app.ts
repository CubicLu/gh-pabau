import express from 'express'
import { server } from './server'

/**
 * Creates a testable Express app
 */
export function createApp() {
  console.log('Creating express app...')

  const app = express()

  app.get('/', function ({ res }) {
    res.send('<h1>Private</h1>')
  })

  server.applyMiddleware({ app })
  return app
}
