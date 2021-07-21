import { GraphQLClient } from 'graphql-request'
import { createApp } from '../../src/app'
import * as http from 'http'

type TestContext = {
  client: GraphQLClient
}

const PORT = 6006

export function createTestContext(): TestContext {
  const ctx = {} as TestContext
  const graphqlCtx = graphqlTestContext()
  beforeAll(async () => {
    const client = await graphqlCtx.before()
    Object.assign(ctx, {
      client,
    })
  }, 50_000)
  afterAll(async () => {
    await graphqlCtx.after()
  })
  return ctx
}

function graphqlTestContext() {
  let serverInstance: http.Server | null = null
  return {
    async before() {
      await new Promise(
        (resolve) =>
          (serverInstance = createApp().listen({ port: PORT }, () => {
            resolve(null)
          }))
      )
      return new GraphQLClient(`http://localhost:${PORT}/graphql`)
    },
    async after() {
      serverInstance?.close()
    },
  }
}
