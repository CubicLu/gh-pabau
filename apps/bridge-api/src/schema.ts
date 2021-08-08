import { paljs } from '@paljs/nexus'
import { applyMiddleware } from 'graphql-middleware'
import { makeSchema } from 'nexus'
import { permissions } from './permissions'
import * as types from './schema/types'

//TODO: speed this up
console.log('Loading schema (this may take up to a minute)...')

const schema = makeSchema({
  plugins: [paljs()],
  shouldGenerateArtifacts: process.argv.includes('--nexus-typegen'),
  types,
  outputs: {
    typegen: __dirname + '/generated/nexus.ts',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
})

console.log('Applying shields...')
export const middleware = applyMiddleware(schema, permissions)
