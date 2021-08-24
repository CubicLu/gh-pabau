import { createTestClient } from 'apollo-server-integration-testing'
import { server } from '../../src/app'

const { query } = createTestClient({
  apolloServer: server,
})

it('server responds to ping', () => {
  expect(query(`{ ping }`)).resolves.toMatchSnapshot()
})
