import { ApolloServer } from 'apollo-server'
import { middleware } from '../../src/schema'

it('can instantiate ApolloServer with schema', async () => {
  const server = new ApolloServer({
    schema: middleware,
  })
  expect(server).toBeTruthy()
})
