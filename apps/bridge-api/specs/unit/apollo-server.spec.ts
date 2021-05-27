import { ApolloServer } from 'apollo-server'
import { schema } from '../../src/schema'

it('can instantiate ApolloServer with schema', async () => {
  const server = new ApolloServer({
    schema,
  })
  expect(server).toBeTruthy()
})
