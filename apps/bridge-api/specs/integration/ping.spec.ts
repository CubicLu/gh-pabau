import { createTestClient } from 'apollo-server-integration-testing'
import { server } from '../../src/server'

const { query } = createTestClient({
  apolloServer: server,
})

it('server responds to ping', async () => {
  expect(query(`{ ping }`)).resolves.toMatchSnapshot()
})
