import { ApolloServer, gql } from 'apollo-server'
import { createTestClient } from 'apollo-server-testing'
import { schema } from '../../src/schema'

it.skip('ping pong', async () => {
  const server = new ApolloServer({
    schema,
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
