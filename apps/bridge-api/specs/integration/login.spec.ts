import { gql } from 'apollo-server'
import { createTestContext } from './__helpers'

const ctx = createTestContext()

it('server answers connections', async () => {
  await expect(
    ctx.client.request('HIYA')
  ).rejects.toThrowErrorMatchingSnapshot()
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
          message: expect.stringMatching('Not Auth'),
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
