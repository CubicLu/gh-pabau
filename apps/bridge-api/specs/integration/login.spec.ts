import { createTestClient } from 'apollo-server-integration-testing'
import { gql } from 'apollo-server'
import { server } from '../../src/app'

const { query } = createTestClient({
  apolloServer: server,
})

it('denies invalid logins', () => {
  expect(
    query(
      `
        mutation {
          login(username: "doesntexist@nowhere.com", password: "blah")
        }
      `
    )
  ).rejects.toMatchObject({
    response: {
      errors: [
        expect.objectContaining({
          message: expect.stringMatching('Not Auth'),
        }),
      ],
    },
  })
  expect(
    query(`mutation { login(username: "pabau@local.com", password: "") }`)
  ).rejects.toMatchObject({
    response: {
      errors: [
        expect.objectContaining({
          message: expect.stringMatching('Not Auth'),
        }),
      ],
    },
  })
})

it('allows valid logins', async () => {
  expect(
    query(
      gql`
        mutation {
          login(username: "pabau@local.com", password: "test")
        }
      `
    )
  ).resolves.toMatchObject({
    login: expect.anything(),
  })
  expect(
    query(
      gql`
        mutation {
          login(username: "pabau@local.COM", password: "test")
        }
      `
    )
  ).resolves.toMatchObject({
    login: expect.anything(),
  })
})
