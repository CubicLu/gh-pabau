import { fieldAuthorizePlugin, makeSchema, nullabilityGuardPlugin, queryComplexityPlugin } from 'nexus'
import { nexusPrisma } from 'nexus-plugin-prisma'
import { PrismaClient } from '@prisma/client'
import * as generatedTypes from './generated/types'
import * as customTypes from '../src/schema/types'
import { applyMiddleware } from 'graphql-middleware'
import { permissions } from './permisions'
import { paljs } from '@paljs/nexus';

const prisma = new PrismaClient()

export const schema = applyMiddleware(makeSchema({
    types: [generatedTypes, customTypes],
    plugins: [
      paljs({
        includeAdmin: true,
      }),
      nexusPrisma({
      experimentalCRUD: true,
      prismaClient: ctx => ctx.prisma = prisma
      }),
      fieldAuthorizePlugin(),
      queryComplexityPlugin(),
      nullabilityGuardPlugin({
        onGuarded({ ctx, info }) {
          console.error(`Error: Saw a null value for non-null field ${info.parentType.name}.${info.fieldName}`)
          console.error(ctx)
        },
        fallbackValues: {
          Int: () => 0,
          String: () => '',
          Boolean: () => false,
          Float: () => 0
        },
      })
    ],
    outputs: {
      schema: __dirname + '/generated/schema.graphql',
      typegen:__dirname + '/generated/typegen-nexus-plugin-prisma.d.ts',
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
        DateTime: 'string'
      },
    },
  }),
  permissions
)
