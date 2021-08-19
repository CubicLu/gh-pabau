import { ApolloServer, gql } from 'apollo-server'
import { createTestClient } from 'apollo-server-testing'
import { middleware } from '../../src/schema'

it('ping pong', async () => {
  const server = new ApolloServer({
    schema: middleware,
    context: () => {
      return { user: { company: 123 } }
    },
  })
  const { query } = createTestClient(server)
  const res = await query({
    query: gql`
      query {
        ping
      }
    `,
  })
  expect(res).toMatchSnapshot()
})
