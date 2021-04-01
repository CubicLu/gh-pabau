import { gql } from 'apollo-server'
import { createTestContext } from './__helpers'

const ctx = createTestContext()

it('server answers connections', async () => {
  await expect(
    ctx.client.request('HIYA')
  ).rejects.toThrowErrorMatchingInlineSnapshot(
    `"Syntax Error: Unexpected Name \\"HIYA\\".: {\\"response\\":{\\"errors\\":[{\\"message\\":\\"Syntax Error: Unexpected Name \\\\\\"HIYA\\\\\\".\\",\\"locations\\":[{\\"line\\":1,\\"column\\":1}],\\"extensions\\":{\\"code\\":\\"GRAPHQL_PARSE_FAILED\\"}}],\\"status\\":400},\\"request\\":{\\"query\\":\\"HIYA\\"}}"`
  )
})

it('denies invalid logins', async () => {
  await expect(
    ctx.client.request(
      gql`
        mutation {
          login(username: "doesntexist@nowhere.com", password: "blah")
        }
      `
    )
  ).rejects.toMatchObject({
    response: {
      errors: [
        expect.objectContaining({
          message: expect.stringContaining('Not Auth'),
        }),
      ],
    },
  })
})

it('allows valid logins', async () => {
  await expect(
    ctx.client.request(
      gql`
        mutation {
          login(username: "toshe@pabau.me", password: "test")
        }
      `
    )
  ).resolves.toMatchObject({
    login: expect.anything(),
  })
})
