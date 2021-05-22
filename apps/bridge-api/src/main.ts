import { ApolloServer } from 'apollo-server-express'
import cookieSession from 'cookie-session'
import cors from 'cors'
import express from 'express'
import { createContext } from './context'
import { schema } from './schema'
import { assertEnvVarsExist, stringToBoolean } from './utils'
import { config } from 'dotenv-flow'
import { version } from '../../../package.json'

console.log(`Starting bridge-api v${version}`)

config({
  default_node_env: 'development',
  path: __dirname + '/prisma',
  purge_dotenv: true,
})

const LOGGING = !!stringToBoolean(process.env['LOGGING'])
const TRACING = !!stringToBoolean(process.env['TRACING'])
const DEBUG_APOLLO = !!stringToBoolean(process.env['DEBUG_APOLLO'])
const PORT = process.env['PORT'] || 4000

console.table({
  __dirname,
  cwd: process.cwd(),
  NODE_ENV: process.env.NODE_ENV,
  LOGGING,
  TRACING,
  DEBUG_APOLLO,
  PORT,
  'Database URL': process.env.DATABASE_URL,
  'JWT Secret': process.env.JWT_SECRET,
})

assertEnvVarsExist(['DATABASE_URL', 'JWT_SECRET'])

export const app = express()
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

const server = new ApolloServer({
  schema,
  context: createContext,
  tracing: TRACING,
  introspection: true,
  persistedQueries: false,
  debug: DEBUG_APOLLO,
  playground: {
    settings: {
      'schema.polling.enable': false,
      'request.credentials': 'include',
    },
  },
  plugins: LOGGING ? [BASIC_LOGGING] : [],
})

server.applyMiddleware({ app })

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
)
