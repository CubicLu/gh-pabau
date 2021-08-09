import { ApolloServer, gql } from 'apollo-server'
import { createTestClient } from 'apollo-server-testing'
import { middleware } from '../../src/schema'

// TODO add mock headers once integration is fixed
it.skip('should return the weekly feature requests count', async () => {
  const server = new ApolloServer({
    schema: middleware,
  })
  const { query } = createTestClient(server)
  const res = await query({
    query: gql`
      query {
        featureRequestsWeeklyAvg
      }
    `,
  })
  expect(res).toMatchObject({
    data: {
      featureRequestsWeeklyAvg: expect.any(Number),
    },
  })
})
