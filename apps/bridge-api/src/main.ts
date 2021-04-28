import { ApolloServer } from 'apollo-server-express'
import cookieSession from 'cookie-session'
import cors from 'cors'
import express from 'express'
import { version } from '../../../package.json'
import { createContext } from './context'
import authenticatedUser from './middlewares/authenticatedUser'
import { schema } from './schema'
import { stringToBoolean } from './utils'

const LOGGING = !!stringToBoolean(process.env['LOGGING'])

console.log(`Starting bridge-api version ${version} logging ${LOGGING}`)

const PORT = process.env['PORT'] || 4000

export const app = express()
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
  .use(authenticatedUser)

// thanks to https://github.com/apollographql/apollo-server/issues/4055
const BASIC_LOGGING = {
  requestDidStart() {
    return {
      didEncounterErrors(requestContext) {
        console.log(
          'an error happened in response to query ' +
            requestContext.request.query
        )
        console.log(requestContext.errors)
      },
      willSendResponse(requestContext) {
        console.log(
          'response sent',
          JSON.stringify(requestContext?.response?.data)
        )
        console.log(requestContext.response.http)
      },
    }
  },
}

console.log('tracing is', process.env.NODE_ENV === 'development')

const server = new ApolloServer({
  schema,
  context: createContext,
  tracing: process.env.NODE_ENV === 'development',
  introspection: true,
  persistedQueries: false,
  debug: true,
  playground: {
    settings: {
      'schema.polling.enable': false,
      'request.credentials': 'include',
    },
  },
  plugins: LOGGING ? [BASIC_LOGGING] : [],
})

server.applyMiddleware({ app })

if (process.env.JEST_WORKER_ID === undefined) {
  app.listen(4000, () =>
    console.log(
      `Server running on http://localhost:${PORT}`,
      'env',
      process.env.NODE_ENV === 'development'
    )
  )
}
