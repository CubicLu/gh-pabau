import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import { schema } from './schema'
import { createContext } from './context'
import cookieSession from 'cookie-session'
import authenticatedUser from './middlewares/authenticatedUser'
import cors from 'cors'

const PORT = 4000
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
      secure: false,
      httpOnly: false,
    })
  )
  .use(authenticatedUser)

const server = new ApolloServer({
  schema,
  context: createContext,
  tracing: true,
})

server.applyMiddleware({ app })
app.listen({ port: PORT }, () => console.log(`Server running on port ${PORT}`))
