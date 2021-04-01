import {
  fieldAuthorizePlugin,
  makeSchema,
  nullabilityGuardPlugin,
  queryComplexityPlugin,
} from 'nexus'
import { nexusPrisma } from 'nexus-plugin-prisma'
import * as generatedTypes from './generated/types'
import * as customTypes from '../src/schema/types'
import { applyMiddleware } from 'graphql-middleware'
import { permissions } from './permissions'
import { paljs } from '@paljs/nexus'
import { prisma } from './prisma'

export const schema = applyMiddleware(
  makeSchema({
    types: [generatedTypes, customTypes],
    plugins: [
      paljs({
        includeAdmin: true,
      }),
      nexusPrisma({
        experimentalCRUD: true,
        prismaClient: (ctx) => prisma,
        paginationStrategy: 'prisma',
      }),
      fieldAuthorizePlugin(),
      queryComplexityPlugin(),
      nullabilityGuardPlugin({
        onGuarded({ ctx, info }) {
          console.error(
            `Error: Saw a null value for non-null field ${info.parentType.name}.${info.fieldName}`
          )
          console.error(ctx)
        },
        fallbackValues: {
          Int: () => 0,
          String: () => '',
          Boolean: () => false,
          Float: () => 0,
          Decimal: () => 0,
          DateTime: () => '1970-01-01T1:00:00+00:00',
          Json: () => [],
        },
      }),
    ],
    outputs: {
      schema: __dirname + '/generated/schema.graphql',
      typegen: __dirname + '/generated/typegen-nexus-plugin-prisma.d.ts',
    },
    sourceTypes: {
      headers: [
        'import { ConnectionFieldOpts } from "@packages/api-graphql/src/extensions/connectionType"',
      ],
      modules: [
        {
          module: '@prisma/client',
          alias: 'prisma',
        },
      ],
      mapping: {
        Date: 'string',
        DateTime: 'string',
      },
    },
  }),
  permissions
)

// Prisma middleware logger for query efficiency
prisma.$on('query', (e) => {
  console.log('Query: ' + e.query)
  console.log('Duration: ' + e.duration + 'ms')
})
