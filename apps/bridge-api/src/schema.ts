import { paljs } from '@paljs/nexus'
import { applyMiddleware } from 'graphql-middleware'
import { makeSchema } from 'nexus'
import { permissions } from './permissions'
import * as types from './schema/types'

export const schema = applyMiddleware(
  makeSchema({
    plugins: [paljs()],
    shouldGenerateArtifacts: process.argv.includes('--nexus-typegen'),
    types,
    outputs: {
      typegen: __dirname + '/generated/nexus.d.ts',
    },
    sourceTypes: {
      modules: [
        {
          module: '@prisma/client',
          alias: 'prisma',
        },
      ],
    },
  }),
  permissions
)
