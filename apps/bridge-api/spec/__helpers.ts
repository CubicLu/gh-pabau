import { GraphQLClient } from 'graphql-request'
import { app as server } from '../src/main'

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
  }, 50000)
  afterAll(async () => {
    await graphqlCtx.after()
  })
  return ctx
}

function graphqlTestContext() {
  let serverInstance: ReturnType<typeof server.listen> | null = null
  return {
    async before() {
      await new Promise(
        (resolve) =>
          (serverInstance = server.listen({ port: PORT }, () => {
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
