import { paljs } from '@paljs/nexus'
import { applyMiddleware } from 'graphql-middleware'
import { GraphQLDate, GraphQLDateTime } from 'graphql-scalars'
import { makeSchema, nullabilityGuardPlugin } from 'nexus'
import { nexusPrisma } from 'nexus-plugin-prisma'
import * as customTypes from '../src/schema/types'
import * as generatedTypes from './generated/types'
import { permissions } from './permissions'

export const schema = applyMiddleware(
  makeSchema({
    types: [generatedTypes, customTypes],
    plugins: [
      paljs(),
      nexusPrisma({
        shouldGenerateArtifacts: process.env.NODE_ENV === 'development',
        experimentalCRUD: true,
        paginationStrategy: 'prisma',
        scalars: {
          Date: GraphQLDate,
          DateTime: GraphQLDateTime,
        },
      }),
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
          BigInt: () => '0',
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
    },
  }),
  permissions
)
