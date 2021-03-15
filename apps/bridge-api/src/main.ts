import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import { schema } from './schema'
import cookieSession from 'cookie-session'
import cors from 'cors'
import { stringToBoolean } from './utils'
import { version } from '../../../package.json'
import { createContext } from './context'
import authenticatedUser from './middlewares/authenticatedUser'

console.log(`Starting bridge-api version ${version}`)
console.log(
  `Secure cookies: ` +
    (stringToBoolean(process.env['SECURE_COOKIES']) ? 'ON' : 'OFF')
)

const PORT = process.env['PORT'] || 4000

const app = express()
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
      secure: stringToBoolean(process.env['SECURE_COOKIES']),
      httpOnly: true,
    })
  )
  .use(authenticatedUser)

const server = new ApolloServer({
  schema,
  context: createContext,
  tracing: true,
  playground: {
    settings: {
      'schema.polling.enable': false,
      'request.credentials': 'include',
    },
  },
})

server.applyMiddleware({ app })

app.listen({ port: PORT }, () => console.log(`Server running on port ${PORT}`))
